"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/faq-data";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index of the item open on first render (null = all closed). */
  defaultOpenIndex?: number | null;
  headingLevel?: "h2" | "h3";
}

/**
 * Accessible accordion (WAI-ARIA APG pattern): each question is a real <button>
 * inside a heading with aria-expanded / aria-controls. Answers are always in the
 * server-rendered HTML (crawlable) and use the `hidden` attribute when closed.
 */
export function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  headingLevel = "h3",
}: FaqAccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(
    () => new Set(defaultOpenIndex === null ? [] : [defaultOpenIndex]),
  );
  const Heading = headingLevel;

  const toggle = (index: number) =>
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const open = openItems.has(index);
        const buttonId = `${baseId}-question-${index}`;
        const panelId = `${baseId}-answer-${index}`;

        return (
          <div key={item.question}>
            <Heading className="font-display text-base font-semibold sm:text-lg">
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="group flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left text-white transition-colors hover:text-orange"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-brand border text-orange transition-colors",
                    open
                      ? "border-orange bg-orange/10"
                      : "border-line-strong group-hover:border-orange",
                  )}
                >
                  <Plus
                    className={cn("size-5 transition-transform duration-200", open && "rotate-45")}
                  />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="animate-fade-in pr-4 pb-6 text-silver-dim sm:pr-16"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
