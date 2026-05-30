import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";
import { useCart } from "@/features/cart/hooks/useCart";
import { Sun, Wind, Shield, MapPin, Check, Minus, Plus, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/_public/collection")({
  component: CollectionRoute,
  head: () => ({
    meta: [
      { title: "Collection — Soliva SunWrap" },
      {
        name: "description",
        content: "One product. Five colours. Engineered sun protection for daily movement.",
      },
    ],
  }),
});

/* ── One product · one hero image per colour ──
   Three live colours (real product photos) + two "Coming Soon" colours. */
const colours = [
  { id: "blush-pink", name: "Blush Pink", swatch: "#E4B7C6", image: null, comingSoon: true },
  { id: "classic-beige", name: "Classic Beige", swatch: "#D8C3A0", image: null, comingSoon: true },
  { id: "zesty-lime", name: "Zesty Lime", swatch: "#AEC96B", image: "/IMG_0550.webp", comingSoon: false },
  { id: "deep-violet", name: "Deep Violet", swatch: "#6C5CB8", image: "/IMG_0554.webp", comingSoon: false },
  { id: "mustard-olive", name: "Mustard Olive", swatch: "#A67C2E", image: "/IMG_0560.webp", comingSoon: false },
] as const;

/* Page opens on the first colour that actually has a product image. */
const FIRST_LIVE = colours.findIndex((c) => !c.comingSoon);

const benefits = [
  { icon: Sun, title: "UPF 50+ Protection", desc: "Blocks harmful UV through long outdoor hours." },
  { icon: Wind, title: "Breathable Comfort", desc: "Airflow-engineered fabric that stays cool in heat." },
  { icon: Shield, title: "Complete Coverage", desc: "Full face, neck, and back — and it stays in place." },
  { icon: MapPin, title: "Built For Indian Conditions", desc: "Tested against dust, heat, and relentless sun." },
];

const comparison = [
  { label: "Stability", trad: "Slips and shifts with movement", soliva: "Stays put through motion" },
  { label: "Coverage", trad: "Gaps around neck & jawline", soliva: "Full, continuous coverage" },
  { label: "Breathability", trad: "Traps heat, feels stuffy", soliva: "Breathable, airflow-engineered" },
  { label: "Daily usability", trad: "Constant readjustment", soliva: "Effortless all-day wear" },
];

/* Five named editions — each maps 1:1 to a colour above (index = colour). */
const variants = [
  { no: "01", name: "AirShield Wrap", emoji: "☀️", tag: "Enhanced Protection", desc: "Sculpted coverage. Silent confidence. The flagship dual-layer edition." },
  { no: "02", name: "Urban Veil", emoji: "🌬", tag: "Breathable Comfort", desc: "City-weight protection. Zero compromise. Engineered for the daily commute." },
  { no: "03", name: "HeatGuard", emoji: "🛵", tag: "Everyday Movement", desc: "Thermal intelligence. All-day calm. Built for peak exposure hours." },
  { no: "04", name: "MotionCover", emoji: "🛡", tag: "Full Coverage", desc: "Moves with you. Stays in place. Adaptive stretch-soft fabric." },
  { no: "05", name: "AirLite Shield", emoji: "🛡", tag: "Full Coverage", desc: "Barely there. Completely covered. The lightest in the collection." },
];

const eyebrow = "font-mono text-[0.6875rem] tracking-[0.34em] uppercase text-[#c76600] font-bold";

