import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { formatDosage, getAvailableProductVariants, getDefaultProductVariant } from "@/lib/product-variants";
import styles from "./product-card.module.css";
import { ProductVial } from "./product-vial";
export function ProductCard({ product }: { product: Product; index?: number }) {
  const variants = getAvailableProductVariants(product);
  const selected = getDefaultProductVariant(product);
  const price = selected.price === null ? "Pricing pending" : formatPrice(selected.price);
  return <Link href={`/products/${product.slug}`} className={styles.card} aria-label={`${product.name}, ${formatDosage(selected.dosage)} vial, ${price}`}>
    <div className={styles.visual}><ProductVial product={product} isolated sizes="(max-width: 600px) 88vw, (max-width: 1100px) 44vw, 22vw" /></div>
    <div className={styles.details}>
      <div className={styles.identity}><h3>{product.shortName}</h3><strong>{price}</strong></div>
      <p className={styles.category}>{formatDosage(selected.dosage)} vial <span aria-hidden="true">·</span> {product.category}</p>
      {variants.length > 1 && <p className={styles.sizes}>Sizes: {variants.map(variant => formatDosage(variant.dosage)).join(" / ")}</p>}
      {variants.some(variant => variant.price === null) && <p className={styles.pending}>{selected.price === null ? "Ordering opens once pricing is confirmed" : "Additional sizes: pricing pending"}</p>}
    </div>
  </Link>;
}
