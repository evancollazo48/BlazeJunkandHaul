import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreas } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** City chips — each one is a real link to its /service-areas/[city] landing page. */
export function CityChips({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap justify-center gap-2.5", className)}>
      {serviceAreas.map((area) => (
        <li key={area.slug}>
          <Link
            href={area.href}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 font-display text-sm font-semibold tracking-wide transition-colors",
              area.isHq
                ? "border-orange bg-orange/10 text-orange hover:bg-orange hover:text-black"
                : "border-line-strong text-silver hover:border-orange hover:text-orange",
            )}
          >
            {area.isHq && <MapPin aria-hidden="true" className="size-4" />}
            {area.name}
            {area.isHq && " (HQ)"}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ServiceAreaList({ className }: { className?: string }) {
  return (
    <section aria-labelledby="areas-heading" className={cn("py-20 sm:py-24", className)}>
      <Container className="text-center">
        <SectionHeading
          id="areas-heading"
          eyebrow="Where We Blaze"
          title="Proudly Serving Fort Worth & the DFW Area"
          description="Blaze Junk & Haul is based in Fort Worth and rolls out across the metroplex."
        />
        <CityChips className="mx-auto mt-10 max-w-4xl" />
        <p className="mt-10 text-lg text-white">
          Don&apos;t see your city? If you&apos;re in DFW,{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-orange underline-offset-4 hover:underline"
          >
            call {siteConfig.phoneDisplay}
          </a>{" "}
          anyway — <strong className="text-orange">odds are we&apos;ll blaze to you.</strong>
        </p>
      </Container>
    </section>
  );
}
