# Decisions

## 2026-10-04: Remove reviews mentioning demo

The owner requested removal of any review containing "demo." Remove the entire matching record, checking every text field case-insensitively, and recompute product totals. This removes 59 of the 259 imported records, leaving 200 unchanged reviews. This supersedes retaining the complete original import; original dates on retained reviews remain hidden pending owner corrections.

## 2026-10-04: Limited sold-out size alternatives

The owner's follow-up requests one or two additional sizes for every current compound, labeled Sold out. This supersedes the single-size-only public display below. Show two alternatives for BPC-157, retatrutide, TB-500, MOTS-c, and Pinealon, and one for MT-2, Epitalon, and GHK-Cu: 13 sold-out alternatives alongside eight current sizes. MT-2 5 mg is an unavailable display addition, not part of the earlier supplier snapshot or a claim of stock. Keep the other 11 reference sizes hidden. The shared storefront variant helper controls cards and selectors without changing checkout's full size definitions.

Preserve the owner's current stock selections and approved original pricing. BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg remain Pricing pending until the owner confirms prices and tiers. Sold-out choices remain inspectable with purchase disabled and quantity prices hidden. Cart restoration and authoritative pricing reject every unavailable size without substitution.

## 2026-10-04: Current sizes only for the test run

The owner wants the test-run catalog to show only sizes currently carried, removing the extra sizes and empty-stock appearance. Show one size per compound: BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, MOTS-c 20 mg, and the original catalog sizes for MT-2 (10 mg), Pinealon (10 mg), Epitalon (10 mg), and GHK-Cu (50 mg). This supersedes the earlier instruction to display the supplier's entire range and sold-out size lists. The separate Coming soon compound previews remain as requested.

Keep the 31 supplier reference definitions internally; offer only the eight current sizes and mark all 23 other sizes unavailable. Collection cards and product selectors hide those extras. Cart restoration and authoritative pricing continue to reject them without substituting a size. Keep original prices/bulk tiers for the four unchanged compounds; the four owner-selected sizes remain Pricing pending until prices are approved.

## 2026-10-04: Owner-selected stock sizes

The owner sells only BPC-157 10 mg, retatrutide 30 mg, TB-500 10 mg, and MOTS-c 20 mg among those four compounds' listed sizes. Mark their other 19 sizes Sold out. Keep stock separate from pricing: the previous instruction to await new-size prices still applies, and the four available sizes remain Pricing pending until the owner supplies prices or explicitly approves transferring existing prices and bulk tiers. The other four compounds retain existing availability/pricing. This supersedes the earlier pending-only status of these 19 sizes.

Default collection cards, carousel details, and selectors to an available size. Sold-out choices stay visible and selectable for inspection, with ordering disabled. Reject sold-out lines in browser cart creation, saved-cart restoration, the checkout demo, and authoritative API pricing. Legacy requests without size IDs still resolve to their original size; drop/reject a sold-out line rather than silently substituting a new vial size. Preserve immutable existing order snapshots.

## 2026-10-04: Required entry confirmation

The owner requested entry confirmation of being over 21 and understanding that these are research compounds. Require both unchecked statements before any storefront route becomes interactive. Remember acceptance for the current tab session, including navigation and reloads; ask again in a fresh session. When browser storage is unavailable, keep acceptance in memory during app navigation. Preserve static export by rendering the form and inert storefront in initial HTML, then using a native modal for keyboard and background interaction control. See `SITE_ENTRY.md` for behavior and verification.

## 2026-10-04: Peptaura size ranges with owner pricing

The owner requested the Peptaura size range for each of the eight currently sold compounds and will provide new-size prices later. Keep the original size prices and bulk tiers, and display all 23 additional sizes as Pricing pending. Pending sizes are selectable for inspection, with quantity prices hidden and purchase disabled. Never infer prices from milligrams or import marketplace prices. Source links and the October 4 snapshot of 31 sizes are in `PRODUCT_SIZES.md`; Peptaura's multi-vendor listing does not establish owner inventory or batch coverage.

Use compound-and-size identity in cart lines, storage, checkout requests, order snapshots, and payment descriptions. Omitted size IDs in old carts/requests resolve to the original catalog size; explicit invalid IDs never fall back to that price. Reject unpriced, unknown, and duplicate compound/size requests at the API with actionable client errors. Keep the 20 upcoming compound previews separate. Existing lab reports remain scoped to their tested samples rather than all sizes.

## 2026-10-04: Coming soon collection previews

The owner requested more collection options using Aurum Peptide Labs' catalog. Add the 20 missing entries as Coming soon previews with search/category/availability filtering. Keep upcoming records separate from the purchasable catalog so they do not enter the cart, checkout pricing, homepage carousel, or product routes. Show neutral placeholders until owner images are supplied; leave pricing and specifications unset. Source names, overlap mapping, and launch requirements are recorded in `UPCOMING_COLLECTION.md`.

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

## 2026-10-04: Compound relevance before publication

The owner rejected broad unregulated-peptide articles as weak reasons to populate individual compound collections. This supersedes automatic publication of every PubMed name/alias match. Keep complete raw searches locally, then publish title-focused compound papers and explicitly source-reviewed exceptions. General peptide policy/commentary, incidental mentions, unrelated longer amino-acid sequences, and non-biomedical uses do not qualify automatically. Ambiguous preparations require review: free GHK is not GHK-Cu, and parent/engineered thymosin beta4 is not proof about a TB-500 fragment.

Use one shared screening module and a versioned inclusion/exclusion policy for both online and cached refreshes. Display a relevance reason per paper and the selected/raw counts, preserving broader search links and source-check dates. Apply the same criteria to benefit, negative, safety, and analytical findings; retain compound-specific case reports even when their titles mention unregulated use. Title relevance is not study quality, and unmatched broader titles may contain relevant research awaiting review. Never describe the selected collection as all literature or an evidence-quality assessment. Preserve the 124 detailed explanations and indexing notices.

## 2026-10-04: A reading page for every selected publication

The owner requested clicking any study to reach a conclusion or summary. Export a `/science/[slug]/[pmid]` reader for every relevance-selected entry, using the full existing explanation when one is available. Other readers provide a short exact abstract quotation and direct full-source link, rather than inferred medical conclusions. Cap quotes at 25 words, identify the source section and sentence position, and mark truncated sentences. Only explicit conclusion/interpretation headings qualify for the conclusion label. Missing abstracts and excerpts requiring source review remain transparent; withdrawal and retraction status must be prominent.

Generate quotations reproducibly from the privately cached sources during bibliography refresh, preserving the source-check date and full-abstract fingerprint. Source-reviewed passage exceptions must still match the original text or refresh fails. Keep browse state in the URL so search, filters, page, reading view, and expanded PMID/PMCID notes survive the reader round trip. Full abstracts remain outside the public snapshot, and the reader never bypasses the compound relevance selection.
