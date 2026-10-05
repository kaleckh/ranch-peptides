export interface UpcomingProduct {
  slug: string;
  name: string;
  category: string;
  searchTerms?: string[];
}

// Collection previews only: never add these to the purchasable product catalog.
// Names are sourced in docs/UPCOMING_COLLECTION.md; launch specifications are pending.
export const upcomingProducts: UpcomingProduct[] = [
  { slug: "melanotan-i", name: "Melanotan I", category: "Melanocortin Research", searchTerms: ["MT-1"] },
  { slug: "selank", name: "Selank", category: "Cognitive Research" },
  { slug: "semax", name: "Semax", category: "Cognitive Research" },
  { slug: "cjc-1295-dac", name: "CJC-1295 (with DAC)", category: "Research Peptides" },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 No DAC", category: "Research Peptides" },
  { slug: "ipamorelin", name: "Ipamorelin", category: "Research Peptides" },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", category: "Research Peptides" },
  { slug: "tesamorelin", name: "Tesamorelin", category: "Research Peptides" },
  { slug: "glp-2-tz", name: "GLP-2 (TZ)", category: "Metabolic Research" },
  { slug: "glp-1-sm", name: "GLP-1 (SM)", category: "Metabolic Research" },
  { slug: "kpv", name: "KPV", category: "Research Peptides" },
  { slug: "nad-plus", name: "NAD+", category: "Research Compounds" },
  { slug: "glutathione", name: "Glutathione", category: "Research Compounds" },
  { slug: "klow", name: "KLOW", category: "Research Blends" },
  { slug: "ss-31", name: "SS-31", category: "Mitochondrial Research" },
  { slug: "ara-290", name: "ARA-290", category: "Research Peptides" },
  { slug: "wolverine", name: "Wolverine", category: "Research Blends" },
  { slug: "cagrilintide", name: "Cagrilintide", category: "Metabolic Research" },
  { slug: "kisspeptin", name: "Kisspeptin", category: "Research Peptides" },
  { slug: "bacteriostatic-water", name: "Bacteriostatic Water", category: "Research Accessories", searchTerms: ["BAC water"] },
];
