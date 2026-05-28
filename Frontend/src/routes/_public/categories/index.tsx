import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, viewportOnceEarly } from "@/design-system";
import { ChevronRight, Shield, Wind, Sun, Layers } from "lucide-react";

export const Route = createFileRoute("/_public/categories/")({
  component: CategoriesRoute,
});

const categories = [
  {
    id: "sunwrap",
    name: "Soliva SunWrap",
    tagline: "SS 26 · Flagship",
    subtitle: "Engineered for calm movement under the sun.",
    description:
      "The dual-layer system that started it all — sculpted coverage meets breathable comfort. Designed for Indian conditions, built for everyday confidence.",
    image: "/new_blue.webp",
    tone: "from-[#F0F4FF] via-[#E8F0FB] to-[#DBEAFE]",
    glow: "rgba(147, 180, 235, 0.25)",
    accentGlow: "rgba(200, 215, 245, 0.4)",
    href: "/collection",
    active: true,
    specs: [
      { label: "UPF Rating", value: "50+" },
      { label: "Fabric Layers", value: "Dual" },
      { label: "Breathability", value: "94%" },
      { label: "Weight", value: "180g" },
    ],
    features: [
      { icon: "shield", text: "Advanced UV Defence" },
      { icon: "wind", text: "Adaptive Airflow" },
      { icon: "layers", text: "Dual-Layer System" },
    ],
    materials: "Nano-weave polyamide blend with moisture-wicking inner layer",
    philosophy: "Every stitch calculated for Indian heat — where protection meets breathability.",
  },
  {
    id: "airflow",
    name: "Soliva AirFlow",
    tagline: "Future Edition",
    subtitle: "Adaptive ventilation. Arriving soon.",
    description:
      "Micro-channel airflow technology meets intelligent thermal regulation. Protection that breathes with you.",
    tone: "from-[#F9F8F6] via-[#F0EEE9] to-[#E8E4DE]",
    glow: "rgba(180, 175, 168, 0.2)",
    accentGlow: "rgba(220, 215, 208, 0.35)",
    active: false,
    specs: [
      { label: "Airflow Channels", value: "128" },
      { label: "Thermal Drop", value: "−4°C" },
      { label: "Coverage", value: "Full" },
    ],
    features: [
      { icon: "wind", text: "Micro-Channel Tech" },
      { icon: "sun", text: "Thermal Regulation" },
    ],
    materials: "Next-gen mesh composite with directional ventilation zones",
    philosophy: "Heat dissipation reimagined — channels that respond to body temperature.",
  },
  {
    id: "urbanshade",
    name: "Soliva UrbanShade",
    tagline: "In Development",
    subtitle: "City-grade sun defence. Refined for the commute.",
    description:
      "Urban-weight protection designed for everyday movement — from morning transit to rooftop evenings.",
    tone: "from-[#FFF6F8] via-[#FCEEF3] to-[#F9D8E8]",
    glow: "rgba(244, 190, 215, 0.2)",
    accentGlow: "rgba(250, 220, 235, 0.35)",
    active: false,
    specs: [
      { label: "Profile", value: "Slim" },
      { label: "Stretch", value: "4-Way" },
      { label: "Pack Size", value: "Compact" },
    ],
    features: [
      { icon: "shield", text: "Urban UV Shield" },
      { icon: "layers", text: "Commute-Ready" },
    ],
    materials: "Ultralight ripstop with integrated reflective micro-thread",
    philosophy: "Protection that folds into your day — invisible until you need it.",
  },
  {
    id: "veilform",
    name: "Soliva VeilForm",
    tagline: "Coming 2027",
    subtitle: "Sculpted coverage, reimagined.",
    description:
      "The next evolution of form-fitting sun protection. Tailored silhouettes, invisible defence.",
    tone: "from-[#FBF6F0] via-[#F0E8D8] to-[#E8DACC]",
    glow: "rgba(190, 170, 140, 0.2)",
    accentGlow: "rgba(230, 215, 195, 0.35)",
    active: false,
    specs: [
      { label: "Fit System", value: "Adaptive" },
      { label: "Silhouette", value: "Tailored" },
      { label: "Construction", value: "Seamless" },
    ],
    features: [
      { icon: "layers", text: "Form-Fit Tech" },
      { icon: "shield", text: "Invisible Defence" },
    ],
    materials: "Bonded construction with zero-seam architecture",
    philosophy: "Where tailoring meets technology — coverage you wear, not carry.",
  },
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const iconMap = {
  shield: Shield,
  wind: Wind,
  sun: Sun,
  layers: Layers,
} as const;

function CategoriesRoute() {
  return (
    <>
      <style>{`
        @keyframes cat-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3%, -2%) scale(1.02); }
          66% { transform: translate(-2%, 3%) scale(0.98); }
        }
        @keyframes cat-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-4%, 2%) scale(1.03); }
          50% { transform: translate(2%, -3%) scale(0.97); }
          75% { transform: translate(3%, 1%) scale(1.01); }
        }
        @keyframes cat-drift-c {
          0%, 100% { transform: translate(0, 0); opacity: 0.5; }
          50% { transform: translate(5%, -2%); opacity: 0.8; }
        }
        @keyframes cat-glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes cat-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes cat-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes cat-breathe {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes cat-line-grow {
          0% { transform: scaleX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.3; }
        }
      `}</style>

      <section className="relative w-full overflow-hidden min-h-screen bg-[#f7f3ee]">
        {/* ── Animated atmospheric background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary warm wash — slow drift */}
          <div
            className="absolute top-[-15%] left-[-10%] w-[130%] h-[80%]"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 40% 30%, rgba(243,236,226,0.95), transparent 70%)",
              animation: "cat-drift-a 25s ease-in-out infinite",
            }}
          />
          {/* Peach side light */}
          <div
            className="absolute top-[10%] right-[-5%] w-[50%] h-[60%]"
            style={{
              background:
                "radial-gradient(circle at 70% 40%, rgba(245,180,140,0.06), transparent 55%)",
              animation: "cat-drift-b 30s ease-in-out infinite",
            }}
          />
          {/* Orange accent glow — subtle, animated */}
          <div
            className="absolute top-[25%] left-[10%] w-[40%] h-[40%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(245,130,13,0.035), transparent 50%)",
              animation: "cat-drift-c 20s ease-in-out infinite",
            }}
          />
          {/* Bottom cream atmosphere */}
          <div
            className="absolute bottom-[-10%] left-[-5%] w-[120%] h-[60%]"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 60% 80%, rgba(243,236,226,0.7), transparent 65%)",
              animation: "cat-drift-a 35s ease-in-out infinite reverse",
            }}
          />
          {/* Mid-page champagne haze */}
          <div
            className="absolute top-[45%] left-[30%] w-[50%] h-[35%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(237,224,208,0.3), transparent 55%)",
              animation: "cat-drift-b 22s ease-in-out infinite reverse",
            }}
          />
          {/* Very subtle caramel warmth at bottom */}
          <div
            className="absolute bottom-[5%] right-[10%] w-[35%] h-[30%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(210,180,140,0.04), transparent 50%)",
              animation: "cat-glow-pulse 18s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── Hero header ── */}
        <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:pt-40 pb-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease }}
            className="mb-4 flex items-center gap-3"
          >
            <motion.span
              className="block h-px w-6 bg-[#3a2a22]/15"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease }}
              style={{ transformOrigin: "left" }}
            />
            <span className="font-mono text-[0.625rem] tracking-[0.45em] text-[#f5820d] uppercase font-semibold">
              Collections
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.08, duration: 1.1, ease }}
            className="font-display text-[#3a2a22] tracking-tight"
            style={{
              fontSize: "clamp(2.25rem, 7vw, 4rem)",
              lineHeight: 1.08,
            }}
          >
            Explore by Category
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.25, duration: 1 }}
            className="mt-4 max-w-lg text-[0.9rem] sm:text-[0.95rem] text-[#7b6a5f]/80 font-light italic leading-relaxed"
          >
            Curated product systems — each designed for a distinct rhythm of protection. More
            collections arrive as the line expands.
          </motion.p>

          {/* Engineering stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4, duration: 0.9, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {[
              { value: "4", label: "Product Lines" },
              { value: "UPF 50+", label: "Protection Standard" },
              { value: "Indian", label: "Climate Engineered" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease }}
                className="flex items-baseline gap-2"
              >
                <span className="font-display text-[1.1rem] sm:text-[1.25rem] text-[#3a2a22]/80 tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[0.45rem] sm:text-[0.5rem] tracking-[0.2em] text-[#7b6a5f]/50 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px w-full max-w-xs origin-left bg-gradient-to-r from-[#3a2a22]/15 via-[#3a2a22]/8 to-transparent"
          />
        </div>

        {/* ── Categories ── */}
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-6 pb-8 space-y-6 sm:space-y-8">
          {categories.map((cat, i) => (
            <div key={cat.id}>
              <CategoryPanel category={cat} index={i} />
              {i < categories.length - 1 && <SectionTransition index={i} />}
            </div>
          ))}
        </div>

        {/* ── Bottom philosophy strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease }}
          className="relative mx-auto max-w-7xl px-6 md:px-12 pb-20 sm:pb-28"
        >
          <div
            className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#3a2a22]/5 px-8 sm:px-12 py-10 sm:py-14"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(243,236,226,0.3))",
            }}
          >
            {/* Animated inner glow */}
            <div
              className="absolute top-0 right-0 w-[60%] h-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 75% 30%, rgba(245,130,13,0.03), transparent 55%)",
                animation: "cat-glow-pulse 12s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-[40%] h-[60%] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 80%, rgba(243,236,226,0.4), transparent 50%)",
                animation: "cat-drift-c 16s ease-in-out infinite",
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="block h-px w-4 bg-[#3a2a22]/15" />
              <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#f5820d]/70 uppercase font-semibold">
                Engineering Philosophy
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 0.9, ease }}
              className="font-display text-[#3a2a22]/85 tracking-tight max-w-xl"
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                lineHeight: 1.2,
              }}
            >
              Protection designed around life — not the other way around.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-3 max-w-lg text-[0.8rem] sm:text-[0.84rem] text-[#7b6a5f]/55 leading-relaxed font-light"
            >
              Each Soliva category begins with a specific human need — the commute, the afternoon
              walk, the outdoor session — and engineers backward from there. Materials, coverage,
              and airflow are calibrated to the exact conditions of Indian climate.
            </motion.p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "42°C", label: "Peak heat tested" },
                { value: "98%", label: "UV blocked" },
                { value: "180g", label: "Average weight" },
                { value: "12mo", label: "R&D per line" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease }}
                  className="flex flex-col"
                >
                  <span className="font-display text-[1rem] sm:text-[1.15rem] text-[#3a2a22]/70 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[0.42rem] sm:text-[0.45rem] tracking-[0.18em] text-[#7b6a5f]/45 uppercase mt-0.5">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function SectionTransition({ index }: { index: number }) {
  const connectors = [
    "From flagship to future — each line builds on what came before.",
    "Same protection philosophy. Different rhythm of life.",
    "From city streets to open skies — coverage that adapts.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1 }}
      className="flex items-center justify-center py-4 sm:py-5"
    >
      <div className="flex items-center gap-4 max-w-md">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3a2a22]/12 to-transparent origin-left"
        />
        <span className="font-mono text-[0.42rem] sm:text-[0.45rem] tracking-[0.15em] text-[#7b6a5f]/35 uppercase text-center shrink-0 max-w-[200px]">
          {connectors[index]}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 bg-gradient-to-r from-transparent via-[#3a2a22]/12 to-transparent origin-right"
        />
      </div>
    </motion.div>
  );
}

