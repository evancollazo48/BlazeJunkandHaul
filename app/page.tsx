import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceAreaList } from "@/components/sections/ServiceAreaList";
import { WhatWeHaul } from "@/components/sections/WhatWeHaul";
import { WhyBlaze } from "@/components/sections/WhyBlaze";
import { generalFaqs } from "@/lib/faq-data";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createMetadata({
  title: `${siteConfig.businessName} | Fort Worth Junk Removal, Cleanouts & Hauling`,
  description: `Family-owned junk removal in Fort Worth & DFW. Free estimates, upfront pricing, same-day or next-day service. Call or text ${siteConfig.phoneDisplay}.`,
  path: "/",
  absoluteTitle: true,
});

// One section per topic — nothing repeats. Services come right after the hero,
// then the estimate section, so visitors see what we haul and can get a quote fast.
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeHaul />
      <EstimateSection />
      <HowItWorks />
      <WhyBlaze />
      <Reviews />
      <ServiceAreaList />
      <FaqSection
        className="border-t border-line bg-panel"
        items={generalFaqs.slice(0, 5)}
        showAllLink
      />
    </>
  );
}
