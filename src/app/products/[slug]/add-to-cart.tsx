"use client";

import { useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";
import { formatDosage, getAvailableProductVariants, getDefaultProductVariant, getProductVariant } from "@/lib/product-variants";
import styles from "./add-to-cart.module.css";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variants = getAvailableProductVariants(product);
  const [selectedSize, setSelectedSize] = useState(getDefaultProductVariant(product).id);
  const variant = getProductVariant(product, selectedSize)!;
  const tiers = [...variant.bulkPricing].sort((a, b) => a.qty - b.qty);
  const defaultTier = tiers.find((tier) => tier.qty === 1) ?? tiers[0];
  const [selectedQty, setSelectedQty] = useState(defaultTier?.qty ?? 1);
  const [added, setAdded] = useState(false);
  const feedbackVersion = useRef(0);
  const selectedTier = tiers.find((tier) => tier.qty === selectedQty) ?? defaultTier;
  const soldOut = !variant.inStock;
  const pending = variant.inStock && variant.price === null;

  const resetFeedback = () => {
    feedbackVersion.current++;
    setAdded(false);
  };

  const handleAdd = () => {
    if (soldOut || pending || !selectedTier) return;
    addItem(product, selectedTier.qty, variant.id);
    setAdded(true);
    const version = ++feedbackVersion.current;
    setTimeout(() => { if (feedbackVersion.current === version) setAdded(false); }, 2000);
  };

  return (
    <section className={styles.panel} aria-label="Choose size and quantity">
      <fieldset className={styles.sizes}>
        <legend>Size per vial</legend>
        <div className={styles.options}>
          {variants.map(option => <label key={option.id} className={styles.option} data-sold-out={!option.inStock}>
            <input type="radio" name={`size-${product.slug}`} value={option.id} checked={selectedSize === option.id}
              aria-label={`${formatDosage(option.dosage)}${!option.inStock ? ", sold out" : option.price === null ? ", pricing pending" : ", available"}`}
              onChange={() => { setSelectedSize(option.id); setSelectedQty(1); resetFeedback(); }} />
            <span>{formatDosage(option.dosage)}{!option.inStock && <small>Sold out</small>}</span>
          </label>)}
        </div>
      </fieldset>
      <div className={styles.selection} aria-live="polite" aria-atomic="true">
        <p>{formatDosage(variant.dosage)} / {product.format}</p>
        {soldOut && <><strong>Sold out</strong><p>This size is currently unavailable.</p></>}
        {pending && <><strong>Pricing pending</strong><p>Price for this size is coming soon. Ordering will open once pricing is confirmed.</p></>}
      </div>
      {!soldOut && !pending && <><h2 className={styles.quantityHeading}>Quantity</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {tiers.map((tier) => {
          const isSelected = tier.qty === selectedQty;
          return (
            <button
              key={tier.qty}
              type="button"
              aria-pressed={isSelected}
              aria-label={`Select ${tier.qty} ${tier.qty === 1 ? "vial" : "vials"} for ${formatPrice(tier.price * tier.qty)}, ${formatPrice(tier.price)} per vial`}
              onClick={() => { setSelectedQty(tier.qty); resetFeedback(); }}
              className={`min-w-0 min-h-[104px] p-3 border text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isSelected ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border bg-background hover:border-primary/60"}`}
            >
              <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] text-muted">{tier.qty} {tier.qty === 1 ? "Vial" : "Vials"}</span>
              <span className="block mt-2 text-lg sm:text-xl font-black leading-none">{formatPrice(tier.price * tier.qty)}</span>
              <span className="block mt-2 text-[10px] sm:text-xs text-muted">{formatPrice(tier.price)} / vial</span>
            </button>
          );
        })}
      </div></>}
      <button
        type="button"
        disabled={soldOut || pending || !selectedTier}
        onClick={handleAdd}
        className={`${styles.add} w-full mt-3 py-3 font-black uppercase tracking-[0.12em] rounded-sm transition-all text-xs sm:text-sm ${
          added
            ? "bg-primary text-white"
            : "btn-primary"
        }`}
      >
        <span aria-live="polite">{soldOut ? "Sold out" : pending ? "Pricing pending" : added ? "Added to Cart!" : "Add to Cart"}</span>
      </button>
    </section>
  );
}
