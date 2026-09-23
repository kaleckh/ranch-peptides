import type { Metadata } from "next";
import ResearchLibrary from "./research-library";
import styles from "./research.module.css";

export const metadata: Metadata = {
  title: "Research Library | SALT N’ PEP",
  description: "Explore a curated peptide research library with primary-source links, study models, and clear limitations for eight compounds.",
};

export default function SciencePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>SALT N’ PEP / Research notes</p>
          <h1>Curiosity,<br /><em>with context.</em></h1>
          <p className={styles.intro}>Good research starts with better questions. Explore the papers, understand the models, and see where the evidence ends.</p>
          <a className={styles.primaryLink} href="#study-library">Explore the library <span aria-hidden="true">↘</span></a>
        </div>
        <aside className={styles.heroNote} aria-label="About this reading list">
          <span className={styles.star} aria-hidden="true">✳</span>
          <p className={styles.eyebrow}>The reading room</p>
          <h2>Small compounds.<br />A closer look.</h2>
          <p>Eight selected primary papers, with the experimental context kept in view.</p>
          <div className={styles.noteMeta}><span>Edition 01</span><span>September 2026</span></div>
        </aside>
      </header>

      <section className={styles.guide} aria-labelledby="reading-guide">
        <div className={styles.guideIntro}>
          <p className={styles.eyebrow}>Before you dive in</p>
          <h2 id="reading-guide">Read the model.<br /><em>Then the result.</em></h2>
          <p>Evidence labels below describe the selected paper, not the entire body of research on a compound.</p>
        </div>
        <div className={styles.guideItems}>
          <details>
            <summary><span>01</span> What counts as human evidence?</summary>
            <p>Look for participants, a comparison group, measured outcomes, and follow-up. A small early trial answers different questions from a larger randomized study. A human-cell experiment remains preclinical.</p>
          </details>
          <details>
            <summary><span>02</span> What can preclinical studies tell us?</summary>
            <p>Cell, tissue, and animal experiments help investigate mechanisms and generate hypotheses. Their results need separate evaluation in people; they do not establish human benefit or safety.</p>
          </details>
          <details>
            <summary><span>03</span> Does a paper validate a product?</summary>
            <p>Check the exact molecule, sequence, formulation, model, and outcome. A publication about a compound is not a batch analysis, a product endorsement, or instructions for use.</p>
          </details>
        </div>
      </section>

      <ResearchLibrary />

      <aside className={styles.boundary}>
        <p className={styles.eyebrow}>A note on scope</p>
        <h2>Keep the question open.</h2>
        <p>This is a curated starting point, not a systematic review or a claim to include the latest evidence. Read each original source for its methods, adverse events, and limitations. Links were checked on September 21, 2026.</p>
        <p>Educational information only; no dosing or treatment guidance. SALT N’ PEP products are intended for laboratory research and are not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
    </div>
  );
}
