import type { ResearchEntry } from "./research";

type EvidenceContext = Pick<ResearchEntry, "evidence" | "humanObservation" | "studyType">;

export function evidenceContext(entry: EvidenceContext) {
  if (entry.studyType === "observational") {
    return "Researchers observed people or measured naturally occurring peptide levels. Associations do not show that administering the peptide caused a benefit.";
  }
  if (entry.studyType === "case-report") {
    return "A report of individual cases can highlight a possible safety signal. It cannot show how often an event occurs or prove that the peptide caused it.";
  }
  if (entry.studyType === "secondary-analysis") {
    return "This analysis uses participants from an existing trial to examine another question. It adds information, but is not a separate trial or independent replication.";
  }
  if (entry.studyType === "laboratory") {
    return "This paper examines laboratory measurements or analytical methods. It is not a study of treatment outcomes in people.";
  }
  if (entry.humanObservation) {
    return "This paper combines observations in people with laboratory or animal experiments. Measuring a naturally occurring peptide in people is different from testing peptide administration.";
  }
  return entry.evidence === "human"
    ? "The paper includes research in people. Its comparison groups, participant selection, follow-up, and measured outcomes determine how far the findings can be applied. The label alone does not establish efficacy or safety."
    : "Researchers studied cells, isolated tissue, or animals. These experiments can help explain a mechanism, but do not establish benefits or safety in people. Human cells grown in a laboratory also belong in this category.";
}

export interface StudyReadingDetails {
  title?: string;
  design: string;
  measures: string;
  context: string;
}

