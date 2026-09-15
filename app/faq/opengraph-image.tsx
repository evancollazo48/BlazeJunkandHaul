import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.businessName} junk removal FAQs — pricing, same-day service and more`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Junk Removal Questions, Answered",
    subtitle: "Pricing, same-day service, what we haul & more.",
  });
}
