/**
 * AppLoader — cinematic full-screen intro with logo-focused motion + soft
 * dissolve-out. Generalized from the homepage's existing `LoadingPage`
 * component into a reusable primitive.
 *
 * Inherits the brand's loading aesthetic (matte cream bg, soft logo reveal,
 * progress hairline, scale-up exit). Consumes timing + easing tokens from
 * `loading.config.ts` so any tuning happens in one place.
 *
 * Usage:
 *   const [loading, setLoading] = useState(true);
 *   return loading ? <AppLoader onComplete={() => setLoading(false)} /> : <App />;
 *
 * The existing `src/components/LoadingPage.tsx` remains in place to preserve
 * homepage visuals exactly — this primitive exists for new routes / apps
 * that want the same cinematic intro without duplicating the choreography.
 */

import { useEffect, useState, type ReactNode } from "react";
import { appLoader, loadingMotion } from "./loading.config";

interface AppLoaderProps {
  /** Fired once the dissolve-out finishes */
  onComplete: () => void;
  /** Logo element — defaults to a generic mark slot; pass <SolivaLogo /> from a host route */
  logo?: ReactNode;
  /** Optional caption beneath the logo (e.g. "PREMIERE COLLECTION") */
  caption?: string;
  /** Override the brand-reveal hold (defaults to `appLoader.revealMs`) */
  revealMs?: number;
}

export function AppLoader({
  onComplete,
  logo,
  caption,
  revealMs = appLoader.revealMs,
}: AppLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    const startTime = Date.now();

    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / revealMs) * 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const revealTimer = setTimeout(() => {
      if (cancelled) return;
      setProgress(100);
      setExiting(true);
      setTimeout(() => {
        if (!cancelled) onComplete();
      }, appLoader.exitMs);
    }, revealMs);

    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
    };
  }, [onComplete, revealMs]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F9F6F0] overflow-hidden transition-all duration-300 ease-out ${
        exiting ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={exiting}
      role="status"
    >
      {/* Matte cream backdrop — same atmosphere as LoadingPage */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FFFFFF_0%,transparent_100%)] opacity-30" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply grain" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6">
        {/* Logo slot — fade + slight scale */}
        <div
          className={`mb-10 sm:mb-16 transition-all duration-[${appLoader.logoRevealMs}ms] ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{
            transitionTimingFunction: `cubic-bezier(${loadingMotion.ease.join(",")})`,
          }}
        >
          {logo ?? (
            <img
              src={"/" + encodeURIComponent("soliva details (18 x 24 in).webp")}
              alt="Soliva Brand Icon"
              width={96}
              height={96}
              draggable={false}
              className="h-24 w-24 object-contain select-none"
            />
          )}
        </div>

        {/* Hairline progress — calm, single bar, no pulsing */}
        <div className="relative h-px w-full max-w-[200px] overflow-hidden bg-brown-deep/10 rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-brown-deep/40 transition-[width] ease-out"
            style={{ width: `${progress}%`, transitionDuration: "100ms" }}
          />
        </div>

        {caption && (
          <span className="mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-brown-deep/40">
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}
