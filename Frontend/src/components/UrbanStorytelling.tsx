import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ease, useIsMobile } from "@/design-system";
import { useHorizontalStory } from "@/hooks/useHorizontalStory";

const exposureCards = [
  {
    id: 1,
    title: "Hidden Exposure Zones",
    desc: "Neck, ears, side profile, and movement zones frequently remain uncovered.",
    micro: "Small gaps create everyday exposure.",
    image: "/incompelete-protection.webp",
  },
  {
    id: 2,
    title: "Constant Adjustment",
    desc: "Loose coverings shift with movement, creating exposed areas during commuting.",
    micro: "Adjustment isn’t protection.",
    image: "/constant-slipping.webp",
  },
  {
    id: 3,
    title: "Trapped Heat",
    desc: "Heavy coverings and poor airflow can make long outdoor hours uncomfortable.",
    micro: "Protection should feel wearable.",
    image: "/heate-sufacation.webp",
  },
  {
    id: 4,
    title: "Dust & Pollution",
    desc: "Dust, pollution, and environmental particles become part of everyday commute.",
    micro: "Daily exposure adds up.",
    image: "/dust.webp",
  },
  {
    id: 5,
    title: "UV Exposure",
    desc: "Harmful UV exposure continues during everyday movement — even short commutes.",
    micro: "Coverage doesn’t always mean protection.",
    image: "/sun.webp",
  },
];

