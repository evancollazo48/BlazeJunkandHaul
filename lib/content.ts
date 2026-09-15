/**
 * Shared marketing copy used across the homepage and inner pages.
 * Voice: bold, Texan, direct, short sentences, tagline-led.
 *
 * Each topic lives in exactly one list so no two sections repeat each other.
 */

export const heroChecks = ["Free Estimates", "Same-Day & Next-Day Service", "No Hidden Fees"];

/** One-line summary of everything we haul — shown with the service cards in <WhatWeHaul />. */
export const whatWeHaulIntro =
  "Furniture, appliances, hot tubs, TVs, exercise equipment, yard waste, remodel debris and more. If it fits on the trailer, we can probably haul it.";

export const hazardousNote = {
  lead: "We can't haul hazardous materials —",
  emphasis: "paint, chemicals, oil, or asbestos.",
};

export const processSteps = [
  {
    title: "Call, Text, or Message",
    text: "Tell us what needs to go, or send a quick photo. You'll get a free, no-obligation estimate with the price up front.",
  },
  {
    title: "We Show Up On Time",
    text: "Pick a window that works for you. Our truck and trailer arrive ready to work — same-day and next-day slots available.",
  },
  {
    title: "You Point. We Blaze.",
    text: "We handle all the loading, hauling, and sweep-up. You get your space back — that's it.",
  },
];

export const aboutStory = [
  "Blaze Junk & Haul is a family-owned junk removal company built right here in Fort Worth. We started Blaze because DFW deserved a hauling crew that shows up on time, quotes a fair price, and works like the job matters.",
  "We're not a national franchise, and we like it that way. When you call Blaze, you talk directly to the people who show up in the truck.",
];

export type PillarIconKey = "reliable" | "affordable" | "hardWorking" | "local";

/**
 * What Blaze stands for — the single source for the trust bar, "Why Blaze"
 * checklist, Blaze Promise and values from the original design, merged.
 */
export const pillars: { title: string; tagline: string; text: string; icon: PillarIconKey }[] = [
  {
    title: "Reliable",
    tagline: "On time. Every time.",
    text: "We show up when we say we will, with same-day and next-day service across DFW.",
    icon: "reliable",
  },
  {
    title: "Affordable",
    tagline: "No hidden fees. Ever.",
    text: "You approve the price before we lift a finger. The price we quote is the price you pay.",
    icon: "affordable",
  },
  {
    title: "Hard Working",
    tagline: "Big job or small, we haul it all.",
    text: "We do all the loading, hauling, and sweep-up — and we work clean.",
    icon: "hardWorking",
  },
  {
    title: "Local & Family Owned",
    tagline: "Your property, our respect.",
    text: "Not a franchise. We treat your home or business like our own.",
    icon: "local",
  },
];
