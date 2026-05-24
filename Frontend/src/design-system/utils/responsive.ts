/**
 * Responsive helpers — breakpoint constants + viewport hook re-export.
 *
 * Breakpoints mirror Tailwind's defaults plus the custom `editorial` tier
 * used for the Hero side rails. Keep these in sync with the
 * `screens` config implicit in Tailwind v4 (no explicit config — Tailwind
 * provides defaults; this file documents them for TS consumers).
 */

/** Re-export of the existing useIsMobile hook so design-system utils are one import */
export { useIsMobile } from "@/hooks/use-mobile";

/* ════════ BREAKPOINTS ════════ */

/**
 * Pixel widths matching Tailwind utility prefixes.
 * - `sm`  → `sm:` prefix
 * - `md`  → `md:` prefix
 * - `lg`  → `lg:` prefix
 * - `xl`  → `xl:` prefix
 * - `2xl` → `2xl:` prefix
 * - `editorial` → `min-[1440px]:` prefix (Hero side-rail visibility)
 */
export const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  editorial: 1440,
} as const;

/** CSS string form — for media queries built in TS */
export const breakpointPx = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  editorial: "1440px",
} as const;

/** Media query strings — paste into `matchMedia` or `@media` blocks */
export const mediaQuery = {
  sm: `(min-width: ${breakpointPx.sm})`,
  md: `(min-width: ${breakpointPx.md})`,
  lg: `(min-width: ${breakpointPx.lg})`,
  xl: `(min-width: ${breakpointPx.xl})`,
  "2xl": `(min-width: ${breakpointPx["2xl"]})`,
  editorial: `(min-width: ${breakpointPx.editorial})`,
  /** Detect touch-primary devices (no hover) */
  touch: "(hover: none) and (pointer: coarse)",
  /** Respect user's reduced-motion preference */
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type BreakpointKey = keyof typeof breakpoint;
