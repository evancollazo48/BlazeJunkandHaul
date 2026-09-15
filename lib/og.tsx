/* eslint-disable @next/next/no-img-element -- next/og renders plain <img>, not next/image */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { colors } from "./design-tokens";
import { siteConfig } from "./site-config";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const toDataUri = (buffer: Buffer, mimeType: string) =>
  `data:${mimeType};base64,${buffer.toString("base64")}`;

interface OgImageOptions {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/**
 * Branded 1200×630 Open Graph image: hero banner + logo + page title.
 * Rendered at build time for every statically generated route.
 */
export async function renderOgImage({ eyebrow, title, subtitle }: OgImageOptions) {
  // Paths must stay literal so the bundler only traces these three files
  // (a variable path would pull the whole project into the server output).
  // The OG background always uses banner.jpg: next/og can't decode WebP, so it
  // intentionally doesn't follow siteConfig.heroImage.
  const [logoFile, bannerFile, font] = await Promise.all([
    readFile(join(process.cwd(), "public", "logo.png")),
    readFile(join(process.cwd(), "public", "banner.jpg")),
    readFile(
      join(
        process.cwd(),
        "node_modules",
        "@fontsource",
        "space-grotesk",
        "files",
        "space-grotesk-latin-700-normal.woff",
      ),
    ),
  ]);
  const logo = toDataUri(logoFile, "image/png");
  const banner = toDataUri(bannerFile, "image/jpeg");

  const titleSize = title.length > 44 ? 58 : title.length > 30 ? 66 : 76;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: colors.black,
        fontFamily: "Space Grotesk",
      }}
    >
      <img
        src={banner}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          objectFit: "cover",
          objectPosition: "75% center",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(90deg, #0D0D0D 0%, rgba(13,13,13,0.94) 55%, rgba(13,13,13,0.5) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 12,
          display: "flex",
          backgroundColor: colors.orange,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 800,
          padding: "0 0 0 72px",
        }}
      >
        <div
          style={{
            color: colors.orange,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            color: colors.white,
            fontSize: titleSize,
            lineHeight: 1.02,
            marginTop: 18,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ color: colors.silver, fontSize: 30, marginTop: 24 }}>{subtitle}</div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginTop: 36,
            padding: "12px 26px",
            borderRadius: 4,
            backgroundColor: colors.orange,
            color: colors.black,
            fontSize: 32,
          }}
        >
          {`Call or Text ${siteConfig.phoneDisplay}`}
        </div>
      </div>

      <img
        src={logo}
        alt=""
        width={300}
        height={300}
        style={{
          position: "absolute",
          right: 64,
          top: 150,
          width: 300,
          height: 300,
          borderRadius: 9999,
          border: `6px solid ${colors.orange}`,
        }}
      />
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }],
    },
  );
}
