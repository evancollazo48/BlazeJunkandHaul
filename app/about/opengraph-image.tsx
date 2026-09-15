import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `About ${siteConfig.businessName}, a family-owned junk removal company in Fort Worth, TX`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Our Story",
    title: "Local. Family Owned. Fort Worth Proud.",
    subtitle: "Not a franchise — you talk to the people in the truck.",
  });
}
