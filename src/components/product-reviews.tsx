import { researchEntries } from "@/lib/research";
import styles from "./product-reviews.module.css";

export function ProductReviews({ slug, name }: { slug: string; name: string }) {
  const research = researchEntries.find((entry) => entry.slug === slug);
  return <div className={styles.reviews}>
    <nav className={styles.jumpLinks} aria-label={`${name} reviews`}>
      <a href="#customer-reviews">Customer reviews <span>0</span></a>
      <a href="#scientific-review">Scientific review <span aria-hidden="true">↘</span></a>
    </nav>
    <section id="customer-reviews" className={styles.customers} aria-labelledby="customer-reviews-heading">
      <div><p className={styles.eyebrow}>From the community</p><h2 id="customer-reviews-heading">Customer reviews.</h2><p className={styles.intro}>Feedback on {name}.</p></div>
      <div className={styles.empty}><span className={styles.count}>0 <small>reviews</small></span><h3>No customer reviews yet.</h3><p>There are no published customer reviews for {name}.</p></div>
    </section>
    {research && <section id="scientific-review" className={styles.science} aria-labelledby="scientific-review-heading">
      <div className={styles.scienceHeading}><p className={styles.eyebrow}>A closer reading</p><h2 id="scientific-review-heading">The scientific review.</h2><p>One selected primary paper, with its findings and limits. A starting point for reading, not a complete assessment of the evidence.</p></div>
      <article className={styles.paper}>
        <div className={styles.tags}><span>{research.evidence === "human" ? "Human study" : "Preclinical study"}</span>{research.related && <span>Related-compound evidence</span>}<span>{research.year}</span></div>
        <h3>{research.focus}</h3><p className={styles.model}>{research.model}</p>
        <div className={styles.findings}><div><h4>What the researchers observed</h4><p>{research.finding}</p></div><div><h4>What this does not establish</h4><p>{research.limitation}</p></div></div>
        <div className={styles.source}><p>{research.authors} · <cite>{research.journal}</cite> · {research.year}</p><a href={research.source}>Read the primary paper <span aria-hidden="true">↗</span><small>{research.sourceId}</small></a></div>
      </article>
      <a href="/science" className={styles.libraryLink}>Explore the research library <span aria-hidden="true">↗</span></a>
    </section>}
  </div>;
}
