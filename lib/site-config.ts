/**
 * ============================================================================
 *  SITE CONFIG — single source of truth for business details (NAP data).
 * ============================================================================
 *  The header, footer, CTAs, metadata, JSON-LD structured data and sitemap all
 *  read from this file. Keeping Name / Address / Phone identical everywhere is
 *  critical for local SEO, so NEVER hardcode these values in components.
 *
 *  Search this file for "TODO" to find everything the client must confirm
 *  before launch.
 * ============================================================================
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  // TODO: client to confirm the production domain (or set NEXT_PUBLIC_SITE_URL).
  return "https://www.blazejunkandhaul.com";
}

export type DayOfWeek =
  "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export const siteConfig = {
  businessName: "Blaze Junk & Haul",
  tagline: "You Call. We Blaze.",
  description:
    "Local, family-owned junk removal serving Fort Worth and the DFW area. Free estimates, upfront pricing, and same-day or next-day service.",
  url: resolveSiteUrl(),

  // ---- Phone (click-to-call / click-to-text everywhere) --------------------
  phoneDisplay: "(682) 334-2371",
  phoneE164: "+16823342371",
  phoneHref: "tel:+16823342371",
  smsHref: "sms:+16823342371",

  email: "BlazeJunkandHaul@gmail.com",

  // ---- Location --------------------------------------------------------------
  addressLocality: "Fort Worth",
  addressRegion: "TX",
  addressRegionName: "Texas",
  addressCountry: "US",
  serviceRadius: "Fort Worth & the greater DFW Metroplex",

  // ---- Hours -----------------------------------------------------------------
  // TODO: client to confirm business hours. Keep `hours` (display text) and
  // `openingHours` (used by structured data) in sync.
  hours: "Mon–Sat, 8:00 AM – 6:00 PM",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as DayOfWeek[],
      opens: "08:00",
      closes: "18:00",
    },
  ],

  // TODO: client to confirm price range shown to search engines ("$", "$$", "$$$").
  priceRange: "$$",

  // TODO: client to confirm accepted payment methods (also update lib/faq-data.ts).
  paymentMethods: ["Cash", "All major credit cards", "Zelle", "Venmo"],

  // ---- Social / review profiles ---------------------------------------------
  // TODO: client to add real profile URLs. Links left as "#" are hidden from
  // structured data (sameAs) and rendered as non-clickable text in the UI.
  social: {
    facebook: "#",
    instagram: "#",
    google: "#", // Google Business Profile / reviews URL
  },
  socialHandle: "BLAZE Junk and Haul",

  // ---- Service areas ---------------------------------------------------------
  // Each city automatically gets a page at /service-areas/[city-slug].
  // To add a city: add it here AND add a matching entry in lib/service-areas-data.ts.
  serviceAreas: [
    "Fort Worth",
    "Arlington",
    "Keller",
    "North Richland Hills",
    "Haltom City",
    "Watauga",
    "Saginaw",
    "Benbrook",
    "White Settlement",
    "Burleson",
    "Crowley",
    "Mansfield",
    "Hurst",
    "Euless",
    "Bedford",
    "Azle",
    "Grand Prairie",
  ],

  // ---- Promo (shown in the estimate section on every page) ------------------
  promo: {
    amount: "$25",
    body: "The discount grows with larger trailer loads — the more we haul, the more you save. Just mention this website when you book.",
  },

  // ---- Images ----------------------------------------------------------------
  // HERO IMAGE: to swap it, drop a new file in /public and change `src` below.
  // Use a wide image (ideally 1920px+ wide). `objectPosition` controls which
  // part of the photo stays visible when it's cropped on different screens.
  heroImage: {
    // The version suffix busts Next.js's aggressive cache on optimized images:
    // browsers that already loaded the hero at an old URL would otherwise keep
    // showing that version indefinitely. Bump it again any time this same
    // photo's pixels change in place.
    src: "/hero-truck-v3.jpg",
    alt: "Blaze Junk & Haul crew member giving a shaka next to a pickup truck loaded with carpet and junk hauled away from a Fort Worth, TX home",
    // Pushes the truck bed, crew member and cab toward the right of the crop so
    // they stay clear of the hero text on narrow screens (the overlay gradient
    // in Hero.tsx darkens that left side to match).
    objectPosition: "60% center",
  },
  logo: {
    src: "/logo.png",
    width: 700,
    height: 700,
    alt: "Blaze Junk & Haul logo — longhorn skull and Texas badge",
  },
  // promo.jpg has this phone number printed directly in the artwork (see
  // README "Swapping the hero image") — if phoneDisplay ever changes again,
  // either get an updated flyer or stop using image="flyer" on <WhyBlaze />
  // (app/about/page.tsx) and the promoImage entry in lib/schema.ts.
  promoImage: {
    src: "/promo.jpg",
    width: 893,
    height: 900,
    alt: "Blaze Junk & Haul flyer — save $25 or more on junk removal in Fort Worth and DFW",
  },

  // TODO (optional): paste a Google Maps "Embed a map" src URL to show a map on /contact.
  mapEmbedUrl: "",
} as const;

/** True when a link is still a placeholder ("#" or empty). */
export function isPlaceholderHref(href: string | undefined | null): boolean {
  return !href || href === "#";
}
