# Worklog

## 2026-09-28 - Mobile hero image refresh

- Swapped only the mobile hero source to the uploaded `salty mobile offical.png` asset; retained the existing 100svh cover behavior and left desktop/content unchanged.
- The asset filename is spelled “offical” in `public/images`.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero artwork swap

- Switched the mobile-only hero source to `mobile official.png` and kept centered `cover` rendering in the full `100svh` hero; desktop source and layout are unchanged.
- Verified the mobile source/fit at 375x667, 390x844, 393x852, 414x896, 430x932, and 430x740; confirmed desktop still selects `header desk.png`.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero poster fit

- Changed only the mobile hero image fit from `cover` to centered `contain` at both mobile breakpoints, preserving the full dedicated poster composition over the existing hero background color.
- Kept the desktop `cover` behavior, mobile asset, crop source, overlays, and CTA unchanged.
- Verified 375, 390, 393, 414, and 430px widths at standard and short heights; no horizontal overflow or CTA clipping. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Collection vial caption removed

- Removed the “THE SALT N’ PEP STANDARD / BRAND PHOTOGRAPH” caption from the collection intro image; no image, crop, sizing, or surrounding layout changed.
- Confirmed no vial-caption component or matching caption text remains in source. Verified `npm run lint` and `git diff --check`.

## 2026-09-28 - Desktop hero CTA centered

- Moved the desktop collection CTA to the horizontal center at 68% hero height; preserved its styling and the mobile positioning override.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Desktop hero image and CTA position

- Switched only the desktop hero fallback image to `header desk.png`; retained the mobile source and `object-fit: cover` behavior.
- Moved the desktop CTA to the lower-left near the PEP artwork while keeping the existing CTA styling and mobile position unchanged.
- Verified `npm run lint`, `npm run build`, and generated responsive image sources.

## 2026-09-28 - Vial caption and CTA consistency

- Removed the product-detail vial caption and its unused CSS rule.
- Unified the hero collection CTA with the existing mobile outlined treatment across all breakpoints, including removing the short-height padding variant.
- Verified `npm run lint`, `npm run build`, and `git diff --check`.

## 2026-09-28 - Product bundle quantity selector

- Replaced the product-page bulk-pricing display and separate quantity stepper with one responsive 1/3/5/10-vial selector driven by each product's existing `bulkPricing` data.
- Selected tier controls its displayed total/per-vial amount and passes the matching vial quantity to the shared cart, whose existing tier pricing keeps line totals and subtotal synchronized.
- Kept a 2x2 layout through tablet widths and four columns at large desktop; verified four tiers and matching totals on all eight exported product pages. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Site-wide link and purchase hierarchy cleanup

- Replaced text arrow glyphs across hero, cards, nav, footer, catalog, research, reviews, and lab-report links with a shared directional SVG icon; underlined the product-card “View compound” action.
- Removed the decorative asterisk from header/footer wordmarks.
- Reordered product details so bulk pricing and Add to Cart precede descriptions, technical details, and the lab-report section; restyled report/registry links as secondary text links.
- Verified `npm run lint` and `npm run build` (16 static routes).

## 2026-09-28 - Mobile status block moved into header row

- Moved the mobile delivery/research block into the header itself at the top-left; kept Bag and menu on the top-right and removed the mobile wordmark/icon.
- Kept the desktop hero banner visible and hid the mobile header instance outside the mobile breakpoint.
- Verified header alignment at 360–430px, no horizontal overflow, and confirmed desktop banner visibility. `npm run lint` and `npm run build` pass.

## 2026-09-28 - Fixed mobile utility placement

- Changed the mobile hero utility block to fixed 24px left padding and 88px safe-area-relative top padding; removed viewport-height-dependent utility spacing.
- Kept the mobile image, CTA, header controls, and desktop layout unchanged.
- Verified matching utility coordinates at 375x667, 375x812, 390x844, 393x852, 414x896, 430x932, and 390x700; `npm run lint` and `npm run build` pass.

## 2026-09-28 - Responsive mobile hero flow

- Moved the existing delivery/research banner into the homepage hero so mobile can lay it out in normal flow below the transparent navigation; the shared header retains it on other routes.
- Kept only Bag/menu controls at the mobile top-right, hid the duplicate wordmark, and let the CTA flow to the bottom with safe-area padding.
- Tested 375x667, 375x812, 390x844, 393x852, 414x896, 430x932, and 390x700 against the static export; no horizontal overflow, utility/header overlap, or CTA clipping. Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero header spacing

