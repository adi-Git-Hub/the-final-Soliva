import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════
 * SOLIVA — Comparison Section
 * Editorial split-screen poster (magazine spread), NOT side-by-side cards.
 * One continuous canvas: cool-grey "Traditional" half | warm-ivory "Soliva"
 * half, joined by a centre divider with a floating VS badge. Campaign images
 * are embedded into each half's lower corner (no cards, no large radius).
 * Playfair Display + palette scoped to this file — no global changes.
 * ════════════════════════════════════════════════════════════════════════ */

const SERIF = '"Inter", system-ui, sans-serif';
const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#B88445";

type HalfData = {
  kicker: string;
  title: string;
  subtitle: string;
  points: string[];
  footer: string;
  image: string;
  alt: string;
};

const LEFT: HalfData = {
  kicker: "Traditional",
  title: "Borrowed Protection",
  subtitle: "Built to cover. Not built to protect.",
  points: [
    "Slips while moving",
    "Constant repositioning",
    "Gaps around ears & neck",
    "Heat trapped inside",
    "Designed for coverage, not exposure",
  ],
  footer: "Everyday adjustment became everyday habit.",
  image: "/product_images/Gemini_Generated_Image_e61dwqe61dwqe61d.png",
  alt: "Traditional dupatta wrapped over the face — borrowed protection that slips and needs constant adjustment",
};

const RIGHT: HalfData = {
  kicker: "Soliva",
  title: "Protection System™",
  subtitle: "Thoughtfully designed for everyday exposure.",
  points: [
    "Full face, neck & back coverage",
    "Designed for movement",
    "Breathable long-wear comfort",
    "Stays structured all day",
    "Built for everyday exposure",
  ],
  footer: "Protection should quietly work in the background.",
  image: "/DSC05489.webp",
  alt: "Soliva Protection System designed for everyday movement and exposure",
};

/* ── The everyday adjustment cycle — illustration strip (sliced from source) ── */
const STEPS = [
  { img: "/adjust-1.webp", label: "Pull it back." },
  { img: "/adjust-2.webp", label: "Fix it again." },
  { img: "/adjust-3.webp", label: "Cover again." },
  { img: "/adjust-4.webp", label: "Move again." },
  { img: "/adjust-5.webp", label: "Repeat." },
];

