import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors } from "./lib/design-tokens";

/**
 * Tailwind v4 loads this file via `@config` in app/globals.css.
 * Colors come from lib/design-tokens.ts so hex values live in exactly one place.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontFamily: {
        // CSS variables are set by next/font in app/layout.tsx.
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Sharp-ish corners for a rugged, industrial feel.
        brand: "3px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-in-right": "slide-in-right 250ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": Object.fromEntries(
          Object.entries(colors).map(([name, value]) => [`--color-${name}`, value]),
        ),
      });
    }),
  ],
};

export default config;
