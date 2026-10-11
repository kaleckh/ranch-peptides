# Worklog

## 2026-10-10 - Five-vial mobile carousel

- Restored the larger mobile center vial and the previous adjacent-vial size and positions. Added the two small, blurred, faded outer vials at the edges without changing the mobile stage height or product-details layout.
- Kept the desktop carousel rules, all eight products, image assets, swipe handling, navigation controls, and animated centering behavior unchanged.
- Validation: browser checks at 320, 375, 390, and 430 px confirmed all five positions are visible with no horizontal page overflow; 1280 px desktop computed styles remain on the original desktop rules.

## 2026-10-07 - Removed carousel shadow and spotlight experiment

- Removed the measured center-vial floor shadow, stage-level shadow layer, resize observer, and center-only spotlight treatment.
- Preserved the existing full-screen carousel geometry, vial artwork, navigation, transitions, and responsive behavior unchanged.
- Validation: ESLint and production build passed; all 1,474 static pages generated successfully, and the final source diff passed whitespace checks.

## 2026-10-07 - Realistic floor-projected carousel shadows

- Reworked the active, adjacent, and outer vial shadows into layered ground-plane ellipses with visible separation from the bottle, warm brown-gray lighting, subtle reflections, and natural fade edges.
- Preserved the existing carousel geometry, vial artwork, sizing, navigation, transitions, and responsive behavior while synchronizing each shadow stack with its corresponding vial.
- Validation: ESLint and production build passed; all 1,474 static pages generated successfully. The final source diff passed whitespace checks, and the floor layer is positioned behind the stage with exact shared horizontal offsets for all five visible shadow states.
- Final browser screenshot verification remains blocked by the site-entry gate in the local automation environment; the application-level consent flow and temporary automation probes did not expose the carousel.

## 2026-10-07 - Refined compact floor shadows

- Replaced the broad blurred shadow stack with compact, layered radial-gradient ellipses using a darker center and warm charcoal-brown ambient falloff.
- Anchored every shadow to the actual bottom floor plane, retained the existing shared horizontal offsets and carousel transforms, and kept the shadow layer behind the vial images and all foreground content.
- Preserved the center, immediate adjacent, and outer visual hierarchy while keeping the existing responsive layout and carousel behavior unchanged.
- Validation: lint, production build, and diff whitespace checks passed. The static preview rendered the desktop carousel and shadow layer, but automated mobile inspection remained blocked by the site-entry gate's inconsistent hydration behavior after reload; the gate is unrelated to this CSS change.

## 2026-10-05 - Full-screen peptide hero carousel

- Replaced the homepage hero's compact carousel shell with a full-viewport, edge-to-edge desktop/mobile background while preserving the existing header, navigation, Bag, product data, routes, Collection, Research, and footer.
- Reused all eight shared product records and existing vial assets. The active vial is largest and sharpest, neighboring vials fade and blur progressively, and non-active vials select into the center before their existing product route is opened.
- Added responsive desktop/mobile background sources, floating vial framing, soft contact shadows, smooth cover-flow motion, arrows, dots, keyboard navigation, horizontal drag/swipe, reduced-motion support, and existing product metadata beneath the carousel.
- Preserved the existing thin header divider and left the remainder of the site unchanged.
- Validation: lint and production build passed. All eight product routes and static pages generated successfully.

## 2026-10-06 - Isolated homepage vial artwork

- Updated the homepage carousel to use the standalone vial assets from `public/images/vials` for all eight products. The root-level product photography remains unchanged for Collection cards and product detail pages.
- Kept the standalone asset selection limited to the homepage carousel; no Collection image references or shared ProductVial behavior were changed.
- Validation: lint and production build pass; the live homepage returns HTTP 200 with all eight standalone vial image routes available.

## 2026-10-04 - Removed reviews mentioning demo

