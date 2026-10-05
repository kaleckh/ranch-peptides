import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/arrow-icon";
import { researchCatalogs, catalogCheckedLabel } from "@/lib/research-catalog";
import { publicationCategories, publicationNotice } from "@/lib/research-catalog-format";
import { evidenceLabel } from "@/lib/research";
import { evidenceContext } from "@/lib/research-reading";
import { studyRecord, publicationContext } from "@/lib/research-study";
import styles from "../../research.module.css";
import { StudyCollectionLink } from "../../study-navigation";

type Props = { params: Promise<{ slug: string; pmid: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.entries(researchCatalogs).flatMap(([slug, catalog]) => catalog.papers.map((paper) => ({ slug, pmid: paper.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, pmid } = await params;
  const record = studyRecord(slug, pmid);
  if (!record) return {};
  return { title: `${record.publication.title} | SALT N’ PEP`, description: `Read the study overview, source excerpt, and evidence context for this ${record.compound} publication.` };
}

export default async function StudyPage({ params }: Props) {
  const { slug, pmid } = await params;
  const record = studyRecord(slug, pmid);
  if (!record) notFound();
  const { publication: paper, compound, entry, reading, excerpt } = record;
  const notice = publicationNotice(paper);
  const source = `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
  const retracted = paper.types.includes("Retracted Publication") || paper.types.includes("Retraction Notice") || paper.notices.some((value) => ["RetractionIn", "RetractionOf"].includes(value));

  return <div className={`${styles.page} ${styles.studyPage}`}>
    <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/science">Research library</Link><span aria-hidden="true">/</span><StudyCollectionLink slug={slug}>{compound}</StudyCollectionLink><span aria-hidden="true">/</span><span>Study summary</span></nav>
    <header className={`${styles.header} ${styles.readerHeader}`}>
      <div className={styles.cardTop}><span className={styles.eyebrow}>{entry ? evidenceLabel(entry) : publicationCategories[paper.category]}</span><span className={styles.year}>{paper.year}</span></div>
      <h1>{paper.title}</h1>
      <p>{paper.authors} · <cite>{paper.journal}</cite> · PMID {pmid}</p>
    </header>
    {notice && <p className={styles.notice}>{notice}</p>}
    <section className={styles.readerFinding} aria-labelledby="study-finding">
      <p className={styles.eyebrow}>{entry ? "Study summary" : excerpt ? "From the original abstract" : "Available source information"}</p>
      <h2 id="study-finding">{entry ? retracted ? "Reported finding before retraction" : "Main finding" : excerpt ? retracted ? "Retracted publication — source excerpt" : excerpt.kind === "conclusion" ? "Authors’ conclusion — excerpt" : "Abstract excerpt" : paper.hasAbstract ? "Source abstract requires review" : "No abstract indexed"}</h2>
      {retracted && <p className={styles.readerCaption}>This record is flagged as retracted or withdrawn. Read the linked notice before interpreting the excerpt or reported finding.</p>}
      {entry ? <p className={styles.readerTakeaway}>{entry.finding}</p> : excerpt ? <>
        <blockquote className={styles.readerTakeaway}><p>“{excerpt.text}{excerpt.truncated ? "…" : ""}”</p></blockquote>
        <p className={styles.readerCaption}>{excerpt.section ? `From the abstract’s ${excerpt.section.toLowerCase()} section.` : excerpt.position === "selected" ? "From a selected sentence in the indexed abstract." : `From the ${excerpt.position} sentence of the indexed abstract.`} {excerpt.truncated ? "This is a shortened quotation; the full sentence continues in the original abstract." : "This is a short quotation from the authors, not a full study appraisal."}</p>
      </> : <p className={styles.readerTakeaway}>{paper.hasAbstract ? "An abstract is indexed, but a reliable excerpt has not been selected. The citation alone does not provide enough information to summarize the findings." : "PubMed provides a citation without an abstract for this paper. The citation identifies the topic, but does not provide enough information to summarize the findings."} Read the original publication for its results and conclusion.</p>}
      <a className={styles.sourceLink} href={`${source}${paper.hasAbstract ? "#abstract" : ""}`}>{paper.hasAbstract ? "Read the full abstract & conclusion" : "Find the original publication"} <ArrowIcon /></a>
    </section>
    {reading && entry && <>
      <dl className={`${styles.studyFacts} ${styles.readerFacts}`}>
        <div><dt>What was studied</dt><dd>{entry.model}</dd></div>
        <div><dt>How the study was set up</dt><dd>{reading.design}</dd></div>
        <div><dt>What the researchers measured</dt><dd>{reading.measures}</dd></div>
        <div><dt>How to read this evidence</dt><dd>{evidenceContext(entry)}</dd></div>
      </dl>
      <div className={styles.studyNotes}><section><h2>Results in context</h2><p>{reading.context}</p></section><section className={styles.detailLimit}><h2>What this does not establish</h2><p>{entry.limitation}</p></section></div>
    </>}
    {!entry && <section className={styles.readerContext}><h2>How to read this paper</h2><p>{publicationContext(paper)}</p><p>A brief excerpt cannot capture the complete methods, results, adverse events, or limitations. Check the full abstract and original paper before interpreting the finding.</p></section>}
    {slug === "tb-500" && <p className={styles.readingHint}>This collection includes related thymosin beta4 research. Parent or engineered peptide findings do not establish that a TB-500 fragment or a product sold under that name has the same effects.</p>}
    <section className={`${styles.publication} ${styles.readerSource}`} aria-labelledby="study-source">
      <h2 id="study-source">Publication & source</h2>
      <dl className={styles.studyFacts}>
        <div><dt>Why this paper is included</dt><dd>{paper.relevance.reason}</dd></div>
        <div><dt>Publication indexing</dt><dd>{paper.types.join(" · ")}</dd></div>
        {!!paper.topics.length && <div><dt>Indexed subjects</dt><dd>{paper.topics.join(" · ")}</dd></div>}
        <div><dt>Source checked</dt><dd>{catalogCheckedLabel}. Years follow journal issues; online-first dates may differ.</dd></div>
      </dl>
      <div className={styles.readerLinks}><a className={styles.sourceLink} href={source}>Open PubMed record <ArrowIcon /><small>PMID {pmid} · Journal and full-text links</small></a>{entry?.source !== source && entry?.source && <a className={styles.sourceLink} href={entry.source}>Open original source <ArrowIcon /><small>{entry.sourceId}</small></a>}</div>
    </section>
    <p className={styles.boundary}>Educational research information. A publication does not verify the identity, quality, or safety of products sold here.</p>
    <StudyCollectionLink className={styles.backLink} slug={slug}>Back to {compound} studies</StudyCollectionLink>
  </div>;
}
