import { MessageSquare, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

const path = "/thank-you";

/**
 * Confirmation page for estimate requests submitted WITHOUT JavaScript (the
 * form's native POST fallback redirects here). With JavaScript, the form shows
 * its inline success message instead. Not indexed and not in the sitemap.
 */
export const metadata = createMetadata({
  title: "Estimate Request Received",
  description: `Thanks for contacting ${siteConfig.businessName}. We'll get back to you shortly with your free junk removal estimate.`,
  path,
  noIndex: true,
  ogImage: "/opengraph-image", // no colocated OG image file for this route
});

export default function ThankYouPage() {
  return (
    <PageHero
      eyebrow="Request Received"
      title="Got It! We'll Be in Touch Shortly"
      description={`Thanks for reaching out to ${siteConfig.businessName}. We'll get back to you shortly with your free estimate. Need it faster? Call or text — ${siteConfig.tagline}`}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Contact", href: "/contact" },
        { name: "Thank You", href: path },
      ]}
      showCtas={false}
    >
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={siteConfig.phoneHref} size="lg">
          <Phone aria-hidden="true" className="size-5" />
          Call {siteConfig.phoneDisplay}
        </Button>
        <Button href={siteConfig.smsHref} variant="secondary" size="lg">
          <MessageSquare aria-hidden="true" className="size-5" />
          Text Us a Photo
        </Button>
      </div>
    </PageHero>
  );
}
