import type { Metadata } from "next";
import ResearchLibrary from "./research-library";
import styles from "./research.module.css";
import { researchIndex } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research Library | SALT N’ PEP",
  description: "Explore a curated peptide research library with primary-source links, study models, and clear limitations for eight compounds.",
};

export default function SciencePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Research library</h1>
        <p>{researchIndex.length} selected primary papers across eight compounds. Study models, original sources, and limitations in one place.</p>
      </header>

      <ResearchLibrary entries={researchIndex} />

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
        <p>This is a curated starting point, not a systematic review or a claim to include the latest evidence. Read each original source for its methods, adverse events, and limitations. Expanded October 3, 2026; citations checked September 21–October 3, 2026.</p>
        <p>Educational information only; no dosing or treatment guidance. SALT N’ PEP products are intended for laboratory research and are not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
    </div>
  );
}
