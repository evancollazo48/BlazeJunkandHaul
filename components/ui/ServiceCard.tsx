import Link from "next/link";
import type { Service } from "@/lib/services-data";
import { Card } from "./Card";
import { ServiceIcon } from "./ServiceIcon";

interface ServiceCardProps {
  service: Service;
  /** Optional city name to localize the card copy, e.g. on /service-areas/arlington. */
  city?: string;
}

/** Whole-card clickable service tile (stretched link keeps one tab stop per card). */
export function ServiceCard({ service, city }: ServiceCardProps) {
  return (
    <Card as="article" interactive className="flex h-full flex-col p-7 sm:p-8">
      <ServiceIcon icon={service.icon} />
      <h3 className="mt-5 font-display text-xl leading-snug font-bold text-white">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-orange"
        >
          {service.name}
          {city && <span className="sr-only"> in {city}</span>}
        </Link>
      </h3>
      <p className="mt-3 text-[0.95rem] text-silver-dim">{service.summary}</p>
    </Card>
  );
}
