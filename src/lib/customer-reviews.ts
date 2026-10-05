import reviewData from "./customer-reviews-data.json";

export type CustomerReview = {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
};

export function getCustomerReviews(slug: string): CustomerReview[] {
  // Keep the original dates in the import, but omit them from the public
  // display and payload until the owner supplies the corrected dates.
  return reviewData.reviews
    .filter((review) => review.slug === slug)
    .map(({ id, author, location, rating, title, body, verified }) => ({
      id, author, location, rating, title, body, verified,
    }));
}
