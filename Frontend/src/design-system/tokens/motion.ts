/**
 * Motion tokens — durations + easing curves + repeat cadence.
 *
 * Unlike other tokens (which point at CSS vars), motion tokens are exported
 * as raw values: Framer Motion expects numeric durations (seconds) and array
 * easing curves; GSAP expects string easings. Both forms are exported.
 *
 * Section-specific GSAP timelines should keep their own choreography —
 * tokens here are the *vocabulary*, not the *script*.
 */

/* ════════ DURATIONS (seconds — Framer Motion compatible) ════════ */

/** Discrete duration ladder for Framer Motion `duration: ...` */
export const duration = {
  instant: 0.12, // 120 ms — tap feedback, micro-state
  fast: 0.2, // 200 ms — quick hover response
  base: 0.32, // 320 ms — standard transition
  slow: 0.5, // 500 ms — luxury hover
  cinema: 0.8, // 800 ms — soft reveal
  reveal: 1.2, // 1.2 s — primary scroll reveal
  long: 1.5, // 1.5 s — cinematic reveal
  hero: 2.0, // 2.0 s — hero-tier reveal
  epic: 2.5, // 2.5 s — opening cinematic
} as const;

/** Long idle / loop durations (atmospherics + marquees) */
export const idleDuration = {
  float: 4, // gentle product image / cert card float
  floatSlow: 6, // softer floats
  pulse: 4, // subtle breath (used sparingly post-G phases)
  logoFloat: 8, // hero logo mark ambient drift
  orbBreath: 22, // primary atmospheric orb opacity breath
  orbBreathSlow: 28, // secondary atmospheric orb
  orbDrift: 40, // calmer atmospheric drift (Compare)
  marquee: 45, // unified marquee scroll cadence
} as const;

/** CSS duration strings (for inline `style.transitionDuration` / className arbitrary values) */
export const cssDuration = {
  instant: "120ms",
  fast: "200ms",
  base: "320ms",
  slow: "500ms",
  cinema: "800ms",
  reveal: "1200ms",
} as const;

/* ════════ EASING CURVES ════════ */

/**
 * Primary luxury cinematic curve — `cubic-bezier(0.16, 1, 0.3, 1)`.
 * Used 14× across the homepage. Decelerating ease-out with a soft tail.
 * Pair with `duration.reveal` / `duration.long` for editorial entries.
 */
export const easeLuxe = [0.16, 1, 0.3, 1] as const;

/** Alternate gentle out — `cubic-bezier(0.19, 1, 0.22, 1)` */
export const easeSmooth = [0.19, 1, 0.22, 1] as const;

/** Easing curves grouped (Framer Motion array form) */
export const ease = {
  /** Primary luxe ease-out — most-used cinematic curve */
  luxe: easeLuxe,
  /** Alternate gentle ease-out for AnimatePresence crossfades */
  smooth: easeSmooth,
  /** Standard ease-in-out (idle breath, paired transitions) */
  inOut: "easeInOut" as const,
  /** Standard ease-out for hover responses */
  out: "easeOut" as const,
  /** Linear — marquees / constant motion only */
  linear: "linear" as const,
} as const;

/**
 * GSAP easing strings — string form for `ease: "..."` calls.
 * Keep section-specific scrub timelines using these.
 */
export const easeGsap = {
  /** Smooth decelerating out — preferred for entry reveals */
  power3Out: "power3.out",
  /** Strong decelerating out — for dramatic entries */
  power4Out: "power4.out",
  /** Gentle decelerating out */
  power2Out: "power2.out",
  /** Smooth ease-in-out for paired transitions */
  power2InOut: "power2.inOut",
  /** Exponential out — closest GSAP analogue to easeLuxe */
  expoOut: "expo.out",
  /** Linear */
  linear: "none",
} as const;

/* ════════ REPEAT POLICY ════════ */

export const repeat = {
  /** One-shot animation, no repeat */
  none: 0,
  /** Infinite loop — pair with linear easing for marquees, easeInOut for breath */
  infinite: Infinity,
} as const;

/* ════════ STAGGER CADENCES ════════ */

export const stagger = {
  /** Tight stagger between sibling reveals */
  tight: 0.08,
  /** Standard stagger — most reveal sequences */
  default: 0.12,
  /** Slow stagger — cinematic per-word / per-card */
  slow: 0.2,
  /** Per-word stagger (Hero bridge ribbon) */
  word: 0.09, // 90 ms
} as const;

export type DurationKey = keyof typeof duration;
export type IdleDurationKey = keyof typeof idleDuration;
export type EaseKey = keyof typeof ease;
export type StaggerKey = keyof typeof stagger;
