// Next's `output: "standalone"` build traces only the JS actually needed to
// run the server — it deliberately leaves out the `public/` folder and
// `.next/static/` (the CSS/JS the browser loads), since Next expects those to
// be served by a CDN in front of the app. For a plain self-hosted deployment
// (Hostinger's Node.js app hosting, in our case) there is no separate CDN, so
// this script copies both into the standalone output after every build,
// exactly as Next's own docs recommend:
// https://nextjs.org/docs/app/api-reference/config/next-config-js/output
//
// Runs automatically via the "postbuild" script — no manual step needed.
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.warn(
    '[postbuild] .next/standalone not found — is `output: "standalone"` set in next.config.mjs? Skipping asset copy.',
  );
  process.exit(0);
}

const copies = [
  { from: join(root, "public"), to: join(standalone, "public") },
  { from: join(root, ".next", "static"), to: join(standalone, ".next", "static") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.warn(`[postbuild] Skipping missing source: ${from}`);
    continue;
  }
  cpSync(from, to, { recursive: true });
  console.log(`[postbuild] Copied ${from} -> ${to}`);
}
