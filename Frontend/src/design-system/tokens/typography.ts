/**
 * Typography tokens — TypeScript mirror of typography custom properties
 * defined in `src/styles/design-system.css`.
 *
 * Display sizes use clamp() for fluid scaling; heading / body / micro hold
 * fixed sizes. Tracking + leading + font-family follow the same ladder.
 *
 * Prefer the registered Tailwind utilities (`text-h1`, `tracking-eyebrow`,
 * `leading-hero`, `font-display`) for className composition — these consts
 * exist for inline `style={{ fontSize: text.h1 }}` and CSS-in-JS contexts.
 */

/** Display tier — cinematic clamp() sizes */
export const textDisplay = {
  hero: "var(--text-display-hero)", //  40 → 160 — Hero SOLIVA
  mega: "var(--text-display-mega)", //  36 →  96 — FinalCTA PREMIERE
  xl: "var(--text-display-xl)", //  30 →  72 — Compare h2
  lg: "var(--text-display-lg)", //  30 →  60 — Profile / Product slug
  md: "var(--text-display-md)", //  26 →  72 — Video headline
  sm: "var(--text-display-sm)", //  24 →  48 — Compare h4
  metric: "var(--text-display-metric)", //  26 →  44 — Compare metrics
} as const;

/** Heading tier — fixed sizes (use Tailwind responsive prefixes to stage them) */
export const textHeading = {
  h1: "var(--text-h1)", //  42 — Collection h2
  h2: "var(--text-h2)", //  36 — Compare LEFT h3
  h3: "var(--text-h3)", //  28
  h4: "var(--text-h4)", //  24 — wordmark
  h5: "var(--text-h5)", //  20 — rationale h4
  h6: "var(--text-h6)", //  18
} as const;

/** Body tier */
export const textBody = {
  lg: "var(--text-body-lg)", //  17
  default: "var(--text-body)", //  16
  sm: "var(--text-body-sm)", //  14
  xs: "var(--text-body-xs)", //  13
  caption: "var(--text-caption)", //  12
} as const;

/** Micro tier — mono / editorial labels */
export const textMicro = {
  lg: "var(--text-micro-lg)", //  11
  md: "var(--text-micro-md)", //  10
  sm: "var(--text-micro-sm)", //   9
  xs: "var(--text-micro-xs)", //   8
} as const;

/** Letter-spacing ladder — luxury cadence */
export const tracking = {
  display: "var(--tracking-display)", // -0.03em — display headlines
  soft: "var(--tracking-soft)", //   0.05em — subtle softening
  nav: "var(--tracking-nav)", //   0.15em — navigation, italic body
  cta: "var(--tracking-cta)", //   0.2em  — CTAs, button labels
  eyebrow: "var(--tracking-eyebrow)", //   0.3em  — eyebrows, micro-labels
  luxe: "var(--tracking-luxe)", //   0.45em — mono labels at body size
  editorial: "var(--tracking-editorial)", //   0.6em  — sparse eyebrows
  runway: "var(--tracking-runway)", //   0.8em  — runway-tier, sparingly
} as const;

/** Line-height — display tier (Tailwind defaults cover body tier) */
export const leading = {
  hero: "var(--leading-hero)", // 1.05 — display, single-line
  displayTight: "var(--leading-display-tight)", // 1.1  — multi-line h1/h2
  displaySnug: "var(--leading-display-snug)", // 1.2  — sub-headings
} as const;

/** Font families */
export const fontFamily = {
  display: "var(--font-display-ds)", // Cormorant Garamond
  body: "var(--font-body-ds)", // Inter
  mono: "var(--font-mono-ds)", // JetBrains Mono
} as const;

export type TextDisplayKey = keyof typeof textDisplay;
export type TextHeadingKey = keyof typeof textHeading;
export type TextBodyKey = keyof typeof textBody;
export type TextMicroKey = keyof typeof textMicro;
export type TrackingKey = keyof typeof tracking;
export type LeadingKey = keyof typeof leading;
