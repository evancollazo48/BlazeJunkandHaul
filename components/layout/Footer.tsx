import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { legalNav, mainNav } from "@/lib/navigation";
import { serviceAreas } from "@/lib/service-areas-data";
import { services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

const linkClass = "inline-block py-1.5 text-sm text-silver-dim transition-colors hover:text-orange";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-sm font-bold tracking-[0.15em] text-white uppercase">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-black-soft pt-16 pb-8">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={64}
                height={64}
                className="size-16 rounded-full border-2 border-orange object-cover"
              />
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold text-white uppercase">
                  {siteConfig.businessName}
                </span>
                <span className="mt-1 block font-display text-[0.7rem] font-semibold tracking-[0.15em] text-orange uppercase">
                  Junk Removal ★ Cleanouts ★ Hauling
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-silver-dim">
              <span className="font-semibold text-white">&ldquo;{siteConfig.tagline}&rdquo;</span>{" "}
              Local, family-owned junk removal serving Fort Worth and the DFW area.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* Contact / NAP */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <address className="space-y-3 text-sm text-silver-dim not-italic">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 py-1 transition-colors hover:text-orange"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-orange" />
                <span>
                  Call <span className="font-semibold text-white">{siteConfig.phoneDisplay}</span>
                </span>
              </a>
              <a
                href={siteConfig.smsHref}
                className="flex items-center gap-3 py-1 transition-colors hover:text-orange"
              >
                <MessageSquare aria-hidden="true" className="size-4 shrink-0 text-orange" />
                <span>Text us a photo for a fast quote</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 py-1 break-all transition-colors hover:text-orange"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-orange" />
                <span>{siteConfig.email}</span>
              </a>
              <p className="flex items-start gap-3 py-1">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-orange" />
                <span>
                  {siteConfig.addressLocality}, {siteConfig.addressRegion} — serving{" "}
                  {siteConfig.serviceRadius}
                </span>
              </p>
              <p className="flex items-center gap-3 py-1">
                <Clock aria-hidden="true" className="size-4 shrink-0 text-orange" />
                <span>{siteConfig.hours}</span>
              </p>
            </address>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <FooterHeading>Services</FooterHeading>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={`${linkClass} font-semibold text-orange`}>
                  All services →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service areas */}
          <nav aria-label="Service areas">
            <FooterHeading>Service Areas</FooterHeading>
            <ul className="grid grid-cols-2 gap-x-4">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link href={area.href} className={linkClass}>
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-silver-dim lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5">
              {[...mainNav, ...legalNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            © {year} {siteConfig.businessName} • {siteConfig.addressLocality},{" "}
            {siteConfig.addressRegion} • Call or text:{" "}
            <a href={siteConfig.phoneHref} className="font-semibold text-orange hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
