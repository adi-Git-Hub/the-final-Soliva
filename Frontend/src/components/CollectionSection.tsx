import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Layers, Wind, Shield, Lock, ArrowRight, Check } from "lucide-react";
import { viewportOnce, ease } from "@/design-system";

/* One product · five editions. Chip order kept consistent with the brief. */
const editions = [
  { id: "blush-pink", name: "Blush Pink", swatch: "#E4B7C6", image: "/product_images/pink-1.webp", tone: "from-[#FFF5F7] to-[#FCE7F3]" },
  { id: "zesty-lime", name: "Zesty Lime", swatch: "#AEC96B", image: "/product_images/lime-1.webp", tone: "from-[#F5FFF7] to-[#DCFCE7]" },
  { id: "green-edition", name: "Olive Green", swatch: "#6A7038", image: "/product_images/olive-1.webp", tone: "from-[#EEF6EF] to-[#DCEDE0]" },
  { id: "deep-blue", name: "Deep Blue", swatch: "#33508A", image: "/product_images/blue-1.webp", tone: "from-[#F0F4FF] to-[#DBEAFE]" },
  { id: "classic-beige", name: "Classic Beige", swatch: "#D8C3A0", image: "/product_images/beige-1.webp", tone: "from-[#FBF6F0] to-[#EDE0D0]" },
] as const;

const lifestyleTags = [
  { emoji: "🛵", label: "Daily Commutes" },
  { emoji: "🎓", label: "College Travel" },
  { emoji: "💼", label: "Work Movement" },
  { emoji: "☀️", label: "Outdoor Hours" },
  { emoji: "✈️", label: "Weekend Journeys" },
];

const features = [
  { no: "01", Icon: Sun, title: "Certified UV Protection", desc: "Tested fabric designed to help reduce everyday UV exposure." },
  { no: "02", Icon: Layers, title: "Thoughtful Materials", desc: "Chosen to balance protection, comfort, and everyday wearability." },
  { no: "03", Icon: Wind, title: "Breathable Comfort", desc: "Layered for comfortable wear through long outdoor hours." },
  { no: "04", Icon: Shield, title: "Full Coverage Design", desc: "Extended coverage for the face, neck, and upper back." },
  { no: "05", Icon: Lock, title: "Secure Fit", desc: "Designed to stay in place through everyday movement." },
];

const trustLines = [
  "Lightweight",
  "Certified UV Protection",
  "Full Coverage",
  "Thoughtful Protection",
  "Built for Indian Conditions",
  "Breathable",
  "More Freedom",
];

