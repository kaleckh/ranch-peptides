"use client";

import { Children, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ArrowIcon } from "@/components/arrow-icon";
import { publicationCategories, publicationNotice, publicationSearch, studyAnchor, type IndexedPublication, type PublicationCategory } from "@/lib/research-catalog-format";
import styles from "./research.module.css";
import { StudyReaderLink, subscribeLocation, getLocation, serverLocation } from "./study-navigation";

type ReadingIndex = { sourceId: string; id: string; search: string; year: number; category: PublicationCategory };
const pageSize = 30;

export default function ResearchBrowser({ slug, compound, area, papers, notes, children }: {
  slug: string;
  compound: string;
  area: string;
  papers: IndexedPublication[];
  notes: ReadingIndex[];
  children: ReactNode;
}) {
  const location = useSyncExternalStore(subscribeLocation, getLocation, serverLocation);
  const params = new URLSearchParams(location.split("#")[0]);
  const hash = location.includes("#") ? location.slice(location.indexOf("#")) : "";
  const selectedView = params.get("view") === "explained" ? "explained" : "catalog";
  const query = params.get("q") ?? "";
  const category = params.get("type") && params.get("type")! in publicationCategories ? params.get("type")! : "all";
  const linkedNote = notes.find((note) => `#${studyAnchor(note.sourceId)}` === hash);
  const view = linkedNote ? "explained" : selectedView;
  const normalizedQuery = query.trim().toLowerCase();
  const searchContext = `${compound} ${area}`.toLowerCase();
  const noteSearchById = new Map(notes.map((note) => [note.id, note.search]));
  const years = [...new Set(papers.map((paper) => paper.year))].sort((a, b) => b - a);
  const year = years.some((value) => String(value) === params.get("year")) ? params.get("year")! : "all";
  const sort = params.get("sort") === "oldest" ? "oldest" : "newest";
  const requestedPage = Number(params.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
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

  function updateBrowse(changes: Record<string, string>, nextHash = "") {
    const next = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (!value || value === "all" || (key === "page" && value === "1") || (key === "sort" && value === "newest") || (key === "view" && value === "catalog")) next.delete(key);
      else next.set(key, value);
    }
    window.history.replaceState(null, "", window.location.pathname + (next.size ? `?${next}` : "") + nextHash);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function changeView(next: string) {
    updateBrowse({ view: next, page: "1" });
  }

  function reset() {
    updateBrowse({ q: "", type: "all", year: "all", page: "1" });
  }

  function readNotes(sourceId: string) {
    updateBrowse({ q: "", type: "all", year: "all", page: "1", view: "explained" }, `#${studyAnchor(sourceId)}`);
  }

  function movePage(next: number) {
    updateBrowse({ page: String(next) });
    document.getElementById("publication-results")?.scrollIntoView({ block: "start" });
  }

  return <section className={styles.library} aria-label={`${compound} publications`}>
    <div className={styles.viewSwitch} role="group" aria-label="Choose reading view">
      <button type="button" aria-pressed={view === "catalog"} onClick={() => changeView("catalog")}>Compound publications <span>{papers.length.toLocaleString()}</span></button>
      <button type="button" aria-pressed={view === "explained"} onClick={() => changeView("explained")}>Explained studies <span>{notes.length}</span></button>
    </div>
    <p className={styles.readingHint}>{view === "catalog" ? "Click a paper title or Read summary to open its reading page. Find a detailed explanation or a short, attributed abstract excerpt, then follow the original source for the full conclusion." : "Each reading card explains the main finding, study setup, measurements, results in context, and limitations. Open a card to read more."}</p>
    <div className={styles.toolbar}>
      <label className={styles.search}><span>Search publications</span><input type="search" value={query} onChange={(event) => updateBrowse({ q: event.target.value, page: "1" })} placeholder="Title, topic, author, or PMID" /></label>
      <label className={styles.compoundFilter}><span>Publication type</span><select aria-label="Publication type" value={category} onChange={(event) => updateBrowse({ type: event.target.value, page: "1" })}><option value="all">All publication types</option>{Object.entries(publicationCategories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label className={styles.yearFilter}><span>Year</span><select aria-label="Year" value={year} onChange={(event) => updateBrowse({ year: event.target.value, page: "1" })}><option value="all">All years</option>{years.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
      <label className={styles.yearFilter}><span>Sort</span><select aria-label="Sort" value={sort} onChange={(event) => updateBrowse({ sort: event.target.value, page: "1" })}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
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
            <h2><StudyReaderLink slug={slug} pmid={paper.id}>{paper.title}</StudyReaderLink></h2>
            <p className={styles.publicationMeta}>{paper.authors} · <cite>{paper.journal}</cite></p>
            <p className={styles.indexingNote}><strong>Why included:</strong> {paper.relevance.reason}</p>
            {notice && <p className={styles.notice}>{notice}</p>}
            <p className={styles.indexingNote}>{paper.types.join(" · ")}{!paper.hasAbstract ? " · No abstract indexed" : ""}</p>
            <div className={styles.catalogLinks}><StudyReaderLink slug={slug} pmid={paper.id}>Read summary <ArrowIcon /><small>{sourceId ? "Detailed explanation" : paper.hasAbstract ? "Abstract excerpt & source" : "Citation & source"}</small></StudyReaderLink><a href={`https://pubmed.ncbi.nlm.nih.gov/${paper.id}/`}>PubMed <ArrowIcon /><small>PMID {paper.id}</small></a>{sourceId && <button type="button" onClick={() => readNotes(sourceId)}>Quick explanation <ArrowIcon /></button>}</div>
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