- Removed all 59 complete review records containing "demo" in any text field, case-insensitively, and recomputed product counts. The 200 retained records remain unchanged: BPC-157 51, retatrutide 56, TB-500 46, and MOTS-c 47. Original dates remain hidden pending owner corrections.
- Validation: lint and production build (1,474 static routes) passed. Six Chromium check groups verified all 200 retained reviews across every page, rating filters/totals, averages, absence of removed records from exported HTML and client payloads, and 390px/320px layouts without overflow or page errors. The 320px review layout was visually checked. Evidence is in ignored `data/demo-review-*` and `data/check-demo-review-removal.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157#customer-reviews. Concurrent limited-size changes were preserved and excluded from this commit; no push or deployment for this package.

## 2026-10-04 - Required age and research entry confirmation

- Added a sitewide entry form requiring both I am over the age of 21 and I understand that these are research compounds. Both start unchecked, and Enter site is disabled until both are checked. Confirmation is retained for the current tab session, with an in-memory fallback when storage is unavailable.
- Wrapped the shared storefront in `SiteEntryGate`, including direct route visits and pre-hydration static HTML. The native modal prevents Escape/backdrop dismissal, blocks background interaction and scrolling, starts focus on the first checkbox, and restores focus to main content after entry. Matched the ivory/charcoal palette and supported narrow and short screens.
- Validation: full lint, production build, scoped whitespace checks, and Chromium checks passed at 1440×900, 768×900, 390×844, 320×568, and 667×375. Verified required states, keyboard focus, dismissal prevention, viewport fit, persistence/reload, fresh direct routes, unavailable storage, reduced motion, static HTML, and cart controls. Desktop, small-phone, and short-screen layouts were visually inspected. Missing Next.js segment-prefetch files produced separately recorded local-preview 404s; navigation and reload checks passed. Evidence is in ignored `data/site-entry-gate-*` and `data/check-site-entry-gate.mjs`.
- Local preview: http://127.0.0.1:3016/. Policy and implementation notes are in `docs/SITE_ENTRY.md`. Concurrent size and research work was preserved; no push or deployment.

## 2026-10-04 - Peptaura size options with pending pricing

- Added 31 size options across the eight currently sold compounds using Peptaura's catalog dose filters; the 23 new sizes show Pricing pending. Preserved original prices and every bulk tier. Collection cards list ranges; product selectors separate milligrams per vial from vial quantity, reset quantity after size changes, and disable ordering for pending sizes. Lab-report copy scopes results to tested samples. Sources and future pricing instructions are in `docs/PRODUCT_SIZES.md`.
- Added compound-and-size cart identity, persisted size IDs, legacy-cart migration, checkout size labels, canonical server pricing, and size-bearing order/payment descriptions. Browser cart creation, restoration, demo checkout, and API pricing reject unpriced or invalid sizes. Independent review found new validation messages were returning HTTP 500; changed them to actionable HTTP 400 responses and covered all three cases with zero stored orders.
- Validation: seven checkout/pricing tests, full lint, production build, and Chromium checks passed. Verified all 31 options and 23 pending states, existing quantity prices, keyboard selection, quantity reset, cart updates/removal, checkout labels/totals, persistence, legacy-cart migration, tampered storage, and 1440px/768px/390px/320px layouts without overflow or page errors. Visually inspected desktop pending, mobile priced, and collection screenshots. All ten Retatrutide dose filters also had vial listings. Evidence is in ignored `data/product-size-checks.json`, `data/check-product-sizes.mjs`, `data/sizes-*`, and `data/peptaura-reta-formats.json`.
- Local preview: http://127.0.0.1:3016/products. No push or deployment. Concurrent research and site-entry work is preserved and excluded from this package; owner prices remain pending.

## 2026-10-04 - Persistent filled-bag highlight

- Highlighted the header Bag with a warm-gold pill and charcoal count whenever it contains items. The highlight follows the persisted cart across navigation and reloads, and clears when the last item is removed or the cart is cleared. Existing add-to-cart sparks and count pulses remain; reduced motion keeps the static highlight.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified empty/full states, navigation, reload, removal, clearing, keyboard focus, reduced motion, no layout shift or overflow, and repeat-add spark behavior. Screenshots and checks are in ignored `data/cart-highlight-*`, `data/check-cart-highlight.mjs`, and `data/check-cart-spark.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157. No push or deployment.

## 2026-10-04 - Coming soon collection additions

