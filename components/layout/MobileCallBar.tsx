import { MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Persistent click-to-call / click-to-text bar pinned to the bottom of the
 * viewport on small screens only. Pure links — no JavaScript required.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-black/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.5)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2">
        <a
          href={siteConfig.phoneHref}
          className="flex min-h-16 items-center justify-center gap-2.5 bg-orange px-3 text-black active:bg-orange-dark active:text-white"
        >
          <Phone aria-hidden="true" className="size-5 shrink-0" strokeWidth={2.5} />
          <span className="flex flex-col items-start leading-tight">
            <span className="font-display text-sm font-bold tracking-wide uppercase">Call Now</span>
            <span className="text-xs font-semibold">{siteConfig.phoneDisplay}</span>
          </span>
        </a>
        <a
          href={siteConfig.smsHref}
          className="flex min-h-16 items-center justify-center gap-2.5 bg-panel px-3 text-white active:bg-panel-hover"
        >
          <MessageSquare
            aria-hidden="true"
            className="size-5 shrink-0 text-orange"
            strokeWidth={2.5}
          />
          <span className="flex flex-col items-start leading-tight">
            <span className="font-display text-sm font-bold tracking-wide uppercase">Text Us</span>
            <span className="text-xs text-silver">Send a photo</span>
          </span>
        </a>
      </div>
    </div>
  );
}
