"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { DeliveryBanner } from "./delivery-banner";
import { ArrowIcon } from "./arrow-icon";
import { useCart } from "@/lib/cart-context";
import styles from "./header.module.css";
const navigation = [["/products", "The collection"], ["/science", "The research"], ["/faq", "Good to know"]];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems, additionId } = useCart();
  const pathname = usePathname();
  const closeCart = useCallback(() => setCartOpen(false), []);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <DeliveryBanner />
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="SALT N’ PEP home">SALT <span>N’</span> PEP</Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-actions">
        <button className="bag-button" onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }} aria-label={`Open cart, ${totalItems} items`}>
          Bag
          <span key={additionId} className={`bag-count ${styles.count} ${additionId > 0 ? styles.countAdded : ""}`}>
            {totalItems}
            {additionId > 0 && <svg className={styles.sparks} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
              <path d="M37 2 39 7 44 9 39 11 37 16 35 11 30 9 35 7Z" />
              <path d="M8 15 9.5 18.5 13 20 9.5 21.5 8 25 6.5 21.5 3 20 6.5 18.5Z" />
              <path d="M32 34 33.5 37.5 37 39 33.5 40.5 32 44 30.5 40.5 27 39 30.5 37.5Z" />
            </svg>}
          </span>
        </button>
        <button className="menu-button" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "✕" : "☰"}</button>
      </div>
      {mobileMenuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([href, label]) => <Link href={href} key={href} onClick={() => setMobileMenuOpen(false)}>{label}<ArrowIcon /></Link>)}</nav>}
    </header>
    <CartDrawer open={cartOpen} onClose={closeCart} />
  </>;
}