- Added 20 missing names from the owner's Aurum catalog reference, bringing the collection to eight current products and 20 Coming soon previews. Each preview has a charcoal banner and neutral image placeholder; prices, specifications, launch dates, links, and purchase controls are omitted. Added availability filtering alongside search and categories. Existing products remain first; upcoming data is excluded from cart/checkout lookup and the homepage carousel. Source names and overlap/naming decisions are in `docs/UPCOMING_COLLECTION.md`.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified all 20 names/banners, DAC variants, search/alias/category/availability filters, empty/reset states, keyboard navigation, current product links/images, unchanged homepage, no overflow or page errors, and exclusion from purchasable lookup. Screenshots and checks are in ignored `data/upcoming-collection-*` and `data/check-upcoming-collection.mjs`.
- Local preview: http://127.0.0.1:3016/products. Committed locally; no push or deployment. Concurrent research work preserved and excluded from this package.

## 2026-10-04 - Header cart spark feedback

- Added a brief warm-gold spark and count pulse to the top-right Bag after each Add to Cart click. A session-only addition counter replays the animation for repeated clicks; cart restoration, quantity edits, removal, and clearing do not trigger it. Decorative sparks ignore pointer events and assistive technology; reduced motion disables the animation.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. Verified quick repeat clicks, bundle quantities, animation completion, no horizontal overflow or page errors, drawer focus/Escape return, persistence without false feedback, and reduced motion. Screenshots and checks are in ignored `data/cart-spark-*` and `data/check-cart-spark.mjs`.
- Local preview: http://127.0.0.1:3016/products/bpc-157. No push or deployment; concurrent customer-review work preserved.

## 2026-10-04 - Isolated peptide collection images

- Removed the rocks and studio backgrounds from all eight collection photos using transparent vial cutouts. Collection cards display the full vial on ivory; the homepage carousel and product detail photos retain their original imagery. Asset references and exact generation prompt are recorded in `docs/COLLECTION_IMAGES.md`.
- Validation: full lint, production build (26 static routes), and Chromium checks at 1440px, 768px, 390px, and 320px passed. All eight cutouts load with transparency and contain sizing; search, category filtering, keyboard product navigation, and no horizontal overflow passed. Desktop/mobile screenshots and the verification script are in ignored `data/collection-cutouts-*` and `data/check-collection-cutouts.mjs`.
- Local collection preview: http://127.0.0.1:3016/products. No push or deployment; concurrent research changes preserved and excluded from this package.

## 2026-10-03 - Clickable compound study pages

- Made each research-library card open its compound study page and linked product scientific-review sections directly to the matching page. Added all eight static routes with the existing model, findings, limitations, citation, original publication link, and library return navigation.
- Kept the library concise with topic/model/publication summaries and preserved search and evidence/compound filters. Each compound currently has one selected primary paper; no new scientific claims or papers were added.
- Validation: lint, production build (26 static routes), exported-content checks for all eight pages and library/product/source/return links, and diff whitespace checks passed. Browser connection became unavailable before visual QA; desktop/mobile review remains pending. No deployment.
## 2026-10-03 - Research library browsing cleanup

- Pulled master with fast-forward only; already up to date. Replaced the large editorial hero, reading-room panel, and repeated library heading with a compact heading and immediate search/compound/evidence filters. Simplified paper typography and ivory cards while preserving every finding, limitation, model, citation, and source link.
- Moved the evidence-reading guide into a keyboard-accessible disclosure below the papers and reduced the scope section to readable footer notes. Search also matches author, journal, and year; reset clears all three filters.
- Validation: lint, production build (18 static routes), and diff whitespace checks passed. Browser verified human (2), preclinical (6), compound (1), tendon search (1), empty/reset (0 then 8), and keyboard guide expansion. Desktop, 390px, and 320px layouts checked with no horizontal overflow. Screenshot: data/research-library.jpg. Preview remains open on /science; not deployed.

## 2026-10-03 - Lighter collection browsing

- Removed the catalog banner/photo in favor of a compact heading above existing search and category filters. Simplified shared catalog/homepage cards to product photography with concise name, price, dosage, and category on ivory; removed dark panels, duplicate arrows, and View compound links.
- Kept full-card product navigation, accessible names, visible focus/hover feedback, and reduced-motion handling. Updated current project/design docs to supersede the dense dark-card direction.
- Validation: lint, production build (18 routes), desktop/mobile visual checks, search (1 BPC result), category (2 Recovery & Repair results), and keyboard Enter navigation to BPC-157 passed. 320px and 390px viewport overrides showed no horizontal overflow. Screenshot: data/catalog-light.jpg. Local preview remains open; not deployed.

