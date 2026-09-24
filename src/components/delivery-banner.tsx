import styles from "./delivery-banner.module.css";

export function DeliveryBanner() {
  return (
    <div className={`${styles.banner} delivery-banner`}>
      <p className={styles.delivery}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Local Utah delivery
      </p>
      <span className={styles.divider} aria-hidden="true" />
      <p className={styles.research}>For research use only</p>
    </div>
  );
}
