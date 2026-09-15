"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation (hidden below the lg breakpoint, where MobileNav takes over). */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center font-display text-sm font-semibold tracking-wider uppercase transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:bg-orange after:transition-transform hover:text-orange hover:after:scale-x-100",
                  active ? "text-orange after:scale-x-100" : "text-silver after:scale-x-0",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
