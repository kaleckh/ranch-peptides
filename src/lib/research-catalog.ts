import snapshot from "./research-catalog-data.json";
import { researchEntries, researchSlugs } from "./research";
import { publicationSearch, type IndexedPublication } from "./research-catalog-format";

export const catalogChecked = snapshot.checked;
const displayDate = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" });
export const catalogCheckedLabel = displayDate(snapshot.checked);
export const catalogThroughLabel = displayDate(snapshot.through);
export const researchCatalogs = snapshot.catalogs as Record<string, {
  query: string;
  count: number;
  searchCount: number;
  excludedCount: number;
  papers: IndexedPublication[];
}>;
export const indexedPublicationCount = Object.values(researchCatalogs).reduce((sum, catalog) => sum + catalog.count, 0);
export const catalogSearchMatchCount = Object.values(researchCatalogs).reduce((sum, catalog) => sum + catalog.searchCount, 0);

// This curated PMC citation and the PubMed citation are the same publication.
export function pubmedId(sourceId: string) {
  return sourceId === "PMCID PMC3342713" ? "22567179" : sourceId.replace("PMID ", "");
}

export const researchCatalogGroups = researchSlugs.map((slug) => {
  const explained = researchEntries.filter((entry) => entry.slug === slug);
  const first = explained[0];
  const readingById = new Map(explained.map((entry) => [pubmedId(entry.sourceId), entry]));
  return {
    slug,
    compound: first.compound,
    related: !!first.related,
    explainedCount: explained.length,
    papers: researchCatalogs[slug].papers.map((paper) => {
      const reading = readingById.get(paper.id);
      return {
        id: paper.id,
        title: paper.title,
        year: paper.year,
        category: paper.category,
        search: `${first.compound} ${first.area} ${publicationSearch(paper)} ${reading?.focus ?? ""} ${reading?.model ?? ""}`.toLowerCase(),
      };
    }),
  };
});
