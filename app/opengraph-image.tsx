import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} — Fort Worth junk removal, cleanouts & hauling`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Fort Worth · DFW",
    title: "Junk Removal, Cleanouts & Hauling",
    subtitle: `Local & family owned. ${siteConfig.tagline}`,
  });
}
