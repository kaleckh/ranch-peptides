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
