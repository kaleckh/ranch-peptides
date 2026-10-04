import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchEntries, researchSlugs, evidenceLabel } from "@/lib/research";
import { evidenceContext, studyReadingDetails } from "@/lib/research-reading";
import { ArrowIcon } from "@/components/arrow-icon";
import styles from "../research.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = researchEntries.find((paper) => paper.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.compound} Studies | SALT N’ PEP`,
    description: `Explore selected ${entry.compound} research, including study models, findings, limitations, and primary sources.`,
  };
}

export default async function CompoundResearchPage({ params }: Props) {
  const { slug } = await params;
  const papers = researchEntries.filter((entry) => entry.slug === slug).sort((a, b) => Number(b.year) - Number(a.year));
  if (!papers.length) notFound();
  const compound = papers[0].compound;

  return (
    <div className={`${styles.page} ${styles.detailPage}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/science">Research library</Link><span aria-hidden="true">/</span><span>{compound}</span>
      </nav>
      <header className={styles.header}>
        <h1>{compound} studies</h1>
        <p>{papers.length} selected primary papers. A starting point for reading, not a complete assessment of the evidence.</p>
      </header>
      <p className={styles.readingHint}>Start with the main finding on each card. Open it to understand the evidence, study details, and limitations, then follow the original source. Newest papers first.</p>
      <section className={styles.detailStudies} aria-label={`${compound} selected studies`}>
        {papers.map((entry) => {
          const reading = studyReadingDetails[entry.sourceId];
          return (
            <details key={entry.sourceId} id={`study-${entry.sourceId.replace(/\W+/g, "-").toLowerCase()}`} className={styles.detailStudy}>
              <summary className={styles.studySummary}>
                <span className={styles.cardTop}><span className={entry.evidence === "human" ? styles.humanBadge : styles.badge}>{evidenceLabel(entry)}</span><span className={styles.year}>{entry.year}</span></span>
                <span className={styles.topicTitle} role="heading" aria-level={2}>{entry.focus}</span>
                <span className={styles.summaryMeta}>{entry.model}{entry.related ? " · Related thymosin beta4 evidence" : ""}</span>
                <span className={styles.takeaway}><span className={styles.takeawayLabel}>Main finding</span><span>{entry.finding}</span></span>
                <span className={styles.readAction}><span className={styles.closedAction}>Explore study details</span><span className={styles.openAction}>Close study details</span><span aria-hidden="true" className={styles.expandIcon}>+</span></span>
              </summary>
              <div className={styles.studyBody}>
                <dl className={styles.studyFacts}>
                  <div><dt>What was studied</dt><dd>{entry.model}</dd></div>
                  <div><dt>How to read this evidence</dt><dd>{evidenceContext(entry)}</dd></div>
                  {reading && <>
                    <div><dt>How the study was set up</dt><dd>{reading.design}</dd></div>
                    <div><dt>What the researchers measured</dt><dd>{reading.measures}</dd></div>
                  </>}
                </dl>
                <div className={`${styles.studyNotes} ${reading ? "" : styles.limitOnly}`}>
                  {reading && <section><h3>Results in context</h3><p>{reading.context}</p></section>}
                  <section className={styles.detailLimit}><h3>What this does not establish</h3><p>{entry.limitation}</p></section>
                </div>
                <div className={styles.publication}>
                  <h3>Original publication</h3>
                  <p className={styles.paperTitle}>{entry.title ?? reading?.title ?? entry.focus}</p>
                  <p className={styles.publicationMeta}>{entry.authors} · <cite>{entry.journal}</cite> · {entry.year}</p>
                  <a className={styles.sourceLink} href={entry.source}>Read the original study <ArrowIcon /><small>{entry.sourceId} · {entry.sourceId.startsWith("PMCID") ? "PubMed Central" : "PubMed"}</small></a>
                </div>
              </div>
            </details>
          );
        })}
      </section>
      <aside className={styles.boundary} aria-label="Research scope">
        <p>Evidence labels describe the selected paper, not all research on {compound}. Trial analyses can draw on the same participants; paper counts are not counts of independent trials. Read the original publication for full methods, adverse events, and limitations. Coverage is not comprehensive; reading notes expanded October 4, 2026, with citations checked September 21–October 4, 2026.</p>
        <p>Educational information only; no dosing or treatment guidance. Products are for laboratory research and not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
      <Link className={styles.backLink} href="/science">Back to research library</Link>
    </div>
  );
}
