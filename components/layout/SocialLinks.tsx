import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { isPlaceholderHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const profiles = [
  { name: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { name: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
];

/**
 * Social profile icons. Profiles still set to "#" in site-config render as
 * non-clickable icons so there are no dead links before launch.
 * TODO: client to add real Facebook/Instagram URLs in lib/site-config.ts.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-3", className)}>
      {profiles.map(({ name, href, Icon }) => {
        const iconClasses =
          "flex size-11 items-center justify-center rounded-full border border-line-strong text-silver transition-colors";
        return (
          <li key={name}>
            {isPlaceholderHref(href) ? (
              <span className={iconClasses} title={`${name} — coming soon`}>
                <Icon className="size-5" />
                <span className="sr-only">
                  {siteConfig.socialHandle} on {name}
                </span>
              </span>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(iconClasses, "hover:border-orange hover:text-orange")}
              >
                <Icon className="size-5" />
                <span className="sr-only">
                  {siteConfig.socialHandle} on {name} (opens in a new tab)
                </span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
