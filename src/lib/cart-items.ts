import { getProduct, type Product } from "./products";
import { getProductVariant, getVariantUnitPrice, type ProductVariant } from "./product-variants";

export const MAX_CART_LINES = 40;

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  pricePerUnit: number;
}

export function createCartItem(slug: string, quantity: number, variantId?: string): CartItem | undefined {
  const product = getProduct(slug);
  const variant = product && getProductVariant(product, variantId);
  const pricePerUnit = variant && getVariantUnitPrice(variant, quantity);
  if (!product || !variant || pricePerUnit === null || pricePerUnit === undefined) return undefined;
  return { id: `${product.slug}:${variant.id}`, product, variant, quantity, pricePerUnit };
}

export function restoreCartItems(stored: unknown): CartItem[] {
  if (!Array.isArray(stored)) return [];
  const restored: CartItem[] = [];
  const seen = new Set<string>();
  for (const value of stored.slice(0, MAX_CART_LINES)) {
    if (!value || typeof value !== "object" || typeof value.slug !== "string" || typeof value.quantity !== "number") continue;
    if (value.variantId !== undefined && typeof value.variantId !== "string") continue;
    const item = createCartItem(value.slug, value.quantity, value.variantId);
    if (!item || seen.has(item.id)) continue;
    restored.push(item);
    seen.add(item.id);
  }
  return restored;
}
