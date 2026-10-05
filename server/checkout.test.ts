import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import { loadConfig } from "./config";
import { newToken, openStore, priceOrder } from "./store";
import { createCheckoutServer } from "./api";
import { products } from "../src/lib/products";
import { getDefaultProductVariant, getProductVariants } from "../src/lib/product-variants";
import { createCartItem, restoreCartItems } from "../src/lib/cart-items";

const request = { items: [{ slug: "mt-2", quantity: 3 }], method: "card", customer: { name: "Research Buyer", email: "buyer@example.com", organization: "Example Laboratory", researchPurpose: "In vitro laboratory assay development", address: "123 Example St", address2: "", city: "Salt Lake City", state: "UT", zip: "84101" }, researchOnly: true };
const config = () => loadConfig({ CHECKOUT_ENABLED: "true", STOREFRONT_ORIGIN: "http://localhost:3015", SHIPPING_CENTS: "500", SHIPPING_STATES: "UT", SUPPORT_EMAIL: "orders@example.com", TAX_POLICY_APPROVED: "true", STRIPE_SECRET_KEY: "sk_test_example", STRIPE_WEBHOOK_SECRET: "whsec_example" });

test("server prices canonical catalog tiers and rejects invalid carts and states", () => {
  assert.equal(priceOrder({ ...request, totalCents: 1 }, 500, ["UT"]).totalCents, 7397);
  assert.throws(() => priceOrder({ ...request, items: [{ slug: "unknown", quantity: 1 }] }, 500, ["UT"]));
  assert.throws(() => priceOrder({ ...request, items: [...request.items, ...request.items] }, 500, ["UT"]));
  assert.throws(() => priceOrder(request, 500, ["CO"]));
  assert.throws(() => priceOrder({ ...request, items: [{ slug: "bpc-157", quantity: -1 }] }, 500, ["UT"]));
});

test("only owner-selected sizes are in stock; sold-out and pending sizes cannot be ordered", () => {
  const expected: Record<string, string[]> = {
    "bpc-157": ["2mg", "5mg", "10mg", "20mg"],
    retatrutide: ["5mg", "10mg", "15mg", "20mg", "30mg", "40mg", "50mg", "60mg", "100mg", "120mg"],
    "tb-500": ["2mg", "5mg", "10mg", "20mg"],
    "mt-2": ["10mg"], "mots-c": ["10mg", "15mg", "20mg", "30mg", "40mg"],
    pinealon: ["5mg", "10mg", "20mg"], epitalon: ["10mg", "50mg"], "ghk-cu": ["50mg", "100mg"],
  };
  const stocked: Record<string, string> = { "bpc-157": "10mg", retatrutide: "30mg", "tb-500": "10mg", "mots-c": "20mg" };
  let pendingCount = 0, soldOutCount = 0;
  for (const product of products) {
    const variants = getProductVariants(product);
    assert.deepEqual(variants.map(variant => variant.id), expected[product.slug]);
    assert.equal(getDefaultProductVariant(product).id, stocked[product.slug] ?? product.dosage);
    for (const variant of variants) {
      assert.equal(variant.inStock, !stocked[product.slug] || stocked[product.slug] === variant.id);
      if (!variant.inStock) {
        soldOutCount++;
        assert.equal(createCartItem(product.slug, 1, variant.id), undefined);
        assert.deepEqual(restoreCartItems([{ slug: product.slug, variantId: variant.id, quantity: 1, price: 0.01 }]), []);
        assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: variant.id, quantity: 1, price: product.price }] }, 500, ["UT"]), /sold out/);
      } else if (variant.price !== null) {
        assert.equal(variant.price, product.price);
        for (const tier of product.bulkPricing) {
          const priced = priceOrder({ ...request, items: [{ slug: product.slug, variantId: variant.id, quantity: tier.qty, unitCents: 1 }] }, 500, ["UT"]);
          assert.equal(priced.items[0].variantId, variant.id);
          assert.equal(priced.items[0].unitCents, Math.round(tier.price * 100));
          assert.equal(createCartItem(product.slug, tier.qty, variant.id)?.pricePerUnit, tier.price);
        }
      } else {
        pendingCount++;
        assert.equal(variant.price, null);
        assert.deepEqual(variant.bulkPricing, []);
        assert.equal(createCartItem(product.slug, 1, variant.id), undefined);
        assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: variant.id, quantity: 1, price: product.price }] }, 500, ["UT"]), /Pricing is pending/);
      }
    }
    assert.equal(createCartItem(product.slug, 1, "unknown"), undefined);
    assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: "unknown", quantity: 1 }] }, 500, ["UT"]), /Invalid compound or size/);
    for (const invalidId of [null, "", 5]) assert.throws(() => priceOrder({ ...request, items: [{ slug: product.slug, variantId: invalidId, quantity: 1 }] }, 500, ["UT"]));
  }
  assert.equal(soldOutCount, 19);
  assert.equal(pendingCount, 8);
});

