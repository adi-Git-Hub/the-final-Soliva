/**
 * Reusable Framer Motion `Transition` objects + viewport helpers.
 *
 * For when a component wants to use a one-off `animate={...}` or inline
 * transition (not a Variants pattern). Composes with `animations.ts`
 * variants too — variants override transitions when both are present.
 *
 * Usage:
 *   <motion.div
 *     initial={{ opacity: 0 }}
 *     whileInView={{ opacity: 1 }}
 *     viewport={viewportOnce}
 *     transition={revealTransition}
 *   />
 */

import type { Transition, Variant, ViewportOptions } from "framer-motion";
import { duration, ease } from "../tokens/motion";

/* ════════ STANDARD TRANSITIONS ════════ */

/** Primary reveal — most h2/h3 on-scroll entries */
export const revealTransition: Transition = {
  duration: duration.reveal,
  ease: ease.luxe,
};

/** Cinematic reveal — slower, for hero-tier entries */
export const cinematicTransition: Transition = {
  duration: duration.long,
  ease: ease.luxe,
};

/** Soft transition — for between-state crossfades */
export const softTransition: Transition = {
  duration: duration.cinema,
  ease: ease.smooth,
};

/** Hover transition — quick visual feedback */
export const hoverTransition: Transition = {
  duration: duration.fast,
  ease: ease.out,
};

/** Slow hover transition — luxury hover state changes */
export const hoverLuxeTransition: Transition = {
  duration: duration.slow,
  ease: ease.luxe,
};

/** Stagger transition — for parent containers with staggered children */
export const staggerTransition = (staggerChildren: number, delayChildren = 0.1): Transition => ({
  staggerChildren,
  delayChildren,
});

/* ════════ VIEWPORT CONFIGS ════════ */

/** Standard viewport config — reveal once when scrolled into view */
export const viewportOnce: ViewportOptions = { once: true };

/** Viewport with margin — trigger reveal slightly before fully in view */
export const viewportOnceEarly: ViewportOptions = { once: true, margin: "-50px" };

/** Viewport with amount — wait until N% of element is visible */
export const viewportOnceWhenHalf: ViewportOptions = { once: true, amount: 0.5 };

/** Same, when 20% visible — for large editorial panels */
export const viewportOnceWhenPartial: ViewportOptions = { once: true, amount: 0.2 };

/* ════════ COMMON ANIMATE TARGETS ════════ */

/**
 * Helper objects for the `initial` / `animate` / `whileInView` props of
 * components that don't use the full Variants pattern. Pair with one of the
 * Transition objects above.
 */
export const animateState = {
  /** Hidden / pre-reveal state */
  hidden: { opacity: 0, y: 30 } as Variant,
  /** Visible / post-reveal state */
  visible: { opacity: 1, y: 0 } as Variant,
} as const;
