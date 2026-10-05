import { createServer, type IncomingMessage } from "node:http";
import { isIP } from "node:net";
import Stripe from "stripe";
import { z } from "zod";
import { loadConfig } from "./config";
import { openStore, type StoredOrder } from "./store";
import { checkoutRequest } from "../src/lib/checkout-contract";

export function createCheckoutServer(config: ReturnType<typeof loadConfig>, store: ReturnType<typeof openStore>, stripe = config.key ? new Stripe(config.key) : null) {
  const limits = new Map<string, { count: number; expires: number }>();
  const methods = [ ...(stripe ? ["card"] : []), ...(config.venmoHandle ? ["venmo"] : []) ];
  const view = (o: StoredOrder) => ({ id: o.id, status: o.status, method: o.method, items: o.items, subtotalCents: o.subtotalCents, shippingCents: o.shippingCents, totalCents: o.totalCents, ...(o.status === "approved" && o.method === "venmo" ? { venmoHandle: config.venmoHandle } : {}) });
  async function body(req: IncomingMessage) {
    const chunks: Buffer[] = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 24000) throw new Error("Request too large."); chunks.push(chunk); }
    return Buffer.concat(chunks);
  }
  return createServer(async (req, res) => {
    const send = (status: number, payload: unknown) => { res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify(payload)); };
    res.setHeader("Cache-Control", "no-store"); res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Access-Control-Allow-Origin", config.origin); res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Idempotency-Key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    const path = new URL(req.url || "/", "http://localhost").pathname;
    try {
      if (path === "/webhooks/stripe" && req.method === "POST") {
        if (!stripe || !config.webhookSecret) return send(503, { error: "Card payments unavailable." });
        const raw = await body(req);
        let event: Stripe.Event;
        try { event = stripe.webhooks.constructEvent(raw, req.headers["stripe-signature"] || "", config.webhookSecret); } catch { return send(400, { error: "Invalid webhook signature." }); }
        if (["checkout.session.completed", "checkout.session.async_payment_succeeded"].includes(event.type)) {
          const session = event.data.object as Stripe.Checkout.Session;
          if (session.payment_status === "paid") {
            if (session.currency !== "usd" || session.livemode !== config.live) return send(400, { error: "Payment mode or currency mismatch." });
            try { store.markPaid(session.metadata?.order_id || "", "card", session.amount_total ?? -1, `Stripe event ${event.id}`, session.id); }
            catch { return send(503, { error: "Payment reconciliation pending. Retry delivery." }); }
          }
        }
        return send(200, { received: true });
      }
      if (req.headers.origin !== config.origin) return send(403, { error: "Invalid storefront origin." });
      if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
      const now = Date.now();
      for (const [ip, entry] of limits) if (entry.expires < now) limits.delete(ip);
      const forwarded = req.headers["x-forwarded-for"];
      const client = typeof forwarded === "string" ? forwarded.split(",").at(-1)?.trim() : "";
      const ip = config.trustProxy && client && isIP(client) ? client : req.socket.remoteAddress || "unknown";
      const entry = limits.get(ip) || { count: 0, expires: now + 60000 }; entry.count++; limits.set(ip, entry);
      if (entry.count > 60) return send(429, { error: "Too many requests. Try again in a minute." });
      if (path === "/config" && req.method === "GET") return send(200, { enabled: config.enabled && methods.length > 0, methods, shippingCents: config.shippingCents, states: config.states, supportEmail: config.supportEmail });
      if (!config.enabled) return send(503, { error: "Checkout is not open yet." });
      if (path === "/orders" && req.method === "POST") {
        const requestKey = z.string().uuid().parse(req.headers["idempotency-key"]);
        const token = z.string().regex(/^[a-f0-9]{64}$/).parse(req.headers.authorization?.replace(/^Bearer /, ""));
        const input = checkoutRequest.parse(JSON.parse((await body(req)).toString()));
        if (!methods.includes(input.method)) return send(400, { error: "Payment method unavailable." });
        return send(201, view(store.create(input, config.shippingCents, config.states, requestKey, token)));
      }
      const match = path.match(/^\/orders\/(SNP-[a-f0-9-]+)(\/pay)?$/);
      if (match) {
        const token = req.headers.authorization?.replace(/^Bearer /, "") || "";
        const order = store.authenticate(match[1], token);
        if (!order) return send(404, { error: "Order not found." });
        if (!match[2] && req.method === "GET") return send(200, view(order));
        if (match[2] && req.method === "POST") {
          if (order.status !== "approved" || order.method !== "card" || !stripe) return send(409, { error: "Order is not ready for card payment." });
          // One immutable order maps to one session; repeated requests return the same session.
          const session = order.sessionId ? await stripe.checkout.sessions.retrieve(order.sessionId) : await stripe.checkout.sessions.create({
            mode: "payment", allowed_payment_method_types: ["card"], adaptive_pricing: { enabled: false }, customer_email: order.customer.email,
            client_reference_id: order.id, metadata: { order_id: order.id },
            payment_intent_data: { metadata: { order_id: order.id } },
            line_items: [...order.items.map(item => ({ price_data: { currency: "usd", unit_amount: item.unitCents, product_data: { name: item.name } }, quantity: item.quantity })), ...(order.shippingCents ? [{ price_data: { currency: "usd", unit_amount: order.shippingCents, product_data: { name: "Shipping" } }, quantity: 1 }] : [])],
            success_url: `${config.origin}/checkout/result?order=${order.id}`, cancel_url: `${config.origin}/checkout/result?order=${order.id}`,
          }, { idempotencyKey: order.id });
          store.attachSession(order.id, session.id);
          if (session.status !== "open" || !session.url) return send(409, { error: "This payment session is closed. Contact support for assistance." });
          return send(200, { url: session.url });
        }
      }
      send(404, { error: "Not found." });
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) return send(502, { error: "Card checkout is temporarily unavailable. Please retry." });
      if (error instanceof z.ZodError || error instanceof SyntaxError) return send(400, { error: "Check your checkout details and try again." });
      const message = error instanceof Error ? error.message : "";
      if (["Shipping is unavailable for this state.", "Invalid compound or size.", "Duplicate compound and size.", "Pricing is pending for this size. Choose a priced size to order.", "Checkout request was already used. Start a new request.", "Request too large.", "Payment session does not match order."].includes(message)) return send(400, { error: message });
      send(500, { error: "Checkout is temporarily unavailable. Please retry or contact support." });
    }
  });
}
