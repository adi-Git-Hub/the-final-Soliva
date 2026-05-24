/**
 * Loading configuration — durations, fades, skeleton dimensions, and policy
 * defaults that govern every loader in `src/design-system/loading/`.
 *
 * Centralizing these here means future tuning ("loaders feel a touch fast",
 * "skeletons should shimmer slightly slower") is a single-file edit that
 * propagates across every loading surface.
 */

import { duration as motionDuration, ease } from "../tokens/motion";

/* ════════ LOADING HIERARCHY (Orchestration) ════════ */

export const loadingHierarchy = {
  /** MICRO: 0-150ms — Suppress all loaders, preserve continuity */
  microThresholdMs: 150,
  /** SHORT: 150-500ms — Minimal atmospheric veil only */
  shortThresholdMs: 500,
  /** MEDIUM: 500ms-2s — LoadingOverlay allowed, cinematic pause */
  mediumThresholdMs: 2000,
  /** LONG: 2s+ — AppLoader escalation permitted */
  longThresholdMs: 5000,
} as const;

/* ════════ APP LOADER ════════ */

export const appLoader = {
  /** Brand reveal hold — keep short. Critical images already preloaded. */
  revealMs: 450,
  /** Soft dissolve-out after reveal completes */
  exitMs: 300,
  /** Logo enter scale (90% → 100%) and fade duration */
  logoRevealMs: 2000,
  /** sessionStorage key that gates the loader on subsequent visits */
  seenKey: "soliva:loader-seen",
  /** session-aware skip logic */
  skipOnRepeat: true,
} as const;

/* ════════ ROUTE LOADER ════════ */

export const routeLoader = {
  /** Page-to-page crossfade — balanced for perceptible cinematic quality */
  fadeMs: 300,
  /** AnimatePresence exit hold before new route renders */
  exitMs: 250,
} as const;

/* ════════ SECTION LOADER ════════ */

export const sectionLoader = {
  /** Editorial placeholder height (min) — matches typical section breathing */
  minHeight: "60vh",
  /** Fade-in when actual section mounts */
  enterMs: 500,
} as const;

/* ════════ IMAGE LOADER ════════ */

export const imageLoader = {
  /** Blur amount applied while image is loading (px) */
  blurPx: 18,
  /** Cross-fade duration once image fully loads */
  revealMs: 600,
  /** Default placeholder background (matches surface tone) */
  placeholderBg: "var(--surface-raised)",
} as const;

/* ════════ SKELETON ════════ */

export const skeleton = {
  /** Shimmer cycle — slow enough to feel atmospheric, not anxious */
  shimmerMs: 2400,
  /** Card placeholder default sizes */
  card: {
    /** Edition / product card aspect */
    aspect: "4 / 5.2",
    /** Default rounded corner — matches `--radius-ds-panel` */
    radius: "var(--radius-ds-panel)",
  },
  /** Skeleton fill color — softer than surface-raised so it reads as a state */
  fill: "var(--surface-muted)",
} as const;

/* ════════ OVERLAY ════════ */

export const overlay = {
  /** Veil opacity over content when blocking */
  veil: "rgba(247, 243, 238, 0.85)", // luxury-beige @ 85%
  /** Backdrop blur during overlay */
  blur: "var(--blur-ds-medium)",
  /** Fade duration in/out */
  fadeMs: motionDuration.base * 1000, // 320ms
} as const;

/* ════════ SHARED MOTION ════════ */

export const loadingMotion = {
  /** Primary easing used across all loading transitions */
  ease: ease.luxe,
  /** Reduced-motion-friendly easing for hover-less devices */
  easeReduced: "ease-out" as const,
} as const;

export type AppLoaderConfig = typeof appLoader;
export type SkeletonConfig = typeof skeleton;
