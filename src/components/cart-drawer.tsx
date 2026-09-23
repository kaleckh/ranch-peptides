"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { useEffect, useRef } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select, [tabindex="0"]');
        if (!elements?.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer - full width on mobile, max-w-md on larger */}
      <div
        className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-card shadow-2xl flex flex-col border-l border-border"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="cart-title" className="text-base sm:text-lg font-black uppercase tracking-tight">Your Cart</h2>
          <button ref={closeButtonRef} onClick={onClose} className="p-2 text-muted hover:text-primary" aria-label="Close cart">
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
                <li key={item.product.slug} className="flex gap-3 sm:gap-4 p-3 metal-panel rounded-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-card border border-primary/20 rounded-sm flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-primary">{item.product.dosage}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold truncate">{item.product.shortName}</h3>
                    <p className="text-[10px] sm:text-xs text-muted">{formatPrice(item.pricePerUnit)} / vial</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        aria-label={`Decrease ${item.product.shortName} quantity`}
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-border text-xs sm:text-sm flex items-center justify-center hover:bg-primary/10"
                      >
                        -
                      </button>
                      <span className="text-xs sm:text-sm font-medium w-5 sm:w-6 text-center">{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.product.shortName} quantity`}
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-border text-xs sm:text-sm flex items-center justify-center hover:bg-primary/10"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="ml-auto text-[10px] sm:text-xs text-muted hover:text-muted"
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
          <div className="p-4 border-t border-border space-y-3 bg-card">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <button
              disabled
              className="w-full py-3 btn-primary font-black rounded-sm opacity-50 cursor-not-allowed text-sm"
            >
              Checkout Coming Soon
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted hover:text-primary transition-colors"
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