type Cat = (typeof categories)[number];

function CategoryPanel({ category, index }: { category: Cat; index: number }) {
  const isReversed = index % 2 !== 0;

  const panel = (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnceEarly}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-700 ${
        category.active
          ? "border border-[#3a2a22]/8 hover:border-[#3a2a22]/14 hover:shadow-[0_20px_60px_-16px_rgba(58,42,34,0.14)] cursor-pointer"
          : "border border-[#3a2a22]/6"
      }`}
      style={{
        background: category.active
          ? "linear-gradient(135deg, rgba(255,255,255,0.55), rgba(243,236,226,0.45))"
          : "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(243,236,226,0.3))",
      }}
    >
      {/* Card-level ambient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(243,236,226,0.35), transparent 55%)",
            animation: "cat-drift-c 18s ease-in-out infinite",
          }}
        />
        {category.active && (
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%]"
            style={{
              background:
                "radial-gradient(circle at 60% 70%, rgba(245,130,13,0.02), transparent 50%)",
              animation: "cat-glow-pulse 14s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* ── Text side ── */}
        <div
          className={`relative flex flex-col justify-center px-8 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 ${
            isReversed ? "md:order-2" : "md:order-1"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 16 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnceEarly}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline with animated line */}
            <div className="flex items-center gap-2.5 mb-4">
              <motion.span
                className="block h-px w-4 bg-[#3a2a22]/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.3, duration: 0.8, ease }}
                style={{ transformOrigin: "left" }}
              />
              <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#3a2a22]/50 uppercase font-bold">
                {category.tagline}
              </span>
            </div>

            {/* Name */}
            <h2
              className={`font-display tracking-tight leading-[1.12] ${
                category.active ? "text-[#3a2a22]" : "text-[#3a2a22]/55"
              }`}
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              {category.name}
            </h2>

            {/* Subtitle */}
            <p
              className={`mt-1.5 text-[0.85rem] sm:text-[0.9rem] font-light italic ${
                category.active ? "text-[#7b6a5f]/80" : "text-[#7b6a5f]/60"
              }`}
            >
              {category.subtitle}
            </p>

            {/* Description */}
            <p
              className={`mt-3 text-[0.78rem] sm:text-[0.82rem] leading-relaxed max-w-sm ${
                category.active ? "text-[#7b6a5f]/65" : "text-[#7b6a5f]/45"
              }`}
            >
              {category.description}
            </p>

            {/* Feature pills — staggered reveal */}
            <div className="mt-4 flex flex-wrap gap-2">
              {category.features.map((f, fi) => {
                const Icon = iconMap[f.icon as keyof typeof iconMap];
                return (
                  <motion.span
                    key={f.text}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnceEarly}
                    transition={{
                      delay: 0.35 + fi * 0.08,
                      duration: 0.7,
                      ease,
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[0.6rem] sm:text-[0.65rem] tracking-[0.08em] font-mono transition-all duration-500 ${
                      category.active
                        ? "border-[#3a2a22]/8 text-[#3a2a22]/60 bg-white/30 group-hover:bg-white/45 group-hover:border-[#3a2a22]/12"
                        : "border-[#3a2a22]/5 text-[#3a2a22]/35 bg-white/15"
                    }`}
                  >
                    <Icon className="w-2.5 h-2.5" strokeWidth={1.5} />
                    {f.text}
                  </motion.span>
                );
              })}
            </div>

            {/* Material callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: category.active ? 1 : 0.5 }}
              viewport={viewportOnceEarly}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 flex items-start gap-2"
            >
              <div
                className="mt-1 w-1 h-1 rounded-full bg-[#f5820d]/40 shrink-0"
                style={{
                  animation: category.active ? "cat-glow-pulse 4s ease-in-out infinite" : undefined,
                }}
              />
              <p className="text-[0.65rem] sm:text-[0.7rem] text-[#7b6a5f]/45 leading-relaxed font-light">
                {category.materials}
              </p>
            </motion.div>

            {/* Engineering philosophy note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: category.active ? 1 : 0.5,
              }}
              viewport={viewportOnceEarly}
              transition={{ delay: 0.55, duration: 0.8 }}
              className={`mt-2 text-[0.6rem] sm:text-[0.65rem] italic max-w-xs ${
                category.active ? "text-[#7b6a5f]/40" : "text-[#7b6a5f]/25"
              }`}
            >
              {category.philosophy}
            </motion.p>

            {/* CTA or Coming Soon */}
            {category.active ? (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.6, duration: 0.8, ease }}
                className="mt-5 flex items-center gap-3"
              >
                <span className="inline-flex items-center gap-2.5 text-[0.75rem] tracking-[0.18em] uppercase font-mono font-semibold text-[#3a2a22]/75 group-hover:text-[#f5820d] transition-colors duration-500">
                  Explore Collection
                  <ChevronRight
                    className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                    strokeWidth={2}
                  />
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: 0.5, duration: 0.7, ease }}
                className="mt-5"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-[#3a2a22]/8 backdrop-blur-sm">
                  <span className="font-mono text-[0.5rem] tracking-[0.18em] text-[#3a2a22]/55 uppercase font-bold">
                    Coming Soon
                  </span>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ── Image side ── */}
        <div
          className={`relative aspect-[4/3] md:min-h-[380px] overflow-hidden ${
            isReversed ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.tone} ${
              category.active ? "opacity-90" : "opacity-60"
            }`}
          />

          {/* Animated ambient glow — drifting warm light */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${category.accentGlow}, transparent 70%)`,
              animation: "cat-drift-a 20s ease-in-out infinite",
            }}
          />

          {/* Secondary atmospheric layer */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 70%, ${category.glow}, transparent 50%)`,
              animation: "cat-drift-b 25s ease-in-out infinite",
            }}
          />

          {/* Subtle mesh texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(58,42,34,0.3) 0.5px, transparent 0.5px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Soft cinematic vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(247,243,238,0.15)_100%)]" />

          {/* ── Product image for active category ── */}
          {category.active && category.image && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8 sm:p-10 md:p-12">
              <motion.img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  filter:
                    "drop-shadow(0 16px 40px rgba(58,42,34,0.14)) drop-shadow(0 4px 12px rgba(58,42,34,0.08))",
                  animation: "cat-float 8s ease-in-out infinite",
                }}
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{
                  delay: 0.2,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
              {/* Animated ground shadow */}
              <div
                className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-4 rounded-[50%] bg-[#3a2a22]/10 pointer-events-none"
                style={{
                  filter: "blur(16px)",
                  animation: "cat-breathe 8s ease-in-out infinite",
                }}
              />
              {/* Soft ambient reflection beneath product */}
              <div
                className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[40%] h-8 rounded-[50%] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(200,215,245,0.15), transparent 70%)",
                  animation: "cat-glow-pulse 6s ease-in-out infinite",
                }}
              />
            </div>
          )}

          {/* Spec overlay on image side — glass morphism */}
          {category.active && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceEarly}
              transition={{
                delay: 0.45,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/30 backdrop-blur-[8px] border border-white/35 shadow-[0_4px_24px_-8px_rgba(58,42,34,0.08)]"
            >
              {category.specs.map((spec, si) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnceEarly}
                  transition={{ delay: 0.55 + si * 0.06, duration: 0.6, ease }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-display text-[0.85rem] sm:text-[0.95rem] text-[#3a2a22]/80 tracking-tight leading-none">
                    {spec.value}
                  </span>
                  <span className="font-mono text-[0.38rem] sm:text-[0.4rem] tracking-[0.15em] text-[#7b6a5f]/50 uppercase mt-1">
                    {spec.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Inactive — blur + specs */}
          {!category.active && (
            <>
              <div className="absolute inset-0 z-10 backdrop-blur-[3px] bg-[#f7f3ee]/12" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnceEarly}
                  transition={{ delay: 0.3, duration: 0.8, ease }}
                  className="bg-white/35 backdrop-blur-sm rounded-full px-5 py-2 border border-white/40 shadow-sm"
                >
                  <span className="font-mono text-[0.5rem] tracking-[0.18em] text-[#3a2a22]/60 uppercase font-bold">
                    Coming Soon
                  </span>
                </motion.div>
                <div className="flex items-center gap-4">
                  {category.specs.map((spec, si) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportOnceEarly}
                      transition={{ delay: 0.4 + si * 0.06, duration: 0.7 }}
                      className="flex flex-col items-center"
                    >
                      <span className="font-display text-[0.75rem] text-[#3a2a22]/30 tracking-tight">
                        {spec.value}
                      </span>
                      <span className="font-mono text-[0.35rem] tracking-[0.12em] text-[#7b6a5f]/25 uppercase mt-0.5">
                        {spec.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Available badge */}
          {category.active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnceEarly}
              transition={{ delay: 0.5, duration: 0.7, ease }}
              className="absolute top-5 right-5 z-20"
            >
              <div className="px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm">
                <span className="font-mono text-[0.5rem] tracking-[0.18em] text-[#f5820d] uppercase font-bold">
                  Available
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );

  if (category.active && category.href) {
    return <Link to={category.href}>{panel}</Link>;
  }
  return panel;
}
