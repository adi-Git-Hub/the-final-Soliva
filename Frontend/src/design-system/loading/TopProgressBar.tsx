import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";

/**
 * TopProgressBar — a simple, premium, visible loading indicator.
 * Appears at the very top of the viewport during route transitions.
 * 
 * FIX: Implements minimum visibility duration (500ms) to ensure
 * feedback is perceptible even for fast navigations.
 */
export function TopProgressBar() {
  const routerPending = useRouterState({ select: (s) => s.status === "pending" });
  const [isVisible, setIsVisible] = useState(false);
  const showStartTime = useRef<number | null>(null);
  const MIN_DURATION = 500; // Minimum time in ms to show the loader

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (routerPending) {
      // Navigation started
      setIsVisible(true);
      showStartTime.current = Date.now();
    } else {
      // Navigation finished
      if (showStartTime.current) {
        const elapsed = Date.now() - showStartTime.current;
        const remaining = Math.max(0, MIN_DURATION - elapsed);

        timer = setTimeout(() => {
          setIsVisible(false);
          showStartTime.current = null;
        }, remaining);
      } else {
        setIsVisible(false);
      }
    }

    return () => clearTimeout(timer);
  }, [routerPending]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none">
          {/* Main Progress Line */}
          <motion.div
            initial={{ width: "0%", opacity: 0 }}
            animate={{ 
              width: ["0%", "40%", "80%", "94%"],
              opacity: 1 
            }}
            exit={{ 
              width: "100%",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{
              duration: 12, // Slower crawl for long fetches, but exit is fast
              times: [0, 0.05, 0.3, 1],
              ease: "easeOut",
            }}
            className="h-[2px] bg-orange-glow shadow-[0_0_8px_rgba(245,130,13,0.4)]"
          />
          
          {/* Soft Atmospheric Glow Overlay — Lightweight Refinement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-luxury-beige/[0.015] backdrop-blur-[0.5px]"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
