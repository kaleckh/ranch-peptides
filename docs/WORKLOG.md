# Worklog

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
