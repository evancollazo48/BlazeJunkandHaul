import { MessageSquare, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EstimateLink } from "@/components/ui/EstimateLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { BreadcrumbItem } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

interface PageHeroProps {
  title: string;
  eyebrow?: string;
  description?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showCtas?: boolean;
  children?: React.ReactNode;
}

/**
 * Lightweight, image-free hero for inner pages: the H1 is the LCP element, so
 * these pages paint fast. A gradient hairline replaces a heavy section divider.
 */
export function PageHero({
  title,
  eyebrow,
  description,
  breadcrumbs,
  showCtas = true,
  children,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative isolate overflow-hidden border-b border-line bg-black-soft"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(242,106,33,0.16),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-orange/70 to-transparent"
      />
      <Container className="py-10 sm:py-14 lg:py-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="mt-6 max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            id="page-heading"
            className="mt-3 font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance text-white uppercase sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          {description && <div className="mt-5 max-w-2xl text-lg text-silver">{description}</div>}

          {showCtas && (
            <>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EstimateLink className={buttonClasses({ size: "lg" })}>
                  Get a Free Estimate
                </EstimateLink>
                <Button href={siteConfig.phoneHref} variant="secondary" size="lg">
                  <Phone aria-hidden="true" className="size-5" />
                  Call {siteConfig.phoneDisplay}
                </Button>
              </div>
              <a
                href={siteConfig.smsHref}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-orange hover:underline"
              >
                <MessageSquare aria-hidden="true" className="size-4 text-orange" />
                Prefer to text? Send us a photo for a fast quote
              </a>
            </>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
