import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ease, useIsMobile } from "@/design-system";
import { useHorizontalStory } from "@/hooks/useHorizontalStory";

const supportingBlocks = [
  { n: "01", text: "Built for movement." },
  { n: "02", text: "Designed for everyday exposure." },
  { n: "03", text: "Thoughtfully engineered for continuous urban mobility." },
  { n: "04", text: "Breathable stability for long outdoor hours." },
];

const insightBlocks = [
  {
    n: "01",
    title: "Move freely.",
    desc: "Protection designed to move naturally through everyday mobility.",
  },
  {
    n: "02",
    title: "Commute comfortably.",
    desc: "Breathable stability built for long outdoor movement.",
  },
  {
    n: "03",
    title: "Stay protected.",
    desc: "Thoughtful coverage for dust, heat, UV, and exposure.",
  },
];

const PANEL_COUNT = 2;

export function EverydayInsightHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const handleChange = useCallback((index: number) => setActive(index), []);

  // Locked chapters (same as UrbanStorytelling): the section smoothly freezes at
  // full screen and each scroll slides in exactly ONE page from the right — no
  // skipping, no auto-slide, vertical scroll only on entry/exit.
  useHorizontalStory({
    sectionRef,
    trackRef: containerRef,
    slideCount: PANEL_COUNT,
    enabled: !isMobile,
    onChange: handleChange,
    mode: "lock",
  });

  // Active-page focus — opacity only. Animating `filter: blur()` on full-screen
  // panels during the scroll-driven pan was the heaviest repaint cost; removed.
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".ei-panel", section);
      panels.forEach((panel, i) => {
        gsap.to(panel, {
          opacity: i === active ? 1 : 0.4,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      const current = panels[active];
      if (current) {
        const reveals = current.querySelectorAll<HTMLElement>(".ei-reveal");
        if (reveals.length) {
          gsap.fromTo(
            reveals,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
        }
      }
    }, section);
    return () => ctx.revert();
  }, [active, isMobile]);

  return (
    <>
      <section
        ref={sectionRef}
        id="everyday-insight"
        className="relative w-full overflow-hidden min-h-screen md:h-screen bg-[#3a2a22]"
      >
        {/* ═══ Ambient warm atmosphere — static, GPU-cheap ═══ */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="ei-bg-warm absolute top-[-12%] -left-[10%] w-[52%] h-[60%] rounded-full opacity-[0.4] bg-[radial-gradient(circle_at_center,#f3e3cc,transparent_70%)] blur-[120px]" />
          <div className="ei-bg-sun absolute top-[-5%] right-[-6%] w-[42%] h-[58%] rounded-full opacity-[0.28] bg-[radial-gradient(circle_at_center,rgba(220,150,70,0.35),transparent_65%)] blur-[110px]" />
          <div className="absolute bottom-[-12%] left-[18%] w-[58%] h-[35%] rounded-full opacity-[0.2] bg-[radial-gradient(ellipse_at_center,rgba(199,102,0,0.18),transparent_70%)] blur-[100px]" />
        </div>

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:w-[200%] md:h-full items-start z-10 relative"
        >
          {/* ═══ PAGE 01 — RETHINKING PROTECTION (grounded editorial frame) ═══ */}
          <div className="ei-panel relative flex flex-col w-full md:h-full md:w-1/2 justify-center px-6 md:px-10 lg:px-16 pt-20 md:pt-20 pb-10 md:pb-12 flex-shrink-0 overflow-hidden">
            {/* Cinematic outer frame — static */}
            <div
              aria-hidden
              className="absolute inset-4 md:inset-6 rounded-[2.5rem] opacity-70 border border-[#c08b4f]/20 shadow-[0_40px_100px_-40px_rgba(58,42,34,0.22),inset_0_0_60px_rgba(243,227,204,0.08)] pointer-events-none z-0"
            />
            <div className="relative z-10 max-w-[1240px] mx-auto w-full">
              {/* — Top centered tagline + micro line — */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: ease.smooth }}
                className="flex flex-col items-center gap-2.5 mb-8 md:mb-10"
              >
                <div className="flex items-center gap-4">
                  <span className="block h-px w-10 bg-[#c08b4f]/45" />
                  <span className="font-mono text-[11px] md:text-[12px] tracking-[0.42em] uppercase text-[#c08b4f] font-medium">
                    See how protection was rethought →
                  </span>
                  <span className="block h-px w-10 bg-[#c08b4f]/45" />
                </div>
                <p className="font-display italic text-[#d9b27a]/80 text-[1rem] md:text-[1.1rem] font-light tracking-wide text-center">
                  Freedom. Ease. Thoughtful design. Everyday confidence.
                </p>
              </motion.div>

              {/* Split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center">
                {/* LEFT — content */}
                <div className="space-y-4 md:space-y-5 lg:pr-2">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: ease.smooth }}
                    className="flex items-center gap-3"
                  >
                    <span className="block h-px w-8 bg-[#c08b4f]/50" />
                    <span className="font-mono text-[11px] tracking-[0.34em] uppercase text-[#c08b4f] font-medium">
                      Everyday Protection
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.1, ease: ease.smooth }}
                    className="font-display text-[#FAF7F3] leading-[1.05] tracking-tight"
                    style={{ fontSize: "clamp(1.95rem, 3.7vw, 2.95rem)" }}
                  >
                    Everyday protection shouldn’t demand
                    <span className="block italic font-light text-[#d9b27a] mt-1">
                      everyday adjustment.
                    </span>
                  </motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.18, ease: ease.smooth }}
                    className="font-display text-white/80 italic font-light leading-[1.25] tracking-tight"
                    style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)" }}
                  >
                    Everyday protection should feel effortless.
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.26, ease: ease.smooth }}
                    className="space-y-3 text-[0.95rem] md:text-[1.0625rem] text-white/70 font-light leading-relaxed max-w-md"
                  >
                    <p className="italic text-white/75">
                      We have learned to adjust.
                      <br />
                      Pull it back. Fix it again.
                      <br />
                      Cover again.
                    </p>
                    <p>
                      Protection should move naturally with life — not demand constant
                      attention.
                    </p>
                  </motion.div>

                  {/* — 4 Supporting blocks — */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.34, ease: ease.smooth }}
                    className="pt-4 mt-1 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
                  >
                    {supportingBlocks.map((b, i) => (
                      <motion.div
                        key={b.n}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.85,
                          delay: 0.4 + i * 0.08,
                          ease: ease.smooth,
                        }}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] tracking-[0.34em] text-[#c08b4f] font-medium">
                            {b.n}
                          </span>
                          <span className="block h-px w-5 bg-[#c08b4f]/40" />
                        </div>
                        <p className="text-[12.5px] md:text-[13.5px] text-white/70 font-light leading-[1.6]">
                          {b.text}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* — Bottom editorial line — */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.5, ease: ease.smooth }}
                    className="flex items-center gap-3 pt-2"
                  >
                    <span className="block h-px w-9 bg-[#c08b4f]/45" />
                    <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-[#d9b27a] font-medium">
                      Less adjusting. More living.
                    </span>
                  </motion.div>
                </div>

                {/* RIGHT — cinematic image (kept, slightly reduced) */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.15, ease: ease.smooth }}
                  className="relative"
                >
                  <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_55%_45%,rgba(220,150,70,0.22),transparent_72%)] pointer-events-none" />
                  <div className="ei-p1-img relative aspect-[4/5] max-h-[48vh] w-full max-w-[22rem] mx-auto lg:mx-0 overflow-hidden rounded-[1.75rem] shadow-cinematic border border-[#3a2a22]/5 will-change-transform">
                    <img
                      src="/soliva-commute.webp"
                      alt="Effortless everyday protection — calm urban movement"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{
                        objectPosition: "50% 40%",
                        filter:
                          "saturate(0.86) contrast(1.04) brightness(0.95) sepia(0.07)",
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_72%_18%,rgba(245,200,130,0.28),transparent_55%)] mix-blend-screen" />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3a2a22]/30 via-transparent to-[#c08b4f]/10 mix-blend-multiply" />
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(58,42,34,0.4)_100%)]" />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none opacity-65 bg-gradient-to-t from-[#f3ecd9]/35 via-[#f3ecd9]/10 to-transparent"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══ PAGE 02 — FREEDOM & EVERYDAY LIFE (lighter, more open) ═══ */}
          <div className="ei-panel relative flex flex-col w-full md:h-full md:w-1/2 justify-center px-6 md:px-10 lg:px-16 pt-20 md:pt-20 pb-10 md:pb-12 flex-shrink-0 overflow-hidden">
            {/* Vertical divider — static */}
            <div
              aria-hidden
              className="hidden md:block absolute left-0 top-[12%] bottom-[12%] w-px opacity-70 bg-gradient-to-b from-transparent via-[#c08b4f]/40 to-transparent pointer-events-none z-20"
            />
            {/* Outer frame — static */}
            <div
              aria-hidden
              className="absolute inset-4 md:inset-8 rounded-[2.5rem] opacity-[0.55] border border-[#c08b4f]/10 pointer-events-none z-0"
            />
            {/* — Floating background type — static editorial atmosphere — */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
            >
              <span className="font-display italic text-[#FAF7F3]/[0.07] text-[22vw] leading-none tracking-tight whitespace-nowrap select-none">
                freedom
              </span>
            </div>

            {/* — Soft warm light streak — static — */}
            <div
              aria-hidden
              className="absolute top-[8%] right-[6%] w-[36%] h-[40%] opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(245,205,140,0.18), transparent 75%)",
              }}
            />

            <div className="max-w-[1360px] mx-auto w-full relative z-10 flex flex-col md:h-full md:justify-center gap-5 md:gap-6">
              {/* ── HEADER ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: ease.smooth }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="block h-px w-10 bg-[#c08b4f]/50" />
                  <span className="font-mono text-[11px] md:text-[12px] tracking-[0.42em] uppercase text-[#c08b4f] font-medium">
                    Built for Movement
                  </span>
                  <span className="block h-px w-10 bg-[#c08b4f]/50" />
                </div>
                <h2
                  className="font-display text-[#FAF7F3] leading-[1.08] tracking-tight max-w-3xl"
                  style={{ fontSize: "clamp(1.55rem, 2.8vw, 2.35rem)" }}
                >
                  Built for movement.
                  <span className="block italic font-light text-[#d9b27a] mt-1">
                    Designed for everyday exposure.
                  </span>
                </h2>
                <p className="mt-3 text-[13px] md:text-[14.5px] text-white/70 font-light leading-relaxed max-w-2xl">
                  Thoughtfully designed full face, neck, and back coverage for everyday
                  commuting, work, college, travel, and long outdoor hours.
                </p>
              </motion.div>

              {/* ── MAIN ROW — cards | centered image | cards ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr_1fr] gap-5 lg:gap-7 items-stretch">
                {/* LEFT — Cards 01 + 02 */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                  className="flex flex-col gap-4 justify-center"
                >
                  {insightBlocks.slice(0, 2).map((b) => (
                    <motion.div
                      key={b.n}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 1.0, ease: ease.smooth }}
                      className="group relative bg-white/15 border border-[#c08b4f]/15 px-5 py-4 rounded-[1rem] shadow-[0_8px_28px_rgba(58,42,34,0.04)] transition-[box-shadow,background,border-color,transform] duration-700 hover:bg-white/25 hover:border-[#c08b4f]/30 hover:shadow-[0_18px_45px_rgba(58,42,34,0.10)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="font-mono text-[11px] tracking-[0.34em] text-[#c08b4f] font-medium">
                          {b.n}
                        </span>
                        <span className="block h-px w-6 bg-[#c08b4f]/40 group-hover:w-10 group-hover:bg-[#c08b4f]/70 transition-all duration-700" />
                      </div>
                      <h3 className="font-display text-[1.05rem] md:text-[1.15rem] text-[#FAF7F3] tracking-tight mb-1 leading-snug group-hover:text-[#d9b27a] transition-colors duration-700">
                        {b.title}
                      </h3>
                      <p className="text-[12.5px] md:text-[13px] text-white/70 font-light leading-relaxed">
                        {b.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CENTER — Hero image (compressed, soft-framed) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: ease.smooth }}
                  className="relative flex items-center justify-center"
                >
                  {/* Warm atmospheric wash behind */}
                  <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_55%_45%,rgba(220,150,70,0.28),transparent_72%)] pointer-events-none" />

                  <div className="relative aspect-[3/4] w-full max-w-[20rem] mx-auto rounded-[1.75rem] overflow-hidden border border-[#c08b4f]/20 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
                    <img
                      src="/soliva-freedom.webp"
                      alt="Soliva — protection that moves effortlessly with everyday life"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{
                        objectPosition: "50% 35%",
                        filter:
                          "saturate(0.88) contrast(1.05) brightness(0.94) sepia(0.06)",
                      }}
                    />
                    {/* warm sunlight glow */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_72%_18%,rgba(245,200,130,0.25),transparent_55%)] mix-blend-screen" />
                    {/* tonal grade */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3a2a22]/35 via-transparent to-[#c08b4f]/10 mix-blend-multiply" />
                    {/* bottom fade into section */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-[#3a2a22] via-[#3a2a22]/40 to-transparent" />
                    {/* vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.4)_100%)]" />
                  </div>

                  {/* Image caption */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 whitespace-nowrap">
                    <span className="block h-px w-6 bg-[#c08b4f]/45" />
                    <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#d9b27a]/85 font-medium">
                      Less adjusting · More living
                    </span>
                    <span className="block h-px w-6 bg-[#c08b4f]/45" />
                  </div>
                </motion.div>

                {/* RIGHT — Card 03 + Kids */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
                  className="flex flex-col gap-4 justify-center"
                >
                  {/* Card 03 */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 1.0, ease: ease.smooth }}
                    className="group relative bg-white/15 border border-[#c08b4f]/15 px-5 py-4 rounded-[1rem] shadow-[0_8px_28px_rgba(58,42,34,0.04)] transition-[box-shadow,background,border-color,transform] duration-700 hover:bg-white/25 hover:border-[#c08b4f]/30 hover:shadow-[0_18px_45px_rgba(58,42,34,0.10)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="font-mono text-[11px] tracking-[0.34em] text-[#c08b4f] font-medium">
                        {insightBlocks[2].n}
                      </span>
                      <span className="block h-px w-6 bg-[#c08b4f]/40 group-hover:w-10 group-hover:bg-[#c08b4f]/70 transition-all duration-700" />
                    </div>
                    <h3 className="font-display text-[1.05rem] md:text-[1.15rem] text-[#FAF7F3] tracking-tight mb-1 leading-snug group-hover:text-[#d9b27a] transition-colors duration-700">
                      {insightBlocks[2].title}
                    </h3>
                    <p className="text-[12.5px] md:text-[13px] text-white/70 font-light leading-relaxed">
                      {insightBlocks[2].desc}
                    </p>
                  </motion.div>

                  {/* Kids card */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 1.0, ease: ease.smooth }}
                    className="group relative bg-white/15 border border-[#c08b4f]/15 px-5 py-4 rounded-[1rem] shadow-[0_8px_28px_rgba(58,42,34,0.04)] transition-[box-shadow,background,border-color,transform] duration-700 hover:bg-white/25 hover:border-[#c08b4f]/30 hover:shadow-[0_18px_45px_rgba(58,42,34,0.10)] hover:-translate-y-0.5"
                  >
                    <div
                      aria-hidden
                      className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#d9b27a] to-[#a3743f] shadow-[0_0_14px_rgba(199,128,52,0.4)]"
                    />
                    <span className="font-mono text-[11px] tracking-[0.34em] text-[#c08b4f] uppercase font-medium block mb-2">
                      For Little Explorers
                    </span>
                    <h4 className="font-display text-[1.05rem] md:text-[1.15rem] text-[#FAF7F3] tracking-tight leading-snug mb-1.5">
                      Designed for{" "}
                      <span className="italic font-light text-[#d9b27a]">
                        little explorers
                      </span>{" "}
                      too.
                    </h4>
                    <p className="text-[12px] md:text-[12.5px] text-white/65 italic font-light leading-relaxed">
                      School rides. Family outings. Outdoor adventures.
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* ── FOOTER — Freedom punchline ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: ease.smooth }}
                className="text-center mt-2"
              >
                <div className="flex items-center justify-center gap-3 mb-2.5">
                  <span className="block h-px w-10 bg-[#c08b4f]/40" />
                  <span className="font-mono text-[11px] tracking-[0.42em] uppercase text-[#c08b4f]">
                    Freedom
                  </span>
                  <span className="block h-px w-10 bg-[#c08b4f]/40" />
                </div>
                <h3
                  className="font-display text-[#FAF7F3] leading-[1.1] tracking-tight max-w-3xl mx-auto"
                  style={{ fontSize: "clamp(1.45rem, 2.9vw, 2.25rem)" }}
                >
                  Freedom feels different when
                  <span className="block italic font-light text-[#d9b27a] mt-0.5">
                    protection works effortlessly.
                  </span>
                </h3>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
