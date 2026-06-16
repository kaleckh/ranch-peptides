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
      <div className="flex items-center justify-center border border-[#3a3329] rounded-sm overflow-hidden bg-black/25">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-muted hover:text-primary hover:bg-primary/10 transition-colors min-w-12"
        >
          -
        </button>
        <span className="px-4 py-3 text-sm font-black min-w-[3rem] text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="px-4 py-3 text-muted hover:text-primary hover:bg-primary/10 transition-colors min-w-12"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className={`flex-1 py-3 font-black uppercase tracking-[0.12em] rounded-sm transition-all text-xs sm:text-sm ${
          added
            ? "bg-emerald-600 text-white"
            : "btn-primary"
        }`}
      >
        {added ? "Added to Cart!" : "Add to Cart"}
      </button>
    </div>
  );
}
