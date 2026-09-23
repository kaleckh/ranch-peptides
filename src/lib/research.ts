export type EvidenceType = "human" | "preclinical";

export interface ResearchEntry {
  slug: string;
  compound: string;
  area: string;
  evidence: EvidenceType;
  model: string;
  focus: string;
  finding: string;
  limitation: string;
  authors: string;
  journal: string;
  year: number;
  source: string;
  sourceId: string;
  related?: boolean;
}

// Curated primary-source reading list, verified 2026-09-21.
// Labels describe these selected papers, not a comprehensive evidence assessment.
export const researchEntries: ResearchEntry[] = [
  {
    slug: "bpc-157", compound: "BPC-157", area: "Tendon cell biology",
    evidence: "preclinical", model: "Rat tendon explants & cultured cells",
    focus: "How tendon cells migrate and respond to stress",
    finding: "Researchers observed greater tendon-cell outgrowth, migration, and survival under stress. Direct cell proliferation was not increased in the tested cultures.",
    limitation: "Isolated rat tissue and cell behavior do not establish injury recovery or safety in people.",
    authors: "Chang CH et al.", journal: "Journal of Applied Physiology", year: 2011,
    source: "https://pubmed.ncbi.nlm.nih.gov/21030672/", sourceId: "PMID 21030672",
  },
  {
    slug: "retatrutide", compound: "Retatrutide", area: "Metabolic signaling",
    evidence: "human", model: "Phase 2 randomized trial · 338 adults",
    focus: "Triple-receptor signaling in an obesity trial",
    finding: "A placebo-controlled trial reported greater weight reduction with retatrutide over 48 weeks in adults meeting defined BMI and health criteria. Safety was also assessed.",
    limitation: "This selected 2023 trial concerns a controlled investigational formulation and population. It does not validate a retail research vial or establish its safety.",
    authors: "Jastreboff AM et al.", journal: "New England Journal of Medicine", year: 2023,
    source: "https://pubmed.ncbi.nlm.nih.gov/37366315/", sourceId: "PMID 37366315",
  },
  {
    slug: "tb-500", compound: "TB-500", area: "Wound biology",
    evidence: "preclinical", model: "Rat wounds & cell migration assays", related: true,
    focus: "Thymosin beta4 in experimental wound repair",
    finding: "The researchers studied full-length thymosin beta4 and observed increased wound closure, collagen deposition, and blood-vessel formation in rats.",
    limitation: "This is related-compound evidence. The name TB-500 does not establish equivalence to the thymosin beta4 preparation used in this paper; sequence and formulation must be checked.",
    authors: "Malinda KM et al.", journal: "Journal of Investigative Dermatology", year: 1999,
    source: "https://pubmed.ncbi.nlm.nih.gov/10469335/", sourceId: "PMID 10469335",
  },
  {
    slug: "mt-2", compound: "MT-2", area: "Melanocortin signaling",
    evidence: "human", model: "Pilot phase 1 study · 3 men",
    focus: "Early human observations of Melanotan II",
    finding: "This small placebo-controlled pilot recorded pigmentation changes and adverse effects including nausea, fatigue, and somnolence.",
    limitation: "Three participants and brief follow-up cannot characterize uncommon harms, long-term effects, or broader population safety.",
    authors: "Dorr RT et al.", journal: "Life Sciences", year: 1996,
    source: "https://pubmed.ncbi.nlm.nih.gov/8637402/", sourceId: "PMID 8637402",
  },
  {
    slug: "mots-c", compound: "MOTS-c", area: "Mitochondrial signaling",
    evidence: "preclinical", model: "Cell experiments & mouse models",
    focus: "A mitochondrial peptide and metabolic regulation",
    finding: "The study identified MOTS-c and linked its cellular activity to AMPK signaling. Treated mice showed changes in insulin sensitivity and diet-related metabolic outcomes.",
    limitation: "Mouse treatment outcomes and cellular mechanisms do not demonstrate therapeutic benefit from MOTS-c administration in humans.",
    authors: "Lee C et al.", journal: "Cell Metabolism", year: 2015,
    source: "https://pubmed.ncbi.nlm.nih.gov/25738459/", sourceId: "PMID 25738459",
  },
  {
    slug: "pinealon", compound: "Pinealon", area: "Neuronal stress models",
    evidence: "preclinical", model: "Rat offspring & isolated neurons",
    focus: "Neuronal responses to prenatal metabolic stress",
    finding: "In a prenatal hyperhomocysteinemia model, researchers reported changes in offspring learning measures and oxidative-stress resistance of isolated neurons.",
    limitation: "A specific prenatal rat model cannot establish cognitive benefits in healthy adults or clinical neurological outcomes.",
    authors: "Arutjunyan A et al.", journal: "International Journal of Clinical and Experimental Medicine", year: 2012,
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3342713/", sourceId: "PMCID PMC3342713",
  },
  {
    slug: "epitalon", compound: "Epitalon", area: "Telomere biology",
    evidence: "preclinical", model: "Cultured human fetal fibroblasts",
    focus: "Telomerase activity in a cell-culture experiment",
    finding: "The authors reported telomerase-related changes and telomere elongation after exposing cultured fibroblasts to Epithalon, an alternate spelling of Epitalon.",
    limitation: "Human cells in a dish are not a human trial. These observations do not establish longer life or reversal of aging in people.",
    authors: "Khavinson VK et al.", journal: "Bulletin of Experimental Biology and Medicine", year: 2003,
    source: "https://pubmed.ncbi.nlm.nih.gov/12937682/", sourceId: "PMID 12937682",
  },
  {
    slug: "ghk-cu", compound: "GHK-Cu", area: "Extracellular matrix biology",
    evidence: "preclinical", model: "Fibroblast cultures",
    focus: "A copper-peptide complex and collagen synthesis",
    finding: "The researchers measured increased collagen synthesis in fibroblast cultures exposed to GHK-Cu, independent of changes in cell number.",
    limitation: "A cell-culture endpoint does not establish visible skin changes, clinical wound healing, or the safety of an administration route.",
    authors: "Maquart FX et al.", journal: "FEBS Letters", year: 1988,
    source: "https://pubmed.ncbi.nlm.nih.gov/3169264/", sourceId: "PMID 3169264",
  },
];
