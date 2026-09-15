import { siteConfig } from "./site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Core FAQs — shown in full on /faq and excerpted on the homepage.
 * Phrased the way people actually search ("People Also Ask" style).
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "How much does junk removal cost?",
    answer:
      "Every job is different, so we start with a free estimate. Pricing is based on how much trailer space your items take up — and you'll know the full price before we start. No surprises, no hidden fees. Plus, mention our website and save $25 or more.",
  },
  {
    question: "Do you offer same-day service?",
    answer:
      "Yes — when the schedule allows, we offer same-day and next-day pickups across Fort Worth and DFW. Call or text early in the day for the best shot at a same-day slot.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "Not necessarily. As long as we can reach the items and confirm the price with you by phone or text, we can handle the haul while you're at work.",
  },
  {
    question: "What happens to my junk?",
    answer:
      "Everything we haul goes to the proper disposal facility. We donate and recycle what we can before anything hits the landfill.",
  },
  {
    question: "How do I get an estimate?",
    answer: `Three ways: call or text ${siteConfig.phoneDisplay} (photos get the fastest quotes), message us on Facebook or Instagram, or fill out our free estimate form. Every estimate is free with no obligation.`,
  },
  {
    question: "What payment do you accept?",
    // TODO: client to confirm accepted payment methods (keep in sync with siteConfig.paymentMethods).
    answer:
      "Cash, all major cards, Zelle, and Venmo. Payment is due when the job's done and you're happy.",
  },
  {
    question: "What can't you take?",
    answer:
      "Hazardous materials — paint, chemicals, gasoline, oil, asbestos, and the like. For everything else, just ask.",
  },
];

/** City-specific FAQ set used on each /service-areas/[city] page. */
export function getCityFaqs(city: string): FaqItem[] {
  return [
    {
      question: `How much does junk removal cost in ${city}?`,
      answer: `Every job is different, so we start with a free estimate. Pricing is based on how much trailer space your items take up, and you'll know the full price before we start — no hidden fees. Mention our website and save $25 or more on your ${city} haul.`,
    },
    {
      question: `Do you offer same-day junk removal in ${city}?`,
      answer: `Yes — when the schedule allows, we offer same-day and next-day pickups in ${city} and across DFW. Call or text ${siteConfig.phoneDisplay} early in the day for the best shot at a same-day slot.`,
    },
    {
      question: `Do I need to be home for a junk pickup in ${city}?`,
      answer:
        "Not necessarily. As long as we can reach the items and confirm the price with you by phone or text, we can handle the haul while you're at work.",
    },
    {
      question: `What items can't you haul in ${city}?`,
      answer:
        "Hazardous materials — paint, chemicals, gasoline, oil, asbestos, and the like. For everything else, just ask.",
    },
  ];
}
