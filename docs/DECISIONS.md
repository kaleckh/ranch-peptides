# Decisions

## 2026-06-16: Dark Industrial Visual System

The site moved from a light clinical theme to a dark industrial-luxury direction. The design uses graphite/black surfaces, brass primary accents, condensed uppercase typography via Oswald, dark panel utilities, and desaturated product imagery.

Reason: the requested brand direction was darker, sexier, more masculine, and mobile-friendly. Shared CSS utilities (`dark-panel`, `metal-panel`, `product-card`, `btn-primary`, `btn-ghost`) keep route surfaces consistent and reduce scattered light styling.

## 2026-06-16: Local Dev Uses Webpack

Run the dev server with `npm run dev -- --webpack` on this Windows machine.

Reason: `next dev` defaults to Turbopack in this project and previously produced Windows worker panics while the HTTP server stopped responding. The webpack dev backend served the app reliably.

## 2026-06-16: Render Static Site Export

The project is configured for static export with `output: "export"` and unoptimized `next/image` output.

Reason: Render Static Site publishing needs a directory of static files. `next build` now emits `out/`, which should be used as the Render publish directory.

## 2026-09-21: SALT N’ PEP visual identity

The owner requested a full revamp using their black/ivory vial reference and explicitly confirmed SALT N’ PEP as the brand. This supersedes the graphite/brass direction. Use the supplied local hero image, neutral CSS packaging illustrations, warm ivory surfaces, charcoal controls, and editorial serif accents. Preserve static export and research-only product scope.

## 2026-10-03: Reviewed checkout with separate payment API

Preserve the Render static export and run payments in a separate Node 24 service with a persistent SQLite disk. Use hosted Stripe Checkout for approved research orders and authorized Venmo business payments with manual transaction verification. The server owns catalog pricing; provider verification owns paid status. Orders require institution/purpose review before payment. Browser access is stored per order, with audited staff recovery. Live checkout stays disabled until shipping, support, tax treatment, and merchant configuration are supplied. See CHECKOUT.md for operational limits.

## 2026-10-03: Lighter collection browsing

The owner approved removing the collection banner/photo and dense dark product panels. Use a compact heading followed by filters, preserve product photography, and place concise names, prices, dosage, and category on the ivory page. The whole card links to product details with visible hover/focus feedback; avoid duplicate arrows and View compound links. Shared homepage cards follow the same treatment.

## 2026-10-03: Research library first

The owner approved replacing the editorial research hero and reading-room panel with a compact Research library heading, search and compound/evidence filters, and immediately visible papers. Keep study limitations alongside findings; move the evidence-reading guide into a compact disclosure below results. Use the collection's ivory palette and restrained sans-serif hierarchy.

## 2026-10-03: Compound study pages

The owner requested clicking into studies for each compound. Library cards and product scientific-review links open a statically exported /science/[slug] page. Keep full findings, limitations, models, and original publication links together on that page; the index uses concise summaries. The existing curated list contains one selected primary paper per compound and does not imply comprehensive coverage.
