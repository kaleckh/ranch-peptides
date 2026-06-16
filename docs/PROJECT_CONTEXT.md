# Project Context

Henry's Peptides is a Next.js 16 App Router storefront-style site for research peptides. It presents an 8-product catalog, product detail pages, science/FAQ content, and a client-side cart drawer.

## Stack

- Next.js 16.2.1 with React 19
- TypeScript
- Tailwind CSS v4
- `next/image` with remote Unsplash imagery
- Client-side cart state in `src/lib/cart-context.tsx`

## Current Design Direction

The active visual direction is dark, masculine, and industrial-luxury: black graphite backgrounds, brass accents, condensed uppercase typography, dark glass panels, and desaturated lab/product imagery. The site is expected to hold at narrow mobile widths down to 320px.

## Common Commands

- Development: `npm run dev -- --webpack`
- Lint: `npm run lint`
- Build: `npm run build`

Use `--webpack` for local development because the default Turbopack dev server has previously panicked on this Windows machine while serving the site.
