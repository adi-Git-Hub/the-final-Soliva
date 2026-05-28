/**
 * LoadingOverlay — cinematic atmospheric interaction veil.
 *
 * Transforms async interaction states into a soft "cinematic pause".
 * Designed to preserve immersion and emotional continuity by veiling
 * the interface rather than aggressively blocking it.
 *
 * Visuals: Lightweight warm-neutral dimming with restrained atmospheric blur.
 * Motion: Inertia-driven dissolves and subtle ambient breathing.
 */

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { overlay, loadingMotion, loadingHierarchy } from "./loading.config";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  /** Show / hide the overlay */
  show?: boolean;
  /** Optional editorial caption rendered centered in the veil */
  caption?: string;
  /** Absolute-position the overlay (default) or fixed full-screen */
  fixed?: boolean;
  /** Z-index override (default 50) */
  zIndex?: number;
  /** Optional className for the container */
  className?: string;
}

export function LoadingOverlay({
  show = true,
  caption,
  fixed = false,
  zIndex = 50,
  className,
}: LoadingOverlayProps) {
  const shouldReduceMotion = useReducedMotion();
  const fadeDuration = overlay.fadeMs / 1000;

  // Intelligent Escalation: Prevent flicker for fast operations
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (show) {
      // Wait for micro-threshold before showing the atmospheric veil
      timer = setTimeout(() => {
        setShouldRender(true);
      }, loadingHierarchy.microThresholdMs);
    } else {
      setShouldRender(false);
    }

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: fadeDuration,
            ease: loadingMotion.ease,
          }}
          className={cn(
            fixed ? "fixed" : "absolute",
            "inset-0 flex flex-col items-center justify-center select-none overflow-hidden",
            className,
          )}
          style={{
            background: overlay.veil,
            backdropFilter: `blur(${shouldReduceMotion ? "0px" : overlay.blur})`,
            WebkitBackdropFilter: `blur(${shouldReduceMotion ? "0px" : overlay.blur})`,
            zIndex,
          }}
          role="status"
          aria-busy="true"
          aria-live="polite"
        >
          {/* 1. Atmospheric Depth Layer: Subtle center highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />

          {/* 2. Ambient Breathing Animation (Nearly Invisible) */}
          {!shouldReduceMotion && (
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(245, 130, 13, 0.02) 0%, transparent 80%)",
              }}
            />
          )}

          {/* 3. Editorial Lockup */}
          {caption && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: loadingMotion.ease }}
              className="relative z-10 flex flex-col items-center gap-5"
            >
              {/* Subtle Horizontal Divider System */}
              <div className="flex items-center gap-6">
                <div className="h-px w-6 bg-brown-deep/[0.12]" />
                <span className="font-mono text-[9px] font-black tracking-[0.35em] uppercase text-brown-deep/50">
                  {caption}
                </span>
                <div className="h-px w-6 bg-brown-deep/[0.12]" />
              </div>

              {/* Atmospheric Drift Line */}
              {!shouldReduceMotion && (
                <div className="h-px w-32 bg-brown-deep/[0.04] relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-brown-deep/[0.08] to-transparent"
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.015)_100%)] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
