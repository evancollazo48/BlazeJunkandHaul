import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { getServiceAreasByNames } from "@/lib/service-areas-data";
import { getServiceBySlug, getServicesBySlugs, services } from "@/lib/services-data";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

// Only the services defined in lib/services-data.ts exist; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).service);
  if (!service) return {};
  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug((await params).service);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const relatedServices = getServicesBySlugs(service.related);
  const nearbyAreas = getServiceAreasByNames(service.featuredAreas);

  return (
    <>
      <PageHero
        eyebrow="Fort Worth ★ DFW"
        title={service.h1}
        description={service.intro[0]}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: path },
        ]}
      />

      <section aria-labelledby="details-heading" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="details-heading"
              align="left"
              eyebrow={service.name}
              title={`${service.name} the Blaze Way`}
            />
            <div className="mt-6 space-y-4 text-lg text-silver">
              {service.intro.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-10 font-display text-2xl font-bold text-white uppercase">
              {service.highlightsTitle}
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {service.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 border-b border-line py-3 text-silver"
                >
                  <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-orange" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-labelledby="ideal-heading"
            className="self-start border border-line bg-panel p-7 sm:p-8 lg:sticky lg:top-24"
          >
            <ServiceIcon icon={service.icon} />
            <h3
              id="ideal-heading"
              className="mt-5 font-display text-xl font-bold text-white uppercase"
            >
              Great For
            </h3>
            <ul className="mt-4 space-y-2.5">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-3 text-silver">
                  <span aria-hidden="true" className="text-orange">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <HowItWorks />

      <FaqSection
        items={service.faqs}
        eyebrow={service.name}
        title={`${service.name} FAQs`}
        description="Straight answers to the questions we hear most."
      />

      <RelatedLinks
        services={relatedServices}
        areas={nearbyAreas}
        servicesTitle="Related Services"
        areasTitle={`${service.name} Near You`}
      />

      <EstimateSection title={`Need ${service.name} in DFW?`} />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
