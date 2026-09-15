import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { ServiceArea } from "@/lib/service-areas-data";
import type { Service } from "@/lib/services-data";
import { cn } from "@/lib/utils";

interface RelatedLinksProps {
  services?: Service[];
  areas?: ServiceArea[];
  servicesTitle?: string;
  areasTitle?: string;
}

/** Internal cross-links to related services and nearby service areas (local SEO). */
export function RelatedLinks({
  services = [],
  areas = [],
  servicesTitle = "Related Services",
  areasTitle = "Nearby Service Areas",
}: RelatedLinksProps) {
  const hasBoth = services.length > 0 && areas.length > 0;

  return (
    <section aria-label="Related pages" className="border-t border-line py-16 sm:py-20">
      <Container className={cn(hasBoth && "grid gap-12 lg:grid-cols-2")}>
        {services.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-white uppercase">
              {servicesTitle}
            </h2>
            <ul className="mt-5 grid gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center gap-4 border border-line bg-panel p-4 transition-colors hover:border-orange"
                  >
                    <ServiceIcon icon={service.icon} className="size-11" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display font-bold text-white transition-colors group-hover:text-orange">
                        {service.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-silver-dim">
                        {service.summary}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-orange transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {areas.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-white uppercase">{areasTitle}</h2>
            <ul
              className={cn(
                "mt-5 grid gap-3 sm:grid-cols-2",
                hasBoth ? "lg:grid-cols-1 xl:grid-cols-2" : "lg:grid-cols-4",
              )}
            >
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={area.href}
                    className="group flex min-h-16 items-center gap-3 border border-line bg-panel px-4 py-3 transition-colors hover:border-orange"
                  >
                    <MapPin aria-hidden="true" className="size-5 shrink-0 text-orange" />
                    <span className="flex-1 font-display font-bold text-white transition-colors group-hover:text-orange">
                      Junk Removal in {area.name}
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-orange" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="group flex min-h-16 items-center gap-3 border border-dashed border-line-strong px-4 py-3 transition-colors hover:border-orange"
                >
                  <span className="flex-1 font-display font-bold text-orange">
                    All DFW Service Areas
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-orange" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
