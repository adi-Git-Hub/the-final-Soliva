/**
 * Spacing tokens — TypeScript mirror of `--space-*` and `--container-*`
 * defined in `src/styles/design-system.css`.
 *
 * Values resolve via CSS custom properties at runtime — single source of truth
 * stays in the CSS file. The TS exports here exist so future components can
 * reference spacing symbolically (`space.section.y` instead of hand-typing
 * `var(--space-section-y)`), with autocomplete and rename-safety.
 *
 * For Tailwind class composition, prefer the registered utilities
 * (`py-section-y` etc., where applicable) — these consts are for inline
 * `style={{...}}` and CSS-in-JS contexts.
 */

/** Atomic 8pt scale — pair with any CSS length property */
export const space = {
  0: "var(--space-0)",
  px: "var(--space-px)",
  1: "var(--space-1)", //  4 px
  2: "var(--space-2)", //  8 px
  3: "var(--space-3)", // 12 px
  4: "var(--space-4)", // 16 px
  5: "var(--space-5)", // 20 px
  6: "var(--space-6)", // 24 px
  8: "var(--space-8)", // 32 px
  10: "var(--space-10)", // 40 px
  12: "var(--space-12)", // 48 px
  14: "var(--space-14)", // 56 px
  16: "var(--space-16)", // 64 px
  20: "var(--space-20)", // 80 px
  24: "var(--space-24)", // 96 px
  32: "var(--space-32)", // 128 px
  40: "var(--space-40)", // 160 px
} as const;

/** Vertical section rhythm */
export const sectionY = {
  xs: "var(--space-section-y-xs)", //  48 px
  sm: "var(--space-section-y-sm)", //  64 px
  default: "var(--space-section-y)", // 80 px
  lg: "var(--space-section-y-lg)", //  96 px
  xl: "var(--space-section-y-xl)", // 128 px
} as const;

/** Between two flush sections / hero → footer style gaps */
export const sectionGap = {
  sm: "var(--space-section-gap-sm)", // 64 px
  default: "var(--space-section-gap)", // 96 px
} as const;

/** Between elements inside a section column */
export const stack = {
  "2xs": "var(--space-stack-2xs)",
  xs: "var(--space-stack-xs)",
  sm: "var(--space-stack-sm)",
  md: "var(--space-stack-md)",
  lg: "var(--space-stack-lg)",
  xl: "var(--space-stack-xl)",
  "2xl": "var(--space-stack-2xl)",
  "3xl": "var(--space-stack-3xl)",
} as const;

/** Interior padding for editorial / glass / card containers */
export const card = {
  sm: "var(--space-card-sm)", // 16
  default: "var(--space-card)", // 24
  lg: "var(--space-card-lg)", // 32
  xl: "var(--space-card-xl)", // 40
  "2xl": "var(--space-card-2xl)", // 48
  "3xl": "var(--space-card-3xl)", // 64
} as const;

/** Between sibling cards / cells inside a grid */
export const grid = {
  tight: "var(--space-grid-tight)", // 12
  sm: "var(--space-grid-sm)", // 16
  default: "var(--space-grid)", // 24
  lg: "var(--space-grid-lg)", // 32
  xl: "var(--space-grid-xl)", // 40
  "2xl": "var(--space-grid-2xl)", // 80
} as const;

/** Horizontal gutters — pair with section padding-x */
export const rail = {
  tight: "var(--space-rail-tight)", // 16
  sm: "var(--space-rail-sm)", // 24
  default: "var(--space-rail)", // 32
  lg: "var(--space-rail-lg)", // 48
  xl: "var(--space-rail-xl)", // 80
} as const;

/** Container max-widths */
export const container = {
  content: "var(--container-content)", //  1280 — primary content
  editorial: "var(--container-editorial)", // 1440 — editorial wide
  prose: "var(--container-prose)", //  768 — long-form
  reading: "var(--container-reading)", //  672 — comfortable reading width
  narrow: "var(--container-narrow)", //  448 — narrow column
} as const;

export type SpaceKey = keyof typeof space;
export type SectionYKey = keyof typeof sectionY;
export type StackKey = keyof typeof stack;
export type CardKey = keyof typeof card;
export type GridKey = keyof typeof grid;
export type RailKey = keyof typeof rail;
export type ContainerKey = keyof typeof container;
