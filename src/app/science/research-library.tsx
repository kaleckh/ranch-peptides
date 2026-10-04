"use client";

import { useState } from "react";
import Link from "next/link";
import type { researchIndex } from "@/lib/research";
import styles from "./research.module.css";
import { ArrowIcon } from "@/components/arrow-icon";

const filters = [
  { value: "all", label: "All papers" },
  { value: "human", label: "Human evidence" },
  { value: "preclinical", label: "Preclinical studies" },
] as const;

export default function ResearchLibrary({ entries: allEntries }: { entries: typeof researchIndex }) {
  const [query, setQuery] = useState("");
  const [compound, setCompound] = useState("all");
  const [filter, setFilter] = useState<(typeof filters)[number]["value"]>("all");
  const normalizedQuery = query.trim().toLowerCase();
  const compounds = [...new Map(allEntries.map((entry) => [entry.slug, entry])).values()];
  const entries = allEntries.filter((entry) =>
    (filter === "all" || entry.evidence === filter || (filter === "human" && entry.humanObservation)) &&
    (compound === "all" || entry.slug === compound) &&
    `${entry.compound} ${entry.area} ${entry.title ?? ""} ${entry.focus} ${entry.model} ${entry.authors} ${entry.journal} ${entry.year}`.toLowerCase().includes(normalizedQuery)
  );
  const groups = compounds.filter((compound) => entries.some((entry) => entry.slug === compound.slug));

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
            {compounds.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.compound}</option>)}
          </select>
        </label>
        <div className={styles.filters} role="group" aria-label="Filter papers by evidence type">
          {filters.map((item) => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div>
      </div>
      <div className={styles.resultsMeta}>
        <p role="status">{entries.length} of {allEntries.length} papers · {groups.length} {groups.length === 1 ? "compound" : "compounds"}</p>
        {(query || filter !== "all" || compound !== "all") && <button type="button" onClick={reset}>Reset filters</button>}
      </div>
      {entries.length ? <div className={styles.studyGrid}>
        {groups.map((entry) => {
          const papers = allEntries.filter((paper) => paper.slug === entry.slug);
          const matching = entries.filter((paper) => paper.slug === entry.slug);
          const years = papers.map((paper) => Number(paper.year));
          return <Link key={entry.slug} href={`/science/${entry.slug}`} className={`${styles.study} ${styles.studyLink}`} aria-label={`View all ${papers.length} ${entry.compound} studies`}>
          <div className={styles.cardTop}><span className={styles.eyebrow}>Selected research</span><span className={styles.year}>{Math.min(...years)}–{Math.max(...years)}</span></div>
          <h2>{entry.compound}</h2>
          <div className={styles.badges}>{papers.some((paper) => paper.evidence === "human") && <span className={styles.humanBadge}>Human evidence</span>}{papers.some((paper) => paper.humanObservation) && <span className={styles.badge}>Human observations</span>}{papers.some((paper) => paper.evidence === "preclinical") && <span className={styles.badge}>Preclinical studies</span>}{entry.related && <span className={styles.badge}>Related compound</span>}</div>
          <ul className={styles.paperTopics}>{matching.slice(0, 3).map((paper) => <li key={`${paper.journal}-${paper.year}-${paper.focus}`}>{paper.focus}</li>)}</ul>
          <div className={styles.citation}>
            <p>{papers.length} selected papers{matching.length < papers.length ? ` · ${matching.length} match` : ""}</p>
            <span className={styles.cardAction}>View all studies <ArrowIcon /></span>
          </div>
        </Link>;
        })}
      </div> : <div className={styles.empty}><h3>No papers match this search.</h3><p>Try a compound such as BPC-157, a topic such as tendon, or clear the filters.</p><button className={styles.primaryLink} type="button" onClick={reset}>Show all papers <ArrowIcon /></button></div>}
    </section>
  );
}
