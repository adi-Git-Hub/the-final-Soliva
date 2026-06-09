import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";
import { useCart } from "@/features/cart/hooks/useCart";
import { useCheckoutStore } from "@/features/checkout/store";
import { Check, ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_public/collection")({
  component: CollectionRoute,
  head: () => ({
    meta: [
      { title: "SunWrap by Soliva — Women's Collection" },
      {
        name: "description",
        content:
          "Full face, neck & back coverage designed for everyday movement. Available in 5 editions.",
      },
    ],
  }),
});

/* ── One product · five editions · four gallery views each.
   Exact edition naming kept consistent site-wide. ── */
const editions = [
  {
    id: "blush-pink",
    name: "Blush Pink",
    swatch: "#E4B7C6",
    images: [
      { view: "Front View", src: "/product_images/Blush_Pink.webp" },
      { view: "Side View", src: "/product_images/IMG_6193.webp" },
      { view: "Back View", src: "/product_images/IMG_6194.webp" },
      { view: "Lifestyle View", src: "/product_images/IMG_0493.webp" },
    ],
  },
  {
    id: "zesty-lime",
    name: "Zesty Lime",
    swatch: "#AEC96B",
    images: [
      { view: "Front View", src: "/product_images/zesty-lime-front.webp" },
      { view: "Side View", src: "/product_images/IMG_6205.webp" },
      { view: "Back View", src: "/product_images/IMG_6202.webp" },
      { view: "Lifestyle View", src: "/product_images/IMG_4888.webp" },
    ],
  },
  {
    id: "green-edition",
    name: "Olive Green",
    swatch: "#6A7038",
    images: [
      { view: "Front View", src: "/product_images/olive-green-front.webp" },
      { view: "Side View", src: "/product_images/IMG_6200.webp" },
      { view: "Back View", src: "/product_images/IMG_6201.webp" },
      { view: "Lifestyle View", src: "/product_images/IMG_0494.webp" },
    ],
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    swatch: "#33508A",
    images: [
      { view: "Front View", src: "/product_images/Deep_Blue.webp" },
      { view: "Side View", src: "/product_images/IMG_6196.webp" },
      { view: "Back View", src: "/product_images/IMG_6195.webp" },
      { view: "Lifestyle View", src: "/product_images/IMG_0492.webp" },
    ],
  },
  {
    id: "classic-beige",
    name: "Classic Beige",
    swatch: "#D8C3A0",
    images: [
      { view: "Front View", src: "/product_images/classic-beige-front.webp" },
      { view: "Side View", src: "/product_images/IMG_6203.webp" },
      { view: "Back View", src: "/product_images/IMG_6204.webp" },
      { view: "Lifestyle View", src: "/product_images/IMG_0491.webp" },
    ],
  },
] as const;

const lifestyleTags = [
  { emoji: "🛵", label: "Daily Commutes" },
  { emoji: "🎓", label: "College Travel" },
  { emoji: "💼", label: "Work Movement" },
  { emoji: "☀️", label: "Outdoor Hours" },
  { emoji: "✈️", label: "Weekend Journeys" },
];

/* Collection preview cards — placeholder content (client replaces text). */
const collections = [
  {
    no: "01",
    title: "Women",
    intro: "Protection designed around everyday movement.",
    bullets: ["Daily commutes", "College travel", "Work movement", "Outdoor hours"],
    paragraph: "Thoughtfully engineered coverage for the rhythms of modern everyday life.",
    tagline: "Everyday Essentials",
    bg: "from-[#FBEFF1] to-[#F6E1E7]", // soft blush pink
    comingSoon: false, // Women is live
  },
  {
    no: "02",
    title: "Kids",
    intro: "Protection made for little explorers.",
    bullets: ["School rides", "Outdoor play", "Family outings", "Everyday adventures"],
    paragraph: "Comfort-first coverage built around active, growing routines.",
    tagline: "For Little Explorers",
    bg: "from-[#EEF6EF] to-[#DCEDE0]", // soft mint green
    comingSoon: true,
  },
  {
    no: "03",
    title: "Men",
    intro: "Protection designed for everyday movement.",
    bullets: ["Daily commutes", "Work travel", "Outdoor hours", "Everyday exposure"],
    paragraph: "Built around real-world routines where comfort and coverage matter most.",
    tagline: "Built for Movement",
    bg: "from-[#EEF3FA] to-[#DBE7F3]", // soft powder blue
    comingSoon: true,
  },
  {
    no: "04",
    title: "Gifting",
    intro: "Thoughtful protection, ready to gift.",
    bullets: ["Travel gifting", "Family gifting", "Everyday essentials", "Seasonal gifting"],
    paragraph: "Curated protection kits designed for the people you care about.",
    tagline: "Ready to Gift",
    bg: "from-[#FAF4EA] to-[#F0E5D2]", // soft cream beige
    comingSoon: true,
  },
];

