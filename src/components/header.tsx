"use client";

import Link from "next/link";
import { useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#070706]/90 backdrop-blur-xl border-b border-[#2a241b]">
        {/* Research disclaimer bar */}
        <div className="bg-[#0d0b09] text-[#cfc5b5] text-[10px] sm:text-xs text-center py-1.5 px-4 border-b border-[#2a241b]">
          All products are sold for <strong>laboratory and research use only</strong>. Not for human consumption.
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md border border-primary/40 bg-[#15110c] flex items-center justify-center shadow-[0_0_28px_rgba(184,138,74,0.18)] flex-shrink-0">
                <span className="text-primary font-black text-sm tracking-tight">HP</span>
              </div>
              <span className="text-base sm:text-xl font-black tracking-tight uppercase truncate">
                Henry&apos;s<span className="text-primary max-[360px]:hidden"> Peptides</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-xs font-bold uppercase tracking-[0.18em] text-muted hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/science" className="text-xs font-bold uppercase tracking-[0.18em] text-muted hover:text-primary transition-colors">
                Science & Research
              </Link>
              <Link href="/faq" className="text-xs font-bold uppercase tracking-[0.18em] text-muted hover:text-primary transition-colors">
                FAQ
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-muted hover:text-primary transition-colors"
                aria-label="Open cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-[#080706] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-muted hover:text-primary"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2a241b] bg-[#0a0908]">
            <nav className="flex flex-col px-4 py-3 gap-1">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-[0.16em] text-muted hover:text-primary">
                Products
              </Link>
              <Link href="/science" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-[0.16em] text-muted hover:text-primary">
                Science & Research
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-bold uppercase tracking-[0.16em] text-muted hover:text-primary">
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
