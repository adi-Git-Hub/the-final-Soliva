import { useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease } from "@/design-system";

export const Route = createFileRoute("/_public/technology")({
  component: HowItWorksRoute,
});

/* ─── Editorial image placeholder ─────────────────────────────── */
function StoryImage({
  label,
  caption,
  src,
  alt = "",
  aspect = "aspect-[4/5]",
  rounded = "rounded-[2.25rem]",
  tone = "warm",
  className = "",
}: {
  label: string;
  caption?: string;
  src?: string;
  alt?: string;
  aspect?: string;
  rounded?: string;
  tone?: "warm" | "dark";
  className?: string;
}) {
  const t =
    tone === "dark"
      ? {
          bg: "bg-[#2a1d16]",
          border: "border-white/8",
          rule: "bg-[#d9b27a]/40",
          label: "text-[#d9b27a]/80",
          sub: "text-white/30",
          captionRule: "bg-[#d9b27a]/40",
          caption: "text-white/40",
        }
      : {
          bg: "bg-[#EDE6D8]",
          border: "border-[#3a2a22]/8",
          rule: "bg-[#c76600]/30",
          label: "text-[#c76600]/70",
          sub: "text-[#3a2a22]/30",
          captionRule: "bg-[#c76600]/40",
          caption: "text-[#3a2a22]/50",
        };
  return (
    <figure className={`relative w-full ${className}`}>
      <div className={`relative ${aspect} w-full overflow-hidden ${rounded} ${t.bg} border ${t.border}`}>
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
            <span className={`block h-px w-10 ${t.rule} mb-3`} />
            <span className={`font-mono text-[0.625rem] tracking-[0.4em] uppercase font-medium ${t.label}`}>
              {label}
            </span>
            <span className={`font-mono text-[0.5rem] tracking-[0.32em] mt-1.5 uppercase ${t.sub}`}>
              Image · placeholder
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-start gap-3 max-w-md">
          <span className={`mt-2 block h-px w-6 ${t.captionRule} flex-shrink-0`} />
          <p className={`font-mono text-[0.625rem] tracking-[0.2em] uppercase leading-[1.7] ${t.caption}`}>
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

function HowItWorksRoute() {
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
         SECTION 01 — INTRO · DESIGNED TO PROTECT
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth }}
            >
              <Chapter number="CHAPTER ONE" title="The Idea" />
              <h1
                className="font-display leading-[1.02] tracking-tight mb-10"
                style={{ fontSize: "clamp(2.4rem, 6.4vw, 5rem)" }}
              >
                Designed to Protect.
                <span className="block italic font-light text-[#c76600] mt-1">
                  Built for everyday life.
                </span>
              </h1>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Every day, your skin is exposed to sun, dust, heat, and pollution. Yet most
                  coverings were never designed to actually solve these challenges.
                </p>
                <p>
                  Soliva was created to rethink everyday protection — through thoughtful coverage,
                  breathable comfort, and effortless wearability for the way India moves.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="block h-px w-10 bg-[#c76600]/40" />
                <span className="font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#3a2a22]/60 font-bold">
                  How it works · The thinking behind Soliva
                </span>
              </div>
            </motion.div>

            {/* RIGHT — Lifestyle image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            >
              <div className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto">
                <StoryImage
                  label="WARM SUNLIGHT · COMMUTE"
                  aspect="aspect-[4/5]"
                  caption="Calm confidence · 8:14 AM"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 02 — PROTECTION, BY DESIGN
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#F3ECE2]/50 border-y border-[#3a2a22]/8 py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Fabric closeup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: ease.smooth }}
              className="max-w-[26rem] mx-auto lg:mx-0"
            >
              <StoryImage
                label="FABRIC · CLOSE-UP"
                aspect="aspect-[4/5]"
                caption="Weave · sunlight interaction"
              />
            </motion.div>

            {/* RIGHT — Editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth, delay: 0.1 }}
            >
              <Chapter number="CHAPTER TWO" title="Protection, By Design" />
              <h2
                className="font-display leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(2rem, 5.2vw, 4rem)" }}
              >
                Protection begins
                <span className="block italic font-light text-[#c76600]">
                  with thoughtful design.
                </span>
              </h2>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Soliva incorporates UPF 50+ protective fabric to help reduce everyday UV
                  exposure during daily commutes, errands, and long outdoor hours.
                </p>
                <p className="font-display italic text-[#3a2a22]/80 text-[1.15rem] md:text-[1.25rem] leading-[1.6]">
                  Not an afterthought. A foundation.
                </p>
                <p>
                  Protection is built into the fabric itself — quietly, consistently, and from
                  the first thread up.
                </p>
              </div>

              <div className="mt-10 inline-flex items-center gap-4 border-t border-[#3a2a22]/12 pt-5">
                <span className="font-mono text-[0.625rem] tracking-[0.42em] uppercase text-[#c76600] font-bold">
                  UPF 50+
                </span>
                <span className="block h-px w-6 bg-[#3a2a22]/20" />
                <span className="font-mono text-[0.625rem] tracking-[0.32em] uppercase text-[#3a2a22]/55 font-bold">
                  Everyday UV defence
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 03 — COMFORT WITHOUT COMPROMISE
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
              <Chapter number="CHAPTER THREE" title="Comfort Without Compromise" />
            </div>
            <h2
              className="font-display leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(1.95rem, 4.6vw, 3.5rem)" }}
            >
              Protection should never feel
              <span className="block italic font-light text-[#c76600]">
                heavy, restrictive, or worn.
              </span>
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light leading-[1.7]">
              A thoughtfully layered construction balances coverage and breathability — so Soliva
              remains calm and unobtrusive through every hour of daily wear.
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
              { label: "AIRFLOW · BREATH", caption: "Breathable layers" },
              { label: "MOTION · FABRIC", caption: "Natural movement" },
              { label: "LIGHTWEIGHT · WEAR", caption: "All-day comfort" },
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
            Comfort isn't the absence of protection — it's the quiet evidence of it.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 04 — COVERAGE WHERE IT MATTERS
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] snap-start flex items-center bg-[#F3ECE2]/40 border-y border-[#3a2a22]/8 py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Editorial copy + coverage pillars */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth }}
            >
              <Chapter number="CHAPTER FOUR" title="Coverage Where It Matters" />
              <h2
                className="font-display leading-[1.04] tracking-tight mb-8"
                style={{ fontSize: "clamp(2rem, 5.2vw, 3.85rem)" }}
              >
                Where makeshift solutions
                <span className="block italic font-light text-[#c76600]">
                  quietly leave gaps.
                </span>
              </h2>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Soliva is intentionally shaped to help cover the face, nose, ears, neck, and
                  back — the areas most commonly exposed during everyday movement.
                </p>
                <p className="font-display italic text-[#3a2a22]/80 text-[1.1rem] md:text-[1.2rem] leading-[1.55]">
                  A more complete protection experience, by design.
                </p>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
                {["Face", "Nose", "Ears", "Neck", "Back", "Shoulders"].map((zone, i) => (
                  <li
                    key={zone}
                    className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#3a2a22]/55 font-bold"
                  >
                    <span className="block h-px w-4 bg-[#c76600]/40" />
                    0{i + 1} · {zone}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* RIGHT — Coverage visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: ease.smooth, delay: 0.1 }}
              className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto"
            >
              <StoryImage
                label="COVERAGE · ZONES"
                aspect="aspect-[4/5]"
                caption="Front · side · back"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 05 — BUILT FOR INDIAN CONDITIONS (dark statement)
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
            <Chapter number="CHAPTER FIVE" title="Built for Indian Conditions" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 6.4vw, 5rem)" }}
            >
              Heat. Dust. Pollution.
              <span className="block italic font-light text-[#d9b27a] mt-2">
                Movement.
              </span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/70 font-light leading-[1.75]">
              From daily commutes and college rides to errands and long outdoor hours, Soliva is
              designed for the realities of Indian environments — not generalised conditions, but
              the ones people actually face every day.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["Daily Commutes", "Urban Movement", "Long Outdoor Hours", "Everyday Exposure"].map(
                (line) => (
                  <span
                    key={line}
                    className="font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#d9b27a]/85 font-bold"
                  >
                    {line}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            className="mx-auto max-w-[1040px]"
          >
            <StoryImage
              label="INDIAN URBAN · COMMUTE"
              aspect="aspect-[21/9]"
              rounded="rounded-[2.5rem]"
              caption="Real-world environments · daily"
              tone="dark"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         SECTION 06 — CLOSING · THOUGHTFULLY LAYERED, EFFORTLESSLY WORN
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
            <Chapter number="EPILOGUE" title="The Promise" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7.4vw, 5.75rem)" }}
            >
              Thoughtfully layered.
              <span className="block italic font-light text-[#d9b27a] mt-2">
                Effortlessly worn.
              </span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/65 font-light italic leading-[1.75]">
              Because protection should feel as natural as stepping out.
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
              label="SOLIVA · WORN EFFORTLESSLY"
              aspect="aspect-[21/9]"
              rounded="rounded-[2.5rem]"
              caption="On the road · everyday"
              tone="dark"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 sm:mt-12 flex justify-center"
          >
            <Link
              to="/collection"
              className="px-12 py-5 rounded-full bg-[#FAF7F3] text-[#3a2a22] font-mono text-[0.625rem] tracking-[0.32em] uppercase font-bold transition-[transform,background-color] duration-300 hover:bg-[#d9b27a] hover:-translate-y-0.5"
            >
              Explore the Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
