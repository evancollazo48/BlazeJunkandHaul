import type { FaqItem } from "./faq-data";
import { siteConfig } from "./site-config";

export type ServiceIconKey =
  "junk" | "cleanout" | "furniture" | "yard" | "construction" | "commercial";

export type ServiceSlug =
  | "junk-removal"
  | "garage-house-cleanouts"
  | "furniture-appliance-removal"
  | "yard-debris-brush-removal"
  | "light-construction-debris"
  | "residential-commercial";

export interface Service {
  slug: ServiceSlug;
  /** Display name used in cards, nav and breadcrumbs. */
  name: string;
  icon: ServiceIconKey;
  /** 1–2 sentence card description. */
  summary: string;
  /** Page <title> (the " | Blaze Junk & Haul" suffix is added automatically). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  highlightsTitle: string;
  highlights: string[];
  idealFor: string[];
  faqs: FaqItem[];
  related: ServiceSlug[];
  /** Cities to cross-link to from this service page (names must exist in siteConfig.serviceAreas). */
  featuredAreas: (typeof siteConfig.serviceAreas)[number][];
}

const phone = siteConfig.phoneDisplay;

export const services: Service[] = [
  {
    slug: "junk-removal",
    name: "Junk Removal",
    icon: "junk",
    summary:
      "Unwanted clutter, single items, or full trailer loads. If it's junk to you, it's gone with us.",
    metaTitle: "Junk Removal in Fort Worth, TX",
    metaDescription: `Fast, affordable junk removal in Fort Worth & DFW. Single items or full trailer loads, upfront pricing, same-day service. Call or text ${phone}.`,
    h1: "Junk Removal in Fort Worth & DFW",
    intro: [
      "Got junk? Blaze Junk & Haul makes it disappear. From a single worn-out recliner to a full trailer load of clutter, our Fort Worth crew does all the lifting, loading, and hauling — you just point.",
      "You'll get a free, no-obligation estimate with the price up front before we lift a finger. Same-day and next-day junk removal is available across Fort Worth and the DFW Metroplex.",
    ],
    highlightsTitle: "What we haul away",
    highlights: [
      "Furniture & mattresses",
      "Appliances",
      "Boxes & bagged junk",
      "TVs & electronics",
      "Exercise equipment",
      "Hot tubs & spas",
      "Garage clutter",
      "Single items or full trailer loads",
    ],
    idealFor: [
      "Homeowners & renters",
      "Moving in or moving out",
      "Landlords & property managers",
      "Anyone done tripping over clutter",
    ],
    faqs: [
      {
        question: "Can you pick up just one item?",
        answer:
          "Yes. Single items, a few pieces, or a full trailer load — if it's junk to you, it's gone with us. Pricing is based on how much trailer space your items take up, and you'll know the full price before we start.",
      },
      {
        question: "Do I have to move my junk to the curb?",
        answer:
          "No. We do all the heavy lifting — from the garage, the backyard, or the upstairs bedroom. You point. We blaze.",
      },
      {
        question: "How fast can you pick up junk in Fort Worth?",
        answer:
          "Same-day and next-day pickups are available across Fort Worth and DFW when the schedule allows. Call or text early in the day for the best shot at a same-day slot.",
      },
    ],
    related: ["garage-house-cleanouts", "furniture-appliance-removal", "yard-debris-brush-removal"],
    featuredAreas: ["Arlington", "North Richland Hills", "Keller"],
  },
  {
    slug: "garage-house-cleanouts",
    name: "Garage & House Cleanouts",
    icon: "cleanout",
    summary:
      "Whole-property cleanouts for moves, estates, and rental turnovers. We sort it, load it, and haul it out.",
    metaTitle: "Garage & House Cleanouts in Fort Worth, TX",
    metaDescription: `Garage, house, estate & rental cleanouts in Fort Worth and DFW. We sort it, load it, and haul it out with upfront pricing. Free estimates: ${phone}.`,
    h1: "Garage & House Cleanouts in Fort Worth & DFW",
    intro: [
      "Some jobs are bigger than a couch. When it's a packed garage, a whole house, or an estate that needs to be cleared, Blaze Junk & Haul brings the truck, the trailer, and the muscle to get it done.",
      "We sort it, load it, and haul it out. Upfront pricing, free estimates, and a local, family-owned crew that treats your property like our own.",
    ],
    highlightsTitle: "Cleanouts we handle",
    highlights: [
      "Garage cleanouts",
      "Whole-house cleanouts",
      "Estate cleanouts",
      "Move-in & move-out cleanouts",
      "Rental turnovers",
      "Attic & shed cleanouts",
    ],
    idealFor: [
      "Families handling an estate",
      "Homeowners getting ready to sell or move",
      "Landlords & property managers",
      "Realtors prepping a listing",
    ],
    faqs: [
      {
        question: "How long does a house cleanout take?",
        answer:
          "It depends on the size of the property and how much needs to go. We'll give you a clear idea of timing along with your free estimate — and we work hard to get you your space back fast.",
      },
      {
        question: "Do you handle estate cleanouts?",
        answer:
          "Yes. We handle estate cleanouts with care and respect. Let us know what stays and what goes, and we'll take it from there — donating and recycling what we can.",
      },
      {
        question: "Do I need to sort everything before you arrive?",
        answer:
          "No. Point out anything you're keeping and we'll handle the rest — sorting, loading, and hauling it all out.",
      },
    ],
    related: ["junk-removal", "furniture-appliance-removal", "residential-commercial"],
    featuredAreas: ["Keller", "Burleson", "Mansfield"],
  },
  {
    slug: "furniture-appliance-removal",
    name: "Furniture & Appliance Removal",
    icon: "furniture",
    summary:
      "Couches, mattresses, fridges, washers, and dryers — heavy lifting and tight stairways included.",
    metaTitle: "Furniture & Appliance Removal in Fort Worth, TX",
    metaDescription: `Couch, mattress, refrigerator, washer & dryer removal in Fort Worth and DFW. Heavy lifting and tight stairways included. Free estimates: ${phone}.`,
    h1: "Furniture & Appliance Removal in Fort Worth & DFW",
    intro: [
      "That old sectional isn't going to haul itself. Blaze Junk & Haul removes bulky furniture and heavy appliances from homes, apartments, and offices across Fort Worth and DFW.",
      "Heavy lifting and tight stairways included. We carry it out, load it up, and make sure it goes to the proper place — donated, recycled, or disposed of the right way.",
    ],
    highlightsTitle: "Furniture & appliances we remove",
    highlights: [
      "Couches, sectionals & recliners",
      "Mattresses & box springs",
      "Refrigerators & freezers",
      "Washers & dryers",
      "Dressers, tables & bed frames",
      "Office desks & chairs",
    ],
    idealFor: [
      "Upgrading to new furniture",
      "Moving into a smaller place",
      "Upstairs & apartment removals",
      "Replacing old appliances",
    ],
    faqs: [
      {
        question: "Do you remove old refrigerators and appliances?",
        answer:
          "Yes — fridges, freezers, washers, dryers, and other household appliances. We handle the heavy lifting and haul them off for proper disposal or recycling.",
      },
      {
        question: "Can you get furniture out of an upstairs apartment?",
        answer:
          "Yes. Tight stairways and upstairs units are part of the job. We carry it down and out so you don't have to.",
      },
      {
        question: "Will you take an old mattress?",
        answer:
          "Absolutely. Mattresses and box springs are some of the most common items we haul across Fort Worth and DFW.",
      },
    ],
    related: ["junk-removal", "garage-house-cleanouts", "residential-commercial"],
    featuredAreas: ["Hurst", "Euless", "Bedford"],
  },
  {
    slug: "yard-debris-brush-removal",
    name: "Yard Debris & Brush Removal",
    icon: "yard",
    summary:
      "Branches, brush piles, old fencing, and storm cleanup. We'll leave the yard looking better than we found it.",
    metaTitle: "Yard Debris & Brush Removal in Fort Worth, TX",
    metaDescription: `Brush, branch, old fence & storm debris removal in Fort Worth and DFW. We load it, haul it, and leave your yard cleaner. Call or text ${phone}.`,
    h1: "Yard Debris & Brush Removal in Fort Worth & DFW",
    intro: [
      "Texas storms and weekend yard projects leave a mess behind. Blaze Junk & Haul clears branches, brush piles, old fencing, and storm debris from yards across Fort Worth and the DFW area.",
      "We load it all onto the trailer and haul it away — and we'll leave the yard looking better than we found it.",
    ],
    highlightsTitle: "Yard debris we clear",
    highlights: [
      "Branches & limbs",
      "Brush piles",
      "Old fencing & decking",
      "Storm cleanup debris",
      "Bagged yard waste",
      "Landscaping leftovers",
    ],
    idealFor: [
      "Post-storm cleanup",
      "Fence & deck replacement projects",
      "Overgrown yards & lots",
      "Landlords prepping a rental",
    ],
    faqs: [
      {
        question: "Do you haul storm debris?",
        answer:
          "Yes. After a Texas storm, we clear downed branches, brush, and broken fencing from yards across Fort Worth and DFW. Text us a photo for a fast quote.",
      },
      {
        question: "Do I need to bag or bundle yard waste first?",
        answer:
          "No. Bagged or loose, we'll load it. If it fits on the trailer, we can probably haul it.",
      },
      {
        question: "Will you take old fencing and decking?",
        answer:
          "Yes. Fencing and decking boards are fair game — just let us know roughly how much you have when you ask for your free estimate.",
      },
    ],
    related: ["junk-removal", "light-construction-debris", "residential-commercial"],
    featuredAreas: ["Azle", "Saginaw", "Crowley"],
  },
  {
    slug: "light-construction-debris",
    name: "Light Construction Debris",
    icon: "construction",
    summary:
      "Remodel leftovers — drywall, lumber, tile, flooring, and demo debris. Contractors welcome.",
    metaTitle: "Construction Debris Removal in Fort Worth, TX",
    metaDescription: `Light construction & remodel debris removal in Fort Worth and DFW — drywall, lumber, tile, flooring & demo debris. Contractors welcome. ${phone}.`,
    h1: "Light Construction Debris Removal in Fort Worth & DFW",
    intro: [
      "Remodel done? The leftovers don't have to stick around. Blaze Junk & Haul hauls away drywall, lumber, tile, flooring, and demo debris from homes and job sites across Fort Worth and DFW.",
      "DIY homeowners and contractors who need a site cleared fast — we've got you. Skip the dumpster rental: call, we show up, load it, and haul it off.",
    ],
    highlightsTitle: "Construction debris we haul",
    highlights: [
      "Drywall & sheetrock",
      "Lumber & scrap wood",
      "Tile & flooring",
      "Carpet & padding",
      "Old cabinets & fixtures",
      "Light demo debris",
    ],
    idealFor: [
      "Kitchen & bathroom remodels",
      "DIY renovation projects",
      "Contractors & remodelers",
      "Flooring replacements",
    ],
    faqs: [
      {
        question: "Do you work with contractors?",
        answer:
          "Yes — contractors welcome. We clear remodel leftovers and light demo debris from job sites across Fort Worth and DFW so your crew can keep working.",
      },
      {
        question: "How is this different from renting a dumpster?",
        answer:
          "Instead of renting a dumpster and loading it yourself, we show up, do all the loading, and haul it away. Pricing is based on how much trailer space your debris takes up.",
      },
      {
        question: "What construction materials can't you take?",
        answer:
          "We can't haul hazardous materials like paint, chemicals, oil, or asbestos. Materials that may contain asbestos need a licensed abatement company.",
      },
    ],
    related: ["junk-removal", "yard-debris-brush-removal", "residential-commercial"],
    featuredAreas: ["Grand Prairie", "Mansfield", "Benbrook"],
  },
  {
    slug: "residential-commercial",
    name: "Residential & Commercial",
    icon: "commercial",
    summary:
      "Homes, apartments, offices, and job sites across DFW. Property managers and realtors, we've got you.",
    metaTitle: "Residential & Commercial Junk Removal in Fort Worth",
    metaDescription: `Junk removal for homes, apartments, offices & job sites in Fort Worth and DFW. Property managers & realtors welcome. Free estimates: ${phone}.`,
    h1: "Residential & Commercial Junk Removal in Fort Worth & DFW",
    intro: [
      "Family home, apartment turnover, office clear-out, or job site — Blaze Junk & Haul handles junk removal for residential and commercial customers across Fort Worth and DFW.",
      "Property managers, realtors, landlords, and business owners, we've got you. We show up when we say we will, and the price we quote is the price you pay.",
    ],
    highlightsTitle: "Properties we serve",
    highlights: [
      "Houses & apartments",
      "Rental & apartment turnovers",
      "Office furniture & equipment",
      "Job site cleanup",
      "Realtor & listing prep",
      "Small business clear-outs",
    ],
    idealFor: [
      "Property managers & landlords",
      "Realtors & home sellers",
      "Offices & small businesses",
      "Contractors & builders",
    ],
    faqs: [
      {
        question: "Do you offer commercial junk removal?",
        answer:
          "Yes. We haul office furniture, equipment, and clutter from offices, businesses, and job sites across Fort Worth and DFW.",
      },
      {
        question: "Do you work with property managers on rental turnovers?",
        answer:
          "Absolutely. Property managers and realtors, we've got you. Call or text with the address and what needs to go, and we'll get you a fast, upfront quote.",
      },
      {
        question: "Does someone need to be on site for a commercial job?",
        answer:
          "Not necessarily. As long as we can reach the items and confirm the price with you by phone or text, we can handle the haul.",
      },
    ],
    related: ["junk-removal", "garage-house-cleanouts", "light-construction-debris"],
    featuredAreas: ["Arlington", "Grand Prairie", "Haltom City"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesBySlugs(slugs: readonly ServiceSlug[]): Service[] {
  return slugs.flatMap((slug) => services.filter((service) => service.slug === slug));
}
