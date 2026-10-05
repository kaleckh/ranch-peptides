"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { upcomingProducts } from "@/lib/upcoming-products";
import { ProductCard } from "./product-card";
import { UpcomingProductCard } from "./upcoming-product-card";
import { ArrowIcon } from "./arrow-icon";
import styles from "./catalog.module.css";

const categories = [...new Set([...products, ...upcomingProducts].map(product => product.category))];

export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [availability, setAvailability] = useState("all");
  const search = query.trim().toLowerCase();
  const matchesCategory = (product: { category: string }) => category === "All categories" || product.category === category;
  const current = availability === "upcoming" ? [] : products.filter(product => matchesCategory(product) && `${product.name} ${product.shortName} ${product.tagline}`.toLowerCase().includes(search));
  const upcoming = availability === "current" ? [] : upcomingProducts.filter(product => matchesCategory(product) && `${product.name} ${product.searchTerms?.join(" ") ?? ""}`.toLowerCase().includes(search));
  const count = current.length + upcoming.length;

  return (
    <>
      <div className="catalog-toolbar">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a product" aria-label="Find a product" />
        </label>
        <label className={styles.filter}>
          <span className="sr-only">Research category</span>
          <select value={category} onChange={event => setCategory(event.target.value)}>
            {["All categories", ...categories].map(item => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className={styles.filter}>
          <span className="sr-only">Availability</span>
          <select value={availability} onChange={event => setAvailability(event.target.value)}>
            <option value="all">All products</option>
            <option value="current">Current collection</option>
            <option value="upcoming">Coming soon</option>
          </select>
        </label>
        <span className="result-count" aria-live="polite">{count} {count === 1 ? "product" : "products"}</span>
      </div>
      <div className="collection-grid">
        {current.map(product => <ProductCard key={product.slug} product={product} />)}
        {upcoming.map(product => <UpcomingProductCard key={product.slug} product={product} />)}
      </div>
      {count === 0 && (
        <div className="empty-results">
          <h2>No products found.</h2>
          <p>Try a different name, research category, or availability.</p>
          <button className="text-link" onClick={() => { setQuery(""); setCategory("All categories"); setAvailability("all"); }}>Reset filters <ArrowIcon /></button>
        </div>
      )}
    </>
  );
}