/* Particles drift slowly — cinematic dust */
const particles = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${(i * 53) % 100}%`,
  top: `${(i * 37 + 11) % 100}%`,
  size: 2 + ((i * 7) % 5),
  delay: (i % 7) * 0.8,
  duration: 18 + ((i * 3) % 10),
  drift: ((i % 2 === 0) ? 24 : -24),
}));


const PANEL_COUNT = 4;

export function UrbanStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const handleChange = useCallback((index: number) => setActive(index), []);

  // Smooth, scroll-tied horizontal pan — panels pan as the user scrolls and
  // settle gently on each one.
  useHorizontalStory({
    sectionRef,
    trackRef: containerRef,
    slideCount: PANEL_COUNT,
    enabled: !isMobile,
    onChange: handleChange,
  });

  // Active-slide focus: the current panel is fully lit; neighbours sit back in a
  // dimmed, inactive state, and the active panel's content lifts in.
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".u-panel", section);
      panels.forEach((panel, i) => {
        gsap.to(panel, {
          opacity: i === active ? 1 : 0.35,
          filter: i === active ? "blur(0px)" : "blur(2px)",
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      const current = panels[active];
      if (current) {
        const reveals = current.querySelectorAll<HTMLElement>(".u-reveal");
        if (reveals.length) {
          gsap.fromTo(
            reveals,
            { opacity: 0, filter: "blur(6px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
        }
      }
    }, section);
    return () => ctx.revert();
  }, [active, isMobile]);

  // 3D mouse-tilt for cards — restrained luxury hover
  const handleCardMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const handleCardLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="urban-storytelling"
        className="relative bg-[#3a2a22] w-full z-10 overflow-hidden min-h-screen md:h-screen"
      >
        {/* ═══ AMBIENT ATMOSPHERE — warm haze + sunlight ═══ */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Soft cream wash */}
          <motion.div
            animate={{ opacity: [0.32, 0.42, 0.32] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="u-bg-warm absolute top-[-12%] -left-[10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle_at_center,#f3e3cc,transparent_70%)] blur-[120px]"
          />
          {/* Warm sunlight penetration */}
          <motion.div
            animate={{ opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="u-bg-sun absolute top-[-5%] right-[-8%] w-[42%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,150,70,0.35),transparent_65%)] blur-[110px]"
          />
          {/* Lower environmental haze */}
          <motion.div
            animate={{ opacity: [0.15, 0.22, 0.15] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 7 }}
            className="absolute bottom-[-12%] left-[20%] w-[60%] h-[35%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(199,102,0,0.18),transparent_70%)] blur-[100px]"
          />
          {/* Subtle film grain */}
          <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:w-[400%] md:h-full items-start z-10 relative"
        >
          {/* ═══ PANEL 1 — HERO IDENTITY + PROBLEM STORY ═══ */}
          <div className="u-panel relative flex flex-col w-full md:h-full md:w-1/4 justify-start px-6 md:px-10 lg:px-16 pt-[84px] md:pt-[92px] pb-8 md:pb-6 flex-shrink-0 overflow-hidden">
            {/* Cinematic floating dust particles (panel-local) */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute rounded-full bg-[#c79661]"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: [0, 0.35, 0],
                    x: [0, p.drift, 0],
                    y: [0, -18, 0],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: p.delay,
                  }}
                />
              ))}
            </div>

            <div className="u-hero-stack max-w-[1280px] mx-auto w-full flex flex-col items-center relative z-10 will-change-transform">
              {/* ── Eyebrow ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: ease.smooth }}
                className="flex items-center gap-3 mb-4 md:mb-5"
              >
                <span className="block h-px w-10 bg-[#c08b4f]/50" />
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.34em] text-[#c08b4f] uppercase font-medium">
                  Everyday Exposure
                </span>
                <span className="block h-px w-10 bg-[#c08b4f]/50" />
              </motion.div>

              {/* ── Heading ── */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.1, ease: ease.smooth }}
                className="font-display text-[#FAF7F3] leading-[1.08] tracking-tight text-center max-w-3xl"
                style={{ fontSize: "clamp(1.4rem, 2.9vw, 2.375rem)" }}
              >
                Everyday exposure doesn’t feel harmful.
                <span className="block italic font-light text-[#d9b27a] mt-1">
                  Until it becomes everyday.
                </span>
              </motion.h2>

              {/* ── Subtext ── */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.2, ease: ease.smooth }}
                className="mt-3 md:mt-4 text-[0.8125rem] md:text-[0.875rem] text-white/60 font-light leading-relaxed text-center max-w-xl px-4"
              >
                Daily commuting quietly exposes people to environmental stress — often
                while feeling “covered.”
              </motion.p>

              {/* ── Refined editorial divider ── */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.6 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: ease.smooth }}
                className="mt-5 mb-5 md:mt-6 md:mb-6 h-px w-20 bg-gradient-to-r from-transparent via-white/25 to-transparent origin-center"
              />

              {/* ── 5 PROBLEM CARDS ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-3.5 w-full max-w-[1240px] mx-auto px-2"
              >
                {exposureCards.map((card, i) => (
                  <motion.article
                    key={card.id}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 1.05, ease: ease.smooth }}
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                    className={`u-card group relative bg-white/15 border border-[#c08b4f]/15 p-3 md:p-3.5 rounded-[1rem] backdrop-blur-[3px] shadow-[0_8px_28px_rgba(58,42,34,0.04)] transition-[box-shadow,background,border-color,transform] duration-700 hover:bg-white/25 hover:shadow-[0_18px_45px_rgba(58,42,34,0.12)] hover:border-[#c08b4f]/35 hover:-translate-y-0.5 ${
                      i === 4
                        ? "sm:col-span-2 sm:max-w-[calc(50%-0.4375rem)] sm:mx-auto sm:w-full lg:col-span-1 lg:max-w-none"
                        : ""
                    }`}
                  >
                    {/* Mouse-tracked sheen */}
                    <span className="u-card-sheen absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    {/* Top hairline */}
                    <span className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#c08b4f]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="aspect-[4/5] rounded-[0.75rem] overflow-hidden mb-2.5 border border-[#3a2a22]/6 bg-[#3a2a22]/5 relative">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale-[0.25] brightness-[0.92] transition-transform duration-[2400ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-100"
                      />
                      {/* warm cinematic overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/40 via-transparent to-transparent pointer-events-none opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
                      {/* Index badge */}
                      <span className="absolute top-2 right-2 font-mono text-[8.5px] tracking-[0.22em] uppercase font-semibold text-[#f3dbab]/90 bg-[#3a2a22]/35 backdrop-blur-sm px-1.5 py-0.5 rounded">
                        0{card.id}
                      </span>
                    </div>

                    <h3 className="font-display text-[0.875rem] md:text-[0.9375rem] text-[#FAF7F3] tracking-tight leading-snug mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-[10.5px] md:text-[11px] text-white/60 font-light leading-relaxed mb-2.5">
                      {card.desc}
                    </p>
                    <div className="border-t border-white/15 pt-2">
                      <span className="font-mono text-[8.5px] tracking-[0.18em] text-[#c76600] uppercase font-semibold italic block">
                        {card.micro}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {/* ── Closing editorial line ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.4, ease: ease.smooth }}
                className="mt-6 md:mt-8 flex items-center gap-4 justify-center px-4 text-center"
              >
                <span className="hidden sm:block h-px w-10 bg-[#c08b4f]/40" />
                <span className="font-mono text-[10px] md:text-[10.5px] tracking-[0.26em] text-[#d9b27a] uppercase font-medium italic leading-[1.7]">
                  Everyday habits were never engineered for everyday exposure.
                </span>
                <span className="hidden sm:block h-px w-10 bg-[#c08b4f]/40" />
              </motion.div>
            </div>
          </div>

          {/* ═══ PANEL 2: SECTION 3 — BRAND INSIGHT ═══ */}
          <div className="u-panel relative flex flex-col w-full md:h-full md:w-1/4 justify-center px-8 md:px-12 lg:px-20 flex-shrink-0 bg-[#3a2a22] overflow-hidden">
            {/* Cinematic gradient divider — replaces hard border */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute left-0 top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-[#c08b4f]/45 to-transparent pointer-events-none z-30"
            />
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.03),transparent_60%)]" />
              <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

              {/* Soft warm haze drift — barely there, very slow */}
              <motion.div
                animate={{ x: ["-6%", "4%", "-6%"], opacity: [0.55, 0.85, 0.55] }}
                transition={{ duration: 64, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[6%] -left-[6%] w-[68%] h-[72%] will-change-transform"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 40% 50%, rgba(199,128,52,0.16), rgba(199,128,52,0.05) 50%, transparent 78%)",
                }}
              />

              {/* Counter-drifting cooler haze — opposite direction */}
              <motion.div
                animate={{ x: ["4%", "-6%", "4%"], opacity: [0.45, 0.75, 0.45] }}
                transition={{
                  duration: 86,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 14,
                }}
                className="absolute bottom-[4%] -right-[6%] w-[58%] h-[60%] will-change-transform"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 60% 45%, rgba(245,205,140,0.12), rgba(245,205,140,0.03) 55%, transparent 80%)",
                }}
              />
            </div>

            <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center relative z-10">
              <div className="u-reveal u-p2-reveal">
                <div className="flex items-center gap-3 mb-5">
                  <span className="block h-px w-10 bg-[#c08b4f]/50" />
                  <span className="font-mono text-[10px] tracking-[0.34em] text-[#c08b4f] uppercase font-medium">
                    Everyday Exposure
                  </span>
                </div>
                <h2
                  className="font-display text-[#FAF7F3] leading-[1.08] tracking-tight mb-6 text-left"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  Everyday exposure doesn’t feel harmful.
                  <span className="block italic font-light text-[#d9b27a] mt-1">
                    Until it becomes everyday.
                  </span>
                </h2>
                <div className="space-y-4 text-[0.9375rem] md:text-[1rem] text-white/65 font-light leading-relaxed text-left max-w-xl">
                  <p>
                    Daily commuting quietly exposes people to dust, pollution, UV, trapped
                    heat, and environmental friction — often while feeling “covered.” What
                    feels normal over time slowly becomes constant exposure.
                  </p>
                  <p>
                    Most traditional protection was designed for occasional use, static
                    environments, or temporary coverage — not the reality of long urban
                    movement, traffic, heat, and continuous outdoor mobility.
                  </p>
                  <p>
                    The discomfort rarely arrives all at once. It builds gradually through
                    repetition, routine, and everyday environmental stress.
                  </p>
                </div>
              </div>

              {/* Cinematic storytelling image — softly blended, no hard card */}
              <div className="u-reveal u-p2-reveal relative">
                {/* Warm atmospheric wash behind the image */}
                <div className="absolute -inset-14 bg-[radial-gradient(ellipse_at_50%_40%,rgba(199,128,52,0.22),transparent_72%)] blur-3xl pointer-events-none" />

                <div
                  className="u-p2-image-wrap relative aspect-[4/5] max-h-[68vh] w-full mx-auto overflow-hidden"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(ellipse 95% 95% at 50% 48%, black 55%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                    maskImage:
                      "radial-gradient(ellipse 95% 95% at 50% 48%, black 55%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                  }}
                >
                  <img
                    src="/constant-slipping.webp"
                    alt="Woman adjusting scarf during everyday movement — Indian urban exposure"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="u-p2-img absolute inset-0 w-full h-full object-cover select-none will-change-transform"
                    style={{
                      objectPosition: "52% 32%",
                      filter:
                        "saturate(0.82) contrast(1.06) brightness(0.88) sepia(0.10)",
                    }}
                  />
                  {/* Warm cinematic grade */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3a2a22]/45 via-transparent to-[#c08b4f]/14 mix-blend-multiply" />
                  {/* Bottom shadow fade */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none bg-gradient-to-t from-[#3a2a22] via-[#3a2a22]/55 to-transparent" />
                  {/* Top soft fade */}
                  <div className="absolute inset-x-0 top-0 h-1/4 pointer-events-none bg-gradient-to-b from-[#3a2a22]/55 to-transparent" />
                  {/* Subtle dust / film grain */}
                  <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                  {/* Whisper-soft warm vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(58,42,34,0.55)_100%)]" />
                </div>

                {/* Editorial caption */}
                <div className="mt-6 flex items-start gap-3 max-w-[26rem] mx-auto">
                  <span className="mt-2 block h-px w-7 bg-[#c08b4f]/45 flex-shrink-0" />
                  <p className="font-mono text-[10px] md:text-[10.5px] tracking-[0.18em] uppercase text-white/45 leading-[1.7]">
                    Exposure builds quietly.{" "}
                    <span className="text-[#d9b27a]/80 normal-case italic tracking-normal">
                      Protection should too.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 3: SECTION 6 — MOVEMENT STORY ═══ */}
          <div className="u-panel relative flex flex-col w-full md:h-full md:w-1/4 justify-center px-8 md:px-12 lg:px-20 flex-shrink-0">
            {/* Cinematic gradient divider */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="hidden md:block absolute left-0 top-[14%] bottom-[14%] w-px bg-gradient-to-b from-transparent via-[#c08b4f]/35 to-transparent pointer-events-none z-30"
            />
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="u-reveal u-p3-reveal lg:w-1/2">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="block h-px w-10 bg-[#c08b4f]/50" />
                    <span className="font-mono text-[10px] tracking-[0.34em] text-[#c08b4f] uppercase font-medium">
                      Adapted Discomfort
                    </span>
                  </div>
                  <h2
                    className="font-display text-[#FAF7F3] leading-[1.1] tracking-tight mb-4"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                  >
                    Protection became routine.
                    <span className="block italic font-light text-[#d9b27a] mt-1">
                      But never intentional.
                    </span>
                  </h2>
                  <div className="space-y-3 text-[0.9375rem] text-white/60 font-light leading-relaxed max-w-md">
                    <p>
                      For years, people adapted around discomfort instead of solving it —
                      adjusting scarves during movement, layering fabrics in heat, and
                      managing exposure through improvised daily habits.
                    </p>
                    <p>
                      Most coverings shifted during motion, trapped airflow, increased
                      fatigue, or created small exposure gaps around the neck, jawline,
                      and face during long commutes.
                    </p>
                    <p>
                      What became common was never actually designed for movement. It
                      simply became normalized through repetition and necessity.
                    </p>
                  </div>
                  {/* Editorial closing line */}
                  <div className="mt-6 flex items-start gap-3 max-w-md">
                    <span className="mt-2 block h-px w-7 bg-[#c08b4f]/45 flex-shrink-0" />
                    <p className="font-mono text-[10px] md:text-[10.5px] tracking-[0.18em] uppercase text-[#FAF7F3]/55 leading-[1.7]">
                      We adapted to discomfort{" "}
                      <span className="text-[#d9b27a] normal-case italic tracking-normal">
                        for too long.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="u-reveal u-p3-reveal lg:w-1/2 aspect-[4/5] max-h-[64vh] rounded-[2rem] overflow-hidden shadow-cinematic border border-[#3a2a22]/5 relative">
                  <img
                    src="/soliva-adapted-discomfort.webp"
                    className="u-p3-img w-full h-full object-cover will-change-transform"
                    alt="Adapted Discomfort — improvised everyday protection"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 4: SECTION 7 — REAL WORLD UTILITY ═══ */}
          <div className="u-panel relative flex flex-col w-full md:h-full md:w-1/4 justify-center px-8 md:px-12 lg:px-24 bg-[#3a2a22] overflow-hidden flex-shrink-0">
            {/* Cinematic gradient divider */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              className="hidden md:block absolute left-0 top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-[#c08b4f]/45 to-transparent pointer-events-none z-30"
            />
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_60%)]" />
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>

            <div className="max-w-[1400px] mx-auto w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                <div className="flex flex-col gap-10">
                  <div className="u-reveal u-p4-reveal max-w-4xl text-left">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="block h-px w-10 bg-[#c08b4f]/50" />
                        <span className="font-mono text-[10px] tracking-[0.34em] text-[#c08b4f] uppercase font-medium">
                          Built for Movement
                        </span>
                      </div>
                      <h2
                        className="font-display text-[#FAF7F3] leading-[1.05] tracking-tight"
                        style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
                      >
                        Protection should move
                        <span className="block italic font-light text-[#d9b27a]">
                          with everyday life.
                        </span>
                      </h2>
                      <div className="space-y-3 text-[0.9375rem] md:text-[1rem] text-white/60 font-light leading-relaxed max-w-xl">
                        <p>
                          Soliva was designed around the reality of constant movement —
                          long commutes, crowded roads, heat, dust, pollution, sunlight,
                          and extended outdoor exposure across everyday urban life.
                        </p>
                        <p>
                          The goal was never occasional protection. The goal was wearable
                          protection that feels breathable, stable, lightweight, and
                          comfortable throughout continuous movement.
                        </p>
                        <p>
                          Because protection should not demand constant adjustment,
                          distraction, or compromise during the rhythm of everyday
                          mobility.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/8 pt-8">
                    {[
                      {
                        title: "Daily Commutes",
                        desc: "Built for movement across high-exposure urban environments and everyday travel routes.",
                      },
                      {
                        title: "Long Hours",
                        desc: "Breathable comfort designed for extended wear through heat, movement, and continuous activity.",
                      },
                      {
                        title: "Environmental Stress",
                        desc: "Helps reduce friction, dust exposure, UV interaction, and everyday environmental fatigue.",
                      },
                    ].map((block, i) => (
                      <div key={i} className="u-reveal u-p4-reveal group flex flex-col text-left">
                        <div className="flex items-center gap-2.5 mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="font-mono text-[10px] tracking-[0.25em] text-[#c08b4f] font-medium">
                            0{i + 1}
                          </span>
                          <span className="block h-px w-6 bg-[#c08b4f]/40 group-hover:w-10 group-hover:bg-[#c08b4f]/70 transition-all duration-500" />
                        </div>
                        <h3 className="font-display text-lg text-[#FAF7F3] mb-2 group-hover:text-[#d9b27a] transition-colors duration-500">
                          {block.title}
                        </h3>
                        <p className="text-[12.5px] text-white/55 font-light leading-relaxed">
                          {block.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cinematic commuting image — softly integrated into the section */}
                <div className="u-reveal u-p4-reveal relative w-full">
                  {/* Warm atmospheric wash behind */}
                  <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_55%_45%,rgba(220,150,70,0.25),transparent_72%)] blur-3xl pointer-events-none" />

                  <div
                    className="u-p4-image-wrap relative aspect-[4/5] max-h-[64vh] w-full mx-auto overflow-hidden"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(ellipse 95% 95% at 50% 48%, black 55%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                      maskImage:
                        "radial-gradient(ellipse 95% 95% at 50% 48%, black 55%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                    }}
                  >
                    <img
                      src="/soliva-commute.webp"
                      alt="Everyday urban commute — breathable protection in motion"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="u-p4-img absolute inset-0 w-full h-full object-cover select-none will-change-transform"
                      style={{
                        objectPosition: "50% 40%",
                        filter:
                          "saturate(0.84) contrast(1.05) brightness(0.92) sepia(0.09)",
                      }}
                    />
                    {/* Warm sunlight glow — upper-right */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_75%_15%,rgba(245,200,130,0.28),transparent_55%)] mix-blend-screen" />
                    {/* Cinematic tonal wash */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#3a2a22]/45 via-transparent to-[#c08b4f]/12 mix-blend-multiply" />
                    {/* Bottom shadow fade into section */}
                    <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none bg-gradient-to-t from-[#3a2a22] via-[#3a2a22]/55 to-transparent" />
                    {/* Top soft fade */}
                    <div className="absolute inset-x-0 top-0 h-1/4 pointer-events-none bg-gradient-to-b from-[#3a2a22]/50 to-transparent" />
                    {/* Dust / film grain */}
                    <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                    {/* Whisper warm vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(58,42,34,0.55)_100%)]" />

                    {/* Tiny Soliva watermark — restrained editorial detail */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-50">
                      <span className="block h-px w-5 bg-[#d9b27a]/60" />
                      <span className="font-mono text-[8.5px] tracking-[0.42em] uppercase text-[#f3dbab]/80">
                        Soliva
                      </span>
                    </div>
                  </div>

                  {/* Editorial caption beneath image */}
                  <div className="mt-5 flex items-start gap-3 max-w-[22rem] mx-auto">
                    <span className="mt-2 block h-px w-7 bg-[#c08b4f]/45 flex-shrink-0" />
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45 leading-[1.7]">
                      Built for motion.{" "}
                      <span className="text-[#d9b27a]/80 normal-case italic tracking-normal">
                        Made for everyday exposure.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
