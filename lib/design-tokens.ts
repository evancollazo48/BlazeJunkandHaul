/**
 * Brand design tokens — the single source of truth for the color palette.
 *
 * tailwind.config.ts turns these into utilities (`bg-orange`, `text-silver-dim`,
 * `border-line`, …) AND emits each one as a CSS variable on :root
 * (`--color-orange`, `--color-silver-dim`, …) for use in custom CSS.
 *
 * Contrast notes (WCAG 2.1 AA, verified against the dark backgrounds used):
 * - orange on black ≈ 6.4:1, orange on panel ≈ 5.7:1 → OK for all text sizes.
 * - black text on orange ≈ 6.4:1 → primary buttons use black text.
 * - white text on orange ≈ 3.1:1 → FAILS for body text; never do this.
 * - orange-dark on black ≈ 3.8:1 → hover backgrounds / large accents only, never small text.
 * - white text on orange-dark ≈ 5.1:1 → used for the primary button hover state.
 * - silver-dim on black ≈ 6.6:1, on panel ≈ 6.0:1 → OK for muted body copy.
 * - line-strong ≈ 3.1:1+ against panels → used for form-field borders (WCAG 1.4.11).
 */
export const colors = {
  black: "#0D0D0D",
  "black-soft": "#161513",
  panel: "#1B1917",
  "panel-hover": "#201D19",
  orange: "#F26A21",
  "orange-dark": "#C1440E",
  white: "#FFFFFF",
  silver: "#C9C9C9",
  "silver-dim": "#9A968E",
  line: "#332F29",
  "line-strong": "#6B665E",
  danger: "#FF8A80",
} as const;

export type BrandColor = keyof typeof colors;
