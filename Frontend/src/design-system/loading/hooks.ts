import { useState, useEffect, useRef } from "react";
import { loadingHierarchy } from "./loading.config";

type LoadingState = "idle" | "suppressed" | "overlay" | "escalated";

/**
 * useLoadingEscalation — intelligent loading state orchestrator.
 *
 * Manages operation duration to decide the appropriate loader level:
 * 1. 0-150ms: idle/suppressed (no visual change)
 * 2. 150ms-2s: overlay (atmospheric veil)
 * 3. 2s+: escalated (full-screen stabilization)
 */
export function useLoadingEscalation(isLoading: boolean) {
  const [state, setState] = useState<LoadingState>("idle");
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      startTime.current = Date.now();
      setState("suppressed");

      // Stage 1: Escalate to Overlay after micro-threshold
      timer = setTimeout(() => {
        setState("overlay");

        // Stage 2: Escalate to AppLoader for long operations
        timer = setTimeout(() => {
          setState("escalated");
        }, loadingHierarchy.mediumThresholdMs - loadingHierarchy.microThresholdMs);
      }, loadingHierarchy.microThresholdMs);
    } else {
      setState("idle");
      startTime.current = null;
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return {
    state,
    isSuppressed: state === "suppressed",
    showOverlay: state === "overlay",
    isEscalated: state === "escalated",
  };
}
