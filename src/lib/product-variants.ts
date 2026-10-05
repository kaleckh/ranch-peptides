import type { Product } from "./products";

export interface ProductVariant {
  id: string;
  dosage: string;
  inStock: boolean;
  price: number | null;
  bulkPricing: Product["bulkPricing"];
}

// Peptaura catalog size filters, checked October 4, 2026.
// These are size options, not a claim about supplier inventory or batch coverage.
// Source links and pricing instructions are recorded in docs/PRODUCT_SIZES.md.
const sizesBySlug: Record<string, readonly number[]> = {
  "bpc-157": [2, 5, 10, 20],
  retatrutide: [5, 10, 15, 20, 30, 40, 50, 60, 100, 120],
  "tb-500": [2, 5, 10, 20],
  "mt-2": [10],
  "mots-c": [10, 15, 20, 30, 40],
  pinealon: [5, 10, 20],
  epitalon: [10, 50],
  "ghk-cu": [50, 100],
};

// Test-run stock: owner-selected sizes for these compounds, otherwise the
// original catalog size. Supplier size listings do not establish owner stock.
const availableSizeBySlug: Record<string, string> = {
  "bpc-157": "10mg",
  retatrutide: "30mg",
  "tb-500": "10mg",
  "mots-c": "20mg",
};

export function getProductVariants(product: Product): ProductVariant[] {
  const dosages = sizesBySlug[product.slug]?.map(size => `${size}mg`) ?? [product.dosage];
  return dosages.map(dosage => ({
    id: dosage,
    dosage,
    inStock: dosage === (availableSizeBySlug[product.slug] ?? product.dosage),
    // Only the owner's existing size has approved storefront pricing.
    price: dosage === product.dosage ? product.price : null,
    bulkPricing: dosage === product.dosage ? product.bulkPricing : [],
  }));
}

export function getAvailableProductVariants(product: Product): ProductVariant[] {
  return getProductVariants(product).filter(variant => variant.inStock);
}

export function getDefaultProductVariant(product: Product): ProductVariant {
  const variants = getProductVariants(product);
  return variants.find(variant => variant.inStock && variant.id === product.dosage)
    ?? variants.find(variant => variant.inStock)
    ?? variants[0];
}

export function getProductVariant(product: Product, variantId?: string): ProductVariant | undefined {
  // Omitted IDs retain the original size, even if it is now sold out. Never
  // silently replace a saved cart/request with a different vial size.
  return getProductVariants(product).find(variant => variant.id === (variantId === undefined ? product.dosage : variantId));
}

export function getVariantUnitPrice(variant: ProductVariant, quantity: number): number | null {
  if (!variant.inStock || variant.price === null || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
  const tier = [...variant.bulkPricing].sort((a, b) => b.qty - a.qty).find(tier => quantity >= tier.qty);
  return tier?.price ?? variant.price;
}

export function formatDosage(dosage: string): string {
  return dosage.replace(/mg$/, " mg");
}
