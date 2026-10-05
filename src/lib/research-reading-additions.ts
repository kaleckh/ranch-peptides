import type { StudyReadingDetails } from "./research-reading";

// Study-specific paraphrases checked against linked PubMed abstracts on October 4, 2026.
// These explain the selected reading list; bibliographic search results are not editorially reviewed.
export const additionalReadingDetails: Record<string, StudyReadingDetails> = {
  "PMID 20388964": {
    "design": "Researchers compared cell cultures with rat models of crushed muscle and surgically divided muscle or tendon.",
    "measures": "Blood-vessel markers (CD34 and factor VIII) and VEGF, a protein involved in vessel growth, were examined during tissue healing.",
    "context": "Vessel-related changes occurred in injured rat tissue, while the cultures showed no direct vessel-growth effect. The result depended on the model and should not be described as a universal angiogenic effect."
  },
  "PMID 27847966": {
    "design": "The study combined chick membrane and endothelial-cell assays with a rat model of restricted hind-limb blood flow.",
    "measures": "Vessel density, cell tube formation, laser-measured blood flow, and VEGFR2/Akt/eNOS signaling were assessed. An inhibitor tested the role of receptor internalization.",
    "context": "The experiments connected vascular measurements with a possible signaling pathway. Improved blood flow in a rat injury model does not establish circulation or healing benefits in people."
  },
  "PMID 34324435": {
    "design": "A single clinic reviewed knee-pain records and contacted 16 of 17 patients by telephone. Twelve had received BPC-157 alone and four a combination with thymosin beta4.",
    "measures": "Patients recalled changes in pain and how long improvement lasted. The study did not use specific standardized measures of function, stiffness, or quality of life.",
    "context": "Reported improvement was subjective and there was no untreated comparison group. The combination group cannot isolate BPC-157's contribution; the study did not demonstrate cartilage repair."
  },
  "PMID 40131143": {
    "design": "Two adults who had previously received intravenous BPC-157 were observed during a short pilot with baseline and follow-up testing.",
    "measures": "Vital signs, reported adverse effects, and blood markers concerning liver, kidney, thyroid, glucose, and other functions were checked over several days.",
    "context": "The authors reported no measured changes of concern in these two participants. This very small, short observation cannot establish general safety, detect uncommon events, or describe long-term effects."
  },
  "PMID 39325560": {
    "design": "An uncontrolled clinic study enrolled 12 women with interstitial cystitis after prior pentosan treatment had not helped. BPC-157 was used in a bladder procedure.",
    "measures": "Symptoms were assessed with a Global Response Assessment questionnaire; adverse events were also reported.",
    "context": "The improvement reports came from patient ratings without a comparison group. The design cannot separate the peptide's effect from the procedure, expectations, or changes over time."
  },
  "PMID 20225319": {
    "design": "Rats with a surgically divided medial collateral knee ligament were followed for up to 90 days, with treated groups compared against controls.",
    "measures": "Ligament function, mechanical strength, gross appearance, and tissue structure under a microscope were assessed.",
    "context": "Several repair measurements favored the treated animals in this model. A deliberately cut rat ligament is different from typical human sprains, and the results do not predict a person's recovery time."
  },
  "PMID 20388954": {
    "design": "Researchers induced periodontitis around a rat molar with a ligature and examined the tissue after the experimental period.",
    "measures": "Gum blood flow, fluid leakage, inflammatory tissue changes, and bone loss using micro-CT were measured.",
    "context": "Inflammation and bone-loss findings differed from controls, but blood flow in healthy gums did not change. The paper does not establish treatment of human gum disease."
  },
  "PMID 19903499": {
    "design": "The sciatic nerve was cut in rats and either surgically reconnected or studied with a nerve tube bridging a removed segment.",
    "measures": "Walking-related nerve function, electrical muscle responses, self-injury behavior, and microscopic features of regenerating nerve fibers were assessed.",
    "context": "Functional and tissue findings favored the treated rats. These outcomes concern severe experimental nerve injury and reconstruction, rather than proof of nerve regeneration in people."
  },
  "PMID 11718984": {
    "design": "Mice with controlled skin burns were studied using local and systemic BPC-157 preparations, alongside vehicle, untreated, and silver-sulfadiazine comparisons.",
    "measures": "Skin strength and elongation, swelling, inflammation, epithelial coverage, collagen, and associated gastric lesions were assessed for up to 21 days.",
    "context": "The findings involved a specific mouse burn model and experimental preparations. They cannot establish the performance of a commercial cream or clinical burn treatment."
  },
  "PMID 18668315": {
    "design": "A rat calf-muscle crush injury model compared BPC-157 groups with controls over 14 days.",
    "measures": "Muscle function, tissue damage and repair, swelling, contracture, and blood enzyme markers associated with muscle injury were examined.",
    "context": "The paper reports repair-related changes after a controlled crush injury. It does not measure athletic recovery or return to activity in people."
  },
  "PMID 35449779": {
    "design": "Researchers used rat paw-incision and formalin-induced pain models with randomized comparison groups.",
    "measures": "Mechanical withdrawal thresholds after incision and flinching during early and late phases of the formalin test were recorded.",
    "context": "Responses improved in some early assessments, but not the later formalin phase. The result should not be presented as sustained or general pain relief."
  },
  "PMID 33051481": {
    "design": "Isolated rat aortic rings and vascular cells were studied with endothelial removal and inhibitors of nitric-oxide and signaling pathways.",
    "measures": "Vessel relaxation, nitric-oxide production, and Src/Caveolin-1/eNOS pathway changes were measured.",
    "context": "Relaxation was largely dependent on the vessel's endothelial lining and nitric oxide under the tested conditions, with slight residual relaxation at the highest concentration after the lining was removed. This isolated-tissue mechanism does not establish blood-pressure or cardiovascular outcomes in people."
  },
  "PMID 19093208": {
    "design": "Rats underwent major small-bowel resection and were followed for four weeks in treated and control groups.",
    "measures": "Body weight, intestinal villus and crypt dimensions, bowel-wall characteristics, and surgical-join strength were assessed.",
    "context": "The results describe structural adaptation and healing after rat surgery. They do not directly show restored nutrient absorption or outcomes after human bowel resection."
  },
  "PMID 23220707": {
    "design": "A surgically created esophagus-to-skin fistula in rats was studied alongside interventions affecting nitric-oxide signaling.",
    "measures": "Leakage and defect closure, sphincter pressure, and expression of eNOS, iNOS, and COX-2 were examined.",
    "context": "Repair and signaling measurements were associated in this model. Those markers alone do not prove a universal mechanism or establish treatment of fistulas in people."
  },
  "PMID 15052688": {
    "design": "The reported experiments used rats with several forms of acute or chronic gastric ulcer injury, with prevention and healing comparisons.",
    "measures": "Ulcer extent, epithelial restoration, and granulation tissue in injured stomach tissue were assessed.",
    "context": "The study's results are from rat experiments. References to clinical development in its introduction do not turn these experiments into a human ulcer trial."
  },
  "PMID 12781609": {
    "design": "Burned mice were studied with and without corticosteroid exposure, using experimental BPC-157 cream and control groups over 21 days.",
    "measures": "Skin strength, microscopic healing, gastric injury, and splenic immune-cell responses were examined.",
    "context": "The paper addresses wound healing within a particular burn-and-steroid model. It cannot establish reversal of steroid-related healing problems in patients."
  },
  "PMID 19931318": {
    "design": "Mice received a controlled falling-weight head injury. The tested schedules included administration before the injury.",
    "measures": "Early consciousness, mortality, brain lesions, and swelling were assessed.",
    "context": "Much of the experiment concerns exposure before trauma, rather than treatment started after an unexpected injury. It does not establish neurological recovery after human head injury."
  },
  "PMID 34829776": {
    "design": "Researchers separated the quadriceps tendon from muscle in rats and assessed repair at several points through 42 days.",
    "measures": "Function, mechanical strength, defect size, muscle atrophy, microscopic healing, and nitric-oxide and oxidative-stress markers were measured.",
    "context": "The findings concern a deliberately created tendon-muscle separation. Changes in signaling markers accompany repair but do not by themselves establish which pathway caused it."
  },
  "PMID 37385280": {
    "design": "A randomized, blinded phase 2 study enrolled 281 adults with type 2 diabetes at 42 US centers and compared retatrutide with placebo and dulaglutide over 36 weeks.",
    "measures": "The primary outcome was HbA1c change at 24 weeks. Later glucose and weight changes and adverse events were also assessed.",
    "context": "Glucose and weight outcomes differed by study group, and gastrointestinal events were frequent. The controlled investigational product and selected population define the scope of these results."
  },
  "PMID 40609566": {
    "design": "A body-composition substudy enrolled 189 participants from the phase 2 diabetes trial; 103 completed treatment and both required DXA scans.",
    "measures": "DXA imaging measured total fat mass and lean mass, with fat-mass change at week 36 the primary substudy outcome.",
    "context": "The analysis used a subset of the parent trial with available scans. Weight loss included lean mass loss; this is not an independent trial or proof that muscle is preserved."
  },
  "PMID 35985340": {
    "design": "The discovery program combined receptor assays, obese-mouse experiments, and an early single-exposure phase 1 study of LY3437943, now called retatrutide.",
    "measures": "Receptor activity, food intake and energy expenditure, glucose and weight changes, tolerability, and drug persistence were examined.",
    "context": "The different experiments support a development hypothesis but answer different questions. Mouse energy-expenditure mechanisms and early human observations do not establish long-term clinical outcomes."
  },
  "PMID 36354040": {
    "design": "A blinded, randomized phase 1b study enrolled 72 adults with type 2 diabetes for 12 weeks, with placebo and a small dulaglutide comparison group.",
    "measures": "Safety and tolerability were primary; drug concentrations, glucose, HbA1c, and body weight were additional measures.",
    "context": "Twenty-nine participants discontinued early, and gastrointestinal problems were common. The short, small study was designed for early development rather than definitive efficacy or long-term safety."
  },
  "PMID 41056349": {
    "design": "Mice underwent a 31-day Western-diet and sugar model with a final fructose exposure; retatrutide was tested during the last two weeks.",
    "measures": "Liver enzymes, liver fat and cholesterol, inflammatory markers, body weight, and gene-expression patterns were measured.",
    "context": "The intervention findings were reported in female mice. Similarities between mouse and human gene patterns do not establish a clinical effect on liver inflammation or scarring."
  },
  "PMID 40726454": {
    "design": "Post-hoc analyses of two phase 2 trials were combined with experiments in cultured human liver cells.",
    "measures": "Circulating ANGPTL proteins and complexes, blood lipids, their correlations, and receptor-dependent secretion in liver cultures were assessed.",
    "context": "Protein and lipid changes occurred together, while cell experiments suggested a glucagon-receptor mechanism. The clinical correlations do not alone prove that this mechanism caused the lipid changes."
  },
  "PMID 41216380": {
    "design": "Forty participants leaving the phase 2 obesity trial completed recorded, semi-structured telephone interviews; only four had received placebo.",
    "measures": "Researchers analyzed accounts of eating behavior, activity, emotions, social life, and perceived weight-related benefits and drawbacks.",
    "context": "The interviews provide detail about experience, including adverse effects and unmet expectations. Uneven groups and selected interviewees limit treatment comparisons and generalization."
  },
  "PMID 40094000": {
    "design": "Retatrutide was examined in preclinical obesity-associated pancreatic and lung tumor models.",
    "measures": "Tumor establishment, onset and volume, weight changes, and systemic and tumor immune-cell patterns were assessed.",
    "context": "Tumor findings in these experimental models do not demonstrate cancer prevention or treatment in people. The study's clinical possibilities remain hypotheses."
  },
  "PMID 40916752": {
    "design": "Exploratory analyses used 275 participants from the phase 2 diabetes trial, with questionnaires at 24 and 36 weeks.",
    "measures": "Self-reported appetite, hunger, tendency to overeat, deliberate food restriction, and correlations with weight changes were measured.",
    "context": "Questionnaire changes concern perceptions and behaviors reported during an existing trial. Correlation with weight loss does not show which change caused the other."
  },
  "PMID 40464942": {
    "design": "Isolated left and right atrial tissue from adult mice was tested with retatrutide and receptor or signaling inhibitors.",
    "measures": "Contraction force in electrically paced tissue and spontaneous beating rate were measured.",
    "context": "The tested left atria did not show increased force, while right-atrial beating rate increased through a proposed glucagon-receptor pathway. This is not a whole-animal or human cardiac-outcomes study."
  },
  "PMID 40630318": {
    "design": "A post-hoc analysis combined kidney measurements from the phase 2 diabetes and obesity trials at 36 and 48 weeks.",
    "measures": "Urine albumin-to-creatinine ratio and estimated kidney filtration using creatinine, cystatin C, or both were assessed.",
    "context": "Most participants had normal baseline urine albumin, so absolute changes were modest. Changes in estimated filtration or urine markers do not establish prevention of kidney failure."
  },
  "PMID 42250575": {
    "design": "A randomized, blinded phase 3 trial enrolled 537 adults with diabetes inadequately controlled by diet and exercise, comparing retatrutide with placebo over 40 weeks.",
    "measures": "HbA1c change at week 40 was primary; body-weight change, adverse events, and treatment discontinuation were also assessed.",
    "context": "Glucose and weight improved relative to placebo, with gastrointestinal events most frequent. The population, follow-up, and investigational formulation limit application beyond this trial."
  },
  "PMID 40613938": {
    "design": "Right-atrial tissue obtained during surgery from adults with severe coronary disease was studied outside the body.",
    "measures": "Contraction force and relaxation time were measured alongside receptor-blocking and cell-signaling experiments.",
    "context": "The tissue showed contraction responses under laboratory conditions. Human-derived tissue does not make this a trial of heart function, cardiovascular benefit, or safety in patients."
  },
  "PMID 40699363": {
    "design": "Male and female rats were trained to distinguish alcohol's internal effects in an operant task; acute retatrutide was compared with other incretin agonists.",
    "measures": "Alcohol discrimination was measured. Repeated-treatment and withdrawal experiments in this paper used semaglutide.",
    "context": "Retatrutide altered an experimental alcohol cue. That result does not establish reduced drinking or treatment of alcohol-use disorder in people, and the repeated semaglutide findings should not be assigned to retatrutide."
  },
  "PMID 30241380": {
    "design": "An experimental bacterial keratitis model compared full-length thymosin beta4 plus ciprofloxacin with each intervention alone and a vehicle control.",
    "measures": "Clinical eye scores, slit-lamp images, tissue appearance, bacterial burden, inflammatory cells, cytokines, and oxidative-stress markers were assessed.",
    "context": "The combination performed differently from either component alone. It does not establish that thymosin beta4 can replace antibiotics or that a TB-500 preparation has the same effects."
  },
  "PMID 25652683": {
    "design": "Endothelial-cell assays and mouse and rabbit limb-ischemia models used viral vectors to increase thymosin beta4, with pathway-blocking comparisons.",
    "measures": "Cell tube formation, capillary density, collateral vessels, and limb perfusion were measured while PI3K/Akt and Rho pathways were inhibited.",
    "context": "The experiments concern gene delivery and signaling dependencies. They do not directly test administration of a commercial TB-500 peptide or clinical treatment of poor circulation."
  },
  "PMID 19247195": {
    "design": "Cultured endothelial progenitor cells were exposed to thymosin beta4 with inhibitors of several signaling pathways.",
    "measures": "Directional cell migration and phosphorylation of Akt, eNOS, and ERK were measured.",
    "context": "Blocking PI3K or eNOS reduced migration, while ERK inhibition did not substantially do so. The distinction supports a pathway hypothesis in cells rather than a clinical vessel-repair outcome."
  },
  "PMID 25015963": {
    "design": "Mice with experimentally induced heart attacks received full-length thymosin beta4 or vehicle for seven days or five weeks.",
    "measures": "Cardiac rupture, ultrasound-measured function, inflammatory cells, cell death, collagen, capillary density, and protein markers were examined.",
    "context": "The study reports both early injury and later remodeling outcomes in mice. It cannot establish post-heart-attack treatment in people or equivalence to TB-500."
  },
  "PMID 14657002": {
    "design": "Normal rats and mice and isolated rat whisker-follicle cells were used to study full-length thymosin beta4 during hair growth.",
    "measures": "Hair growth, follicle-cell migration and differentiation, peptide expression during the growth cycle, and matrix-remodeling enzyme activity were assessed.",
    "context": "The work connects follicle biology with rodent hair growth. It does not measure human scalp-hair outcomes or test a TB-500 hair product."
  },
  "PMID 20486893": {
    "design": "Young male rats with controlled cortical-impact brain injury received thymosin beta4 or saline beginning one day after injury, with sham animals as an additional comparison.",
    "measures": "Neurological scores, foot faults, water-maze performance, and brain markers of vessel and nerve-cell formation were examined through 35 days.",
    "context": "Function and some tissue measures improved, but lesion volume did not change. The distinct outcomes should not be collapsed into a claim that brain damage was eliminated."
  },
  "PMID 25042765": {
    "design": "Mice underwent bilateral fibular osteotomy and received full-length thymosin beta4 or saline.",
    "measures": "Healing callus strength and stiffness, micro-CT mineralization, and microscopic bone composition were assessed.",
    "context": "Stronger healing bone was reported in this experimental setting. Mechanical and imaging outcomes in mice do not determine human fracture-healing time."
  },
  "PMID 28864242": {
    "design": "Older male rats were randomized after an experimental embolic stroke to full-length thymosin beta4 or control, with follow-up through 56 days.",
    "measures": "Infarct volume, neurological and motor tests, myelin-related changes, and glial-cell staining were measured.",
    "context": "Infarct volume decreased, but functional outcomes did not improve. This negative functional finding is central to interpreting the paper and differs from results in younger animal models."
  },
  "PMID 11891186": {
    "design": "Researchers increased or suppressed thymosin beta4 expression in mouse fibrosarcoma cells and tested tumor behavior in mice.",
    "measures": "Tumor formation, lung metastases, cell movement and shape, and actin organization were examined.",
    "context": "Higher expression promoted aggressive behavior in this tumor model. The study concerns altered gene expression, not a peptide safety trial, but shows why repair-related mechanisms should not be assumed uniformly beneficial."
  },
  "PMID 32223337": {
    "design": "Cultured human corneal epithelial cells were studied with thymosin beta4 and inhibitors of the P2X7 receptor.",
    "measures": "Cell proliferation, gap closure, extracellular ATP, intracellular calcium, and ERK phosphorylation were measured.",
    "context": "The work proposes a mechanism for movement of corneal cells. Human cells in culture are not clinical evidence of eye healing in patients."
  },
  "PMID 18821984": {
    "design": "Human gum fibroblasts in culture were challenged with inflammatory signals, bacterial components, or substances used in oral-care preparations.",
    "measures": "IL-8 secretion, survival, and programmed cell death were assessed with and without thymosin beta4.",
    "context": "Protection differed by challenge: some inflammatory and chemical effects changed, while bacterial lipopolysaccharide challenges did not. This does not establish general antimicrobial or gum-treatment benefit."
  },
  "PMID 40816274": {
    "design": "Familial Alzheimer-related brain organoids made from induced stem cells and an Alzheimer mouse model were studied, alongside analyses of human neuronal gene expression.",
    "measures": "Neuron maturation, cell senescence, amyloid production, and thymosin beta4-related changes were examined.",
    "context": "Organoids and mice showed changes after thymosin beta4 exposure. The patient-data component concerned gene expression, and the paper does not demonstrate clinical treatment of Alzheimer disease."
  },
  "PMID 28724974": {
    "design": "Mice and rats exposed to carbon tetrachloride were used as models of acute liver injury and subsequent fibrosis.",
    "measures": "Liver enzymes, oxidative-stress and inflammatory markers, collagen-related measures, and tissue damage were assessed.",
    "context": "The findings concern chemically induced rodent injury. They do not establish prevention or reversal of liver fibrosis in people or outcomes with TB-500."
  },
  "PMID 11018622": {
    "design": "Ten men with erectile dysfunction and organic risk factors entered a blinded, placebo-controlled crossover experiment.",
    "measures": "Erection duration and rigidity were monitored over six hours, with questionnaires on desire and adverse effects.",
    "context": "Short-term responses were reported, but nausea was also frequent and sometimes severe. The small laboratory experiment does not describe long-term outcomes."
  },
  "PMID 23121206": {
    "design": "A case report describes a man hospitalized after using an internet-purchased product; mass spectrometry confirmed Melanotan II in the tested substance.",
    "measures": "Symptoms, heart rate, kidney function, and creatine kinase, a marker of muscle injury, were tracked during hospitalization.",
    "context": "The case identifies a serious toxicity signal including muscle breakdown and renal dysfunction. It cannot determine how commonly this occurs or characterize every marketed preparation."
  },
  "PMID 24355990": {
    "design": "A case report describes a young woman who used Melanotan II and tanning beds before a suspicious skin lesion was removed.",
    "measures": "Clinical skin examination and tissue histology established a melanoma diagnosis.",
    "context": "The exposures coincided with melanoma, but a single case with tanning-bed exposure cannot establish the peptide's separate causal contribution or calculate risk."
  },
  "PMID 24771717": {
    "design": "Laboratory methods tested Melanotan II vials purchased from three online shops.",
    "measures": "Chromatography and mass spectrometry assessed peptide identity, quantity, purity, and unknown impurities.",
    "context": "Contents differed from label claims in the sampled vials. The paper tests those products and analytical methods, not clinical outcomes or the quality of products sold here."
  },
  "PMID 29812984": {
    "design": "Mice with selected receptor or mast-cell deficiencies were compared with controls, alongside mast-cell experiments.",
    "measures": "Body temperature, circulating histamine, and responses to histamine-receptor blockade were measured.",
    "context": "The transient cooling response depended on mast cells and histamine signaling in these mice. It does not establish the same response or mechanism in people."
  },
  "PMID 30629642": {
    "design": "Adult male mice from a maternal immune-activation model were compared with normal-background mice during a seven-day experiment.",
    "measures": "Social interaction, vocal communication, repetitive behavior, anxiety-related behavior, and body weight were assessed.",
    "context": "Some social measures changed in the model animals, while normal mice showed different responses. Mouse behavior does not establish treatment of autism in people."
  },
  "PMID 28009464": {
    "design": "Researchers examined oxytocin neurons in rats after systemic or intranasal Melanotan II exposure, using receptor-blocking comparisons.",
    "measures": "Neuronal activation markers, electrical firing, and local oxytocin release measured by microdialysis were examined.",
    "context": "Increased neuronal firing did not mean increased local oxytocin release, and routes differed. These measurements do not demonstrate improved human social behavior."
  },
  "PMID 17113634": {
    "design": "Ovariectomized female rats were given different hormone-priming conditions and tested in repeated paced-mating experiments.",
    "measures": "Solicitation behaviors, mating pacing, and receptivity were scored.",
    "context": "Some solicitation behaviors increased only with a particular estrogen-plus-progesterone condition; pacing and receptivity did not change. Human sexual desire was not measured."
  },
  "PMID 33332767": {
    "design": "Female mice with or without PACAP deficiency were studied during three weeks of cold acclimation.",
    "measures": "Stimulated metabolic rate, lipid use, and fat-tissue remodeling were assessed.",
    "context": "Melanotan II partly restored impaired heat-production responses in a genetic model. The study concerns cold-response physiology rather than clinical weight loss."
  },
  "PMID 37478579": {
    "design": "Zebrafish on high-fat or control diets were studied over a short developmental period with and without Melanotan II.",
    "measures": "Recognition memory, anxiety-related behavior, and exploration were assessed.",
    "context": "Behavioral differences were reported within a fish diet model. They do not establish cognitive or mood benefits in people."
  },
  "PMID 36155088": {
    "design": "Male mice received Melanotan II directly into a brain region involved in reward, with home-cage and operant feeding tests.",
    "measures": "Food consumption, effort to obtain food, taste avoidance, and metabolic rate were measured.",
    "context": "Food intake and motivation changed without the tested metabolic-rate change. Direct brain-region exposure is not equivalent to systemic administration or human appetite treatment."
  },
  "PMID 24790139": {
    "design": "Atherosclerosis-prone mice on a high-fat diet received Melanotan II or vehicle; their aortas were also tested outside the body.",
    "measures": "Plaque glucose-tracer uptake, inflammation markers, plaque size, cholesterol, and vessel relaxation were assessed.",
    "context": "Inflammation-related and vessel responses changed, but plaque size and cholesterol did not. The paper does not show plaque removal or prevention of cardiovascular events."
  },
  "PMID 33460908": {
    "design": "A single patient developed acute ischemic priapism after reported Melanotan II use and required surgical management.",
    "measures": "The report describes the presentation, response to initial procedures, and subsequent decompression.",
    "context": "This is a clinically important adverse-event report, rather than an estimate of frequency or proof of safety in people without that event."
  },
  "PMID 29983246": {
    "design": "Cell experiments examined movement of MOTS-c from mitochondria-related signaling into the nucleus during metabolic stress and glucose restriction.",
    "measures": "Nuclear localization, AMPK dependence, gene-expression changes, and interactions with stress-responsive transcription factors were measured.",
    "context": "The results describe communication inside cells. A change in stress-response genes is not a measurement of human metabolic health or longevity."
  },
  "PMID 33554779": {
    "design": "The paper combined human blood-level associations with cultured mouse muscle cells and diet-induced obese mice.",
    "measures": "MOTS-c and myostatin levels, muscle-cell atrophy, and CK2/PTEN/mTORC2/Akt/FOXO1 signaling were assessed.",
    "context": "The human component measured naturally occurring levels; administration experiments were in cells and mice. Their combination does not establish treatment of muscle wasting in people."
  },
  "PMID 34320351": {
    "design": "Autoimmune-diabetes mouse models and transferred mouse T cells were studied alongside human serum and isolated human T-cell analyses.",
    "measures": "Blood glucose, islet immune-cell infiltration, diabetes incidence, T-cell metabolism, and activation-related signaling were measured.",
    "context": "Human samples contributed biomarker and cell findings, while disease-prevention experiments were in mice. The paper does not test MOTS-c administration as a diabetes treatment in patients."
  },
  "PMID 39559755": {
    "design": "Cell-free binding assays and mouse administration experiments were combined with observational analyses of a naturally occurring human MOTS-c variant.",
    "measures": "CK2 binding and activity, muscle atrophy, glucose uptake, tissue-specific signaling, and associations with sarcopenia and diabetes were assessed.",
    "context": "MOTS-c did not have identical signaling effects in muscle and fat. Human genetic associations differ from intervention evidence and varied with sex, age, and activity."
  },
  "PMID 34253808": {
    "design": "Mammalian cell cultures were exposed to MOTS-c, with inflammatory and gene-suppression experiments to test mitochondrial-fusion pathways.",
    "measures": "Mitochondrial protein markers and counts, fusion proteins, GLUT4 movement, and glucose uptake were measured.",
    "context": "Increased biogenesis-related proteins occurred alongside fewer counted mitochondria, consistent with a fusion hypothesis. The result should not be simplified to a claim that MOTS-c increases mitochondrial numbers."
  },
  "PMID 27237975": {
    "design": "Mice after ovary removal were studied over 12 weeks, alongside experiments on formation of bone-resorbing cells.",
    "measures": "Micro-CT bone loss, osteoclast differentiation, and AMPK activation with inhibitor comparisons were assessed.",
    "context": "The study links a mouse bone-loss outcome with a cell pathway. It does not establish fracture prevention or osteoporosis treatment in people."
  },
  "PMID 38170165": {
    "design": "Male mice were randomized to non-immobilized control, cast-immobilized control, or cast immobilization with MOTS-c for eight days.",
    "measures": "Muscle mass, inflammatory markers, Akt/FOXO signaling, gene expression, and muscle lipid and collagen were measured.",
    "context": "Muscle loss was attenuated rather than eliminated. This short preventive mouse experiment does not establish rehabilitation outcomes after human immobilization."
  },
  "PMID 30725119": {
    "design": "Mice with surgically removed ovaries were used to model hormone-related metabolic changes, with AMPK-blocking comparisons.",
    "measures": "Body weight, insulin sensitivity, brown-fat activation, white-fat inflammation, and lipid metabolism were assessed.",
    "context": "The model explores effects following abrupt surgical hormone loss. It is not a clinical trial in menopausal women."
  },
  "PMID 29242099": {
    "design": "Forty patients undergoing coronary testing were grouped by endothelial function; separate experiments used rodent aortic rings.",
    "measures": "Naturally occurring blood MOTS-c levels and coronary responses were compared. Isolated vessels were tested for relaxation responses.",
    "context": "Lower human peptide levels were associated with poorer endothelial function. Vessel pretreatment altered rodent responses, but no human administration benefit was tested."
  },
  "PMID 33468709": {
    "design": "A genetic association analysis across three cohorts totaling 27,527 people was paired with cell and mouse comparisons of MOTS-c and its K14Q variant.",
    "measures": "Diabetes prevalence, activity-related associations, glucose tolerance, weight, and insulin-related cell responses were assessed.",
    "context": "Associations differed by sex and physical activity. A naturally occurring variant and animal experiments do not establish that administered MOTS-c prevents human diabetes."
  },
  "PMID 34351816": {
    "design": "Thirty people were assigned to endurance exercise, resistance exercise, or control, with blood and muscle samples before and after the session.",
    "measures": "Circulating humanin and MOTS-c, muscle peptide levels, exercise-related genes, and fitness correlations were measured.",
    "context": "The clearest circulating increase was in humanin; MOTS-c showed a trend after endurance exercise. No peptide was administered, and the findings do not demonstrate a MOTS-c treatment effect."
  },
  "PMID 31369811": {
    "design": "A mouse particle-induced bone-erosion model was combined with osteocyte and bone-marrow-cell experiments.",
    "measures": "Bone erosion, inflammation, OPG/RANKL balance, osteoclast formation, and stress-signaling pathways were assessed.",
    "context": "The particles model a particular inflammatory bone-loss process. The findings do not establish clinical protection of joint replacements or treatment of human bone disease."
  },
  "PMID 31109005": {
    "design": "Experimental cold-exposure models examined MOTS-c-related responses in fat tissue, with ERK-pathway inhibition.",
    "measures": "Cold tolerance, serum peptide levels, liver lipid handling, and brown- and white-fat thermogenic genes were measured.",
    "context": "The reported mechanism concerns adaptation to cold in the experimental model. It is not a human weight-loss or cold-tolerance trial."
  },
  "PMID 21809624": {
    "design": "Older rats received Pinealon or Cortexin before experimental carotid-artery occlusion, with sham-operated comparisons.",
    "measures": "Survival, behavioral activity, movement, motivation-related responses, and brain caspase-3 activity were assessed.",
    "context": "The reported behavior included reduced activity as well as other changes. Pretreatment and enzyme measurements do not establish cognitive improvement after stroke in people."
  },
  "PMID 18546825": {
    "design": "Several short peptides were compared in hypobaric-hypoxia experiments, with Pinealon also examined in a prenatal neuronal-stress model.",
    "measures": "Resistance to oxygen-related stress, reactive oxygen species, and endogenous antioxidant responses were examined.",
    "context": "The authors proposed several contributing mechanisms rather than a simple direct antioxidant effect. The model does not establish prevention of human hypoxic brain injury."
  },
  "PMID 26390612": {
    "design": "A small report studied Pinealon and Vesugen in adults with multiple conditions and an organic brain syndrome in remission.",
    "measures": "Biological-age indicators, metabolic and cellular markers, oxidative activity, blood stem-cell markers, and chromatin condensation were assessed.",
    "context": "Changes in a biological-age score do not demonstrate longer life. The abstract reports potentially unfavorable marker changes and does not clearly establish a blinded randomized comparison; unchanged chromatin condensation is not comprehensive genetic safety evidence."
  },
  "PMID 22708445": {
    "design": "Locomotive workers were observed during a two-week course of a Pinealon preparation.",
    "measures": "Biological-age indicators and measures of adaptive responses were assessed.",
    "context": "The short occupational report does not clearly describe a randomized, blinded control in its abstract. Its scores are not measurements of lifespan or prevention of workplace accidents."
  },
  "PMID 28539017": {
    "design": "A comparative report followed 110 people receiving several approaches, including a combined Pinealon/Vesugen preparation.",
    "measures": "Biological-age indicators, biochemical and immunological measures, and clinical condition were compared.",
    "context": "A combined preparation prevents isolation of Pinealon's contribution. Favorable scores and selected safety markers do not establish a lifespan benefit or general safety."
  },
  "PMID 28509493": {
    "design": "Eighteen-month-old rats were studied under acute low-pressure hypoxia or mild cooling, comparing Pinealon with Cortexin.",
    "measures": "Behavior, free-radical processes, caspase-3 activity, and brain neurotransmitter-related measures were examined.",
    "context": "Responses differed between peptides and stress models. These laboratory changes do not establish a geroprotective or cognitive effect in people."
  },
  "PMID 23734521": {
    "design": "An occupational study compared 150 male lorry drivers with 150 male metal craftsmen and reported peptide-related follow-up observations.",
    "measures": "Clinical questionnaires assessed psychological adaptation, anxiety, depressive and other symptoms in relation to work and personal characteristics.",
    "context": "The occupational comparison and peptide observations are different parts of the report. Combined Pinealon/Vesugen findings and an incompletely described treatment comparison limit causal conclusions."
  },
  "PMID 25051764": {
    "design": "Older rats exposed to acute hypoxia were studied with Pinealon or Cortexin.",
    "measures": "Brain caspase-3 activity and blood IL-6 and tumor-necrosis-factor markers were measured.",
    "context": "The authors interpreted these markers as possible neurogenesis and inflammation-related changes. Marker changes alone do not directly measure restored cognition or clinical neurological benefit."
  },
  "PMID 28976148": {
    "design": "Young and older rats were studied with Pinealon and Cortexin during learning experiments.",
    "measures": "Water-maze learning and regional brain caspase-3 activity and content were assessed.",
    "context": "Learning differences were reported in rats, while the link with caspase-3 remained an interpretation. The paper does not measure human memory or aging."
  },
  "PMID 18546826": {
    "design": "Several short peptides were compared in cell and biochemical assays involving human lipoproteins, red-cell membranes, and neuronal populations.",
    "measures": "Lipid peroxidation, resistance to osmotic red-cell rupture, reactive oxygen species, and cell death were measured.",
    "context": "The peptides did not show direct antioxidant activity in these assays, and some reactive-oxygen measurements rose. Reduced cell death should not be simplified into a uniform antioxidant claim."
  },
  "PMID 22117547": {
    "design": "Fluorescently labeled short peptides were examined in HeLa cells, with separate assays using DNA-related structures.",
    "measures": "Cellular localization and fluorescence changes during interactions with different nucleic-acid sequences were measured.",
    "context": "The binding and localization results suggest molecular interactions. They do not establish beneficial gene regulation, safety, or a neurological effect in people."
  },
  "PMID 14501183": {
    "design": "Two groups of 54 female mice received Epitalon or saline from early adulthood until natural death.",
    "measures": "Mean and maximum lifespan, late-survivor lifespan, reproductive function, chromosome abnormalities, and spontaneous tumors were assessed.",
    "context": "Mean lifespan did not change, although some late-survival measures increased. Total tumor incidence also did not change; these distinctions matter more than a general anti-aging claim."
  },
  "PMID 12459848": {
    "design": "Female mice genetically predisposed to HER-2/neu-related breast tumors were followed from early life until death.",
    "measures": "Lifespan, reproductive activity, tumor development, tumor burden, and lung metastases were assessed.",
    "context": "The findings concern a specific cancer-prone mouse strain. They do not establish cancer prevention or lifespan extension in people."
  },
  "PMID 12964022": {
    "design": "Eighty male rats exposed to a colon carcinogen were divided into groups receiving Epitalon during different stages of tumor development or saline.",
    "measures": "Tumor-cell division, programmed cell death, tissue stroma, and lymphoid infiltration around and within tumors were assessed.",
    "context": "Effects differed with the timing of exposure. This carcinogen model measures tissue changes, not prevention or treatment of human colon cancer."
  },
  "PMID 18856211": {
    "design": "Female rats were followed under standard, regional natural, or continuous lighting, with Epitalon comparisons.",
    "measures": "Lifespan and development of spontaneous tumors were recorded.",
    "context": "Lifespan did not change under the standard day/night regimen; some late-survival outcomes changed under other lighting conditions. The environmental dependence limits broad longevity conclusions."
  },
  "PMID 22816096": {
    "design": "Cultured rat pineal cells were exposed to Epitalon, Vilon, and combinations with norepinephrine.",
    "measures": "Melatonin in the culture medium and the AANAT enzyme and pCREB signaling protein were measured.",
    "context": "Increased hormone production in cells does not demonstrate improved sleep, circadian health, or melatonin regulation in people."
  },
  "PMID 40493162": {
    "design": "A human retinal pigment epithelial cell line was exposed to high glucose as a laboratory injury model.",
    "measures": "Gap healing, reactive oxygen species, antioxidant genes, and markers of epithelial-to-mesenchymal transition and fibrosis were assessed.",
    "context": "Changes occurred in cultured cells, rather than patients with diabetic retinopathy. The paper does not demonstrate restored vision or clinical retinal healing."
  },
  "PMID 15455129": {
    "design": "Human fetal pulmonary fibroblasts were grown through repeated passages, comparing aging cultures with Epitalon-treated cells.",
    "measures": "Telomere length and the number of additional cell divisions were assessed.",
    "context": "Longer proliferation in a culture is a cellular outcome. It does not measure human lifespan, healthspan, or the safety of extending cell division."
  },
  "PMID 11524632": {
    "design": "Female rhesus monkeys of different ages were studied during Epitalon-related hormone assessments.",
    "measures": "Melatonin and cortisol secretion were measured by immunoassay, including time-of-day patterns.",
    "context": "The report concerns hormone rhythms in nonhuman primates. It does not establish improved sleep or anti-aging outcomes in people."
  },
  "PMID 12500162": {
    "design": "Young male mice were exposed to two different stress models, with follow-up assays of thymus cells and brain membranes.",
    "measures": "Immune-cell proliferation, IL-1β responses, and sphingomyelinase activity were measured.",
    "context": "The paper describes stress-related signaling and cell responses. These are different from clinical measures of immune protection or stress resilience."
  },
  "PMID 12910293": {
    "design": "Campbell rats with inherited retinal degeneration were studied with offspring exposure and maternal exposure before mating and during pregnancy.",
    "measures": "Retinal structure and functional activity were compared over development.",
    "context": "The model and exposure timing are specific to inherited rodent retinal disease. The findings do not establish treatment of human vision loss."
  },
  "PMID 19110597": {
    "design": "Male rats were followed to natural death under standard, regional natural, or permanent lighting, with Epitalon comparisons.",
    "measures": "Mean lifespan, population mortality patterns, and spontaneous tumors were assessed.",
    "context": "Mean lifespan was largely unchanged, despite changes in some mortality-pattern and tumor measures. A change in a population aging parameter is not equivalent to increased average lifespan."
  },
  "PMID 12209581": {
    "design": "Female HER-2/neu transgenic mice were compared after Epitalon, Vilon, or saline exposure.",
    "measures": "Mammary tumor number and size, lung metastases, and HER-2/neu gene expression were measured.",
    "context": "Different peptides had different outcomes, and metastasis size changed without a reduced metastasis count. Findings from this tumor-prone strain do not establish human anticancer benefit."
  },
  "PMID 11550036": {
    "design": "Female rhesus monkeys of different ages underwent hormone measurements in an Epitalon study.",
    "measures": "Evening melatonin production and daily cortisol patterns were assessed by enzyme immunoassay.",
    "context": "This is another report on primate hormone rhythms. Publication counts do not establish independent replication or clinical sleep and longevity benefits."
  },
  "PMID 8227353": {
    "design": "Rats had subcutaneous wound chambers implanted, with GHK-Cu compared against saline and a control peptide.",
    "measures": "Chamber tissue weight, protein, collagen, DNA, elastin, glycosaminoglycans, and collagen-related gene expression were measured.",
    "context": "More extracellular matrix accumulated in these chambers. That tissue-production result does not directly measure closure of an ordinary wound or skin improvement in people."
  },
  "PMID 27517151": {
    "design": "Cultured mouse macrophages and mice exposed to bacterial lipopolysaccharide were used as inflammatory lung-injury models.",
    "measures": "Reactive oxygen species, antioxidant activity, cytokines, signaling proteins, inflammatory cells, and lung histology were assessed.",
    "context": "The models test experimentally triggered inflammation. They do not establish treatment of acute respiratory distress syndrome in patients."
  },
  "PMID 38879894": {
    "design": "A silica-induced mouse lung-disease model was combined with macrophage-cell experiments.",
    "measures": "Lung inflammation and fibrosis, oxidative stress, and interaction with the PRDX6 protein were examined.",
    "context": "The authors identified a potential target and changes in experimental silicosis. Selected toxicity observations in mice do not establish clinical safety or efficacy."
  },
  "PMID 36905132": {
    "design": "GHK levels in nine people with COPD and 11 healthy controls were compared, alongside smoke-exposure experiments using muscle cells and mice.",
    "measures": "Blood peptide associations, muscle mass and grip strength, oxidative-stress markers, and SIRT1-related signaling were assessed.",
    "context": "The human component was observational; GHK-Cu administration was tested in cells and mice. The study does not establish treatment of COPD-related muscle dysfunction in people."
  },
  "PMID 28370978": {
    "design": "GHK-Cu encapsulated in liposomes was tested in endothelial-cell cultures and a mouse scald-wound model, including comparisons with free peptide.",
    "measures": "Cell growth and cell-cycle proteins, growth-factor signals, vessel-related markers, and wound-healing time were assessed.",
    "context": "Delivery formulation affected the findings. Results with an experimental liposome cannot be assumed for free peptide or commercial skin products."
  },
  "PMID 31809714": {
    "design": "Mice with bleomycin-induced lung fibrosis were studied with GHK-Cu comparisons.",
    "measures": "Lung histology, inflammatory markers, collagen deposition, epithelial-transition markers, and several signaling pathways were assessed.",
    "context": "This chemically induced model explores inflammation and fibrosis. It does not establish reversal of idiopathic pulmonary fibrosis in patients."
  },
  "PMID 11045606": {
    "design": "Dermal fibroblast cultures were exposed to GHK-Cu, copper ions, or GHK without copper.",
    "measures": "MMP-2, an enzyme involved in matrix breakdown, its gene expression, and inhibitors TIMP-1 and TIMP-2 were measured.",
    "context": "The copper complex influenced both remodeling enzymes and their inhibitors. These are laboratory remodeling measures rather than clinical evidence of healthier skin."
  },
  "PMID 25690343": {
    "design": "Laboratory skin models, cells, and porcine models were used to test microneedle-assisted delivery of GHK-Cu.",
    "measures": "Skin microchannels, peptide and copper passage through skin, and selected irritation and safety-related responses were assessed.",
    "context": "The study addresses delivery under an experimental procedure. Greater penetration does not establish skin benefits or comprehensive safety of a finished product."
  },
  "PMID 16847171": {
    "design": "Patients undergoing circumoral CO2 laser resurfacing were randomized to post-procedure skin regimens with or without GHK-Cu; 13 completed the study.",
    "measures": "Blinded and computer-assisted redness assessments, wrinkle and skin-appearance ratings, and patient questionnaires were assessed through 12 weeks.",
    "context": "Objective redness, wrinkle, and skin-quality outcomes did not differ significantly between groups. Higher questionnaire satisfaction should be kept separate from those negative objective findings."
  },
  "PMID 25731775": {
    "design": "Seventy-two rats undergoing ACL reconstruction were randomized to saline or GHK-Cu groups, with assessments at six and 12 weeks.",
    "measures": "Knee laxity, graft stiffness and failure load, gait, and tissue scores were measured.",
    "context": "Some six-week mechanical outcomes improved, but later differences and several other outcomes were not significant. The results do not establish lasting graft benefit or human recovery."
  },
  "PMID 35936787": {
    "design": "Mice exposed to cigarette smoke for 12 weeks and cultured human lung cells were studied with GHK-Cu comparisons.",
    "measures": "Lung tissue changes, inflammatory and oxidative-stress markers, matrix-remodeling balance, and NF-κB/Nrf2 signaling were assessed.",
    "context": "Changes in a smoke-exposure model do not establish prevention or treatment of COPD in people. Human cell cultures remain preclinical evidence."
  },
  "PMID 40672369": {
    "design": "A chemically induced mouse colitis model was combined with macrophage and intestinal-cell co-cultures and gene-silencing experiments.",
    "measures": "Weight, disease-activity scores, colon damage, mucus cells, barrier proteins, inflammatory markers, and SIRT1/STAT3 signaling were assessed.",
    "context": "Multiple outcomes changed in these experimental models, with more than one possible inflammatory pathway. The paper does not establish treatment of human ulcerative colitis."
  },
  "PMID 2244543": {
    "design": "Biochemical experiments examined iron-driven lipid oxidation and ferritin iron release in the presence of GHK-Cu.",
    "measures": "Lipid peroxidation, iron release, and selected antioxidant-enzyme-like activities were measured.",
    "context": "Inhibition depended on ferritin being the iron source; broad antioxidant activities were not demonstrated. The proposed wound-related mechanism was not a clinical wound-healing test."
  }
};
