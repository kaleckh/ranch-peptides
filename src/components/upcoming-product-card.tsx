import type { UpcomingProduct } from "@/lib/upcoming-products";
import cardStyles from "./product-card.module.css";
import styles from "./upcoming-product-card.module.css";

export function UpcomingProductCard({ product }: { product: UpcomingProduct }) {
  return (
    <article className={styles.card} aria-label={`${product.name}, coming soon`}>
      <div className={`${cardStyles.visual} ${styles.visual}`}>
        <span className={styles.banner}>Coming soon</span>
        <svg className={styles.placeholder} viewBox="0 0 160 240" fill="none" aria-hidden="true">
          <rect x="47" y="18" width="66" height="23" rx="5" />
          <path d="M47 30h66M53 41v17h54V41M58 58v13c0 9-19 13-19 32v106c0 9 6 14 14 14h54c8 0 14-5 14-14V103c0-19-19-23-19-32V58" />
          <path d="M48 113h64v75H48zM57 135h46M57 146h33M57 172h46" />
        </svg>
        <span className={styles.imageNote}>Image coming soon</span>
      </div>
      <div className={cardStyles.details}>
        <div className={cardStyles.identity}><h3>{product.name}</h3></div>
        <p className={cardStyles.category}>{product.category}</p>
      </div>
    </article>
  );
}
