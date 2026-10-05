# Project Context

SALT N’ PEP is a Next.js 16 App Router storefront-style site for research peptides. It presents an 8-product catalog, product detail pages, science/FAQ content, and a client-side cart drawer.

## Stack

- Next.js 16.3.8 with React 19; Node 24 for the separate checkout API
- TypeScript
- Tailwind CSS v4
- `next/image` with locally bundled product and brand photography across hero, catalog, and product pages
- Client-side cart state in `src/lib/cart-context.tsx`

## Current Design Direction

The active visual system follows the owner-provided SALT N’ PEP vial reference: warm ivory, charcoal, stone neutrals, restrained sans-serif typography with editorial serif italics, textured surfaces, and locally bundled brand imagery. Responsive layouts support 320px viewports.

## Common Commands

- Development: `npm run dev -- --webpack`
- Lint: `npm run lint`
- Build: `npm run build`
- Fast built UX preview: `npm run preview` at http://127.0.0.1:3016 (rebuild after edits)
- Research export audit, after building: `node --import tsx scripts/check-research.mjs`
- Refresh the date-bounded PubMed bibliography: `python scripts/refresh-research-catalog.py` (optional `--through YYYY-MM-DD`; rejects incomplete searches and re-fetches indexing notices)

Use `--webpack` for local development because the default Turbopack dev server has previously panicked on this Windows machine while serving the site.

## Current functionality

- Homepage's main hero is a centered carousel of all eight peptides, with a large active product photo and smaller neighboring photos. Arrows, slide selectors, horizontal swipes/drags, and keyboard arrows/Home/End change the featured compound; navigation loops through the collection. The active name, catalog quantity/category/price, and product link update together. Photos remain illustrative; the ivory navigation, delivery banner, live tagline, and research-only notice stay visible. Motion respects reduced-motion preferences. The research feature follows the hero; there is no second peptide section.
- Search and category filtering across eight compounds. The collection opens with a compact heading and filters; shared product cards use square product photography with names, prices, dosage, and category directly on ivory. Entire cards link to details with keyboard focus and hover feedback; duplicate arrows and card CTAs are removed.
- Cart supports quantity pricing, removal, focus trapping, Escape, focus return, and browser persistence. Each Add to Cart action briefly pulses the header Bag count and sparks around it; repeated additions replay the feedback, with animation disabled for reduced motion. Checkout submits orders for staff research review; approved requests offer hosted Stripe card checkout or manual Venmo business payment. A separate Node API prices from the catalog and stores immutable order snapshots in SQLite. Signed matching webhooks confirm cards; staff verify unique Venmo transactions. Live checkout is disabled by default. Setup and limitations: `docs/CHECKOUT.md`.
- Research library has two views: all indexed publications and explained studies. The October 4, 2026 snapshot contains all 2,606 matches from eight disclosed, date-bounded PubMed name/alias queries (2,575 unique PMIDs), including reviews, case reports, and notices. This is complete for those searches, not all databases or a systematic review. Compound pages provide 30-record pagination, title/topic/author/PMID search, publication-type/year filters, oldest/newest sorting, source links, and correction/retraction warnings. All 124 selected papers have source-verified study setup, measurements, results context, evidence explanations, and limitations in native static disclosures; main findings remain visible before expansion. Notes live in `src/lib/research-reading.ts` and `src/lib/research-reading-additions.ts`; bibliography metadata lives in `src/lib/research-catalog-data.json`. Raw abstracts remain in ignored `data/` and are not republished. The index receives search metadata; full notes stay on compound pages. Publication counts do not imply independent trials. Human observations are distinguished from administration trials, and TB-500 collections explicitly include related parent thymosin beta4 research. Product scientific-review links retain their selected-paper counts. An expandable evidence-reading guide follows the results.
- Product pages display 259 owner-supplied customer reviews from `src/lib/customer-reviews-data.json`: BPC-157 68, retatrutide 71, TB-500 58, and MOTS-c 62. Each populated section has an average rating, rating filters, and six reviews per page; the other four products retain their zero-review empty state. All imported records are unverified and labeled accordingly. Original dates remain in the source file but are omitted from the public display and payload pending owner corrections. Customer review submission and moderation are not connected.
- Site-wide Local Utah delivery banner is owner-authorized; no delivery pricing or timing is asserted.
- All eight product pages have prominent Lumira example-report banners with measured sample purity, third-party lab, batch registry and PDF links. Data lives in `src/lib/batches.ts`; inventory matching is pending and explicitly labeled. BPC-157/TB-500 examples are 10mg versus catalog 5mg; retatrutide registry/report lot spelling differs.
- Shared brand photo is illustrative of the brand vial; each product explicitly displays its own quantity and format. Other legacy product/FAQ scientific and commercial claims still require verification before launch.
