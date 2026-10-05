import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchEntries, researchSlugs, evidenceLabel } from "@/lib/research";
import { evidenceContext, studyReadingDetails } from "@/lib/research-reading";
import { catalogCheckedLabel, catalogThroughLabel, researchCatalogs, pubmedId } from "@/lib/research-catalog";
import { publicationNotice, publicationSearch, studyAnchor } from "@/lib/research-catalog-format";
import ResearchBrowser from "../research-browser";
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
    description: `Browse ${entry.compound} publications indexed in PubMed and detailed explanations of selected studies, including methods, findings, and limitations.`,
  };
}

export default async function CompoundResearchPage({ params }: Props) {
  const { slug } = await params;
  const papers = researchEntries.filter((entry) => entry.slug === slug).sort((a, b) => Number(b.year) - Number(a.year));
  if (!papers.length) notFound();
  const compound = papers[0].compound;
  const catalog = researchCatalogs[slug];
  const indexed = new Map(catalog.papers.map((paper) => [paper.id, paper]));
  const notes = papers.map((entry) => {
    const publication = indexed.get(pubmedId(entry.sourceId))!;
    return { sourceId: entry.sourceId, id: publication.id, year: entry.year, category: publication.category, search: `${publicationSearch(publication)} ${entry.focus} ${entry.model}`.toLowerCase() };
  });

  return (
    <div className={`${styles.page} ${styles.detailPage}`}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/science">Research library</Link><span aria-hidden="true">/</span><span>{compound}</span>
      </nav>
      <header className={styles.header}>
        <h1>{compound} studies</h1>
        <p>{catalog.count.toLocaleString()} compound-focused publications · {papers.length} studies with detailed explanations.</p>
      </header>
      {slug === "tb-500" && <p className={styles.readingHint}>This collection includes related thymosin beta4 research. A paper on the parent peptide does not establish that a TB-500 fragment or a product sold under that name has the same effects.</p>}
      <ResearchBrowser compound={compound} area={papers[0].area} papers={catalog.papers} notes={notes}>
        {papers.map((entry) => {
          const reading = studyReadingDetails[entry.sourceId];
          const publication = indexed.get(pubmedId(entry.sourceId))!;
          const notice = publicationNotice(publication);
          return (
            <details key={entry.sourceId} id={studyAnchor(entry.sourceId)} className={styles.detailStudy}>
              <summary className={styles.studySummary}>
                <span className={styles.cardTop}><span className={entry.evidence === "human" ? styles.humanBadge : styles.badge}>{evidenceLabel(entry)}</span><span className={styles.year}>{entry.year}</span></span>
                <span className={styles.topicTitle} role="heading" aria-level={2}>{entry.focus}</span>
                <span className={styles.summaryMeta}>{entry.model}{entry.related ? " · Related thymosin beta4 evidence" : ""}</span>
                <span className={styles.takeaway}><span className={styles.takeawayLabel}>Main finding</span><span>{entry.finding}</span></span>
                <span className={styles.readAction}><span className={styles.closedAction}>Explore study details</span><span className={styles.openAction}>Close study details</span><span aria-hidden="true" className={styles.expandIcon}>+</span></span>
              </summary>
              <div className={styles.studyBody}>
                {notice && <p className={styles.notice}>{notice}</p>}
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
                  <p className={styles.paperTitle}>{entry.title ?? reading?.title ?? publication.title}</p>
                  <p className={styles.publicationMeta}>{entry.authors} · <cite>{entry.journal}</cite> · {entry.year}</p>
                  <p className={styles.indexingNote}><strong>Why included:</strong> {publication.relevance.reason}</p>
                  <a className={styles.sourceLink} href={entry.source}>Read the original study <ArrowIcon /><small>{entry.sourceId} · {entry.sourceId.startsWith("PMCID") ? "PubMed Central" : "PubMed"}</small></a>
                </div>
              </div>
            </details>
          );
        })}
      </ResearchBrowser>
      <aside className={styles.boundary} aria-label="Research scope">
        <p>This collection includes {catalog.count.toLocaleString()} of {catalog.searchCount.toLocaleString()} raw PubMed search matches, collected {catalogCheckedLabel}, with publication dates through {catalogThroughLabel}. Papers qualify through a compound-focused title or a source review confirming direct compound involvement. General peptide policy/commentary and unrelated alias matches are excluded; broader titles need review before inclusion. Positive, negative, safety, and analytical findings use the same relevance criteria. This is a selected collection, not all research on {compound} or a study-quality assessment.</p>
        <p>Years follow journal issues; online-first papers may have a later issue year. Reviews, case reports, and modified preparations answer different questions from treatment trials. Trial analyses may reuse participants, so publication counts are not independent trial counts. Read the source and any correction or retraction notice for full methods, adverse events, and limitations.</p>
        <details className={styles.searchScope}><summary>Broader PubMed search and selection scope</summary><p>{catalog.query}</p><p>The broader search also contains incidental mentions and papers awaiting relevance review. A search match alone does not qualify a paper for this collection.</p><a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(catalog.query)}`}>See broader results on PubMed</a></details>
        <p>Educational information only; no dosing or treatment guidance. Products are for laboratory research and not for human consumption. Published findings do not verify the identity, quality, or safety of products sold here.</p>
      </aside>
      <Link className={styles.backLink} href="/science">Back to research library</Link>
    </div>
  );
}
