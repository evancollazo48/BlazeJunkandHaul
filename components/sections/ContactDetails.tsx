import { Clock, Flame, Mail, MapPin, type LucideIcon } from "lucide-react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface DetailRow {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

// Phone isn't listed here: the call/text buttons right above it show the number.
const rows: DetailRow[] = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  // TODO: client to confirm hours in lib/site-config.ts
  { icon: Clock, label: "Hours", value: siteConfig.hours },
  { icon: MapPin, label: "Serving", value: siteConfig.serviceRadius },
];

/** Compact NAP details + social links. Every value comes from lib/site-config.ts. */
export function ContactDetails({ className }: { className?: string }) {
  return (
    <div className={cn("border-t border-line pt-6", className)}>
      <address className="not-italic">
        <ul className="grid gap-3">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-start gap-3 text-silver">
              <Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-orange" />
              <span className="min-w-0 break-words">
                <span className="sr-only">{label}: </span>
                {href ? (
                  <a href={href} className="transition-colors hover:text-orange">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </span>
            </li>
          ))}
        </ul>
      </address>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <SocialLinks />
        <p className="inline-flex items-center gap-2 font-display font-bold tracking-[0.15em] text-orange uppercase">
          {siteConfig.tagline}
          <Flame aria-hidden="true" className="size-5" />
        </p>
      </div>
    </div>
  );
}
