# Checkout operations

The static storefront now links to `/checkout`. A separate Node 24 API stores orders in SQLite and offers hosted Stripe card checkout and verified manual Venmo business payments. No secret keys or customer addresses are included in the static export. Checkout is disabled by default.

## Local setup

1. Copy `.env.checkout.example` to `.env.checkout` and `.env.local.example` to `.env.local`.
2. Set the shipping price in integer cents, allowed US states, support email, and exact storefront origin. Do not invent these business details.
3. Use Stripe **test** credentials and the webhook signing secret. The installed Stripe SDK uses API version `2026-09-30.endive`; configure the webhook endpoint for that version. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded` at `/webhooks/stripe` on the API. Stripe must deliver the original raw body and signature.
4. This version charges catalog prices plus flat shipping. It does **not** add or calculate sales tax. Set `TAX_POLICY_APPROVED=true` only after confirming that this pricing treatment is appropriate for the enabled destinations. If extra tax must be calculated, implement that before launch.
5. Set `CHECKOUT_ENABLED=true` and run `npm run checkout:api`. Run the storefront with `npm run dev -- --webpack --port 3015` in another terminal. `npm test`, `npm run lint`, and `npm run build` validate the package.

For Venmo, configure an authorized business profile handle without `@` and `VENMO_BUSINESS_APPROVED=true`. Do not use personal/friends-and-family payments. Card and Venmo appear only when configured. Live Stripe keys additionally require `LIVE_PAYMENTS_APPROVED=true` after merchant approval for the actual catalog and research-buyer controls. A checkbox alone is not research eligibility verification; staff must verify the institution and purpose before approving each request.

## Staff workflow

Run these on the API host, with the same environment and database path as the API. These are local CLI commands, not publicly exposed admin endpoints.

```text
npm run orders -- list
npm run orders -- show SNP-ORDER_UUID
npm run orders -- approve SNP-ORDER_UUID "Documented institution verification and research purpose"
npm run orders -- reject SNP-ORDER_UUID "Documented reason for rejection"
npm run orders -- confirm-venmo SNP-ORDER_UUID EXACT_VENMO_TRANSACTION_ID EXACT_AMOUNT_CENTS
npm run orders -- recover-access SNP-ORDER_UUID "Documented verification of original buyer ownership"
```

- Review the order's organization, purpose, delivery address, inventory availability, and amount before approval. Reject requests intended for human/animal use. Keep verification evidence in the audit record without unnecessary sensitive details.
- Card payment opens only after approval. Browser return URLs never mark an order paid. A signed matching Stripe event verifies USD amount, mode and the attached session. Deliveries before the session is attached receive a retryable error. Replayed matching events do not duplicate payment records.
- For Venmo, inspect the actual business-account transaction and match recipient, cleared status, amount and full order reference. Supply its exact unique transaction ID, not a screenshot or freeform note. The database prevents reuse across orders. This is manual confirmation, not automatic Venmo reconciliation.
- The customer returns to `/checkout/result` in the same browser and selects a saved request. Private access codes are retained per order in browser storage; names/addresses/research statements are not stored there. Clearing data or changing devices requires support recovery. Verify ownership through the original buyer contact before issuing a new access code with `recover-access`; this revokes the old code and writes an audit event. Deliver the new code privately. The customer can restore it using the support-code form. Never put codes in URLs or public logs.
- Checkout does not send email, reserve inventory, buy labels, fulfill orders, calculate tax, or automate refunds/disputes. Staff must monitor pending orders, contact buyers using the submitted email, and manage shipping/refunds in the provider dashboard. The persistent cart remains available after payment; saved requests let customers review existing orders before resubmitting.
- A closed/expired card session requires staff assistance; do not create another charge for an already-paid order. This version does not automatically renew expired sessions. Reconcile the provider dashboard before asking a customer to resubmit. Keep order support operational.

## Production deployment

Keep the storefront as a Render Static Site publishing `out/`. Set `NEXT_PUBLIC_CHECKOUT_API_URL` to the HTTPS API origin **before** its build; rebuilding is required when it changes. Never place payment secrets in `NEXT_PUBLIC_*` variables.

Deploy the API separately as one Node 24 service using `npm ci` and `npm run checkout:api`, with HTTPS ingress and a persistent disk. Set `ORDERS_DB_PATH` to a path on that disk. Do not use an ephemeral filesystem, multiple replicas, or a serverless function with this SQLite implementation. Staff CLI commands must target that same disk. Back up using a consistent SQLite backup mechanism, protect backups and filesystem access, and define retention for customer information. Monitor failed/retrying webhooks and pending orders before fulfillment.

Rate limiting defaults to the direct socket peer. Set `TRUST_PROXY=true` only when the ingress appends/replaces `X-Forwarded-For` reliably and the API cannot be reached around it; the rightmost validated address is used. Otherwise enforce per-client limits at the edge and retain direct-peer behavior. Validate the hosting ingress behavior before enabling checkout.

Before live launch: supply real shipping/support details; confirm merchant acceptance and pricing/tax policy; replace example batch evidence with inventory-matched reports; verify existing commercial claims and stock; establish research verification and shipping/refund procedures; run a provider test-mode end-to-end payment plus webhook retry/replay and manual Venmo reconciliation exercise. No live charge or deployment was performed while implementing this package.

Reference: [Stripe Checkout](https://docs.stripe.com/api/checkout/sessions), [Stripe research-business guidance](https://support.stripe.com/questions/prohibited-and-restricted-businesses-list-faqs?locale=en-GB), [Venmo goods/services authorization](https://help.venmo.com/cs/articles/can-i-use-venmo-to-buy-or-sell-merchandise-goods-or-services-vhel227).
