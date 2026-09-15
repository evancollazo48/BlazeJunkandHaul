/**
 * JSON-LD structured data builders (schema.org).
 * Rendered with <JsonLd /> from components/seo/JsonLd.tsx.
 */
import type { FaqItem } from "./faq-data";
import { hasRealReviews, reviews } from "./reviews-data";
import type { ServiceArea } from "./service-areas-data";
import { services, type Service } from "./services-data";
import { isPlaceholderHref, siteConfig } from "./site-config";
import { absoluteUrl } from "./utils";

export type JsonLdObject = Record<string, unknown>;

const CONTEXT = "https://schema.org";
export const BUSINESS_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const texas = { "@type": "State", name: siteConfig.addressRegionName };

function cityPlace(city: string): JsonLdObject {
  return {
    "@type": "City",
    name: `${city}, ${siteConfig.addressRegion}`,
    containedInPlace: texas,
  };
}

const providerRef = { "@id": BUSINESS_ID };

/**
 * Sitewide business entity. HomeAndConstructionBusiness is the most specific
 * schema.org LocalBusiness subtype that fits a junk removal & hauling company.
 */
export function localBusinessSchema(): JsonLdObject {
  const sameAs = Object.values(siteConfig.social).filter((href) => !isPlaceholderHref(href));

  const schema: JsonLdObject = {
    "@context": CONTEXT,
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.businessName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    logo: absoluteUrl(siteConfig.logo.src),
    image: [
      absoluteUrl(siteConfig.heroImage.src),
      absoluteUrl(siteConfig.logo.src),
      absoluteUrl(siteConfig.promoImage.src),
    ],
    priceRange: siteConfig.priceRange,
    paymentAccepted: siteConfig.paymentMethods.join(", "),
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      addressCountry: siteConfig.addressCountry,
    },
    areaServed: siteConfig.serviceAreas.map(cityPlace),
    openingHoursSpecification: siteConfig.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Junk removal, cleanout & hauling services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };

  if (sameAs.length > 0) schema.sameAs = sameAs;

  // Only ever emitted for REAL reviews — see lib/reviews-data.ts.
  if (hasRealReviews) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (total / reviews.length).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
    schema.review = reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewBody: review.text,
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      ...(review.datePublished ? { datePublished: review.datePublished } : {}),
    }));
  }

  return schema;
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.businessName,
    inLanguage: "en-US",
    publisher: providerRef,
  };
}

/** Service schema for a /services/[service] page (serves every listed city). */
export function serviceSchema(service: Service): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: providerRef,
    areaServed: siteConfig.serviceAreas.map(cityPlace),
    offers: {
      "@type": "Offer",
      description: "Free, no-obligation estimates with upfront pricing.",
    },
  };
}

/** Service schema scoped to a single city for /service-areas/[city] pages. */
export function cityServiceSchema(area: ServiceArea): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: `Junk Removal & Hauling in ${area.name}, ${siteConfig.addressRegion}`,
    serviceType: "Junk removal",
    url: absoluteUrl(area.href),
    provider: providerRef,
    areaServed: cityPlace(area.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Junk removal services in ${area.name}`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.name} in ${area.name}`,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

export function faqPageSchema(faqs: FaqItem[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}
