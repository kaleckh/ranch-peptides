# Worklog

## 2026-07-12 - Control Tower contracts

- Added repo-owned document-authority and bounded read-only health contracts; the declared lint check passed.

## 2026-07-12

- Wrapped the generated Next.js rule block in `AGENTS.md` with the standard project-memory startup, verification, product-scope, and maintenance contract. No product code changed.

## 2026-07-04

- Replaced the default create-next-app README with a project-specific Henry's Peptides README, added `docs/index.md`, and linked the standard memory docs. No product code changed.

## 2026-06-16

- Configured Next.js static export for Render Static Site deployment and ignored local Codex/Next dev log files.
- Assigned distinct product images for the newly added peptide cards so MOTS-c, Pinealon, Epitalon, and GHK-Cu no longer share the same fallback image.
- Added MOTS-c, Pinealon, Epitalon, and GHK-Cu to the product catalog with product pages, category styling, pricing tiers, and research-study summaries.
- Renamed the visible brand to Henry's Peptides, including metadata titles, logo marks, footer copy, FAQ/product disclaimers, and support email.
- Redesigned the site around a dark graphite/brass industrial-luxury visual system.
- Updated global tokens, typography, header, footer, cart drawer, skeleton/loading states, homepage, catalog, product detail, science, and FAQ surfaces.
- Added responsive mobile handling for the compact header, product detail image badges, dark cart drawer, and mobile route checks down to 320px.
- Added cart drawer dialog semantics, initial focus on close, and Escape-to-close behavior.
- Verified `npm run lint` and `npm run build` pass.
- Browser-verified home, product detail, FAQ, science, and cart drawer on mobile; captured desktop/mobile screenshots in the repo root for local review.

## 2026-09-21 - SALT N’ PEP full revamp

- Owner confirmed SALT N’ PEP identity and supplied the vial reference, now bundled locally as the homepage hero. Rebuilt home, catalog, shared header/footer, packaging illustrations, global styling, and branded icon; restyled product, science, FAQ, cart, and loading surfaces.
- Added reusable compound cards, live search/category filtering, singular/plural results, and cart keyboard focus trap/return. Preserved eight products, bulk pricing, static export, and existing research content. Removed the previous brand support email pending new contact details.
- Verified desktop homepage and mobile home/catalog/product/FAQ/science/cart at 390px and/or 320px. Search, empty/reset state, category filtering, FAQ expansion, mobile menu, add-to-cart, bulk repricing ($107.97 for 3 BPC-157 vials, $79.98 for 2), removal, keyboard wrap, Escape, and return focus passed. Corrected 320px scrollbar overflow, mobile badge overlap, and Next smooth-scroll attribute warning.
- Final npm run lint and npm run build passed; static export generated all 16 pages/routes. Local review server: http://localhost:3015 using webpack. Existing tracked/untracked work preserved; not deployed.
- Owner visual acceptance is pending. Checkout remains Coming Soon; existing research/business claims and COA availability need verification before a sales launch.

## 2026-09-21 - Research, Utah delivery, and product reviews

- Two owner-requested agents delivered the searchable research hub and site-wide Local Utah delivery banner. A separate review agent checked all eight primary citations, study models/limitations, UI logic, and the later product changes; no unresolved findings. Fixed its small empty-state search-help finding.
- Added customer-review and scientific-review sections to all eight product pages. Customer sections show zero published reviews; no fabricated ratings or submission capability. Scientific sections reuse the verified paper data and replace the legacy study/steroid panels. FAQ research teaser now matches the hub.
- Owner selected the supplied SALT N’ PEP photo across catalog and product pages. Replaced CSS illustrations, retained the full vial, added explicit product quantity/format and brand-photo labeling; product hero loads eagerly.
- Browser-verified desktop and 320px research/product/catalog layouts, human filter (2 papers), search (tendon: 1), empty/reset (0 then 8), same-page review anchors, mobile menu and cart. Simplified cross-page research navigation to the hub after the streaming dev route failed fragment scrolling. No horizontal overflow on tested 320px routes.
- Final npm run lint and npm run build passed (16 static routes). Export audit confirmed both review sections, supplied photo, source link, and Utah banner on all eight product pages. Not deployed; owner visual acceptance pending at http://localhost:3015/science.
- Real customer-review submission/publication requires a connected review service. Existing product/FAQ commercial and scientific claims outside the replaced sections still require validation before launch. All observed friction logged; existing dirty work preserved.

## 2026-09-21 - Catalog hierarchy and repetition correction

- Responded to owner rejection of repeated vial tiles and faint product links: replaced shared homepage/catalog cards with bold cream-white compound names, prominent quantity badges, clear prices and View compound links on dark neutral surfaces. Catalog has one shared photographic intro; individual product pages retain their full vial image.
- Strengthened header navigation and text links. Cards adapt from four columns to two, then one for small screens. Desktop catalog/home and 320px catalog inspected; no horizontal overflow, search returns the matching compound. Lint and production build passed with all 16 static routes.
- Owner visual acceptance pending at http://localhost:3015/products. Existing work preserved; no deployment. Friction logged.

## 2026-09-21 - Lumira batch evidence banners

- Added large high-contrast purity banners above the hero on all eight product pages, with actual measured sample percentages, named third-party labs, report dates, batch registry links, and direct COA PDFs. Owner authorized temporary Lumira selections; all are clearly labeled example reports with inventory matching pending.
- Read all eight selected reports. Explicitly display BPC-157/TB-500 dosage mismatches and retatrutide lot spelling discrepancy; Epitalon uses the lower of two vial results. Replaced the generic product purity badge with an example-report anchor.
- Lint and production build passed (16 static routes). Export audit confirmed the banner, pending label, PDF and batch links on all eight products. Desktop Pinealon and 320px Epitalon visually checked; long purity figure and links fit without horizontal overflow.
- Existing work preserved; not deployed. Owner visual review and actual inventory batch confirmation remain pending. Source data is centralized in src/lib/batches.ts.

## 2026-09-21 - Collection photo framing iteration

- Replaced the oversized landscape crop with a narrow portrait panel, showing the supplied vial cap, label, and base together. Mobile contains the full reference photo; heading and bold compound cards retain visual priority.
- Desktop and 320px mobile visually checked, with no horizontal overflow. Lint and production build passed (16 static routes). Owner visual acceptance pending at http://localhost:3015/products; not deployed.
