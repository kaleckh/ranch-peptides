import type { Metadata } from "next";
import Image from "next/image";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = { title: "The collection | SALT N’ PEP", description: "Explore the SALT N’ PEP research peptide collection. Compound details, research information, and vial pricing." };
export default function ProductsPage() {
  return <div className="section-wrap catalog-page"><div className="collection-intro"><div className="collection-intro-copy"><p className="eyebrow">THE COLLECTION</p><h1>Research Compounds</h1></div><div className="collection-brand-photo"><Image src="/images/salt-n-pep-reference.png" alt="SALT N’ PEP brand vial on a stone surface" fill loading="eager" sizes="(max-width: 600px) 88px, 140px" /></div></div><Catalog /><p className="catalog-disclaimer">For laboratory research only. Not for human consumption. The shared brand photograph is for presentation; refer to each compound’s listed specifications.</p></div>;
}
