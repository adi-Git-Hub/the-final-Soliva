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
  image: "/IMG_6255.jpg",
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
  image: "/IMG_3739.jpg",
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
      <path d="M5 12.5l4 4L19 6.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  const isSoliva = side === "right";
  // Symmetrical logic: Left side (Traditional) = Image Left, Content Right
  // Right side (Soliva) = Content Left, Image Right
  const isImageLeft = !isSoliva;

  const bg = isSoliva ? "#F6EFE4" : "#E9E9EC";
  const kickerColor = isSoliva ? ACCENT : "rgba(45,36,30,0.42)";
  const titleColor = isSoliva ? "#2D241E" : "rgba(45,36,30,0.78)";
  const subColor = isSoliva ? ACCENT : "rgba(45,36,30,0.5)";
  const line = isSoliva ? "rgba(45,36,30,0.12)" : "rgba(45,36,30,0.1)";
  const textColor = isSoliva ? "#2D241E" : "rgba(45,36,30,0.6)";
  const markColor = isSoliva ? ACCENT : "rgba(45,36,30,0.45)";

  const Content = (
    <div className={`flex flex-col justify-start w-full lg:w-1/2 px-4 pt-8 pb-4 md:px-6 md:pt-10 lg:px-8 lg:pt-12 z-10 relative ${isImageLeft ? "order-2" : "order-1"}`}>
      {/* Heading block */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col mb-4 md:mb-5"
      >
        <span
          className="mb-1 block text-[0.55rem] font-semibold uppercase tracking-[0.42em]"
          style={{ color: kickerColor }}
        >
          {data.kicker}
        </span>
        <h3
          className="text-[1.1rem] uppercase leading-[1.04] tracking-tight sm:text-[1.25rem] lg:text-[1.4rem] whitespace-nowrap"
          style={{ fontFamily: SERIF, color: titleColor }}
        >
          {data.title.replace(/™$/, "")}
        </h3>
        <p
          className="mt-1 text-[0.75rem] italic sm:text-[0.85rem] lg:text-[0.95rem]"
          style={{ fontFamily: SERIF, color: subColor }}
        >
          {data.subtitle}
        </p>
      </motion.div>

      <ul className="flex flex-col border-t pt-1.5" style={{ borderColor: line }}>
        {data.points.map((p, i) => (
          <motion.li
            key={p}
            initial={{ opacity: 0, x: isSoliva ? 6 : -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.04 }}
            className="flex items-center gap-3 border-b py-2 last:border-b-0 sm:py-2.5"
            style={{ borderColor: line }}
          >
            <span
              className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full sm:h-[22px] sm:w-[22px]"
              style={{ backgroundColor: isSoliva ? "rgba(184,132,69,0.12)" : "rgba(45,36,30,0.05)" }}
            >
              {isSoliva ? <Check color={markColor} /> : <Cross color={markColor} />}
            </span>
            <span
              className="text-[0.75rem] leading-snug sm:text-[0.85rem] lg:text-[0.95rem]"
              style={{ color: textColor, fontWeight: isSoliva ? 500 : 400 }}
            >
              {p}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Footer strip */}
      <div className="mt-3 pt-3 border-t" style={{ borderColor: line }}>
        <p className="text-[0.75rem] italic sm:text-[0.85rem]" style={{ fontFamily: SERIF, color: subColor }}>
          {data.footer}
        </p>
      </div>
    </div>
  );

  const Image = (
    <div className={`relative w-full lg:w-1/2 min-h-[200px] sm:min-h-[260px] lg:min-h-[380px] xl:min-h-[420px] overflow-hidden flex items-end justify-center ${isImageLeft ? "order-1" : "order-2"}`}>
      <motion.img
        src={data.image}
        alt={data.alt}
        loading="lazy"
        style={{
          y: reduce ? 0 : imgY,
          WebkitMaskImage: isImageLeft 
            ? "linear-gradient(to left, transparent 0%, black 15%)" 
            : "linear-gradient(to right, transparent 0%, black 15%)",
          maskImage: isImageLeft 
            ? "linear-gradient(to left, transparent 0%, black 15%)" 
            : "linear-gradient(to right, transparent 0%, black 15%)",
        }}
        className="absolute inset-0 h-full w-full object-cover object-[center_25%] scale-[1.02]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ 
          background: isImageLeft
            ? `linear-gradient(to left, ${bg} 0%, transparent 40%)` 
            : `linear-gradient(to right, ${bg} 0%, transparent 40%)` 
        }}
      />
    </div>
  );

  return (
    <div ref={ref} className="relative flex flex-col lg:flex-row items-stretch w-full overflow-hidden" style={{ backgroundColor: bg }}>
      {Content}
      {Image}
    </div>
  );
}

