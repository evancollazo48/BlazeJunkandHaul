import { EstimateSection } from "@/components/sections/EstimateSection";
import { PageHero } from "@/components/sections/PageHero";
import { Reviews } from "@/components/sections/Reviews";
import { WhyBlaze } from "@/components/sections/WhyBlaze";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const path = "/about";

export const metadata = createMetadata({
  title: "About Us — Family-Owned Junk Removal in Fort Worth",
  description:
    "Local, family-owned junk removal in Fort Worth, TX — not a franchise. Upfront pricing, on-time crews, and real respect for your property.",
  path,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Blaze"
        title="Family-Owned Junk Removal, Built in Fort Worth"
        description={`Meet the Fort Worth family behind the truck and trailer. ${siteConfig.tagline}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: path },
        ]}
      />
      <WhyBlaze eyebrow="Our Story" image="flyer" />
      <Reviews />
      <EstimateSection />
    </>
  );
}
