import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import styles from "./home.module.css";
export default function Home() {
  return <>
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>SALT N’ PEP / Research peptides</p>
        <h1 id="home-heading" className={styles.heading}>Small compounds.<br /><em>Big curiosity.</em></h1>
        <p className={styles.description}>Explore our collection of research peptides and the studies behind each compound.</p>
        <Link className={styles.action} href="/products">Explore the collection <ArrowIcon direction="right" /></Link>
        <p className={styles.notice}>For laboratory research only.<br />Not for human consumption.</p>
      </div>
      <figure className={styles.figure}>
        <div className={styles.photo}>
          <Image src="/images/salt-n-pep-reference.png" alt="SALT N’ PEP branded research vial with an ivory and charcoal label" fill preload sizes="(max-width: 760px) 88vw, (max-width: 1100px) 40vw, 480px" />
        </div>
        <figcaption>Brand vial shown. See each compound for quantity and format.</figcaption>
      </figure>
    </section>
    <section className="collection section-wrap">
      <div className="section-heading"><div><p className="eyebrow">The collection / 01</p><h2>Meet your next<br /><em>line of inquiry.</em></h2></div><Link className="text-link" href="/products">View all compounds <ArrowIcon /></Link></div>
      <div className="collection-grid">{[products[0], products[2], products[4], products[7]].map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>
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
