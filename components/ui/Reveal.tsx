"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating — handy for staggering grid items. */
  delay?: number;
}

/**
 * Fades/slides content in the first time it scrolls into view.
 *
 * The server HTML is always fully visible: content is only hidden after
 * hydration, and only if it starts below the fold. Crawlers (which render in a
 * tall viewport), visitors without JavaScript, reduced-motion users and
 * anything already on screen never see hidden content.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const armed = useRef(false);

  useEffect(() => {
    const element = scope.current;
    if (!element || reduceMotion) return;
    if (element.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      animate(element, { opacity: 0, y: 24 }, { duration: 0 });
    }
  }, [animate, reduceMotion, scope]);

  useEffect(() => {
    const element = scope.current;
    if (!element || !inView || !armed.current) return;
    animate(element, { opacity: 1, y: 0 }, { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] });
  }, [inView, animate, delay, scope]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
