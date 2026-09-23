import Image from "next/image";
import type { Product } from "@/lib/products";
import styles from "./product-vial.module.css";
export function ProductVial({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <div className={styles.photo}>
    <Image src="/images/salt-n-pep-reference.png" alt={`SALT N’ PEP brand vial, shown for ${product.shortName}; label and quantity may differ`} fill loading={featured ? "eager" : "lazy"} sizes={featured ? "(max-width: 1024px) 100vw, 600px" : "(max-width: 760px) 50vw, 25vw"} className={styles.image} />
  </div>;
}
