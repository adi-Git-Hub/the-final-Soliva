import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { appLoader } from "@/design-system";

/**
 * Soliva Premium Intro Loader — Minimalist brand reveal.
 * Inspired by fluid.glass and Apple's human interface motion.
 * 
 * Design:
 * - Warm Ivory background (#F7F3EE) with champagne highlights.
 * - Fluid morphing reveal (liquid assembly).
 * - "S" of Soliva is Orange-Glow (#f5820d).
 */

const EXIT_DURATION = 0.8;

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<"blank" | "abstract" | "morphing" | "formed" | "exiting">("blank");

  useEffect(() => {
    // Check if loader was already seen in this session
    let seen = false;
    try {
      seen = sessionStorage.getItem(appLoader.seenKey) === "1";
    } catch (e) { /* ignore */ }

    if (seen) {
      setIsVisible(false);
      document.documentElement.setAttribute("data-soliva-intro", "hide");
      return;
    }

    // Sequence timing
    const timers = [
      setTimeout(() => setStage("abstract"), 300),   // 0.3s: Small abstract shape appears
      setTimeout(() => setStage("morphing"), 800),   // 0.8s: Shape begins transforming
      setTimeout(() => setStage("formed"), 1400),    // 1.4s: Smoothly morphs into Soliva logo
      setTimeout(() => {
        try {
          sessionStorage.setItem(appLoader.seenKey, "1");
        } catch (e) { /* ignore */ }
        document.documentElement.setAttribute("data-soliva-intro", "hide");
        setStage("exiting");
      }, 2800), // 2.8s: Homepage reveals
      setTimeout(() => setIsVisible(false), 2800 + EXIT_DURATION * 1000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!isVisible) return null;

  const LOGO_SRC = "/ChatGPT_Image_Jun_11__2026__02_46_40_AM-removebg-preview.png";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background: "#F7F3EE",
        opacity: stage === "exiting" ? 0 : 1,
        transition: `opacity ${EXIT_DURATION}s cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: stage === "exiting" ? "none" : "auto",
      }}
    >
      {/* Champagne highlights & Warm reflections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#f3dcb2]/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 30, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#e3c187]/15 blur-[100px]"
        />
      </div>

      {/* SVG Filter for the Gooey effect */}
      <svg className="absolute hidden" aria-hidden="true">
        <defs>
          <filter id="goo-loader">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative flex flex-col items-center">
        {/* Logo Reveal Container */}
        <div 
          className="relative flex items-center justify-center"
          style={{ 
            filter: stage === "formed" ? "none" : "url(#goo-loader)",
            width: 400,
            height: 160
          }}
        >
          {/* Fluid morphing shapes */}
          <AnimatePresence>
            {(stage === "abstract" || stage === "morphing") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, x: -15 }}
                  animate={{ 
                    scale: stage === "morphing" ? [1, 1.8, 1.4] : 1,
                    x: stage === "morphing" ? 0 : -15,
                    borderRadius: stage === "morphing" ? "15%" : "50%",
                    opacity: 1
                  }}
                  exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-14 w-14 bg-brown-deep"
                />
                <motion.div
                  initial={{ scale: 0, x: 15 }}
                  animate={{ 
                    scale: stage === "morphing" ? [0.8, 1.6, 1.2] : 0.8,
                    x: stage === "morphing" ? 0 : 15,
                    borderRadius: stage === "morphing" ? "10%" : "50%",
                    opacity: 1
                  }}
                  exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                  className="absolute h-12 w-12 bg-brown-deep"
                />
              </div>
            )}
          </AnimatePresence>

          {/* Fully Formed Logo Reveal with Orange 'S' */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ 
              opacity: stage === "formed" ? 1 : 0,
              scale: stage === "formed" ? 1 : 0.96,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* The Logo split into two layers to color the 'S' */}
            <div className="relative h-16 md:h-20 w-auto">
              {/* Layer 1: The Orange 'S' (Clipped to ~18% width) */}
              <img
                src={LOGO_SRC}
                alt=""
                className="h-full w-full object-contain select-none"
                style={{
                  clipPath: "inset(0 82% 0 0)",
                  filter: "brightness(0) saturate(100%) invert(56%) sepia(87%) saturate(1478%) hue-rotate(346deg) brightness(101%) contrast(94%)", // Approx orange-glow (#f5820d)
                }}
                draggable={false}
              />
              
              {/* Layer 2: The rest of 'oliva' (Clipped to everything after ~18%) */}
              <img
                src={LOGO_SRC}
                alt="Soliva"
                className="absolute inset-0 h-full w-full object-contain select-none"
                style={{
                  clipPath: "inset(0 0 0 18%)",
                }}
                draggable={false}
              />
            </div>
            
            {/* Subtle Light Sweep */}
            {stage === "formed" && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "120%", opacity: [0, 0.5, 0] }}
                transition={{ 
                  delay: 1.0, 
                  duration: 1.4, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%)",
                  width: "100%",
                  skewX: -25
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Soft Bloom / Ambient Aura */}
        <motion.div
          animate={{ 
            opacity: stage === "formed" ? [0, 0.4, 0.3] : 0,
            scale: stage === "formed" ? [0.8, 1, 1.05] : 0.8
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute -z-10 h-80 w-80 rounded-full bg-[#f3dcb2]/10 blur-[120px]"
        />
      </div>
    </div>
  );
}
