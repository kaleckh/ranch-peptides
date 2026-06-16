export interface Product {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: string;
  price: number; // per vial
  dosage: string;
  format: string;
  purity: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  sequence?: string;
  bulkPricing: { qty: number; price: number }[];
  researchAreas: string[];
  keyStudies: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    finding: string;
    doi?: string;
  }[];
  mechanism: string;
  storage: string;
  reconstitution: string;
  notSteroids: string;
}

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortName: "BPC-157",
    tagline: "Body Protection Compound",
    description:
      "BPC-157 is a synthetic pentadecapeptide (15 amino acids) derived from a protective protein naturally found in human gastric juice. It is one of the most extensively studied peptides in preclinical research, with a strong safety profile across hundreds of animal studies. Research focuses on its role in tissue repair, gut protection, and modulation of the nitric oxide system.",
    category: "Recovery & Repair",
    price: 39.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "99.1%",
    casNumber: "137525-51-0",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.53 g/mol",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    bulkPricing: [
      { qty: 1, price: 39.99 },
      { qty: 3, price: 35.99 },
      { qty: 5, price: 32.99 },
      { qty: 10, price: 29.99 },
    ],
    researchAreas: [
      "Tendon & ligament repair",
      "Gastrointestinal protection",
      "Muscle tissue recovery",
      "Neuroprotection",
      "Nitric oxide system modulation",
    ],
    keyStudies: [
      {
        title:
          "Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract",
        authors: "Sikiric P, et al.",
        journal: "Current Pharmaceutical Design",
        year: 2011,
        finding:
          "Demonstrated cytoprotective effects on gastrointestinal mucosa and accelerated healing of various GI lesions in animal models.",
        doi: "10.2174/138161211796197205",
      },
      {
        title:
          "Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts",
        authors: "Chang CH, et al.",
        journal: "Molecules",
        year: 2014,
        finding:
          "BPC-157 upregulated growth hormone receptor expression in tendon fibroblasts, suggesting a mechanism for its tendon-healing properties.",
        doi: "10.3390/molecules191219066",
      },
      {
        title:
          "BPC 157 and NO system in healing of tendon, ligament, and bone",
        authors: "Sikiric P, et al.",
        journal: "Journal of Physiology and Pharmacology",
        year: 2014,
        finding:
          "Accelerated healing of transected Achilles tendons and medial collateral ligaments in rat models through nitric oxide system modulation.",
      },
    ],
    mechanism:
      "BPC-157 is believed to work by upregulating growth hormone receptors, modulating the nitric oxide (NO) system, and promoting angiogenesis (new blood vessel formation) at injury sites. Unlike hormones, it acts as a signaling peptide that supports the body's existing repair pathways without introducing exogenous hormonal activity.",
    storage:
      "Store lyophilized powder at -20\u00B0C for long-term storage. Once reconstituted, store at 2-8\u00B0C and use within 30 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "BPC-157 is a short-chain peptide (amino acid sequence), not a steroid. Steroids are synthetic derivatives of testosterone that directly override the endocrine system. BPC-157 contains no hormonal activity \u2014 it is a signaling molecule that supports natural repair processes. It does not affect testosterone, estrogen, or any hormone levels.",
  },
  {
    slug: "retatrutide",
    name: "Retatrutide (LY-3437943)",
    shortName: "Retatrutide",
    tagline: "Triple Receptor Agonist",
    description:
      "Retatrutide is a novel triple-agonist peptide developed by Eli Lilly that simultaneously targets GLP-1, GIP, and glucagon receptors. It represents the most advanced multi-receptor approach to metabolic research, with Phase 2 clinical trial data published in the New England Journal of Medicine showing unprecedented results in weight management studies.",
    category: "Metabolic Research",
    price: 89.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "98.7%",
    casNumber: "2381089-83-2",
    molecularFormula: "C189H300N52O59",
    molecularWeight: "4113.7 g/mol",
    bulkPricing: [
      { qty: 1, price: 89.99 },
      { qty: 3, price: 82.99 },
      { qty: 5, price: 76.99 },
      { qty: 10, price: 69.99 },
    ],
    researchAreas: [
      "Metabolic syndrome",
      "GLP-1/GIP/glucagon receptor signaling",
      "Energy expenditure pathways",
      "Lipid metabolism",
      "Hepatic fat reduction",
    ],
    keyStudies: [
      {
        title:
          "Retatrutide once weekly for treatment of obesity: a phase 2 trial",
        authors: "Jastreboff AM, et al.",
        journal: "New England Journal of Medicine",
        year: 2023,
        finding:
          "Participants receiving the highest dose (12mg) achieved 24.2% mean body weight reduction at 48 weeks \u2014 the largest reduction reported in any obesity pharmacotherapy trial at time of publication.",
        doi: "10.1056/NEJMoa2301972",
      },
      {
        title:
          "Triple hormone receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease",
        authors: "Sanyal AJ, et al.",
        journal: "New England Journal of Medicine",
        year: 2024,
        finding:
          "Demonstrated significant reduction in hepatic fat content, with the majority of participants achieving complete resolution of liver steatosis.",
        doi: "10.1056/NEJMoa2401943",
      },
    ],
    mechanism:
      "Retatrutide activates three receptors simultaneously: GLP-1 (slows gastric emptying, promotes satiety signaling), GIP (enhances insulin sensitivity, affects fat tissue metabolism), and glucagon (increases energy expenditure, promotes hepatic lipid oxidation). This triple mechanism differentiates it from single-agonists (semaglutide) and dual-agonists (tirzepatide).",
    storage:
      "Store lyophilized powder at -20\u00B0C. Once reconstituted, store at 2-8\u00B0C and use within 21 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "Retatrutide is a peptide hormone analog, not an anabolic steroid. Anabolic steroids are testosterone derivatives that artificially increase androgen activity. Retatrutide targets metabolic receptors (GLP-1, GIP, glucagon) involved in energy regulation and has zero interaction with androgen or estrogen receptors. It does not cause any of the androgenic effects associated with steroids.",
  },
  {
    slug: "tb-500",
    name: "TB-500 (Thymosin Beta-4)",
    shortName: "TB-500",
    tagline: "Tissue Repair Peptide",
    description:
      "TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring 43-amino-acid peptide present in virtually all human and animal cells. It plays a fundamental role in cell migration, blood vessel formation, and cellular differentiation. Originally studied extensively in veterinary medicine, it has become one of the most researched peptides for tissue repair applications.",
    category: "Recovery & Repair",
    price: 34.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "99.3%",
    casNumber: "77591-33-4",
    molecularFormula: "C212H350N56O78S",
    molecularWeight: "4963.44 g/mol",
    bulkPricing: [
      { qty: 1, price: 34.99 },
      { qty: 3, price: 31.99 },
      { qty: 5, price: 28.99 },
      { qty: 10, price: 25.99 },
    ],
    researchAreas: [
      "Wound healing & tissue repair",
      "Cardiac tissue recovery",
      "Anti-inflammatory pathways",
      "Anti-fibrotic mechanisms",
      "Hair follicle stem cell activation",
    ],
    keyStudies: [
      {
        title:
          "Thymosin beta-4 promotes angiogenesis, wound healing, and hair growth",
        authors: "Philp D, et al.",
        journal: "Annals of the New York Academy of Sciences",
        year: 2006,
        finding:
          "Demonstrated that Thymosin Beta-4 accelerated wound closure, promoted angiogenesis, and stimulated hair growth in dermal wound models.",
        doi: "10.1196/annals.1376.012",
      },
      {
        title:
          "Thymosin beta 4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair",
        authors: "Bock-Marquette I, et al.",
        journal: "Nature",
        year: 2004,
        finding:
          "Showed that Thymosin Beta-4 promotes survival of cardiac muscle cells after injury and activates cell migration pathways critical for tissue repair.",
        doi: "10.1038/nature02517",
      },
      {
        title:
          "Thymosin Beta-4 and its degradation products in wound repair",
        authors: "Sosne G, et al.",
        journal: "Expert Opinion on Biological Therapy",
        year: 2010,
        finding:
          "Reviewed TB-4's anti-inflammatory and anti-fibrotic properties, demonstrating reduced scar formation and improved tissue remodeling in multiple wound models.",
      },
    ],
    mechanism:
      "TB-500 works by upregulating actin, a cell-building protein that plays a crucial role in cell migration and proliferation. It promotes angiogenesis (formation of new blood vessels), reduces inflammation by downregulating inflammatory cytokines, and activates satellite cells for muscle repair. Its small molecular size allows it to travel through tissues efficiently.",
    storage:
      "Store lyophilized powder at -20\u00B0C for long-term storage. Once reconstituted, store at 2-8\u00B0C and use within 30 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "TB-500 is a naturally occurring peptide found in all human cells, not a steroid. Steroids are synthetic hormones that mimic testosterone. TB-500 has no hormonal activity whatsoever \u2014 it works by promoting cell migration and modulating inflammatory pathways. It does not affect the endocrine system or produce any androgenic effects.",
  },
  {
    slug: "mt-2",
    name: "Melanotan II (MT-2)",
    shortName: "MT-2",
    tagline: "Melanocortin Receptor Peptide",
    description:
      "Melanotan II is a synthetic cyclic peptide analog of alpha-melanocyte-stimulating hormone (alpha-MSH), originally developed at the University of Arizona. It binds to melanocortin receptors (MC1R through MC5R), making it one of the most broadly studied peptides in melanocortin receptor research. It has been the subject of extensive academic research since the 1990s.",
    category: "Melanocortin Research",
    price: 24.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "121062-08-6",
    molecularFormula: "C50H69N15O9",
    molecularWeight: "1024.18 g/mol",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
    bulkPricing: [
      { qty: 1, price: 24.99 },
      { qty: 3, price: 22.99 },
      { qty: 5, price: 19.99 },
      { qty: 10, price: 17.99 },
    ],
    researchAreas: [
      "Melanocortin receptor signaling",
      "Melanogenesis pathways",
      "MC4R-mediated appetite regulation",
      "Sexual function research (MC4R)",
      "Photoprotection mechanisms",
    ],
    keyStudies: [
      {
        title:
          "Melanocortin receptors, melanotropic peptides and penile erection",
        authors: "Hadley ME, Dorr RT",
        journal: "International Journal of Impotence Research",
        year: 2006,
        finding:
          "Comprehensive review of Melanotan II's effects on melanocortin-4 receptor activation and downstream effects on sexual arousal pathways.",
        doi: "10.1038/sj.ijir.3901438",
      },
      {
        title:
          "Superpotent melanotropin [4-norleucine, 7-D-phenylalanine]-alpha-MSH",
        authors: "Al-Obeidi F, et al.",
        journal: "Journal of the American Chemical Society",
        year: 1989,
        finding:
          "Original characterization of the cyclic analog that became MT-2, demonstrating superpotent melanocortin receptor binding compared to native alpha-MSH.",
        doi: "10.1021/ja00192a044",
      },
      {
        title:
          "Subcutaneous administration of Melanotan II to humans",
        authors: "Dorr RT, et al.",
        journal: "Cancer Chemotherapy and Pharmacology",
        year: 2004,
        finding:
          "Phase I human trial demonstrated dose-dependent increases in melanogenesis (skin pigmentation) with a defined side effect profile, establishing human pharmacokinetic data.",
      },
    ],
    mechanism:
      "MT-2 is a non-selective melanocortin receptor agonist. It binds primarily to MC1R (melanogenesis in melanocytes, triggering eumelanin production), MC3R (energy homeostasis), MC4R (appetite regulation and sexual function), and MC5R (exocrine gland function). Its cyclic structure gives it greater receptor binding affinity and stability compared to linear alpha-MSH.",
    storage:
      "Store lyophilized powder at -20\u00B0C, protected from light. Once reconstituted, store at 2-8\u00B0C and use within 30 days. MT-2 is photosensitive \u2014 wrap reconstituted vials in foil.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved. Protect from light during reconstitution.",
    notSteroids:
      "MT-2 is a melanocortin peptide, not a steroid. Anabolic steroids target androgen receptors and mimic testosterone. MT-2 targets an entirely different receptor family (melanocortin receptors) involved in pigmentation, appetite, and energy regulation. It has no androgenic, estrogenic, or anabolic activity and does not affect muscle growth or hormone levels.",
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    shortName: "MOTS-c",
    tagline: "Mitochondrial-Derived Peptide",
    description:
      "MOTS-c is a 16-amino-acid mitochondrial-derived peptide encoded within the mitochondrial 12S rRNA region. Research has focused on its role in metabolic homeostasis, skeletal muscle signaling, insulin sensitivity, and age-associated mitochondrial stress responses. It is studied as a signaling peptide that links mitochondrial status with nuclear and cellular metabolic programs.",
    category: "Mitochondrial Research",
    price: 59.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "98.9%",
    casNumber: "1627580-64-6",
    molecularFormula: "C101H152N28O22S2",
    molecularWeight: "2174.6 g/mol",
    sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    bulkPricing: [
      { qty: 1, price: 59.99 },
      { qty: 3, price: 54.99 },
      { qty: 5, price: 49.99 },
      { qty: 10, price: 44.99 },
    ],
    researchAreas: [
      "Mitochondrial signaling",
      "Metabolic homeostasis",
      "Insulin sensitivity pathways",
      "Skeletal muscle metabolism",
      "Age-associated stress response",
    ],
    keyStudies: [
      {
        title:
          "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance",
        authors: "Lee C, et al.",
        journal: "Cell Metabolism",
        year: 2015,
        finding:
          "Identified MOTS-c as a mitochondrial-derived peptide that improved metabolic homeostasis and insulin sensitivity in mouse models.",
        doi: "10.1016/j.cmet.2015.02.009",
      },
      {
        title:
          "The mitochondrial-derived peptide MOTS-c is a regulator of plasma metabolites and enhances insulin sensitivity",
        authors: "Reynolds JC, et al.",
        journal: "Aging",
        year: 2019,
        finding:
          "Reported associations between MOTS-c signaling, metabolite regulation, and improved insulin sensitivity in metabolic research models.",
      },
    ],
    mechanism:
      "MOTS-c is studied for AMPK-linked metabolic signaling and stress-response pathways that may coordinate mitochondrial and nuclear communication. Research suggests it can influence glucose utilization, lipid handling, and skeletal muscle metabolic adaptation without acting as an androgenic hormone.",
    storage:
      "Store lyophilized powder at -20\u00B0C. Once reconstituted, store at 2-8\u00B0C and use within 21 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "MOTS-c is a mitochondrial-derived peptide, not a steroid. Steroids are synthetic androgenic hormones. MOTS-c research centers on mitochondrial signaling and metabolic pathway regulation, with no androgen receptor activity and no testosterone-like structure.",
  },
  {
    slug: "pinealon",
    name: "Pinealon (EDR)",
    shortName: "Pinealon",
    tagline: "Neuroprotective Tripeptide",
    description:
      "Pinealon is a synthetic tripeptide with the sequence Glu-Asp-Arg (EDR). It is part of a family of short peptide bioregulators studied primarily in neuroprotection, cognitive aging, gene expression, and neuronal stress-response models. Research interest centers on how small peptides may influence cellular regulation in nervous-system tissues.",
    category: "Cognitive Research",
    price: 44.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "175175-23-2",
    molecularFormula: "C15H26N6O8",
    molecularWeight: "418.4 g/mol",
    sequence: "Glu-Asp-Arg",
    bulkPricing: [
      { qty: 1, price: 44.99 },
      { qty: 3, price: 39.99 },
      { qty: 5, price: 35.99 },
      { qty: 10, price: 31.99 },
    ],
    researchAreas: [
      "Neuroprotection",
      "Cognitive aging models",
      "Gene expression regulation",
      "Neuronal stress response",
      "Learning and memory research",
    ],
    keyStudies: [
      {
        title:
          "EDR Peptide: possible mechanism of gene expression and protein synthesis regulation",
        authors: "Ivko OM, et al.",
        journal: "Molecules",
        year: 2020,
        finding:
          "Discussed Pinealon/EDR as an arginine-containing neuroprotective peptide and explored possible mechanisms for gene-expression regulation.",
      },
      {
        title:
          "Pinealon protects the rat offspring from prenatal hyperhomocysteinemia",
        authors: "Galagudza MM, et al.",
        journal: "International Journal of Clinical and Experimental Medicine",
        year: 2012,
        finding:
          "Reported improved cognitive-function measures in rat offspring exposed to prenatal hyperhomocysteinemia models.",
      },
    ],
    mechanism:
      "Pinealon is studied as a short regulatory peptide that may interact with gene-expression and protein-synthesis pathways in nervous-system models. It is not a hormone analog and is investigated mainly for neuroprotective and cognitive-research signaling.",
    storage:
      "Store lyophilized powder at -20\u00B0C for long-term storage. Once reconstituted, store at 2-8\u00B0C and use within 30 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "Pinealon is a three-amino-acid peptide, not a steroid. It has no androgenic, estrogenic, or anabolic hormone activity. Its research profile is focused on nervous-system cellular signaling and gene-expression models.",
  },
  {
    slug: "epitalon",
    name: "Epitalon (AEDG)",
    shortName: "Epitalon",
    tagline: "Pineal Tetrapeptide",
    description:
      "Epitalon, also called Epithalon, is a synthetic tetrapeptide with the sequence Ala-Glu-Asp-Gly (AEDG). It has been studied in aging, pineal-gland, telomerase, circadian, retinal, and gene-expression research. The evidence base includes in vitro and animal studies, with some human-oriented literature from gerontology research groups.",
    category: "Longevity Research",
    price: 29.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.2%",
    casNumber: "307297-39-8",
    molecularFormula: "C14H22N4O9",
    molecularWeight: "390.35 g/mol",
    sequence: "Ala-Glu-Asp-Gly",
    bulkPricing: [
      { qty: 1, price: 29.99 },
      { qty: 3, price: 26.99 },
      { qty: 5, price: 23.99 },
      { qty: 10, price: 20.99 },
    ],
    researchAreas: [
      "Cellular aging models",
      "Telomerase research",
      "Pineal gland signaling",
      "Circadian rhythm studies",
      "Retinal and neurogenesis models",
    ],
    keyStudies: [
      {
        title:
          "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells",
        authors: "Khavinson VK, et al.",
        journal: "Bulletin of Experimental Biology and Medicine",
        year: 2003,
        finding:
          "Reported telomerase activity and telomere elongation in human somatic cell models exposed to Epitalon/Epithalon.",
        doi: "10.1023/a:1025493705728",
      },
      {
        title:
          "AEDG peptide (Epitalon) stimulates gene expression and protein synthesis during neurogenesis",
        authors: "Ivko OM, et al.",
        journal: "Molecules",
        year: 2020,
        finding:
          "Reviewed AEDG effects on pineal, retinal, and brain-related cellular models, including gene-expression and differentiation pathways.",
      },
    ],
    mechanism:
      "Epitalon is studied as a short pineal tetrapeptide that may influence telomerase-linked cell models, gene expression, and neuroendocrine signaling. Research claims around aging vary in strength, so product copy frames it as a laboratory research compound rather than a therapeutic.",
    storage:
      "Store lyophilized powder at -20\u00B0C. Once reconstituted, store at 2-8\u00B0C and use within 30 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "Epitalon is a four-amino-acid peptide, not a steroid. It does not mimic testosterone or bind androgen receptors. Its research focus is pineal, telomerase, and gene-expression signaling rather than anabolic hormone activity.",
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    shortName: "GHK-Cu",
    tagline: "Copper Tripeptide",
    description:
      "GHK-Cu is a copper-binding tripeptide complex based on glycyl-L-histidyl-L-lysine. It is one of the most recognized copper peptides in tissue remodeling research, with literature covering wound-healing models, collagen and extracellular-matrix signaling, antioxidant response, and skin-repair pathways.",
    category: "Copper Peptide Research",
    price: 24.99,
    dosage: "50mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "89030-95-5",
    molecularFormula: "C14H24CuN6O4",
    molecularWeight: "403.92 g/mol",
    sequence: "Gly-His-Lys-Cu",
    bulkPricing: [
      { qty: 1, price: 24.99 },
      { qty: 3, price: 22.99 },
      { qty: 5, price: 19.99 },
      { qty: 10, price: 17.99 },
    ],
    researchAreas: [
      "Tissue remodeling",
      "Wound healing models",
      "Collagen and ECM signaling",
      "Skin repair pathways",
      "Oxidative stress response",
    ],
    keyStudies: [
      {
        title: "The human tripeptide GHK and tissue remodeling",
        authors: "Pickart L, et al.",
        journal: "Journal of Biomaterials Science, Polymer Edition",
        year: 2008,
        finding:
          "Reviewed GHK and GHK-Cu research across tissue remodeling, wound-healing, and skin-repair models.",
      },
      {
        title:
          "Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data",
        authors: "Pickart L, et al.",
        journal: "International Journal of Molecular Sciences",
        year: 2018,
        finding:
          "Summarized GHK-Cu's reported regenerative and protective effects and discussed gene-expression data related to tissue repair.",
        doi: "10.3390/ijms19071987",
      },
    ],
    mechanism:
      "GHK-Cu is studied as a copper-binding peptide complex involved in extracellular-matrix remodeling, collagen signaling, and oxidative-stress response pathways. Copper coordination is central to its research profile, distinguishing it from hormone or receptor-agonist peptides.",
    storage:
      "Store lyophilized powder at -20\u00B0C, protected from light and moisture. Once reconstituted, store at 2-8\u00B0C and use within 30 days.",
    reconstitution:
      "Reconstitute with bacteriostatic water. Add solvent slowly along the vial wall. Do not shake \u2014 gently swirl until fully dissolved.",
    notSteroids:
      "GHK-Cu is a copper peptide complex, not a steroid. It has no androgenic, estrogenic, or anabolic hormone activity. Its research profile centers on copper coordination, wound-healing models, and tissue remodeling.",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
