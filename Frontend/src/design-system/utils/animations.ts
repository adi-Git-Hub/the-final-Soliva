/**
 * Reusable Framer Motion `Variants` for the homepage's recurring entry
 * patterns. Use these for new components to inherit the site's motion
 * language without redefining easing + duration each time.
 *
 * Existing homepage sections deliberately retain their inline transition
 * configs (they're already part of bespoke choreography) — these variants
 * are forward-looking utility for new components.
 *
 * Usage:
 *   <motion.div
 *     variants={slideUp}
 *     initial="hidden"
 *     whileInView="visible"
 *     viewport={viewportOnce}
 *   />
 */

import type { Variants } from "framer-motion";
import { duration, ease, stagger } from "../tokens/motion";

/* ════════ ENTRY REVEALS ════════ */

/** Fade in only — gentlest entry, for atmosphere */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.reveal, ease: ease.luxe },
  },
};

/** Slide up with fade — the workhorse entry pattern (most h2/h3 reveals) */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: ease.luxe },
  },
};

/** Stronger slide up — for hero-tier reveals and large editorial panels */
export const slideUpStrong: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.long, ease: ease.luxe },
  },
};

/** Slide up with blur lift — cinematic h2 reveals (Compare, Storytelling) */
export const slideUpBlur: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.long, ease: ease.luxe },
  },
};

/** Slide in from left — sidebars, left-rail content */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.long, ease: ease.luxe },
  },
};

/** Slide in from right — sidebars, right-rail content */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.long, ease: ease.luxe },
  },
};

/** Scale in — cards, panels with subtle scale entry */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.long, ease: ease.luxe },
  },
};

/* ════════ STAGGER CONTAINERS ════════ */

/**
 * Parent variant that staggers child reveals.
 * Pair with children using slideUp / fadeIn / etc.
 */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.default,
      delayChildren: 0.1,
    },
  },
};

/** Tighter stagger — for dense grids */
export const staggerParentTight: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: 0.05,
    },
  },
};

/** Slow stagger — for cinematic per-card reveals */
export const staggerParentSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.15,
    },
  },
};

/* ════════ IDLE / LOOPING MOTIONS ════════ */

/**
 * Gentle floating motion — for product imagery, cert cards, etc.
 * Pass these to `animate` directly (not as Variants).
 */
export const idleFloat = {
  animate: { y: [0, -6, 0] },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: ease.inOut,
  },
} as const;

/** Slower drift — for hero logo mark */
export const idleFloatSlow = {
  animate: { y: [0, -6, 0] },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: ease.inOut,
  },
} as const;

/** Opacity breath — for atmospheric orbs */
export const idleOrbBreath = {
  animate: { opacity: [0.35, 0.45, 0.35] },
  transition: {
    duration: 22,
    repeat: Infinity,
    ease: ease.inOut,
  },
} as const;

/* ════════ HOVER MOTIONS ════════ */

/**
 * Hover compositions for `whileHover`. Restrained scales (≤ 6 %) per the
 * site's hover discipline established in Phase H.1.
 */
export const hover = {
  /** Subtle scale — for cards and panels (Hero, Collection) */
  gentle: { scale: 1.02 },
  /** Soft lift — for paired panels (Compare LEFT) */
  liftSoft: { scale: 1.02, y: -4 },
  /** Standard lift — for dominant panels (Compare RIGHT) */
  lift: { scale: 1.04, y: -8 },
  /** Icon button bounce — for header chrome */
  icon: { scale: 1.06 },
} as const;

/** Tap feedback — universal mobile-friendly press state */
export const tap = { scale: 0.95 } as const;