## 2026-10-03 - Compact collection intro

- Reduced the desktop collection banner from 360px to 190px, narrowed its brand photo, and tightened page/search spacing so products appear sooner.
- Kept a compact side-by-side heading/photo on mobile with a 132px minimum height and updated responsive image sizes.
- Validation: lint, production build (18 routes), and diff whitespace checks passed. Chrome desktop and 390px mobile visually checked; 320px and 390px overrides showed no horizontal overflow. Local screenshot: data/catalog-compact.jpg. Preview remains open on /products; not deployed.

## 2026-10-03 - Local checkout UX demo

- Pulled master with fast-forward only; already up to date. Added `checkout:preview` on loopback port 3015 with no credentials or payment API required.
- Added labeled demo submission, sample details, approval/rejection and successful/failed payment controls. Demo data uses separate browser storage and discards contact/address/research details; development and localhost guards prevent production activation.
- Validation: lint, production build (18 routes), five payment API tests, and demo card/Venmo state/retry/privacy/localhost checks passed. Chrome verified bag -> sample submission -> review -> approval -> payment failure -> confirmation; checkout screenshot saved locally and 390px layout showed no horizontal overflow. Next dev refreshed its generated AGENTS guidance. Provider test checkout remains deferred until owner supplies credentials after UX review.

## 2026-10-03 - Reviewed checkout and payment foundation

- Pulled master through 1ec2a6d. Added checkout/research review, persistent cart and per-order access, hosted Stripe payment, verified manual Venmo business payment, and private status/recovery pages in the existing ivory/charcoal design.
- Preserved static export; added a separate Node 24 SQLite API and local staff CLI with immutable catalog pricing, idempotent requests, hashed order tokens, audit records, matching signed webhook verification, and unique Venmo transaction tracking. Live checkout remains disabled by default. Setup, single-instance deployment, and operational limits are in CHECKOUT.md with example environments.
- Independent payment review identified duplicate Venmo confirmation, lost browser access, and proxy rate limiting; addressed all three with regression checks. Updated Next.js/ESLint config to 16.3.8 and applied compatible dependency fixes. Production dependency audit is clean; five high development-only findings remain in the ESLint glob dependency chain (audit proposes a breaking downgrade).
- Validation: lint, five pricing/access/review/payment/proxy tests, production build (18 static routes), staff CLI help, and diff whitespace checks passed. No connected browser was available for visual QA, no real provider test checkout was performed, and no live payment/deployment occurred.
- Pending owner setup: merchant approval/credentials, authorized Venmo handle, shipping price/states, support email and tax policy; pending launch checks include inventory-matched batch evidence, research verification, stock/shipping/refunds, provider test-mode payment and desktop/mobile visual review.

## 2026-09-28 - Resources image overlay containment

- Made `resources new.png` an absolute full-section image layer in a native-aspect-ratio container, with the CTA and research disclaimer overlaid inside it.
- Verified overlay containment and no horizontal overflow at desktop and mobile sizes; `npm run lint`, `npm run build`, and `git diff --check` pass.

## 2026-09-28 - Resources section disclaimer hierarchy

- Added the exact research-only disclaimer below the existing VIEW RESEARCH CTA on the Resources artwork and removed the separate Purpose/research-only section.
- Kept baked-in image copy untouched and retained the image's natural aspect ratio and existing CTA styling.
- Verified `npm run lint`, `npm run build`, and desktop/mobile section bounds.

## 2026-09-28 - Resources section image refresh

- Replaced the Resources section image with `resources new.png`; its native dimensions match the prior asset, so existing natural-ratio sizing and CTA placement remain unchanged.
- Retained the single “VIEW RESEARCH” link to `/science` and all baked-in image text.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Homepage research artwork section

- Replaced only the “Curiosity is in our nature” section with `studies.png` at its natural 1905:825 aspect ratio and one `/science` CTA positioned beneath the baked-in left copy.
- Verified responsive image/CTA bounds at 1440x900, 390x844, 375x667, and 430x932 with no overflow; `npm run lint` and `npm run build` pass.

## 2026-09-28 - Collection intro copy refinement

