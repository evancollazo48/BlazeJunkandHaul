import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews, type Review } from "@/lib/reviews-data";
import { isPlaceholderHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: Review["rating"] }) {
  return (
    <div role="img" aria-label={`Rated ${rating} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn("size-4 text-orange", index < rating && "fill-orange")}
        />
      ))}
    </div>
  );
}

function ProfileLink({ href, label }: { href: string; label: string }) {
  if (isPlaceholderHref(href)) return <span className="font-semibold text-white">{label}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-orange underline-offset-4 hover:underline"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Testimonials. Data lives in lib/reviews-data.ts.
 * TODO: client to replace the placeholder reviews with real Google/Facebook reviews.
 */
export function Reviews() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="border-y border-line bg-panel py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="reviews-heading"
          eyebrow="Word On The Street"
          title="What Your Neighbors Say"
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <figure className="flex h-full flex-col border border-line bg-black p-7">
                  <StarRating rating={review.rating} />
                  <blockquote className="mt-4 flex-1 text-silver italic">
                    <p>&ldquo;{review.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 font-display text-sm font-bold tracking-wide text-white uppercase">
                    — {review.author}, <span className="text-silver-dim">{review.location}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-silver-dim">
          Find us on <ProfileLink href={siteConfig.social.google} label="Google" />,{" "}
          <ProfileLink href={siteConfig.social.facebook} label="Facebook" />, and{" "}
          <ProfileLink href={siteConfig.social.instagram} label="Instagram" /> —{" "}
          {siteConfig.socialHandle}.
        </p>
      </Container>
    </section>
  );
}
