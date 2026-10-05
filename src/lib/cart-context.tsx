"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { getProduct, type Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  pricePerUnit: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  additionId: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function getBulkPrice(product: Product, quantity: number): number {
  const tiers = [...product.bulkPricing].sort((a, b) => b.qty - a.qty);
  for (const tier of tiers) {
    if (quantity >= tier.qty) return tier.price;
  }
  return product.price;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [additionId, setAdditionId] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let restored: CartItem[] = [];
    try {
      const stored = JSON.parse(localStorage.getItem("snp-cart") || "[]");
      if (Array.isArray(stored)) restored = stored.slice(0, 8).flatMap(item => {
        const product = getProduct(item?.slug);
        return product && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 100
          ? [{ product, quantity: item.quantity, pricePerUnit: getBulkPrice(product, item.quantity) }] : [];
      }).filter((item, index, all) => all.findIndex(other => other.product.slug === item.product.slug) === index);
    } catch { /* Storage can be unavailable; the in-memory cart still works. */ }
    // Hydrate browser storage after the static export's initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(restored);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("snp-cart", JSON.stringify(items.map(i => ({ slug: i.product.slug, quantity: i.quantity })))); } catch { /* Keep cart usable without storage. */ }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) return;
    setAdditionId((previous) => previous + 1);
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        const newQty = Math.min(100, existing.quantity + quantity);
        return prev.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: newQty, pricePerUnit: getBulkPrice(product, newQty) }
            : i
        );
      }
      return [...prev, { product, quantity, pricePerUnit: getBulkPrice(product, quantity) }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity > 100) return;
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.slug !== slug));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.slug === slug
          ? { ...i, quantity, pricePerUnit: getBulkPrice(i.product, quantity) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, additionId, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
