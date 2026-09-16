/**
 * Plain .mjs instead of next.config.ts on purpose: some hosts (Hostinger's
 * Node.js app deploy included) run a build container where Next's native SWC
 * binary fails to load for either Linux target (gnu or musl). Next.js needs
 * that same binary to transpile a TypeScript config file, so a `.ts` config
 * fails outright with "Failed to load next.config.ts" before the app build
 * even starts. A plain ES module needs no transpilation — Node just imports
 * it directly — so it works regardless of whether SWC loads.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Next's own recommended setting for self-hosting on a plain Node server
  // (as opposed to Vercel) — see https://nextjs.org/docs/app/api-reference/config/next-config-js/output.
  // Produces a minimal, self-contained .next/standalone/server.js alongside
  // the normal build, which is what platforms like Hostinger's Node.js app
  // hosting expect to find and run. Doesn't change `next dev`, `next build`
  // or `next start` used locally — purely additive.
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
