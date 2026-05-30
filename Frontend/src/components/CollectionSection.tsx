import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";
import { EverydayInsightHorizontal } from "./EverydayInsightHorizontal";

const products = [
  {
    id: "01",
    slug: "soliva-airshield-wrap",
    name: "AirShield Wrap",
    image: "/variant-blue.webp",
    desc: "Sculpted coverage. Silent confidence. The flagship dual-layer edition.",
    tone: "from-[#F0F4FF] to-[#DBEAFE]",
  },
  {
    id: "02",
    slug: "soliva-urban-veil",
    name: "Urban Veil",
    image: "/variant-gray.webp",
    desc: "City-weight protection. Zero compromise. Engineered for the daily commute.",
    tone: "from-[#F9F8F6] to-[#EDEBE8]",
  },
  {
    id: "03",
    slug: "soliva-heatguard",
    name: "HeatGuard",
    image: "/variant-lime.webp",
    desc: "Thermal intelligence. All-day calm. Built for peak exposure hours.",
    tone: "from-[#F5FFF7] to-[#DCFCE7]",
  },
  {
    id: "04",
    slug: "soliva-motioncover",
    name: "MotionCover",
    image: "/variant-pink.webp",
    desc: "Moves with you. Stays in place. Adaptive stretch-soft fabric.",
    tone: "from-[#FFF5F7] to-[#FCE7F3]",
  },
  {
    id: "05",
    slug: "soliva-airlite-shield",
    name: "AirLite Shield",
    image: "/variant-brown.webp",
    desc: "Barely there. Completely covered. The lightest in the collection.",
    tone: "from-[#FBF6F0] to-[#EDE0D0]",
  },
];

const trustLines = [
  "Advanced UV Defense",
  "Breathable Comfort",
  "Full Coverage Design",
  "Built For Indian Conditions",
  "Everyday Essential",
];

const routines = [
  "Daily commuting",
  "College travel",
  "Work movement",
  "Outdoor hours",
  "Weekend journeys",
];

const insightCards = [
  { no: "01", title: "Built for movement", desc: "Protection designed around everyday mobility and natural motion." },
  { no: "02", title: "Breathable comfort", desc: "Engineered to remain comfortable through long outdoor hours." },
  { no: "03", title: "Thoughtful coverage", desc: "Full face, neck, and back protection designed for daily exposure." },
  { no: "04", title: "Everyday wearability", desc: "Created to become part of routine rather than interrupt it." },
];

