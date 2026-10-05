"use client";

import { Children, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowIcon } from "@/components/arrow-icon";
import { publicationCategories, publicationNotice, publicationSearch, studyAnchor, type IndexedPublication, type PublicationCategory } from "@/lib/research-catalog-format";
import styles from "./research.module.css";

type ReadingIndex = { sourceId: string; id: string; search: string; year: number; category: PublicationCategory };
const pageSize = 30;
const subscribeHash = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => { window.removeEventListener("hashchange", callback); window.removeEventListener("popstate", callback); };
};
const getHash = () => window.location.search + window.location.hash;
const emptyHash = () => "";

export default function ResearchBrowser({ compound, area, papers, notes, children }: {
  compound: string;
  area: string;
  papers: IndexedPublication[];
  notes: ReadingIndex[];
  children: ReactNode;
}) {
  const [viewInput, setSelectedView] = useState<string | null>(null);
  const [queryInput, setQuery] = useState<string | null>(null);
  const [categoryInput, setCategory] = useState<string | null>(null);
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const location = useSyncExternalStore(subscribeHash, getHash, emptyHash);
  const params = new URLSearchParams(location.split("#")[0]);
  const hash = location.includes("#") ? location.slice(location.indexOf("#")) : "";
  const selectedView = viewInput ?? (params.get("view") === "explained" ? "explained" : "catalog");
  const query = queryInput ?? params.get("q") ?? "";
  const category = categoryInput ?? (params.get("type") && params.get("type")! in publicationCategories ? params.get("type")! : "all");
  const linkedNote = notes.find((note) => `#${studyAnchor(note.sourceId)}` === hash);
  const view = linkedNote ? "explained" : selectedView;
  const normalizedQuery = query.trim().toLowerCase();
  const searchContext = `${compound} ${area}`.toLowerCase();
  const noteSearchById = new Map(notes.map((note) => [note.id, note.search]));
  const years = [...new Set(papers.map((paper) => paper.year))].sort((a, b) => b - a);
  const matchingPapers = papers.filter((paper) =>
    (category === "all" || paper.category === category) &&
    (year === "all" || String(paper.year) === year) &&
    `${searchContext} ${noteSearchById.get(paper.id) ?? publicationSearch(paper)}`.includes(normalizedQuery)
  ).sort((a, b) => sort === "oldest" ? a.year - b.year || Number(a.id) - Number(b.id) : b.year - a.year || Number(b.id) - Number(a.id));
  const matchingNotes = notes.filter((note) =>
    linkedNote || ((category === "all" || note.category === category) && (year === "all" || String(note.year) === year) && `${searchContext} ${note.search}`.includes(normalizedQuery))
  ).sort((a, b) => sort === "oldest" ? a.year - b.year : b.year - a.year);
  const pages = Math.max(1, Math.ceil(matchingPapers.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = matchingPapers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const readingById = new Map(notes.map((note) => [note.id, note.sourceId]));
  const cards = Children.toArray(children);
  const cardById = new Map(notes.map((note, index) => [note.sourceId, cards[index]]));

  useEffect(() => {
    if (!linkedNote) return;
    const frame = requestAnimationFrame(() => {
      const disclosure = document.getElementById(studyAnchor(linkedNote.sourceId));
      if (disclosure instanceof HTMLDetailsElement) {
        disclosure.open = true;
        disclosure.scrollIntoView({ block: "start" });
        disclosure.querySelector("summary")?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [linkedNote]);

  function clearHash() {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  function changeView(next: string) {
    clearHash();
    setSelectedView(next);
    setPage(1);
  }

  function reset() {
    clearHash();
    setQuery("");
    setCategory("all");
    setYear("all");
    setPage(1);
  }

  function readNotes(sourceId: string) {
    reset();
    setSelectedView("explained");
    window.history.replaceState(null, "", `#${studyAnchor(sourceId)}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function movePage(next: number) {
    setPage(next);
    document.getElementById("publication-results")?.scrollIntoView({ block: "start" });
  }

  return <section className={styles.library} aria-label={`${compound} publications`}>
    <div className={styles.viewSwitch} role="group" aria-label="Choose reading view">
      <button type="button" aria-pressed={view === "catalog"} onClick={() => changeView("catalog")}>All indexed publications <span>{papers.length.toLocaleString()}</span></button>
      <button type="button" aria-pressed={view === "explained"} onClick={() => changeView("explained")}>Explained studies <span>{notes.length}</span></button>
    </div>
    <p className={styles.readingHint}>{view === "catalog" ? "Browse every match in the PubMed name search. These records include studies, reviews, and notices. Open PubMed for the abstract and original source; papers with reading notes also link to a detailed explanation." : "Each reading card explains the main finding, study setup, measurements, results in context, and limitations. Open a card to read more."}</p>
    <div className={styles.toolbar}>
      <label className={styles.search}><span>Search publications</span><input type="search" value={query} onChange={(event) => { clearHash(); setQuery(event.target.value); setPage(1); }} placeholder="Title, topic, author, or PMID" /></label>
      <label className={styles.compoundFilter}><span>Publication type</span><select aria-label="Publication type" value={category} onChange={(event) => { clearHash(); setCategory(event.target.value); setPage(1); }}><option value="all">All publication types</option>{Object.entries(publicationCategories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label className={styles.yearFilter}><span>Year</span><select aria-label="Year" value={year} onChange={(event) => { clearHash(); setYear(event.target.value); setPage(1); }}><option value="all">All years</option>{years.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <label className={styles.yearFilter}><span>Sort</span><select aria-label="Sort" value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
    </div>
    <div id="publication-results" className={styles.resultsMeta}>
      <p role="status">{view === "catalog" ? `${matchingPapers.length.toLocaleString()} of ${papers.length.toLocaleString()} publications${matchingPapers.length ? ` · Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, matchingPapers.length)}` : ""}` : `${matchingNotes.length} of ${notes.length} explained studies`}</p>
      {(query || category !== "all" || year !== "all" || linkedNote) && <button type="button" onClick={reset}>Reset filters</button>}
    </div>
    {view === "catalog" && <>
      <div className={styles.catalogGrid}>
        {visible.map((paper) => {
          const sourceId = readingById.get(paper.id);
          const notice = publicationNotice(paper);
          return <article key={paper.id} className={styles.catalogPaper}>
            <div className={styles.cardTop}><span className={styles.eyebrow}>{publicationCategories[paper.category]}</span><span className={styles.year}>{paper.year}</span></div>
            <h2>{paper.title}</h2>
            <p className={styles.publicationMeta}>{paper.authors} · <cite>{paper.journal}</cite></p>
            {notice && <p className={styles.notice}>{notice}</p>}
            <p className={styles.indexingNote}>{paper.types.join(" · ")}{!paper.hasAbstract ? " · No abstract indexed" : ""}</p>
            <div className={styles.catalogLinks}><a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.id}/`}>Read on PubMed <ArrowIcon /><small>PMID {paper.id}</small></a>{sourceId && <button type="button" onClick={() => readNotes(sourceId)}>Read study explanation <ArrowIcon /></button>}</div>
          </article>;
        })}
      </div>
      {matchingPapers.length > pageSize && <nav className={styles.pagination} aria-label="Publication pages"><button type="button" disabled={currentPage === 1} onClick={() => movePage(1)}>First</button><button type="button" disabled={currentPage === 1} onClick={() => movePage(currentPage - 1)}>Previous</button><span>Page {currentPage} of {pages}</span><button type="button" disabled={currentPage === pages} onClick={() => movePage(currentPage + 1)}>Next</button><button type="button" disabled={currentPage === pages} onClick={() => movePage(pages)}>Last</button></nav>}
    </>}
    <section hidden={view !== "explained"} className={styles.detailStudies} aria-label={`${compound} explained studies`}>
      {notes.slice().sort((a, b) => sort === "oldest" ? a.year - b.year : b.year - a.year).map((note) => <div className={styles.noteSlot} key={note.sourceId} hidden={!matchingNotes.some((match) => match.sourceId === note.sourceId)}>{cardById.get(note.sourceId)}</div>)}
    </section>
    {(view === "catalog" ? !matchingPapers.length : !matchingNotes.length) && <div className={styles.empty}><h3>No papers match this search.</h3><p>Try a different title, topic, or publication type.</p><button className={styles.primaryLink} type="button" onClick={reset}>Clear filters <ArrowIcon /></button></div>}
  </section>;
}
