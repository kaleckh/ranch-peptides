import { additionalResearchEntries } from "./research-additions";

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
  title?: string;
  humanObservation?: boolean;
  studyType?: "observational" | "case-report" | "secondary-analysis" | "laboratory";
}

// Original eight citations checked 2026-09-21; additions checked 2026-10-03.
// Labels describe these selected papers, not a comprehensive evidence assessment.
const originalResearchEntries: ResearchEntry[] = [
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
  {
    "slug": "bpc-157",
    "compound": "BPC-157",
    "area": "Angiogenesis",
    "evidence": "preclinical",
    "model": "Cell cultures & rat muscle/tendon injuries",
    "focus": "Blood-vessel markers during tissue repair",
    "title": "Modulatory effect of gastric pentadecapeptide BPC 157 on angiogenesis in muscle and tendon healing.",
    "finding": "The authors reported altered angiogenesis and VEGF-associated markers during rat muscle and tendon healing. They did not observe a direct angiogenic effect in the tested cell cultures.",
    "limitation": "Different outcomes in culture and animals underline the importance of model context. These experiments do not establish human injury recovery.",
    "authors": "Brcic L et al.",
    "journal": "Journal of physiology and pharmacology : an official journal of the Polish Physiological Society",
    "year": 2009,
    "source": "https://pubmed.ncbi.nlm.nih.gov/20388964/",
    "sourceId": "PMID 20388964"
  },
  {
    "slug": "bpc-157",
    "compound": "BPC-157",
    "area": "Tendon repair",
    "evidence": "preclinical",
    "model": "Transected rat Achilles tendons & cell cultures",
    "focus": "Mechanical and functional measures after tendon transection",
    "title": "Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocytes growth.",
    "finding": "Treated rats had improved tendon mechanical, functional, and histological measures compared with controls. Cell experiments also examined responses to an aldehyde that inhibits growth.",
    "limitation": "Surgically injured rat tendons are not clinical human injuries. Follow-up was short, and these findings do not establish long-term safety or efficacy in people.",
    "authors": "Staresinic M et al.",
    "journal": "Journal of orthopaedic research : official publication of the Orthopaedic Research Society",
    "year": 2003,
    "source": "https://pubmed.ncbi.nlm.nih.gov/14554208/",
    "sourceId": "PMID 14554208"
  },
  {
    "slug": "bpc-157",
    "compound": "BPC-157",
    "area": "Vascular signaling",
    "evidence": "preclinical",
    "model": "Endothelial cells, chick membranes & rat limb ischemia",
    "focus": "VEGFR2 signaling across angiogenesis models",
    "title": "Therapeutic potential of pro-angiogenic BPC157 is associated with VEGFR2 activation and up-regulation.",
    "finding": "The study linked vessel formation and rat blood-flow recovery to VEGFR2 expression and signaling. Endothelial-cell experiments investigated receptor internalization and the Akt-eNOS pathway.",
    "limitation": "Cultured human cells remain preclinical evidence. These models do not establish clinical benefit or validate a commercial research preparation.",
    "authors": "Hsieh MJ et al.",
    "journal": "Journal of molecular medicine (Berlin, Germany)",
    "year": 2017,
    "source": "https://pubmed.ncbi.nlm.nih.gov/27847966/",
    "sourceId": "PMID 27847966"
  },
  {
    "slug": "retatrutide",
    "compound": "Retatrutide",
    "area": "Glucose regulation",
    "evidence": "human",
    "model": "Phase 2 randomized trial · 281 adults with type 2 diabetes",
    "focus": "Glycemic control and weight in a diabetes trial",
    "title": "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial conducted in the USA.",
    "finding": "Several retatrutide groups showed greater HbA1c reductions than placebo, and higher-dose groups showed greater weight reduction. Gastrointestinal adverse events were common.",
    "limitation": "This controlled phase 2 study used an investigational formulation and selected population. It does not establish long-term outcomes or the safety of retail research vials.",
    "authors": "Rosenstock J et al.",
    "journal": "Lancet (London, England)",
    "year": 2023,
    "source": "https://pubmed.ncbi.nlm.nih.gov/37385280/",
    "sourceId": "PMID 37385280"
  },
  {
    "slug": "retatrutide",
    "compound": "Retatrutide",
    "area": "Liver fat",
    "evidence": "human",
    "model": "Obesity-trial substudy · 98 participants",
    "focus": "MRI-measured liver fat in a phase 2 substudy",
    "title": "Triple hormone receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomized phase 2a trial.",
    "finding": "Participants receiving retatrutide had greater reductions in MRI-measured liver fat than placebo. Changes were associated with weight, abdominal fat, and metabolic measures.",
    "limitation": "This is a substudy of the obesity trial, not an independent replication. Liver-fat imaging does not establish effects on fibrosis, clinical liver outcomes, or long-term safety.",
    "authors": "Sanyal AJ et al.",
    "journal": "Nature medicine",
    "year": 2024,
    "source": "https://pubmed.ncbi.nlm.nih.gov/38858523/",
    "sourceId": "PMID 38858523"
  },
  {
    "slug": "retatrutide",
    "compound": "Retatrutide",
    "area": "Body composition",
    "evidence": "human",
    "model": "Diabetes-trial DXA substudy · 189 enrolled participants",
    "focus": "Fat and lean mass during weight reduction",
    "title": "Effects of retatrutide on body composition in people with type 2 diabetes: a substudy of a phase 2, double-blind, parallel-group, placebo-controlled, randomised trial.",
    "finding": "The substudy reported greater total fat-mass reduction in several retatrutide groups than placebo. Lean mass also decreased; its proportion of weight loss was similar to other obesity treatments.",
    "limitation": "This shares the parent diabetes-trial population. Only 103 participants completed treatment and both DXA scans, limiting interpretation; it does not demonstrate muscle preservation or retail-product safety.",
    "authors": "Coskun T et al.",
    "journal": "The lancet. Diabetes & endocrinology",
    "year": 2025,
    "source": "https://pubmed.ncbi.nlm.nih.gov/40609566/",
    "sourceId": "PMID 40609566"
  },
  {
    "slug": "tb-500",
    "compound": "TB-500",
    "area": "Cardiac cell biology",
    "evidence": "preclinical",
    "model": "Cardiomyocyte cultures & mouse coronary ligation",
    "focus": "Full-length thymosin beta4 and cardiac repair signaling",
    "title": "Thymosin beta4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair.",
    "finding": "Thymosin beta4 enhanced cardiomyocyte migration and survival in culture. In mice after coronary ligation, treatment was associated with ILK/Akt signaling, early cell survival, and improved cardiac function.",
    "limitation": "The paper studied thymosin beta4, not an established equivalent of a product labeled TB-500. Mouse cardiac findings cannot establish human treatment outcomes.",
    "authors": "Bock-Marquette I et al.",
    "journal": "Nature",
    "year": 2004,
    "source": "https://pubmed.ncbi.nlm.nih.gov/15565145/",
    "sourceId": "PMID 15565145",
    "related": true
  },
  {
    "slug": "tb-500",
    "compound": "TB-500",
    "area": "Corneal infection models",
    "evidence": "preclinical",
    "model": "Mouse bacterial keratitis model",
    "focus": "Thymosin beta4 combined with an antibiotic",
    "title": "Thymosin Beta-4 and Ciprofloxacin Adjunctive Therapy Improves Pseudomonas aeruginosa-Induced Keratitis.",
    "finding": "Thymosin beta4 combined with ciprofloxacin improved measured corneal disease outcomes compared with the control and single-agent groups, alongside changes in inflammation and wound-healing markers.",
    "limitation": "This was topical combination treatment in infected mouse corneas, not a TB-500 human trial. Effects cannot be assigned to commercial TB-500 or generalized to other routes or injuries.",
    "authors": "Carion TW et al.",
    "journal": "Cells",
    "year": 2018,
    "source": "https://pubmed.ncbi.nlm.nih.gov/30241380/",
    "sourceId": "PMID 30241380",
    "related": true
  },
  {
    "slug": "mt-2",
    "compound": "MT-2",
    "area": "Melanocortin signaling",
    "evidence": "human",
    "model": "Placebo-controlled crossover experiment · 10 men",
    "focus": "Melanotan II in a psychogenic erectile-dysfunction study",
    "title": "Synthetic melanotropic peptide initiates erections in men with psychogenic erectile dysfunction: double-blind, placebo controlled crossover study.",
    "finding": "The experiment recorded more erectile responses with Melanotan II than placebo. Nausea, yawning, stretching, and reduced appetite were reported more often after Melanotan II.",
    "limitation": "Ten participants and brief laboratory monitoring cannot establish broader efficacy, uncommon harms, or long-term safety.",
    "authors": "Wessells H et al.",
    "journal": "The Journal of urology",
    "year": 1998,
    "source": "https://pubmed.ncbi.nlm.nih.gov/9679884/",
    "sourceId": "PMID 9679884"
  },
  {
    "slug": "mt-2",
    "compound": "MT-2",
    "area": "Melanocortin signaling",
    "evidence": "human",
    "model": "Placebo-controlled crossover experiment · 10 men",
    "focus": "Responses in men with organic erectile-dysfunction risk factors",
    "title": "Effect of an alpha-melanocyte stimulating hormone analog on penile erection and sexual desire in men with organic erectile dysfunction.",
    "finding": "Melanotan II produced more reported erectile responses and higher sexual-desire scores than placebo. Nausea and yawning/stretching were more frequent, including episodes of severe nausea.",
    "limitation": "This was a small, short-term experiment in a selected clinical population. It does not establish chronic-use safety, tanning safety, or the quality of retail products.",
    "authors": "Wessells H et al.",
    "journal": "Urology",
    "year": 2000,
    "source": "https://pubmed.ncbi.nlm.nih.gov/11018622/",
    "sourceId": "PMID 11018622"
  },
  {
    "slug": "mots-c",
    "compound": "MOTS-c",
    "area": "Cellular stress signaling",
    "evidence": "preclinical",
    "model": "Cell experiments under metabolic stress",
    "focus": "Mitochondrial-to-nuclear signaling under glucose restriction",
    "title": "The Mitochondrial-Encoded Peptide MOTS-c Translocates to the Nucleus to Regulate Nuclear Gene Expression in Response to Metabolic Stress.",
    "finding": "MOTS-c moved to the nucleus in an AMPK-dependent response to metabolic stress. The authors linked it to changes in stress-response genes and interactions with NRF2-associated regulatory pathways.",
    "limitation": "Mechanistic cell experiments do not demonstrate therapeutic effects, exercise benefits, or safety from administering MOTS-c to people.",
    "authors": "Kim KH et al.",
    "journal": "Cell metabolism",
    "year": 2018,
    "source": "https://pubmed.ncbi.nlm.nih.gov/29983246/",
    "sourceId": "PMID 29983246"
  },
  {
    "slug": "mots-c",
    "compound": "MOTS-c",
    "area": "Exercise and muscle biology",
    "evidence": "preclinical",
    "model": "Mouse treatment experiments & exercise observations in 10 men",
    "focus": "Exercise-related MOTS-c and physical performance in mice",
    "title": "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis.",
    "finding": "Exercise increased naturally occurring MOTS-c in human muscle and circulation. Separately, MOTS-c treatment improved several physical-performance measures in mice and altered muscle stress responses.",
    "limitation": "The human component measured endogenous peptide after exercise; participants were not treated with MOTS-c. Mouse treatment results are not evidence of benefit from human administration.",
    "authors": "Reynolds JC et al.",
    "journal": "Nature communications",
    "year": 2021,
    "source": "https://pubmed.ncbi.nlm.nih.gov/33473109/",
    "sourceId": "PMID 33473109",
    "humanObservation": true
  },
  {
    "slug": "pinealon",
    "compound": "Pinealon",
    "area": "Oxidative stress",
    "evidence": "preclinical",
    "model": "Cerebellar cells, neutrophils & PC12 cell cultures",
    "focus": "Cell viability and stress-response signaling",
    "title": "Pinealon increases cell viability by suppression of free radical levels and activating proliferative processes.",
    "finding": "Pinealon reduced reactive-oxygen accumulation and necrotic cell death in the tested cultures. The authors also observed changes in ERK activation timing and cell-cycle behavior.",
    "limitation": "Cell viability and signaling endpoints do not establish cognitive improvement, neurological treatment outcomes, or human safety.",
    "authors": "Khavinson V et al.",
    "journal": "Rejuvenation research",
    "year": 2011,
    "source": "https://pubmed.ncbi.nlm.nih.gov/21978084/",
    "sourceId": "PMID 21978084"
  },
  {
    "slug": "pinealon",
    "compound": "Pinealon",
    "area": "Brain ischemia models",
    "evidence": "preclinical",
    "model": "Old rats with carotid artery occlusion",
    "focus": "Behavior and caspase-3 after peptide pretreatment",
    "title": "[Effects of introduction of short peptides before carotid artery occlusion on behaviour and caspase-3 activity in the brain of old rats].",
    "finding": "This comparison of Pinealon and Cortexin reported survival and behavioral changes after arterial occlusion. Pinealon was associated with reduced exploratory and motor behavior and a moderate rise in caspase-3 activity.",
    "limitation": "The original paper is in Russian, with an English abstract. Animal pretreatment findings and mixed behavioral effects do not establish clinical stroke recovery or cognitive benefit.",
    "authors": "Mendzheritskiĭ AM et al.",
    "journal": "Advances in gerontology = Uspekhi gerontologii",
    "year": 2011,
    "source": "https://pubmed.ncbi.nlm.nih.gov/21809624/",
    "sourceId": "PMID 21809624"
  },
  {
    "slug": "epitalon",
    "compound": "Epitalon",
    "area": "Telomere mechanisms",
    "evidence": "preclinical",
    "model": "Normal human cell cultures & breast-cancer cell lines",
    "focus": "Telomerase and alternative telomere-lengthening pathways",
    "title": "Epitalon increases telomere length in human cell lines through telomerase upregulation or ALT activity.",
    "finding": "The researchers observed telomere extension with telomerase-related changes in normal cultured cells. Breast-cancer cell lines also showed extension, associated with alternative lengthening of telomeres (ALT).",
    "limitation": "These are cell-line experiments, not a human longevity trial. Results in cancer cells require separate interpretation and do not establish safety or reversal of aging.",
    "authors": "Al-Dulaimi S et al.",
    "journal": "Biogerontology",
    "year": 2025,
    "source": "https://pubmed.ncbi.nlm.nih.gov/40908429/",
    "sourceId": "PMID 40908429"
  },
  {
    "slug": "epitalon",
    "compound": "Epitalon",
    "area": "Animal aging models",
    "evidence": "preclinical",
    "model": "Female Swiss-derived SHR mice · 54 per group",
    "focus": "Lifespan, chromosome changes, and spontaneous tumors",
    "title": "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice.",
    "finding": "Mean lifespan and total spontaneous tumor incidence did not change. The authors reported longer survival among the last surviving animals, fewer chromosome aberrations, and changes in estrous function and leukemia incidence.",
    "limitation": "Selected tail-of-survival outcomes should not be read as an increase in average lifespan. Results from one female mouse strain do not establish human longevity or long-term safety.",
    "authors": "Anisimov VN et al.",
    "journal": "Biogerontology",
    "year": 2003,
    "source": "https://pubmed.ncbi.nlm.nih.gov/14501183/",
    "sourceId": "PMID 14501183"
  },
  {
    "slug": "ghk-cu",
    "compound": "GHK-Cu",
    "area": "Fibroblast biology",
    "evidence": "preclinical",
    "model": "Normal & irradiated human dermal fibroblast cultures",
    "focus": "Growth-factor production in irradiated cell cultures",
    "title": "Effects of copper tripeptide on the growth and expression of growth factors by normal and irradiated fibroblasts.",
    "finding": "GHK-Cu-exposed fibroblasts replicated faster than untreated cultures. Irradiated treated cells showed early increases in basic fibroblast growth factor and VEGF production.",
    "limitation": "Patient-derived cells grown in a laboratory remain preclinical evidence. This was not a trial of wound healing or radiation recovery in patients.",
    "authors": "Pollard JD et al.",
    "journal": "Archives of facial plastic surgery",
    "year": 2005,
    "source": "https://pubmed.ncbi.nlm.nih.gov/15655171/",
    "sourceId": "PMID 15655171"
  },
  {
    "slug": "ghk-cu",
    "compound": "GHK-Cu",
    "area": "Experimental wound matrix",
    "evidence": "preclinical",
    "model": "Implanted wound chambers in rats",
    "focus": "Connective-tissue accumulation in a wound model",
    "title": "In vivo stimulation of connective tissue accumulation by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+ in rat experimental wounds.",
    "finding": "GHK-Cu-treated wound chambers accumulated more collagen, protein, and glycosaminoglycans. Type I and III collagen messenger RNA increased, while TGF-beta messenger RNA did not.",
    "limitation": "An implanted rat wound chamber measures tissue accumulation rather than clinical healing in people. It does not establish cosmetic outcomes or route-specific human safety.",
    "authors": "Maquart FX et al.",
    "journal": "The Journal of clinical investigation",
    "year": 1993,
    "source": "https://pubmed.ncbi.nlm.nih.gov/8227353/",
    "sourceId": "PMID 8227353"
  },
];

export const researchEntries: ResearchEntry[] = [...originalResearchEntries, ...additionalResearchEntries];

export function evidenceLabel(entry: Pick<ResearchEntry, "evidence" | "humanObservation" | "studyType">) {
  if (entry.studyType === "observational") return "Human observational report";
  if (entry.studyType === "case-report") return "Human case report";
  if (entry.studyType === "secondary-analysis") return "Human trial analysis";
  if (entry.studyType === "laboratory") return "Laboratory study";
  return entry.humanObservation ? "Human observation + preclinical" : entry.evidence === "human" ? "Human study" : "Preclinical study";
}

export const researchSlugs = [...new Set(researchEntries.map((entry) => entry.slug))];

// Send only searchable index metadata to the client, keeping detailed notes on static pages.
export const researchIndex = researchEntries.map(({ slug, compound, area, evidence, humanObservation, studyType, related, model, focus, title, authors, journal, year }) => ({
  slug, compound, area, evidence, humanObservation, studyType, related, model, focus, title, authors, journal, year,
}));
