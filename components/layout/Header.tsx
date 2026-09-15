import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EstimateLink } from "@/components/ui/EstimateLink";
import { siteConfig } from "@/lib/site-config";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-20 items-center justify-between gap-4 transition-[height] duration-300 group-data-[scrolled=true]:h-16">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.logo.alt}
            width={56}
            height={56}
            loading="eager"
            className="size-14 rounded-full border-2 border-orange object-cover transition-[width,height] duration-300 group-data-[scrolled=true]:size-11"
          />
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-tight text-white uppercase">
              Blaze
            </span>
            <span className="mt-1 block font-display text-[0.65rem] font-semibold tracking-[0.25em] text-orange uppercase">
              Junk &amp; Haul
            </span>
            <span className="sr-only"> — home</span>
          </span>
        </Link>

        <NavLinks />

        <div className="flex items-center gap-2">
          {/* Responsive visibility lives on wrappers: a `hidden` class passed to
              Button would conflict with its base `inline-flex` display class. */}
          <div className="hidden sm:block">
            <Button
              href={siteConfig.phoneHref}
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
            >
              <Phone aria-hidden="true" className="size-4" />
              <span className="sr-only">Call </span>
              {siteConfig.phoneDisplay}
            </Button>
          </div>
          <div className="hidden md:block">
            <EstimateLink className={buttonClasses({ size: "sm", className: "whitespace-nowrap" })}>
              Free Estimate
            </EstimateLink>
          </div>
          <MobileNav />
        </div>
      </Container>
    </HeaderShell>
  );
}
