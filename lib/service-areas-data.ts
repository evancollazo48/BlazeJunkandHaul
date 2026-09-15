import { siteConfig } from "./site-config";
import { slugify } from "./utils";

export type ServiceAreaName = (typeof siteConfig.serviceAreas)[number];

interface CityDetails {
  county: string;
  /** Where the city sits relative to Fort Worth — used in copy and meta descriptions. */
  location: string;
  /** Unique, locally-relevant opening paragraph for the city page. */
  intro: string;
  /** 2–3 neighboring service areas to cross-link (internal linking for local SEO). */
  nearby: ServiceAreaName[];
}

/**
 * Per-city details for /service-areas/[city] pages.
 *
 * TO ADD A NEW CITY: add the name to `serviceAreas` in lib/site-config.ts, then
 * add an entry here. TypeScript will error until every city has an entry.
 */
const cityDetails: Record<ServiceAreaName, CityDetails> = {
  "Fort Worth": {
    county: "Tarrant County",
    location: "our home base",
    intro:
      "Fort Worth is home. Blaze Junk & Haul is based right here, and we haul junk from every corner of the city — north side, south side, and everywhere in between. Garage cleanouts, furniture removal, yard debris, remodel leftovers: if it's in Fort Worth, we'll blaze to it.",
    nearby: ["Haltom City", "White Settlement", "Benbrook"],
  },
  Arlington: {
    county: "Tarrant County",
    location: "just east of Fort Worth, between Fort Worth and Dallas",
    intro:
      "Arlington sits right in the middle of the Metroplex, and so do plenty of junk piles. From single-family homes to apartment turnovers, we make the short drive east from Fort Worth to haul junk, clean out garages, and clear out rentals across Arlington.",
    nearby: ["Grand Prairie", "Mansfield", "Fort Worth"],
  },
  Keller: {
    county: "Tarrant County",
    location: "north of Fort Worth in Northeast Tarrant County",
    intro:
      "Keller homeowners keep their properties looking sharp — and we help keep it that way. We clear out garages, haul off old furniture and appliances, and remove yard debris and brush all across Keller.",
    nearby: ["Watauga", "North Richland Hills", "Saginaw"],
  },
  "North Richland Hills": {
    county: "Tarrant County",
    location: "northeast of Fort Worth in Northeast Tarrant County",
    intro:
      "North Richland Hills is minutes from our Fort Worth base. Furniture, appliances, garage clutter, remodel leftovers — NRH residents point, and we blaze.",
    nearby: ["Haltom City", "Watauga", "Hurst"],
  },
  "Haltom City": {
    county: "Tarrant County",
    location: "right next door to Fort Worth on the northeast side",
    intro:
      "Haltom City is practically our backyard. Whether it's a single-item pickup, a full garage cleanout, or clearing out a rental between tenants, our Fort Worth crew is just a short drive away.",
    nearby: ["North Richland Hills", "Watauga", "Fort Worth"],
  },
  Watauga: {
    county: "Tarrant County",
    location: "northeast of Fort Worth, between Haltom City and Keller",
    intro:
      "Garages, sheds, and backyards in Watauga collect junk over the years. We haul it all — furniture, appliances, yard waste, and whatever else needs to go — with the price up front.",
    nearby: ["Keller", "Haltom City", "North Richland Hills"],
  },
  Saginaw: {
    county: "Tarrant County",
    location: "just north of Fort Worth",
    intro:
      "Moves, remodels, and new-home projects in Saginaw leave plenty behind. We help Saginaw families clear out the clutter with fast, upfront-priced junk removal and hauling.",
    nearby: ["Fort Worth", "Keller", "Azle"],
  },
  Benbrook: {
    county: "Tarrant County",
    location: "southwest of Fort Worth, near Benbrook Lake",
    intro:
      "From homes near Benbrook Lake to the rest of the city, we haul junk, furniture, and yard debris throughout Benbrook. Local crew, fair prices, no hidden fees.",
    nearby: ["Fort Worth", "White Settlement", "Crowley"],
  },
  "White Settlement": {
    county: "Tarrant County",
    location: "on Fort Worth's west side",
    intro:
      "White Settlement sits right next to Fort Worth on the west side, which makes it an easy stop for our crew. Garage cleanouts, old appliances, and bulky furniture — we'll haul it away.",
    nearby: ["Fort Worth", "Benbrook", "Azle"],
  },
  Burleson: {
    county: "Johnson & Tarrant Counties",
    location: "south of Fort Worth along I-35W",
    intro:
      "When the junk piles up in Burleson, call Blaze. We handle house cleanouts, furniture and appliance removal, and yard debris hauling for homes and businesses along the I-35W corridor.",
    nearby: ["Crowley", "Mansfield", "Fort Worth"],
  },
  Crowley: {
    county: "Tarrant & Johnson Counties",
    location: "south of Fort Worth",
    intro:
      "Crowley is a quick run south from Fort Worth. We haul unwanted furniture, clear out garages, and remove brush and yard debris for homeowners all over Crowley.",
    nearby: ["Burleson", "Benbrook", "Fort Worth"],
  },
  Mansfield: {
    county: "Tarrant, Johnson & Ellis Counties",
    location: "southeast of Fort Worth",
    intro:
      "Moving, remodeling, and upgrading in Mansfield all come with clutter. We make junk removal simple: one call or text, an upfront price, and a crew that hauls it all.",
    nearby: ["Arlington", "Burleson", "Grand Prairie"],
  },
  Hurst: {
    county: "Tarrant County",
    location: "northeast of Fort Worth in the Mid-Cities",
    intro:
      "Hurst sits in the heart of the Mid-Cities, an easy drive from our Fort Worth base. We haul furniture, appliances, garage clutter, and remodel debris for Hurst homes and businesses.",
    nearby: ["Euless", "Bedford", "North Richland Hills"],
  },
  Euless: {
    county: "Tarrant County",
    location: "in the Mid-Cities near DFW Airport",
    intro:
      "From apartment move-outs to office clear-outs, Blaze Junk & Haul helps Euless residents and businesses get rid of junk fast — with the price up front before we lift a finger.",
    nearby: ["Bedford", "Hurst", "Arlington"],
  },
  Bedford: {
    county: "Tarrant County",
    location: "in the Mid-Cities between Fort Worth and Dallas",
    intro:
      "Bedford homeowners call Blaze for garage cleanouts, furniture removal, and yard debris hauling. We show up on time, do all the heavy lifting, and haul it all away.",
    nearby: ["Hurst", "Euless", "North Richland Hills"],
  },
  Azle: {
    county: "Tarrant & Parker Counties",
    location: "northwest of Fort Worth near Eagle Mountain Lake",
    intro:
      "Bigger lots and lake-area properties in Azle can pile up brush, old fencing, and junk fast. We bring the truck and trailer out northwest of Fort Worth to haul it all away.",
    nearby: ["Saginaw", "White Settlement", "Fort Worth"],
  },
  "Grand Prairie": {
    county: "Dallas, Tarrant & Ellis Counties",
    location: "east of Arlington, between Fort Worth and Dallas",
    intro:
      "Grand Prairie stretches across the heart of the Metroplex, and Blaze covers it. Homes, apartments, offices, and job sites — we haul junk and debris all over Grand Prairie.",
    nearby: ["Arlington", "Mansfield", "Euless"],
  },
};

export interface ServiceArea extends CityDetails {
  name: ServiceAreaName;
  slug: string;
  href: string;
  isHq: boolean;
}

export const serviceAreas: ServiceArea[] = siteConfig.serviceAreas.map((name) => {
  const slug = slugify(name);
  return {
    name,
    slug,
    href: `/service-areas/${slug}`,
    isHq: name === siteConfig.addressLocality,
    ...cityDetails[name],
  };
});

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function getServiceAreasByNames(names: readonly ServiceAreaName[]): ServiceArea[] {
  return names.flatMap((name) => serviceAreas.filter((area) => area.name === name));
}