/* ── Thin editorial marks ── */
function Check({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true">
      <path d="M5 12.5l4 4L19 6.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden="true">
      <path d="M7 7l10 10M17 7L7 17" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ── One half of the poster ── */
function Half({ data, side }: { data: HalfData; side: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const isSoliva = side === "right";
  const bg = isSoliva ? "#F6EFE4" : "#E9E9EC";
  const kickerColor = isSoliva ? ACCENT : "rgba(45,36,30,0.42)";
  const titleColor = isSoliva ? "#2D241E" : "rgba(45,36,30,0.78)";
  const subColor = isSoliva ? ACCENT : "rgba(45,36,30,0.5)";
  const line = isSoliva ? "rgba(45,36,30,0.12)" : "rgba(45,36,30,0.1)";
  const textColor = isSoliva ? "#2D241E" : "rgba(45,36,30,0.6)";
  const markColor = isSoliva ? ACCENT : "rgba(45,36,30,0.45)";

  const Features = (
    <ul
      className={`order-1 flex flex-col justify-center px-7 py-6 lg:px-12 lg:py-10 ${
        isSoliva ? "md:order-1" : "md:order-2"
      }`}
    >
      {data.points.map((p, i) => (
        <motion.li
          key={p}
          initial={{ opacity: 0, x: isSoliva ? 16 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.07 }}
          className="flex items-center gap-4 border-b py-3.5 last:border-b-0 sm:py-4 lg:py-5"
          style={{ borderColor: line }}
        >
          <span
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full sm:h-[32px] sm:w-[32px]"
            style={{ backgroundColor: isSoliva ? "rgba(184,132,69,0.12)" : "rgba(45,36,30,0.05)" }}
          >
            {isSoliva ? <Check color={markColor} /> : <Cross color={markColor} />}
          </span>
          <span
            className="text-[0.95rem] leading-snug sm:text-[1.05rem] lg:text-[1.12rem]"
            style={{ color: textColor, fontWeight: isSoliva ? 500 : 400 }}
          >
            {p}
          </span>
        </motion.li>
      ))}
    </ul>
  );

  const Image = (
    <div
      className={`relative order-2 h-[320px] self-end overflow-hidden sm:h-[420px] lg:h-[520px] ${
        isSoliva ? "md:order-2" : "md:order-1"
      }`}
    >
      <motion.img
        src={data.image}
        alt={data.alt}
        loading="lazy"
        style={{
          y: reduce ? 0 : imgY,
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 13%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 13%)",
        }}
        className="absolute inset-x-0 bottom-0 h-[110%] w-full scale-[1.02] object-cover object-top"
      />
      {/* warm/cool wash so the image melts into the half */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${bg} 0%, transparent 20%, transparent 92%, ${bg} 100%)` }}
      />
    </div>
  );

  return (
    <div ref={ref} className="relative flex flex-col" style={{ backgroundColor: bg }}>
      {/* Heading block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE }}
        className={`px-5 pt-6 lg:px-8 lg:pt-8 ${isSoliva ? "lg:pl-12" : "lg:pr-12"}`}
      >
        <span
          className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.42em]"
          style={{ color: kickerColor }}
        >
          {data.kicker}
        </span>
        <h3
          className="text-[1.4rem] uppercase leading-[1.04] tracking-tight sm:text-[1.8rem] lg:text-[2.2rem]"
          style={{ fontFamily: SERIF, color: titleColor }}
        >
          {data.title.replace(/™$/, "")}
        </h3>
        <p
          className="mt-2 text-[0.95rem] italic sm:text-[1.1rem] lg:text-[1.2rem]"
          style={{ fontFamily: SERIF, color: subColor }}
        >
          {data.subtitle}
        </p>
      </motion.div>

      {/* Image + features composition */}
      <div className="mt-4 grid flex-1 grid-cols-1 items-stretch md:mt-5 md:grid-cols-2">
        {Features}
        {Image}
      </div>

      {/* Footer strip */}
      <div className="border-t px-5 py-3 lg:px-8 lg:py-4" style={{ borderColor: line }}>
        <p className="text-[0.95rem] italic sm:text-[1rem]" style={{ fontFamily: SERIF, color: subColor }}>
          {data.footer}
        </p>
      </div>
    </div>
  );
}

export function CompareSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="compare-heading"
      className="m-compare relative z-20 flex w-full flex-col items-center px-4 py-12 sm:px-8 sm:py-16"
      style={{ backgroundColor: "#F7F3EC", color: "#2D241E" }}
    >

      <div className="relative mx-auto w-full max-w-[84rem]">
        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto mb-9 max-w-2xl text-center md:mb-12"
        >
          <h2
            id="compare-heading"
            className="text-[1.9rem] leading-[1.04] sm:text-4xl md:text-5xl"
            style={{ fontFamily: SERIF, color: "#2D241E" }}
          >
            Still adjusting <span className="italic" style={{ color: ACCENT }}>everyday?</span>
          </h2>
          <p className="mx-auto mt-3 text-[0.9rem] leading-relaxed sm:whitespace-nowrap sm:text-[0.95rem]" style={{ color: "rgba(45,36,30,0.6)" }}>
            What feels like protection isn't always designed for everyday exposure.
          </p>
        </motion.header>

        {/* ── EDITORIAL SPLIT-SCREEN CANVAS ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative grid grid-cols-1 overflow-hidden rounded-[20px] md:grid-cols-2"
          style={{ boxShadow: "0 40px 90px -50px rgba(45,36,30,0.4)", border: "1px solid rgba(45,36,30,0.08)" }}
        >
          <Half data={LEFT} side="left" />
          <Half data={RIGHT} side="right" />

          {/* centre vertical divider (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            style={{ originY: 0, backgroundColor: "rgba(45,36,30,0.14)" }}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          />

          {/* floating VS badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-[4rem] w-[4rem] items-center justify-center rounded-full sm:h-[4.5rem] sm:w-[4.5rem] lg:h-[5.5rem] lg:w-[5.5rem]"
              style={{
                backgroundColor: "#FBF8F4",
                boxShadow: "0 32px 64px -20px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.85)",
                border: "1px solid rgba(45,36,30,0.12)",
              }}
            >
              <span className="text-xl italic sm:text-2xl lg:text-3xl" style={{ fontFamily: SERIF, color: "#2D241E" }}>
                vs
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ════ THE ADJUSTMENT CYCLE — continuation of the same comparison story ════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-12 w-full md:mt-16"
        >
          {/* bridge line — ties the panel above into the sequence below */}
          <p
            className="text-center text-[0.95rem] italic sm:text-[1.05rem]"
            style={{ fontFamily: SERIF, color: "rgba(45,36,30,0.55)" }}
          >
            Covered doesn't always mean protected.
          </p>

          {/* question heading */}
          <h3
            className="mx-auto mt-3 text-center text-[1.5rem] leading-[1.12] sm:text-[2rem] md:text-[2.2rem] lg:whitespace-nowrap"
            style={{ fontFamily: SERIF, color: "#2D241E" }}
          >
            How many times do you adjust protection{" "}
            <span className="italic" style={{ color: ACCENT }}>
              everyday?
            </span>
          </h3>

          {/* 5-step adjustment illustration row — single row on desktop, swipe on mobile */}
          <ul className="mx-auto mt-8 flex max-w-[72rem] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="flex w-[46%] shrink-0 snap-center flex-col items-center px-3 first:border-l-0 sm:w-[33%] sm:px-5 md:w-auto md:border-l"
                style={{ borderColor: "rgba(45,36,30,0.10)" }}
              >
                <div className="flex h-24 w-full items-end justify-center sm:h-28 md:h-32">
                  <img
                    src={s.img}
                    alt={`Adjusting traditional protection: ${s.label}`}
                    loading="lazy"
                    className="h-full w-auto max-w-full object-contain"
                  />
                </div>
                <span
                  className="mt-3 text-center text-[0.9rem] italic sm:text-[0.98rem]"
                  style={{ fontFamily: SERIF, color: "rgba(45,36,30,0.78)" }}
                >
                  {s.label}
                </span>
              </motion.li>
            ))}
          </ul>

        {/* resolution — question → solution → CTA */}
          <div className="mt-8 flex flex-col items-center text-center md:mt-10">
            <h3
              className="mx-auto text-[1.3rem] leading-[1.14] sm:text-[1.7rem] md:text-[1.9rem] lg:whitespace-nowrap"
              style={{ fontFamily: SERIF, color: "#2D241E" }}
            >
              Why should protection work{" "}
              <span className="italic" style={{ color: ACCENT }}>
                harder than life?
              </span>
            </h3>
            <p
              className="mt-2 text-[0.9rem] italic sm:text-[0.95rem]"
              style={{ fontFamily: SERIF, color: "rgba(45,36,30,0.55)" }}
            >
              Move beyond adjustment.
            </p>
            <Link
              to="/collection"
              className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#2D241E] px-8 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#F7F3EC] shadow-[0_18px_40px_-18px_rgba(45,36,30,0.5)] transition-[transform,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#B88445]"
            >
              Discover Soliva
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
