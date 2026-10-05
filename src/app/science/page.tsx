import type { Metadata } from "next";
import ResearchLibrary from "./research-library";
import styles from "./research.module.css";
import { researchIndex } from "@/lib/research";
import { catalogCheckedLabel, catalogThroughLabel, indexedPublicationCount, catalogSearchMatchCount, researchCatalogGroups } from "@/lib/research-catalog";

export const metadata: Metadata = {
  title: "Research Library | SALT N’ PEP",
  description: "Search peptide publications indexed in PubMed and read detailed study explanations, methods, findings, and limitations across eight compounds.",
};

export default function SciencePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Research library</h1>
        <p>{indexedPublicationCount.toLocaleString()} compound-focused publications across eight collections, with detailed explanations for {researchIndex.length} selected studies.</p>
      </header>

      <p className={styles.readingHint}>Open a compound, then click any paper for its reading page: a detailed study explanation or a brief abstract excerpt with the original source. Inclusion depends on relevance to the compound, whether the findings are positive, negative, or safety-related.</p>
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
        <p>This collection includes {indexedPublicationCount.toLocaleString()} entries selected from {catalogSearchMatchCount.toLocaleString()} PubMed compound-name and alias search matches, collected {catalogCheckedLabel}, for publication dates through {catalogThroughLabel}. Papers qualify through a compound-focused title or a source review confirming direct compound involvement. General peptide policy/commentary and unrelated alias matches are excluded. Broader titles require review before inclusion, so this is a selected collection, not all literature or a systematic review.</p>
        <p>Title-based relevance does not establish study quality. Read each paper’s inclusion reason and original source. Reviews, case reports, analytical studies, and modified preparations answer different questions from treatment trials. Publications can appear in more than one collection or reuse trial participants; counts are not independent trials. The {researchIndex.length} explained studies provide additional methods, findings, and limitations.</p>
        <p>Educational information only; no dosing or treatment guidance. SALT N’ PEP products are intended for laboratory research and are not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
    </div>
  );
}
