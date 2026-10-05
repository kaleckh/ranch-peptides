"""Conservative compound-relevance selection, not an evidence-quality score.

Title-focused biomedical publications are candidates for the public bibliography.
Broader titles require a source-reviewed, compound-specific inclusion reason.
The same rules apply to supportive, negative, analytical, and safety findings.
"""
import json
import re
import unicodedata
from pathlib import Path

POLICY_PATH = Path(__file__).with_name("research-catalog-selections.json")
TITLE_PATTERNS = {
    "bpc-157": r"\b(?:bpc\s*157|bepecin|body\s*protect(?:ive|ion)\s*compound\s*157)\b",
    "retatrutide": r"\b(?:retatrutide|ly\s*3437943)\b",
    "tb-500": r"\b(?:thymosin\s*beta\s*(?:4|iv)|t\s*beta\s*4|tmsb4x|tb\s*500)\b",
    "mt-2": r"\b(?:melanotan\s*(?:ii|2)|mt\s*ii)\b",
    "mots-c": r"\bmots\s*c\b",
    # Sequence substrings also occur inside unrelated, longer peptides.
    "pinealon": r"\bpinealon\b",
    "epitalon": r"\b(?:epitalon|epithalon|epithalone)\b",
    # Free GHK and GHK-Cu are different preparations: require the copper form.
    "ghk-cu": r"\b(?:ghk\s*(?:cu|copper)|(?:cu\s*(?:ii|2)?|copper)\s*ghk|copper\s*tripeptide(?:\s*1)?|copper\s*peptide\s*ghk)\b|\bglycyl\s*(?:l\s*)?histidyl\s*(?:l\s*)?lys(?:ine|yl)\s*(?:chelated\s*)?(?:cu2?|copper)\b",
}
NOTICES = {"Published Erratum", "Retracted Publication", "Retraction of Publication", "Retraction Notice"}
COMMENTARY = {"Editorial", "Comment", "News", "Letter"}
SUBSTANTIVE = {"Case Reports", "Review", "Systematic Review", "Meta-Analysis"}


def normalize(value):
    value = unicodedata.normalize("NFKC", value).lower().replace("β", " beta ")
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def load_policy():
    return json.loads(POLICY_PATH.read_text(encoding="utf-8"))


def select_publication(slug, record, policy):
    """Return a public metadata record and reason, or an exclusion reason."""
    pmid = record["id"]
    exclusion = policy["exclude"].get(pmid)
    if exclusion:
        return None, exclusion
    reviewed = policy["include"].get(slug, {}).get(pmid)
    types = set(record["types"])
    if types & COMMENTARY and not types & (SUBSTANTIVE | NOTICES) and not reviewed:
        return None, "Editorial, comment, news, or letter without a substantive study/review, publication notice, or source-reviewed exception."
    focused = re.search(TITLE_PATTERNS[slug], normalize(record["title"]))
    if not focused and not reviewed:
        return None, "No compound focus in the title; abstract relevance has not been approved for this collection."
    item = {key: value for key, value in record.items() if key != "abstract"}
    item["relevance"] = {
        "basis": "reviewed-source" if reviewed else "title",
        "reason": reviewed["reason"] if reviewed else (
            "The title focuses on thymosin beta4 or TB-500; parent-peptide findings do not establish TB-500 fragment effects."
            if slug == "tb-500" else "The compound is a named subject of the publication title."
        ),
    }
    if reviewed and "category" in reviewed and not types & NOTICES:
        item["category"] = reviewed["category"]
    return item, None


def screen_catalogs(searches, records, policy):
    catalogs, exclusions = {}, {}
    for slug, search in searches.items():
        ids = search["ids"]
        if len(ids) != search["count"] or len(set(ids)) != len(ids):
            raise ValueError(f"Incomplete or duplicated raw search: {slug}")
        papers, excluded = [], []
        for pmid in ids:
            record = records[pmid]  # Missing cached records must fail the refresh.
            if record["id"] != pmid:
                raise ValueError(f"Mismatched cached PMID: {pmid}")
            item, reason = select_publication(slug, record, policy)
            if item:
                papers.append(item)
            else:
                excluded.append({"id": pmid, "title": record["title"], "reason": reason})
        papers.sort(key=lambda paper: (paper["year"], int(paper["id"])), reverse=True)
        catalogs[slug] = {
            "query": search["query"], "searchCount": search["count"],
            "excludedCount": len(excluded), "count": len(papers), "papers": papers,
        }
        exclusions[slug] = excluded
    return catalogs, exclusions
