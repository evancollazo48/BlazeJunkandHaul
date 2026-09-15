import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `Contact ${siteConfig.businessName} for a free junk removal estimate in Fort Worth & DFW`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Free Estimates",
    title: "Get a Free Junk Removal Estimate",
    subtitle: "Call, text a photo, or send the quick form.",
  });
}
