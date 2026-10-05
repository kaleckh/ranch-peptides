import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { formatDosage, getDefaultProductVariant, getStorefrontProductVariants } from "@/lib/product-variants";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product }: { product: Product; index?: number }) {
  const variants = getStorefrontProductVariants(product);
  const selected = getDefaultProductVariant(product);
  const price = selected.price === null ? "Pricing pending" : formatPrice(selected.price);
  const soldOut = variants.filter(variant => !variant.inStock);
  return <Link href={`/products/${product.slug}`} className={styles.card} aria-label={`${product.name}, ${formatDosage(selected.dosage)} vial, ${price}${soldOut.length ? `, sold out: ${soldOut.map(variant => formatDosage(variant.dosage)).join(", ")}` : ""}`}>
    <div className={styles.visual}><ProductVial product={product} isolated sizes="(max-width: 600px) 88vw, (max-width: 1100px) 44vw, 22vw" /></div>
    <div className={styles.details}>
      <div className={styles.identity}><h3>{product.shortName}</h3><strong>{price}</strong></div>
      <p className={styles.category}>{formatDosage(selected.dosage)} vial <span aria-hidden="true">·</span> {product.category}</p>
      {soldOut.length > 0 && <p className={styles.sizes}>Sold out: {soldOut.map(variant => formatDosage(variant.dosage)).join(" / ")}</p>}
      {selected.price === null && <p className={styles.pending}>Ordering opens once pricing is confirmed</p>}
    </div>
  </Link>;
}
