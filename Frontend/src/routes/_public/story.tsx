import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease, useIsMobile } from "@/design-system";
import { ChevronRight, Sun, Wind, Shield, Users, Clock, Zap, MapPin } from "lucide-react";
import { AtmosphericEngine, InteractiveCard3D } from "@/components/AtmosphericEngine";

export const Route = createFileRoute("/_public/story")({
  component: StoryRoute,
});

function StoryRoute() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAF7F3] overflow-x-hidden">
      {/* Optimized 3D Atmospheric Layer */}
      <AtmosphericEngine type="story" className="opacity-40" />

      {/* ═══ SECTION 1: STORY HERO ═══ */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(243,236,226,0.6),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            {/* Sunlight Glows with Parallax - Simplified */}
            <motion.div
              animate={{
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[30%] w-[800px] h-[800px] rounded-full bg-[#fce7d2]/20 blur-[100px]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6 block">
              THE STORY
            </span>
            <h1
              className="font-display text-[#3a2a22] leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
            >
              Engineered In <span className="italic text-[#c76600]/80">India.</span>
            </h1>
            <p className="max-w-xl mx-auto text-[1.0625rem] sm:text-[1.25rem] text-[#7b6a5f] font-light leading-relaxed mb-12">
              The making of Soliva — calibrated for the streets it was built for.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="h-12 w-px bg-gradient-to-b from-[#c76600]/40 to-transparent" />
            </motion.div>{" "}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 2: FOUNDER COMMUTE STORY ═══ */}
      <section className="relative pt-10 pb-[70px] sm:pt-12 sm:pb-[90px] md:pt-16 md:pb-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            {/* LEFT: Cinematic Visual with 3D Tilt Removed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-editorial border border-[#3a2a22]/5 bg-white flex items-center justify-center p-20"
            >
              <img
                src="/logo-new.png"
                alt="Soliva Logo"
                className="w-full h-auto object-contain opacity-90 brightness-[0.98]"
              />
            </motion.div>

            {/* RIGHT: Editorial Content */}
            <div className="flex flex-col text-left pt-8">
              <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6">
                THE GENESIS
              </span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-10"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                “I came back from the UK <br /> to 47°C Nagpur summers.”
              </h2>

              <div className="space-y-8 text-[1rem] sm:text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed max-w-lg">
                <p>
                  Returning to central India after years in the UK was a sensory shock. Not just the
                  heat, but the realization of how we move through it.
                </p>
                <p>
                  I was riding a scooter through the peak of May, draped in a thin cotton scarf that
                  kept slipping, trapped heat, and left gaps of exposed skin that burned within
                  minutes.
                </p>
                <div className="pl-6 border-l-2 border-[#c76600]/30 italic text-[#3a2a22] font-medium">
                  "I was solving a practical problem with a piece of cloth that was never designed
                  to solve it."
                </div>
                <p>
                  It wasn't just me. Thousands of riders around me were performing this daily ritual
                  of improvised protection—adjusting, tucking, and struggling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: THE OBSERVATION (Editorial Composition) ═══ */}
      <section className="relative py-24 md:py-32 bg-luxury-beige/20 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          {/* Section Header: Luxury Typography */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-mono text-[0.625rem] tracking-[0.5em] text-[#c76600] uppercase font-black mb-8 block"
            >
              THE OBSERVATION
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-[#3a2a22] tracking-tight leading-[1.05] uppercase"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Once you notice it, <br />
              <span className="italic font-light text-[#c76600]/90">you see it everywhere.</span>
            </motion.h2>
          </div>

          {/* Master Composition Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* LEFT BLOCK: Dominant Visual (7/12) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnceEarly}
              transition={{ duration: 1.2, ease: ease.smooth }}
              className="lg:col-span-7 relative min-h-[400px] lg:min-h-[500px] aspect-[4/5] lg:aspect-auto rounded-[3.5rem] overflow-hidden shadow-editorial border border-[#3a2a22]/5"
            >
              <img
                src="/2.webp"
                className="w-full h-full object-cover grayscale-[0.1] contrast-[1.02] hover:scale-105 transition-transform duration-[3000ms]"
                alt="Commute Frustration"
              />
              <div className="absolute inset-0 bg-[#3a2a22]/5 mix-blend-multiply pointer-events-none" />
              <div className="absolute bottom-10 left-10">
                <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/70 uppercase font-black px-4 py-2 bg-black/20 backdrop-blur-md rounded-full">
                  Archive: Exposure 01
                </span>
              </div>
            </motion.div>

            {/* RIGHT BLOCK: Editorial Cards (5/12) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                className="flex-1 bg-white/60 backdrop-blur-xl p-10 xl:p-14 rounded-[3.5rem] border border-[#3a2a22]/5 flex flex-col justify-center relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(245,130,13,0.03),transparent_70%)]" />
                <div className="w-10 h-px bg-[#c76600]/40 mb-10 group-hover:w-16 transition-all duration-700" />
                <p className="text-[1.125rem] md:text-[1.35rem] text-[#3a2a22] font-light leading-relaxed">
                  Daily commuting in India is a test of endurance. Between the dust, the exhaust,
                  and the relentless sun, we've settled for{" "}
                  <span className="text-[#c76600] font-medium italic">"good enough"</span> for too
                  long.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.1 }}
                className="flex-1 bg-[#f3ece2]/40 p-10 xl:p-14 rounded-[3.5rem] border border-[#3a2a22]/5 flex flex-col justify-center"
              >
                <p className="text-[1.0625rem] text-[#7b6a5f] font-light leading-relaxed italic border-l-2 border-[#c76600]/20 pl-10">
                  "Traditional solutions were built for static shade, not for 60kmph motion."
                </p>
              </motion.div>
            </div>
          </div>

          {/* Composition Baseline */}
          <div className="mt-20 flex items-center justify-between px-10 opacity-20">
            <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase font-black">
              SS/26 Documentation
            </span>
            <div className="flex-1 h-px bg-[#3a2a22]/20 mx-12" />
            <span className="font-mono text-[0.5rem] tracking-[0.5em] uppercase font-black">
              Archive Series
            </span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: THE THREE GAPS ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 text-left">
            <div className="max-w-2xl">
              <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-4 block">
                THE PROBLEM
              </span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Three gaps. No products.
              </h2>
            </div>
            <p className="text-[0.9375rem] text-[#7b6a5f] font-light max-w-sm">
              We identified three core groups whose daily movement was completely overlooked by
              existing brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Women commuters",
                desc: "Relying on dupattas and stoles that don't breathe and won't stay put at speed.",
                icon: Shield,
                tag: "DAILY RIDERS",
              },
              {
                title: "Children who resist",
                desc: "Traditional masks and wraps are itchy and claustrophobic. They need something they'll actually wear.",
                icon: Users,
                tag: "SCHOOL COMMUTES",
              },
              {
                title: "Men with no options",
                desc: "Either heavy biker gear or nothing. There was no middle ground for the everyday city rider.",
                icon: Wind,
                tag: "URBAN MOVEMENT",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.1, duration: 1, ease: ease.smooth }}
                className="group relative bg-white border border-[#3a2a22]/5 rounded-[2.5rem] p-10 transition-all duration-700 hover:shadow-editorial hover:-translate-y-2 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5820d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#3a2a22]/5 flex items-center justify-center mb-8 group-hover:bg-[#c76600]/10 transition-colors duration-500">
                    <card.icon size={24} className="text-[#3a2a22]/40 group-hover:text-[#c76600]" />
                  </div>
                  <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#c76600] uppercase font-black mb-2">
                    {card.tag}
                  </span>
                  <h3 className="font-display text-2xl text-[#3a2a22] mb-4">{card.title}</h3>
                  <p className="text-[0.875rem] text-[#7b6a5f] font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: THE REALITY OF INDIAN SUMMERS (Optimized) ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px] bg-[#3a2a22] overflow-hidden">
        {/* Lightweight Static Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,13,0.04),transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display text-white tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The sun doesn’t care <br /> how short your commute is.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT: Simplified Image Block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
            >
              <img
                src="/DSC05476.JPG"
                className="w-full h-full object-cover brightness-[0.9] contrast-[1.1]"
                alt="Harsh Sun Reality"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/40 to-transparent pointer-events-none" />
            </motion.div>

            {/* RIGHT: Optimized Info Blocks */}
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  title: "Hidden Exposure Zones",
                  desc: "Most products leave gaps at the neck and wrists. We designed for zero-gap protection.",
                },
                {
                  title: "Heat Build-Up",
                  desc: "Traditional fabrics trap heat against the skin. Our architecture creates an active air gap.",
                },
                {
                  title: "Dust & Pollution",
                  desc: "Urban movement is more than just sun. It's about a breathable shield against the city.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnceEarly}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="flex gap-6"
                >
                  <div className="w-8 h-px bg-white/20 mt-4 shrink-0" />
                  <div>
                    <h4 className="font-display text-xl text-white mb-2">{item.title}</h4>
                    <p className="text-[0.875rem] text-white/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: WHY EXISTING SOLUTIONS FAIL ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="mb-16"
          >
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-4 block text-center">
              COMPARISON
            </span>
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Everyday habits were never <br /> engineered for everyday exposure.
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {[
              {
                type: "Dupattas & Stoles",
                failure:
                  "Trap heat, require constant manual adjustment, and don't provide calibrated UV blocking.",
              },
              {
                type: "Sunscreen Alone",
                failure:
                  "Wear off with sweat, difficult to reapply during commutes, and provides zero physical shielding.",
              },
              {
                type: "Heavy Biker Gear",
                failure:
                  "Overkill for city routines. Too hot, too bulky, and socially out of place at the office or cafe.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-6 md:gap-16 border-b border-[#3a2a22]/5 pb-12 last:border-0"
              >
                <div className="w-full md:w-1/3 text-left">
                  <h4 className="font-display text-2xl text-[#3a2a22]">{item.type}</h4>
                </div>
                <div className="w-full md:w-2/3 text-left">
                  <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-relaxed">
                    {item.failure}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: THE SOLIVA PHILOSOPHY ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px] bg-white/40">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 text-center">
          <div className="max-w-4xl mx-auto mb-20">
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6 block">
              OUR CORE
            </span>
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Thoughtful protection <br /> for everyday life.
            </h2>
            <p className="text-[1.125rem] text-[#7b6a5f] font-light italic leading-relaxed">
              “We don't build accessories. We build movement-ready protection systems.”
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
            {[
              "Designed For India",
              "Built Around Movement",
              "Everyday Wearability",
              "Breathable Comfort",
              "Thoughtful Protection",
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#c76600]/40 mb-4 group-hover:scale-150 group-hover:bg-[#c76600] transition-all duration-500" />
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-[#3a2a22] uppercase font-bold">
                  {p}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FUTURE VISION ═══ */}
      <section className="relative py-[70px] sm:py-[90px] md:py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="text-left mb-16">
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-4 block">
              ROADMAP
            </span>
            <h2
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              One product today. <br /> A complete protection system tomorrow.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              { time: "NOW", title: "Guard Riding Sleeve", color: "bg-[#3a2a22]/5" },
              { time: "MONSOON '25", title: "Guard Neck & Face Shield", color: "bg-[#f3ece2]" },
              { time: "2025", title: "Guard Kids Collection", color: "bg-[#f3ece2]/60" },
              { time: "2025–26", title: "Guard Men’s Line", color: "bg-[#f3ece2]/40" },
              { time: "VISION", title: "The Complete Soliva System", color: "bg-[#c76600]/10" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className={`relative p-8 rounded-[2rem] border border-[#3a2a22]/5 flex flex-col justify-between aspect-[3/4] ${step.color} transition-transform duration-500 hover:-translate-y-2 h-full`}
              >
                <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#c76600] uppercase font-black">
                  {step.time}
                </span>
                <h4 className="font-display text-xl text-[#3a2a22] leading-tight">{step.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FINAL EMOTIONAL CLOSING ═══ */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[#FAF7F3]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,13,0.06),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        <div className="relative z-10 mx-auto max-w-[1000px] px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2
              className="font-display text-[#3a2a22] leading-[1.1] mb-8"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
            >
              This started as one person’s frustration <br /> on a scooter in Nagpur.
            </h2>
            <p className="text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed mb-12 max-w-2xl mx-auto italic">
              “It’s becoming a protection system for every rider on two wheels across India.”
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/collection"
                className="px-10 py-5 rounded-full bg-[#3a2a22] text-[#f7f3ee] font-mono text-[0.625rem] tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:bg-[#4a3a32] hover:shadow-floating hover:-translate-y-1"
              >
                Explore Collection
              </Link>
              <Link
                to="/technology"
                className="px-10 py-5 rounded-full border border-[#3a2a22]/20 bg-white/30 backdrop-blur-md text-[#3a2a22] font-mono text-[0.625rem] tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:bg-white/60 hover:-translate-y-1"
              >
                Read Technology
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Orbs - Simplified */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-[#f5820d]/5 blur-[80px]" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-[#3a2a22]/5 blur-[100px]" />

        {/* Separation from footer */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF7F3] to-transparent z-20" />
      </section>
    </div>
  );
}
