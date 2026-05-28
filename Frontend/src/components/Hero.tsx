import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { viewportOnce, ease } from "@/design-system";

export function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F3] pt-12 md:pt-16 pb-4 overflow-hidden"
    >
      <div className="mx-auto max-w-[1720px] px-3 sm:px-6">
        <motion.div
          style={{ opacity: scrollOpacity }}
          className="relative h-[88vh] md:h-[96vh] w-full rounded-[4rem] md:rounded-[7rem] overflow-hidden shadow-cinematic bg-white border border-[#3a2a22]/5"
        >
          {/* Main Cinematic Banner */}
          <div className="absolute inset-0">
            <img
              src="/BG_optimized.webp"
              alt="Soliva Engineered Sun Protection"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover object-center transition-transform duration-[3000ms] hover:scale-105"
            />
          </div>

          {/* Cinematic Scrims — Softened for the new background */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-beige/10 via-transparent to-luxury-beige/20 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(58,42,34,0.06)_100%)] pointer-events-none z-10" />

          {/* Content Overlay - Hidden (Removed buttons/tagline) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            {/* Elements removed as requested */}
          </div>

          {/* Moving Strip — Repositioned inside the banner frame */}
          <div className="absolute bottom-0 inset-x-0 z-30 border-t border-white/10 bg-white/10 backdrop-blur-sm py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex whitespace-nowrap items-center justify-center">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-14 items-center pr-14"
              >
                {[
                  "UPF 50+ Protection",
                  "Dual-Layer Comfort",
                  "Full Coverage Design",
                  "Breathable in Heat",
                  "Lightweight Daily Wear",
                  "No Smudging",
                  "No More Messy Hair",
                ]
                  .concat([
                    "UPF 50+ Protection",
                    "Dual-Layer Comfort",
                    "Full Coverage Design",
                    "Breathable in Heat",
                    "Lightweight Daily Wear",
                    "No Smudging",
                    "No More Messy Hair",
                  ])
                  .map((t, i) => (
                    <div key={i} className="flex items-center gap-14">
                      <span className="text-micro-sm tracking-[0.2em] text-white/70 font-bold uppercase">
                        {t}
                      </span>
                      <span className="text-[#c76600]/60 font-serif text-xl">✦</span>
                    </div>
                  ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