function CollectionRoute() {
  const [colourIndex, setColourIndex] = useState(FIRST_LIVE);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const colour = colours[colourIndex];

  const selectColour = (i: number) => setColourIndex(i);

  const scrollToShowcase = () =>
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const addToCart = () => {
    if (colour.comingSoon || !colour.image) return;
    cart.add({
      productId: "soliva-sunwrap",
      slug: "soliva-sunwrap",
      name: `Soliva SunWrap™ — ${colour.name}`,
      image: colour.image,
      priceCents: 79900,
      currency: "INR",
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="relative w-full bg-[#FAF7F3] text-[#3a2a22]">
      {/* ════════ SECTION 1 — COLLECTION INTRO (compact) ════════ */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: ease.smooth }}
          className="mx-auto max-w-[820px] px-6 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#c76600]/40" />
            <span className={eyebrow}>The Collection</span>
            <span className="h-px w-8 bg-[#c76600]/40" />
          </div>
          <h1
            className="font-display tracking-tight leading-[1.08]"
            style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)" }}
          >
            Protection.
            <span className="block italic font-light text-[#c76600]/90">
              Designed For Daily Movement.
            </span>
          </h1>
          <p className="mt-5 max-w-[520px] text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light leading-relaxed">
            One product, thoughtfully engineered. Five colours to live in. Full coverage that
            moves with you — from the commute to the longest day outdoors.
          </p>
          <button
            onClick={scrollToShowcase}
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#3a2a22] px-8 py-3.5 font-mono text-[0.7rem] tracking-[0.25em] uppercase font-black text-[#f7f3ee] transition-[transform,background] duration-300 hover:bg-[#4a3a32] hover:-translate-y-0.5 shadow-editorial"
          >
            Explore Product
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </section>

      {/* ════════ SECTION 2 — PRODUCT SHOWCASE (primary) ════════ */}
      <section
        id="showcase"
        className="relative scroll-mt-24 pb-16 md:pb-20 lg:min-h-screen lg:flex lg:items-center lg:py-0"
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* LEFT — product image */}
            <div className="flex flex-col gap-3">
              <div
                className="group relative aspect-[4/5] lg:aspect-auto lg:h-[58vh] lg:max-h-[600px] w-full overflow-hidden rounded-[2rem] border border-[#3a2a22]/5 shadow-[0_18px_40px_-22px_rgba(58,42,34,0.35)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_34px_64px_-24px_rgba(58,42,34,0.42)]"
                style={{ background: `${colour.swatch}1f` }}
              >
                <AnimatePresence mode="wait">
                  {colour.comingSoon || !colour.image ? (
                    <motion.div
                      key={colour.id + "-soon"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: ease.smooth }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
                    >
                      <span className="font-mono text-[0.625rem] tracking-[0.3em] uppercase text-[#3a2a22]/45 font-bold">
                        {colour.name}
                      </span>
                      <span
                        className="font-display italic text-[#3a2a22]/70 leading-none"
                        style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                      >
                        Coming Soon
                      </span>
                      <span className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-[#7b6a5f]/70">
                        This colour is on its way
                      </span>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={colour.id}
                      src={colour.image}
                      alt={`Soliva SunWrap — ${colour.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: ease.smooth }}
                      className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </AnimatePresence>
                <span className="absolute top-4 left-4 z-10 font-mono text-[0.5rem] tracking-[0.22em] uppercase font-bold text-[#3a2a22]/55 bg-white/60 px-2 py-1 rounded">
                  {colour.name}
                </span>
              </div>
            </div>

            {/* RIGHT — product info */}
            <div className="flex flex-col">
              <span className={eyebrow}>Soliva SunWrap™</span>
              <h2
                className="mt-3 font-display tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)" }}
              >
                The Everyday Sun Wrap
              </h2>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl md:text-[1.75rem] text-[#3a2a22]">₹799</span>
                <span className="font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-[#7b6a5f]/70">
                  MRP incl. taxes
                </span>
              </div>

              <p className="mt-5 max-w-[480px] text-[0.9375rem] md:text-[1rem] text-[#7b6a5f] font-light leading-relaxed">
                A dual-layer wrap that delivers full face, neck, and back coverage without the
                constant adjustment. Breathable, lightweight, and built to stay put through every
                kind of movement.
              </p>

              {/* Colour selector */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.625rem] tracking-[0.28em] uppercase text-[#3a2a22]/55 font-bold">
                    Colour
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-[#3a2a22]/80">
                    {colour.name}
                    {colour.comingSoon && <span className="text-[#c76600]/80"> · Coming Soon</span>}
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  {colours.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => selectColour(i)}
                      aria-label={c.comingSoon ? `${c.name} — coming soon` : c.name}
                      title={c.comingSoon ? `${c.name} — coming soon` : c.name}
                      className={`relative h-9 w-9 rounded-full shadow-[0_2px_6px_-1px_rgba(58,42,34,0.25)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-110 ${
                        c.comingSoon ? "opacity-55" : ""
                      } ${
                        i === colourIndex
                          ? "scale-105 ring-2 ring-offset-2 ring-offset-[#FAF7F3] ring-[#3a2a22]"
                          : "ring-0 ring-offset-0 ring-offset-[#FAF7F3] ring-transparent"
                      }`}
                      style={{ background: c.swatch }}
                    >
                      <AnimatePresence>
                        {i === colourIndex && (
                          <motion.span
                            key="check"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.4 }}
                            transition={{ duration: 0.25, ease: ease.smooth }}
                            className="absolute inset-0 grid place-items-center"
                          >
                            <Check size={14} className="text-white/90" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className={`flex items-center rounded-full border border-[#3a2a22]/15 ${colour.comingSoon ? "opacity-50" : ""}`}>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={colour.comingSoon}
                    className="grid place-items-center h-11 w-11 text-[#3a2a22]/70 hover:text-[#3a2a22] transition-colors disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-mono text-sm tabular-nums">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    disabled={colour.comingSoon}
                    className="grid place-items-center h-11 w-11 text-[#3a2a22]/70 hover:text-[#3a2a22] transition-colors disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={addToCart}
                  disabled={colour.comingSoon}
                  className={`group flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 rounded-full bg-[#3a2a22] px-8 py-3.5 font-mono text-[0.7rem] tracking-[0.25em] uppercase font-black text-[#f7f3ee] transition-[transform,background] duration-300 shadow-editorial ${
                    colour.comingSoon
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#4a3a32] hover:-translate-y-0.5"
                  }`}
                >
                  {colour.comingSoon ? (
                    "Coming Soon"
                  ) : added ? (
                    <>
                      <Check size={15} /> Added
                    </>
                  ) : (
                    <>
                      Add to Cart
                      <Plus size={15} className="transition-transform group-hover:rotate-90" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#3a2a22]/8 pt-5 font-mono text-[0.625rem] tracking-[0.14em] uppercase text-[#7b6a5f]/80">
                <span className="flex items-center gap-1.5">
                  <Check size={11} className="text-[#c76600]" /> UPF 50+
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={11} className="text-[#c76600]" /> Free shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={11} className="text-[#c76600]" /> 7-day returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ ONE PRODUCT · FIVE COLOURS (variant editions) ════════ */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: ease.smooth }}
            className="max-w-[760px]"
          >
            <span className={eyebrow}>Soliva SunWrap™</span>
            <h2
              className="mt-3 font-display tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}
            >
              One Product. <span className="italic font-light text-[#c76600]/90">Five Colours.</span>
            </h2>
            <p className="mt-4 text-[0.9375rem] md:text-[1rem] text-[#7b6a5f] font-light leading-relaxed">
              Protective essentials thoughtfully designed for everyday exposure — supporting
              different routines, movement, and life stages.
            </p>
            <p className="mt-2 text-[0.8125rem] text-[#7b6a5f]/80 font-light leading-relaxed">
              Designed for commuting, outdoor exposure, travel, work, college, and everyday movement.
            </p>
          </motion.div>

          {/* Variant editions */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
            {variants.map((v, i) => {
              const isActive = i === colourIndex;
              return (
                <motion.button
                  key={v.no}
                  type="button"
                  onClick={() => {
                    selectColour(i);
                    scrollToShowcase();
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: ease.smooth }}
                  className={`group relative flex flex-col text-left rounded-[1.25rem] border p-3.5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 ${
                    isActive
                      ? "border-[#c76600]/50 bg-white shadow-[0_18px_36px_-20px_rgba(58,42,34,0.4)]"
                      : "border-[#3a2a22]/8 bg-white/40 hover:bg-white hover:shadow-[0_16px_32px_-22px_rgba(58,42,34,0.4)]"
                  }`}
                  aria-label={`${v.name} — select ${colours[i].name}`}
                >
                  {/* image */}
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.9rem]"
                    style={{ background: `${colours[i].swatch}1f` }}
                  >
                    {colours[i].comingSoon || !colours[i].image ? (
                      <div className="absolute inset-0 flex items-center justify-center px-2 text-center">
                        <span className="font-display italic text-[#3a2a22]/60 text-[0.95rem] leading-tight">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <img
                        src={colours[i].image!}
                        alt={v.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    )}
                    <span
                      className="absolute top-2 right-2 h-4 w-4 rounded-full ring-1 ring-white/70 shadow-sm"
                      style={{ background: colours[i].swatch }}
                    />
                  </div>

                  {/* meta */}
                  <div className="mt-3.5 flex items-baseline justify-between">
                    <span className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-[#c76600] font-bold">
                      Variant
                    </span>
                    <span className="font-display text-lg text-[#3a2a22]/15 leading-none tabular-nums">
                      {v.no}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-[1.05rem] text-[#3a2a22] leading-snug">
                    {v.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.06em] uppercase text-[#3a2a22]/65 font-semibold">
                    <span aria-hidden>{v.emoji}</span>
                    {v.tag}
                  </p>
                  <p className="mt-2.5 text-[0.78rem] text-[#7b6a5f] font-light leading-relaxed">
                    {v.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Explore Product CTA */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={scrollToShowcase}
              className="group inline-flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.25em] uppercase font-black text-[#3a2a22] transition-colors duration-300 hover:text-[#c76600]"
            >
              Explore Product
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — KEY BENEFITS (compact) ════════ */}
      <section className="bg-[#f1e7d8] border-y border-[#3a2a22]/8 py-14 md:py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: i * 0.08, ease: ease.smooth }}
                className="flex flex-col"
              >
                <b.icon size={22} className="text-[#c76600] mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-lg text-[#3a2a22] leading-snug mb-2">{b.title}</h3>
                <p className="text-[0.8125rem] text-[#7b6a5f] font-light leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 — COMPARISON (compact) ════════ */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[940px] px-5 sm:px-8">
          <div className="text-center mb-10">
            <span className={eyebrow}>Why Soliva</span>
            <h2
              className="mt-3 font-display tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
            >
              A different kind of coverage.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[#3a2a22]/10">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#3a2a22] text-[#f7f3ee]">
              <div className="px-5 py-4" />
              <div className="px-5 py-4 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-center opacity-70">
                Traditional
              </div>
              <div className="px-5 py-4 font-mono text-[0.625rem] tracking-[0.2em] uppercase text-center text-[#e3c187]">
                Soliva
              </div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] items-center ${
                  i % 2 ? "bg-[#FAF7F3]" : "bg-[#f6efe5]"
                }`}
              >
                <div className="px-5 py-4 font-display text-[0.95rem] text-[#3a2a22]">{row.label}</div>
                <div className="px-5 py-4 flex items-center justify-center gap-2 text-center text-[0.8125rem] text-[#7b6a5f]/80 font-light">
                  <X size={13} className="text-[#b9483a]/60 shrink-0" />
                  <span className="hidden sm:inline">{row.trad}</span>
                </div>
                <div className="px-5 py-4 flex items-center justify-center gap-2 text-center text-[0.8125rem] text-[#3a2a22] font-medium">
                  <Check size={13} className="text-[#5a8a4a] shrink-0" />
                  <span className="hidden sm:inline">{row.soliva}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 — FINAL CTA ════════ */}
      <section className="relative bg-[#3a2a22] py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.06),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: ease.smooth }}
          className="relative z-10 mx-auto max-w-[760px] px-6 text-center"
        >
          <h2
            className="font-display text-[#FAF7F3] tracking-tight leading-[1.12]"
            style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.85rem)" }}
          >
            Thoughtfully Layered.
            <span className="block italic font-light text-[#e3c187]">Effortlessly Worn.</span>
          </h2>
          <button
            onClick={scrollToShowcase}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#e3c187] px-10 py-4 font-mono text-[0.72rem] tracking-[0.28em] uppercase font-black text-[#3a2a22] transition-[transform,background] duration-300 hover:bg-[#eed3a0] hover:-translate-y-0.5"
          >
            Shop Now
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