export function CollectionSection() {
  const navigate = useNavigate();
  // Layered editorial fan — which edition sits centred (changes on CLICK) and which
  // is hovered (lifts in place, never re-centres → no flicker). Re-centre on click.
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
    <section className="m-collection relative z-20 flex min-h-screen w-full flex-col overflow-hidden bg-transparent lg:h-screen lg:overflow-hidden">
      {/* Soft warm glow — seamless hand-off to neighbouring sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(245,130,13,0.06),transparent_60%)] [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
      />
      {/* ── Single-viewport flagship content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: ease.luxe }}
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center gap-4 px-5 pb-4 pt-24 sm:px-8 lg:gap-2.5 lg:px-10 lg:pb-2 lg:pt-16"
      >
        {/* ════ TOP — label · heading · product · usage badges ════ */}
        <header className="flex flex-col items-center text-center mb-8 lg:mb-14">
          <h2
            className="font-display leading-[1.08] tracking-tight text-[#3a2a22]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Thoughtful protection for{" "}
            <span className="italic font-light text-[#c76600]/90">everyday movement.</span>
          </h2>

          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span className="font-display text-lg text-[#3a2a22] md:text-xl">SunWrap by Soliva</span>
            <span aria-hidden className="hidden h-3.5 w-px bg-[#3a2a22]/20 sm:inline-block" />
            <span className="text-[0.85rem] font-light text-[#7b6a5f]">
              Full face, neck &amp; back coverage designed for everyday movement.
            </span>
          </p>

          {/* Usage badges — single elegant row */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {lifestyleTags.map((t, i) => (
              <motion.span
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: ease.luxe }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#3a2a22]/10 bg-white/55 px-3 py-1.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.05em] text-[#3a2a22]/75 backdrop-blur transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#c76600]/30 hover:bg-white"
              >
                <span aria-hidden>{t.emoji}</span>
                {t.label}
              </motion.span>
            ))}
          </div>
        </header>

        {/* ════ CENTER — floating hero product + edition chips ════ */}
        <div className="flex flex-col items-center">
          <motion.div
            onViewportEnter={() => setEntered(true)}
            viewport={viewportOnce}
            className="relative flex w-full items-center justify-center"
          >
            {/* Layered editorial stage — all five editions fanned in a line, one centred */}
            <div className="relative mx-auto h-[26vh] max-h-[300px] min-h-[190px] w-full sm:h-[32vh] lg:h-[34vh]">
              <div className="absolute inset-0 flex origin-center items-center justify-center scale-[0.5] sm:scale-[0.64] lg:scale-[0.72]">
                {editions.map((p, i) => (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                    onClick={() => setActive(i)}
                    style={fanStyle(i)}
                    className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[200px] h-[400px] w-[300px] cursor-pointer transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
                  >
                    <div
                      className={`m-fan-card relative h-full w-full overflow-hidden rounded-[1.6rem] border border-[#3a2a22]/8 bg-gradient-to-br ${p.tone} transition-shadow duration-[700ms] ${
                        i === active || i === hovered
                          ? "shadow-[0_40px_70px_-30px_rgba(58,42,34,0.5)]"
                          : "shadow-[0_18px_36px_-26px_rgba(58,42,34,0.4)]"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain drop-shadow-floating"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Available in 5 Editions — compact colour chips */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <span className="font-mono text-[0.5625rem] font-bold uppercase tracking-[0.3em] text-[#3a2a22]/55">
              Available in 5 Editions
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {editions.map((e, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={e.id}
                    type="button"
                    onClick={() => setActive(i)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label={e.name}
                    aria-pressed={isActive}
                    className={`group/chip inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-[border-color,background-color,box-shadow] duration-300 ${
                      isActive
                        ? "border-[#c76600]/45 bg-white shadow-[0_12px_26px_-14px_rgba(199,102,0,0.55)]"
                        : "border-[#3a2a22]/10 bg-white/45 hover:border-[#3a2a22]/25 hover:bg-white"
                    }`}
                  >
                    <span
                      className="relative h-4 w-4 shrink-0 rounded-full ring-1 ring-white transition-shadow duration-300 group-hover/chip:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
                      style={{ background: e.swatch, boxShadow: isActive ? `0 0 0 3px ${e.swatch}33` : undefined }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.2, ease: ease.smooth }}
                            className="absolute inset-0 grid place-items-center"
                          >
                            <Check size={10} strokeWidth={3.5} className="text-white drop-shadow" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`font-mono text-[0.625rem] font-semibold uppercase tracking-[0.08em] ${
                        isActive ? "text-[#3a2a22]" : "text-[#3a2a22]/65"
                      }`}
                    >
                      {e.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ════ FEATURES — 5-up desktop · mobile swipe carousel ════ */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.no}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.07, ease: ease.luxe }}
              className="group flex w-[68%] shrink-0 snap-start flex-col rounded-[1.1rem] border border-[#3a2a22]/8 bg-white/45 p-3 backdrop-blur transition-[transform,box-shadow,background-color,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-[#c76600]/25 hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(58,42,34,0.42)] sm:w-auto"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c76600]/10 text-[#c76600] transition-colors duration-500 group-hover:bg-[#c76600] group-hover:text-white">
                  <f.Icon size={14} strokeWidth={2} />
                </span>
              </div>
              <h3 className="mt-2 font-display text-[0.8125rem] leading-snug tracking-tight text-[#3a2a22] md:text-[0.875rem]">
                {f.title}
              </h3>
              <p className="mt-1 text-[0.6875rem] font-light leading-relaxed text-[#7b6a5f]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ════ BOTTOM CTA — premium glass bar ════ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.1, ease: ease.luxe }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/45 px-5 py-3.5 shadow-[0_24px_50px_-30px_rgba(58,42,34,0.45)] backdrop-blur-md md:px-7"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(245,130,13,0.08),transparent_60%)]"
          />
          <div className="relative flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
            {/* price */}
            <div className="flex items-baseline gap-2.5">
              <span className="flex flex-col items-start leading-none">
                <span className="font-mono text-[0.5625rem] font-bold uppercase tracking-[0.28em] text-[#c76600]">
                  Launch Price
                </span>
              </span>
              <span className="font-display text-3xl tracking-tight text-[#3a2a22]">₹799</span>
              <span className="font-mono text-[0.8125rem] font-light text-[#7b6a5f]/70 line-through">
                MRP ₹999
              </span>
            </div>

            {/* tagline */}
            <p className="font-display text-[0.95rem] leading-snug tracking-tight text-[#3a2a22] md:text-[1.05rem]">
              Protection should adapt to life.{" "}
              <span className="italic font-light text-[#c76600]/90">Not the other way around.</span>
            </p>

            {/* CTA */}
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/collection" })}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: ease.smooth }}
              className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full bg-[#3a2a22] px-7 py-3 font-mono text-[0.6875rem] font-black uppercase tracking-[0.28em] text-[#f7f3ee] shadow-[0_18px_40px_-18px_rgba(58,42,34,0.6)] transition-colors duration-500 hover:bg-[#c76600] hover:shadow-[0_22px_46px_-16px_rgba(199,102,0,0.6)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Shop Now</span>
              <ArrowRight size={14} className="relative transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Infinite marquee strip (existing brand element) ── */}
      <div className="relative mb-0 mt-0 shrink-0 overflow-hidden border-y border-line-medium bg-surface-glass py-1.5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-luxury-beige/60 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-luxury-beige/60 to-transparent pointer-events-none" />

        <div className="flex items-center justify-center whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-3 pr-3"
          >
            {[...trustLines, ...trustLines].map((line, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.04em] text-brown-deep/80 transition-colors duration-700 hover:text-orange-glow cursor-default">
                  {line}
                </span>
                <span className="text-xs leading-none text-orange-glow/55">*</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
