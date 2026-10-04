# Next Steps

- Owner visual review of the SALT N’ PEP revamp, research hub, Utah banner, and product-review sections at http://localhost:3015 (local development preview).
- Owner review of the simplified collection at http://localhost:3015/products: compact heading, product photography, and concise product details on ivory replace the banner and dense dark card panels.
- Connect a review service and moderation/publication workflow if customer review submission is required; current sections contain no fabricated reviews and show zero published reviews.
- Review the Lumira purity banners at http://localhost:3015/products/pinealon. Replace example records in `src/lib/batches.ts` with confirmed inventory batches before claiming stock verification. Resolve BPC-157/TB-500 10mg report versus 5mg catalog mismatch and retatrutide registry PPA-WL-RT5-P00701 versus PDF PPA-WL-RT5-P000701 spelling.
- Configure and deploy the separate checkout API following `docs/CHECKOUT.md`; supply the approved merchant account, Venmo business handle, support email, shipping states/charge, and tax policy. Complete provider test-mode end-to-end payment and desktop/mobile checkout review before enabling live payments. Real credentials and deployment remain pending.
- Before a sales launch, verify existing product/quality/shipping claims, actual inventory/batch reports, research eligibility review, and shipping/refund operations. Checkout does not automate email, stock, fulfillment, extra sales tax, or refunds.

The previous brass-theme review, reusable card extraction, and cart focus tasks are superseded or completed by the 2026-09-21 revamp; historical direction remains in DECISIONS.md and WORKLOG.md.
