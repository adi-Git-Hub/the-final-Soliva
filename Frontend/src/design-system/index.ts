/**
 * Soliva Design System — TypeScript entry point.
 *
 * Single source of truth lives in `src/styles/design-system.css` (CSS custom
 * properties) + Tailwind theme registration in `src/styles.css`. This TS
 * surface mirrors those tokens as named exports so component authors get:
 *   - Autocomplete + type safety on token names
 *   - Programmatic access for inline styles and CSS-in-JS
 *   - Reusable Framer Motion variants and transitions
 *
 * Import patterns:
 *
 *   // Specific tokens
 *   import { space, ink, radius } from "@/design-system";
 *   <div style={{ padding: space[6], background: ink.muted, borderRadius: radius.panel }} />
 *
 *   // Animations
 *   import { slideUp, viewportOnce, hover } from "@/design-system";
 *   <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={viewportOnce} />
 *   <motion.button whileHover={hover.icon} whileTap={tap} />
 *
 *   // Responsive
 *   import { useIsMobile, mediaQuery } from "@/design-system";
 */

/* ════════ TOKENS ════════ */
export * from "./tokens/spacing";
export * from "./tokens/typography";
export * from "./tokens/motion";
export * from "./tokens/radius";
export * from "./tokens/shadows";
export * from "./tokens/colors";

/* ════════ UTILS ════════ */
export * from "./utils/animations";
export * from "./utils/transitions";
export * from "./utils/responsive";

/* ════════ LOADING ════════ */
export * from "./loading";
