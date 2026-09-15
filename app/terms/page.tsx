import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

/*
 * ============================================================================
 *  TODO: PLACEHOLDER LEGAL CONTENT — must be reviewed by a qualified attorney
 *  before launch (liability, cancellations, damage claims, payment terms, and
 *  promotion rules in particular).
 * ============================================================================
 */

const path = "/terms";
const lastUpdated = "September 11, 2026"; // TODO: update after legal review

export const metadata = createMetadata({
  title: "Terms of Service",
  description: `Terms of service for the ${siteConfig.businessName} website and junk removal, cleanout, and hauling services in Fort Worth and DFW.`,
  path,
  ogImage: "/opengraph-image", // no colocated OG image file for this route
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: path },
        ]}
        showCtas={false}
      />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <Prose>
            <p>
              These terms apply to your use of this website and to services provided by{" "}
              {siteConfig.businessName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              By using the website or booking a job, you agree to these terms.
            </p>

            <h2>Estimates &amp; Pricing</h2>
            <p>
              Estimates are free and carry no obligation. Pricing is generally based on how much
              trailer space your items take up. Estimates given from photos or descriptions may be
              adjusted on site if the items differ from what was described, and we will confirm the
              final price with you before any work begins.
            </p>

            <h2>Scheduling</h2>
            <p>
              Same-day and next-day service is offered when the schedule allows and is not
              guaranteed. Please let us know as soon as possible if you need to reschedule.
            </p>

            <h2>Items We Cannot Accept</h2>
            <p>
              We do not haul hazardous materials, including paint, chemicals, gasoline, oil, and
              asbestos. We may decline any item we believe is unsafe or prohibited from disposal.
            </p>

            <h2>Your Responsibilities</h2>
            <ul>
              <li>You confirm you have the right to dispose of the items you ask us to remove.</li>
              <li>Please point out anything that should stay before we begin loading.</li>
              <li>Provide safe access to the items and the property.</li>
            </ul>

            <h2>Promotions</h2>
            <p>
              Website discounts (such as saving {siteConfig.promo.amount} or more) must be mentioned
              when booking, may vary by load size, cannot be combined with other offers unless
              stated, and may change or end at any time.
            </p>

            <h2>Payment</h2>
            <p>
              {/* TODO: client to confirm payment methods (see lib/site-config.ts). */}
              Payment is due when the job is complete. Accepted methods:{" "}
              {siteConfig.paymentMethods.join(", ")}.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              We work carefully and treat your property with respect. To the fullest extent
              permitted by law, our liability for any claim related to our services is limited to
              the amount you paid for the job in question. Please report any concerns to us
              promptly.
            </p>

            <h2>Website Use</h2>
            <p>
              Content on this website is provided for general information and may change without
              notice. Your use of personal information you submit is governed by our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of the State of Texas.</p>

            <h2>Contact Us</h2>
            <p>
              Questions about these terms? Call or text{" "}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