export function CompareSection() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="compare-heading"
      // Reduced top padding to sit tighter with the marquee strip
      className="m-compare relative z-10 flex w-full flex-col items-center px-4 pt-12 pb-4 sm:px-8 sm:pt-16 sm:pb-6 md:pt-20 lg:min-h-screen lg:justify-center"
      style={{ backgroundColor: "#F7F3EC", color: "#2D241E" }}
    >
      <div className="relative mx-auto w-full max-w-[84rem]">
        {/* ── HEADER ── */}
        <motion.header
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          // Reduced margin-bottom from mb-3 to mb-2 to pull table up
          className="mx-auto mb-2 max-w-2xl text-center md:mb-3"
        >
          <h2
            id="compare-heading"
            className="text-[1.5rem] leading-[1.04] sm:text-[2rem] md:text-[2.6rem]"
            style={{ fontFamily: SERIF, color: "#2D241E" }}
          >
            Still adjusting <span className="italic" style={{ color: ACCENT }}>everyday?</span>
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col w-full"
        >
          <div
            className="relative grid grid-cols-1 overflow-hidden rounded-[16px] md:grid-cols-2"
            style={{ boxShadow: "0 20px 40px -15px rgba(45,36,30,0.3)", border: "1px solid rgba(45,36,30,0.08)" }}
          >
            <Half data={LEFT} side="left" />
            <Half data={RIGHT} side="right" />

            {/* centre vertical divider (desktop) */}
            <div
              style={{ backgroundColor: "rgba(45,36,30,0.14)" }}
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            />

            {/* floating VS badge */}
            <div
              className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full sm:h-[3.2rem] sm:w-[3.2rem]"
                style={{
                  backgroundColor: "#FBF8F4",
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)",
                  border: "1px solid rgba(45,36,30,0.12)",
                }}
              >
                <span className="text-[0.7rem] italic sm:text-[0.8rem] lg:text-[1rem]" style={{ fontFamily: SERIF, color: "#2D241E" }}>
                  vs
                </span>
              </motion.div>
            </div>
          </div>

          <div className="mt-3 w-full md:mt-4 flex flex-col">
            <div className="flex items-center gap-3 px-2 md:px-4 mb-2 justify-center">
              <span className="h-px flex-1" style={{ backgroundColor: "rgba(45,36,30,0.06)" }} />
              <p
                className="text-[0.7rem] uppercase tracking-[0.24em] font-semibold md:text-[0.85rem] whitespace-nowrap"
                style={{ fontFamily: SERIF, color: "rgba(45,36,30,0.45)" }}
              >
                The Everyday Adjustment Cycle
              </p>
              <span className="h-px flex-1" style={{ backgroundColor: "rgba(45,36,30,0.06)" }} />
            </div>

            <ul className="mx-auto flex w-full max-w-[68rem] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              {STEPS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.05 }}
                  className="flex w-[35%] shrink-0 snap-center flex-col items-center px-2 first:border-l-0 sm:w-[25%] sm:px-3 md:w-auto md:border-l"
                  style={{ borderColor: "rgba(45,36,30,0.10)" }}
                >
                  <div className="flex h-12 w-full items-end justify-center sm:h-16 md:h-20">
                    <img
                      src={s.img}
                      alt={`Adjusting traditional protection: ${s.label}`}
                      loading="lazy"
                      className="h-full w-auto max-w-full object-contain"
                    />
                  </div>
                  <span
                    className="mt-1.5 text-center text-[0.7rem] italic sm:text-[0.8rem] md:text-[0.9rem]"
                    style={{ fontFamily: SERIF, color: "rgba(45,36,30,0.78)" }}
                  >
                    {s.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── 3D CTA BUTTON ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-6 flex justify-center md:mt-8"
          >
            <Link to="/collection" className="group relative">
              {/* Button Shadow/Base (3D) */}
              <div
                className="absolute inset-0 translate-y-1 rounded-full transition-transform duration-200 group-hover:translate-y-1.5"
                style={{ backgroundColor: "rgba(184,132,69,0.25)", filter: "blur(4px)" }}
              />
              
              {/* Button Face */}
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                className="relative flex items-center gap-3 rounded-full border px-8 py-3.5 transition-colors sm:px-10 lg:px-12"
                style={{ 
                  backgroundColor: "#2D241E", 
                  borderColor: ACCENT,
                  boxShadow: "0 10px 20px -10px rgba(0,0,0,0.5)"
                }}
              >
                <span 
                  className="text-[0.85rem] font-medium uppercase tracking-[0.18em] text-white sm:text-[0.9rem]"
                  style={{ fontFamily: SERIF }}
                >
                  Shop Now
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
