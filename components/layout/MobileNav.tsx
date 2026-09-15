"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Menu, MessageSquare, Phone, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { EstimateLink } from "@/components/ui/EstimateLink";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { isActivePath } from "./NavLinks";

/**
 * Slide-in mobile menu built on the native <dialog> element, which provides
 * focus trapping, Escape-to-close and an inert background for free.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes (e.g. browser back button).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex size-11 items-center justify-center rounded-brand border border-line-strong text-white transition-colors hover:border-orange hover:text-orange lg:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          // Clicking the backdrop (outside the panel) closes the menu.
          if (event.target === dialogRef.current) closeMenu();
        }}
        className="fixed inset-y-0 mr-0 ml-auto h-dvh max-h-none w-[min(100%,24rem)] max-w-none border-l border-line bg-black-soft p-0 text-silver backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-slide-in-right lg:hidden"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-display text-lg font-bold text-white uppercase">
              {siteConfig.businessName}
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-brand border border-line-strong text-white transition-colors hover:border-orange hover:text-orange"
            >
              <X aria-hidden="true" className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="px-5 py-4">
            <ul>
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center border-b border-line font-display text-lg font-semibold tracking-wide uppercase",
                    pathname === "/" ? "text-orange" : "text-white",
                  )}
                >
                  Home
                </Link>
              </li>
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 items-center border-b border-line font-display text-lg font-semibold tracking-wide uppercase",
                        active ? "text-orange" : "text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 border-t border-line px-5 py-6">
            <a
              href={siteConfig.phoneHref}
              className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
            >
              <Phone aria-hidden="true" className="size-5" />
              Call {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.smsHref}
              className={buttonClasses({ variant: "secondary", size: "lg", className: "w-full" })}
            >
              <MessageSquare aria-hidden="true" className="size-5" />
              Text Us a Photo
            </a>
            <EstimateLink
              onClick={closeMenu}
              className={buttonClasses({ variant: "outline", size: "lg", className: "w-full" })}
            >
              Get a Free Estimate
            </EstimateLink>
            <p className="flex items-center justify-center gap-2 pt-2 text-sm text-silver-dim">
              <Clock aria-hidden="true" className="size-4 text-orange" />
              {siteConfig.hours}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
