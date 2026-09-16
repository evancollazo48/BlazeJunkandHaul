import Image from "next/image";
import { Check, MessageSquare, Phone } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EstimateLink } from "@/components/ui/EstimateLink";
import { heroChecks } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

interface HeroProps {
  /** Mobile/tablet hero background — defaults to siteConfig.heroImage. */
  image?: { src: string; alt: string; objectPosition?: string };
  /** Desktop (lg+) hero background — defaults to siteConfig.heroImageDesktop. */
  desktopImage?: { src: string; alt: string; objectPosition?: string };
}

export function Hero({
  image = siteConfig.heroImage,
  desktopImage = siteConfig.heroImageDesktop,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b-4 border-orange"
    >
      {/* Two crops of the same photo — see the comment on heroImage in
          site-config.ts for why one crop can't serve both breakpoints. Only
          one is ever laid out at a time (the other is `display:none`), so
          only one enters the accessibility tree. Both are preloaded since
          either can be the page's LCP image depending on viewport. */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover lg:hidden"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      <Image
        src={desktopImage.src}
        alt={desktopImage.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 hidden object-cover lg:block"
        style={{ objectPosition: desktopImage.objectPosition ?? "center" }}
      />
      {/* Dark fade concentrated under the text column only so the photo — the
          crew member and the loaded truck bed — reads at full brightness on
          the right, not washed out across the whole image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-black from-0% via-black/65 via-36% to-transparent to-54%"
      />

      <Container className="flex min-h-[calc(100svh-9rem)] flex-col justify-center py-14 sm:py-20 md:min-h-[calc(100svh-5rem)] lg:min-h-[680px]">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.3em] text-orange uppercase sm:text-sm">
            ★ Fort Worth ★ DFW ★
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-display text-[2.5rem] leading-[0.98] font-bold tracking-tight text-balance text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl lg:text-7xl"
          >
            Fort Worth Junk Removal, Cleanouts &amp; Hauling
          </h1>
          <p className="mt-5 font-display text-2xl font-bold text-orange italic sm:text-3xl">
            &ldquo;{siteConfig.tagline}&rdquo;
          </p>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Local, family-owned junk removal serving Fort Worth and the entire DFW area. Free
            estimates, upfront pricing, and same-day or next-day service. Big job or small — we haul
            it all.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EstimateLink className={buttonClasses({ size: "lg" })}>
              Get a Free Estimate
            </EstimateLink>
            <Button href={siteConfig.phoneHref} variant="secondary" size="lg">
              <Phone aria-hidden="true" className="size-5" />
              Call {siteConfig.phoneDisplay}
            </Button>
          </div>
          <a
            href={siteConfig.smsHref}
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-orange hover:underline"
          >
            <MessageSquare aria-hidden="true" className="size-4 text-orange" />
            Prefer to text? Send us a photo for a fast quote
          </a>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {heroChecks.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-white">
                <Check aria-hidden="true" className="size-4 text-orange" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
