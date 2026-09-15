import { notFound } from "next/navigation";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getServiceBySlug, services } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} — junk removal and hauling service in Fort Worth & DFW`;
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per service at build time instead of on each request.
export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const service = getServiceBySlug((await params).service);
  if (!service) notFound();

  return renderOgImage({
    eyebrow: "Fort Worth · DFW",
    title: service.name,
    subtitle: service.summary,
  });
}
