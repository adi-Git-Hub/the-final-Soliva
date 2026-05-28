import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const PROBLEM_CARDS = [
  { id: 1, title: "Heat Buildup" },
  { id: 2, title: "Poor Breathability" },
  { id: 3, title: "Constant Readjustment" },
  { id: 4, title: "Surface Coverage Only" },
];

const WHY_SOLIVA_FEATURES = [
  { id: 1, title: "Breathable Comfort" },
  { id: 2, title: "Lightweight Protection" },
  { id: 3, title: "Designed For Daily Movement" },
  { id: 4, title: "Urban Ready Design" },
];

export function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to horizontal movement
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);

  // Parallax effects for elements inside panels
  const panel1TextY = useTransform(smoothProgress, [0, 0.5], [0, -100]);
  const panel2TextY = useTransform(smoothProgress, [0.5, 1], [100, 0]);
  const panel1ImageScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
  const panel2ImageScale = useTransform(smoothProgress, [0.5, 1], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-luxury-beige/60">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[200%]">
          {/* PANEL 1: THE PROBLEM */}
          <div className="relative flex h-full w-1/2 items-center px-6 md:px-24">
            <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 items-center gap-12 py-20">
              {/* Left: Cinematic Urban Visuals */}
              <motion.div
                style={{ scale: panel1ImageScale }}
                className="relative h-full w-full overflow-hidden rounded-panel-lg bg-[#E8DED1] md:h-[80%] shadow-editorial border border-line-soft"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brown-deep/40 to-transparent" />

                {/* Dust/Atmosphere particles effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.1, y: 0 }}
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        y: [-20, 20],
                        x: [-10, 10],
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute h-1 w-1 rounded-full bg-surface-glass-strong"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="absolute bottom-10 left-10 text-white/80">
                  <p className="font-mono text-micro-md tracking-eyebrow uppercase">
                    Urban Exposure — 12:40 PM
                  </p>
                </div>
              </motion.div>

              {/* Right: Text Content */}
              <motion.div
                style={{ y: panel1TextY }}
                className="flex flex-col justify-center max-w-xl bg-surface-panel border border-line-soft rounded-panel-lg p-10 backdrop-blur-medium shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-6 bg-brown/20" />
                  <span className="font-mono text-micro-md tracking-eyebrow text-ink-muted uppercase font-bold">
                    THE PROBLEM
                  </span>
                </div>
                <motion.h2 className="font-display text-4xl md:text-6xl text-brown-deep leading-hero mb-8 tracking-tight">
                  Your daily environment is{" "}
                  <span className="italic text-orange-glow">harsher than you think.</span>
                </motion.h2>
                <motion.p className="text-lg text-ink-soft font-light leading-relaxed mb-12">
                  Daily exposure to pollution, UV rays, dust, and trapped heat affects comfort far
                  more than most people realize.
                </motion.p>

                <div className="grid grid-cols-2 gap-4">
                  {PROBLEM_CARDS.map((card, i) => (
                    <motion.div
                      key={card.id}
                      className="group p-6 rounded-2xl border border-line-soft bg-surface-glass backdrop-blur-subtle transition-all hover:bg-surface-glass-strong cursor-default"
                    >
                      <p className="text-xs font-mono text-ink-muted mb-2 font-bold group-hover:text-orange-glow transition-colors">
                        0{card.id}
                      </p>
                      <h4 className="text-sm font-medium text-brown-deep tracking-wide uppercase">
                        {card.title}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* PANEL 2: WHY SOLIVA */}
          <div className="relative flex h-full w-1/2 items-center px-6 md:px-24 bg-transparent">
            {/* Soft transitioning background gradient connecting panels */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 pointer-events-none" />

            <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 items-center gap-12 py-20 relative z-10">
              {/* Left: Content */}
              <motion.div
                style={{ y: panel2TextY }}
                className="flex flex-col justify-center max-w-xl md:order-1 order-2 bg-surface-panel-strong border border-line-soft rounded-panel-lg p-10 backdrop-blur-medium shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-px w-6 bg-brown/20" />
                  <span className="font-mono text-micro-md tracking-eyebrow text-ink-muted uppercase font-bold">
                    WHY SOLIVA
                  </span>
                </div>
                <motion.h2 className="font-display text-4xl md:text-6xl text-brown-deep leading-hero mb-8 tracking-tight">
                  Protection should never{" "}
                  <span className="italic text-orange-glow">compromise comfort.</span>
                </motion.h2>
                <motion.p className="text-lg text-ink-soft font-light leading-relaxed mb-12">
                  SOLIVA is designed to bridge the gap between breathable comfort, lightweight
                  protection, and everyday movement.
                </motion.p>

                <div className="grid grid-cols-2 gap-6">
                  {WHY_SOLIVA_FEATURES.map((feature, i) => (
                    <motion.div
                      key={feature.id}
                      className="flex flex-col gap-3 group cursor-default"
                    >
                      <div className="h-[2px] w-full bg-brown/10 mb-1 group-hover:bg-orange-glow transition-colors duration-500" />
                      <h4 className="text-body-xs font-bold text-brown-deep tracking-wide uppercase">
                        {feature.title}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Premium Scarf Visual */}
              <div className="relative h-full w-full flex items-center justify-center md:order-2 order-1">
                <motion.div
                  style={{
                    scale: panel2ImageScale,
                    rotate: useTransform(smoothProgress, [0.5, 1], [-10, 0]),
                  }}
                  className="relative aspect-square w-full max-w-lg bg-surface-glass-strong border border-line-hairline rounded-shell-lg shadow-editorial backdrop-blur-medium p-10"
                >
                  {/* Abstract scarf shape */}
                  <div className="absolute inset-0 bg-accent-ghost rounded-full blur-[80px] animate-premium-pulse pointer-events-none" />

                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    <defs>
                      <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f7f3ee" />
                        <stop offset="100%" stopColor="#e8ded1" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      d="M40,60 C40,60 80,40 120,60 C160,80 160,140 120,160 C80,180 40,160 40,100 Z"
                      fill="url(#premium-gradient)"
                      stroke="#3a2a22"
                      strokeWidth="0.2"
                      opacity="0.9"
                    />
                    {/* Airflow lines */}
                    {[...Array(5)].map((_, i) => (
                      <motion.path
                        key={i}
                        d={`M ${60 + i * 15} 40 Q ${100 + i * 10} ${100} ${60 + i * 15} 160`}
                        fill="none"
                        stroke="#f5820d"
                        strokeWidth="0.3"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </svg>

                  {/* Minimalist floating info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute top-8 right-8 px-5 py-2.5 border border-line-soft bg-surface-glass-strong backdrop-blur-medium rounded-full shadow-sm"
                  >
                    <span className="text-micro-sm font-mono tracking-cta text-brown-deep font-bold">
                      90g WEIGHT
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-surface-panel-strong backdrop-blur-medium px-6 py-3 rounded-full border border-line-soft shadow-sm">
        <div className="h-[2px] w-24 bg-brown/10 relative overflow-hidden rounded-full">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="absolute inset-0 bg-orange-glow origin-left"
          />
        </div>
        <span className="font-mono text-micro-sm tracking-eyebrow text-brown-deep font-bold">
          STORYLINE
        </span>
      </div>
    </section>
  );
}
