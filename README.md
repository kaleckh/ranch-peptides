# SALT N’ PEP

Next.js storefront-style site for a research peptide catalog. The site presents product cards, product detail pages, science/FAQ content, and a client-side cart drawer.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Static export configured through `next.config.ts`

## Local Commands

```bash
npm run dev -- --webpack
npm run lint
npm run build
```

Use `npm run dev -- --webpack` on this Windows machine. The default Turbopack dev server previously panicked while serving this project locally.

## Design Direction

The active visual system follows the owner-provided SALT N’ PEP vial reference: warm ivory, charcoal, stone neutrals, restrained sans-serif typography with editorial serif italics, textured surfaces, and locally bundled brand imagery. Responsive layouts support 320px viewports.

## Docs

- [Project Context](docs/PROJECT_CONTEXT.md)
- [Decisions](docs/DECISIONS.md)
- [Next Steps](docs/NEXT_STEPS.md)
- [Worklog](docs/WORKLOG.md)
- [Docs Index](docs/index.md)

## Deployment

The project is configured for static export. `npm run build` emits `out/`; use that directory as the Render Static Site publish directory.

## Content Boundary

Keep product copy research-oriented. Do not add medical treatment, diagnosis, dosing, or outcome claims without explicit reviewed source material and user approval.
