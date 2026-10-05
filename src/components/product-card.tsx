import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { formatDosage, getProductVariants } from "@/lib/product-variants";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product }: { product: Product; index?: number }) {
  const variants = getProductVariants(product);
  return <Link href={`/products/${product.slug}`} className={styles.card} aria-label={`${product.name}, ${formatDosage(product.dosage)} vial ${formatPrice(product.price)}, ${variants.length} ${variants.length === 1 ? "size" : "sizes"}`}>
    <div className={styles.visual}><ProductVial product={product} isolated sizes="(max-width: 600px) 88vw, (max-width: 1100px) 44vw, 22vw" /></div>
    <div className={styles.details}>
      <div className={styles.identity}><h3>{product.shortName}</h3><strong>{formatPrice(product.price)}</strong></div>
      <p className={styles.category}>{formatDosage(product.dosage)} vial <span aria-hidden="true">·</span> {product.category}</p>
      <p className={styles.sizes}>Sizes: {variants.map(variant => formatDosage(variant.dosage)).join(" / ")}</p>
      {variants.length > 1 && <p className={styles.pending}>Additional sizes: pricing pending</p>}
    </div>
  </Link>;
}
