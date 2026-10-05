import { checkoutRequest, type CheckoutConfig, type OrderView } from "./checkout-contract";
import { createCartItem } from "./cart-items";
import { formatDosage } from "./product-variants";

// A development-only browser simulation. It never contacts the payment API.
export const previewBuild = process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_CHECKOUT_PREVIEW === "true";
export function isCheckoutPreview() {
  return previewBuild && typeof window !== "undefined" && ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}
type SavedPreview = { order: OrderView; token: string; key: string };
const storageKey = "snp-demo-orders";
const config: CheckoutConfig = { enabled: true, methods: ["card", "venmo"], shippingCents: 500, states: ["UT", "CO", "CA", "NY", "TX", "FL"], supportEmail: "" };

export async function previewRequest<T>(path: string, init: RequestInit): Promise<T> {
  if (!isCheckoutPreview()) throw new Error("Demo checkout is available on localhost in development only.");
  const saved: SavedPreview[] = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const headers = new Headers(init.headers);
  const token = headers.get("Authorization")?.replace(/^Bearer /, "") || "";
  let result: CheckoutConfig | OrderView;
  if (path === "/config") return config as T;
  if (path === "/orders" && init.method === "POST") {
    const request = checkoutRequest.parse(JSON.parse(String(init.body)));
    const key = headers.get("Idempotency-Key") || "";
    const existing = saved.find(entry => entry.key === key && entry.token === token);
    if (existing) return existing.order as T;
    const seen = new Set<string>();
    const items = request.items.map(item => {
      const line = createCartItem(item.slug, item.quantity, item.variantId);
      if (!line || seen.has(line.id)) throw new Error("Unknown, unpriced, or duplicate demo compound and size.");
      seen.add(line.id);
      return { slug: line.product.slug, variantId: line.variant.id, quantity: line.quantity, name: `${line.product.shortName} · ${formatDosage(line.variant.dosage)}`, unitCents: Math.round(line.pricePerUnit * 100) };
    });
    const subtotalCents = items.reduce((sum, item) => sum + item.unitCents * item.quantity, 0);
    result = { id: `SNP-${crypto.randomUUID()}`, status: "awaiting_review", method: request.method, items, subtotalCents, shippingCents: config.shippingCents, totalCents: subtotalCents + config.shippingCents };
    // Demo storage deliberately excludes contact, address, and research details.
    saved.push({ order: result, token, key });
  } else {
    const match = /^\/orders\/(SNP-[a-f0-9-]{36})(?:\/demo\/(approve|reject|paid|fail))?$/.exec(path);
    const entry = saved.find(entry => entry.order.id === match?.[1] && entry.token === token);
    if (!entry) throw new Error("Demo request not found. Start a new request from your bag.");
    const action = match?.[2];
    if (action && init.method !== "POST") throw new Error("Demo action requires POST.");
    if (action === "approve" || action === "reject") {
      if (entry.order.status !== "awaiting_review") throw new Error("This request has already been reviewed.");
      entry.order.status = action === "approve" ? "approved" : "rejected";
    } else if (action === "paid" || action === "fail") {
      if (entry.order.status !== "approved") throw new Error("Approve this demo request first.");
      if (action === "fail") throw new Error("Demo payment declined. No charge was made. Try again or contact support.");
      entry.order.status = "paid";
    }
    result = entry.order;
  }
  localStorage.setItem(storageKey, JSON.stringify(saved));
  return result as T;
}
