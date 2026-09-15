import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageMetadataInput {
  /** Page title. The " | Blaze Junk & Haul" suffix is added unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/junk-removal". Used for the canonical URL. */
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /**
   * Explicit Open Graph image URL. ONLY for routes without a colocated
   * `opengraph-image.tsx`: a page-level `openGraph` object replaces the one it
   * would inherit (dropping the root image), but setting `images` here would
   * also override a colocated image file — so never pass it on those routes.
   */
  ogImage?: string;
}

/**
 * Builds consistent per-page metadata: title, description, canonical URL,
 * Open Graph and Twitter cards. OG images come from the file-based
 * `opengraph-image.tsx` routes (see app/opengraph-image.tsx).
 */
export function createMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noIndex = false,
  ogImage,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.businessName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.businessName,
      locale: "en_US",
      type: "website",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.businessName} — Fort Worth junk removal, cleanouts & hauling`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
