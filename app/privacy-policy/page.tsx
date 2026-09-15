import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

/*
 * ============================================================================
 *  TODO: PLACEHOLDER LEGAL CONTENT — must be reviewed by a qualified attorney
 *  before launch and updated whenever data practices change (e.g. adding
 *  analytics, ad pixels, or call tracking).
 * ============================================================================
 */

const path = "/privacy-policy";
const lastUpdated = "September 11, 2026"; // TODO: update after legal review

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.businessName} collects, uses, and protects the information you share when requesting a junk removal estimate.`,
  path,
  ogImage: "/opengraph-image", // no colocated OG image file for this route
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: path },
        ]}
        showCtas={false}
      />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <Prose>
            <p>
              {siteConfig.businessName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              respects your privacy. This policy explains what information we collect through this
              website, how we use it, and the choices you have.
            </p>

            <h2>Information We Collect</h2>
            <p>
              <strong>Information you give us.</strong> When you request a free estimate, we collect
              the details you enter: your name, phone number, email address (optional), city or ZIP
              code, and a description of the items you need hauled. If you call, text, or message
              us, we receive your phone number or profile name and the content of your message,
              including any photos you send.
            </p>
            <p>
              <strong>Information collected automatically.</strong> Like most websites, our hosting
              provider records basic technical data such as IP address, browser type, and pages
              visited, which is used for security and to keep the site running.
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to your estimate request and provide pricing.</li>
              <li>To schedule, perform, and follow up on junk removal and hauling jobs.</li>
              <li>To communicate with you by phone, text message, or email about your request.</li>
              <li>To keep our website secure and working properly.</li>
            </ul>
            <p>
              <strong>We do not sell or rent your personal information.</strong>
            </p>

            <h2>How We Share Information</h2>
            <p>
              We share information only with service providers that help us run our business — for
              example, our website host and the email service that delivers form submissions to our
              inbox — and only as needed to provide those services. We may also disclose information
              if required by law.
            </p>

            <h2>Text Messages &amp; Calls</h2>
            <p>
              If you text or call us, we use your number only to respond to you about your request.
              Standard message and data rates from your carrier may apply.
            </p>

            <h2>Cookies</h2>
            <p>
              This website does not currently use advertising or analytics cookies. If that changes,
              we will update this policy.
            </p>

            <h2>Data Retention &amp; Your Choices</h2>
            <p>
              We keep estimate requests only as long as needed to serve you and meet our business
              and legal obligations. You can ask us to access, correct, or delete the information
              you&apos;ve shared by contacting us using the details below.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              This website is not directed to children under 13, and we do not knowingly collect
              their personal information.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The &ldquo;last updated&rdquo; date above
              shows when it was last revised.
            </p>

            <h2>Contact Us</h2>
            <p>
              {siteConfig.businessName}
              <br />
              {siteConfig.addressLocality}, {siteConfig.addressRegion}
              <br />
              Phone: <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              <br />
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
