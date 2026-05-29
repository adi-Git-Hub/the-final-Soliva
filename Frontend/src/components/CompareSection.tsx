import { motion } from "framer-motion";

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
  "UPF 50+ Protection",
  "Breathable Airflow",
  "360° Coverage",
  "Designed For Indian Conditions",
  "Daily Wear Comfort",
  "No Constant Adjustments",
];

export function CompareSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-luxury-beige md:min-h-screen md:flex md:flex-col pt-4 sm:pt-5 md:pt-6 pb-0 z-20"
    >
      {/* PREMIUM ATMOSPHERIC TRANSITION ZONE */}
      <div className="absolute top-0 inset-x-0 h-64 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-luxury-beige/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,130,13,0.1),transparent_70%)]" />
      </div>

      {/* LUXURY EDITORIAL BACKGROUND SYSTEM (static) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-80" />
      </div>

      <div className="relative mx-auto max-w-[88rem] w-full px-4 md:px-6 z-10 md:flex-1 md:flex md:items-center">
        {/* PREMIUM EDITORIAL PANEL SHELL (CHAMPAGNE LAYER) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full bg-white/40 border border-brown/10 rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.5rem] xl:rounded-[3rem] p-4 sm:p-5 md:p-6 lg:px-9 lg:pt-5 lg:pb-7 xl:px-12 xl:pt-6 xl:pb-9 shadow-[0_40px_100px_-40px_rgba(58,42,34,0.1)] overflow-hidden"
        >
          {/* Ambient Inset Lighting for Shell */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,130,13,0.02),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(252,231,243,0.15),transparent_50%)] pointer-events-none" />

          {/* Comparison Experience Container */}
          <div className="relative flex flex-col md:flex-row items-stretch gap-4 sm:gap-5 z-10">
            {/* Left Panel: The Old Way (MATTE WARM GREY-BEIGE) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="flex-1 relative bg-[#EBE5DE] border border-brown/20 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 lg:p-6 xl:p-7 transition-transform duration-500 group/old shadow-[0_20px_40px_-15px_rgba(58,42,34,0.08)] overflow-hidden"
            >
              {/* Subtle Lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)] opacity-50 pointer-events-none" />

              <div className="relative z-10">
                <header className="mb-3 sm:mb-4">
                  <span className="mb-1.5 block font-mono text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.35em] sm:tracking-[0.5em] text-brown/60">
                    01 // CONVENTIONAL
                  </span>
                  <h3 className="mb-1.5 font-display text-xl sm:text-2xl md:text-[1.75rem] tracking-tight leading-[1.05] text-brown-deep/70 transition-colors duration-700 group-hover/old:text-brown-deep/90">
                    Borrowed protection.
                  </h3>
                  <p className="max-w-[260px] text-[11.5px] md:text-[12.5px] font-light italic leading-snug text-brown/70">
                    Makeshift solutions were never designed for real environmental exposure.
                  </p>
                </header>

                {/* Readable Stats Grid (Champagne Tint) */}
                <div className="mb-3 sm:mb-4 grid grid-cols-3 gap-2 sm:gap-3 rounded-lg border-y border-brown/15 bg-[#F3ECE2]/40 px-3 py-2.5 sm:py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-700 group-hover/old:bg-[#F3ECE2]/60">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">
                      UPF
                    </span>
                    <span className="block text-base sm:text-lg md:text-xl font-mono italic tracking-tighter text-brown/70 transition-colors group-hover/old:text-brown-deep">
                      ≤ 15
                    </span>
                  </div>
                  <div className="space-y-0.5 border-x border-brown/15 px-2 sm:px-3">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">
                      Adj/Hr
                    </span>
                    <span className="block text-base sm:text-lg md:text-xl font-mono italic tracking-tighter text-brown/70 transition-colors group-hover/old:text-brown-deep">
                      18×
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[8px] text-brown/60 uppercase font-mono tracking-widest font-bold">
                      Cover
                    </span>
                    <span className="block text-base sm:text-lg md:text-xl font-mono italic tracking-tighter text-brown/70 transition-colors group-hover/old:text-brown-deep">
                      Partial
                    </span>
                  </div>
                </div>

                {/* Problems List */}
                <ul className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                  {oldWay.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + 0.08 * i }}
                      className="flex items-start gap-3 text-brown/70 text-[12px] md:text-[13px] font-medium group/item"
                    >
                      <span className="mt-[8px] h-[1px] w-3 bg-brown/30 group-hover/item:w-5 transition-all duration-500" />
                      <span className="group-hover/item:text-brown-deep transition-colors leading-snug">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-brown/15">
                  <p className="font-display text-lg sm:text-xl text-brown/50 leading-tight">
                    Looks covered.{" "}
                    <span className="text-brown/70 italic">Still exposed.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Panel: SOLIVA AIRSHIELD™ (PREMIUM IVORY & BRONZE) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="flex-[1.1] relative bg-[#FDFBF7] border-2 border-orange-glow/30 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 lg:p-6 xl:p-8 shadow-[0_30px_60px_-20px_rgba(58,42,34,0.2)] group/card overflow-hidden transition-transform duration-500"
            >
              {/* Internal Depth Layer (static) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-orange-glow/5 pointer-events-none" />

              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-glow/10 blur-[40px] -mr-32 -mt-32 rounded-full" />

              <div className="relative z-10">
                <header className="mb-3 sm:mb-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.35em] sm:tracking-[0.6em] text-orange-glow">
                      02 // SOLIVA AIRSHIELD™
                    </span>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-orange-glow shadow-[0_0_15px_rgba(245,130,13,1)]"
                    />
                  </div>
                  <h3 className="mb-1.5 font-display text-2xl sm:text-3xl md:text-[2.25rem] tracking-tight leading-[1] text-brown-deep">
                    Engineered protection.
                  </h3>
                  <p className="max-w-[340px] text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-snug text-brown-deep/80">
                    Purpose-built for Indian heat, pollution, movement, and long daily wear.
                  </p>
                </header>

                {/* HIGH-CONTRAST STATS (CHAMPAGNE FRAME) */}
                <div className="mb-3 sm:mb-4 grid grid-cols-3 gap-2 sm:gap-3 rounded-xl border-y border-orange-glow/20 bg-white/95 px-3 py-2.5 sm:py-3 shadow-[0_15px_40px_-10px_rgba(58,42,34,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-700 group-hover/card:bg-white">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] sm:text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">
                      UPF
                    </span>
                    <span
                      className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110 origin-left"
                      style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.9rem)" }}
                    >
                      50+
                    </span>
                  </div>
                  <div className="space-y-0.5 border-x border-orange-glow/20 px-2 sm:px-3">
                    <span className="block text-[8px] sm:text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">
                      Adj/Hr
                    </span>
                    <span
                      className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110"
                      style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.9rem)" }}
                    >
                      0×
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[8px] sm:text-[9px] text-orange-glow uppercase font-mono tracking-widest font-black">
                      Cover
                    </span>
                    <span
                      className="block font-mono font-black tracking-tighter text-brown-deep transition-transform duration-500 group-hover/card:scale-110 origin-right"
                      style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.9rem)" }}
                    >
                      360°
                    </span>
                  </div>
                </div>

                {/* Premium Benefits List */}
                <ul className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                  {newWay.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + 0.08 * i, duration: 0.7, ease: "easeOut" }}
                      className="flex items-start gap-3 text-brown-deep text-[12.5px] md:text-[14px] font-bold group/item"
                    >
                      <div className="mt-[7px] h-1 w-4 bg-orange-glow rounded-full shadow-[0_0_12px_rgba(245,130,13,0.5)] group-hover/item:w-7 transition-all duration-700 flex-shrink-0" />
                      <span className="group-hover/item:text-orange-glow transition-colors duration-500 leading-snug">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-orange-glow/30">
                  <p className="font-display text-lg sm:text-xl text-brown-deep leading-tight font-bold">
                    Designed once.{" "}
                    <span className="text-orange-glow font-black italic">Worn effortlessly.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strong Bottom Statement */}
          <div className="relative z-10 mt-4 sm:mt-5 space-y-1.5 sm:space-y-2 text-center">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="font-display text-brown-deep tracking-tighter font-bold leading-[1.1]"
              style={{ fontSize: "clamp(1.15rem, 3.6vw, 2rem)" }}
            >
              Protection shouldn’t depend on{" "}
              <span className="italic font-serif text-orange-glow underline underline-offset-[6px] sm:underline-offset-[8px] decoration-orange-glow/30 decoration-2">
                adjustment.
              </span>
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-brown/50 text-[8.5px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.45em] uppercase font-black"
            >
              Designed for real life. Not temporary fixes.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* LUXURY INFINITE MARQUEE */}
      <div className="relative md:mt-auto mt-4 border-y border-brown/15 bg-white/50 py-2.5 sm:py-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-luxury-beige to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-luxury-beige to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap items-center justify-center">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 sm:gap-20 items-center pr-14 sm:pr-20"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={`${item}-${i}`} className="flex items-center gap-14 sm:gap-20">
                <span className="text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.3em] sm:tracking-[0.4em] text-brown-deep/80 uppercase font-black hover:text-orange-glow transition-colors duration-700 cursor-default">
                  {item}
                </span>
                <span className="text-orange-glow/70 text-lg sm:text-xl font-serif leading-none">
                  ✦
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
