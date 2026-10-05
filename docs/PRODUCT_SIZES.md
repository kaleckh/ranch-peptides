# Product size options

The owner requested Peptaura's size range for the eight compounds already sold by SALT N’ PEP. On October 4, 2026, the catalog dose filters showed the following 31 options. Existing storefront sizes and prices are retained; the 23 additional sizes show **Pricing pending** until the owner supplies prices.

| Product | Sizes | Existing priced size | Source |
| --- | --- | --- | --- |
| BPC-157 | 2, 5, 10, 20 mg | 5 mg | [Peptaura BPC-157](https://www.peptaura.com/catalog/BPC-157) |
| Retatrutide | 5, 10, 15, 20, 30, 40, 50, 60, 100, 120 mg | 5 mg | [Peptaura Retatrutide](https://www.peptaura.com/catalog/Retatrutide) |
| TB-500 | 2, 5, 10, 20 mg | 5 mg | [Peptaura TB500](https://www.peptaura.com/catalog/TB500) |
| Melanotan II | 10 mg | 10 mg | [Peptaura Melanotan-2](https://www.peptaura.com/catalog/Melanotan-2) |
| MOTS-c | 10, 15, 20, 30, 40 mg | 10 mg | [Peptaura MOTS-c](https://www.peptaura.com/catalog/MOTS-c) |
| Pinealon | 5, 10, 20 mg | 10 mg | [Peptaura Pinealon](https://www.peptaura.com/catalog/Pinealon) |
| Epitalon | 10, 50 mg | 10 mg | [Peptaura Epitalon](https://www.peptaura.com/catalog/Epitalon) |
| GHK-Cu | 50, 100 mg | 50 mg | [Peptaura GHK-Cu](https://www.peptaura.com/catalog/GHK-Cu) |

Peptaura is a marketplace with multiple vendors. The dose-filter snapshot establishes listed size options, not owner inventory, a particular supplier's stock, pricing, or batch verification. All ten Retatrutide dose filters were also checked for vial listings because that page mixes vial and cartridge offers. Retain the storefront's vial format; no separate cartridge products, vendor wholesale prices, photos, or reports were imported. The displayed brand photography is illustrative. Existing lab reports apply only to their named tested samples and do not verify all selectable sizes.

## Pricing and ordering

Size definitions live in `src/lib/product-variants.ts`. The owner's existing size inherits its price and quantity tiers from `src/lib/products.ts`; additional sizes currently have `price: null` and no tiers. When the owner supplies prices, add explicit per-size pricing and any approved bulk tiers there, then check catalog cards, selector, cart, and server totals together. Do not scale the existing price by milligrams or copy marketplace prices.

The selector separates milligrams per vial from number of vials. Pending sizes remain selectable for inspection but the purchase button is disabled and quantity prices are hidden. Cart creation, browser-storage restoration, the local checkout demo, and authoritative API pricing all reject unpriced or unknown size IDs. No fallback price is used for an explicit size ID.

Cart lines are identified by compound and size; browser persistence and checkout requests include `variantId`. Old saved carts and requests without a size ID resolve to the original catalog size. Order snapshots and hosted card-payment descriptions retain the resolved size. Old order snapshots remain readable without a size ID. The 20 Coming soon compound previews remain outside the purchasable catalog.

This package updates the local site only. Supplier inventory, new-size prices and bulk tiers, inventory-matched reports, and production checkout configuration still require owner input before launching those sizes.
