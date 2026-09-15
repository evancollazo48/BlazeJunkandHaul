import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/*
 * Fonts: Space Grotesk (headings, buttons) + Inter (body), self-hosted and
 * optimized by next/font with display: swap and size-adjusted fallbacks.
 *
 * They're loaded with next/font/local from the @fontsource-variable npm packages
 * rather than next/font/google, which downloads from Google's font CDN on every
 * dev start and build — when that CDN is slow or blocked, `next dev` fails with
 * a 500 ("Can't resolve '@vercel/turbopack-next/internal/font/google/font'").
 * The font files and output are the same. To switch back:
 *   import { Inter, Space_Grotesk } from "next/font/google";
 *   const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
 *   const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
 *
 * Both are variable fonts: one file each covers every weight used
 * (Space Grotesk 500/700, Inter 400–700).
 */
const displayFont = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

const defaultTitle = `${siteConfig.businessName} | Fort Worth Junk Removal, Cleanouts & Hauling`;
const defaultDescription = `Family-owned junk removal in Fort Worth & DFW. Free estimates, upfront pricing, same-day or next-day service. Call or text ${siteConfig.phoneDisplay}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: defaultDescription,
  applicationName: siteConfig.businessName,
  keywords: [
    "junk removal Fort Worth",
    "junk hauling DFW",
    "garage cleanout Fort Worth",
    "furniture removal Fort Worth",
    "appliance removal DFW",
    "yard debris removal Fort Worth",
    "construction debris removal",
  ],
  creator: siteConfig.businessName,
  publisher: siteConfig.businessName,
  // Phone numbers are already explicit tel: links; stop iOS from re-styling them.
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.businessName,
    url: "/",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-brand focus:bg-orange focus:px-4 focus:py-3 focus:font-display focus:font-bold focus:text-black"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
