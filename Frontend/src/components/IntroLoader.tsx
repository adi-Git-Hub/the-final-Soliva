import { useEffect, useRef, useState } from "react";
import { appLoader } from "@/design-system";

/**
 * Soliva intro — a dark, cinematic product reveal.
 *
 * CRITICAL: every entrance/loop animation is pure CSS (keyframes injected in an
 * SSR'd <style> below) applied to server-rendered elements. The loader therefore
 * animates on the FIRST PAINT — it does NOT wait for the JS bundle to download or
 * React to hydrate. (The previous framer-motion version rendered everything at
 * opacity:0 in SSR and only animated after hydration, so a heavy bundle left a
 * dark, empty screen for several seconds before anything moved.)
 *
 * JavaScript here does only three things, all non-blocking and all AFTER paint:
 *   1. skip the loader on repeat visits (sessionStorage),
 *   2. schedule the dissolve,
 *   3. run the dissolve (a CSS transition) and hand the page over.
 * No image/video/asset preloading is awaited — assets stream in the background
 * while the loader is already on screen and animating.
 */

const HOLD_MS = 2400; // visible hold before the dissolve
const EXIT_MS = 800; // dissolve-out duration
const SOFT = "cubic-bezier(0.4, 0, 0.2, 1)";

const LOADER_CSS = `
@keyframes sol-emerge{from{opacity:0;transform:scale(0.6) rotateX(14deg)}to{opacity:1;transform:scale(1) rotateX(0)}}
@keyframes sol-float{0%,100%{transform:translateY(0) rotateY(-9deg) rotateX(5deg)}50%{transform:translateY(-7px) rotateY(9deg) rotateX(-5deg)}}
@keyframes sol-spin{to{transform:rotate(360deg)}}
@keyframes sol-core{0%{opacity:0;transform:translateZ(46px) scale(0.6)}45%{opacity:0.95;transform:translateZ(46px) scale(1)}100%{opacity:0.7;transform:translateZ(46px) scale(0.9)}}
@keyframes sol-reflection{0%{transform:rotate(-120deg);opacity:0}50%{opacity:0.9}100%{transform:rotate(120deg);opacity:0}}
@keyframes sol-fade-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes sol-fade{from{opacity:0}to{opacity:1}}
@keyframes sol-hairline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes sol-ambient{0%,100%{opacity:0.45}50%{opacity:0.78}}
@media (prefers-reduced-motion: reduce){
  [data-sol-intro] .sol-anim{animation:none!important;opacity:1!important;transform:none!important}
}
`;

const RING_MASK =
  "radial-gradient(circle closest-side, transparent 0 78%, #000 80% 90%, transparent 92%)";