// Paraphrased from the linked primary-source abstracts, or PMC full text.
// Verified October 4, 2026. Do not infer missing sample sizes or follow-up.
export const studyReadingDetails: Record<string, StudyReadingDetails> = {
  "PMID 21030672": {
    title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration.",
    design: "Rat Achilles tendon explants and cultured tendon fibroblasts were studied with and without BPC-157. Fibroblasts are cells that help produce connective tissue.",
    measures: "Cell outgrowth from tendon tissue, movement and spreading of cells, proliferation, and survival during hydrogen-peroxide stress. The researchers also examined proteins involved in cell movement.",
    context: "The observed changes concerned cell movement and survival. Direct proliferation did not increase in the tested cultures, so more outgrowth should not be read as proof that BPC-157 simply makes tendon cells multiply.",
  },
  "PMID 14554208": {
    design: "Rats with surgically cut Achilles tendons were compared with saline-treated controls. Assessments were made over 14 days, alongside separate tendon-cell culture experiments.",
    measures: "Walking-related function, the force needed to break the healing tendon, tendon stiffness, and tissue appearance under a microscope. Cell experiments tested responses to a growth-inhibiting aldehyde.",
    context: "The reported effects involved several aspects of repair in this surgical rat model, rather than a single cell marker. Mechanical measurements describe the tested tendon; they do not predict recovery time for a person with a tendon injury.",
  },
  "PMID 37366315": {
    title: "Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial.",
    design: "A randomized, double-blind, placebo-controlled trial followed 338 adults for 48 weeks. Participants met specified BMI and health criteria; the study used a controlled investigational formulation.",
    measures: "Percentage change in body weight at 24 weeks was the primary outcome. Other outcomes included weight change at 48 weeks, the proportion reaching weight-loss thresholds, and adverse events.",
    context: "Weight changes were group averages, not predictions for an individual. Gastrointestinal adverse events were common and generally mild to moderate. Dose-related heart-rate increases peaked at 24 weeks and then declined; weight change alone does not describe the safety findings.",
  },
  "PMID 38858523": {
    design: "A liver-fat substudy included 98 participants from the 48-week obesity trial who had at least 10% liver fat at baseline. Retatrutide groups were compared with placebo.",
    measures: "Relative change in MRI-measured liver fat at 24 weeks was the primary outcome. Researchers also assessed the proportion reaching less than 5% liver fat and relationships with weight and metabolic changes.",
    context: "Liver fat fell more in the retatrutide groups than with placebo. These are imaging outcomes from the parent trial's participants, not a separate confirmation of clinical liver benefit. Less liver fat does not by itself demonstrate less scarring or fewer liver-related complications.",
  },
  "PMID 10469335": {
    title: "Thymosin beta4 accelerates wound healing.",
    design: "Full-thickness rat wounds treated with full-length thymosin beta4 were compared with saline-treated wounds. A separate cell assay examined movement of keratinocytes, which are cells of the skin's outer layer.",
    measures: "New epithelial coverage of the wound, wound contraction, collagen deposition, blood-vessel formation, and keratinocyte migration.",
    context: "The paper combined tissue-level wound observations with a cell-movement experiment. It studied thymosin beta4, so its results cannot be assigned to a product called TB-500 without establishing the preparation's sequence and formulation.",
  },
  "PMID 15565145": {
    design: "Researchers examined heart-cell cultures and mice after surgical blockage of a coronary artery. The tested peptide was full-length thymosin beta4.",
    measures: "Heart-cell migration and survival, ILK/Akt cell-survival signaling, and cardiac function after injury in mice.",
    context: "Changes in cell-survival signaling accompanied the reported mouse cardiac findings. These experiments help investigate a repair pathway; they do not establish recovery after a heart attack in people or equivalence to commercial TB-500.",
  },
  "PMID 8637402": {
    title: "Evaluation of melanotan-II, a superpotent cyclic melanotropic peptide in a pilot phase-I clinical study.",
    design: "Three healthy male volunteers took part in a single-blind pilot with alternating saline and Melanotan II exposure over two weeks. Pigmentation was assessed one week after the study exposures ended.",
    measures: "Skin pigmentation using visual assessment and reflectance measurements, together with recorded adverse effects.",
    context: "Pigmentation changes were reported in two participants. Nausea, fatigue, sleepiness, yawning, and spontaneous erections were also recorded. The pilot's very small size and short observation period are central to interpreting both the pigment findings and adverse effects.",
  },
  "PMID 9679884": {
    design: "Ten men with psychogenic erectile dysfunction entered a double-blind, placebo-controlled crossover experiment. A crossover design compares study conditions within the same participants.",
    measures: "The presence, duration, and rigidity of erections were recorded with RigiScan monitoring over six hours. Adverse effects were also recorded.",
    context: "Erectile responses were reported in eight of ten men after Melanotan II. Nausea, yawning, stretching, and reduced appetite were more frequent than after placebo. Short laboratory monitoring does not describe longer-term use or outcomes in other populations.",
  },
  "PMID 25738459": {
    title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance.",
    design: "The researchers identified MOTS-c and investigated its activity in cell experiments and mouse models of diet- and age-related metabolic changes.",
    measures: "Cellular metabolic pathways, AMPK signaling, insulin sensitivity, and diet-related metabolic outcomes in mice. AMPK is a protein involved in regulating cellular energy use.",
    context: "The paper connects a possible cellular mechanism with metabolic observations in mice. It does not test administered MOTS-c as a treatment in people; the origin of the peptide in mitochondria does not change that evidence boundary.",
  },
  "PMID 33473109": {
    design: "MOTS-c administration was studied in mice of different ages. A separate human component measured naturally occurring MOTS-c in muscle and blood after exercise.",
    measures: "Mouse physical-performance measures and muscle stress-response pathways, plus exercise-related changes in human MOTS-c levels.",
    context: "The human and mouse parts answer different questions. The human observations concern the body's response to exercise; the administration and performance experiments were in mice. Combining those findings does not demonstrate an exercise benefit from administering MOTS-c to people.",
  },
  "PMCID PMC3342713": {
    title: "Pinealon protects the rat offspring from prenatal hyperhomocysteinemia",
    design: "Pregnant rats received a methionine-enriched diet to create a prenatal high-homocysteine model. Researchers examined offspring after Pinealon exposure in that experimental setting.",
    measures: "Offspring spatial learning and orientation, and oxidative-stress responses in neurons isolated from the cerebellum. The cell work measured reactive oxygen accumulation and necrotic cell death.",
    context: "Behavioral observations and isolated-neuron measurements were reported in offspring exposed to a particular prenatal stress model. These findings do not describe cognition in healthy adult humans or show that a change in a cell-stress marker predicts a clinical benefit.",
  },
  "PMID 21978084": {
    design: "Pinealon was tested in cerebellar granule cells, neutrophils, and PC12 cell cultures exposed to experimentally induced oxidative stress.",
    measures: "Reactive oxygen species, necrotic cell death, ERK signaling over time, and cell-cycle changes. Reactive oxygen species are molecules involved in oxidative stress; ERK proteins participate in cell signaling.",
    context: "Cell survival, oxidative-stress markers, and cell-cycle behavior are different outcomes. The reported changes help describe responses in these cultures, but are not measurements of memory, learning, or a neurological treatment effect in people.",
  },
  "PMID 12937682": {
    title: "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells.",
    design: "Human fetal fibroblasts that initially lacked detectable telomerase activity were exposed to Epithalon, an alternate spelling of Epitalon, in cell culture.",
    measures: "Expression of a telomerase component, telomerase enzyme activity, and telomere length. Telomeres are chromosome-end structures; telomerase can extend them.",
    context: "The measured outcomes concern chromosome maintenance in cultured cells. A longer telomere in that setting is not a measurement of a person's lifespan, healthspan, or biological age, and cannot establish an anti-aging benefit in people.",
  },
  "PMID 40908429": {
    design: "Epitalon was tested in normal epithelial and fibroblast cultures and in two breast-cancer cell lines. Researchers extracted DNA, RNA, and proteins for laboratory analysis.",
    measures: "Telomere length, hTERT gene expression, telomerase activity, and alternative lengthening of telomeres (ALT), using qPCR and fluorescence-based analysis. ALT is a pathway that can maintain telomeres without telomerase.",
    context: "Normal and cancer cells did not show the same dominant pathway: telomerase-related changes were reported in normal cells, while ALT activity was prominent in cancer cells. Telomere extension across these models should not be presented as a uniform beneficial or safe outcome.",
  },
  "PMID 3169264": {
    title: "Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+.",
    design: "Fibroblast cultures were exposed to the GHK-Cu complex, and researchers examined collagen production alongside changes in cell number.",
    measures: "Collagen synthesis and cell counts. Collagen is a structural protein in connective tissue; fibroblasts are cells that help produce that tissue.",
    context: "The reported increase in collagen production was independent of cell-number changes. This is a laboratory production measure, rather than a test of visible skin improvement, wound closure, or outcomes in people.",
  },
  "PMID 15655171": {
    design: "Normal and irradiated human dermal fibroblasts were grown in media without added serum or growth factors. GHK-Cu-exposed cultures were compared with untreated cultures.",
    measures: "Cell counts, population-doubling time, and production of three growth factors: basic fibroblast growth factor, TGF-beta1, and VEGF. These are signaling proteins involved in tissue biology.",
    context: "Treated cultures replicated faster, and irradiated treated cells showed early increases in basic fibroblast growth factor and VEGF. Patient-derived cells still represent a laboratory model; the study did not measure wound recovery in those patients.",
  },
};
