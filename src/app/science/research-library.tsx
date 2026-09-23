"use client";

import { useState } from "react";
import { researchEntries } from "@/lib/research";
import styles from "./research.module.css";

const filters = [
  { value: "all", label: "All papers" },
  { value: "human", label: "Human studies" },
  { value: "preclinical", label: "Preclinical studies" },
] as const;

export default function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const normalizedQuery = query.trim().toLowerCase();
  const entries = researchEntries.filter((entry) =>
    (filter === "all" || entry.evidence === filter) &&
    `${entry.compound} ${entry.area} ${entry.focus} ${entry.model}`.toLowerCase().includes(normalizedQuery)
  );

  function reset() {
    setQuery("");
    setFilter("all");
  }

  return (
    <section id="study-library" className={styles.library} aria-labelledby="library-heading">
      <div className={styles.libraryHeading}>
        <div><p className={styles.eyebrow}>Follow the evidence</p><h2 id="library-heading">The study library.</h2></div>
        <p>One starting paper per compound.<br />Original sources. Clear boundaries.</p>
      </div>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span>Search the library</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Compound, topic, or model" />
        </label>
        <div className={styles.filters} role="group" aria-label="Filter papers by evidence type">
          {filters.map((item) => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div>
      </div>
      <div className={styles.resultsMeta}>
        <p role="status">{entries.length} of {researchEntries.length} papers{filter !== "all" ? ` · ${filter === "human" ? "Human" : "Preclinical"} studies` : ""}</p>
        {(query || filter !== "all") && <button type="button" onClick={reset}>Reset filters</button>}
      </div>
      {entries.length ? <div className={styles.studyGrid}>
        {entries.map((entry) => <article key={entry.slug} className={styles.study} id={`research-${entry.slug}`} aria-labelledby={`title-${entry.slug}`}>
          <div className={styles.cardTop}><span className={styles.eyebrow}>{entry.area}</span><span className={styles.year}>{entry.year}</span></div>
          <h3 id={`title-${entry.slug}`}>{entry.compound}</h3>
          <div className={styles.badges}><span className={entry.evidence === "human" ? styles.humanBadge : styles.badge}>{entry.evidence === "human" ? "Human study" : "Preclinical"}</span>{entry.related && <span className={styles.badge}>Related compound</span>}</div>
          <p className={styles.model}>{entry.model}</p>
          <h4>{entry.focus}</h4>
          <p className={styles.finding}>{entry.finding}</p>
          <div className={styles.limit}><span className={styles.eyebrow}>Keep in mind</span><p>{entry.limitation}</p></div>
          <div className={styles.citation}>
            <p>{entry.authors} · {entry.year}<br /><cite>{entry.journal}</cite></p>
            <a href={entry.source} aria-label={`Read the ${entry.compound} source paper on ${entry.sourceId.startsWith("PMCID") ? "PubMed Central" : "PubMed"}`}>Read source paper <span aria-hidden="true">↗</span><small>{entry.sourceId}</small></a>
          </div>
        </article>)}
      </div> : <div className={styles.empty}><h3>No papers match this search.</h3><p>Try a compound such as BPC-157, a topic such as tendon, or clear the filters.</p><button className={styles.primaryLink} type="button" onClick={reset}>Show all papers <span aria-hidden="true">↗</span></button></div>}
    </section>
  );
}
