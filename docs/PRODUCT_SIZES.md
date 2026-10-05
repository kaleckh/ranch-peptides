# Product size options

The owner originally requested Peptaura's size range for the eight compounds already sold by SALT N’ PEP. On October 4, 2026, the catalog dose filters showed the following 31 reference options. For the test run, the storefront now shows only one current size per compound, hiding all 23 extra sizes and the sold-out lists. The four owner-selected sizes still show **Pricing pending** until the owner approves their prices and bulk tiers; the other four compounds keep their original size, price, and tiers.

| Product | Supplier reference sizes | Storefront size | Original priced size | Source |
| --- | --- | --- | --- | --- |
| BPC-157 | 2, 5, 10, 20 mg | 10 mg only | 5 mg (sold out) | [Peptaura BPC-157](https://www.peptaura.com/catalog/BPC-157) |
| Retatrutide | 5, 10, 15, 20, 30, 40, 50, 60, 100, 120 mg | 30 mg only | 5 mg (sold out) | [Peptaura Retatrutide](https://www.peptaura.com/catalog/Retatrutide) |
| TB-500 | 2, 5, 10, 20 mg | 10 mg only | 5 mg (sold out) | [Peptaura TB500](https://www.peptaura.com/catalog/TB500) |
| Melanotan II | 10 mg | 10 mg only | 10 mg | [Peptaura Melanotan-2](https://www.peptaura.com/catalog/Melanotan-2) |
| MOTS-c | 10, 15, 20, 30, 40 mg | 20 mg only | 10 mg (sold out) | [Peptaura MOTS-c](https://www.peptaura.com/catalog/MOTS-c) |
| Pinealon | 5, 10, 20 mg | 10 mg only | 10 mg | [Peptaura Pinealon](https://www.peptaura.com/catalog/Pinealon) |
| Epitalon | 10, 50 mg | 10 mg only | 10 mg | [Peptaura Epitalon](https://www.peptaura.com/catalog/Epitalon) |
| GHK-Cu | 50, 100 mg | 50 mg only | 50 mg | [Peptaura GHK-Cu](https://www.peptaura.com/catalog/GHK-Cu) |

Peptaura is a marketplace with multiple vendors. The dose-filter snapshot establishes listed size options, not owner inventory, a particular supplier's stock, pricing, or batch verification. All ten Retatrutide dose filters were also checked for vial listings because that page mixes vial and cartridge offers. Retain the storefront's vial format; no separate cartridge products, vendor wholesale prices, photos, or reports were imported. The displayed brand photography is illustrative. Existing lab reports apply only to their named tested samples and do not verify all selectable sizes.

## Pricing and ordering

Size definitions and stock selections live in `src/lib/product-variants.ts`. The four owner-selected sizes override the original catalog size; all other compounds use only their original size during the test run. The original size inherits its price and quantity tiers from `src/lib/products.ts`; additional sizes currently have `price: null` and no tiers. Original prices on unavailable sizes remain in the data but are hidden and cannot be charged. Four compounds retain their original orderable sizes; the four owner-selected sizes remain pricing pending. When the owner supplies prices, add explicit per-size pricing and approved bulk tiers there, then check catalog cards, selector, cart, and server totals together. Do not scale prices by milligrams, copy marketplace prices, or transfer old-size prices without owner approval.

The selector separates milligrams per vial from number of vials. Collection cards, the homepage carousel, and the selector agree on the current size. Cards and selectors use only available variants; extra sizes and sold-out lists are absent from the storefront. Current pending sizes remain visible with purchase disabled and quantity prices hidden. Cart creation, browser-storage restoration, the local checkout demo, and authoritative API pricing reject all 23 hidden sizes, unpriced sizes, and unknown size IDs. The API returns an actionable HTTP 400 for unavailable requests. No fallback price is used for an explicit size ID.

Cart lines are identified by compound and size; browser persistence and checkout requests include `variantId`. Old saved carts and requests without a size ID resolve to the original catalog size. If that size is now sold out, restoration removes the line and checkout rejects it; neither silently substitutes a different size. Order snapshots and hosted card-payment descriptions retain the resolved size. Existing order snapshots remain readable without a size ID and are not rewritten when stock changes. The 20 Coming soon compound previews remain outside the purchasable catalog.

GitHub push is owner-authorized. The four selected sizes still need price and bulk-tier approval before ordering can open. Inventory-matched reports and production checkout configuration remain pending.