test("legacy sold-out lines are removed without size substitution; available order snapshots retain size", () => {
  const restored = restoreCartItems(products.map(product => ({ slug: product.slug, quantity: 3, pricePerUnit: 0.01 })));
  assert.deepEqual(restored.map(item => item.product.slug), ["mt-2", "pinealon", "epitalon", "ghk-cu"]);
  for (const slug of ["bpc-157", "retatrutide", "tb-500", "mots-c"]) {
    assert.equal(createCartItem(slug, 3), undefined);
    assert.throws(() => priceOrder({ ...request, items: [{ slug, quantity: 3 }] }, 500, ["UT"]), /sold out/);
  }
  for (const item of restored) {
    assert.equal(item.variant.id, item.product.dosage);
    assert.equal(item.id, `${item.product.slug}:${item.product.dosage}`);
    assert.equal(item.pricePerUnit, item.product.bulkPricing.find(tier => tier.qty === 3)?.price);
  }
  assert.deepEqual(restoreCartItems([
    { slug: "mt-2", quantity: 3 }, { slug: "mt-2", variantId: "10mg", quantity: 1 },
    { slug: "bpc-157", quantity: 3 }, { slug: "bpc-157", variantId: "5mg", quantity: 1 },
    { slug: "bpc-157", variantId: "10mg", quantity: 1 },
    { slug: "bpc-157", variantId: "20mg", quantity: 1, price: 39.99 },
    { slug: "bpc-157", variantId: null, quantity: 1 }, { slug: "bpc-157", variantId: "unknown", quantity: 1 },
    { slug: "bpc-157", quantity: 101 }, { slug: "bpc-157", quantity: 1.5 }, null,
  ]).map(item => ({ id: item.id, quantity: item.quantity })), [{ id: "mt-2:10mg", quantity: 3 }]);
  const explicit = { ...request, items: [{ slug: "mt-2", variantId: "10mg", quantity: 3 }] };
  assert.deepEqual(priceOrder(explicit, 500, ["UT"]).items, priceOrder(request, 500, ["UT"]).items);
  assert.throws(() => priceOrder({ ...request, items: [...request.items, ...explicit.items] }, 500, ["UT"]), /Duplicate compound and size/);
  const store = openStore(":memory:");
  try {
    const order = store.create(explicit, 500, ["UT"], randomUUID(), newToken());
    assert.equal(store.get(order.id)?.items[0].variantId, "10mg");
    assert.equal(store.get(order.id)?.items[0].name, "MT-2 · 10 mg");
  } finally { store.close(); }
});

