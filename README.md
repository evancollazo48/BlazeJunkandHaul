# Blaze Junk & Haul — Website

Marketing website for **Blaze Junk & Haul**, a family-owned junk removal, cleanout and hauling
company in Fort Worth, TX serving the DFW Metroplex. _You Call. We Blaze._

Built with **Next.js 16 (App Router, TypeScript)**, **Tailwind CSS v4**, **react-hook-form + zod**,
**Resend**, **lucide-react** and **framer-motion**. Every page is statically generated for speed
and SEO.

---

## Quick start

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Local dev server with hot reload              |
| `npm run build`     | Production build (static generation)          |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript) |
| `npm run typecheck` | Generate route types and run `tsc --noEmit`   |
| `npm run format`    | Prettier (with Tailwind class sorting)        |

> **Why the scripts call `node node_modules/...` directly:** the project folder name contains an
> `&` ("BLAZE JUNK & HAUL WEBSITE"). On Windows, npm's `.cmd` shims pass paths through cmd.exe,
> which treats `&` as a command separator, so plain `next dev` / `eslint` scripts fail with
> `'HAUL' is not recognized`. Calling each tool's JavaScript entry point avoids the shims and works
> identically on macOS, Linux and Vercel. Run tools the same way (e.g.
> `node node_modules/next/dist/bin/next info`) rather than via `npx` from this folder.
>
> **OneDrive note:** this folder lives inside OneDrive, which makes `npm install` and builds slow
> (the first install took ~28 minutes) because OneDrive tries to sync `node_modules` and `.next`.
> Moving the project to a path outside OneDrive **without** an `&` in it (e.g.
> `C:\dev\blaze-junk-and-haul`) is strongly recommended.

---

## ✅ Before launch — client checklist

Search the codebase for `TODO` to find every placeholder. The important ones:

| Item                               | Where                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| Production domain                  | `NEXT_PUBLIC_SITE_URL` env var (see below)                                                 |
| Business hours (text + structured) | `lib/site-config.ts` → `hours`, `openingHours`                                             |
| Payment methods                    | `lib/site-config.ts` → `paymentMethods` **and** `lib/faq-data.ts`                          |
| Price range for search engines     | `lib/site-config.ts` → `priceRange`                                                        |
| Facebook / Instagram / Google URLs | `lib/site-config.ts` → `social`                                                            |
| Real customer reviews              | `lib/reviews-data.ts`                                                                      |
| Resend API key + sender/recipient  | Environment variables (see below)                                                          |
| Legal review of policy pages       | `app/privacy-policy/page.tsx`, `app/terms/page.tsx`                                        |
| Higher-resolution hero image       | `public/` + `siteConfig.heroImage` (current `banner.jpg` is only 880px wide — use 1920px+) |
| Optional Google Map on /contact    | `lib/site-config.ts` → `mapEmbedUrl`                                                       |

After launch: verify the site in **Google Search Console**, submit `https://YOUR-DOMAIN/sitemap.xml`,
and make sure the **Google Business Profile** uses exactly the same name and phone number.

---

## Editing business info (phone, hours, cities…)

Everything lives in **`lib/site-config.ts`** — the single source of truth for Name / Address /
Phone. The header, footer, CTAs, mobile call bar, metadata, JSON-LD structured data and sitemap all
read from it. **Never hardcode the phone number or city names in components** — consistent NAP data
matters for local SEO.

## Swapping the hero image

1. Drop the new image into `/public` (e.g. `public/hero-summer.jpg`). Use a wide image, ideally
   1920px or wider.
2. In `lib/site-config.ts`, update `heroImage`:
   ```ts
   heroImage: {
     src: "/hero-summer.jpg",
     alt: "Describe the photo, e.g. Blaze Junk & Haul truck hauling junk in Fort Worth",
     objectPosition: "70% center", // which part stays visible when cropped
   },
   ```

That's it — no component changes needed. It's automatically optimized by `next/image` and
preloaded as the page's LCP image.

## Adding a new service-area city page

1. Add the city name to `serviceAreas` in `lib/site-config.ts`.
2. Add a matching entry in `lib/service-areas-data.ts` with its `county`, `location` (where it is
   relative to Fort Worth), a unique `intro` paragraph, and 2–3 `nearby` cities.
   TypeScript will show an error until the entry exists.

The page at `/service-areas/<city-slug>`, its metadata, structured data, sitemap entry, footer link
and service-area chips are all generated automatically.

## Editing services, FAQs and copy

- **Services** — `lib/services-data.ts` (titles, meta descriptions, bullets, FAQs, cross-links).
  A new service also needs its slug added to the `ServiceSlug` type.
- **General FAQs** — `lib/faq-data.ts` (city FAQs are templated in `getCityFaqs`).
- **Homepage/shared copy** — `lib/content.ts` (items summary, process steps, brand story, and the
  four “Why Blaze” pillars).