- Changed the Collection intro eyebrow to “THE COLLECTION” and headline to “Research Compounds”; reduced the headline size while preserving its existing layout and supporting copy.
- Verified `npm run lint` and `npm run build`.

## 2026-09-28 - Collection card numbering removed

- Removed the `SNP / 01`-style labels from shared product cards and kept dosage badges aligned at the upper-right.
- Verified `npm run lint`.

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

## 2026-10-03 - Faster research preview and expanded study lists

- Pulled master with --ff-only; already up to date. Added 18 primary papers verified through PubMed metadata/abstracts and selected full texts, bringing the curated library to 26 across eight compound pages. Lists have newest-first paper navigation, findings, limitations, and source links; index and product links show actual counts. Human observations and related thymosin beta4 evidence remain explicitly labeled.
- Added npm run preview for the loopback-only built export on port 3016, avoiding first-route development compilation. Kept the credential-free checkout demo on port 3015 and its development-only guard intact.
- Full lint and production build passed. Export audit verified all 26 paper records across eight pages; preview-server test checked HTML/RSC/assets, HEAD, 404, malformed paths, traversal rejection, and method restrictions. Local HTML fetches took 3–78 ms (server response measurements, not full browser paint). Desktop Chrome verified search, human evidence filtering, compound navigation, and rendering without observed console errors. Mobile visual review remains pending.
- Built UX preview running at http://127.0.0.1:3016/science. Further curation is possible; this is not comprehensive coverage. No deployment, push, or live payment configuration.


## 2026-10-04 - Research library expanded to 106 papers

- Pulled master with --ff-only; already up to date. Added 80 primary papers (10 per compound), verified against PubMed metadata and abstracts, bringing the library to 106: 14 each for BPC-157 and retatrutide, 13 each for TB-500, MT-2, MOTS-c, Pinealon, Epitalon, and GHK-Cu. Included negative findings and adverse-event reports alongside positive results; summaries preserve model and study limitations.
- Replaced long duplicated jump lists and full notes with compact newest-first native disclosures. All findings, limitations, and source links are statically rendered, so opening a study needs no fetch. Distinct labels identify observational reports, case reports, trial analyses, laboratory studies, and related full-length thymosin beta4 evidence. Paper counts can include analyses of the same trial.
- Validation: lint, production build (26 routes), all 106 exported citations/notes/source links and eight library/product/return paths, static preview server tests, and diff whitespace checks passed. Desktop Chrome verified compound navigation and immediate disclosure expansion/collapse by mouse and keyboard; 320px and 390px notes and 320px library showed no horizontal overflow.
- Local built preview: http://127.0.0.1:3016/science. Coverage remains curated rather than comprehensive. No deployment, push, or payment configuration.


## 2026-10-04 - More papers and topic-led study cards

- Pulled master with --ff-only; already up to date. Added 18 verified PubMed primary papers: six BPC-157 and two each for retatrutide, TB-500-related thymosin beta4, MT-2, MOTS-c, Epitalon, and GHK-Cu. Total 124: BPC-157 20, retatrutide 16, Pinealon 13, and 15 each for the other compounds. Included case reports and laboratory research with explicit model and evidence labels.
- Replaced narrow bibliography rows with wider topic-led cards, two columns on desktop and one on mobile. Opening a card shows full-width findings and limitations with original sources immediately, using static native disclosures. Library eyebrows use a stable Selected research label.
- Validation: lint, production build (26 routes), exported research audit (124 citations across eight pages), preview server test, and diff whitespace check passed. Chrome verified mouse opening, Enter collapse, full-width notes, and 390px/320px mobile layouts without horizontal overflow. Desktop proof saved to ignored data/research-cards-desktop.png.
- Built review preview remains http://127.0.0.1:3016/science/bpc-157. No push or deployment. Concurrent homepage/header edits preserved and excluded from this package.

## 2026-10-04 - Clean product-photo homepage

- Replaced the rejected chrome-molecule sunset artwork with the existing owner-supplied branded vial, shown at its full portrait ratio. Added a live HTML tagline and collection CTA on ivory; restored the shared wordmark/navigation and one readable delivery banner across desktop and mobile. Owner selected clean product photography.
- Validation: full lint, production build (26 routes), and scoped diff whitespace check passed. Chromium verified 1440px, 390px and 320px layouts, image loading, no horizontal overflow or page errors, collection navigation, mobile research navigation, and cart open/Escape close. Screenshots are in ignored `.next/home-hero-{1440,390,320}.png`.
- Built homepage preview: http://127.0.0.1:3016/. Owner aesthetic review pending; no push or deployment. Concurrent research work preserved and excluded from this package.

