"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkoutApi, isCheckoutPreview, orderStorageKey, historyStorageKey } from "@/lib/checkout-client";
import type { CheckoutConfig, OrderView } from "@/lib/checkout-contract";
import { formatPrice } from "@/lib/products";
import styles from "../checkout.module.css";

export function OrderStatus() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderView | null>(null);
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const [support, setSupport] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);
  const credentials = () => {
    const history: Record<string, { id: string; token: string }> = JSON.parse(localStorage.getItem(historyStorageKey) || "{}");
    const requested = new URLSearchParams(window.location.search).get("order");
    const latest = JSON.parse(sessionStorage.getItem(orderStorageKey) || "null");
    const c = requested ? history[requested] : latest || Object.values(history).at(-1);
    if (!c?.id || !c?.token) throw new Error("No request is saved in this browser. Contact support with your order reference if you submitted one on another device.");
    return c as { id: string; token: string };
  };
  const refresh = useCallback(async () => {
    setBusy(true); setError("");
    try { setSavedIds(Object.keys(JSON.parse(localStorage.getItem(historyStorageKey) || "{}"))); const c = credentials(); setOrder(await checkoutApi<OrderView>(`/orders/${c.id}`, { headers: { Authorization: `Bearer ${c.token}` } })); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to load order."); } finally { setBusy(false); }
  }, []);
  useEffect(() => { void refresh(); checkoutApi<CheckoutConfig>("/config").then(c => { setSupport(c.supportEmail); setPreview(isCheckoutPreview()); }).catch(() => {}); }, [refresh]);
  async function simulate(action: "approve" | "reject" | "paid" | "fail") {
    setBusy(true); setError("");
    try { const c = credentials(); setOrder(await checkoutApi<OrderView>(`/orders/${c.id}/demo/${action}`, { method: "POST", headers: { Authorization: `Bearer ${c.token}` } })); }
    catch (e) { setError(e instanceof Error ? e.message : "Unable to simulate this state."); }
    finally { setBusy(false); }
  }
  async function pay() {
    setBusy(true); setError("");
    try { const c = credentials(); const result = await checkoutApi<{ url: string }>(`/orders/${c.id}/pay`, { method: "POST", headers: { Authorization: `Bearer ${c.token}` } });
      const url = new URL(result.url); if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Unable to open secure card checkout."); window.location.assign(url.href);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to open payment."); setBusy(false); }
  }
  async function recover(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const form = new FormData(event.currentTarget), id = String(form.get("id")).trim(), token = String(form.get("token")).trim();
      if (!/^SNP-[a-f0-9-]{36}$/.test(id) || !/^[a-f0-9]{64}$/.test(token)) throw new Error("Check the reference and access code supplied by support.");
      const restored = await checkoutApi<OrderView>(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const history = JSON.parse(localStorage.getItem(historyStorageKey) || "{}"); history[id] = { id, token };
      localStorage.setItem(historyStorageKey, JSON.stringify(history)); sessionStorage.setItem(orderStorageKey, JSON.stringify({ id, token }));
      setOrder(restored); setSavedIds(Object.keys(history)); setBusy(false); router.push(`/checkout/result?order=${id}`);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to recover access."); setBusy(false); }
  }
  return <div className={`${styles.shell} ${styles.result}`}><p className="eyebrow">SALT N’ PEP / YOUR REQUEST</p><h1>{order?.status === "paid" ? "Payment confirmed." : "Research comes first."}</h1>
    {preview && <div className={styles.summary}><strong>Local UX demo — no charges or real orders</strong><p className={styles.note}>These controls simulate staff review and payment verification. No card details are collected and no payment service is contacted.</p>
      {order?.status === "awaiting_review" && <><button className={styles.action} disabled={busy} onClick={() => simulate("approve")}>Demo: approve research request</button><button className={styles.secondary} disabled={busy} onClick={() => simulate("reject")}>Demo: reject research request</button></>}
      {order?.status === "approved" && <><button className={styles.action} disabled={busy} onClick={() => simulate("paid")}>Demo: confirm {order.method === "card" ? "card" : "Venmo"} payment</button><button className={styles.secondary} disabled={busy} onClick={() => simulate("fail")}>Demo: simulate failed payment</button></>}
    </div>}
    {error && <p className={styles.error} role="alert">{error}</p>}
    {order && <><p className={styles.reference}>Order reference: {order.id}</p>
      <div aria-live="polite">
        {order.status === "awaiting_review" && <><h2>Awaiting research review</h2><p className={styles.intro}>Your request is saved. We’ll verify your research eligibility before payment is available. Return using this browser and check the status after speaking with our team.</p></>}
        {order.status === "rejected" && <><h2>Request not approved</h2><p className={styles.intro}>Payment is unavailable for this request. Contact support with your order reference for details.</p></>}
        {order.status === "paid" && <p className={styles.intro}>Your payment has been verified. Keep your order reference for shipping and support inquiries.</p>}
        {order.status === "approved" && <><h2>Approved for payment</h2><p className={styles.intro}>Your research request is approved. Payment is still pending.</p></>}
      </div>
      <div className={styles.summary}><h2>Order summary</h2><ul>{order.items.map(item => <li key={item.slug}><span>{item.name} × {item.quantity}</span><span>{formatPrice(item.unitCents * item.quantity / 100)}</span></li>)}</ul><div className={styles.row}><span>Shipping</span><span>{formatPrice(order.shippingCents / 100)}</span></div><div className={styles.row}><strong>Total</strong><strong>{formatPrice(order.totalCents / 100)}</strong></div></div>
      {order.status === "approved" && order.method === "card" && (preview ? <p className={styles.note}>In live checkout, this step opens Stripe’s hosted card page for {formatPrice(order.totalCents / 100)}. Use the demo confirmation above to preview the result.</p> : <button className={styles.action} onClick={pay} disabled={busy}>Pay {formatPrice(order.totalCents / 100)} securely by card</button>)}
      {order.status === "approved" && order.method === "venmo" && preview && <><h2>Pay with Venmo</h2><p className={styles.intro}>The live screen will show your business profile and exact amount ({formatPrice(order.totalCents / 100)}), with this order reference for the payment note. Use the demo confirmation above to preview verification.</p></>}
      {order.status === "approved" && order.method === "venmo" && order.venmoHandle && <><h2>Pay with Venmo</h2><p className={styles.intro}>Send exactly <strong>{formatPrice(order.totalCents / 100)}</strong> to <strong>@{order.venmoHandle}</strong>. Include your full order reference in the payment note.</p><p className={styles.reference}>{order.id}</p><a className={styles.action} href={`https://account.venmo.com/u/${encodeURIComponent(order.venmoHandle)}`} target="_blank" rel="noopener noreferrer">Open Venmo business profile</a><p className={styles.note}>Opening Venmo does not confirm payment. Your order stays pending until our team verifies the transaction.</p></>}
    </>}
    <button className={styles.secondary} onClick={refresh} disabled={busy}>{busy ? "Checking…" : "Refresh order status"}</button><br />
    {support && <><a className={styles.secondary} href={`mailto:${support}`}>Contact order support</a><br /></>}
    <Link className={styles.secondary} href="/products">Back to compounds</Link>
    {savedIds.length > 0 && <nav aria-label="Saved requests"><h2>Saved requests</h2>{savedIds.map(id => <a className={`${styles.secondary} ${styles.reference}`} key={id} href={`/checkout/result?order=${id}`}>{id}</a>)}<p className={styles.note}>Private access is saved on this browser. Clearing browser data removes it. Contact support for help on another device.</p></nav>}
    <details className={styles.secondary}><summary>Restore access with a code from support</summary><form className={styles.form} onSubmit={recover}><p className={styles.note}>Support must verify ownership before issuing a new private access code. Never share this code with anyone else.</p><div className={styles.fields}><label className={styles.wide}>Order reference<input name="id" required autoComplete="off" /></label><label className={styles.wide}>Private access code<input name="token" type="password" required autoComplete="off" /></label></div><button className={styles.action} disabled={busy}>Restore order access</button></form></details>
  </div>;
}
