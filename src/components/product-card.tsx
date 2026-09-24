import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return <Link href={`/products/${product.slug}`} className={styles.card} data-tone={index % 4}>
    <div className={styles.visual}><ProductVial product={product} /></div>
    <div className={styles.top}><span>SNP / {String(index + 1).padStart(2, "0")}</span><span className={styles.dose}>{product.dosage}</span></div>
    <div className={styles.identity}><p className={styles.category}>{product.category}</p><h3>{product.shortName}</h3><p className={styles.tagline}>{product.tagline}</p></div>
    <div className={styles.bottom}><div><strong>{formatPrice(product.price)}</strong><span>Per vial · {product.format}</span></div><span className={styles.arrow} aria-hidden="true">↗</span></div>
    <span className={styles.action}>View compound <span aria-hidden="true">→</span></span>
  </Link>;
}
