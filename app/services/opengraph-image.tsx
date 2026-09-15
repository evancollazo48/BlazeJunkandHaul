import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} junk removal and hauling services in Fort Worth & DFW`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Fort Worth · DFW",
    title: "Junk Removal & Hauling Services",
    subtitle: "Cleanouts, furniture, appliances, yard & construction debris.",
  });
}