- Hid the standalone brand asterisk on mobile and changed the delivery/research notices from a cramped row to a left-aligned stacked block beneath navigation.
- Preserved the mobile hero image, crop, baked typography, and bottom safe-area CTA; desktop remains unchanged.
- Verified `npm run lint`.

## 2026-09-28 - Mobile hero UI restoration

- Restored the existing logo and transparent bag/menu navigation on mobile, plus the delivery/research utility labels beneath navigation.
- Restored the collection CTA as an outlined button above the mobile bottom safe area; kept the desktop hero unchanged and retained the unmodified mobile background image.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Mobile hero image swap

- Switched the hero source to `header mobile.png` at the requested 768px breakpoint, keeping the desktop asset unchanged and using centered `object-fit: cover` in an exact `100vw` by `100svh` mobile hero.
- On mobile, hid the image-duplicating CTA and delivery strip while retaining the transparent functional header controls with safe-area spacing.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Homepage hero hierarchy cleanup

- Removed the redundant homepage header wordmark, hero disclaimer under the CTA, and principles/tagline strip; retained the single top research notice.
- Lightened homepage navigation and aligned delivery-message contrast; changed the CTA to “Explore the Collection” and moved it upward without altering hero artwork or crop.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Responsive homepage hero artwork

- Switched the homepage hero to the supplied desktop and phone header images through responsive picture sources, preserving each image's proportions without stretching.
- Removed prior hero copy and overlays; added only the collection CTA and research-use disclaimer as live HTML.
- Verified warning-free `npm run lint` and `npm run build`.

## 2026-09-24 - Catalog product image mapping

- Mapped all eight product slugs to their uploaded local PNG assets through the shared `ProductVial` component, covering clickable catalog cards and product detail pages.
- Updated image surfaces to square, edge-to-edge containers using centered `object-fit: cover`; product copy, pricing, links, and cart behavior remain unchanged.
- Verified `npm run lint` and `npm run build`.

## 2026-09-23 - Locked vial asset reuse

- Added the existing `ProductVial` photographic asset to collection cards without recreating or modifying the vial silhouette, label, proportions, or branding.
- Limited styling changes to the surrounding card image area and neutral mineral-toned framing; product information remains unchanged.
- Verified `npm run lint` and `npm run build`.

## 2026-09-23 - Screenshot-matched hero content pass

- Refined the existing `header.png` full-screen hero to match the supplied reference: layered left atmospheric wash, `18vh` headline placement, single-line editorial headline treatment, shortened supporting copy, and mid-hero `01` block.
- Removed the homepage eyebrow and CTA from this hero as requested; preserved the photograph, transparent shell, navigation, and downstream sections.
- Verified `npm run lint` and `npm run build`; Playwright was not run.

## 2026-09-23 - Homepage hero restraint pass

- Refined the existing full-bleed `header.png` hero without changing its structure or copy: reduced image crop, slimmed the transparent overlay header, reduced headline and CTA scale, tightened supporting content, and padded bottom microcopy inside the viewport.
- Added narrow-screen sizing and positioning adjustments; no additional image or product layer introduced.
- Verified `npm run lint` and `npm run build`; Playwright was not run.

## 2026-09-23 - Final full-bleed homepage hero

- Replaced the prior salt-flat plus layered-vial hero treatment with `public/images/header.png` as the single full-screen homepage background; removed the extra vial layer and split composition.
- Positioned the existing announcement messaging and transparent navigation over the homepage image while preserving normal header behavior on other routes.
- Preserved all existing hero copy and interactions; verified `npm run lint` and `npm run build`.

## 2026-09-23 - Homepage hero editorial composition

- Reworked only the homepage hero into a full-bleed `hero-salt-flats.png` salt-flat scene with selectable HTML copy and the existing Salt N’ Pep vial layered as a large angled foreground product image.
- Preserved the announcement bar, navigation, existing hero wording, CTA, research index, and study caption; added responsive mobile positioning without changing downstream homepage sections.
- Verified `npm run lint` and `npm run build`; Playwright was not run per request.

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
