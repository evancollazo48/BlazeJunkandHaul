import type { MetadataRoute } from "next";
import { colors } from "@/lib/design-tokens";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: "Blaze Junk",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: colors.black,
    theme_color: colors.black,
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