/* Editorial "Built for Movement" insight cards (copied from homepage insight). */

const eyebrow = "font-mono text-[0.6875rem] tracking-[0.34em] uppercase text-[#c76600] font-bold";

/* Directional slide for the main gallery image (smooth horizontal slider). */
const slideVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
};

function CollectionRoute() {
  const [editionIndex, setEditionIndex] = useState(1);
  const [viewIndex, setViewIndex] = useState(0);
  const [direction, setDirection] = useState(0); // slide direction: 1 = next, -1 = prev
  const [added, setAdded] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();
  const setCheckoutItems = useCheckoutStore((s) => s.setItems);

  const edition = editions[editionIndex];
  const image = edition.images[viewIndex];
  const VIEW_COUNT = edition.images.length;

  // Switching colour resets the gallery to the Front View of that edition.
  const selectEdition = (i: number) => {
    setDirection(0);
    setEditionIndex(i);
    setViewIndex(0);
  };
  const nextView = () => {
    setDirection(1);
    setViewIndex((v) => (v + 1) % VIEW_COUNT);
  };
  const prevView = () => {
    setDirection(-1);
    setViewIndex((v) => (v - 1 + VIEW_COUNT) % VIEW_COUNT);
  };
  // Jump straight to a view (thumbnails) — slide toward the target.
  const goToView = (i: number) => {
    setDirection(i >= viewIndex ? 1 : -1);
    setViewIndex(i);
  };

  const reduce = useReducedMotion();

  const addToCart = () => {
    cart.add({
      productId: "soliva-sunwrap",
      slug: "soliva-sunwrap",
      name: `SunWrap by Soliva — ${edition.name}`,
      image: edition.images[0].src,
      priceCents: 79900,
      currency: "INR",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Buy Now → stage this edition as the checkout line, then jump to the
  // checkout page (address/details) which in turn opens Razorpay.
  const buyNow = () => {
    setCheckoutItems([
      {
        productId: "soliva-sunwrap",
        name: `SunWrap by Soliva — ${edition.name}`,
        image: edition.images[0].src,
        price: 799,
        quantity: 1,
      },
    ]);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="relative w-full bg-[#FAF7F3] text-[#3a2a22]">
      {/* ════════ SECTION 1 — PRODUCT HERO ════════ */}
      <section className="relative pt-24 md:pt-28 pb-14 md:pb-16 lg:min-h-screen lg:flex lg:items-center lg:pt-28 lg:pb-16">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1fr] gap-10 lg:gap-16 items-center">
            {/* LEFT — premium product gallery (5 editions × 4 views) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: ease.smooth }}
              className="order-1 lg:order-none flex flex-col gap-4 w-full lg:max-w-[420px] lg:mx-auto"
            >
              {/* Main image — floating/breathing; slide on colour/view change, swipe on touch */}
              <div className="relative aspect-[4/5] w-full">
                <motion.div
                  animate={reduce ? undefined : { y: [0, -4, 0], rotate: [-0.6, 0.6, -0.6], scale: [1, 1.012, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="group relative h-full w-full overflow-hidden rounded-[2.25rem] border border-[#3a2a22]/5 bg-[#EDE6D8] shadow-[0_28px_60px_-30px_rgba(58,42,34,0.4)] will-change-transform"
                >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={`${edition.id}-${viewIndex}`}
                    src={image.src}
                    alt={`SunWrap by Soliva — ${edition.name}, ${image.view}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) nextView();
                      else if (info.offset.x > 60) prevView();
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 320, damping: 34 },
                      opacity: { duration: 0.25, ease: ease.smooth },
                    }}
                    className={`absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing will-change-transform ${
                      image.src.includes("/variant-") ? "object-contain p-4" : "object-cover"
                    }`}
                  />
                </AnimatePresence>

                <span className="absolute top-5 left-5 z-10 font-mono text-[0.55rem] tracking-[0.24em] uppercase font-bold text-[#3a2a22]/60 bg-white/65 backdrop-blur px-2.5 py-1 rounded-full">
                  {edition.name}
                </span>
                <span className="absolute top-5 right-5 z-10 font-mono text-[0.55rem] tracking-[0.22em] uppercase font-semibold text-[#3a2a22]/55 bg-white/65 backdrop-blur px-2.5 py-1 rounded-full">
                  {image.view}
                </span>

                {/* Desktop hover arrows */}
                <button
                  onClick={prevView}
                  aria-label="Previous image"
                  className="hidden lg:grid absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 place-items-center rounded-full bg-white/75 backdrop-blur text-[#3a2a22] shadow-md opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 hover:scale-110"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextView}
                  aria-label="Next image"
                  className="hidden lg:grid absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 place-items-center rounded-full bg-white/75 backdrop-blur text-[#3a2a22] shadow-md opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 hover:scale-110"
                >
                  <ChevronRight size={18} />
                </button>
                </motion.div>
              </div>

              {/* Arrows + counter */}
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={prevView}
                  aria-label="Previous image"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#3a2a22]/15 text-[#3a2a22]/70 transition-[transform,color,border-color] duration-300 hover:text-[#3a2a22] hover:border-[#3a2a22]/40 hover:-translate-x-0.5"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono text-[0.75rem] tracking-[0.2em] text-[#3a2a22]/70 tabular-nums">
                  {viewIndex + 1} / {VIEW_COUNT}
                </span>
                <button
                  onClick={nextView}
                  aria-label="Next image"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#3a2a22]/15 text-[#3a2a22]/70 transition-[transform,color,border-color] duration-300 hover:text-[#3a2a22] hover:border-[#3a2a22]/40 hover:translate-x-0.5"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnails — switch with colour, current highlighted */}
              <div className="grid grid-cols-4 gap-3">
                {edition.images.map((img, i) => (
                  <button
                    key={img.view}
                    onClick={() => goToView(i)}
                    aria-label={img.view}
                    title={img.view}
                    className={`relative aspect-square overflow-hidden rounded-[0.9rem] border transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 ${
                      i === viewIndex
                        ? "border-[#c76600] shadow-[0_10px_22px_-12px_rgba(199,102,0,0.55)]"
                        : "border-[#3a2a22]/10 hover:border-[#c76600]/40 hover:shadow-[0_10px_22px_-12px_rgba(199,102,0,0.4)]"
                    }`}
                    style={{ background: `linear-gradient(155deg, ${edition.swatch}1f, ${edition.swatch}08)` }}
                  >
                    <img
                      src={img.src}
                      alt={img.view}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full ${
                        img.src.includes("/variant-") ? "object-contain p-1.5" : "object-cover"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — editorial copy + lifestyle tags */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: ease.smooth }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="h-px w-8 bg-[#c76600]/40" />
                <span className={eyebrow}>Women's Collection</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: ease.smooth }}
                className="font-display tracking-tight leading-[1.07] lg:whitespace-nowrap"
                style={{ fontSize: "clamp(1.5rem, 2.9vw, 1.95rem)" }}
              >
                Thoughtful protection for{" "}
                <span className="italic font-light text-[#c76600]/90">everyday movement.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: ease.smooth }}
                className="mt-6 font-display text-xl md:text-2xl text-[#3a2a22]"
              >
                SunWrap by Soliva
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: ease.smooth }}
                className="mt-3 max-w-[440px] text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light leading-relaxed"
              >
                Full face, neck &amp; back coverage designed for everyday movement.
              </motion.p>

              {/* Lifestyle tags */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {lifestyleTags.map((t, i) => (
                  <motion.span
                    key={t.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: ease.smooth }}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#3a2a22]/10 bg-white/60 px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.06em] uppercase text-[#3a2a22]/75 font-semibold transition-colors duration-300 hover:border-[#c76600]/30 hover:bg-white"
                  >
                    <span aria-hidden>{t.emoji}</span>
                    {t.label}
                  </motion.span>
                ))}
              </div>

              {/* Colour selector — Available in 5 Editions */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.25, ease: ease.smooth }}
                className="mt-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.625rem] tracking-[0.28em] uppercase text-[#3a2a22]/55 font-bold">
                    Available in 5 Editions
                  </span>
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-[#3a2a22]/80">
                    {edition.name}
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  {editions.map((e, i) => (
                    <button
                      key={e.id}
                      onClick={() => selectEdition(i)}
                      aria-label={e.name}
                      title={e.name}
                      className={`relative h-9 w-9 rounded-full shadow-[0_2px_6px_-1px_rgba(58,42,34,0.25)] transition-transform duration-300 ease-out hover:scale-110 ${
                        i === editionIndex
                          ? "scale-105 ring-2 ring-offset-2 ring-offset-[#FAF7F3] ring-[#3a2a22]"
                          : "ring-0 ring-offset-2 ring-offset-[#FAF7F3] ring-transparent"
                      }`}
                      style={{ background: e.swatch }}
                    >
                      <AnimatePresence>
                        {i === editionIndex && (
                          <motion.span
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
              </motion.div>

              {/* ── Price — launch pricing · luxury presentation ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.32, ease: ease.smooth }}
                className="mt-8"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.28em] uppercase text-[#3a2a22]/55 font-bold">
                  Launch Price
                </span>
                <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5">
                  <span
                    className="font-display leading-none tracking-tight text-[#3a2a22]"
                    style={{ fontSize: "clamp(2.4rem, 4vw, 3rem)" }}
                  >
                    ₹799
                  </span>
                  <span className="text-[1.05rem] font-light text-[#7b6a5f]/65 line-through decoration-[#7b6a5f]/40">
                    MRP ₹999
                  </span>
                  <span className="rounded-full border border-[#c76600]/25 bg-[#c76600]/[0.07] px-2.5 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[#c76600]">
                    Save ₹200
                  </span>
                </div>
                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.75rem] font-light text-[#7b6a5f]">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck size={14} strokeWidth={1.75} className="text-[#c76600]/70" />
                    Free Shipping Across India
                  </span>
                  <span aria-hidden className="h-3 w-px bg-[#3a2a22]/15" />
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={14} strokeWidth={1.75} className="text-[#c76600]/70" />
                    GST Included
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4, ease: ease.smooth }}
                className="mt-8 flex w-full max-w-[460px] items-stretch gap-3"
              >
                {/* Buy Now — primary → /checkout (details) → Razorpay */}
                <motion.button
                  onClick={buyNow}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: ease.smooth }}
                  className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#3a2a22] px-4 py-4 font-mono text-[0.7rem] tracking-[0.16em] uppercase font-black text-[#f7f3ee] shadow-editorial transition-[background,box-shadow,transform] duration-300 hover:bg-[#2e211b] hover:shadow-[0_22px_46px_-18px_rgba(58,42,34,0.6)] sm:px-8 sm:tracking-[0.22em]"
                >
                  Buy Now
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </motion.button>

                {/* Add to Cart — secondary */}
                <motion.button
                  onClick={addToCart}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: ease.smooth }}
                  className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#3a2a22]/25 bg-white/50 px-4 py-4 font-mono text-[0.7rem] tracking-[0.16em] uppercase font-bold text-[#3a2a22] backdrop-blur transition-[background,border-color,box-shadow,transform] duration-300 hover:border-[#3a2a22]/45 hover:bg-white hover:shadow-[0_16px_36px_-22px_rgba(58,42,34,0.4)] sm:px-8 sm:tracking-[0.22em]"
                >
                  {added ? (
                    <>
                      <Check size={14} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> Add to Cart
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FREEDOM — full image (object-contain, nothing cropped) ════════ */}
      <section className="relative w-full overflow-hidden bg-[#3a2a22] py-12 md:py-16">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8 flex items-center justify-center">
          <img
            src="/product_images/IMG_0491.webp"
            alt="Soliva — everyday protection that moves with you"
            decoding="async"
            draggable={false}
            className="w-auto max-w-full max-h-[85vh] rounded-[1.5rem] object-contain select-none shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
          />
        </div>
      </section>

      {/* ════════ COLLECTION + SHOP + STATEMENT — combined into one screen ════════ */}
      <section
        id="pricing"
        className="relative scroll-mt-24 min-h-screen flex flex-col justify-center overflow-hidden py-12 md:py-14"
      >
        <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 flex flex-col gap-8 md:gap-10">
          {/* 4 editorial cards · Desktop: 4-col · Tablet: 2×2 · Mobile: clean vertical stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {collections.map((c, i) => (
              <motion.article
                key={c.no}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: i * 0.1, ease: ease.smooth }}
                whileHover={{ y: -8, scale: 1.015 }}
                className={`group relative flex flex-col rounded-[28px] bg-gradient-to-br ${c.bg} border border-white/60 p-5 lg:p-6 min-h-[260px] md:min-h-[300px] lg:min-h-[330px] shadow-[0_18px_50px_-30px_rgba(58,42,34,0.4)] transition-shadow duration-500 ease-out hover:shadow-[0_40px_80px_-36px_rgba(58,42,34,0.45)]`}
              >
                {/* Coming-soon status — keeps all content, just flags availability */}
                {c.comingSoon && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#c76600]/30 bg-[#c76600]/[0.08] px-2.5 py-1 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.24em] text-[#c76600]">
                    <span className="h-1 w-1 rounded-full bg-[#c76600] animate-pulse" />
                    Coming Soon
                  </span>
                )}

                {/* Title + index */}
                <div className="flex items-start justify-between">
                  <h3
                    className="font-display tracking-tight text-[#2e211b] leading-none"
                    style={{ fontSize: "clamp(1.45rem, 2vw, 1.85rem)" }}
                  >
                    {c.title}
                  </h3>
                </div>

                {/* Italic serif intro */}
                <p className="mt-3 font-display italic font-light text-[#5a4a40] leading-snug text-[0.9rem] md:text-[0.95rem]">
                  {c.intro}
                </p>

                {/* Two-column bullets */}
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-[0.75rem] text-[#4a3a30]/85 font-light"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#2e211b]/40 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Supporting paragraph */}
                <p className="mt-4 flex-1 text-[0.75rem] text-[#5a4a40]/80 font-light leading-relaxed">
                  {c.paragraph}
                </p>

                {/* Divider */}
                <div className="mt-4 h-px w-full bg-[#2e211b]/10" />

                {/* Bottom tagline */}
                <span className="mt-3 font-mono text-[0.5625rem] tracking-[0.26em] uppercase text-[#2e211b]/55 font-bold">
                  {c.tagline}
                </span>
              </motion.article>
            ))}
          </div>

          {/* Shop Now CTA + trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: ease.smooth }}
            className="flex flex-col items-center text-center"
          >
            <motion.button
              onClick={addToCart}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: ease.smooth }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#3a2a22] px-12 py-4 font-mono text-[0.75rem] tracking-[0.28em] uppercase font-black text-[#f7f3ee] shadow-editorial transition-colors duration-300 hover:bg-[#4a3a32]"
            >
              {added ? (
                <>
                  <Check size={16} /> Added to Cart
                </>
              ) : (
                <>
                  Shop Now
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.625rem] tracking-[0.14em] uppercase text-[#7b6a5f]/80">
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-[#c76600]" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-[#c76600]" /> Free shipping
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-[#c76600]" /> Delivery 5–7 Business Days
              </span>
            </div>
          </motion.div>

          {/* Editorial statement */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: ease.smooth }}
            className="relative z-10 mx-auto w-fit max-w-[92vw] overflow-hidden rounded-[1.5rem] bg-[#3a2a22] px-8 py-5 text-center font-display text-[#FAF7F3] tracking-tight leading-[1.12] md:px-12 md:py-6"
            style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.1),transparent_70%)]"
            />
            <span className="relative whitespace-nowrap">
              One philosophy.{" "}
              <span className="italic font-light text-[#e3c187]">Many everyday lives.</span>
            </span>
          </motion.h2>
        </div>
      </section>
    </div>
  );
}
