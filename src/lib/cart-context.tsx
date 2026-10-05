"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "./products";
import { createCartItem, restoreCartItems, MAX_CART_LINES, type CartItem } from "./cart-items";
export type { CartItem } from "./cart-items";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  additionId: number;
  addItem: (product: Product, quantity: number, variantId?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [additionId, setAdditionId] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    let restored: CartItem[] = [];
    try {
      restored = restoreCartItems(JSON.parse(localStorage.getItem("snp-cart") || "[]"));
    } catch { /* Storage can be unavailable; the in-memory cart still works. */ }
    // Hydrate browser storage after the static export's initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(restored);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("snp-cart", JSON.stringify(items.map(i => ({ slug: i.product.slug, variantId: i.variant.id, quantity: i.quantity })))); } catch { /* Keep cart usable without storage. */ }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity: number, variantId?: string) => {
    const item = createCartItem(product.slug, quantity, variantId);
    if (!item) return;
    setAdditionId((previous) => previous + 1);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQty = Math.min(100, existing.quantity + quantity);
        return prev.map((i) =>
          i.id === item.id
            ? createCartItem(product.slug, newQty, item.variant.id)!
            : i
        );
      }
      return prev.length < MAX_CART_LINES ? [...prev, item] : prev;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity > 100) return;
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? createCartItem(i.product.slug, quantity, i.variant.id)!
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
