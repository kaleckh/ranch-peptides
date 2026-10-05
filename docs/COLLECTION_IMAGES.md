# Collection vial images

The collection cards show isolated vials on the site's ivory background. Assets are transparent PNGs in `public/images/vials/`; `ProductCard` selects the isolated variant of `ProductVial`. Homepage carousel and product detail photos use the original assets.

## Image provenance

Created October 4, 2026 with the built-in `imagegen` tool, edit/background-extraction mode, `transparent_background: true`. Each original product photo was inspected and supplied as the edit reference. The generated files were copied into the repository; original reference photos were retained.

| Output | Reference in public/images | Label used in prompt |
| --- | --- | --- |
| vials/bpc-157.png | BPC-157-5mg.png | BPC-157, 5 MG |
| vials/retatrutide.png | Retatrutide-10mg.png | Retatrutide, 10 MG |
| vials/tb-500.png | TB-500-10mg.png | TB-500, 10 MG |
| vials/mt-2.png | MT-2-10mg.png | MT-2, 10 MG |
| vials/mots-c.png | MOTS-c-10mg.png | MOTS-c, 10 MG |
| vials/pinealon.png | Pinealon-20mg.png | Pinealon, 20 MG |
| vials/epitalon.png | Epitalon-10mg.png | Epitalon, 10 MG |
| vials/ghk-cu.png | GHK-Cu-50mg.png | GHK-Cu, 50 MG |

The existing photographs remain illustrative. Labels were preserved from the reference assets; listed catalog specifications remain authoritative.

## Exact base prompt

For each edit, the two quoted compound/quantity strings were replaced with the values in the table. All other text stayed identical.

Use case: background-extraction. Asset type: transparent PNG cutout for the existing peptide collection webpage. Input image: edit target. Remove every rock, stone pedestal, tabletop, studio backdrop, and cast shadow. Keep ONLY the single original peptide vial, including the complete black cap, silver collar, glass neck, original black/ivory textured label, and full glass base. Preserve its front-facing perspective, proportions, texture, lighting, reflections, and all original label typography exactly. The label must still read "BPC-157", "5 MG", and "FOR RESEARCH USE ONLY". Do not redesign, relabel, add branding or invent details. Center the entire upright vial on a square transparent canvas with modest clear padding; scale it uniformly to occupy about 80% of canvas height. All space outside the vial must have true transparent alpha. No backdrop color, no checkerboard baked into pixels, no surface, no props, no shadow. Clean precise outline with no rock fragments or background halo.

## Verification

- Eight RGBA assets with transparent corners; collection renders them with `object-fit: contain` and transparent wrappers.
- Lint and production build passed (26 static routes).
- Chromium verified all eight images, product links, search, category filtering, keyboard navigation, and no horizontal overflow at 1440, 768, 390, and 320px. Homepage and detail photo sources remained unchanged.
- Local screenshots and verification script: ignored `data/collection-cutouts-*.png`, `data/collection-cutouts-checks.json`, and `data/check-collection-cutouts.mjs`.

