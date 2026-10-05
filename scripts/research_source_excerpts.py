"""Create attributed, short abstract excerpts; never generate medical conclusions.

The public reader keeps full downloaded abstracts private. It quotes at most 25
words per publication, labels the original section, and marks shortened sentences.
Unstructured closing sentences are explicitly not labeled as conclusions.
"""
import hashlib
import re

WORD_LIMIT = 25
CONCLUSION = re.compile(r"\b(?:conclusions?|interpretation)\b", re.I)
RESULTS = re.compile(r"\b(?:results?|findings|significance|expert opinion|discussion)\b", re.I)
ADMINISTRATIVE = re.compile(r"\b(?:funding|registration|copyright|trial registration|acknowledgements?|disclaimer)\b", re.I)
ADMINISTRATIVE_SENTENCE = re.compile(r"^(?:[([]?funded by|copyright|©|trial registration|this trial is registered|the clinicaltrials\.gov registration|this article is protected|all rights reserved)", re.I)
FORMATTING_SENTENCE = re.compile(r"^(?:highlights?|key points?)\.?$", re.I)
BIBLIOGRAPHIC_SENTENCE = re.compile(r"\b(?:18|19|20)\d{2}\s*;\s*\d+.*[:.]")
# Source-reviewed choices where the final sentence is generic or malformed.
# Keep exact words; fail a refresh if the source no longer contains the passage.
REVIEWED_SENTENCES = {
    "16117343": "BPC 157 was shown to be effective in promoting corneal defects healing in rats.",
    "29096170": "Here we demonstrated that a Mitochondria-derived peptide (MOTS-c) could significantly improve the survival rate and decrease bacteria loads in MRSA-challenged mice, accompanied with declined levels of pro-inflammatory cytokines, such as TNF-α, IL-6 and IL-1β, but with increased level of anti-inflammatory cytokine IL-10.",
    "33396470": "The EDR peptide is assumed to enter cells and bind to histone proteins and/or ribonucleic acids.",
    "39865815": "The article has been withdrawn at the author's request from the website of the journal Current Neuropharmacology.",
}


def reference_sentence(sentence, record):
    if FORMATTING_SENTENCE.fullmatch(sentence) or BIBLIOGRAPHIC_SENTENCE.search(sentence):
        return True
    if sentence.rstrip(".").casefold() == record.get("title", "").rstrip(".").casefold():
        return True
    words = set(re.findall(r"[^\W\d_]+", sentence.casefold()))
    author_words = set(re.findall(r"[^\W\d_]+", record.get("authors", "").casefold()))
    return bool(words and words <= author_words)


def abstract_hash(sections):
    text = "\n".join(f"{s.get('label', '')}:{s['text']}" for s in sections)
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def source_excerpt(record):
    sections = [s for s in record.get("abstract", []) if s.get("text", "").strip()]
    if not sections:
        return None
    usable = [s for s in sections if not ADMINISTRATIVE.search(s.get("label", ""))]
    if not usable:
        return None
    conclusion = next((s for s in usable if CONCLUSION.search(s.get("label", ""))), None)
    results = next((s for s in reversed(usable) if RESULTS.search(s.get("label", ""))), None)
    selected = conclusion or results or usable[-1]
    label = selected.get("label", "")
    sentences = re.split(r"(?<=[.!?])\s+(?=[(\[\"“]?[A-Z])", " ".join(selected["text"].split()))
    sentences = [s for s in sentences if not ADMINISTRATIVE_SENTENCE.search(s) and not s.endswith("?") and not reference_sentence(s, record)]
    if not sentences:
        return None
    # Take the opening statement of a labeled results/conclusions section, or
    # the closing sentence of an unstructured abstract. Preserve the words.
    sentence = sentences[0] if conclusion or results else sentences[-1]
    reviewed = REVIEWED_SENTENCES.get(record.get("id"))
    if reviewed:
        if reviewed not in " ".join(selected["text"].split()):
            raise ValueError(f"Reviewed excerpt requires a new source check: {record['id']}")
        sentence = reviewed
    words = sentence.split()
    return {
        "text": " ".join(words[:WORD_LIMIT]),
        "truncated": len(words) > WORD_LIMIT,
        "section": label,
        "kind": "conclusion" if conclusion else "abstract",
        "position": "selected" if reviewed else "opening" if conclusion or results else "closing",
        "sourceHash": abstract_hash(sections),
    }


def excerpt_snapshot(catalogs, records, checked):
    ids = {paper["id"] for catalog in catalogs.values() for paper in catalog["papers"]}
    excerpts = {}
    for pmid in sorted(ids, key=int):
        excerpt = source_excerpt(records[pmid])
        if excerpt:
            excerpts[pmid] = excerpt
    return {"version": 1, "checked": checked, "wordLimit": WORD_LIMIT, "excerpts": excerpts}
