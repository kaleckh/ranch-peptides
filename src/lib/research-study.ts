import excerpts from "./research-source-excerpts.json";
import { pubmedId, researchCatalogs } from "./research-catalog";
import { researchEntries } from "./research";
import { studyReadingDetails } from "./research-reading";
import type { IndexedPublication } from "./research-catalog-format";

export type SourceExcerpt = {
  text: string;
  truncated: boolean;
  section: string;
  kind: "conclusion" | "abstract";
  position: "opening" | "closing" | "selected";
  sourceHash: string;
};

export const sourceExcerpts = excerpts.excerpts as Record<string, SourceExcerpt>;

export function studyRecord(slug: string, pmid: string) {
  const catalog = researchCatalogs[slug];
  const publication = catalog?.papers.find((paper) => paper.id === pmid);
  if (!publication) return null;
  const entry = researchEntries.find((paper) => paper.slug === slug && pubmedId(paper.sourceId) === pmid);
  const compound = researchEntries.find((paper) => paper.slug === slug)!.compound;
  return { publication, compound, entry, reading: entry ? studyReadingDetails[entry.sourceId] : undefined, excerpt: sourceExcerpts[pmid] };
}

export function publicationContext(paper: IndexedPublication) {
  if (paper.category === "case-report") return "Individual case reports can identify a possible safety signal. They cannot establish how often an event occurs or prove that the peptide caused it.";
  if (paper.category === "review") return "This paper brings together existing research. Its conclusions depend on the included studies and their methods; it is not a separate treatment trial.";
  if (paper.category === "clinical-trial") return "Read the full methods for the participants, comparison group, outcomes, and follow-up. A trial publication may report a secondary analysis of an existing trial rather than new participants.";
  if (paper.category === "other") return "Publication format alone does not identify the study design. Letters can report original research; correction and retraction records concern another publication. Check the source for the full context.";
  return "Check the methods for the exact molecule, preparation, and research model. Measurements of a naturally occurring peptide differ from testing its administration. Cell and animal findings need separate evaluation in people.";
}
