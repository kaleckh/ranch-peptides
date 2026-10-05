"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { checkoutApi, isCheckoutPreview, orderStorageKey, attemptStorageKey, historyStorageKey } from "@/lib/checkout-client";
import { checkoutRequest, type CheckoutConfig, type OrderView } from "@/lib/checkout-contract";
import { formatPrice } from "@/lib/products";
import { formatDosage } from "@/lib/product-variants";
import styles from "./checkout.module.css";

export function CheckoutForm() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [config, setConfig] = useState<CheckoutConfig | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(false);
  const attempt = useRef<{ key: string; token: string; body: string } | null>(null);
  useEffect(() => { let active = true; checkoutApi<CheckoutConfig>("/config").then(c => { if (active) { setConfig(c); setPreview(isCheckoutPreview()); } }).catch(e => { if (active) setError(e.message); }); return () => { active = false; }; }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    setError(""); setBusy(true);
    try {
      const form = new FormData(event.currentTarget);
      const customer = Object.fromEntries(["name", "email", "organization", "researchPurpose", "address", "address2", "city", "state", "zip"].map(key => [key, form.get(key) || ""]));
      const parsed = checkoutRequest.safeParse({ customer, items: items.map(i => ({ slug: i.product.slug, variantId: i.variant.id, quantity: i.quantity })), method: form.get("method"), researchOnly: form.get("researchOnly") === "on" });
      if (!parsed.success) throw new Error("Check your details, research purpose (at least 20 characters), and research-use confirmation.");
      const body = JSON.stringify(parsed.data);
      const fingerprint = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body))), byte => byte.toString(16).padStart(2, "0")).join("");
      if (!attempt.current || attempt.current.body !== body) {
        const saved = JSON.parse(sessionStorage.getItem(attemptStorageKey) || "null");
        attempt.current = saved?.fingerprint === fingerprint && /^[a-f0-9]{64}$/.test(saved.token) && typeof saved.requestKey === "string"
          ? { key: saved.requestKey, token: saved.token, body }
          : { key: crypto.randomUUID(), token: Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, "0")).join(""), body };
      }
      // Verify session storage before saving an order so its private access token is recoverable.
      sessionStorage.setItem(attemptStorageKey, JSON.stringify({ token: attempt.current.token, requestKey: attempt.current.key, fingerprint }));
      const history = JSON.parse(localStorage.getItem(historyStorageKey) || "{}");
      localStorage.setItem(historyStorageKey, JSON.stringify(history)); // Check durable storage before submission.
      const order = await checkoutApi<OrderView>("/orders", { method: "POST", headers: { Authorization: `Bearer ${attempt.current.token}`, "Idempotency-Key": attempt.current.key }, body });
      sessionStorage.setItem(orderStorageKey, JSON.stringify({ id: order.id, token: attempt.current.token, requestKey: attempt.current.key, fingerprint }));
      const updatedHistory = JSON.parse(localStorage.getItem(historyStorageKey) || "{}");
      updatedHistory[order.id] = { id: order.id, token: attempt.current.token };
      localStorage.setItem(historyStorageKey, JSON.stringify(updatedHistory));
      router.push(`/checkout/result?order=${order.id}`);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to submit checkout. Please retry."); }
    finally { setBusy(false); }
  }
  return <div className={styles.shell}>
    <p className="eyebrow">SALT N’ PEP / CHECKOUT</p><h1>For your research.</h1>
    <p className={styles.intro}>Submit your shipping details and research information. We review research eligibility before opening payment. Products are for laboratory research only.</p>
    {preview && <div className={styles.summary}><strong>Local UX demo — no charges or real orders</strong><p className={styles.note}>Shipping is a $5 sample; destinations are examples. Use fictional details. Approval and payment can be simulated on the next screen. Hosted Stripe checkout will be tested after credentials are supplied.</p></div>}
    {error && <p role="alert" className={styles.error}>{error}</p>}
    {config && !config.enabled && <p className={styles.error}>Checkout is not open yet. Please check back soon.</p>}
    {items.length === 0 ? <p>Your bag is empty. <Link className="text-link" href="/products">Explore compounds</Link></p> : <div className={styles.grid}>
      <form className={styles.form} onSubmit={submit}>
        {preview && <button type="button" className={styles.secondary} onClick={event => {
          const form = event.currentTarget.form;
          const sample = { name: "Demo Researcher", email: "demo@example.com", address: "123 Example Street", city: "Salt Lake City", state: "UT", zip: "84101", organization: "Example Research Lab", researchPurpose: "In vitro laboratory assay for a fictional research project." };
          for (const [name, value] of Object.entries(sample)) { const field = form?.elements.namedItem(name); if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) field.value = value; }
        }}>Fill with sample details</button>}
        <fieldset><legend>01 / Contact & shipping</legend><div className={styles.fields}>
          <label>Full name<input name="name" autoComplete="name" required minLength={2} maxLength={120} /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          <label className={styles.wide}>Street address<input name="address" autoComplete="address-line1" required minLength={3} maxLength={200} /></label>
          <label className={styles.wide}>Apartment, suite, etc. (optional)<input name="address2" autoComplete="address-line2" maxLength={200} /></label>
          <label>City<input name="city" autoComplete="address-level2" required minLength={2} maxLength={100} /></label>
          <label>State<select name="state" autoComplete="address-level1" required defaultValue=""><option value="" disabled>Select state</option>{config?.states.map(state => <option key={state}>{state}</option>)}</select></label>
          <label>ZIP code<input name="zip" autoComplete="postal-code" required pattern="[0-9]{5}(-[0-9]{4})?" inputMode="numeric" /></label>
          <label>Country<input value="United States" readOnly /></label>
        </div></fieldset>
        <fieldset><legend>02 / Research eligibility</legend><div className={styles.fields}>
          <label className={styles.wide}>Institution or research organization<input name="organization" autoComplete="organization" required minLength={2} maxLength={200} /></label>
          <label className={styles.wide}>Describe your laboratory research purpose<textarea name="researchPurpose" required minLength={20} maxLength={2000} /></label>
        </div><p className={styles.note}>We may contact you to verify your research organization and intended use. Submitting a request does not charge you or confirm an order for fulfillment.</p></fieldset>
        <fieldset><legend>03 / Preferred payment</legend><div className={styles.methods}>{config?.methods.map((method, index) => <label key={method}><input name="method" type="radio" value={method} defaultChecked={index === 0} required />{method === "card" ? "Credit / debit card" : "Venmo"}</label>)}</div><p className={styles.note}>Card payments open Stripe’s secure checkout after approval. Venmo instructions are provided after approval; payment is verified separately.</p></fieldset>
        <label className={styles.check}><input type="checkbox" name="researchOnly" required /><span>I confirm these compounds are for legitimate laboratory research only and will not be used in humans or animals.</span></label>
        <button className={styles.action} disabled={busy || !config?.enabled}>{busy ? "Submitting…" : "Submit for research review"}</button>
      </form>
      <aside className={styles.summary}><h2>Your research bag</h2><ul>{items.map(item => <li key={item.id}><span>{item.product.shortName}<br /><span className="text-muted">{formatDosage(item.variant.dosage)} × {item.quantity}</span></span><span>{formatPrice(item.pricePerUnit * item.quantity)}</span></li>)}</ul>
        <div className={styles.row}><span>Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
        <div className={styles.row}><span>Shipping</span><span>{config?.enabled ? formatPrice(config.shippingCents / 100) : "Unavailable"}</span></div>
        <div className={styles.row}><strong>Total</strong><strong>{config?.enabled ? formatPrice(totalPrice + config.shippingCents / 100) : "—"}</strong></div>
        <p className={styles.note}>The final amount is calculated securely from the catalog when your request is submitted.</p>
        {config?.supportEmail && <a className={styles.secondary} href={`mailto:${config.supportEmail}`}>Contact order support</a>}
      </aside>
    </div>}
    <Link className={styles.secondary} href="/products">Continue exploring</Link>
    <br /><Link className={styles.secondary} href="/checkout/result">View saved requests</Link>
  </div>;
}
