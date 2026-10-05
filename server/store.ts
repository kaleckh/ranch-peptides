import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { getProduct } from "../src/lib/products";
import { formatDosage, getProductVariant, getVariantUnitPrice } from "../src/lib/product-variants";
import { checkoutRequest, type CheckoutRequest, type OrderView } from "../src/lib/checkout-contract";

export type StoredOrder = OrderView & { customer: CheckoutRequest["customer"]; sessionId?: string; createdAt: string };
export const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export function priceOrder(input: unknown, shippingCents: number, states: string[]) {
  const request = checkoutRequest.parse(input);
  if (!states.includes(request.customer.state)) throw new Error("Shipping is unavailable for this state.");
  const seen = new Set<string>();
  const items = request.items.map(({ slug, variantId, quantity }) => {
    const product = getProduct(slug);
    const variant = product && getProductVariant(product, variantId);
    if (!product || !variant) throw new Error("Invalid compound or size.");
    const id = `${slug}:${variant.id}`;
    if (seen.has(id)) throw new Error("Duplicate compound and size.");
    seen.add(id);
    const price = getVariantUnitPrice(variant, quantity);
    if (price === null) throw new Error("Pricing is pending for this size. Choose a priced size to order.");
    return { slug, variantId: variant.id, name: `${product.shortName} · ${formatDosage(variant.dosage)}`, quantity, unitCents: Math.round(price * 100) };
  });
  const subtotalCents = items.reduce((sum, item) => sum + item.unitCents * item.quantity, 0);
  return { request, items, subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents };
}

export function openStore(path: string) {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, token_hash TEXT NOT NULL, request_key TEXT UNIQUE NOT NULL, request_hash TEXT NOT NULL, data TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY, order_id TEXT NOT NULL, action TEXT NOT NULL, evidence TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS venmo_payments (transaction_id TEXT PRIMARY KEY, order_id TEXT UNIQUE NOT NULL);`);
  function get(id: string) {
    const row = db.prepare("SELECT data FROM orders WHERE id=?").get(id) as { data: string } | undefined;
    return row ? JSON.parse(row.data) as StoredOrder : undefined;
  }
  function save(order: StoredOrder) { db.prepare("UPDATE orders SET data=? WHERE id=?").run(JSON.stringify(order), order.id); }
  function audit(id: string, action: string, evidence: string) {
    db.prepare("INSERT INTO audit(order_id,action,evidence,created_at) VALUES(?,?,?,?)").run(id, action, evidence, new Date().toISOString());
  }
  function transaction<T>(work: () => T): T {
    db.exec("BEGIN IMMEDIATE");
    try { const result = work(); db.exec("COMMIT"); return result; }
    catch (error) { db.exec("ROLLBACK"); throw error; }
  }
  return {
    db, get,
    recoverAccess(id: string, evidence: string) {
      return transaction(() => {
        if (!get(id) || evidence.trim().length < 10) throw new Error("Order and verified ownership evidence are required.");
        const token = newToken();
        db.prepare("UPDATE orders SET token_hash=? WHERE id=?").run(hash(token), id);
        audit(id, "access_recovered", evidence);
        return { id, token };
      });
    },
    attachSession(id: string, sessionId: string) {
      return transaction(() => {
        const order = get(id);
        if (!order || order.method !== "card" || !["approved", "paid"].includes(order.status) || (order.sessionId && order.sessionId !== sessionId)) throw new Error("Payment session does not match order.");
        order.sessionId = sessionId; save(order); return order;
      });
    },
    create(input: unknown, shipping: number, states: string[], requestKey: string, token: string) {
      return transaction(() => {
      const priced = priceOrder(input, shipping, states);
      const requestHash = hash(JSON.stringify(priced.request));
      const existing = db.prepare("SELECT id,request_hash,token_hash FROM orders WHERE request_key=?").get(requestKey) as { id: string; request_hash: string; token_hash: string } | undefined;
      if (existing) {
        if (existing.request_hash !== requestHash || existing.token_hash !== hash(token)) throw new Error("Checkout request was already used. Start a new request.");
        return get(existing.id)!;
      }
      const order: StoredOrder = { id: `SNP-${randomUUID()}`, status: "awaiting_review", method: priced.request.method, customer: priced.request.customer, items: priced.items, subtotalCents: priced.subtotalCents, shippingCents: priced.shippingCents, totalCents: priced.totalCents, createdAt: new Date().toISOString() };
      db.prepare("INSERT INTO orders VALUES(?,?,?,?,?)").run(order.id, hash(token), requestKey, requestHash, JSON.stringify(order));
      audit(order.id, "created", "research eligibility review required");
      return order;
      });
    },
    authenticate(id: string, token: string) {
      const row = db.prepare("SELECT token_hash FROM orders WHERE id=?").get(id) as { token_hash: string } | undefined;
      return row?.token_hash === hash(token) ? get(id) : undefined;
    },
    review(id: string, approved: boolean, evidence: string) {
      return transaction(() => {
      const order = get(id);
      if (!order || order.status !== "awaiting_review" || evidence.trim().length < 10) throw new Error("Only pending orders can be reviewed; verification evidence is required.");
      order.status = approved ? "approved" : "rejected";
      save(order); audit(id, order.status, evidence);
      return order;
      });
    },
    markPaid(id: string, method: "card" | "venmo", amount: number, evidence: string, sessionId?: string) {
      return transaction(() => {
      const order = get(id);
      if (!order || order.method !== method || order.totalCents !== amount || (method === "card" && order.sessionId !== sessionId)) throw new Error("Payment does not match the order.");
      if (order.status === "paid") return order;
      if (order.status !== "approved" || evidence.trim().length < 10) throw new Error("Order must be approved and payment evidence supplied.");
      if (method === "venmo") {
        if (!/^[A-Za-z0-9_-]{10,100}$/.test(evidence)) throw new Error("Supply the exact unique Venmo transaction ID (10-100 letters, digits, underscores or hyphens).");
        if (db.prepare("SELECT order_id FROM venmo_payments WHERE transaction_id=?").get(evidence)) throw new Error("This Venmo transaction has already confirmed another order.");
        db.prepare("INSERT INTO venmo_payments VALUES(?,?)").run(evidence, id);
      }
      order.status = "paid";
      save(order); audit(id, "paid", evidence);
      return order;
      });
    },
    listPending() { return db.prepare("SELECT id,data FROM orders").all().map(row => JSON.parse(String(row.data)) as StoredOrder).filter(o => o.status !== "paid"); },
    close() { db.close(); },
  };
}
export const newToken = () => randomBytes(32).toString("hex");
