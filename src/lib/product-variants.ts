import type { Product } from "./products";

export interface ProductVariant {
  id: string;
  dosage: string;
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

export function getProductVariants(product: Product): ProductVariant[] {
  const dosages = sizesBySlug[product.slug]?.map(size => `${size}mg`) ?? [product.dosage];
  return dosages.map(dosage => ({
    id: dosage,
    dosage,
    // Only the owner's existing size has approved storefront pricing.
    price: dosage === product.dosage ? product.price : null,
    bulkPricing: dosage === product.dosage ? product.bulkPricing : [],
  }));
}

export function getProductVariant(product: Product, variantId?: string): ProductVariant | undefined {
  // Omitted IDs migrate old carts/requests to their original size. An explicit
  // unknown or unpriced size must never fall back to that size's price.
  return getProductVariants(product).find(variant => variant.id === (variantId === undefined ? product.dosage : variantId));
}

export function getVariantUnitPrice(variant: ProductVariant, quantity: number): number | null {
  if (variant.price === null || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) return null;
  const tier = [...variant.bulkPricing].sort((a, b) => b.qty - a.qty).find(tier => quantity >= tier.qty);
  return tier?.price ?? variant.price;
}

export function formatDosage(dosage: string): string {
  return dosage.replace(/mg$/, " mg");
}
