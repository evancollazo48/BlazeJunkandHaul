import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/lib/faq-data";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "./FaqAccordion";

interface FaqSectionProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showAllLink?: boolean;
  className?: string;
}

/** FAQ accordion + matching FAQPage structured data. */
export function FaqSection({
  items,
  eyebrow = "Questions",
  title = "Frequently Asked Questions",
  description,
  showAllLink = false,
  className,
}: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-heading" className={cn("py-20 sm:py-24", className)}>
      <Container size="narrow">
        <SectionHeading
          id="faq-heading"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-12">
          <FaqAccordion items={items} />
        </div>
        {showAllLink && (
          <p className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex min-h-11 items-center gap-2 font-display text-sm font-bold tracking-wider text-orange uppercase underline-offset-4 hover:underline"
            >
              See all FAQs
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </p>
        )}
      </Container>
      <JsonLd data={faqPageSchema(items)} />
    </section>
  );
}
