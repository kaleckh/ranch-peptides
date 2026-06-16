import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/lib/products";
import { images } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Henry's Peptides",
  description: "Browse our full catalog of research-grade peptides. Third-party tested, 99%+ purity.",
};

const categoryColors: Record<string, string> = {
  "Recovery & Repair": "bg-emerald-950/70 text-emerald-300 border border-emerald-500/20",
  "Metabolic Research": "bg-sky-950/60 text-sky-200 border border-sky-400/20",
  "Melanocortin Research": "bg-amber-950/60 text-amber-300 border border-amber-500/20",
  "Mitochondrial Research": "bg-cyan-950/60 text-cyan-200 border border-cyan-400/20",
  "Cognitive Research": "bg-violet-950/50 text-violet-200 border border-violet-400/20",
  "Longevity Research": "bg-stone-900 text-stone-200 border border-primary/25",
  "Copper Peptide Research": "bg-orange-950/50 text-orange-200 border border-orange-400/20",
};

export default function ProductsPage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight">All Products</h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted max-w-2xl">
            Research-grade peptides with third-party verified purity. Each product includes
            a Certificate of Analysis. Bulk pricing available on 3+ vials.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group product-card rounded-xl p-4 sm:p-5 transition-all duration-300"
            >
              <div className="relative w-full h-40 sm:h-44 rounded-lg overflow-hidden mb-3 sm:mb-4 border border-white/10">
                <Image
                  src={images.products[product.slug] || images.lab}
                  alt={product.name}
                  fill
                  className="object-cover grayscale saturate-50 brightness-75 contrast-125 group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur border border-primary/25 rounded-sm px-2 py-1">
                  <p className="text-xs font-black text-primary">{product.dosage}</p>
                </div>
              </div>

              <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-sm ${categoryColors[product.category] || "bg-zinc-900 text-zinc-300"}`}>
                {product.category}
              </span>

              <h2 className="mt-2 sm:mt-3 text-lg font-black group-hover:text-primary transition-colors">
                {product.shortName}
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1">{product.tagline}</p>

              <div className="mt-3 sm:mt-4 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black">{formatPrice(product.price)}</span>
                <span className="text-[10px] sm:text-xs text-muted">per vial</span>
              </div>

              <div className="mt-2 sm:mt-3 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-[10px] sm:text-xs text-emerald-300 font-bold">In Stock &middot; {product.purity} Pure</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Research disclaimer */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-amber-950/30 border border-amber-500/25 rounded-xl">
          <p className="text-xs sm:text-sm text-amber-200">
            <strong>Research Use Only:</strong> All products sold by Henry&apos;s Peptides are intended for
            laboratory and research purposes only. They are not for human consumption and are not
            intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}
