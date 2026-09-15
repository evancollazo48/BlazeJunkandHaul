import { EstimateSection } from "@/components/sections/EstimateSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PageHero } from "@/components/sections/PageHero";
import { WhatWeHaul } from "@/components/sections/WhatWeHaul";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const path = "/services";

export const metadata = createMetadata({
  title: "Junk Removal & Hauling Services in Fort Worth, TX",
  description: `Junk removal, cleanouts, furniture & appliance removal, yard debris, construction debris and commercial hauling in Fort Worth & DFW. Call ${siteConfig.phoneDisplay}.`,
  path,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Junk Removal & Hauling Services in Fort Worth & DFW"
        description="One call handles it all. From a single couch to a full estate cleanout, Blaze Junk & Haul does the heavy lifting across Fort Worth and the DFW Metroplex."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: path },
        ]}
      />
      <WhatWeHaul title="Every Job We Tackle" />
      <HowItWorks />
      <EstimateSection />
    </>
  );
}
