import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { PageHero } from "@/components/sections/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { serviceAreas } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";

const path = "/service-areas";

export const metadata = createMetadata({
  title: "Junk Removal Service Areas in Fort Worth & DFW",
  description: `Blaze Junk & Haul serves Fort Worth, Arlington, Keller, North Richland Hills, Mansfield, Grand Prairie & more DFW cities. Free estimates: ${siteConfig.phoneDisplay}.`,
  path,
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Blaze"
        title="Junk Removal Service Areas Across Fort Worth & DFW"
        description={`Blaze Junk & Haul is based in Fort Worth and rolls out across the metroplex. We proudly serve ${serviceAreas.length} cities in Tarrant County and beyond — pick yours for local details.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: path },
        ]}
      />

      <section aria-labelledby="cities-heading" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="cities-heading"
            eyebrow="Proudly Serving"
            title="Cities We Serve"
            description="Same crew, same upfront pricing, same-day and next-day service — everywhere we haul."
          />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <li key={area.slug} className="bg-black">
                <Card as="article" interactive className="flex h-full flex-col p-6 sm:p-7">
                  <h3 className="flex flex-wrap items-center gap-2 font-display text-xl font-bold text-white">
                    <Link
                      href={area.href}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-orange"
                    >
                      Junk Removal in {area.name}
                    </Link>
                    {area.isHq && <Badge tone="accent">HQ</Badge>}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-orange">{area.county}</p>
                  <p className="mt-3 flex-1 text-sm text-silver-dim">
                    {area.isHq
                      ? "Our Fort Worth home base — the truck and trailer are never far away."
                      : `Junk removal, cleanouts and hauling ${area.location}.`}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold tracking-wider text-orange uppercase"
                  >
                    View {area.name}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center text-lg text-white">
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

      <EstimateSection />
    </>
  );
}
