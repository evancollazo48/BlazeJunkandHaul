import { EstimateSection } from "@/components/sections/EstimateSection";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const path = "/contact";

export const metadata = createMetadata({
  title: "Contact Us — Free Junk Removal Estimates in Fort Worth",
  description: `Get a free junk removal estimate in Fort Worth & DFW. Call or text ${siteConfig.phoneDisplay}, send photos for a fast quote, or fill out our quick form.`,
  path,
});

// The contact page is just the site's one estimate section, as the page heading.
export default function ContactPage() {
  return (
    <>
      <EstimateSection
        as="h1"
        eyebrow="Contact Blaze"
        title="Get a Free Junk Removal Estimate"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: path },
        ]}
      />

      {/* TODO (optional): paste a Google Maps embed URL into siteConfig.mapEmbedUrl to show a map here. */}
      {siteConfig.mapEmbedUrl && (
        <section aria-label="Service area map" className="border-t border-line">
          <iframe
            src={siteConfig.mapEmbedUrl}
            title={`Map of the ${siteConfig.businessName} service area in ${siteConfig.addressLocality}, ${siteConfig.addressRegion}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-96 w-full border-0"
          />
        </section>
      )}
    </>
  );
}
