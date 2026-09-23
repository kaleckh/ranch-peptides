"use client";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";
export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All compounds");
  const visible = products.filter(p => (category === "All compounds" || p.category === category) && `${p.name} ${p.tagline}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="catalog-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a compound" aria-label="Find a compound" /></label><label className="category-field"><span className="sr-only">Research category</span><select value={category} onChange={e => setCategory(e.target.value)}>{["All compounds", ...new Set(products.map(p => p.category))].map(c => <option key={c}>{c}</option>)}</select></label><span className="result-count" aria-live="polite">{visible.length} {visible.length === 1 ? "compound" : "compounds"}</span></div><div className="collection-grid">{visible.map(p => <ProductCard key={p.slug} product={p} index={products.indexOf(p)} />)}</div>{visible.length === 0 && <div className="empty-results"><h2>No compounds found.</h2><p>Try a different name or research category.</p><button className="text-link" onClick={() => { setQuery(""); setCategory("All compounds"); }}>Reset filters ↗</button></div>}</>;
}
