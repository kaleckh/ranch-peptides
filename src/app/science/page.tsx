import type { Metadata } from "next";
import ResearchLibrary from "./research-library";
import styles from "./research.module.css";
import { researchIndex } from "@/lib/research";
import { catalogCheckedLabel, catalogThroughLabel, indexedPublicationCount, researchCatalogGroups } from "@/lib/research-catalog";

export const metadata: Metadata = {
  title: "Research Library | SALT N’ PEP",
  description: "Search peptide publications indexed in PubMed and read detailed study explanations, methods, findings, and limitations across eight compounds.",
};

export default function SciencePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Research library</h1>
        <p>{indexedPublicationCount.toLocaleString()} indexed publications across eight compound collections, with detailed explanations for {researchIndex.length} selected studies.</p>
      </header>

      <p className={styles.readingHint}>Open a compound to browse its full PubMed search results or read the explained studies. The broader index includes reviews, case reports, and publication notices alongside research papers.</p>
      <ResearchLibrary entries={researchIndex} groups={researchCatalogGroups} />

      <details className={styles.guide}>
        <summary>How to read the evidence</summary>
        <p className={styles.guideNote}>Evidence labels describe the selected paper, not the entire body of research on a compound.</p>
        <div className={styles.guideItems}>
          <div>
            <h2>What counts as human evidence?</h2>
            <p>Look for participants, a comparison group, measured outcomes, and follow-up. A small early trial answers different questions from a larger randomized study. A human-cell experiment remains preclinical.</p>
          </div>
          <div>
            <h2>What can preclinical studies tell us?</h2>
            <p>Cell, tissue, and animal experiments help investigate mechanisms and generate hypotheses. Their results need separate evaluation in people; they do not establish human benefit or safety.</p>
          </div>
          <div>
            <h2>Does a paper validate a product?</h2>
            <p>Check the exact molecule, sequence, formulation, model, and outcome. A publication about a compound is not a batch analysis, a product endorsement, or instructions for use.</p>
          </div>
        </div>
      </details>

      <aside className={styles.boundary} aria-label="Research library scope">
        <p>The index contains all results returned by the compound-name and alias searches in PubMed, collected {catalogCheckedLabel}, for publication dates through {catalogThroughLabel}. It does not cover every database or every paper that could discuss a compound. Publications can appear in more than one collection; counts are not independent trial counts. Publication types follow PubMed indexing and do not establish study quality. The {researchIndex.length} explained studies are a selected reading list, not a systematic review.</p>
        <p>Educational information only; no dosing or treatment guidance. SALT N’ PEP products are intended for laboratory research and are not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
    </div>
  );
}