- **Page layout rule:** each topic gets exactly one section per page — `WhatWeHaul` (services +
  items), `HowItWorks`, `WhyBlaze` (story + pillars), `Reviews`, `ServiceAreaList`, `FaqSection`,
  and one `EstimateSection` (call/text, $25 promo, contact details and form) at the bottom. Don't
  add a second section that repeats one of these.
- **Estimates:** `EstimateSection` is the site's only estimate section (on `/contact` it's the whole
  page). Every "Free Estimate" button uses `components/ui/EstimateLink.tsx`, which smooth-scrolls to
  that section on the current page, or goes to `/contact` on pages without one.
- **Reviews** — `lib/reviews-data.ts`. When every review is real, set `isPlaceholder: false` on
  each; only then is Review/AggregateRating structured data emitted. Never publish invented ratings.

---

## Contact form & email delivery

The estimate form (`components/sections/ContactForm.tsx`) validates on the client with the same
zod schema the server uses (`lib/validations.ts`), then POSTs to `app/api/contact/route.ts`, which
sends the lead by email through [Resend](https://resend.com) (`lib/email.ts`). A hidden honeypot
field filters basic spam bots.

| Variable               | Purpose                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production URL, no trailing slash. Used for canonicals, sitemap, OG, JSON-LD.       |
| `RESEND_API_KEY`       | Resend API key.                                                                     |
| `CONTACT_TO_EMAIL`     | Inbox that receives leads (defaults to `siteConfig.email`).                         |
| `CONTACT_FROM_EMAIL`   | Sender on a domain verified in Resend, e.g. `Blaze Website <leads@yourdomain.com>`. |

**Without `RESEND_API_KEY`:** in development the lead is printed to the terminal and the form shows
success, so you can test it. In production the API returns an error and the visitor is asked to
call or text instead — leads are never silently dropped.

**If JavaScript fails to load,** the form still works: it falls back to a normal form POST to
`/api/contact`, which emails the lead and redirects to `/thank-you` (a `noindex` confirmation page
that's also handy as a conversion page for ad tracking). Invalid or undeliverable no-JS submissions
get a simple page asking the visitor to call or text.

---

## SEO features

- Multi-page architecture: 6 service pages + 17 city landing pages, all statically generated.
- Per-page `<title>`, meta description, canonical URL, Open Graph and Twitter cards
  (`lib/metadata.ts`), plus branded 1200×630 OG images generated at build time (`lib/og.tsx`).
  **Adding a new page?** Either add an `opengraph-image.tsx` next to its `page.tsx` (copy
  `app/faq/opengraph-image.tsx`), or pass `ogImage: "/opengraph-image"` to `createMetadata` —
  never both, because an explicit `ogImage` overrides the colocated image file.
- JSON-LD (`lib/schema.ts`): `HomeAndConstructionBusiness` + `WebSite` sitewide, `Service` on
  service and city pages, `FAQPage` wherever FAQs appear, `BreadcrumbList` on nested pages.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, file-based favicon/app icons.
- Internal linking: breadcrumbs, related services, nearby cities, footer city/service links.
- Click-to-call (`tel:`) and click-to-text (`sms:`) on every phone number, plus a sticky mobile
  call bar.

## Design system

- Colors: `lib/design-tokens.ts` → Tailwind utilities (`bg-orange`, `text-silver-dim`,
  `border-line`, …) and CSS variables (`--color-orange`, …) via `tailwind.config.ts`.
- Fonts: Space Grotesk (headings, buttons) and Inter (body), self-hosted and optimized with
  `next/font/local` from the `@fontsource-variable` npm packages (see `app/layout.tsx`). This
  deliberately avoids `next/font/google`, which re-downloads fonts from Google's CDN on every dev
  start and build — when that CDN is slow, `npm run dev` fails with a 500. Visitors get the same
  self-hosted font files either way; the switch-back snippet is in the layout comment.
- UI primitives: `components/ui` (Button, Card, Badge, Container, SectionHeading, Reveal…).
- Contrast notes for every color pairing are documented in `lib/design-tokens.ts`.

## Accessibility

WCAG 2.1 AA target: visible orange focus rings, skip link, semantic landmarks, one `<h1>` per page,
labelled form fields with `aria-describedby` error messages, an APG-pattern FAQ accordion, a native
`<dialog>` mobile menu (focus trap + Escape), 44px+ tap targets, and all animation disabled for
`prefers-reduced-motion`.

## Deploying to Vercel

1. Push the project to a Git repository and import it in Vercel (framework preset: Next.js).
2. Add the environment variables above in **Project → Settings → Environment Variables**.
3. Deploy, then connect the custom domain and set `NEXT_PUBLIC_SITE_URL` to it.
