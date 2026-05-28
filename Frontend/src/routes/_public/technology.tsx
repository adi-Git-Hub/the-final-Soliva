import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease, useIsMobile } from "@/design-system";
import { ChevronRight, Wind, Layers, Maximize2, Shield, Activity } from "lucide-react";
import { AtmosphericEngine, InteractiveCard3D } from "@/components/AtmosphericEngine";

export const Route = createFileRoute("/_public/technology")({
  component: TechnologyRoute,
});

function TechnologyRoute() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAF7F3] overflow-x-hidden">
      {/* 3D Atmospheric Background Layer */}
      <AtmosphericEngine type="tech" className="opacity-40" />

      {/* ═══ SECTION 1: TECHNOLOGY HERO ═══ */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(243,236,226,0.6),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

          <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0">
            {/* Floating blurred orbs move with parallax */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-[15%] w-96 h-96 rounded-full bg-[#f4d2c6]/30 blur-[100px]"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#f3ece2]/40 blur-[120px]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.smooth }}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6 block">
              TECHNOLOGY
            </span>
            <h1
              className="font-display text-[#3a2a22] leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            >
              Advanced UV Defense. <br />
              <span className="italic text-[#c76600]/80">Dual-layer.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-[1.0625rem] sm:text-[1.25rem] text-[#7b6a5f] font-light leading-relaxed mb-12">
              The science behind the wrap — breathable architecture, ventilation, and
              movement-focused comfort engineered for Indian summers.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex justify-center"
            >
              <div className="h-20 w-px bg-gradient-to-b from-[#c76600]/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 2: ENGINEERED FOR INDIAN HEAT ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* LEFT: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: ease.smooth }}
              className="flex flex-col text-left"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6">
                BREATHABLE ARCHITECTURE
              </span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Engineered For Long <br /> Summer Movement
              </h2>
              <p className="text-[1.0625rem] text-[#7b6a5f] font-light leading-relaxed mb-10 max-w-lg">
                Designed to reduce heat discomfort during long outdoor exposure through breathable
                layering and movement-first construction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  { icon: Wind, text: "Lightweight airflow structure" },
                  { icon: Shield, text: "Reduced heat trapping" },
                  { icon: Activity, text: "Everyday outdoor comfort" },
                  { icon: Layers, text: "Soft breathable layering" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#3a2a22]/5 group-hover:border-[#c76600]/20 transition-all duration-500">
                      <item.icon
                        size={16}
                        className="text-[#c76600]/60 group-hover:text-[#c76600]"
                      />
                    </div>
                    <span className="text-[0.875rem] text-[#3a2a22]/80 font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Fabric Visualization */}
            <InteractiveCard3D>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: ease.smooth }}
                className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/40 border border-[#3a2a22]/5 backdrop-blur-sm group shadow-editorial"
              >
                <img
                  src="/breathable-architecture.webp"
                  alt="Soliva Breathable Architecture"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/20 via-transparent to-[#c76600]/5 pointer-events-none" />
                <div className="absolute inset-4 border border-white/20 rounded-[2.5rem] pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 text-center z-10">
                  <span className="font-mono text-[0.5rem] tracking-[0.3em] text-white/60 uppercase font-bold">
                    SIMULATED AIRFLOW MODEL v.04
                  </span>
                </div>
              </motion.div>
            </InteractiveCard3D>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: DUAL-LAYER COMFORT SYSTEM ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px] bg-white/20">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="mb-20"
          >
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Dual-Layer Comfort System
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-[1.0625rem] text-[#7b6a5f] font-light leading-relaxed">
              Every edition features a high-performance dual-layer architecture designed to maximize
              protection while enabling constant airflow.
            </p>
          </motion.div>

          {/* Layered Visualization */}
          <div className="relative h-[500px] flex items-center justify-center perspective(2000px)">
            <div className="relative w-full max-w-3xl h-full flex flex-col items-center justify-between py-12">
              {/* Outer Layer */}
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 30 }}
                viewport={viewportOnceEarly}
                transition={{ duration: 1, ease: ease.smooth }}
                className="w-[80%] h-24 bg-gradient-to-br from-[#c76600]/10 to-[#f3ece2] border border-[#c76600]/20 rounded-2xl shadow-sm flex items-center justify-center backdrop-blur-sm z-30"
              >
                <div className="text-center">
                  <span className="font-mono text-[0.5625rem] tracking-[0.25em] text-[#c76600] uppercase font-black block mb-1">
                    LAYER 01
                  </span>
                  <span className="font-display text-xl text-[#3a2a22]">Outer Shield</span>
                </div>
              </motion.div>

              {/* Air Gap */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.3, duration: 1 }}
                className="relative w-full flex flex-col items-center gap-3 z-20"
              >
                <div className="h-16 w-px bg-dashed border-l border-dashed border-[#c76600]/30" />
                <div className="px-6 py-2 rounded-full border border-[#c76600]/10 bg-white/50 backdrop-blur-md">
                  <span className="font-mono text-[0.5rem] tracking-[0.3em] text-[#c76600] uppercase font-bold italic">
                    Breathable Air Gap
                  </span>
                </div>
                <div className="h-16 w-px bg-dashed border-l border-dashed border-[#c76600]/30" />
              </motion.div>

              {/* Inner Layer */}
              <motion.div
                initial={{ opacity: 0, y: -40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 30 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.5, duration: 1, ease: ease.smooth }}
                className="w-[80%] h-24 bg-gradient-to-br from-white to-[#f3ece2]/50 border border-[#3a2a22]/10 rounded-2xl shadow-inner-soft flex items-center justify-center backdrop-blur-sm z-10"
              >
                <div className="text-center">
                  <span className="font-mono text-[0.5625rem] tracking-[0.25em] text-[#3a2a22]/40 uppercase font-black block mb-1">
                    LAYER 02
                  </span>
                  <span className="font-display text-xl text-[#3a2a22]">Inner Comfort</span>
                </div>
              </motion.div>

              {/* Atmospheric Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,130,13,0.04),transparent_70%)] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: MOVEMENT VENTILATION ZONES ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* LEFT: Lifestyle Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: ease.smooth }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-cinematic border border-[#3a2a22]/5"
            >
              <img
                src="/DSC05485.JPG"
                alt="Movement Comfort"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3a2a22]/20 via-transparent to-[#c76600]/10" />

              {/* Overlay Flow Lines */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 400],
                      opacity: [0, 0.3, 0],
                      y: [0, 20, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "linear",
                    }}
                    className="absolute h-px w-20 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                      top: `${10 + i * 8}%`,
                      left: `-20%`,
                      transform: "rotate(-10deg)",
                    }}
                  />
                ))}
              </div>

              <div className="absolute top-8 left-8 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white uppercase font-bold">
                  KINETIC FLOW MAPPING
                </span>
              </div>
            </motion.div>

            {/* RIGHT: Feature Storytelling */}
            <div className="flex flex-col text-left">
              <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6">
                DAILY MOTION
              </span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Designed Around <br /> Daily Motion
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Ventilation airflow zones",
                    desc: "Strategically placed micro-openings that enable heat release without compromising coverage.",
                  },
                  {
                    title: "Heat release structure",
                    desc: "Engineered to prevent sweat trapping, ensuring skin remains cool during high-exposure hours.",
                  },
                  {
                    title: "Long-hour outdoor comfort",
                    desc: "Featherweight materials designed for 8+ hours of continuous wear in harsh urban climates.",
                  },
                  {
                    title: "Lightweight movement support",
                    desc: "Flexible architecture that moves naturally with your body's silhouette during commutes.",
                  },
                  {
                    title: "Breathable wearability",
                    desc: "A fabric weight ratio under 180g, focused on a 'barely there' feel for daily routines.",
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnceEarly}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="group"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c76600]/40 mt-2.5 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#c76600]" />
                      <div>
                        <h4 className="font-display text-xl text-[#3a2a22] mb-2">{f.title}</h4>
                        <p className="text-[0.875rem] text-[#7b6a5f] font-light leading-relaxed max-w-md">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: BUILT FOR DAILY EXPOSURE ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px] bg-luxury-beige/40">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Built For Everyday Exposure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Urban Commuting", image: "/hero-image.webp", tag: "MOTION" },
              { title: "Long Outdoor Hours", image: "/DSC05476.JPG", tag: "STAMINA" },
              { title: "Summer Daily Movement", image: "/hero-banner-2.webp", tag: "FREEDOM" },
            ].map((card, i) => (
              <InteractiveCard3D key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnceEarly}
                  transition={{ delay: i * 0.1, duration: 1, ease: ease.smooth }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-editorial transition-all duration-700 hover:shadow-cinematic"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                  <div className="absolute inset-x-8 bottom-8 flex flex-col items-start text-left">
                    <span className="font-mono text-[0.5rem] tracking-[0.3em] text-white/60 uppercase font-black mb-2">
                      {card.tag}
                    </span>
                    <h3 className="font-display text-2xl text-white mb-4">{card.title}</h3>
                    <div className="h-px w-0 bg-white/40 group-hover:w-full transition-all duration-700" />
                  </div>
                </motion.div>
              </InteractiveCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: MATERIAL PHILOSOPHY ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Thoughtful Material Philosophy
            </h2>
            <p className="text-[1.0625rem] text-[#7b6a5f] font-light leading-relaxed">
              Every layer is designed around comfort, movement, airflow, and long-hour wearability
              for Indian climates.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 border-y border-[#3a2a22]/10 py-12">
            {[
              "Lightweight Layering",
              "Breathable Comfort",
              "Movement First Design",
              "Soft Everyday Wear",
              "Heat Conscious Construction",
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="w-1 h-1 rounded-full bg-[#c76600]/40 mb-4 group-hover:scale-150 group-hover:bg-[#c76600] transition-all duration-500" />
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-[#3a2a22]/60 uppercase font-bold group-hover:text-[#3a2a22] transition-colors duration-500">
                  {f}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: FINAL CINEMATIC CTA ═══ */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-[#FAF7F3]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,13,0.06),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Layered Lighting */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3a2a22]/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[800px] px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.5, ease: ease.smooth }}
          >
            <h2
              className="font-display text-[#3a2a22] leading-[1.1] mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Technology Designed <br /> Around Real Life.
            </h2>
            <p className="text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed mb-12 max-w-xl mx-auto italic">
              “Built for movement, warmth, long hours, and modern Indian routines.”
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/collection"
                className="px-10 py-5 rounded-full bg-[#3a2a22] text-[#f7f3ee] font-mono text-[0.625rem] tracking-[0.25em] uppercase font-bold transition-all duration-700 hover:bg-[#4a3a32] hover:shadow-floating hover:-translate-y-1"
              >
                Explore Collection
              </Link>
              <button className="px-10 py-5 rounded-full border border-[#3a2a22]/20 bg-white/30 backdrop-blur-md text-[#3a2a22] font-mono text-[0.625rem] tracking-[0.25em] uppercase font-bold transition-all duration-700 hover:bg-white/60 hover:-translate-y-1">
                Discover The System
              </button>
            </div>
          </motion.div>
        </div>

        {/* Closing Texture Layer */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF7F3] to-transparent z-20" />
      </section>
    </div>
  );
}
