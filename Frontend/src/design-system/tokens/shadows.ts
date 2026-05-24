/**
 * Elevation tokens — shadow ladder + inset shadows + blur ladder.
 *
 * Three sources of depth, ranked by intensity:
 *   1. Regular box-shadow (separation + lift)
 *   2. Inset shadow (inner highlight / cream wash)
 *   3. Backdrop blur (glass)
 *
 * Prefer Tailwind utilities (`shadow-editorial`, `inset-shadow-cream`,
 * `backdrop-blur-medium`) for className composition.
 */

/** Box-shadow ladder — separation through cinematic */
export const shadow = {
  none: "var(--shadow-ds-none)",
  hairline: "var(--shadow-ds-hairline)", // 1 px line — separation w/o lift
  soft: "var(--shadow-ds-soft)", // gentle ambient
  card: "var(--shadow-ds-card)", // standard card lift
  floating: "var(--shadow-ds-floating)", // raised card / panel
  editorial: "var(--shadow-ds-editorial)", // large editorial panel
  cinematic: "var(--shadow-ds-cinematic)", // dark veil (FinalCTA tier)
  glowSoft: "var(--shadow-ds-glow-soft)", // hover glow halo (soft)
  glow: "var(--shadow-ds-glow)", // hover glow halo (standard)
  glowStrong: "var(--shadow-ds-glow-strong)", // hover glow halo (strong)
  stripTop: "var(--shadow-ds-strip-top)", // bottom strip / fixed footer
} as const;

/** Inset shadows — compose with regular `shadow.*` via two utility classes */
export const insetShadow = {
  cream: "var(--shadow-ds-inset-cream)", // 80 px cream inner glow
  line: "var(--shadow-ds-inset-line)", // 1 px inner highlight line
} as const;

/** Backdrop-filter blur ladder */
export const blur = {
  none: "var(--blur-ds-none)",
  subtle: "var(--blur-ds-subtle)", //  4 px — hint of frost
  soft: "var(--blur-ds-soft)", //  8 px — default glass
  medium: "var(--blur-ds-medium)", // 12 px — editorial panels (default)
  strong: "var(--blur-ds-strong)", // 20 px — hero rails (sparingly)
  atmospheric: "var(--blur-ds-atmospheric)", // 40 px — atmosphere only
} as const;

export type ShadowKey = keyof typeof shadow;
export type InsetShadowKey = keyof typeof insetShadow;
export type BlurKey = keyof typeof blur;
