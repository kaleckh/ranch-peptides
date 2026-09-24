import Image from "next/image";
import type { Product } from "@/lib/products";
import styles from "./product-vial.module.css";

const productImages: Record<string, string> = {
  "bpc-157": "/images/BPC-157-5mg.png",
  retatrutide: "/images/Retatrutide-10mg.png",
  "tb-500": "/images/TB-500-10mg.png",
  "mt-2": "/images/MT-2-10mg.png",
  "mots-c": "/images/MOTS-c-10mg.png",
  pinealon: "/images/Pinealon-20mg.png",
  epitalon: "/images/Epitalon-10mg.png",
  "ghk-cu": "/images/GHK-Cu-50mg.png",
};

export function ProductVial({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <div className={styles.photo}>
    <Image src={productImages[product.slug]} alt={`SALT N’ PEP ${product.shortName} vial`} fill loading={featured ? "eager" : "lazy"} sizes={featured ? "(max-width: 1024px) 100vw, 600px" : "(max-width: 760px) 50vw, 25vw"} className={styles.image} />
  </div>;
}
