import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { appLoader } from "@/design-system";
import { SolivaLogo } from "./SolivaLogo";

const DURATION_MS = 1100;
const EXIT_MS = 600;

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [pct, setPct] = useState(8);
  const shouldReduceMotion = useReducedMotion();

  const rawPct = useMotionValue(8);
  const smoothPct = useSpring(rawPct, { stiffness: 70, damping: 16, mass: 0.9 });
  const barSpring = useSpring(rawPct, { stiffness: 50, damping: 14, mass: 1.1 });
  const barScaleX = useTransform(barSpring, (v) => v / 100);
  const glowSpring = useSpring(rawPct, { stiffness: 30, damping: 12, mass: 1.4 });
  const glowScaleX = useTransform(glowSpring, (v) => v / 100);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    return smoothPct.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(Math.round(v)).padStart(2, "0");
      }
    });
  }, [smoothPct]);

  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem(appLoader.seenKey) === "1";
    } catch {}
    if (hasSeen) {
      setIsVisible(false);
      document.documentElement.setAttribute("data-soliva-intro", "hide");
      return;
    }
    try {
      sessionStorage.setItem(appLoader.seenKey, "1");
    } catch {}
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.documentElement.setAttribute("data-soliva-intro", "hide");
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (shouldReduceMotion) {
      setPct(99);
      rawPct.set(99);
      return;
    }
    const dur = DURATION_MS - 100;
    const start = performance.now() - 120;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const next = Math.min(99, Math.round(eased * 99));
      setPct((prev) => {
        if (next > prev) {
          rawPct.set(next);
          return next;
        }
        return prev;
      });
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, shouldReduceMotion, rawPct]);

  const rm = !!shouldReduceMotion;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-soliva-intro-root=""
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* ─── Background image with cinematic slow zoom ───────────── */}
          <motion.div
            animate={rm ? {} : { scale: [1, 1.025, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-3%] pointer-events-none"
            style={{
              backgroundImage: "url('/luxury-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* ─── Atmosphere layer (behind UI, slow drift) ────────────── */}
          <motion.div
            animate={rm ? {} : {
              opacity: [0.45, 0.75, 0.45],
              scale: [1, 1.06, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0.55 }}
          >
            <div
              className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(245,130,13,0.14), transparent 52%)",
                filter: "blur(80px)",
              }}
            />
            <div
              className="absolute left-[10%] bottom-[6%] h-[450px] w-[450px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(243,236,226,0.7), transparent 58%)",
                filter: "blur(100px)",
              }}
            />
            <div
              className="absolute right-[8%] top-[10%] h-[300px] w-[300px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,240,220,0.15), transparent 55%)",
                filter: "blur(70px)",
              }}
            />
          </motion.div>

          {/* ─── Drifting directional light ───────────────────────────── */}
          {!rm && (
            <motion.div
              animate={{
                x: ["-7%", "7%", "-7%"],
                y: ["-5%", "5%", "-5%"],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute top-[-18%] right-[-10%] w-[55%] h-[55%] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,235,200,0.16), transparent 48%)",
                  filter: "blur(50px)",
                }}
              />
            </motion.div>
          )}

          {/* ─── Vignette — cinematic framing ────────────────────────── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 68% 62% at 50% 46%, transparent 30%, rgba(58,42,34,0.1) 100%)",
            }}
          />

          {/* ─── Foreground UI column ─────────────────────────────────── */}
          <motion.div
            animate={rm ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* ── Logo — crisp, no filter blur ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0.65, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Halo */}
              <motion.div
                aria-hidden
                animate={
                  rm
                    ? { opacity: 0.3 }
                    : { opacity: [0.18, 0.48, 0.18], scale: [1, 1.14, 1] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -m-28 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(245,130,13,0.22), transparent 55%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Float — transform-only, no filter */}
              <motion.div
                animate={rm ? {} : { y: [0, -6, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ backfaceVisibility: "hidden" }}
              >
                <SolivaLogo
                  variant="primary"
                  height={68}
                  loading="eager"
                  className="drop-shadow-[0_8px_22px_rgba(245,130,13,0.14)]"
                />
              </motion.div>

              {/* Ground reflection */}
              <motion.div
                animate={rm ? {} : { opacity: [0.1, 0.28, 0.1], scaleX: [0.92, 1.08, 0.92] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-9 left-1/2 -translate-x-1/2 w-full h-[10px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(245,130,13,0.22), transparent 65%)",
                  filter: "blur(5px)",
                  opacity: 0.12,
                }}
              />
            </motion.div>

            <div className="h-12 sm:h-16" />

            {/* ── Percentage ──────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0.55, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="flex items-baseline tabular-nums"
            >
              <span
                ref={displayRef}
                className="font-mono font-extralight"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
                  letterSpacing: "-0.06em",
                  color: "rgba(58, 42, 34, 0.72)",
                  textShadow: `
                    0 1px 0 rgba(255,255,255,0.5),
                    0 -1px 1px rgba(58,42,34,0.04),
                    0 6px 24px rgba(58,42,34,0.05)
                  `,
                }}
              >
                08
              </span>
              <span
                className="font-mono font-extralight ml-0.5"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                  letterSpacing: "-0.02em",
                  color: "rgba(58, 42, 34, 0.22)",
                  textShadow: "0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                %
              </span>
            </motion.div>

            <div className="h-5" />

            {/* ── Progress capsule ─────────────────────────────────────── */}
            <div className="relative w-60 sm:w-80">
              {/* Track */}
              <div
                className="relative h-[12px] w-full rounded-full overflow-hidden"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    rgba(58,42,34,0.11) 0%,
                    rgba(58,42,34,0.07) 25%,
                    rgba(58,42,34,0.04) 55%,
                    rgba(58,42,34,0.02) 100%
                  )`,
                  boxShadow: `
                    inset 0 2.5px 5px rgba(58,42,34,0.13),
                    inset 0 -1px 0 rgba(255,255,255,0.18),
                    inset 0 0 0 0.5px rgba(58,42,34,0.05),
                    0 1px 0 rgba(255,255,255,0.45),
                    0 2px 4px rgba(58,42,34,0.04)
                  `,
                }}
              >
                {/* Fill capsule */}
                <motion.div
                  style={{ scaleX: barScaleX }}
                  className="absolute inset-y-0 left-0 right-0 origin-left rounded-full will-change-transform"
                >
                  {/* Core — cylindrical shading */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        rgba(255,200,135,1) 0%,
                        rgba(252,172,60,0.97) 18%,
                        rgba(245,140,20,0.94) 40%,
                        rgba(235,115,10,0.9) 65%,
                        rgba(200,82,0,0.82) 100%
                      )`,
                    }}
                  />

                  {/* Specular band — compressed top highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[38%] rounded-full"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        rgba(255,248,230,0.75) 0%,
                        rgba(255,235,195,0.35) 55%,
                        transparent 100%
                      )`,
                    }}
                  />

                  {/* Bottom curvature shadow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[28%] rounded-full"
                    style={{
                      background: "linear-gradient(to top, rgba(110,50,0,0.22), transparent)",
                    }}
                  />

                  {/* Inner glow — luminescence */}
                  <div
                    className="absolute inset-[1px] rounded-full"
                    style={{
                      boxShadow:
                        "inset 0 0 8px rgba(255,185,85,0.35), inset 0 -1px 3px rgba(255,160,60,0.2)",
                    }}
                  />

                  {/* Edge rim light — top */}
                  <div
                    className="absolute top-0 left-[5%] right-[5%] h-[1px]"
                    style={{
                      background: "linear-gradient(to right, transparent 5%, rgba(255,245,225,0.6) 30%, rgba(255,245,225,0.7) 50%, rgba(255,245,225,0.6) 70%, transparent 95%)",
                    }}
                  />
                </motion.div>

                {/* Primary sweep — specular caustic */}
                {!rm && (
                  <motion.div
                    animate={{ x: ["-160%", "320%"] }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: [0.35, 0, 0.15, 1],
                      delay: 0.1,
                    }}
                    className="absolute inset-y-0 w-[55%] pointer-events-none z-10"
                    style={{
                      background: `linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255,255,255,0.06) 18%,
                        rgba(255,255,255,0.3) 40%,
                        rgba(255,255,255,0.5) 50%,
                        rgba(255,255,255,0.3) 60%,
                        rgba(255,255,255,0.06) 82%,
                        transparent 100%
                      )`,
                    }}
                  />
                )}

                {/* Secondary sweep — broad ambient */}
                {!rm && (
                  <motion.div
                    animate={{ x: ["-200%", "350%"] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.8,
                    }}
                    className="absolute inset-y-0 w-[90%] pointer-events-none z-10"
                    style={{
                      background: `linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255,255,255,0.04) 25%,
                        rgba(255,255,255,0.14) 50%,
                        rgba(255,255,255,0.04) 75%,
                        transparent 100%
                      )`,
                    }}
                  />
                )}
              </div>

              {/* Cast shadow */}
              <div
                className="absolute top-[13px] left-[6%] right-[6%] h-[8px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(58,42,34,0.09), transparent 60%)",
                  filter: "blur(5px)",
                }}
              />

              {/* Volumetric glow — delayed trail */}
              <motion.div
                style={{ scaleX: glowScaleX }}
                className="absolute top-[10px] left-0 right-0 h-[20px] origin-left rounded-full pointer-events-none will-change-transform"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(
                      ellipse 65% 100% at 70% 0%,
                      rgba(245,130,13,0.38),
                      transparent 58%
                    )`,
                    filter: "blur(10px)",
                  }}
                />
              </motion.div>

              {/* Leading edge bloom */}
              <motion.div
                initial={{ left: "8%" }}
                animate={{ left: `${pct}%` }}
                transition={{
                  type: "spring",
                  stiffness: 45,
                  damping: 12,
                  mass: 1.2,
                }}
                className="absolute top-[-7px] w-[20px] h-[26px] -translate-x-1/2 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(245,130,13,0.55), transparent 58%)",
                  filter: "blur(7px)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
