import { useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease } from "@/design-system";

export const Route = createFileRoute("/_public/story")({
  component: StoryRoute,
});

/* ─── Editorial image placeholder ─────────────────────────────── */
function StoryImage({
  label,
  caption,
  src,
  alt = "",
  aspect = "aspect-[4/5]",
  rounded = "rounded-[2.25rem]",
  className = "",
}: {
  label: string;
  caption?: string;
  src?: string;
  alt?: string;
  aspect?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <figure className={`relative w-full ${className}`}>
      <div
        className={`relative ${aspect} w-full overflow-hidden ${rounded} bg-[#EDE6D8] border border-[#3a2a22]/8`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="block h-px w-10 bg-[#c76600]/30 mb-3" />
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600]/70 uppercase font-medium">
              {label}
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.32em] text-[#3a2a22]/30 mt-1.5 uppercase">
              Image · placeholder
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-start gap-3 max-w-md">
          <span className="mt-2 block h-px w-6 bg-[#c76600]/40 flex-shrink-0" />
          <p className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-[#3a2a22]/50 leading-[1.7]">
            {caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Eyebrow / chapter marker ────────────────────────────────── */
function Chapter({
  number,
  title,
  tone = "warm",
}: {
  number: string;
  title: string;
  tone?: "warm" | "ivory";
}) {
  const color = tone === "ivory" ? "text-[#d9b27a]" : "text-[#c76600]";
  const line = tone === "ivory" ? "bg-[#d9b27a]/40" : "bg-[#c76600]/40";
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`block h-px w-8 ${line}`} />
      <span className={`font-mono text-[0.625rem] tracking-[0.42em] uppercase font-bold ${color}`}>
        {number} · {title}
      </span>
    </div>
  );
}

function StoryRoute() {
  /* Single scroll subscription powers the hero portrait parallax only. */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroParallax = useTransform(heroProgress, [0, 1], [30, -30]);

  /* Enable section-by-section scroll snap only while this page is mounted. */
  useEffect(() => {
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    const prevPad = html.style.scrollPaddingTop;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "0px";
    return () => {
      html.style.scrollSnapType = prevSnap;
      html.style.scrollPaddingTop = prevPad;
    };
  }, []);

  return (
    <div className="relative w-full bg-[#FAF7F3] overflow-x-hidden text-[#3a2a22]">
      {/* ════════════════════════════════════════════════════════════════
         SECTION 01 — FOUNDER STORY
         ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative snap-start pt-24 pb-12 sm:pt-28 sm:pb-16"
      >
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Founder narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth }}
            >
              <Chapter number="CHAPTER ONE" title="Founder" />
              <h1
                className="font-display leading-[1.02] tracking-tight mb-10"
                style={{ fontSize: "clamp(2.4rem, 6.4vw, 5rem)" }}
              >
                A commute that
                <br />
                started a brand
                <span className="block italic font-light text-[#c76600] mt-1">
                  in Nagpur.
                </span>
              </h1>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Every morning, the same scooter. The same sun. The same dust. The dupatta would
                  slip — once, twice, twenty times before reaching the office gate.
                </p>
                <p>
                  We had learned to adapt around discomfort. To accept exposure as routine. To
                  treat protection as something improvised, not designed.
                </p>
                <p className="italic text-[#3a2a22]/80">
                  Soliva began with one question — what if everyday protection were actually
                  engineered for everyday life?
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="block h-px w-10 bg-[#c76600]/40" />
                <span className="font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#3a2a22]/60 font-bold">
                  The Founder · Nagpur, India
                </span>
              </div>
            </motion.div>

            {/* RIGHT — Founder portrait with subtle parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            >
              <motion.div style={{ y: heroParallax }} className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto">
                <StoryImage
                  label="FOUNDER · COMMUTE"
                  src="/founder-commute.webp"
                  alt="Founder · daily commute"
                  aspect="aspect-[4/5]"
                  caption="On the road · 7:42 AM"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 02 — THE DAILY STRUGGLE
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#F3ECE2]/50 border-y border-[#3a2a22]/8 py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: ease.smooth }}
              className="max-w-[26rem] mx-auto lg:mx-0"
            >
              <StoryImage
                label="DUPATTA · ADJUSTMENT"
                aspect="aspect-[4/5]"
                caption="Adjusting · again"
              />
            </motion.div>

            {/* RIGHT — Editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth, delay: 0.1 }}
            >
              <Chapter number="CHAPTER TWO" title="The Daily Struggle" />
              <h2
                className="font-display leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(2rem, 5.2vw, 4rem)" }}
              >
                We learned to{" "}
                <span className="italic font-light text-[#c76600]">adjust.</span>
              </h2>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p className="font-display italic text-[#3a2a22]/80 text-[1.15rem] md:text-[1.25rem] leading-[1.6]">
                  Pull it back. Fix it again. Cover again. Repeat.
                </p>
                <p>
                  What looked like protection was, more honestly, a constant negotiation — with
                  movement, with heat, with attention. The fabric was never designed for the
                  speed, the wind, or the weight of the day.
                </p>
                <p>
                  Discomfort wasn't an event. It was a routine — built quietly into the rhythm
                  of every commute, every afternoon, every long outdoor hour.
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
                {["Adjustment", "Discomfort", "Exposure", "Friction"].map((word, i) => (
                  <li
                    key={word}
                    className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#3a2a22]/55 font-bold"
                  >
                    <span className="block h-px w-4 bg-[#c76600]/40" />
                    0{i + 1} · {word}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 03 — THE OBSERVATION (3-image editorial grid)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start py-12 sm:py-16">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-3xl mb-10 sm:mb-12 text-center mx-auto"
          >
            <div className="flex justify-center">
              <Chapter number="CHAPTER THREE" title="The Observation" />
            </div>
            <h2
              className="font-display leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4.2vw, 3.25rem)" }}
            >
              We started watching{" "}
              <span className="italic font-light text-[#c76600]">how India moves.</span>
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light leading-[1.7]">
              In traffic. On scooters. Outside school gates. Protection improvised, never engineered.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceEarly}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 max-w-5xl mx-auto"
          >
            {[
              { label: "COMMUTING · WOMAN", caption: "7:42 AM · scooter" },
              { label: "SCHOOL · COMMUTE", caption: "Morning · gate" },
              { label: "OFFICE · COMMUTE", caption: "Afternoon · arrival" },
            ].map((img) => (
              <motion.div
                key={img.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, ease: ease.smooth }}
              >
                <StoryImage
                  label={img.label}
                  caption={img.caption}
                  aspect="aspect-[3/4]"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-10 sm:mt-12 max-w-2xl mx-auto text-center font-display italic text-[#3a2a22]/70 leading-[1.5]"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
          >
            What we noticed wasn't a problem with people. It was a gap in what was being made for them.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 04 — THE GAP IN THE MARKET
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#F3ECE2]/40 border-y border-[#3a2a22]/8 py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 sm:mb-14"
          >
            <div className="max-w-2xl">
              <Chapter number="CHAPTER FOUR" title="The Gap in the Market" />
              <h2
                className="font-display leading-[1.06] tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
              >
                Three lives. <br />
                <span className="italic font-light text-[#c76600]">No real product.</span>
              </h2>
            </div>
            <p className="max-w-md text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light italic leading-[1.75]">
              No category in India had been built around the actual movement these three lives
              demand every single day.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceEarly}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10"
          >
            {[
              {
                n: "01",
                tag: "DAILY RIDERS",
                title: "Women commuters",
                body: "Relying on dupattas and stoles built for stillness, not for 60kmph wind, urban heat, and continuous everyday exposure.",
              },
              {
                n: "02",
                tag: "SCHOOL COMMUTES",
                title: "Children",
                body: "Coverings that itch, slip, and feel claustrophobic. Children need protection they will actually choose to wear.",
              },
              {
                n: "03",
                tag: "URBAN MOVEMENT",
                title: "Men with no middle ground",
                body: "Either heavy biker armour or nothing in between. No considered, breathable, everyday choice designed for city motion.",
              },
            ].map((block) => (
              <motion.div
                key={block.n}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, ease: ease.smooth }}
                className="border-t border-[#3a2a22]/12 pt-7"
              >
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-mono text-[1.5rem] tracking-tight text-[#c76600] font-medium">
                    {block.n}
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-[0.32em] uppercase text-[#3a2a22]/55 font-bold">
                    {block.tag}
                  </span>
                </div>
                <h3
                  className="font-display leading-[1.15] tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)" }}
                >
                  {block.title}
                </h3>
                <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-[1.75]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 05 — THE REAL PROBLEM (dark statement)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#3a2a22] text-[#FAF7F3] overflow-hidden py-14">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(245,130,13,0.08),transparent_55%)]" />

        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: ease.smooth }}
            className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
          >
            <Chapter number="CHAPTER FIVE" title="The Real Problem" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
            >
              Heat. Dust. Pollution.
              <span className="block italic font-light text-[#d9b27a] mt-2">
                And the sun that never asked.
              </span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/70 font-light leading-[1.75]">
              The discomfort isn't dramatic — it's daily. Exposure compounds in the background
              of ordinary life, quietly shaping skin, energy, and confidence over years of
              continuous movement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            className="mx-auto max-w-[1040px]"
          >
            <StoryImage
              label="HEAT · DUST · POLLUTION"
              src="/heat-dust-pollution.webp"
              alt="Everyday exposure — heat, dust, pollution"
              aspect="aspect-[21/9]"
              rounded="rounded-[2.5rem]"
              caption="Everyday exposure · 44°C"
              className="[&_.bg-[\\#EDE6D8\\]]:bg-[#2a1d16] [&_.text-[\\#3a2a22\\]\\/30]:text-white/30 [&_.text-[\\#c76600\\]\\/70]:text-[#d9b27a]"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 06 — WHY SOLIVA EXISTS
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start py-12 sm:py-16">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth }}
            >
              <Chapter number="CHAPTER SIX" title="Why Soliva Exists" />
              <h2
                className="font-display leading-[1.04] tracking-tight mb-10"
                style={{ fontSize: "clamp(2.2rem, 5.8vw, 4.25rem)" }}
              >
                Protection that
                <span className="block italic font-light text-[#c76600]">
                  moves with life.
                </span>
              </h2>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Soliva is built around the rhythm of Indian movement — the commutes, the
                  afternoons, the long outdoor hours. Engineered for motion, calibrated for
                  heat, and shaped for everyday wearability.
                </p>
                <p>
                  Not a piece you reach for on holidays or special days. A piece that simply
                  becomes part of how you live.
                </p>
                <p className="font-display italic text-[#3a2a22]/80 text-[1.15rem] md:text-[1.25rem] leading-[1.5]">
                  Quiet protection. Effortless presence. Designed once. Worn every day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: ease.smooth, delay: 0.1 }}
              className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto"
            >
              <StoryImage
                label="SOLIVA · IN USE"
                aspect="aspect-[4/5]"
                caption="On the road · effortless"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 07 — BRAND PRINCIPLES
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#F3ECE2]/45 border-y border-[#3a2a22]/8 py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-3xl mb-10 sm:mb-12"
          >
            <Chapter number="CHAPTER SEVEN" title="Brand Principles" />
            <h2
              className="font-display leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Four ideas
              <span className="italic font-light text-[#c76600]"> we won't compromise on.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceEarly}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 lg:gap-y-0"
          >
            {[
              {
                n: "01",
                title: "Protection First",
                desc: "Every choice begins with what shields the wearer — never what looks cleverer in a brief.",
              },
              {
                n: "02",
                title: "Designed for India",
                desc: "Calibrated for Indian heat, dust, pollution, and the geometries of how India actually moves.",
              },
              {
                n: "03",
                title: "Everyday Wearability",
                desc: "Quiet, lightweight, breathable — protection that becomes part of routine, not a costume for it.",
              },
              {
                n: "04",
                title: "Accessible Protection",
                desc: "Considered design, made for real lives — not reserved for an elite few or a marketing photograph.",
              },
            ].map((pillar) => (
              <motion.div
                key={pillar.n}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.9, ease: ease.smooth }}
                className="relative lg:border-l lg:first:border-l-0 lg:border-[#3a2a22]/12 lg:pl-8"
              >
                <span className="font-mono text-[0.625rem] tracking-[0.4em] uppercase text-[#c76600] font-bold block mb-5">
                  Principle {pillar.n}
                </span>
                <h3
                  className="font-display leading-[1.15] tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.35rem, 2vw, 1.65rem)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-[1.75] max-w-xs">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 08 — VISION (Now / Next / Future timeline)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start py-12 sm:py-16">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-3xl mb-14"
          >
            <Chapter number="CHAPTER EIGHT" title="Vision" />
            <h2
              className="font-display leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              One product today.
              <span className="block italic font-light text-[#c76600]">
                A complete system tomorrow.
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Editorial timeline rail */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: ease.smooth }}
              className="hidden md:block absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-[#c76600]/40 to-transparent origin-left"
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceEarly}
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
              className="grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-10"
            >
              {[
                {
                  marker: "NOW",
                  title: "Soliva AirShield Wrap",
                  desc: "Our first product. Engineered for the daily commute, the long ride, the everyday exposure.",
                },
                {
                  marker: "NEXT",
                  title: "Neck, Face & Kids Systems",
                  desc: "Integrated coverage and a gentle line for school commutes and outdoor childhood movement.",
                },
                {
                  marker: "FUTURE",
                  title: "A Complete Ecosystem",
                  desc: "A considered family of urban mobility essentials — protection thoughtfully woven into everyday Indian life.",
                },
              ].map((step) => (
                <motion.div
                  key={step.marker}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 1, ease: ease.smooth }}
                  className="relative flex flex-col items-start text-left"
                >
                  <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#FAF7F3] border border-[#c76600]/50 mb-6">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#c76600]" />
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.42em] uppercase text-[#c76600] font-bold mb-4">
                    {step.marker}
                  </span>
                  <h3
                    className="font-display leading-[1.15] tracking-tight mb-4"
                    style={{ fontSize: "clamp(1.45rem, 2.2vw, 1.85rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-[1.75] max-w-xs">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         FINAL — EMOTIONAL CLOSING
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#3a2a22] text-[#FAF7F3] overflow-hidden py-14">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(245,130,13,0.07),transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: ease.smooth }}
            className="text-center max-w-4xl mx-auto"
          >
            <Chapter number="EPILOGUE" title="Where this is going" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7.4vw, 5.75rem)" }}
            >
              This began on one scooter.
              <span className="block italic font-light text-[#d9b27a] mt-2">
                It belongs to every commute.
              </span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/65 font-light italic leading-[1.75]">
              A quiet protection system, built for the way India moves — one wearer, one
              everyday, one calmer commute at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            className="mt-10 sm:mt-12 mx-auto max-w-[1040px]"
          >
            <StoryImage
              label="SOLIVA · COMMUNITY"
              aspect="aspect-[21/9]"
              rounded="rounded-[2.5rem]"
              caption="A protection system · in motion"
              className="[&_.bg-[\\#EDE6D8\\]]:bg-[#2a1d16] [&_.text-[\\#3a2a22\\]\\/30]:text-white/30 [&_.text-[\\#c76600\\]\\/70]:text-[#d9b27a]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/collection"
              className="px-10 py-5 rounded-full bg-[#FAF7F3] text-[#3a2a22] font-mono text-[0.625rem] tracking-[0.32em] uppercase font-bold transition-[transform,background-color] duration-300 hover:bg-[#d9b27a] hover:-translate-y-0.5"
            >
              Explore the Collection
            </Link>
            <Link
              to="/technology"
              className="px-10 py-5 rounded-full border border-[#FAF7F3]/25 text-[#FAF7F3] font-mono text-[0.625rem] tracking-[0.32em] uppercase font-bold transition-[transform,background-color] duration-300 hover:bg-[#FAF7F3]/8 hover:-translate-y-0.5"
            >
              Read the Technology
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
