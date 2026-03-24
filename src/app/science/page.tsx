import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { images } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Science & Research | Ranch Peptides",
  description: "Learn the science behind peptides, how they differ from steroids, and explore published clinical research.",
};

export default function SciencePage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Science & Research</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted lg:text-lg leading-relaxed max-w-3xl">
          We believe transparency and education are essential. Below you&apos;ll find a clear
          explanation of what peptides are, how they work, how they differ from steroids, and
          the published clinical research behind each of our products.
        </p>

        {/* Lab image */}
        <div className="relative mt-8 sm:mt-10 rounded-2xl overflow-hidden h-48 sm:h-64">
          <Image src={images.microscope} alt="Microscope in research lab" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center">
            <p className="text-white font-bold text-lg sm:text-xl lg:text-2xl px-6 sm:px-10 max-w-md">
              Rigorous science. Published data. Full transparency.
            </p>
          </div>
        </div>

        {/* What are peptides */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold">What Are Peptides?</h2>
          <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Peptides are short chains of amino acids linked by peptide bonds. While proteins
              typically contain 50+ amino acids, peptides are smaller &mdash; usually between
              2 and 50 amino acids in length. This compact size allows them to act as highly
              specific signaling molecules in biological systems.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              In the human body, peptides serve as hormones, neurotransmitters, and growth factors.
              They regulate processes including tissue repair, immune response, metabolism, and
              cell-to-cell communication. Synthetic peptides used in research are designed to mimic
              or enhance these natural signaling functions.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Importantly, peptides work <em>with</em> the body&apos;s existing systems. They activate
              receptors that are already present in cells, triggering natural downstream cascades.
              They do not introduce foreign hormonal activity or override the endocrine system.
            </p>
          </div>
        </section>

        {/* Peptides vs Steroids */}
        <section className="mt-12 sm:mt-16" id="peptides-vs-steroids">
          <h2 className="text-xl sm:text-2xl font-bold">Peptides vs. Steroids: A Clear Distinction</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted leading-relaxed">
            One of the most common misconceptions is that peptides and anabolic steroids are the same thing.
            They are fundamentally different in every way &mdash; structure, mechanism, effects, and safety profile.
          </p>

          <div className="mt-6 sm:mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs sm:text-sm min-w-[500px]">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 font-semibold">Property</th>
                  <th className="text-center py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-primary">Peptides</th>
                  <th className="text-center py-2.5 sm:py-3 px-3 sm:px-4 font-semibold text-red-600">Anabolic Steroids</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Chemical structure", "Short amino acid chains (2-50 aa)", "Synthetic derivatives of testosterone"],
                  ["Molecular type", "Signaling molecules", "Exogenous hormones"],
                  ["Primary mechanism", "Activate specific receptors to trigger natural cascades", "Directly bind androgen receptors, override endocrine system"],
                  ["Hormonal impact", "None \u2014 no androgenic/estrogenic activity", "Direct testosterone/DHT mimicry"],
                  ["Endocrine suppression", "No suppression of HPT axis", "Suppresses hypothalamic-pituitary-testicular axis"],
                  ["Receptor specificity", "Highly specific (e.g., GLP-1R, MC1R)", "Broad androgen receptor activation"],
                  ["Side effect profile", "Generally mild in research literature", "Liver toxicity, cardiovascular risk, hormonal disruption"],
                  ["Post-cycle recovery", "Not applicable", "Requires post-cycle therapy (PCT)"],
                  ["Legal status (US)", "Legal for research purposes", "Schedule III controlled substances"],
                  ["Naturally occurring", "Many identical to endogenous peptides", "Synthetic; not found in nature"],
                ].map(([prop, peptide, steroid], i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 font-medium">{prop}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center text-emerald-700">{peptide}</td>
                    <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-center text-red-700">{steroid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
              <strong>The key difference:</strong> Peptides are signaling molecules. They tell your body&apos;s
              cells to do something they can already do &mdash; heal faster, produce more of a protein, activate
              a receptor. Steroids are synthetic hormones that directly flood the body with androgens, overriding
              the natural endocrine system.
            </p>
          </div>
        </section>

        {/* Product-specific research */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold">Clinical Research by Product</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted">
            Published, peer-reviewed studies for each peptide in our catalog.
          </p>

          {products.map((product) => (
            <div key={product.slug} className="mt-8 sm:mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold">{product.shortName}</h3>
                <span className="text-xs sm:text-sm text-muted">&mdash; {product.tagline}</span>
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">{product.mechanism}</p>

              <div className="space-y-2 sm:space-y-3">
                {product.keyStudies.map((study, i) => (
                  <div key={i} className="p-3 sm:p-4 bg-white rounded-xl border border-border">
                    <h4 className="font-semibold text-xs sm:text-sm leading-snug">{study.title}</h4>
                    <p className="text-[10px] sm:text-xs text-muted mt-1">
                      {study.authors} &middot; <em>{study.journal}</em> ({study.year})
                      {study.doi && (
                        <span className="block sm:inline sm:ml-2 font-mono text-primary mt-0.5 sm:mt-0">DOI: {study.doi}</span>
                      )}
                    </p>
                    <p className="text-xs sm:text-sm mt-2 leading-relaxed">{study.finding}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-1 mt-2 sm:mt-3 text-xs sm:text-sm text-primary font-medium hover:underline"
              >
                View {product.shortName} product page
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </section>

        {/* How we test */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold">Our Testing Process</h2>
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-border">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                <span className="font-bold text-sm sm:text-base">1</span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base">HPLC Analysis</h3>
              <p className="text-xs sm:text-sm text-muted mt-1 sm:mt-2">
                High-Performance Liquid Chromatography confirms purity percentage (we require 98%+ minimum).
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-border">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                <span className="font-bold text-sm sm:text-base">2</span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base">Mass Spectrometry</h3>
              <p className="text-xs sm:text-sm text-muted mt-1 sm:mt-2">
                MS analysis verifies molecular identity and confirms the correct molecular weight for each peptide.
              </p>
            </div>
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-border">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                <span className="font-bold text-sm sm:text-base">3</span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base">COA Publication</h3>
              <p className="text-xs sm:text-sm text-muted mt-1 sm:mt-2">
                Every batch gets a Certificate of Analysis with full results. COAs are included with every order.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 sm:mt-16 p-4 sm:p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            <strong>Research Use Only:</strong> All information on this page is provided for educational purposes
            and relates to published scientific research. It is not medical advice. Products sold by Ranch Peptides
            are intended for laboratory and research purposes only and are not for human consumption.
          </p>
        </div>
      </div>
    </div>
  );
}