const METAL = `conic-gradient(from 90deg,
  #4a3826 0deg, #b98a52 46deg, #f3dcb2 82deg, #d9b27a 112deg,
  #6b4f33 158deg, #2c1f13 200deg, #b98a52 250deg, #f3dcb2 294deg,
  #8a6a44 332deg, #4a3826 360deg)`;

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timing diagnostics — proves the loader paints/animates before hydration.
    const fcp = performance
      .getEntriesByType("paint")
      .find((e) => e.name === "first-contentful-paint");
    console.log(`[IntroLoader] hydrated/mounted @ ${Math.round(performance.now())}ms`);
    if (fcp)
      console.log(
        `[IntroLoader] first-contentful-paint @ ${Math.round(fcp.startTime)}ms — CSS loader already visible & animating here (zero JS)`,
      );

    let seen = false;
    try {
      seen = sessionStorage.getItem(appLoader.seenKey) === "1";
    } catch {}
    if (seen) {
      setIsVisible(false);
      document.documentElement.setAttribute("data-soliva-intro", "hide");
      return;
    }
    try {
      sessionStorage.setItem(appLoader.seenKey, "1");
    } catch {}

    const t = setTimeout(() => {
      rootRef.current?.removeAttribute("data-soliva-intro-root");
      document.documentElement.setAttribute("data-soliva-intro", "hide");
      setExiting(true);
      console.log(`[IntroLoader] dissolve start @ ${Math.round(performance.now())}ms`);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => setIsVisible(false), EXIT_MS);
    return () => clearTimeout(t);
  }, [exiting]);

  if (!isVisible) return null;

  return (
    <div
      ref={rootRef}
      data-soliva-intro-root=""
      data-sol-intro=""
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        // `animation:none` overrides the gate's reveal so we own opacity for the
        // dissolve; the dark backdrop is opaque from first paint.
        animation: "none",
        background:
          "radial-gradient(ellipse 92% 88% at 50% 42%, #221a13 0%, #140e0a 47%, #0a0706 100%)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "none",
        filter: exiting ? "blur(18px)" : "none",
        transition: `opacity ${EXIT_MS}ms ${SOFT}, transform ${EXIT_MS}ms ${SOFT}, filter ${EXIT_MS}ms ${SOFT}`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 66% at 50% 44%, transparent 38%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Ambient bronze key light */}
      <div
        aria-hidden
        className="sol-anim pointer-events-none absolute"
        style={{
          top: "39%",
          left: "50%",
          width: 540,
          height: 540,
          marginLeft: -270,
          marginTop: -270,
          background: "radial-gradient(circle, rgba(201,143,79,0.20), transparent 60%)",
          filter: "blur(46px)",
          animation: "sol-ambient 6.5s ease-in-out infinite",
        }}
      />

      {/* 3D stage */}
      <div className="relative" style={{ perspective: 1150 }}>
        <div
          className="sol-anim"
          style={{
            transformStyle: "preserve-3d",
            animation: "sol-emerge 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          <div
            className="sol-anim relative grid place-items-center"
            style={{
              width: 232,
              height: 232,
              transformStyle: "preserve-3d",
              animation: "sol-float 9s ease-in-out 1.3s infinite",
            }}
          >
            {/* Metallic ring — light travels around */}
            <div
              aria-hidden
              className="sol-anim absolute inset-0 rounded-full"
              style={{
                background: METAL,
                WebkitMask: RING_MASK,
                mask: RING_MASK,
                animation: "sol-spin 17s linear infinite",
                willChange: "transform",
              }}
            />
            {/* One reflection sweep */}
            <div
              aria-hidden
              className="sol-anim absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(255,246,228,0.85) 18deg, transparent 40deg)",
                WebkitMask: RING_MASK,
                mask: RING_MASK,
                mixBlendMode: "screen",
                animation: "sol-reflection 1.6s cubic-bezier(0.4,0,0.2,1) 0.9s both",
              }}
            />
            {/* Outer guide ring */}
            <div
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{ inset: -16, border: "1px solid rgba(201,143,79,0.10)" }}
            />
            {/* Luminous sun core */}
            <div
              aria-hidden
              className="sol-anim rounded-full"
              style={{
                width: 70,
                height: 70,
                background:
                  "radial-gradient(circle, rgba(255,238,205,0.9) 0%, rgba(217,178,122,0.55) 38%, rgba(201,143,79,0.12) 68%, transparent 78%)",
                animation:
                  "sol-core 2.4s cubic-bezier(0.16,1,0.3,1) 0.55s infinite alternate",
              }}
            />
          </div>
        </div>
      </div>

      {/* Wordmark + whisper progress */}
      <div className="relative z-10 mt-16 flex flex-col items-center">
        <span
          className="sol-anim font-display"
          style={{
            fontSize: "clamp(1.7rem, 5vw, 2.4rem)",
            fontWeight: 400,
            letterSpacing: "0.46em",
            paddingLeft: "0.46em",
            lineHeight: 1,
            background:
              "linear-gradient(180deg, #f7e6c4 0%, #e3c187 40%, #c08b4f 72%, #9a7240 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            animation: "sol-fade-up 1s cubic-bezier(0.16,1,0.3,1) 0.8s both",
          }}
        >
          SOLIVA
        </span>

        <span
          className="sol-anim mt-3 font-mono"
          style={{
            fontSize: "0.5rem",
            letterSpacing: "0.62em",
            paddingLeft: "0.62em",
            color: "rgba(201,143,79,0.6)",
            animation: "sol-fade 1s cubic-bezier(0.4,0,0.2,1) 1.2s both",
          }}
        >
          SUN PROTECTION
        </span>

        <div
          className="mt-8 h-px w-[176px] overflow-hidden rounded-full"
          style={{ background: "rgba(201,143,79,0.14)" }}
        >
          <div
            className="sol-anim h-full w-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(201,143,79,0.35), rgba(243,220,178,0.95))",
              animation: "sol-hairline 1.9s cubic-bezier(0.4,0,0.1,1) 0.45s both",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
