"""Refresh the complete, date-bounded PubMed name-search catalog (no result cap).

Usage: python scripts/refresh-research-catalog.py
Raw records are kept under ignored data/; only bibliography/indexing metadata is
published. PubMed indexing is not an efficacy assessment or a systematic review.
"""
import argparse
import json
import re
import time
import xml.etree.ElementTree as ET
from datetime import date
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
QUERIES = {
    "bpc-157": '("BPC 157"[Title/Abstract] OR "BPC157"[Title/Abstract] OR "bepecin"[Title/Abstract])',
    "retatrutide": '("retatrutide"[Title/Abstract] OR "LY3437943"[Title/Abstract])',
    "tb-500": '("TB-500"[Title/Abstract] OR "thymosin beta4"[Title/Abstract] OR "thymosin beta 4"[Title/Abstract] OR "thymosin beta-4"[Title/Abstract])',
    "mt-2": '("melanotan II"[Title/Abstract] OR "melanotan 2"[Title/Abstract] OR "melanotan-II"[Title/Abstract] OR "melanotan-II"[Supplementary Concept] OR ("MTII"[Title/Abstract] AND ("melanocortin"[Title/Abstract] OR "melanotan"[Title/Abstract])))',
    "mots-c": '("MOTS-c"[Title/Abstract] OR "MOTSc"[Title/Abstract])',
    "pinealon": '("pinealon"[Title/Abstract] OR "Glu-Asp-Arg"[Title/Abstract])',
    "epitalon": '("epitalon"[Title/Abstract] OR "epithalon"[Title/Abstract] OR "epithalone"[Title/Abstract] OR "epithalon"[Supplementary Concept])',
    "ghk-cu": '("GHK-Cu"[Title/Abstract] OR "GHK copper"[Title/Abstract] OR "copper tripeptide"[Title/Abstract] OR "copper peptide GHK"[Title/Abstract] OR "glycyl-L-histidyl-L-lysine"[Title/Abstract] OR "glycyl-histidyl-lysine"[Title/Abstract] OR ("GHK"[Title/Abstract] AND "copper"[Title/Abstract]))',
}


def fetch(endpoint, params):
    request = Request(
        "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/" + endpoint,
        data=urlencode(params).encode(),
        headers={"User-Agent": "SaltNPepResearchCatalog/1.0"},
    )
    for attempt in range(3):
        try:
            with urlopen(request, timeout=60) as response:
                body = response.read()
            time.sleep(0.4)
            return body
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))


def text(node):
    return " ".join("".join(node.itertext()).split()) if node is not None else ""


def category(types):
    if any(t in types for t in ["Published Erratum", "Retracted Publication", "Retraction of Publication", "Retraction Notice"]):
        return "other"
    if any(t in types for t in ["Review", "Systematic Review", "Meta-Analysis"]):
        return "review"
    if "Case Reports" in types:
        return "case-report"
    if any("Clinical Trial" in t or t == "Randomized Controlled Trial" for t in types):
        return "clinical-trial"
    if any(t in types for t in ["Editorial", "Comment", "News", "Letter"]):
        return "other"
    return "research"


def record(paper):
    citation = paper.find("MedlineCitation")
    article = citation.find("Article")
    authors = article.findall("AuthorList/Author")
    names = [" ".join(filter(None, [a.findtext("LastName"), a.findtext("Initials")])) or a.findtext("CollectiveName") or "" for a in authors]
    names = [" ".join(name.split()) for name in names if name]
    types = [text(t) for t in article.findall("PublicationTypeList/PublicationType")]
    topics = [text(t) for t in citation.findall("MeshHeadingList/MeshHeading/DescriptorName")]
    pubdate = article.find("Journal/JournalIssue/PubDate")
    date_text = pubdate.findtext("Year") or pubdate.findtext("MedlineDate") or ""
    year = re.search(r"\b(?:19|20)\d{2}\b", date_text)
    if not year:
        year = re.search(r"\b(?:19|20)\d{2}\b", article.findtext("ArticleDate/Year") or "")
    if not year:
        raise ValueError("Missing publication year")
    abstract = [{"label": a.get("Label", ""), "text": text(a)} for a in article.findall("Abstract/AbstractText")]
    notices = [n.get("RefType") for n in citation.findall("CommentsCorrectionsList/CommentsCorrections") if n.get("RefType") in ["RetractionIn", "RetractionOf", "ExpressionOfConcernIn", "ErratumIn"]]
    return {
        "id": citation.findtext("PMID"),
        "title": text(article.find("ArticleTitle")),
        "authors": ", ".join(names[:3]) + (" et al." if len(names) > 3 else "") or "Author not listed",
        "journal": article.findtext("Journal/Title") or "Journal not listed",
        "year": int(year.group()),
        "types": types,
        "category": category(types),
        "topics": topics,
        "hasAbstract": bool(abstract),
        "notices": notices,
        "abstract": abstract,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--through", default=date.today().isoformat(), help="Publication-date cutoff (YYYY-MM-DD; defaults to today)")
    args = parser.parse_args()
    cutoff = date.fromisoformat(args.through)
    data_dir = ROOT / "data"
    data_dir.mkdir(exist_ok=True)
    raw_path = data_dir / "full-literature-records.json"
    cache = json.loads(raw_path.read_text(encoding="utf-8")) if raw_path.exists() else {}
    catalogs = {}
    fetched = set()
    for slug, base in QUERIES.items():
        query = base + f' AND ("1900/01/01"[Date - Publication] : "{cutoff:%Y/%m/%d}"[Date - Publication])'
        result = json.loads(fetch("esearch.fcgi", {"db": "pubmed", "term": query, "retmode": "json", "retmax": 9999, "sort": "pub date"}))["esearchresult"]
        ids = result["idlist"]
        if len(ids) != int(result["count"]):
            raise ValueError(f"Search incomplete: {slug}")
        # Re-fetch existing records too: corrections/retractions can be added later.
        missing = [pmid for pmid in ids if pmid not in fetched]
        for start in range(0, len(missing), 150):
            batch = missing[start:start + 150]
            root = ET.fromstring(fetch("efetch.fcgi", {"db": "pubmed", "id": ",".join(batch), "retmode": "xml"}))
            returned = set()
            for paper in root.findall("PubmedArticle"):
                item = record(paper)
                cache[item["id"]] = item
                returned.add(item["id"])
            absent = set(batch) - returned
            if absent:
                raise ValueError(f"No article record returned: {sorted(absent)}")
            fetched.update(returned)
            raw_path.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
        papers = [{k: v for k, v in cache[pmid].items() if k != "abstract"} for pmid in ids]
        papers.sort(key=lambda p: (p["year"], int(p["id"])), reverse=True)
        catalogs[slug] = {"query": query, "count": len(papers), "papers": papers}
        print(f"{slug}: {len(papers)} indexed publications, no truncated results", flush=True)
    snapshot = {"checked": date.today().isoformat(), "through": cutoff.isoformat(), "catalogs": catalogs}
    (ROOT / "src/lib/research-catalog-data.json").write_text(json.dumps(snapshot, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"Saved {sum(c['count'] for c in catalogs.values())} compound/publication matches.")


if __name__ == "__main__":
    main()
