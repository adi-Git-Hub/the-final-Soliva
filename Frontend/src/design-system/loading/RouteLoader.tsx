/**
 * RouteLoader — cinematic atmospheric bridge.
 * 
 * Transforms route navigations into seamless handoffs using a soft blur dissolve.
 * Designed to preserve immersion by avoiding hard cuts and content pops.
 * 
 * Performance Optimized: Uses GPU-accelerated opacity and filter transforms.
 * Accessibility: Honors `prefers-reduced-motion` with an instant-fade fallback.
 */

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { routeLoader, loadingMotion } from "./loading.config";

interface RouteLoaderProps {
  /** Unique key per route — typically the pathname */
  routeKey: string;
  children: ReactNode;
}

/**
 * RouteLoader — cinematic atmospheric bridge.
 * 
 * Transforms route navigations into seamless handoffs using a soft blur dissolve.
 * 
 * NOTE: This component MUST be wrapped in <AnimatePresence mode="wait">
 * at the root level to correctly trigger exit/enter transitions.
 */
export function RouteLoader({ routeKey, children }: RouteLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Cinematic parameters derived from brand motion tokens
  const fadeDuration = (routeLoader.fadeMs + 150) / 1000;
  
  return (
    <motion.div
      key={routeKey}
      // INITIAL: Atmospheric reveal from soft blur + slight scale lift
      initial={{ 
        opacity: 0, 
        filter: shouldReduceMotion ? "none" : "blur(18px)",
        scale: shouldReduceMotion ? 1 : 0.985
      }}
      // ANIMATE: Stabilization into editorial sharpness
      animate={{ 
        opacity: 1, 
        filter: "blur(0px)",
        scale: 1
      }}
      // EXIT: Cinematic dissolve into the atmospheric bridge
      exit={{ 
        opacity: 0, 
        filter: shouldReduceMotion ? "none" : "blur(18px)",
        scale: shouldReduceMotion ? 1 : 1.015
      }}
      transition={{
        duration: fadeDuration,
        ease: shouldReduceMotion ? "easeOut" : loadingMotion.ease,
        opacity: { duration: fadeDuration },
        filter: { duration: fadeDuration * 1.2 },
        scale: { duration: fadeDuration, ease: "easeOut" }
      }}
      className="relative flex-1 flex flex-col w-full min-h-screen"
    >
      {/* Atmospheric Veil — subtle warm dimming to mask layout handoff */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: fadeDuration, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[60] bg-surface-scrim-light backdrop-blur-[4px] md:backdrop-blur-none"
        />
      )}

      {children}
    </motion.div>
  );
}
