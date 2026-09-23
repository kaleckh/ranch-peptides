// Reference reports only. Replace with inventory-matched records before claiming stock purity.
export interface BatchReport {
  supplier: "Lumira";
  batch: string;
  reportLot?: string;
  dosage: string;
  purity: string;
  lab: string;
  issued: string;
  pdf: string;
  note?: string;
}

const pdf = (hash: string) => `https://www.peptaura.com/coas/${hash}.pdf`;
export const batchReports: Record<string, BatchReport> = {
  "bpc-157": {
    supplier: "Lumira", batch: "PPA-WL-BC10-P00704", dosage: "10mg", purity: "99.8%",
    lab: "Pacific Coast Biologics", issued: "July 19, 2026",
    pdf: pdf("c2d11a94e819c788346535249c34c47b4f725a0b1d6594978c2d4996a4b73edb"),
  },
  retatrutide: {
    supplier: "Lumira", batch: "PPA-WL-RT5-P00701", reportLot: "PPA-WL-RT5-P000701", dosage: "5mg", purity: "99.8%",
    lab: "Pacific Coast Biologics", issued: "July 21, 2026",
    pdf: pdf("29bad9600233900d2d7931f8f197f38d35756fd6d68e71fb59ecf3bccb5242be"),
    note: "The directory and PDF use different lot numbers. Supplier confirmation is needed before matching this report to inventory.",
  },
  "tb-500": {
    supplier: "Lumira", batch: "PPA-WL-TB10-P00714", dosage: "10mg", purity: "99.6%",
    lab: "BTLabs", issued: "September 3, 2026",
    pdf: pdf("d39f0faf1307c80e5389b4a41d8eb4c5f56708c16c9d6d7d49253233fd930adf"),
  },
  "mt-2": {
    supplier: "Lumira", batch: "WL-ML10-P00518", dosage: "10mg", purity: "99.8%",
    lab: "BTLabs", issued: "June 12, 2026",
    pdf: pdf("2471b3812b40b94f05351af060cc6aa24baf6ae93b568e3be97716c9b39226d7"),
  },
  "mots-c": {
    supplier: "Lumira", batch: "PPA-WL-MS10-P00703", dosage: "10mg", purity: "99.2%",
    lab: "Pacific Coast Biologics", issued: "July 19, 2026",
    pdf: pdf("47f888c4f48c1e041b844c1dd9a6e638ec05d08fc2b745b22cc389fc0afc3c74"),
  },
  pinealon: {
    supplier: "Lumira", batch: "PPA-WL-PL10-P00702", dosage: "10mg", purity: "99.5%",
    lab: "BTLabs", issued: "September 3, 2026",
    pdf: pdf("28970caff49954c4af5031139d7e5aaa74098d0f8c64a1d607603250de664eeb"),
  },
  epitalon: {
    supplier: "Lumira", batch: "WL-ET10-P00518", dosage: "10mg", purity: "99.46%",
    lab: "Freedom Diagnostics", issued: "August 6, 2026",
    pdf: pdf("a997ef2f6ac038f867a7aca21d329ef287b9ca8ad412a442b726f9c2d4be6144"),
    note: "Two sampled vials reported 99.46% and 99.47% purity. The lower result is displayed.",
  },
  "ghk-cu": {
    supplier: "Lumira", batch: "PPA-WL-CU50-P00705", dosage: "50mg", purity: "99.8%",
    lab: "Pacific Coast Biologics", issued: "July 30, 2026",
    pdf: pdf("541e0af68fe283b710a5f38dc2dde1e496e1a753281ecbb1375f9554bb44bdc1"),
  },
};
