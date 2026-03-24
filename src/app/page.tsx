import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/lib/products";
import { images } from "@/lib/images";

const trustBadges = [
  { icon: "shield", label: "Third-Party Tested", detail: "Every batch verified" },
  { icon: "beaker", label: "99%+ Purity", detail: "HPLC & MS verified" },
  { icon: "truck", label: "Fast Shipping", detail: "Ships within 24 hours" },
  { icon: "lock", label: "Secure Checkout", detail: "256-bit encryption" },
];

function TrustIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "shield":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      );
    case "beaker":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.13A18.105 18.105 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.557l-.772-.13A2.25 2.25 0 0 1 4.198 15.7l.4-.399" />
        </svg>
      );
    case "truck":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125v-3.659a1.875 1.875 0 0 1 .826-1.555l3.32-2.213a1.875 1.875 0 0 1 2.416.326L16.5 14.25m4.5 4.5V8.625c0-.621-.504-1.125-1.125-1.125H14.25M16.5 14.25V6.375c0-.621-.504-1.125-1.125-1.125H2.25" />
        </svg>
      );
    case "lock":
      return (
        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      );
    default:
      return null;
  }
}

const categoryColors: Record<string, string> = {
  "Recovery & Repair": "bg-emerald-50 text-emerald-700",
  "Metabolic Research": "bg-blue-50 text-blue-700",
  "Melanocortin Research": "bg-amber-50 text-amber-700",
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Laboratory research"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Third-Party Verified &middot; 99%+ Purity
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Research-Grade Peptides,{" "}
              <span className="text-primary">Rigorously Tested</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              Every batch independently verified via HPLC and mass spectrometry.
              Certificate of Analysis included with every order. For laboratory
              and research use only.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm sm:text-base"
              >
                Browse Products
              </Link>
              <Link
                href="/science"
                className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-zinc-50 transition-colors text-sm sm:text-base"
              >
                View Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 sm:gap-3">
                <div className="text-primary flex-shrink-0">
                  <TrustIcon icon={badge.icon} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold leading-tight">{badge.label}</p>
                  <p className="text-[10px] sm:text-xs text-muted">{badge.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Products</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-xl mx-auto">
              Four premium research peptides, each with full Certificate of Analysis and published literature references.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group bg-white rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                {/* Product image */}
                <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={images.products[product.slug] || images.lab}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-md px-2 py-1">
                    <p className="text-xs font-bold text-primary">{product.dosage}</p>
                  </div>
                </div>

                <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${categoryColors[product.category] || "bg-zinc-100 text-zinc-700"}`}>
                  {product.category}
                </span>

                <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold group-hover:text-primary transition-colors">
                  {product.shortName}
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-1">{product.tagline}</p>

                <div className="mt-3 sm:mt-4 flex items-baseline justify-between">
                  <span className="text-lg sm:text-xl font-bold">{formatPrice(product.price)}</span>
                  <span className="text-[10px] sm:text-xs text-muted">per vial</span>
                </div>

                <div className="mt-2 sm:mt-3 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] sm:text-xs text-emerald-700 font-medium">In Stock &middot; {product.purity} Pure</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Science Teaser */}
      <section className="py-12 sm:py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Peptides Are Not Steroids</h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted leading-relaxed">
                Peptides are short chains of amino acids that act as signaling molecules.
                They support your body&apos;s existing biological pathways without introducing
                exogenous hormones. Steroids, by contrast, are synthetic derivatives of
                testosterone that directly override the endocrine system.
              </p>
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {[
                  "No androgenic or estrogenic activity",
                  "Do not suppress natural hormone production",
                  "Work through natural signaling pathways",
                  "Backed by peer-reviewed clinical research",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <span className="mt-0.5 sm:mt-1 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/science"
                className="inline-flex items-center gap-2 mt-4 sm:mt-6 text-primary font-semibold text-sm hover:underline"
              >
                Read the full science breakdown
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-2xl p-4 sm:p-8 overflow-x-auto">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Comparison</h3>
              <div className="min-w-[280px]">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-semibold text-muted">Property</th>
                      <th className="text-center py-2 font-semibold text-primary">Peptides</th>
                      <th className="text-center py-2 font-semibold text-red-600">Steroids</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] sm:text-xs">
                    <tr className="border-b border-border/50">
                      <td className="py-2 sm:py-2.5">Molecular type</td>
                      <td className="text-center">Amino acid chains</td>
                      <td className="text-center">Synthetic hormones</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 sm:py-2.5">Hormonal impact</td>
                      <td className="text-center text-emerald-600 font-medium">None</td>
                      <td className="text-center text-red-600 font-medium">Direct override</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 sm:py-2.5">Mechanism</td>
                      <td className="text-center">Signaling</td>
                      <td className="text-center">Hormonal</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 sm:py-2.5">Endocrine suppression</td>
                      <td className="text-center text-emerald-600 font-medium">No</td>
                      <td className="text-center text-red-600 font-medium">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-2.5">Naturally occurring</td>
                      <td className="text-center text-emerald-600 font-medium">Yes</td>
                      <td className="text-center text-red-600 font-medium">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab image banner */}
      <section className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
        <Image
          src={images.research}
          alt="Research laboratory"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Every Batch. Every Time.</h2>
            <p className="mt-2 text-sm sm:text-base text-white/80 max-w-lg mx-auto">
              Independent HPLC and mass spectrometry verification. Certificate of Analysis included with every order.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Order?</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-lg mx-auto">
            All products ship with a Certificate of Analysis. Bulk discounts available on orders of 3+ vials.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-8 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-base sm:text-lg"
          >
            Shop All Peptides
          </Link>
        </div>
      </section>
    </div>
  );
}
