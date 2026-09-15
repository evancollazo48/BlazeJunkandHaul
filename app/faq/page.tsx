import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { generalFaqs } from "@/lib/faq-data";
import { createMetadata } from "@/lib/metadata";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

const path = "/faq";

export const metadata = createMetadata({
  title: "Junk Removal FAQs — Pricing, Same-Day Service & More",
  description: `Answers to common junk removal questions: cost, same-day pickup in Fort Worth & DFW, what we haul, payment and more. Call or text ${siteConfig.phoneDisplay}.`,
  path,
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Junk Removal Questions, Answered"
        description="Straight answers about pricing, scheduling, and what we haul across Fort Worth and DFW."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: path },
        ]}
      />

      <FaqSection items={generalFaqs} eyebrow="The Basics" title="Frequently Asked Questions" />

      <section
        aria-labelledby="service-faq-heading"
        className="border-t border-line bg-panel py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="service-faq-heading"
            eyebrow="By Service"
            title="Service-Specific Questions"
            description="Each service page answers the questions we hear most about that kind of job."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}#faq-heading`}
                  className="group flex h-full items-center gap-4 border border-line bg-black p-5 transition-colors hover:border-orange"
                >
                  <ServiceIcon icon={service.icon} className="size-11" />
                  <span className="flex-1 font-display font-bold text-white transition-colors group-hover:text-orange">
                    {service.name} FAQs
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-orange" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <EstimateSection
        eyebrow="Ask Us Anything"
        title="Still Have Questions?"
        description={`Call or text ${siteConfig.phoneDisplay} — you'll talk directly to the people who show up in the truck. Or send the form and we'll get right back to you.`}
      />
    </>
  );
}
