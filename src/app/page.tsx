import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { formatPrice, products } from "@/lib/products";
import { formatDosage, getDefaultProductVariant } from "@/lib/product-variants";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductVial } from "@/components/product-vial";
import styles from "./home.module.css";

export default function Home() {
  return <>
    <section className={`${styles.hero} home-hero`} aria-labelledby="home-heading">
      <Image className={styles.desktopBackdrop} src="/images/desktop%20minimal.png" alt="" fill priority sizes="100vw" />
      <Image className={styles.mobileBackdrop} src="/images/mobile%20minimal.png" alt="" fill priority sizes="100vw" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroIntro}>
        <h1 id="home-heading" className={styles.heroHeading}>Small compounds. <em>Big curiosity.</em></h1>
      </div>
      <div className={styles.carouselWrap}>
        <ProductCarousel slides={products.map((product, index) => {
          const variant = getDefaultProductVariant(product);
          return {
            name: product.shortName,
            href: `/products/${product.slug}`,
            image: <ProductVial product={product} featured={index === 0} isolated sizes="(max-width: 760px) 78vw, (max-width: 1200px) 38vw, 31vw" />,
            details: <>
              <h2 className={styles.productName}>{product.shortName}</h2>
              <p className={styles.productMeta}><span>{formatDosage(variant.dosage)} vial</span><span>{product.category}</span><strong>{variant.price === null ? "Pricing pending" : formatPrice(variant.price)}</strong></p>
              <div className={styles.actions}>
                <Link className={styles.action} href={`/products/${product.slug}`} aria-label={`Explore ${product.shortName}`}>Explore {product.shortName} <ArrowIcon direction="right" /></Link>
                <Link className={styles.collectionLink} href="/products">View the collection</Link>
              </div>
              <p className={styles.notice}><span>Product photos are illustrative; see each compound for quantity and format.</span><span>For laboratory research only. Not for human consumption.</span></p>
            </>,
          };
        })} />
      </div>
    </section>
    <section className="research-feature">
      <Image src="/images/resources%20new.png" alt="" width={1905} height={825} sizes="100vw" />
      <div className="research-feature-action">
        <Link className="hero-action-link" href="/science">VIEW RESEARCH <ArrowIcon direction="right" /></Link>
        <p>Our collection is intended exclusively for laboratory research. Products are not for human consumption.</p>
      </div>
    </section>
  </>;
}
