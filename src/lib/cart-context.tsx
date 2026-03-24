"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  pricePerUnit: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
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

  const addItem = useCallback((product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        const newQty = existing.quantity + quantity;
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
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
