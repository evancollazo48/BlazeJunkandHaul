import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24 text-center sm:py-32">
      <Container size="narrow">
        <p
          aria-hidden="true"
          className="font-display text-8xl font-bold text-stroke-orange sm:text-9xl"
        >
          404
        </p>
        <h1 className="mt-6 font-display text-4xl font-bold text-white uppercase sm:text-5xl">
          Looks Like This Page Got Hauled Away
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-silver">
          The page you&apos;re looking for doesn&apos;t exist. But if you&apos;ve got junk in Fort
          Worth or DFW, you&apos;re in the right place.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href={siteConfig.phoneHref} variant="secondary" size="lg">
            <Phone aria-hidden="true" className="size-5" />
            Call {siteConfig.phoneDisplay}
          </Button>
          <Button href="/services" variant="outline" size="lg">
            View Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
