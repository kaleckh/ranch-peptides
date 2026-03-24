import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/lib/products";
import { images } from "@/lib/images";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Ranch Peptides",
  description: "Browse our full catalog of research-grade peptides. Third-party tested, 99%+ purity.",
};

const categoryColors: Record<string, string> = {
  "Recovery & Repair": "bg-emerald-50 text-emerald-700",
  "Metabolic Research": "bg-blue-50 text-blue-700",
  "Melanocortin Research": "bg-amber-50 text-amber-700",
};

export default function ProductsPage() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">All Products</h1>
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
              className="group bg-white rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3 sm:mb-4">
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

              <h2 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold group-hover:text-primary transition-colors">
                {product.shortName}
              </h2>
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

        {/* Research disclaimer */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs sm:text-sm text-amber-800">
            <strong>Research Use Only:</strong> All products sold by Ranch Peptides are intended for
            laboratory and research purposes only. They are not for human consumption and are not
            intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </div>
  );
}
