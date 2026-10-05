"use client";

import { useState } from "react";
import Link from "next/link";
import type { researchIndex } from "@/lib/research";
import type { researchCatalogGroups } from "@/lib/research-catalog";
import { publicationCategories } from "@/lib/research-catalog-format";
import styles from "./research.module.css";
import { ArrowIcon } from "@/components/arrow-icon";

const evidenceFilters = [
  { value: "all", label: "All explained studies" },
  { value: "human", label: "Human evidence" },
  { value: "preclinical", label: "Preclinical studies" },
] as const;

export default function ResearchLibrary({ entries, groups }: { entries: typeof researchIndex; groups: typeof researchCatalogGroups }) {
  const [query, setQuery] = useState("");
  const [compound, setCompound] = useState("all");
  const [view, setView] = useState("catalog");
  const [category, setCategory] = useState("all");
  const [evidence, setEvidence] = useState<(typeof evidenceFilters)[number]["value"]>("all");
  const normalizedQuery = query.trim().toLowerCase();
  const matching = groups.filter((group) => compound === "all" || group.slug === compound).map((group) => {
    const papers = view === "catalog" ? group.papers.filter((paper) =>
      (category === "all" || paper.category === category) && paper.search.includes(normalizedQuery)
    ) : entries.filter((entry) => entry.slug === group.slug &&
      (evidence === "all" || entry.evidence === evidence || (evidence === "human" && entry.humanObservation)) &&
      `${entry.compound} ${entry.area} ${entry.title ?? ""} ${entry.focus} ${entry.model} ${entry.authors} ${entry.journal} ${entry.year}`.toLowerCase().includes(normalizedQuery)
    ).map((entry) => ({ id: `${entry.journal}-${entry.year}-${entry.focus}`, title: entry.focus, year: entry.year }));
    return { ...group, matching: papers };
  }).filter((group) => group.matching.length);
  const count = matching.reduce((sum, group) => sum + group.matching.length, 0);
  const total = view === "catalog" ? groups.reduce((sum, group) => sum + group.papers.length, 0) : entries.length;

  function reset() {
    setQuery("");
    setCategory("all");
    setEvidence("all");
    setCompound("all");
  }

  return <section id="study-library" className={styles.library} aria-label="Research publications">
    <div className={styles.viewSwitch} role="group" aria-label="Choose library view"><button type="button" aria-pressed={view === "catalog"} onClick={() => setView("catalog")}>Compound publications</button><button type="button" aria-pressed={view === "explained"} onClick={() => setView("explained")}>Explained studies</button></div>
    <div className={styles.toolbar}>
      <label className={styles.search}><span>Search the library</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Compound, title, topic, or author" /></label>
      <label className={styles.compoundFilter}><span>Compound</span><select aria-label="Compound" value={compound} onChange={(event) => setCompound(event.target.value)}><option value="all">All compounds</option>{groups.map((group) => <option key={group.slug} value={group.slug}>{group.compound}</option>)}</select></label>
      {view === "catalog" ? <label className={styles.typeFilter}><span>Publication type</span><select aria-label="Publication type" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All publication types</option>{Object.entries(publicationCategories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label> : <div className={styles.filters} role="group" aria-label="Filter explained studies by evidence type">{evidenceFilters.map((item) => <button key={item.value} type="button" aria-pressed={evidence === item.value} onClick={() => setEvidence(item.value)}>{item.label}</button>)}</div>}
    </div>
    <div className={styles.resultsMeta}><p role="status">{count.toLocaleString()} of {total.toLocaleString()} {view === "catalog" ? "compound publications" : "explained studies"} · {matching.length} {matching.length === 1 ? "compound" : "compounds"}</p>{(query || category !== "all" || evidence !== "all" || compound !== "all") && <button type="button" onClick={reset}>Reset filters</button>}</div>
    {matching.length ? <div className={styles.studyGrid}>{matching.map((group) => {
      const years = group.papers.map((paper) => paper.year);
      const explained = entries.filter((entry) => entry.slug === group.slug);
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (view === "explained") params.set("view", "explained");
      if (view === "catalog" && category !== "all") params.set("type", category);
      const suffix = params.size ? `?${params}` : "";
      return <Link key={group.slug} href={`/science/${group.slug}${suffix}`} className={`${styles.study} ${styles.studyLink}`} aria-label={`View ${group.papers.length} ${group.compound} publications and ${group.explainedCount} explained studies`}>
        <div className={styles.cardTop}><span className={styles.eyebrow}>Research collection</span><span className={styles.year}>{Math.min(...years)}–{Math.max(...years)}</span></div>
        <h2>{group.compound}</h2>
        <p className={styles.collectionCount}>{group.papers.length.toLocaleString()} <span>compound publications</span></p>
        <div className={styles.badges}><span className={styles.badge}>{group.explainedCount} detailed explanations</span>{group.related && <span className={styles.badge}>Related thymosin beta4</span>}{view === "explained" && explained.some((paper) => paper.evidence === "human") && <span className={styles.humanBadge}>Human evidence</span>}</div>
        <ul className={styles.paperTopics}>{group.matching.slice(0, 3).map((paper) => <li key={paper.id}>{paper.title}</li>)}</ul>
        <div className={styles.citation}><p>{group.matching.length.toLocaleString()} {view === "catalog" ? "publications" : "explained studies"}{query || compound !== "all" || (view === "catalog" ? category !== "all" : evidence !== "all") ? " match your filters" : " in this view"}</p><span className={styles.cardAction}>Browse research <ArrowIcon /></span></div>
      </Link>;
    })}</div> : <div className={styles.empty}><h3>No papers match this search.</h3><p>Try a compound such as BPC-157, a topic such as tendon, or clear the filters.</p><button className={styles.primaryLink} type="button" onClick={reset}>Show all papers <ArrowIcon /></button></div>}
  </section>;
}
