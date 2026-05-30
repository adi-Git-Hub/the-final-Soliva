import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";
import {
  SunlightVisual,
  ProtectionRings,
  AirflowSystem,
  CoverageFigure,
  EnvironmentSystem,
  LayeredEpilogue,
} from "@/components/technology/visuals";

export const Route = createFileRoute("/_public/technology")({
  component: HowItWorksRoute,
  head: () => ({
    meta: [
      { title: "How It Works — Soliva Protection System" },
      {
        name: "description",
        content:
          "An engineered protection system for modern movement — UPF 50+, breathable airflow, and complete coverage, thoughtfully designed.",
      },
    ],
  }),
});

/* ─── Chapter marker ──────────────────────────────────────────────── */
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

/* ─── Subtle one-time perspective-depth settle (no continuous motion) ── */
function Depth({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ perspective: "1400px" }}>
      <motion.div
        initial={{ opacity: 0, rotateX: 6, y: 26 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.3, ease: ease.luxe }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function HowItWorksRoute() {
  return (
    <div className="relative w-full bg-[#FAF7F3] overflow-x-hidden text-[#3a2a22]">
      {/* ══════════════════════ CHAPTER ONE — DESIGNED TO PROTECT ══════════════════════ */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
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
                  Every day, your skin meets sun, dust, heat, and pollution. Yet most coverings were
                  never engineered to actually answer these conditions.
                </p>
                <p>
                  Soliva is a protection system — thoughtful coverage, breathable comfort, and
                  effortless wearability, designed for the way modern India moves.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <span className="block h-px w-10 bg-[#c76600]/40" />
                <span className="font-mono text-[0.6875rem] tracking-[0.32em] uppercase text-[#3a2a22]/60 font-bold">
                  How it works · The engineering behind calm confidence
                </span>
              </div>
            </motion.div>

            <div className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto w-full">
              <SunlightVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ CHAPTER TWO — PROTECTION, BY DESIGN ══════════════════════ */}
      <section className="relative flex items-center bg-[#F3ECE2]/50 border-y border-[#3a2a22]/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center">
            <Depth className="order-2 lg:order-1">
              <ProtectionRings />
            </Depth>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <Chapter number="CHAPTER TWO" title="Protection, By Design" />
              <h2
                className="font-display leading-[1.05] tracking-tight mb-8"
                style={{ fontSize: "clamp(2rem, 5.2vw, 4rem)" }}
              >
                Protection begins
                <span className="block italic font-light text-[#c76600]">
                  inside the fabric.
                </span>
              </h2>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Soliva is built with UPF 50+ protective fabric — engineered so more than 98% of UV
                  is blocked before it ever reaches skin, through commutes, errands, and long outdoor
                  hours.
                </p>
                <p className="font-display italic text-[#3a2a22]/80 text-[1.15rem] md:text-[1.25rem] leading-[1.6]">
                  Not an afterthought. A foundation.
                </p>
                <p>
                  Layer by layer, protection is woven into the material itself — quietly, consistently,
                  from the first thread up.
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

      {/* ══════════════════════ CHAPTER THREE — COMFORT WITHOUT COMPROMISE ══════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-3xl mb-12 sm:mb-16 text-center mx-auto"
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
              A thoughtfully layered construction routes air through the weave and lets heat escape —
              so Soliva stays calm and unobtrusive through every hour of wear.
            </p>
          </motion.div>

          <Depth className="max-w-[60rem] mx-auto">
            <AirflowSystem />
          </Depth>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 sm:mt-16 max-w-2xl mx-auto text-center font-display italic text-[#3a2a22]/70 leading-[1.5]"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
          >
            Comfort isn't the absence of protection — it's the quiet evidence of it.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════ CHAPTER FOUR — COVERAGE WHERE IT MATTERS ══════════════════════ */}
      <section className="relative flex items-center bg-[#F3ECE2]/40 border-y border-[#3a2a22]/8 py-20 sm:py-28">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: ease.smooth }}
            className="max-w-3xl mb-12 sm:mb-16"
          >
            <Chapter number="CHAPTER FOUR" title="Coverage Where It Matters" />
            <h2
              className="font-display leading-[1.04] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 5.2vw, 3.85rem)" }}
            >
              Where makeshift solutions
              <span className="block italic font-light text-[#c76600]">
                quietly leave gaps.
              </span>
            </h2>
            <p className="max-w-xl text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
              Soliva is intentionally shaped to cover the face, nose, ears, neck, shoulders, and
              back — the areas most exposed during everyday movement. Scroll to follow the map.
            </p>
          </motion.div>

          <CoverageFigure />
        </div>
      </section>

      {/* ══════════════════════ CHAPTER FIVE — BUILT FOR INDIAN CONDITIONS ══════════════════════ */}
      <section className="relative flex items-center bg-[#3a2a22] text-[#FAF7F3] overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_25%,rgba(245,130,13,0.08),transparent_55%)]" />

        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: ease.smooth }}
            className="text-center max-w-4xl mx-auto mb-12 sm:mb-16"
          >
            <Chapter number="CHAPTER FIVE" title="Built for Indian Conditions" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 6.4vw, 5rem)" }}
            >
              Heat. Dust. Pollution.
              <span className="block italic font-light text-[#d9b27a] mt-2">Movement.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/70 font-light leading-[1.75]">
              These forces never arrive one at a time. Soliva is engineered for them together — the
              real conditions people face on every commute, ride, and errand.
            </p>
          </motion.div>

          <EnvironmentSystem />
        </div>
      </section>

      {/* ══════════════════════ EPILOGUE — THOUGHTFULLY LAYERED ══════════════════════ */}
      <section className="relative flex items-center bg-[#2a1d16] text-[#FAF7F3] overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.06),transparent_62%)]" />

        <div className="relative z-10 mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: ease.luxe }}
            className="text-center max-w-4xl mx-auto"
          >
            <Chapter number="EPILOGUE" title="The Promise" tone="ivory" />
            <h2
              className="font-display leading-[1.02] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7.4vw, 5.75rem)" }}
            >
              Thoughtfully layered.
              <span className="block italic font-light text-[#d9b27a] mt-2">Effortlessly worn.</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-[1rem] md:text-[1.0625rem] text-white/65 font-light italic leading-[1.75]">
              An engineered protection system for modern movement — that feels as natural as stepping
              out.
            </p>
          </motion.div>

          <div className="mt-14 sm:mt-20">
            <LayeredEpilogue />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-14 sm:mt-20 flex justify-center"
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
