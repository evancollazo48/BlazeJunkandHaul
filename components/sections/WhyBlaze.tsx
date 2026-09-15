import Image from "next/image";
import { BadgeDollarSign, BicepsFlexed, Clock, House, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutStory, pillars, type PillarIconKey } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const pillarIcons: Record<PillarIconKey, LucideIcon> = {
  reliable: Clock,
  affordable: BadgeDollarSign,
  hardWorking: BicepsFlexed,
  local: House,
};

interface WhyBlazeProps {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Story paragraphs. Defaults to the brand story; city pages pass local copy. */
  paragraphs?: React.ReactNode[];
  /** "logo" (default) or the promo flyer. */
  image?: "logo" | "flyer";
  className?: string;
}

/**
 * The one "why choose us" section: brand story plus the four pillars
 * (reliable, affordable, hard working, local & family owned).
 */
export function WhyBlaze({
  eyebrow = "Why Blaze",
  title = (
    <>
      Local. Family Owned.
      <br />
      Fort Worth Proud.
    </>
  ),
  paragraphs = aboutStory,
  image = "logo",
  className,
}: WhyBlazeProps) {
  return (
    <section aria-labelledby="why-heading" className={cn("py-20 sm:py-24", className)}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionHeading id="why-heading" align="left" eyebrow={eyebrow} title={title} />
            <div className="mt-6 space-y-4 text-lg text-silver">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Reveal className="mx-auto w-full max-w-sm">
            {image === "logo" ? (
              // bg-[#000] matches the logo artwork's pure-black background exactly.
              <div className="border border-line bg-[#000] p-4 shadow-[0_0_80px_rgba(242,106,33,0.12)]">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  sizes="(min-width: 640px) 352px, 85vw"
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <Image
                src={siteConfig.promoImage.src}
                alt={siteConfig.promoImage.alt}
                width={siteConfig.promoImage.width}
                height={siteConfig.promoImage.height}
                sizes="(min-width: 640px) 384px, 90vw"
                className="h-auto w-full border border-line"
              />
            )}
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[pillar.icon];
            return (
              <li key={pillar.title} className="bg-black-soft">
                <Reveal delay={index * 0.06} className="h-full p-7">
                  <Icon aria-hidden="true" className="size-8 text-orange" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white uppercase">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 font-display text-sm font-bold text-orange">
                    {pillar.tagline}
                  </p>
                  <p className="mt-3 text-silver-dim">{pillar.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
