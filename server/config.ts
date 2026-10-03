export function loadConfig(env: Record<string, string | undefined> = process.env) {
  const enabled = env.CHECKOUT_ENABLED === "true";
  const origin = env.STOREFRONT_ORIGIN || "http://localhost:3015";
  const key = env.STRIPE_SECRET_KEY || "";
  const live = key.startsWith("sk_live_") || key.startsWith("rk_live_");
  const venmoHandle = env.VENMO_BUSINESS_HANDLE || "";
  const states = (env.SHIPPING_STATES || "").split(",").map(s => s.trim()).filter(Boolean);
  const shippingCents = Number(env.SHIPPING_CENTS);
  const validStates = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" ");
  if (enabled && (!Number.isSafeInteger(shippingCents) || shippingCents < 0 || shippingCents > 100000 || !states.length || states.some(s => !validStates.includes(s)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.SUPPORT_EMAIL || ""))) throw new Error("Set SHIPPING_CENTS, SHIPPING_STATES, and SUPPORT_EMAIL before enabling checkout.");
  if (enabled && env.TAX_POLICY_APPROVED !== "true") throw new Error("Confirm the no-added-tax pricing policy with TAX_POLICY_APPROVED=true before enabling checkout.");
  if (live && env.LIVE_PAYMENTS_APPROVED !== "true") throw new Error("Live Stripe requires LIVE_PAYMENTS_APPROVED=true after merchant approval.");
  if (venmoHandle && (!/^[A-Za-z0-9_-]{3,50}$/.test(venmoHandle) || env.VENMO_BUSINESS_APPROVED !== "true")) throw new Error("Configure an authorized Venmo business handle and VENMO_BUSINESS_APPROVED=true.");
  const parsed = new URL(origin);
  if (parsed.origin !== origin || (parsed.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(parsed.hostname))) throw new Error("STOREFRONT_ORIGIN must be an exact HTTPS origin (HTTP allowed locally).");
  if (enabled && key && !env.STRIPE_WEBHOOK_SECRET) throw new Error("Stripe webhook secret is required.");
  return { enabled, origin, key, live, venmoHandle, states, shippingCents: Number.isSafeInteger(shippingCents) ? shippingCents : 0, supportEmail: env.SUPPORT_EMAIL || "", webhookSecret: env.STRIPE_WEBHOOK_SECRET || "", dbPath: env.ORDERS_DB_PATH || "./data/orders.sqlite", port: Number(env.PORT || 4010), trustProxy: env.TRUST_PROXY === "true" };
}
