"use client";

import { useEffect, useRef } from "react";

/**
 * Sticky header wrapper. Sets `data-scrolled` on the <header> once the page is
 * scrolled so children can condense via `group-data-[scrolled=true]:` classes.
 * Writes to the DOM directly (no React state) so scrolling never re-renders.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const update = () => {
      header.dataset.scrolled = String(window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      ref={ref}
      className="group sticky top-0 z-50 border-b border-line bg-black/90 backdrop-blur-md transition-shadow data-[scrolled=true]:shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
    >
      {children}
    </header>
  );
}
