import { notFound } from "next/navigation";
import { ProductVial } from "@/components/product-vial";
import { ProductReviews } from "@/components/product-reviews";
import { ProductTesting } from "@/components/product-testing";
import Link from "next/link";
import { products, getProduct, formatPrice } from "@/lib/products";
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
    title: `${product.shortName} | SALT N’ PEP`,
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
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{product.shortName}</span>
        </nav>

        <ProductTesting slug={product.slug} name={product.shortName} dosage={product.dosage} />

        {/* Product hero */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="product-detail-visual"><ProductVial product={product} featured /><p className="visual-caption">SALT N’ PEP / BRAND VIAL PHOTO</p></div>

          {/* Product info */}
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-[0.18em]">{product.category}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight mt-2 leading-none">{product.name}</h1>
            <p className="text-muted mt-1 text-sm sm:text-base">{product.tagline}</p>
            <p className="mt-3 text-sm font-semibold">{product.dosage} / {product.format}</p>
            <p className="text-muted mt-2 text-xs leading-relaxed">Brand vial shown. Refer to the product details for compound and quantity.</p>

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs sm:text-sm text-muted font-bold">In Stock</span>
              <span className="text-xs sm:text-sm text-muted">&middot;</span>
              <a href="#batch-report" className="text-xs sm:text-sm font-bold underline underline-offset-4">Lumira / View example lab report</a>
            </div>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted leading-relaxed">{product.description}</p>

            {/* Pricing */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 metal-panel rounded-sm">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] mb-2 sm:mb-3">Bulk Pricing</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.bulkPricing.map((tier) => (
                  <div
                    key={tier.qty}
                    className="text-center p-2 rounded-sm border border-border bg-background"
                  >
                    <p className="text-[10px] sm:text-xs text-muted">{tier.qty} {tier.qty === 1 ? "vial" : "vials"}</p>
                    <p className="text-base sm:text-lg font-black">{formatPrice(tier.price)}</p>
                    <p className="text-[10px] text-muted">each</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <AddToCartButton product={product} />

            {/* Quick specs */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
              <div className="p-2.5 sm:p-3 dark-panel rounded-sm">
                <p className="text-muted text-[10px] sm:text-xs">Molecular Formula</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5 break-all">{product.molecularFormula}</p>
              </div>
              <div className="p-2.5 sm:p-3 dark-panel rounded-sm">
                <p className="text-muted text-[10px] sm:text-xs">Molecular Weight</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5">{product.molecularWeight}</p>
              </div>
            </div>
            {product.sequence && (
              <div className="mt-2 sm:mt-3 p-2.5 sm:p-3 dark-panel rounded-sm">
                <p className="text-muted text-[10px] sm:text-xs">Sequence</p>
                <p className="font-mono font-medium text-[10px] sm:text-xs mt-0.5 break-all">{product.sequence}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Research areas */}
          <div className="dark-panel rounded-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-[0.08em] mb-3 sm:mb-4">Research Areas</h2>
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
          <div className="dark-panel rounded-sm p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-[0.08em] mb-3 sm:mb-4">Mechanism of Action</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">{product.mechanism}</p>
          </div>

          {/* Storage */}
          <div className="dark-panel rounded-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-[0.08em] mb-3 sm:mb-4">Storage & Handling</h2>
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

        <ProductReviews slug={product.slug} name={product.shortName} />

        {/* Research disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-card border border-border rounded-sm">
          <p className="text-xs sm:text-sm text-muted">
            <strong>Research Use Only:</strong> This product is sold for laboratory and research purposes only.
            It is not intended for human consumption and is not intended to diagnose, treat, cure, or prevent any disease.
            By purchasing, you agree to use this product solely for legitimate research purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
