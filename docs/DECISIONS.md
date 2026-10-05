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

## 2026-10-03: Expanded reading lists and built UX preview

The owner reported slow page loads and insufficient studies. Expand the curated list to 26 verified primary papers, with one index card per compound and newest-first reading lists with anchor navigation. Distinguish human observations from administration trials and related thymosin beta4 papers from TB-500 equivalence. Keep detailed notes on statically exported pages and send only search metadata to the client. Coverage remains explicitly curated rather than comprehensive.

First visits on the local development server were delayed by route compilation and static parameter generation. Use a loopback-only server for the built out/ export on port 3016 for UX review. Keep the development-only credential-free checkout demo on port 3015; do not enable demo behavior in production builds.


## 2026-10-04: Topic-led study cards

The owner rejected the narrow bibliography rows. Compound pages use a wider two-column desktop card grid, leading with a readable research topic, then model, year, evidence type, and original paper title. Native disclosures expand across the grid for findings, limitations, and source links already in static HTML; mobile uses one column. Extend coverage with verified primary papers without adding duplicate citations merely to equalize compound counts.

## 2026-10-04: Product carousel as the homepage hero

The owner wants to browse the peptides in the main homepage image, rather than a carousel below the hero, and supplied https://aurumpeptidelabs.com/ as a composition reference. Feature all eight compounds in a centered hero carousel with smaller neighboring product images, manual navigation, and a matching product link. Remove the lower repeated peptide section at the owner's request. Preserve SALT N’ PEP's ivory/charcoal identity, illustrative-photo labeling, and research-only positioning.

## 2026-10-04: Complete PubMed search index and explained studies

The owner requested both more papers beyond the 13–20 selected per compound and detailed explanations. Preserve the selected reading list and add a full date-bounded PubMed name/alias search index, with every result reachable through search, filters, sorting, and pagination. The current snapshot has 2,606 compound/publication matches (2,575 unique PMIDs); all 124 selected papers receive source-verified design, measurements, and results context. Distinguish indexed publications from editorial explanations, and never equate publication counts with independent trials or universal literature coverage.

Publish bibliographic/indexing metadata and original-source links, keeping downloaded abstracts in ignored local data. Disclose exact queries, cutoff, and collection date. Refresh all records so newly indexed corrections/retractions are included; fail instead of silently publishing incomplete searches. Retraction/correction notices take category priority, while mixed letter/case-report and letter/review records retain their substantive filter category. Preserve static export, native accessible disclosures, the current ivory design, and the parent thymosin beta4/TB-500 distinction.

## 2026-10-04: Owner-supplied static customer reviews

Import the owner's reviews JSON unchanged and match records to product slugs. Preserve author text, ratings, and verification status; use rating filters and six-record pagination within the existing ivory design. All 259 supplied reviews are unverified. The owner will provide corrected dates later, so retain original dates only in the source file and omit them from public page data and display. Keep customer accounts distinct from scientific evidence and preserve static export; new review submission remains a separate future workflow.
