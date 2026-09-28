import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
export default function Home() {
  return <>
    <section className="hero">
      <picture className="hero-backdrop">
        <source media="(max-width: 760px)" srcSet="/images/header%20phone.png" />
        <Image src="/images/header%20desktop.png" alt="" fill priority sizes="100vw" />
      </picture>
      <div className="hero-action">
        <Link className="hero-action-link" href="/products">Explore the Collection <span aria-hidden="true">→</span></Link>
      </div>
    </section>
    <section className="collection section-wrap">
      <div className="section-heading"><div><p className="eyebrow">The collection / 01</p><h2>Meet your next<br /><em>line of inquiry.</em></h2></div><Link className="text-link" href="/products">View all compounds <span aria-hidden="true">↗</span></Link></div>
      <div className="collection-grid">{[products[0], products[2], products[4], products[7]].map((product, index) => <ProductCard key={product.slug} product={product} index={index} />)}</div>
    </section>
    <section className="brand-story">
      <div className="story-art" aria-hidden="true"><span>SALT<br /><i>N’</i><br />PEP</span><div className="orbital-line" /></div>
      <div className="story-copy"><p className="eyebrow">A little salt. A lot of substance.</p><h2>Curiosity is<br />in our nature.</h2><p>Good research starts with a question. We bring the compounds into focus, with a collection that puts product details and research information within reach.</p><p>Explore the molecules. Read the literature.<br />Find your next question.</p><Link className="text-link" href="/science">Inside the research <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="research-note section-wrap"><span className="tiny-cross" aria-hidden="true">✳</span><div><p className="eyebrow">Purpose, clearly defined.</p><h2>For research.<br /><em>And research only.</em></h2><p>Our collection is intended exclusively for laboratory research. Products are not for human consumption.</p></div><Link href="/faq" className="text-link">A few things to know <span aria-hidden="true">↗</span></Link></section>
  </>;
}
