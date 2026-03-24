import { notFound } from "next/navigation";
import Image from "next/image";
import { products, getProduct, formatPrice } from "@/lib/products";
import { images } from "@/lib/images";
import type { Metadata } from "next";
import { AddToCartButton } from "./add-to-cart";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.shortName} | Ranch Peptides`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-muted mb-6 sm:mb-8">
          <a href="/products" className="hover:text-foreground">Products</a>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.shortName}</span>
        </nav>

        {/* Product hero */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[350px] lg:min-h-[400px]">
            <Image
              src={images.products[product.slug] || images.lab}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2">
              <p className="text-lg font-bold text-primary">{product.dosage}</p>
              <p className="text-xs text-muted">{product.format}</p>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5">
              <p className="text-[10px] text-muted">CAS</p>
              <p className="text-xs font-mono font-medium">{product.casNumber}</p>
            </div>
          </div>

          {/* Product info */}
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">{product.name}</h1>
            <p className="text-muted mt-1 text-sm sm:text-base">{product.tagline}</p>

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs sm:text-sm text-emerald-700 font-medium">In Stock</span>
              <span className="text-xs sm:text-sm text-muted">&middot;</span>
              <span className="text-xs sm:text-sm font-medium">{product.purity} Purity (HPLC)</span>
            </div>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted leading-relaxed">{product.description}</p>

            {/* Pricing */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-zinc-50 rounded-xl">
              <h3 className="text-sm font-semibold mb-2 sm:mb-3">Bulk Pricing</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.bulkPricing.map((tier) => (
                  <div
                    key={tier.qty}
                    className="text-center p-2 rounded-lg border border-border bg-white"
                  >
                    <p className="text-[10px] sm:text-xs text-muted">{tier.qty} {tier.qty === 1 ? "vial" : "vials"}</p>
                    <p className="text-base sm:text-lg font-bold">{formatPrice(tier.price)}</p>
                    <p className="text-[10px] text-muted">each</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Quick specs */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div className="p-2.5 sm:p-3 bg-zinc-50 rounded-lg">
                <p className="text-muted text-[10px] sm:text-xs">Molecular Formula</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5 break-all">{product.molecularFormula}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-zinc-50 rounded-lg">
                <p className="text-muted text-[10px] sm:text-xs">Molecular Weight</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5">{product.molecularWeight}</p>
              </div>
            </div>
            {product.sequence && (
              <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 bg-zinc-50 rounded-lg">
                <p className="text-muted text-[10px] sm:text-xs">Sequence</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5 break-all">{product.sequence}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Research areas */}
          <div className="bg-white rounded-2xl border border-border p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Research Areas</h2>
            <ul className="space-y-2">
              {product.researchAreas.map((area) => (
                <li key={area} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mechanism */}
          <div className="bg-white rounded-2xl border border-border p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Mechanism of Action</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">{product.mechanism}</p>
          </div>

          {/* Storage */}
          <div className="bg-white rounded-2xl border border-border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Storage & Handling</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold">Storage</h3>
                <p className="text-xs sm:text-sm text-muted mt-1">{product.storage}</p>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold">Reconstitution</h3>
                <p className="text-xs sm:text-sm text-muted mt-1">{product.reconstitution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Published research */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Published Research</h2>
          <div className="space-y-3 sm:space-y-4">
            {product.keyStudies.map((study, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4 sm:p-6">
                <h3 className="font-semibold text-sm sm:text-base leading-snug">{study.title}</h3>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  {study.authors} &middot; <em>{study.journal}</em> ({study.year})
                  {study.doi && (
                    <span className="block sm:inline sm:ml-2 text-[10px] sm:text-xs font-mono text-primary mt-1 sm:mt-0">DOI: {study.doi}</span>
                  )}
                </p>
                <p className="text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">{study.finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Not steroids */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-blue-900 text-sm sm:text-base">This Is Not a Steroid</h3>
          <p className="text-xs sm:text-sm text-blue-800 mt-2 leading-relaxed">{product.notSteroids}</p>
        </div>

        {/* Research disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs sm:text-sm text-amber-800">
            <strong>Research Use Only:</strong> This product is sold for laboratory and research purposes only.
            It is not intended for human consumption and is not intended to diagnose, treat, cure, or prevent any disease.
            By purchasing, you agree to use this product solely for legitimate research purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
