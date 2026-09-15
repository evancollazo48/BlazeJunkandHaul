import { MessageSquare, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ESTIMATE_SECTION_ID } from "@/lib/navigation";
import type { BreadcrumbItem } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ContactDetails } from "./ContactDetails";
import { ContactForm } from "./ContactForm";

interface EstimateSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** "h1" when this section is the whole page (/contact). */
  as?: "h1" | "h2";
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

/**
 * The site's ONLY estimate section: call/text buttons, the website discount,
 * contact details and the lead form. Never add another section about getting
 * an estimate — point buttons here with <EstimateLink /> instead.
 */
export function EstimateSection({
  eyebrow = "Free Estimates",
  title = "Ready to Reclaim Your Space?",
  description = "Free estimates. Upfront prices. Fast, friendly service across Fort Worth and the DFW area. Call or text a photo for a price in minutes — or send the form and we'll get right back to you.",
  as: Heading = "h2",
  breadcrumbs,
  className,
}: EstimateSectionProps) {
  const { promo } = siteConfig;

  return (
    <section
      id={ESTIMATE_SECTION_ID}
      // Focus target for <EstimateLink /> so keyboard users land in this section.
      tabIndex={-1}
      aria-labelledby="estimate-heading"
      className={cn(
        "relative isolate overflow-hidden border-t-4 border-orange bg-black py-20 outline-none sm:py-24",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(242,106,33,0.16),transparent_55%)]"
      />
      {/* *:min-w-0 lets long values (e.g. the email address) wrap on 320px phones. */}
      <Container className="grid gap-12 *:min-w-0 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          {breadcrumbs && (
            <div className="mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading
            id="estimate-heading"
            className="mt-3 font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance text-white uppercase sm:text-5xl"
          >
            {title}
          </Heading>
          <p className="mt-5 max-w-xl text-lg text-silver">{description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Button href={siteConfig.phoneHref} size="lg">
              <Phone aria-hidden="true" className="size-5" />
              Call {siteConfig.phoneDisplay}
            </Button>
            <Button href={siteConfig.smsHref} variant="secondary" size="lg">
              <MessageSquare aria-hidden="true" className="size-5" />
              Text Us a Photo
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-5 border border-orange/50 bg-orange/10 p-5">
            <p className="shrink-0 font-display text-5xl leading-none font-bold text-orange">
              {promo.amount}
              <span className="text-3xl">+</span>
            </p>
            <div>
              <p className="font-display text-lg leading-tight font-bold text-white uppercase">
                Off your haul
              </p>
              <p className="mt-1 text-sm text-silver">{promo.body}</p>
            </div>
          </div>

          <ContactDetails className="mt-8" />
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
