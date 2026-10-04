"use client";

import { useState } from "react";
import { researchEntries } from "@/lib/research";
import styles from "./research.module.css";
import { ArrowIcon } from "@/components/arrow-icon";

const filters = [
  { value: "all", label: "All papers" },
  { value: "human", label: "Human studies" },
  { value: "preclinical", label: "Preclinical studies" },
] as const;

export default function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [compound, setCompound] = useState("all");
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const normalizedQuery = query.trim().toLowerCase();
  const entries = researchEntries.filter((entry) =>
    (filter === "all" || entry.evidence === filter) &&
    (compound === "all" || entry.slug === compound) &&
    `${entry.compound} ${entry.area} ${entry.focus} ${entry.model} ${entry.authors} ${entry.journal} ${entry.year}`.toLowerCase().includes(normalizedQuery)
  );

  function reset() {
    setQuery("");
    setFilter("all");
    setCompound("all");
  }

  return (
    <section id="study-library" className={styles.library} aria-label="Selected research papers">
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span>Search the library</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Compound, topic, or model" />
        </label>
        <label className={styles.compoundFilter}>
          <span>Compound</span>
          <select value={compound} onChange={(event) => setCompound(event.target.value)}>
            <option value="all">All compounds</option>
            {researchEntries.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.compound}</option>)}
          </select>
        </label>
        <div className={styles.filters} role="group" aria-label="Filter papers by evidence type">
          {filters.map((item) => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div>
      </div>
      <div className={styles.resultsMeta}>
        <p role="status">{entries.length} of {researchEntries.length} papers{filter !== "all" ? ` · ${filter === "human" ? "Human" : "Preclinical"} studies` : ""}</p>
        {(query || filter !== "all" || compound !== "all") && <button type="button" onClick={reset}>Reset filters</button>}
      </div>
      {entries.length ? <div className={styles.studyGrid}>
        {entries.map((entry) => <article key={entry.slug} className={styles.study} id={`research-${entry.slug}`} aria-labelledby={`title-${entry.slug}`}>
          <div className={styles.cardTop}><span className={styles.eyebrow}>{entry.area}</span><span className={styles.year}>{entry.year}</span></div>
          <h2 id={`title-${entry.slug}`}>{entry.compound}</h2>
          <div className={styles.badges}><span className={entry.evidence === "human" ? styles.humanBadge : styles.badge}>{entry.evidence === "human" ? "Human study" : "Preclinical"}</span>{entry.related && <span className={styles.badge}>Related compound</span>}</div>
          <p className={styles.model}>{entry.model}</p>
          <h3>{entry.focus}</h3>
          <p className={styles.finding}>{entry.finding}</p>
          <div className={styles.limit}><span className={styles.eyebrow}>Keep in mind</span><p>{entry.limitation}</p></div>
          <div className={styles.citation}>
            <p>{entry.authors} · {entry.year}<br /><cite>{entry.journal}</cite></p>
            <a href={entry.source} aria-label={`Read the ${entry.compound} source paper on ${entry.sourceId.startsWith("PMCID") ? "PubMed Central" : "PubMed"}`}>Read source paper <ArrowIcon /><small>{entry.sourceId}</small></a>
          </div>
        </article>)}
      </div> : <div className={styles.empty}><h3>No papers match this search.</h3><p>Try a compound such as BPC-157, a topic such as tendon, or clear the filters.</p><button className={styles.primaryLink} type="button" onClick={reset}>Show all papers <ArrowIcon /></button></div>}
    </section>
  );
}