## 2026-10-04 - Clearer study summaries and expanded reading notes

- Made the main finding visible on every one of the 124 study cards and moved publication titles into a dedicated source section. Expanded cards explain the evidence type, study model, and limitations while preserving native keyboard-accessible disclosures and the ivory design.
- Added primary-source-verified study setup, measurements, and results context for 16 papers, two per compound, in `src/lib/research-reading.ts`. Checked PubMed abstracts and the Pinealon PMC source; explained selected scientific terms and preserved the distinction between human observations, animal/cell experiments, trial analyses, and related thymosin beta4 evidence. No dosing guidance or new papers.
- Validation: lint, production build (26 static routes), export audit of all 124 citations and 16 expanded notes, and scoped diff whitespace check passed. Chromium checked visible findings, search/navigation, full-width desktop notes, Enter/Space controls, source links, and all eight study pages at 390px/320px with no horizontal overflow or page errors. Desktop and mobile screenshots are in ignored `data/research-reading-*.png`.
- Local review: http://127.0.0.1:3016/science. No push or deployment. Concurrent homepage/carousel changes preserved and excluded from this package.

## 2026-10-04 - Main homepage peptide carousel

- Replaced the single portrait hero with an eight-compound carousel in the main homepage image position, following the owner's Aurum reference composition. A large active product photo is flanked by smaller neighbors; names, catalog quantities/categories/prices, and product links update together. Kept ivory/charcoal styling, navigation, delivery banner, illustrative-photo labeling, and research-only copy. Removed the lower repeated peptide section at the owner's request.
- Added looping arrows, named slide selectors, keyboard arrows/Home/End, mouse drag and touch swipe. Hidden slides are excluded from assistive technology, manual changes announce the active compound, and reduced-motion preferences disable transitions. Server-rendered product content keeps catalog notes out of the carousel client module.
- Validation: lint and production build passed (26 static routes). Chromium checked all eight slides and matching links, wrapping, selectors, keyboard navigation, and drag at 1440px, 1024px, 760px, 600px, 390px, and 320px, with no page errors or horizontal overflow. Touch swipe, reduced motion, and product navigation passed. Screenshots and the verification script are in ignored `data/home-hero-carousel-*` and `data/check-home-hero-carousel.mjs`.
- Local homepage preview: http://127.0.0.1:3016/. Owner aesthetic review pending; no push or deployment. Concurrent research changes were committed separately and preserved.

## 2026-10-04 - Complete PubMed search collections and detailed explanations

- Expanded the library to every result in the eight documented PubMed compound/name/alias searches through October 4, 2026: 2,606 compound/publication matches and 2,575 unique PMIDs. Added separate indexed-publication and explained-study views, search, publication/year filters, sorting, and pagination that reaches every record. Search scope, dates, original sources, and correction/retraction notices remain visible; records include reviews and notices, and counts do not represent independent trials. Online-first papers can carry a later journal issue year.
- Added source-backed study setup, measurements, and results context for the remaining 108 selected papers, bringing detailed explanations to all 124 selected records. Independent source review verified the notes and catalog against primary abstracts and metadata; resolved mixed letter/case-report classifications and clarified the BPC-157 vascular finding. Added a reproducible full-search refresh script; raw abstracts stay in ignored local data rather than the published site.
- Validation: lint, production build (26 routes), export audit of all 2,606 matches and 124 explanations, and browser checks passed. Chromium verified search/query forwarding, filters, sorting, last-page records for all eight compounds, warnings, explanation links/deep links, Enter/Space disclosures, full-width desktop notes, and 390px/320px layouts without overflow or page errors. Screenshots and browser verification are in ignored `data/research-catalog-*` and `data/check-research-catalog.mjs`.
- Built preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent product/vial changes preserved and excluded from this package.

## 2026-10-04 - Imported customer reviews

