import Image from "next/image";
import Link from "next/link";
import { DeliveryBanner } from "@/components/delivery-banner";
import { ArrowIcon } from "@/components/arrow-icon";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
export default function Home() {
  return <>
    <section className="hero">
      <picture className="hero-backdrop">
        <source media="(max-width: 768px)" srcSet="/images/salty%20mobile%20offical.png" />
        <Image src="/images/header%20desk.png" alt="" fill priority sizes="100vw" />
      </picture>
      <DeliveryBanner className="desktop-hero-delivery" />
      <div className="hero-action">
        <Link className="hero-action-link" href="/products">EXPLORE THE COLLECTION <ArrowIcon direction="right" /></Link>
      </div>
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
