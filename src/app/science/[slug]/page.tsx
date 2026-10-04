import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchEntries, researchSlugs, evidenceLabel } from "@/lib/research";
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
      <nav className={styles.paperNav} aria-label="Jump to a study">
        <p className={styles.eyebrow}>In this reading list</p>
        <ol>{papers.map((entry) => <li key={entry.sourceId}><a href={`#study-${entry.sourceId.replace(/\W+/g, "-").toLowerCase()}`}><span>{entry.year}</span>{entry.title ?? entry.focus}</a></li>)}</ol>
      </nav>
      <section className={styles.detailStudies} aria-label={`${compound} selected studies`}>
        {papers.map((entry) => <article key={entry.sourceId} id={`study-${entry.sourceId.replace(/\W+/g, "-").toLowerCase()}`} className={styles.detailStudy}>
          <div className={styles.cardTop}><span className={styles.eyebrow}>{entry.area}</span><span className={styles.year}>{entry.year}</span></div>
          <h2>{entry.title ?? entry.focus}</h2>
          <div className={styles.badges}><span className={entry.evidence === "human" ? styles.humanBadge : styles.badge}>{evidenceLabel(entry)}</span>{entry.related && <span className={styles.badge}>Related-compound evidence</span>}</div>
          <dl className={styles.studyFacts}>
            <div><dt>Study model</dt><dd>{entry.model}</dd></div>
            <div><dt>Publication</dt><dd>{entry.authors} · <cite>{entry.journal}</cite> · {entry.year}</dd></div>
          </dl>
          <div className={styles.studyNotes}>
            <section><h3>What the researchers observed</h3><p>{entry.finding}</p></section>
            <section className={styles.detailLimit}><h3>What this does not establish</h3><p>{entry.limitation}</p></section>
          </div>
          <a className={styles.sourceLink} href={entry.source}>Read the original study <ArrowIcon /><small>{entry.sourceId} · {entry.sourceId.startsWith("PMCID") ? "PubMed Central" : "PubMed"}</small></a>
        </article>)}
      </section>
      <aside className={styles.boundary} aria-label="Research scope">
        <p>Evidence labels describe the selected paper, not all research on {compound}. Read the original publication for full methods, adverse events, and limitations. This curated list does not claim to include the latest evidence; expanded October 3, 2026, with citations checked September 21–October 3, 2026.</p>
        <p>Educational information only; no dosing or treatment guidance. Products are for laboratory research and not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
      <Link className={styles.backLink} href="/science">Back to research library</Link>
    </div>
  );
}
