import { notFound } from "next/navigation";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getServiceAreaBySlug, serviceAreas } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} — local junk removal and hauling in the DFW area`;
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per city at build time instead of on each request.
export function generateStaticParams() {
  return serviceAreas.map((area) => ({ city: area.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const area = getServiceAreaBySlug((await params).city);
  if (!area) notFound();

  return renderOgImage({
    eyebrow: `${area.county} · DFW`,
    title: `Junk Removal in ${area.name}, ${siteConfig.addressRegion}`,
    subtitle: "Free estimates · Upfront pricing · Same-day & next-day service",
  });
}
