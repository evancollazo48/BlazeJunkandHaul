/**
 * ============================================================================
 *  REVIEWS
 * ============================================================================
 *  TODO: client to replace these PLACEHOLDER reviews with real Google/Facebook
 *  reviews before launch. For each real review:
 *    - set `isPlaceholder: false`
 *    - use the customer's name as it appears publicly (e.g. "Maria G.")
 *    - set `source` and, ideally, `url` linking to the original review
 *
 *  Review / AggregateRating structured data is ONLY emitted once every review
 *  in this list is real (see `hasRealReviews`). Never publish invented ratings.
 * ============================================================================
 */

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "google" | "facebook" | "placeholder";
  /** ISO date (YYYY-MM-DD) the review was posted. */
  datePublished?: string;
  url?: string;
  isPlaceholder: boolean;
}

export const reviews: Review[] = [
  {
    id: "placeholder-1",
    // TODO: fictional placeholder name — replace with the real reviewer's name.
    author: "Maria G.",
    location: "Fort Worth",
    rating: 5,
    text: "Called Blaze in the morning and my garage was cleared out by the afternoon. Fair price, no surprises — exactly what they quoted.",
    source: "placeholder",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    // TODO: fictional placeholder name — replace with the real reviewer's name.
    author: "James T.",
    location: "Keller",
    rating: 5,
    text: "Hauled an old hot tub and a truckload of yard debris in one trip. Showed up on time and left the yard cleaner than before.",
    source: "placeholder",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    // TODO: fictional placeholder name — replace with the real reviewer's name.
    author: "Sarah K.",
    location: "Arlington",
    rating: 5,
    text: "Used them for a full estate cleanout. Respectful, hard-working crew — treated the house like it was their own.",
    source: "placeholder",
    isPlaceholder: true,
  },
];

export const hasRealReviews =
  reviews.length > 0 && reviews.every((review) => !review.isPlaceholder);