- Added all 259 owner-supplied reviews unchanged: BPC-157 68, retatrutide 71, TB-500 58, and MOTS-c 62. Product sections show average ratings, rating filters, six reviews per page, author/location, and the supplied unverified status. The other four products retain their empty state. Original dates stay in the import but are omitted from public data and display until the owner supplies corrections.
- Validation: full lint, production build (26 static routes), and Chromium checks passed. Every review matched its source record and product; all pagination, rating filters, keyboard controls, and 1440px/768px/390px/320px layouts passed without overflow or page errors. Evidence is in ignored `data/customer-reviews-checks.json` and `data/customer-reviews-*.png`.
- Local preview: http://127.0.0.1:3016/products/bpc-157#customer-reviews. No push or deployment. Existing collection-image worklog changes preserved and excluded from this package.

## 2026-10-04 - Compound relevance screening

- Replaced automatic publication of every PubMed match with a shared conservative relevance gate: compound-focused titles plus explicit source-reviewed exceptions. Removed broad unregulated-peptide/compounding commentary, incidental mentions, unrelated peptide sequences, free-GHK-only papers, and non-biomedical applications. Retained direct safety cases, negative findings, preparation analyses, focused reviews, and indexing notices under the same criteria as benefit findings.
- The selected snapshot contains 1,448 entries (1,444 unique PMIDs) from 2,606 raw matches, including 113 source-reviewed inclusions. All 124 detailed explanations remain. Every paper shows Why included; pages disclose selection scope, raw counts, original search dates, and broader PubMed links. Relevance selection is not study-quality assessment or exhaustive coverage. Cached refreshes preserve the source-check date, and online refreshes re-fetch notices and fail on incomplete searches.
- Independent relevance/source review corrected preparation/model wording, restored six genuine original research letters, and excluded an unrelated GHK-Cu chemical-sensing application. Metadata-only records retain restrained design descriptions and missing-abstract disclosures. Review finished with no remaining actionable findings.
- Validation: 10 screening regressions, full lint, production build (26 static routes), and export audit passed. Chromium verified excluded-source search, inclusion reasons, real safety/negative records, filters, sorting, every compound's final page, explanation deep links and keyboard controls, and 320px/390px layouts without overflow or page errors. Desktop/mobile and expanded-note screenshots visually checked; evidence is in ignored data/research-catalog-* and data/check-research-catalog.mjs.
- Local preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent Coming soon collection package remains separately committed.

## 2026-10-04 - Individual study readers

- Added static reading pages for all 1,448 relevance-selected compound/publication entries. Every title and Read summary link opens a finding-first reader: all 124 curated papers retain detailed findings, methods, measurements, results context, and limitations; other papers show a labeled short source quotation or an honest missing/review-required abstract state. Full-source links, inclusion reasons, and correction/retraction notices remain visible.
- Added reproducible 25-word excerpt selection with source fingerprints, explicit conclusion-only labeling, shortened-sentence disclosure, and source-checked exceptions for malformed/generic endings and withdrawal status. Full abstracts stay in ignored local data. Readers cannot bypass the relevance gate. URL browse state preserves search, type, year, sort, page, view, and expanded PMID/PMCID note through reader links, return links, and browser Back.
- Independent review found and resolved bibliographic boilerplate excerpts, lost browse state, and a PMCID return anchor. Validation: 10 excerpt regressions, full lint, production build (1,474 static routes), and export audit of all 1,448 readers/124 explanations/1,404 unique short excerpts passed; excerpts exactly match cached abstracts and source fingerprints. Chromium passed six browser check groups, including keyboard navigation, source anchors, detailed/missing/retracted/safety readers, wrong-collection 404, preserved filters/pagination and PMID/PMCID disclosures, and all eight compounds at 320px/390px without overflow or page errors. Desktop/mobile screenshots visually checked. Browser evidence is in ignored `data/check-study-readers.mjs`, `data/study-reader-checks.json`, and `data/study-reader-*.png`; the existing library browser regression also passed.
- Local preview: http://127.0.0.1:3016/science. No push or deployment. Concurrent bag, size-option, and entry-confirmation packages were preserved in their separate commits.

## 2026-10-04 - Owner-selected stock sizes

