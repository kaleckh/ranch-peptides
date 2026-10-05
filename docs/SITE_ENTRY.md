# Site entry confirmation

Every route displays the entry form before the visitor can interact with the storefront. Both checkboxes are required and start unchecked:

- I am over the age of 21
- I understand that these are research compounds

The Enter site button becomes available only after both statements are checked. Confirmation is remembered in session storage for the current tab session, including navigation and reloads. A fresh session asks again. If browser storage is unavailable, confirmation remains in memory during app navigation; a reload asks again.

The root layout includes `SiteEntryGate` around the header, main content, and footer. The static export renders the form with the storefront inert before hydration. JavaScript promotes the form to a native modal, locks background scrolling, focuses the first checkbox, and prevents dismissal through Escape or the backdrop. Entry restores scrolling and focuses the main content. The form uses the existing ivory and charcoal palette and supports narrow and short screens.

## Validation on October 4, 2026

Lint and production build passed. Chromium checks passed at 1440×900, 768×900, 390×844, 320×568, and 667×375, covering required checkbox states, keyboard focus, dismissal prevention, viewport fit, confirmation persistence, and cart behavior. Fresh direct visits to collection, product, science, FAQ, and checkout routes require confirmation. Storage-unavailable navigation/reload, reduced motion, and the pre-hydration static gate also passed. Desktop, small-phone, and short-screen layouts were visually inspected.

Evidence is in ignored `data/site-entry-gate-checks.json`, `data/check-site-entry-gate.mjs`, and `data/site-entry-gate-*.png`. Local static-preview requests for missing Next.js segment-prefetch files returned 404; these were recorded separately from gate checks. Normal navigation and reload checks passed. The built preview is http://127.0.0.1:3016/.