export function CollectionSection() {
  // Layered stage: which variant sits centred (changes on CLICK only) and which
  // one is hovered (lifts in place, never re-centres — that prevents the flicker).
  const [active, setActive] = useState(2);
  const [hovered, setHovered] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  // After the staggered entry finishes, drop the per-card delay so hover is instant.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setSettled(true), 1200);
    return () => clearTimeout(t);
  }, [entered]);

  // Editorial fan transform for each variant relative to the active one.
  const fanStyle = (i: number): React.CSSProperties => {
    const pos = i - active;
    const dist = Math.min(Math.abs(pos), 3);
    const isHovered = i === hovered;
    // Hover lifts & enlarges the card IN PLACE — translateX depends only on `active`,
    // so a hovered side-card never shifts the fan and no neighbour slides under the
    // cursor to re-trigger hover. Re-centring happens on click instead.
    const lift = isHovered ? -32 : 0;
    const bump = isHovered ? 0.08 : 0;
    const tilt = isHovered ? 0 : pos * 5;
    return {
      transform: `translateX(${pos * 168}px) translateY(${dist * 18 + lift}px) rotate(${tilt}deg) scale(${1 - dist * 0.1 + bump})`,
      opacity: entered ? 1 - dist * 0.16 : 0,
      zIndex: isHovered ? 50 : 20 - dist,
      transitionDelay: entered && !settled ? `${i * 80}ms` : "0ms",
    };
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-transparent pt-2 md:pt-3 pb-0 z-20"
    >

      {/* ═══ EDITORIAL BRIDGE — One design. Five expressions of movement. ═══ */}
      <div className="relative w-full">
        {/* Soft warm glow that reduces toward the bottom → seamless hand-off */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(245,130,13,0.05),transparent_60%)] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
        />

        <motion.div
          onViewportEnter={() => setEntered(true)}
          initial={{ opacity: 0, y: 28, scale: 0.975 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: ease.luxe }}
          className="relative z-10 mx-auto max-w-[80rem] px-5 sm:px-8 lg:px-10 pt-16 md:pt-24 pb-14 md:pb-20"
        >
          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center">
            <span className="font-mono text-[0.625rem] sm:text-[0.6875rem] tracking-[0.34em] uppercase text-[#c76600] font-bold">
              Soliva SunWrap™
            </span>
            <h2
              className="mt-4 font-display text-[#3a2a22] tracking-tight leading-[1.12]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              One design.
              <span className="block italic font-light text-[#c76600]/90">
                Five expressions of movement.
              </span>
            </h2>

            <p className="mt-6 text-[0.95rem] md:text-[1.05rem] text-[#3a2a22]/80 font-light">
              Every routine is different.
            </p>

            {/* Routines — editorial inline list */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {routines.map((r, i) => (
                <span key={r} className="flex items-center gap-3">
                  <span className="font-mono text-[0.625rem] md:text-[0.6875rem] tracking-[0.16em] uppercase text-[#7b6a5f] font-semibold">
                    {r}
                  </span>
                  {i < routines.length - 1 && (
                    <span className="text-[#c76600]/40 text-[0.5rem]" aria-hidden>
                      ✦
                    </span>
                  )}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-[640px] text-[0.875rem] md:text-[0.95rem] text-[#7b6a5f] font-light leading-relaxed">
              The same thoughtful protection system adapts across different lifestyles while
              maintaining comfort, coverage, and breathable wearability.
            </p>

            <p className="mt-5 font-display text-[#3a2a22] tracking-tight leading-snug text-lg md:text-xl">
              Designed once.{" "}
              <span className="italic font-light text-[#c76600]/90">Experienced differently.</span>
            </p>
          </div>

          {/* ── Layered editorial stage — all five variants, one centred ── */}
          <div className="relative mx-auto mt-10 md:mt-12 h-[440px] sm:h-[540px] lg:h-[640px] w-full">
            <div className="absolute inset-0 flex items-center justify-center scale-[0.6] sm:scale-[0.84] lg:scale-100 origin-center">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  onClick={() => setActive(i)}
                  style={fanStyle(i)}
                  className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[200px] h-[400px] w-[300px] cursor-pointer transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-[1.6rem] border border-[#3a2a22]/8 bg-gradient-to-br ${p.tone} transition-shadow duration-[700ms] ${
                      i === active || i === hovered
                        ? "shadow-[0_40px_70px_-30px_rgba(58,42,34,0.5)]"
                        : "shadow-[0_18px_36px_-26px_rgba(58,42,34,0.4)]"
                    }`}
                  >
                    <span className="absolute top-4 left-4 z-10 flex flex-col items-center bg-white/70 rounded-xl px-2 py-1.5 border border-[#3a2a22]/5">
                      <span className="font-mono text-[0.45rem] tracking-[0.22em] text-[#3a2a22]/40 uppercase font-bold">
                        Variant
                      </span>
                      <span className="font-mono text-[0.8125rem] text-[#3a2a22] font-bold leading-none">
                        {p.id}
                      </span>
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain drop-shadow-floating"
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 text-center bg-gradient-to-t from-white/55 to-transparent">
                      <span className="font-display text-[0.95rem] text-[#3a2a22] tracking-tight">
                        {p.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Four feature insight cards ── */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {insightCards.map((c, i) => (
              <motion.div
                key={c.no}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: i * 0.08, ease: ease.luxe }}
                className="group rounded-[1.25rem] border border-[#3a2a22]/8 bg-white/45 p-5 md:p-6 transition-[transform,box-shadow,background-color] duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_44px_-26px_rgba(58,42,34,0.42)]"
              >
                <span className="font-mono text-[0.5625rem] tracking-[0.3em] uppercase text-[#c76600]/70 font-bold">
                  {c.no}
                </span>
                <h3 className="mt-3 font-display text-[1.05rem] md:text-lg text-[#3a2a22] leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-[0.78rem] md:text-[0.8125rem] text-[#7b6a5f] font-light leading-relaxed">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Micro editorial statement ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.luxe }}
            className="mt-12 md:mt-16 text-center font-display text-[#3a2a22] tracking-tight leading-snug"
            style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)" }}
          >
            Protection should adapt to life.
            <span className="block italic font-light text-[#c76600]/90">
              Not the other way around.
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* ═══ EVERYDAY INSIGHT — 2-Panel Horizontal Storytelling ═══ */}
      <EverydayInsightHorizontal />

      {/* Infinite Marquee Strip */}
      <div className="relative mt-10 sm:mt-12 lg:mt-14 mb-0 border-y border-line-medium bg-surface-glass py-3 sm:py-4 lg:py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-luxury-beige/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-luxury-beige/60 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap items-center justify-center">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex gap-14 sm:gap-20 items-center pr-14 sm:pr-20"
          >
            {[...trustLines, ...trustLines].map((line, idx) => (
              <div key={idx} className="flex items-center gap-14 sm:gap-20">
                <span className="text-xs sm:text-sm md:text-body tracking-eyebrow sm:tracking-luxe text-brown-deep/80 uppercase font-bold hover:text-orange-glow transition-colors duration-700 cursor-default">
                  {line}
                </span>
                <span className="text-orange-glow/70 text-xl sm:text-2xl font-serif leading-none">
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
