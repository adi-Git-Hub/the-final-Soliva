import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ease, hover, viewportOnce, viewportOnceWhenPartial } from "@/design-system";

const oldWay = [
  "Slips during rides",
  "Constant repositioning",
  "Traps heat & sweat",
  "Leaves neck exposed",
  "Gaps around ears & nose",
  "Tangled hair & smudged makeup",
];

const newWay = [
  "Full face & neck coverage",
  "Dual-layer breathable airflow",
  "Stays secure while moving",
  "Lightweight all-day comfort",
  "Designed for real-world commuting",
  "No exposed gaps",
];

const marqueeItems = [
  "Advanced UV Defense",
  "Breathable Airflow",
  "360° Coverage",
  "Designed For Indian Conditions",
  "Daily Wear Comfort",
  "No Constant Adjustments",
];

export function CompareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse tracking for premium glow on LEFT card
  const leftMouseX = useMotionValue(0);
  const leftMouseY = useMotionValue(0);
  const leftSpringX = useSpring(leftMouseX, { stiffness: 100, damping: 30 });
  const leftSpringY = useSpring(leftMouseY, { stiffness: 100, damping: 30 });

  // Mouse tracking for premium glow on RIGHT card
  const rightMouseX = useMotionValue(0);
  const rightMouseY = useMotionValue(0);
  const rightSpringX = useSpring(rightMouseX, { stiffness: 100, damping: 30 });
  const rightSpringY = useSpring(rightMouseY, { stiffness: 100, damping: 30 });

  function handleLeftMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    leftMouseX.set(e.clientX - rect.left);
    leftMouseY.set(e.clientY - rect.top);
  }

  function handleRightMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    rightMouseX.set(e.clientX - rect.left);
    rightMouseY.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-beige/60 pt-4 sm:pt-6 md:pt-8 pb-0 z-20"
    >
      {/* PREMIUM ATMOSPHERIC TRANSITION ZONE — softened top scrim */}
      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-luxury-beige/20 to-transparent backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,130,13,0.04),transparent_70%)]" />
      </div>

      {/* LUXURY EDITORIAL BACKGROUND SYSTEM — calmer cadence, half amplitude */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [-10, 10, -10],
            y: [-5, 5, -5],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80"
        />
        <motion.div
          animate={{
            x: [10, -10, 10],
            y: [5, -5, 5],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70"
        />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 md:px-8 z-10">
        {/* PREMIUM EDITORIAL PANEL SHELL (CHAMPAGNE LAYER) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: ease.luxe }}
          className="relative bg-surface-panel border border-line-soft rounded-panel-sm sm:rounded-panel-lg md:rounded-shell xl:rounded-shell-lg p-4 sm:p-6 md:px-10 md:py-8 lg:px-12 lg:py-10 xl:px-16 xl:py-12 backdrop-blur-medium shadow-editorial inset-shadow-cream overflow-hidden"
        >
          {/* Ambient Inset Lighting for Shell */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,130,13,0.02),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(252,231,243,0.15),transparent_50%)] pointer-events-none" />

          {/* Header Section */}
          <div className="relative z-10 flex flex-col items-center text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="mb-3 sm:mb-4 flex items-center gap-4 sm:gap-6"
            >
              <div className="h-px w-10 sm:w-16 bg-brown/20" />
              <span className="text-micro-sm sm:text-micro-md tracking-eyebrow sm:tracking-luxe text-orange-glow uppercase font-bold">
                THE COMPARISON
              </span>
              <div className="h-px w-10 sm:w-16 bg-brown/20" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 1.5, ease: ease.luxe }}
              className="font-display text-brown-deep leading-tight mb-4 sm:mb-6 tracking-tighter text-display-lg md:text-display-xl"
            >
              Still using a dupatta or regular scarf?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="max-w-2xl text-ink-muted text-body-xs sm:text-sm md:text-lg font-light italic leading-relaxed"
            >
              It feels like protection. But it was never engineered for daily exposure.
            </motion.p>
          </div>

          {/* Comparison Experience Container */}
          <div className="relative flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 perspective-2000 z-10">
            
            {/* Left Panel: The Old Way (MATTE WARM GREY-BEIGE) */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 0.98 }}
              viewport={viewportOnceWhenPartial}
              transition={{ duration: 1.4, delay: 0.2, ease: ease.luxe }}
              onMouseMove={handleLeftMouseMove}
              whileHover={hover.liftSoft}
              className="flex-1 relative bg-[#EBE5DE]/50 border border-line-strong rounded-panel-sm sm:rounded-panel-lg p-4 sm:p-6 lg:p-8 xl:p-10 backdrop-blur-medium transition-all duration-1000 group/old shadow-floating overflow-hidden"
            >
              {/* Subtle Texture & Lighting */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-panel-sm sm:rounded-panel-lg pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)] opacity-50 pointer-events-none" />

              {/* Interaction Glow */}
              <motion.div
                style={{
                  left: leftSpringX,
                  top: leftSpringY,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brown/5 rounded-full blur-[80px] pointer-events-none z-0"
              />

              <div className="relative z-10">
                <header className="mb-4 sm:mb-5 lg:mb-6">
                  <span className="mb-2 sm:mb-3 block font-mono text-micro-xs sm:text-micro-sm uppercase font-bold tracking-eyebrow sm:tracking-luxe text-ink-muted">
                    01 // CONVENTIONAL
                  </span>
                  <h3 className="mb-2 sm:mb-3 font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-brown-deep/70 transition-colors duration-700 group-hover/old:text-brown-deep">
                    Borrowed protection.
                  </h3>
                  <p className="max-w-[240px] text-xs md:text-sm font-light italic leading-relaxed text-ink-soft">
                    Makeshift solutions were never designed for real environmental exposure.
                  </p>
                </header>

                {/* Readable Stats Grid (Champagne Tint) */}
                <div className="mb-4 sm:mb-5 lg:mb-6 grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 rounded-xl border-y border-line-medium bg-[#F3ECE2]/40 px-3 sm:px-4 py-3 sm:py-4 lg:py-5 inset-shadow-line transition-all duration-700 group-hover/old:bg-[#F3ECE2]/60">
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="block text-micro-xs text-ink-muted uppercase font-mono tracking-widest font-bold">UV</span>
                    <span className="block text-lg sm:text-xl md:text-2xl font-mono italic tracking-tighter text-ink-soft transition-colors group-hover/old:text-brown-deep">Weak</span>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5 border-x border-line-medium px-2 sm:px-4 md:px-6">
                    <span className="block text-micro-xs text-ink-muted uppercase font-mono tracking-widest font-bold">Adj/Hr</span>
                    <span className="block text-lg sm:text-xl md:text-2xl font-mono italic tracking-tighter text-ink-soft transition-colors group-hover/old:text-brown-deep">18×</span>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="block text-micro-xs text-ink-muted uppercase font-mono tracking-widest font-bold">Cover</span>
                    <span className="block text-lg sm:text-xl md:text-2xl font-mono italic tracking-tighter text-ink-soft transition-colors group-hover/old:text-brown-deep">Partial</span>
                  </div>
                </div>

                {/* Problems List */}
                <ul className="mb-4 sm:mb-5 lg:mb-6 space-y-2 sm:space-y-3">
                  {oldWay.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.2 + 0.1 * i }}
                      className="flex items-start gap-4 text-ink-soft text-body-xs md:text-body-sm font-medium group/item"
                    >
                      <span className="mt-[8px] h-[1px] w-4 bg-brown/30 group-hover/item:w-6 transition-all duration-500" />
                      <span className="group-hover/item:text-brown-deep transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-line-medium">
                  <p className="font-display text-xl text-ink-muted leading-tight">
                    Looks covered. <br />
                    <span className="text-ink-soft italic">Still exposed.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Panel: SOLIVA AIRSHIELD (PREMIUM IVORY & BRONZE) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 1.01 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.02 }}
              viewport={viewportOnceWhenPartial}
              transition={{ duration: 1.4, ease: ease.luxe }}
              onMouseMove={handleRightMouseMove}
              whileHover={hover.lift}
              className="flex-[1.1] relative bg-[#FDFBF7]/70 border border-line-accent rounded-panel-sm sm:rounded-panel-lg p-4 sm:p-7 lg:p-9 xl:p-11 backdrop-blur-medium shadow-editorial inset-shadow-cream group/card overflow-hidden transition-all duration-700"
            >
              {/* Internal Depth Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-glow/5 pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
              
              {/* Mouse Tracking Interaction Glow */}
              <motion.div
                style={{
                  left: rightSpringX,
                  top: rightSpringY,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-faint rounded-full blur-[100px] pointer-events-none z-0"
              />
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-ghost blur-[80px] -mr-32 -mt-32 rounded-full" />

              <div className="relative z-10">
                <header className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="mb-3 sm:mb-4 flex items-center justify-between gap-3">
                    <span className="text-micro-sm sm:text-micro-md uppercase font-bold tracking-eyebrow sm:tracking-luxe text-orange-glow">
                      02 // SOLIVA AIRSHIELD
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="h-2 w-2 rounded-full bg-orange-glow"
                    />
                  </div>
                  <h3 className="mb-3 sm:mb-4 font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-brown-deep">
                    Engineered <br />protection.
                  </h3>
                  <p className="max-w-[320px] text-body-xs sm:text-sm md:text-lg font-medium leading-relaxed text-brown-deep/80">
                    Purpose-built for Indian heat, pollution, movement, and long daily wear.
                  </p>
                </header>

                {/* HIGH-CONTRAST STATS (CHAMPAGNE FRAME) */}
                <div className="mb-4 sm:mb-6 lg:mb-8 grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 rounded-2xl border-y border-line-accent bg-surface-glass-strong px-3 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-7 shadow-floating inset-shadow-line transition-all duration-700 group-hover/card:bg-white">
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="block text-micro-xs sm:text-micro-sm text-orange-glow uppercase font-mono tracking-widest font-bold">UV</span>
                    <span className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110 origin-left text-display-metric">ADV</span>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5 border-x border-line-accent px-2 sm:px-4 md:px-6">
                    <span className="block text-micro-xs sm:text-micro-sm text-orange-glow uppercase font-mono tracking-widest font-bold">Adj/Hr</span>
                    <span className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110 text-display-metric">0×</span>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <span className="block text-micro-xs sm:text-micro-sm text-orange-glow uppercase font-mono tracking-widest font-bold">Cover</span>
                    <span className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110 origin-right text-display-metric">360°</span>
                  </div>
                </div>

                {/* Premium Benefits List */}
                <ul className="mb-4 sm:mb-6 lg:mb-8 space-y-2.5 sm:space-y-3.5">
                  {newWay.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.3 + 0.1 * i, duration: 0.8, ease: "easeOut" }}
                      className="flex items-start gap-6 text-brown-deep text-body-sm md:text-body-lg font-medium group/item"
                    >
                      <div className="mt-2.5 h-1.5 w-5 bg-orange-glow rounded-full group-hover/item:w-10 transition-all duration-700" />
                      <span className="group-hover/item:text-orange-glow transition-colors duration-500">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-6 sm:pt-8 border-t border-line-accent">
                  <p className="font-display text-xl sm:text-2xl text-brown-deep leading-tight font-medium">
                    Designed once. <br />
                    <span className="text-orange-glow italic font-medium">Worn effortlessly.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strong Bottom Statement */}
          <div className="relative z-10 mt-6 sm:mt-10 space-y-2 sm:space-y-3 text-center">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2 }}
              className="font-display text-brown-deep tracking-tighter font-bold text-display-sm"
            >
              Protection shouldn’t depend on <span className="italic text-orange-glow">adjustment.</span>
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-ink-muted text-micro-sm sm:text-micro-md tracking-eyebrow sm:tracking-luxe uppercase font-bold"
            >
              Designed for real life. Not temporary fixes.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* LUXURY INFINITE MARQUEE — Compressed strip height */}
      <div className="relative mt-5 sm:mt-6 border-y border-line-medium bg-surface-glass backdrop-blur-medium py-3 sm:py-4 lg:py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-luxury-beige/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-luxury-beige/60 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap items-center justify-center">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 sm:gap-20 items-center pr-14 sm:pr-20"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={`${item}-${i}`} className="flex items-center gap-14 sm:gap-20">
                <span className="text-xs sm:text-sm md:text-body tracking-eyebrow sm:tracking-luxe text-brown-deep/80 uppercase font-bold hover:text-orange-glow transition-colors duration-700 cursor-default">
                  {item}
                </span>
                <span className="text-orange-glow/70 text-xl sm:text-2xl font-serif leading-none">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 {
          perspective: 2000px;
        }
      `}} />
    </section>
  );
}
