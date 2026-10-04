import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product }: { product: Product; index?: number }) {
  return <Link href={`/products/${product.slug}`} className={styles.card} aria-label={`${product.name}, ${product.dosage} vial, ${formatPrice(product.price)}`}>
    <div className={styles.visual}><ProductVial product={product} /></div>
    <div className={styles.details}><div className={styles.identity}><h3>{product.shortName}</h3><strong>{formatPrice(product.price)}</strong></div><p className={styles.category}>{product.dosage} vial <span aria-hidden="true">·</span> {product.category}</p></div>
  </Link>;
}
