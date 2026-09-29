"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const tiers = [...product.bulkPricing].sort((a, b) => a.qty - b.qty);
  const defaultTier = tiers.find((tier) => tier.qty === 1) ?? tiers[0];
  const [selectedQty, setSelectedQty] = useState(defaultTier?.qty ?? 1);
  const [added, setAdded] = useState(false);
  const selectedTier = tiers.find((tier) => tier.qty === selectedQty) ?? defaultTier;

  const handleAdd = () => {
    if (!selectedTier) return;
    addItem(product, selectedTier.qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="mt-6 sm:mt-8 p-3 sm:p-4 metal-panel rounded-sm" aria-labelledby="quantity-heading">
      <h2 id="quantity-heading" className="text-sm font-black uppercase tracking-[0.12em] mb-3">Select Quantity</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {tiers.map((tier) => {
          const isSelected = tier.qty === selectedQty;
          return (
            <button
              key={tier.qty}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select ${tier.qty} ${tier.qty === 1 ? "vial" : "vials"} for ${formatPrice(tier.price * tier.qty)}, ${formatPrice(tier.price)} per vial`}
              onClick={() => setSelectedQty(tier.qty)}
              className={`min-w-0 min-h-[104px] p-3 border text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isSelected ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border bg-background hover:border-primary/60"}`}
            >
              <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] text-muted">{tier.qty} {tier.qty === 1 ? "Vial" : "Vials"}</span>
              <span className="block mt-2 text-lg sm:text-xl font-black leading-none">{formatPrice(tier.price * tier.qty)}</span>
              <span className="block mt-2 text-[10px] sm:text-xs text-muted">{formatPrice(tier.price)} / vial</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        disabled={!selectedTier}
        onClick={handleAdd}
        className={`w-full mt-3 py-3 font-black uppercase tracking-[0.12em] rounded-sm transition-all text-xs sm:text-sm ${
          added
            ? "bg-primary text-white"
            : "btn-primary"
        }`}
      >
        <span aria-live="polite">{added ? "Added to Cart!" : "Add to Cart"}</span>
      </button>
    </section>
  );
}
