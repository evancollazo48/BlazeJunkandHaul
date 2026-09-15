import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { WhatWeHaul } from "@/components/sections/WhatWeHaul";
import { WhyBlaze } from "@/components/sections/WhyBlaze";
import { getCityFaqs } from "@/lib/faq-data";
import { createMetadata } from "@/lib/metadata";
import { cityServiceSchema } from "@/lib/schema";
import {
  getServiceAreaBySlug,
  getServiceAreasByNames,
  serviceAreas,
} from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

// One statically generated page per city in siteConfig.serviceAreas; others 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const area = getServiceAreaBySlug((await params).city);
  if (!area) return {};
  return createMetadata({
    title: `Junk Removal in ${area.name}, ${siteConfig.addressRegion}`,
    description: `Junk removal in ${area.name}, TX from a local, family-owned crew. Free estimates, upfront pricing & same-day service. Call ${siteConfig.phoneDisplay}.`,
    path: area.href,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const area = getServiceAreaBySlug((await params).city);
  if (!area) notFound();

  const localStory = [
    area.isHq
      ? "Blaze Junk & Haul is a family-owned junk removal company based right here in Fort Worth. When you call Blaze, you talk directly to the people who show up in the truck."
      : `Blaze Junk & Haul is a family-owned junk removal company based in Fort Worth, and ${area.name} sits ${area.location} — an easy run for our truck and trailer. When you call Blaze, you talk directly to the people who show up in the truck.`,
    `Whether you need a single couch picked up in ${area.name} or a full garage cleanout, you'll get a free estimate with the price up front. We do all the loading, hauling, and sweep-up — you point, we blaze.`,
  ];

  return (
    <>
      <PageHero
        eyebrow={`${area.county} ★ DFW`}
        title={`Junk Removal & Hauling in ${area.name}, TX`}
        description={area.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: area.name, href: area.href },
        ]}
      />

      <WhatWeHaul
        eyebrow={`Services in ${area.name}`}
        title={`What We Haul in ${area.name}`}
        city={area.name}
      />

      <WhyBlaze
        className="border-y border-line bg-panel"
        eyebrow={`Serving ${area.name}`}
        title={`Your Local ${area.name} Junk Removal Crew`}
        paragraphs={localStory}
      />

      <FaqSection
        items={getCityFaqs(area.name)}
        eyebrow={`${area.name} FAQs`}
        title={`Junk Removal in ${area.name}: Your Questions Answered`}
      />

      <RelatedLinks areas={getServiceAreasByNames(area.nearby)} areasTitle="Nearby Service Areas" />

      <EstimateSection title={`Got Junk in ${area.name}? Let's Blaze.`} />

      <JsonLd data={cityServiceSchema(area)} />
    </>
  );
}
