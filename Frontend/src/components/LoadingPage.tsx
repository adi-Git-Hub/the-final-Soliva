import { useEffect, useState } from "react";
import { SolivaLogo } from "./SolivaLogo";

export function LoadingPage({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Short, fixed brand reveal — keep simple to avoid any race-condition
    // edge cases. Critical images are already preloaded via <link rel=preload>
    // in __root.tsx, so the page is ready immediately after this fade.
    const totalReveal = 450;
    const exitDuration = 300;

    let cancelled = false;
    const startTime = Date.now();

    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalReveal) * 100);
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
      }, exitDuration);
    }, totalReveal);

    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#F9F6F0] overflow-hidden transition-all duration-300 ease-out ${
        exiting ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Matte Premium Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FFFFFF_0%,transparent_100%)] opacity-30" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply grain" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6">
        {/* Logo Fade + Scale */}
        <div
          className={`mb-10 sm:mb-16 transition-all duration-[2000ms] cubic-bezier(0.2, 0.8, 0.2, 1) ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <SolivaLogo variant="icon" height={72} className="sm:hidden" />
          <SolivaLogo variant="icon" height={96} className="hidden sm:inline-flex" />
        </div>

        {/* Branding Reveal */}
        <div className="flex w-full flex-col items-center overflow-hidden">
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-luxe sm:tracking-editorial text-[#3A2A1F] uppercase font-light mb-10 sm:mb-12 transition-all duration-[2500ms] ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
          >
            SOLIVA
          </h1>

          <div
            className={`w-full max-w-[16rem] flex flex-col items-center transition-opacity duration-[2000ms] delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex justify-between w-full text-micro-sm tracking-luxe text-[#3A2A1F]/30 uppercase font-light mb-4">
              <span>Initializing</span>
              <span>{Math.floor(progress)}%</span>
            </div>

            {/* Thin Premium Loading Line */}
            <div className="h-[1px] w-full bg-[#3A2A1F]/5 overflow-hidden">
              <div
                className="h-full bg-[#8B5E3C] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `,
        }}
      />
    </div>
  );
}
