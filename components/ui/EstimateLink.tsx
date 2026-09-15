"use client";

import Link from "next/link";
import { ESTIMATE_FALLBACK_HREF, ESTIMATE_SECTION_ID } from "@/lib/navigation";

interface EstimateLinkProps {
  className?: string;
  children: React.ReactNode;
  /** Runs before scrolling, e.g. to close the mobile menu. */
  onClick?: () => void;
}

/**
 * Every "Free Estimate" button uses this. It scrolls to the estimate section
 * on the current page and moves keyboard focus there. On pages without that
 * section (legal pages, 404), or without JavaScript, it goes to /contact.
 */
export function EstimateLink({ className, children, onClick }: EstimateLinkProps) {
  return (
    <Link
      href={ESTIMATE_FALLBACK_HREF}
      className={className}
      onClick={(event) => {
        onClick?.();
        const section = document.getElementById(ESTIMATE_SECTION_ID);
        if (!section) return; // Let the link navigate to /contact instead.

        event.preventDefault();
        // Synchronous on purpose: closing the mobile menu <dialog> (in onClick above)
        // releases its scroll lock immediately, and scrollIntoView forces the layout.
        // "auto" follows the CSS scroll-behavior: smooth normally, instant for reduced motion.
        section.scrollIntoView({ block: "start" });
        section.focus({ preventScroll: true });
        history.replaceState(null, "", `#${ESTIMATE_SECTION_ID}`);
      }}
    >
      {children}
    </Link>
  );
}
