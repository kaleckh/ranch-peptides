export const publicationCategories = {
  "clinical-trial": "Clinical trial publications",
  review: "Reviews & meta-analyses",
  "case-report": "Case reports",
  research: "Other journal articles",
  other: "Editorials, letters & notices",
} as const;

export type PublicationCategory = keyof typeof publicationCategories;
export type IndexedPublication = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  types: string[];
  category: PublicationCategory;
  topics: string[];
  hasAbstract: boolean;
  notices: string[];
  relevance: {
    basis: "title" | "reviewed-source";
    reason: string;
  };
};

export function publicationNotice(paper: Pick<IndexedPublication, "types" | "notices">) {
  if (paper.types.includes("Retracted Publication") || paper.notices.includes("RetractionIn")) return "Retracted publication — read the linked retraction before using these findings.";
  if (paper.types.includes("Retraction Notice") || paper.notices.includes("RetractionOf")) return "Retraction notice — this record concerns a retracted publication.";
  if (paper.notices.includes("ExpressionOfConcernIn")) return "Expression of concern — check the journal notice before interpreting this paper.";
  if (paper.notices.includes("ErratumIn")) return "A published correction is linked in the original PubMed record.";
  return "";
}

export function publicationSearch(paper: IndexedPublication) {
  return `${paper.id} ${paper.title} ${paper.authors} ${paper.journal} ${paper.year} ${paper.topics.join(" ")} ${paper.relevance.reason}`.toLowerCase();
}

export function studyAnchor(sourceId: string) {
  return `study-${sourceId.replace(/\W+/g, "-").toLowerCase()}`;
}
