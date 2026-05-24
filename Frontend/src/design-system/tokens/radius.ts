/**
 * Radius tokens — TypeScript mirror of `--radius-ds-*` defined in
 * `src/styles/design-system.css` and registered as `--radius-*` Tailwind
 * utilities in `src/styles.css`.
 *
 * Prefer Tailwind utilities (`rounded-panel-lg`, `rounded-shell`, etc.) for
 * className composition — these consts exist for inline style + CSS-in-JS.
 */

/** Editorial corner ladder — pick the role, not the pixel value. */
export const radius = {
  none: "var(--radius-ds-none)", //  0
  sm: "var(--radius-ds-sm)", //  6 — inputs, badges
  md: "var(--radius-ds-md)", // 12 — order rows, line items
  lg: "var(--radius-ds-lg)", // 16 — thumbnails, mini cards
  xl: "var(--radius-ds-xl)", // 24 — stressor cards
  panelSm: "var(--radius-ds-panel-sm)", // 32 — small editorial
  panel: "var(--radius-ds-panel)", // 40 — panels
  panelLg: "var(--radius-ds-panel-lg)", // 48 — most editorial panels
  shell: "var(--radius-ds-shell)", // 56 — gallery shell
  shellLg: "var(--radius-ds-shell-lg)", // 64 — compare outer shell
  pill: "var(--radius-ds-pill)", // 9999 — pills, badges, CTAs
} as const;

export type RadiusKey = keyof typeof radius;