- Limited BPC-157 to 10 mg, retatrutide to 30 mg, TB-500 to 10 mg, and MOTS-c to 20 mg; their other 19 sizes now show Sold out. Collection, carousel, and selectors default to the available sizes. Sold-out choices remain inspectable with quantity prices hidden and purchase disabled. Browser cart, saved-cart restoration, demo, and authoritative HTTP checkout reject sold-out sizes without substituting a different size; existing order snapshots remain unchanged.
- Stock is independent of pricing. The four selected sizes remain Pricing pending under the prior owner instruction to supply new-size prices later. Asked whether existing product prices and bulk tiers should transfer; answer is pending. The other four compounds retain their original priced/orderable sizes.
- Validation: lint, seven checkout regressions, production build (1,474 static routes), and 13 browser check groups passed. Browser checks covered all 31 options/19 sold-out sizes, original bulk tiers, keyboard selection, cart/checkout totals, saved-line removal, collection/home defaults, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px selector screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/product-stock-checks.json`, `data/check-product-stock.mjs`, `data/stock-*.log`, and `data/stock-*.png`.
- Local preview: http://127.0.0.1:3016/products. Owner authorized committing and pushing all completed site changes to GitHub; production deployment was not separately verified.

## 2026-10-04 - Homepage photo links and hover highlight

- Linked every visible homepage carousel photo to its matching peptide product page. Added subtle brightening, a pointer cursor, clearer neighboring-photo hover feedback, and keyboard focus on the active image. Ordinary clicks/taps navigate; horizontal drags/swipes retain carousel navigation and suppress accidental link activation.
- Validation: full lint and production build (1,474 static routes) passed. Twenty Chromium check groups covered all eight product links, all four neighboring photos, hover, keyboard navigation, mouse drags, native mobile taps/swipes, reduced motion, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop hover and 320px screenshots visually checked. Evidence is in ignored `data/home-image-links-*` and `data/check-home-image-links.mjs`; mobile gestures use realistic pacing to avoid synthetic-input click suppression.
- Local preview: http://127.0.0.1:3016/. Committed locally; no push or deployment for this package.

## 2026-10-04 - Current sizes only for the test run

- Simplified the eight current peptides to one carried size each and removed extra size choices and sold-out lists from the collection and purchase pages. BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg remain Pricing pending; MT-2 10 mg, Pinealon 10 mg, Epitalon 10 mg, and GHK-Cu 50 mg retain their original prices and bulk tiers. The 20 Coming soon compound previews remain. All 23 hidden sizes are unavailable to cart restoration and authoritative checkout; their reference definitions remain for future stock updates.
- Validation: lint, seven checkout regressions, and production build (1,474 static routes) passed. Thirteen Chromium check groups covered all eight single-size selectors, pricing controls, keyboard selection, cart/checkout totals, removal of stale hidden/pending lines, collection/home agreement, preserved photo links, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px purchase screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/check-test-run-sizes.mjs`, `data/test-run-sizes-checks.json`, and `data/test-run-sizes-*.log`/`*.png`.
- Local preview: http://127.0.0.1:3016/products. Committed locally; no push or deployment for this package.

## 2026-10-04 - Limited sold-out size alternatives

- Added one or two visible Sold out sizes for all eight current compounds, totaling 13 alternatives alongside the eight current sizes. Cards list the alternatives; product selectors allow inspection with quantity prices hidden and ordering disabled. MT-2 gains an unavailable 5 mg display option; other hidden supplier references remain unavailable. Current stock selections, approved prices, and bulk tiers are preserved; the four owner-selected sizes still await pricing approval.
- Validation: full lint, seven checkout regressions, production build (1,474 static routes), and 13 Chromium check groups passed. Checked all 21 public sizes/13 sold-out choices, current defaults, original bulk tiers, keyboard selection, $68.97 MT-2 cart/checkout total, removal of all 28 unavailable or unpriced saved lines, and 1440px/768px/390px/320px layouts without overflow or page errors. Desktop collection and 320px sold-out selector screenshots visually checked. Existing static-preview segment-prefetch 404s were recorded separately. Evidence is in ignored `data/check-limited-sizes.mjs`, `data/limited-sizes-checks.json`, and `data/limited-sizes-*.log`/`*.png`.
- Local preview: http://127.0.0.1:3016/products. GitHub push remains owner-authorized; production deployment is not separately verified. Concurrent customer-review and homepage work is preserved.
