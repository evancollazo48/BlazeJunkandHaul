import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { serviceAreas } from "@/lib/service-areas-data";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} service areas across Fort Worth and the DFW Metroplex`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Tarrant County · DFW",
    title: `Serving Fort Worth & ${serviceAreas.length - 1} DFW Cities`,
    subtitle: "Arlington, Keller, NRH, Mansfield, Grand Prairie & more.",
  });
}
