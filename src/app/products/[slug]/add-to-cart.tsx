"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="flex items-center justify-center border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-muted hover:text-foreground hover:bg-zinc-50 transition-colors"
        >
          -
        </button>
        <span className="px-4 py-3 text-sm font-semibold min-w-[3rem] text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-3 text-muted hover:text-foreground hover:bg-zinc-50 transition-colors"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`flex-1 py-3 font-semibold rounded-xl transition-all text-sm ${
          added
            ? "bg-emerald-600 text-white"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {added ? "Added to Cart!" : "Add to Cart"}
      </button>
    </div>
  );
}
