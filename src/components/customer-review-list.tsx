"use client";

import { useRef, useState } from "react";
import type { CustomerReview } from "@/lib/customer-reviews";
import styles from "./product-reviews.module.css";

const pageSize = 6;

export function CustomerReviewList({ reviews, name }: { reviews: CustomerReview[]; name: string }) {
  const [rating, setRating] = useState("all");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLUListElement>(null);
  const filtered = reviews.filter((review) => rating === "all" || review.rating === Number(rating));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  function changePage(nextPage: number) {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  return <div className={styles.customerContent}>
    <div className={styles.reviewToolbar}>
      <label htmlFor="review-rating">Filter by rating
        <select id="review-rating" value={rating} onChange={(event) => { setRating(event.target.value); setPage(1); }}>
          <option value="all">All ratings ({reviews.length})</option>
          {[5, 4, 3, 2, 1].map((stars) => <option key={stars} value={stars}>
            {stars} {stars === 1 ? "star" : "stars"} ({reviews.filter((review) => review.rating === stars).length})
          </option>)}
        </select>
      </label>
      <p role="status">{filtered.length ? `${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} reviews` : "0 reviews"}</p>
    </div>
    <ul id="customer-review-list" ref={listRef} className={styles.reviewGrid}>
      {visible.map((review) => <li key={review.id}>
        <article className={styles.customerReview} data-review-id={review.id} aria-labelledby={`review-title-${review.id}`}>
          <div className={styles.reviewMeta}>
            <span className={styles.stars} role="img" aria-label={`${review.rating} out of 5 stars`}>
              <span aria-hidden="true">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            </span>
            <span className={styles.verification}>{review.verified ? "Verified review" : "Unverified"}</span>
          </div>
          <h3 id={`review-title-${review.id}`}>{review.title}</h3>
          <p className={styles.reviewBody}>{review.body}</p>
          <footer className={styles.reviewAuthor}><strong>{review.author}</strong><span>{review.location}</span></footer>
        </article>
      </li>)}
    </ul>
    {!filtered.length && <p className={styles.noMatches}>No {rating}-star reviews for {name} yet. Choose another rating to keep reading.</p>}
    {pages > 1 && <nav className={styles.pagination} aria-label={`${name} review pages`}>
      <button type="button" disabled={page === 1} aria-controls="customer-review-list" onClick={() => changePage(page - 1)}>Previous</button>
      <span>Page {page} of {pages}</span>
      <button type="button" disabled={page === pages} aria-controls="customer-review-list" onClick={() => changePage(page + 1)}>Next</button>
    </nav>}
  </div>;
}
