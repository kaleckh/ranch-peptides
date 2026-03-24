"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { useEffect } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer - full width on mobile, max-w-md on larger */}
      <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-base sm:text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-muted hover:text-foreground" aria-label="Close cart">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <li key={item.product.slug} className="flex gap-3 sm:gap-4 p-3 bg-background rounded-xl">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-primary">{item.product.dosage}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold truncate">{item.product.shortName}</h3>
                    <p className="text-[10px] sm:text-xs text-muted">{formatPrice(item.pricePerUnit)} / vial</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-border text-xs sm:text-sm flex items-center justify-center hover:bg-zinc-100"
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm font-medium w-5 sm:w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-border text-xs sm:text-sm flex items-center justify-center hover:bg-zinc-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="ml-auto text-[10px] sm:text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold">
                    {formatPrice(item.pricePerUnit * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <button
              disabled
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl opacity-50 cursor-not-allowed text-sm"
            >
              Checkout Coming Soon
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              Clear Cart
            </button>
            <p className="text-[10px] text-muted text-center leading-relaxed">
              By placing an order, you confirm these products are for research use only.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
