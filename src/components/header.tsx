"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { CartDrawer } from "./cart-drawer";
import { DeliveryBanner } from "./delivery-banner";
import { useCart } from "@/lib/cart-context";
const navigation = [["/products", "The collection"], ["/science", "The research"], ["/faq", "Good to know"]];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();
  const closeCart = useCallback(() => setCartOpen(false), []);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <DeliveryBanner />
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="SALT N’ PEP home">SALT <span>N’</span> PEP<span className="brand-asterisk" aria-hidden="true">✳</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-actions"><button className="bag-button" onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }} aria-label={`Open cart, ${totalItems} items`}>Bag <span className="bag-count">{totalItems}</span></button><button className="menu-button" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? "✕" : "☰"}</button></div>
      {mobileMenuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([href, label]) => <Link href={href} key={href} onClick={() => setMobileMenuOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>}
    </header>
    <CartDrawer open={cartOpen} onClose={closeCart} />
  </>;
}
