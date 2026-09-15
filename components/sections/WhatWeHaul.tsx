import { Camera, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { hazardousNote, whatWeHaulIntro } from "@/lib/content";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface WhatWeHaulProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Localizes card links for screen readers on city pages. */
  city?: string;
  className?: string;
}

/**
 * The one section about services and the items we take: service cards, the
 * item summary, and what we can't haul.
 */
export function WhatWeHaul({
  eyebrow = "What We Haul",
  title = "Junk Removal ★ Cleanouts ★ Hauling",
  description = whatWeHaulIntro,
  city,
  className,
}: WhatWeHaulProps) {
  return (
    <section aria-labelledby="services-heading" className={cn("py-20 sm:py-24", className)}>
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug} className="bg-black">
              <Reveal delay={index * 0.05} className="h-full">
                <ServiceCard service={service} city={city} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border border-dashed border-line-strong px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-silver-dim sm:items-center">
            <TriangleAlert aria-hidden="true" className="size-5 shrink-0 text-orange" />
            <span>
              {hazardousNote.lead} <strong className="text-white">{hazardousNote.emphasis}</strong>
            </span>
          </p>
          <a
            href={siteConfig.smsHref}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 font-display text-sm font-bold tracking-wider text-orange uppercase underline-offset-4 hover:underline"
          >
            <Camera aria-hidden="true" className="size-4" />
            Not sure? Text us a photo
          </a>
        </div>
      </Container>
    </section>
  );
}
