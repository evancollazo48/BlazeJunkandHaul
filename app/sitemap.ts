import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/service-areas-data";
import { services } from "@/lib/services-data";
import { absoluteUrl } from "@/lib/utils";

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

/** Generated at build time; new services and cities are picked up automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: SitemapEntry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/service-areas", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...serviceAreas.map((area) => ({
      path: area.href,
      priority: area.isHq ? 0.9 : 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
