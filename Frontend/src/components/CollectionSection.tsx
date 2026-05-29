import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { viewportOnce, viewportOnceEarly } from "@/design-system";
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

export function CollectionSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full overflow-hidden bg-luxury-beige/60 pt-2 md:pt-3 pb-0 z-20"
    >
      {/* Background — single static gradient, no overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.4),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(243,236,226,0.8),transparent_55%)]" />

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10 md:min-h-screen md:flex md:flex-col md:justify-center md:py-6">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col items-center text-center mb-4 md:mb-5 bg-surface-panel border border-line-hairline rounded-[1.75rem] sm:rounded-panel px-5 sm:px-8 py-3 sm:py-2 md:py-2.5"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-3 sm:gap-4 mb-3"
          >
            <div className="h-px w-6 sm:w-8 bg-[#c76600]/20" />
            <span className="text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-[#c76600] uppercase font-bold">
              Soliva SunWrap™
            </span>
            <div className="h-px w-6 sm:w-8 bg-[#c76600]/20" />
          </motion.div>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-display text-h4 md:text-h1 text-[#3a2a22] leading-display-snug tracking-tight md:whitespace-nowrap"
          >
            One Product. <span className="italic text-[#c76600]">Five Colours.</span>
          </motion.h2>

          <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-transparent via-[#3a2a22]/20 to-transparent" />

          <motion.p
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-4 max-w-2xl text-xs md:text-sm text-[#7b6a5f] leading-relaxed font-light italic"
          >
            Protective essentials thoughtfully designed for everyday exposure — supporting different
            routines, movement, and life stages.
          </motion.p>

          <motion.span
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-[#3a2a22]/60 uppercase font-bold"
          >
            Designed for commuting, outdoor exposure, travel, work, college, and everyday movement.
          </motion.span>
        </motion.div>

        {/* Collection Cards Grid */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:-mt-4 md:items-end lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceEarly}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={() => navigate({ to: "/products/$slug", params: { slug: p.slug } })}
              className="flex-none w-[85vw] snap-center px-3 md:w-full md:px-0 group cursor-pointer"
            >
              <div className="relative flex flex-col h-full">
                {/* Image Container */}
                <div className={`relative aspect-[4/5.2] md:aspect-[4/4.4] md:max-h-[42vh] overflow-hidden rounded-panel border border-[#3a2a22]/5 bg-gradient-to-br ${p.tone} transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:shadow-floating`}>
                  {/* Edition Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-white/70 rounded-2xl p-2.5 shadow-sm border border-[#3a2a22]/5">
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#3a2a22]/40 uppercase font-bold">
                        VARIANT
                      </span>
                      <span className="font-mono text-sm tracking-tighter text-[#3a2a22] font-bold">
                        {p.id}
                      </span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 z-10">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="max-w-full max-h-full object-contain drop-shadow-floating"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3 text-center md:text-left px-2 py-2">
                  <h3 className="font-display text-xl text-[#3a2a22] tracking-tight mb-2 font-medium">
                    {p.name}
                  </h3>
                  <p className="text-[0.75rem] text-[#7b6a5f] font-light italic mb-3">
                    {i === 0 && "☀️ Enhanced Protection"}
                    {i === 1 && "🌬 Breathable Comfort"}
                    {i === 2 && "🛵 Everyday Movement"}
                    {i >= 3 && "🛡 Full Coverage"}
                  </p>
                  <p className="text-[0.8125rem] leading-relaxed text-[#7b6a5f] font-light line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-6 md:mt-8 text-center">
          <button className="px-12 py-4 rounded-full bg-[#3a2a22] text-[#f7f3ee] font-mono text-[0.75rem] tracking-[0.25em] uppercase font-black transition-[transform,background-color] duration-300 hover:bg-[#4a3a32] hover:-translate-y-1 shadow-editorial">
            Explore Product →
          </button>
        </div>
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
