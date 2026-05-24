import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { viewportOnce, viewportOnceEarly } from "@/design-system";

const products = [
  {
    id: "01",
    slug: "soliva-airshield-wrap",
    name: "AirShield Wrap",
    image: "/new_blue.webp",
    desc: "Sculpted coverage. Silent confidence. The flagship dual-layer edition.",
    tone: "from-[#F0F4FF] to-[#DBEAFE]",
    glow: "rgba(147, 180, 235, 0.4)",
  },
  {
    id: "02",
    slug: "soliva-urban-veil",
    name: "Urban Veil",
    image: "/new_gray.webp",
    desc: "City-weight protection. Zero compromise. Engineered for the daily commute.",
    tone: "from-[#F9F8F6] to-[#EDEBE8]",
    glow: "rgba(180, 175, 168, 0.35)",
  },
  {
    id: "03",
    slug: "soliva-heatguard",
    name: "HeatGuard",
    image: "/new_lime.webp",
    desc: "Thermal intelligence. All-day calm. Built for peak exposure hours.",
    tone: "from-[#F5FFF7] to-[#DCFCE7]",
    glow: "rgba(134, 220, 160, 0.35)",
  },
  {
    id: "04",
    slug: "soliva-motioncover",
    name: "MotionCover",
    image: "/pink.webp",
    desc: "Moves with you. Stays in place. Adaptive stretch-soft fabric.",
    tone: "from-[#FFF5F7] to-[#FCE7F3]",
    glow: "rgba(244, 180, 210, 0.4)",
  },
  {
    id: "05",
    slug: "soliva-airlite-shield",
    name: "AirLite Shield",
    image: "/new_brown.webp",
    desc: "Barely there. Completely covered. The lightest in the collection.",
    tone: "from-[#FBF6F0] to-[#EDE0D0]",
    glow: "rgba(190, 160, 120, 0.35)",
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
  const containerRef = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-beige/60 pt-2 md:pt-3 pb-0 z-20"
    >
      {/* Background Decorative Elements (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-8 bg-surface-panel border border-line-hairline rounded-[1.75rem] sm:rounded-panel px-5 sm:px-8 py-3 sm:py-2 md:py-3 backdrop-blur-medium shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="flex items-center gap-3 sm:gap-4 mb-3"
          >
            <div className="h-px w-6 sm:w-8 bg-brown/20" />
            <span className="text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
              PREVIEW COLLECTION
            </span>
            <div className="h-px w-6 sm:w-8 bg-brown/20" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.1 }}
            className="font-display text-h4 md:text-h1 text-brown-deep leading-display-snug tracking-tight md:whitespace-nowrap"
          >
            Five editions.{" "}
            <span className="italic text-orange-glow">One philosophy.</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-transparent via-brown/20 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4 }}
            className="mt-3 max-w-md text-xs md:text-sm text-ink-muted leading-relaxed font-light italic"
          >
            Protective essentials, engineered for everyday Indian conditions.
          </motion.p>
        </div>

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
                <div className="relative aspect-[4/5.2] overflow-hidden rounded-panel border border-line-soft bg-surface-glass backdrop-blur-medium transition-all duration-700 group-hover:-translate-y-1 group-hover:shadow-floating">
                  {/* Subtle Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${p.tone} opacity-40 transition-opacity duration-700 group-hover:opacity-60`}
                  />

                  {/* Mesh Gradient / Ambient Light */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${p.glow}, transparent 70%)`,
                    }}
                  />

                  {/* Cinematic Ground Shadow — grounds the product, removes floating-PNG feel */}
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-brown-deep/30 blur-atmospheric pointer-events-none bottom-[14%] w-[52%] h-2.5" />

                  {/* Edition Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-surface-glass-strong backdrop-blur-subtle rounded-2xl p-2.5 shadow-sm">
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="font-mono text-micro-xs tracking-cta text-brown-deep/60 uppercase font-bold">
                        EDITION
                      </span>
                      <span className="font-mono text-sm tracking-tighter text-brown-deep font-bold">
                        {p.id}
                      </span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4 z-10">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain drop-shadow-floating"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        y: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                  </div>

                  {/* Grab Now CTA — visible on mobile, hover-revealed on md+ */}
                  <div className="absolute bottom-6 inset-x-6 z-20 opacity-100 translate-y-0 transition-all duration-500 ease-out md:opacity-0 md:translate-y-3 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <div
                      className="rounded-full py-2.5 px-5 text-center shadow-floating border border-white/30 transition-shadow duration-500 group-hover:shadow-glow"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.3))",
                        backdropFilter: "blur(16px) saturate(1.4)",
                      }}
                    >
                      <span className="text-micro-sm tracking-cta text-brown-deep font-bold uppercase">
                        Grab Now
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-5 text-center md:text-left px-2 bg-surface-panel border border-line-hairline rounded-2xl p-4 backdrop-blur-subtle">
                  <h3 className="font-display text-xl text-brown-deep tracking-tight mb-1.5 font-medium">
                    {p.name}
                  </h3>
                  <p className="text-micro-lg leading-relaxed text-ink-soft font-light line-clamp-2">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA Text */}
        <div className="mt-10 sm:mt-14 text-center">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="font-display text-2xl sm:text-3xl md:text-4xl text-brown-deep leading-display-snug tracking-tight"
          >
            Thoughtfully layered.
            <br />
            <span className="italic text-orange-glow">Effortlessly worn.</span>
          </motion.h4>
        </div>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative mt-10 sm:mt-12 lg:mt-14 mb-0 border-y border-line-medium bg-surface-glass backdrop-blur-medium py-3 sm:py-4 lg:py-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
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
                <span className="text-orange-glow/70 text-xl sm:text-2xl font-serif leading-none">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