test("idempotency, private order access, review and payment invariants", () => {
  const store = openStore(":memory:");
  try {
    const token = newToken(), key = randomUUID();
    const order = store.create(request, 500, ["UT"], key, token);
    assert.equal(store.create(request, 500, ["UT"], key, token).id, order.id);
    assert.throws(() => store.create({ ...request, method: "venmo" }, 500, ["UT"], key, token));
    assert.equal(store.authenticate(order.id, newToken()), undefined);
    assert.throws(() => store.markPaid(order.id, "venmo", order.totalCents, "verified transaction"));
    assert.throws(() => store.attachSession(order.id, "cs_test_one"));
    store.review(order.id, true, "Verified institution and laboratory purpose");
    store.attachSession(order.id, "cs_test_one");
    assert.throws(() => store.markPaid(order.id, "card", 1, "Stripe event evt_example", "cs_test_one"));
    assert.throws(() => store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_other"));
    store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_one");
    store.attachSession(order.id, "cs_test_one"); // A late session response cannot overwrite paid status.
    assert.equal(store.get(order.id)?.status, "paid");
    store.markPaid(order.id, "card", order.totalCents, "Stripe event evt_example", "cs_test_one");
    assert.equal(store.db.prepare("SELECT COUNT(*) AS n FROM audit WHERE action='paid'").get()?.n, 1);
    const manual = store.create({ ...request, method: "venmo" }, 500, ["UT"], randomUUID(), newToken());
    assert.throws(() => store.markPaid(manual.id, "venmo", manual.totalCents, "Verified transaction 12345"));
    store.review(manual.id, true, "Verified institution and laboratory purpose");
    assert.throws(() => store.markPaid(manual.id, "venmo", 100, "Verified transaction 12345"));
    assert.equal(store.markPaid(manual.id, "venmo", manual.totalCents, "1234567890123456789").status, "paid");
    const secondManual = store.create({ ...request, method: "venmo" }, 500, ["UT"], randomUUID(), newToken());
    store.review(secondManual.id, true, "Verified institution and laboratory purpose");
    assert.throws(() => store.markPaid(secondManual.id, "venmo", secondManual.totalCents, "1234567890123456789"));
    assert.equal(store.get(secondManual.id)?.status, "approved");
    const recovered = store.recoverAccess(order.id, "Verified ownership through original contact");
    assert.equal(store.authenticate(order.id, token), undefined);
    assert.equal(store.authenticate(order.id, recovered.token)?.id, order.id);
  } finally { store.close(); }
});

test("configuration fails closed for live credentials and unresolved shipping/tax", () => {
  assert.equal(loadConfig({}).enabled, false);
  assert.throws(() => loadConfig({ STRIPE_SECRET_KEY: "sk_live_example" }));
  assert.throws(() => loadConfig({ CHECKOUT_ENABLED: "true" }));
  assert.throws(() => loadConfig({ VENMO_BUSINESS_HANDLE: "example" }));
});

test("HTTP checkout requires review; signed exact-amount webhook alone confirms card payment", async () => {
  const settings = config(), store = openStore(":memory:"), stripe = new Stripe(settings.key);
  let creations = 0;
  const session = { id: "cs_test_example", status: "open", url: "https://checkout.stripe.com/c/pay/example", lastResponse: { headers: {}, requestId: "req_test", statusCode: 200 } } as Stripe.Response<Stripe.Checkout.Session>;
  stripe.checkout.sessions.create = (async (params: Stripe.Checkout.SessionCreateParams) => {
    creations++;
    assert.equal(params.line_items?.[0].price_data?.unit_amount, 2299);
    assert.equal(params.line_items?.[0].quantity, 3);
    assert.equal(params.line_items?.[0].price_data?.product_data?.name, "MT-2 · 10 mg");
    assert.equal(params.allowed_payment_method_types?.[0], "card");
    assert.equal(params.adaptive_pricing?.enabled, false);
    assert.ok(params.success_url?.includes("?order=SNP-"));
    return session;
  }) as typeof stripe.checkout.sessions.create;
  stripe.checkout.sessions.retrieve = (async () => session) as typeof stripe.checkout.sessions.retrieve;
  const server = createCheckoutServer(settings, store, stripe);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  const token = newToken(), headers = { Origin: settings.origin, Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Idempotency-Key": randomUUID() };
  try {
    assert.equal((await fetch(`${base}/orders`, { method: "POST", headers: { ...headers, Origin: "https://wrong.example" }, body: JSON.stringify(request) })).status, 403);
    for (const invalid of [
      { items: [{ slug: "bpc-157", variantId: "5mg", quantity: 1 }], error: "This size is sold out. Choose an available size to order." },
      { items: [{ slug: "bpc-157", quantity: 1 }], error: "This size is sold out. Choose an available size to order." },
      { items: [{ slug: "bpc-157", variantId: "10mg", quantity: 1 }], error: "Pricing is pending for this size. Choose a priced size to order." },
      { items: [{ slug: "pinealon", variantId: "5mg", quantity: 1 }], error: "Pricing is pending for this size. Choose a priced size to order." },
      { items: [{ slug: "bpc-157", variantId: "unknown", quantity: 1 }], error: "Invalid compound or size." },
      { items: [...request.items, { slug: "mt-2", variantId: "10mg", quantity: 1 }], error: "Duplicate compound and size." },
    ]) {
      const response = await fetch(`${base}/orders`, { method: "POST", headers: { ...headers, "Idempotency-Key": randomUUID() }, body: JSON.stringify({ ...request, items: invalid.items }) });
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { error: invalid.error });
    }
    assert.equal(store.db.prepare("SELECT COUNT(*) AS n FROM orders").get()?.n, 0);
    const created = await fetch(`${base}/orders`, { method: "POST", headers, body: JSON.stringify(request) });
    assert.equal(created.status, 201);
    const order = await created.json();
    assert.equal(order.customer, undefined);
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 409);
    assert.equal((await fetch(`${base}/orders/${order.id}`, { headers: { ...headers, Authorization: `Bearer ${newToken()}` } })).status, 404);
    store.review(order.id, true, "Verified institution and laboratory purpose");
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 200);
    assert.equal((await fetch(`${base}/orders/${order.id}/pay`, { method: "POST", headers })).status, 200);
    assert.equal(creations, 1);
    assert.equal(store.get(order.id)?.status, "approved");
    async function webhook(amount: number, signatureValid = true) {
      const payload = JSON.stringify({ id: "evt_test_verified", object: "event", type: "checkout.session.completed", data: { object: { ...session, payment_status: "paid", amount_total: amount, currency: "usd", livemode: false, metadata: { order_id: order.id } } } });
      return fetch(`${base}/webhooks/stripe`, { method: "POST", headers: { "stripe-signature": signatureValid ? stripe.webhooks.generateTestHeaderString({ payload, secret: settings.webhookSecret }) : "invalid" }, body: payload });
    }
    assert.equal((await webhook(order.totalCents, false)).status, 400);
    assert.equal((await webhook(1)).status, 503);
    assert.equal(store.get(order.id)?.status, "approved");
    assert.equal((await webhook(order.totalCents)).status, 200);
    assert.equal((await webhook(order.totalCents)).status, 200);
    assert.equal(store.get(order.id)?.status, "paid");
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); store.close(); }
});

test("trusted ingress gives distinct customers independent request limits", async () => {
  const settings = { ...config(), trustProxy: true }, store = openStore(":memory:");
  const server = createCheckoutServer(settings, store, null);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}/config`;
  try {
    for (let i = 0; i < 60; i++) assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.1" } })).status, 200);
    assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.1" } })).status, 429);
    assert.equal((await fetch(url, { headers: { Origin: settings.origin, "X-Forwarded-For": "192.0.2.2" } })).status, 200);
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); store.close(); }
});
