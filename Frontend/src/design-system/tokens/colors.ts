/**
 * Color tokens — semantic surface / ink / line / accent ladders.
 *
 * Raw palette (luxury-beige, cream, brown, brown-deep, orange-glow) lives in
 * `src/styles.css` `:root` and is exposed via `--ds-*` mirrors in
 * `src/styles/design-system.css`. The semantic tokens below resolve to those
 * raw values — never reference raw colors in components, always use semantic.
 *
 * Prefer Tailwind utilities (`bg-surface-glass`, `text-ink-muted`,
 * `border-line-soft`, `bg-accent-soft`) for className composition.
 */

/* ════════ SURFACES (backgrounds) ════════ */

/** Solid editorial surfaces */
export const surface = {
  base: "var(--surface-base)", //  #f7f3ee — page bg
  raised: "var(--surface-raised)", //  #f3ece2 — cream cards
  muted: "var(--surface-muted)", //  #efe6da — secondary surface
  /** Glass / translucent layers — used with backdrop-blur */
  panel: "var(--surface-panel)", //  white @ 10 %
  panelStrong: "var(--surface-panel-strong)", //  white @ 20 %
  glass: "var(--surface-glass)", //  white @ 25 %
  glassStrong: "var(--surface-glass-strong)", //  white @ 40 %
  glassGhost: "var(--surface-glass-ghost)", //  white @  5 %
  creamVeil: "var(--surface-cream-veil)", //  cream @ 30 %
  /** Scrims — for dark veils / image overlays */
  scrimLight: "var(--surface-scrim-light)", //  brown-deep @ 20 %
  scrimMedium: "var(--surface-scrim-medium)", //  brown-deep @ 40 %
  scrimDark: "var(--surface-scrim-dark)", //  brown-deep @ 82 %
  scrimCinema: "var(--surface-scrim-cinema)", //  near-black @ 86 %
} as const;

/* ════════ INK (foregrounds) ════════ */

/**
 * Ink ladder — readability-first. Used by `text-*` utilities and
 * registered as `--color-ink-*` Tailwind tokens.
 */
export const ink = {
  strong: "var(--ink-strong)", //  brown-deep        — headings
  default: "var(--ink-default)", //  brown             — body
  soft: "var(--ink-soft)", //  brown @ 80 %      — secondary
  muted: "var(--ink-muted)", //  muted-foreground  — tertiary
  faint: "var(--ink-faint)", //  brown-deep @ 50 % — labels at rest
  disabled: "var(--ink-disabled)", //  brown-deep @ 30 % — placeholder
  onDark: "var(--ink-on-dark)", //  luxury-beige      — text on dark veil
  onAccent: "var(--ink-on-accent)", //  white             — text on orange
} as const;

/* ════════ LINES (borders / hairlines) ════════ */

export const line = {
  hairline: "var(--line-hairline)", //  brown-deep @  6 % — faintest
  soft: "var(--line-soft)", //  brown-deep @ 10 % — default card
  medium: "var(--line-medium)", //  brown-deep @ 15 % — marquees, dividers
  strong: "var(--line-strong)", //  brown-deep @ 25 % — emphasis
  accent: "var(--line-accent)", //  orange @ 30 %     — CTA outlines
  onDark: "var(--line-on-dark)", //  beige @ 10 %      — on dark surface
} as const;

/* ════════ ACCENT (orange-glow brand) ════════ */

export const accent = {
  default: "var(--accent)", //  #f5820d            — primary brand
  strong: "var(--accent-strong)", //  #c76600            — emphasis
  soft: "var(--accent-soft)", //  orange @ 60 %      — soft fills
  faint: "var(--accent-faint)", //  orange @ 20 %      — backgrounds
  ghost: "var(--accent-ghost)", //  orange @  6 %      — barely-there washes
  glowAura: "var(--accent-glow-aura)", //  orange @ 40 %      — hover halo color
} as const;

export type SurfaceKey = keyof typeof surface;
export type InkKey = keyof typeof ink;
export type LineKey = keyof typeof line;
export type AccentKey = keyof typeof accent;
