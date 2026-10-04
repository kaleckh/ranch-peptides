import type { Metadata } from "next";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = { title: "The collection | SALT N’ PEP", description: "Explore the SALT N’ PEP research peptide collection. Compound details, research information, and vial pricing." };
export default function ProductsPage() {
  return <div className="section-wrap catalog-page"><h1>Research Compounds</h1><Catalog /><p className="catalog-disclaimer">For laboratory research only. Not for human consumption. Product photographs are for presentation; refer to each compound’s listed specifications.</p></div>;
}
