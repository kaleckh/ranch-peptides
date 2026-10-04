# Project Context

SALT N’ PEP is a Next.js 16 App Router storefront-style site for research peptides. It presents an 8-product catalog, product detail pages, science/FAQ content, and a client-side cart drawer.

## Stack

- Next.js 16.3.8 with React 19; Node 24 for the separate checkout API
- TypeScript
- Tailwind CSS v4
- `next/image` with the locally bundled owner-supplied vial photo across hero, catalog, and product pages
- Client-side cart state in `src/lib/cart-context.tsx`

## Current Design Direction

The active visual system follows the owner-provided SALT N’ PEP vial reference: warm ivory, charcoal, stone neutrals, restrained sans-serif typography with editorial serif italics, textured surfaces, and locally bundled brand imagery. Responsive layouts support 320px viewports.

## Common Commands

- Development: `npm run dev -- --webpack`
- Lint: `npm run lint`
- Build: `npm run build`
- Fast built UX preview: `npm run preview` at http://127.0.0.1:3016 (rebuild after edits)

Use `--webpack` for local development because the default Turbopack dev server has previously panicked on this Windows machine while serving the site.

## Current functionality

- Search and category filtering across eight compounds. The collection opens with a compact heading and filters; shared product cards use square product photography with names, prices, dosage, and category directly on ivory. Entire cards link to details with keyboard focus and hover feedback; duplicate arrows and card CTAs are removed.
- Cart supports quantity pricing, removal, focus trapping, Escape, focus return, and browser persistence. Checkout submits orders for staff research review; approved requests offer hosted Stripe card checkout or manual Venmo business payment. A separate Node API prices from the catalog and stores immutable order snapshots in SQLite. Signed matching webhooks confirm cards; staff verify unique Venmo transactions. Live checkout is disabled by default. Setup and limitations: `docs/CHECKOUT.md`.
- Research library opens directly with search, compound selection, human/preclinical filters, and 124 selected primary papers across eight compound cards (13–20 per compound). Cards show topics, evidence types, years, and actual counts. Each compound has a statically exported /science/[slug] page with newest-first topic-led study cards in a wider two-column desktop grid containing findings, limitations, citation, and original source links already in the HTML; product scientific-review sections link directly to that page with counts. New citation notes live in `src/lib/research-additions.ts` and `src/lib/research-topic-additions.ts`; human observational reports, case reports, trial secondary analyses, and laboratory studies have distinct labels. Counts do not imply independent trials. MOTS-c human exercise observations are distinguished from treatment trials; TB-500 papers are labeled related thymosin beta4 evidence. The index receives searchable metadata rather than full paper notes. An expandable evidence-reading guide follows the results.
- Every product has a customer-review section with an honest zero-review empty state. Review collection, persistence, and publication are not connected.
- Site-wide Local Utah delivery banner is owner-authorized; no delivery pricing or timing is asserted.
- All eight product pages have prominent Lumira example-report banners with measured sample purity, third-party lab, batch registry and PDF links. Data lives in `src/lib/batches.ts`; inventory matching is pending and explicitly labeled. BPC-157/TB-500 examples are 10mg versus catalog 5mg; retatrutide registry/report lot spelling differs.
- Shared brand photo is illustrative of the brand vial; each product explicitly displays its own quantity and format. Other legacy product/FAQ scientific and commercial claims still require verification before launch.
