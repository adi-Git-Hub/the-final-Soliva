import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";
import {
  SunlightVisual,
  AirflowSystem,
  CoverageFigure,
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
  title?: string;
  tone?: "warm" | "ivory";
}) {
  const color = tone === "ivory" ? "text-[#d9b27a]" : "text-[#c76600]";
  const line = tone === "ivory" ? "bg-[#d9b27a]/40" : "bg-[#c76600]/40";
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`block h-px w-8 ${line}`} />
      <span className={`font-mono text-[0.625rem] tracking-[0.42em] uppercase font-bold ${color}`}>
        {title ? `${number} · ${title}` : number}
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
              <Chapter number="HOW IT WORKS" />
              <h1
                className="font-display leading-[1.02] tracking-tight mb-10 whitespace-nowrap"
                style={{ fontSize: "clamp(1.35rem, 3vw, 2.8rem)" }}
              >
                Designed for{" "}
                <span className="italic font-light text-[#c76600]">everyday exposure.</span>
              </h1>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>
                  Every day, your skin faces long hours of sun, heat, dust, and environmental
                  exposure. Yet most coverings were never specifically designed for these conditions.
                </p>
                <p>
                  Soliva was created as a thoughtful everyday protection system—combining comfortable
                  coverage, breathable construction, and effortless wearability into one solution
                  designed for the way modern India moves.
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

      {/* ══════════════════════ CHAPTER THREE — COMFORT WITHOUT COMPROMISE ══════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center py-14">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-4xl mb-8 text-center mx-auto"
          >
            <h2
              className="font-display leading-[1.04] tracking-tight whitespace-nowrap"
              style={{ fontSize: "clamp(1.3rem, 3.2vw, 2.5rem)" }}
            >
              Comfortable enough{" "}
              <span className="italic font-light text-[#c76600]">
                to wear every day.
              </span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-[0.95rem] md:text-[1rem] text-[#7b6a5f] font-light leading-[1.7]">
              Protection should feel natural, not restrictive — air circulates, heat escapes, comfort lasts.
            </p>
          </motion.div>

          <Depth className="max-w-[46rem] mx-auto">
            <AirflowSystem />
          </Depth>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-center font-display italic text-[#3a2a22]/70 leading-[1.5]"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
          >
            Because the best protection is the one people actually choose to wear consistently.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════ CHAPTER FOUR — COVERAGE WHERE IT MATTERS ══════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#F3ECE2]/40 border-y border-[#3a2a22]/8 py-10 sm:py-12">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          {/* Header — headline, centered */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: ease.smooth }}
            className="mb-6 lg:mb-8 text-center"
          >
            <h2
              className="font-display leading-[1.04] tracking-tight whitespace-nowrap"
              style={{ fontSize: "clamp(1.5rem, 3.6vw, 3rem)" }}
            >
              Coverage where it{" "}
              <span className="italic font-light text-[#c76600]">matters most.</span>
            </h2>
          </motion.div>

          {/* Body — text left, image right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, delay: 0.1, ease: ease.smooth }}
              className="max-w-xl"
            >
              <div className="space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>Protection is only effective where it is present.</p>
                <p>
                  Soliva is intentionally shaped to provide coverage across the areas most commonly
                  exposed during commuting, outdoor activity, and everyday movement—including the face,
                  nose, ears, neck, shoulders, and upper back.
                </p>
              </div>
              <p className="mt-6 font-display italic text-[#3a2a22]/70 text-[1.05rem] md:text-[1.15rem] leading-[1.6]">
                Unlike makeshift coverings that shift, slip, or leave gaps throughout the day, Soliva is
                designed to stay comfortable while providing consistent coverage where it matters most.
              </p>
            </motion.div>

            <CoverageFigure />
          </div>
        </div>
      </section>

      {/* ══════════════════════ EPILOGUE — EXPLORE THE COLLECTION ══════════════════════ */}
      <section className="relative flex items-center bg-[#2a1d16] text-[#FAF7F3] overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(245,130,13,0.06),transparent_62%)]" />

        <div className="relative z-10 mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center"
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
