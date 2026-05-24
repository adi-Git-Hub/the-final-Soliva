import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, viewportOnceEarly } from "@/design-system";

export const Route = createFileRoute("/_public/categories/")({
  component: CategoriesRoute,
});

const categories = [
  {
    id: "sunwrap",
    name: "Soliva SunWrap",
    subtitle: "Engineered for calm movement under the sun.",
    image: "/new_blue.webp",
    tone: "from-[#F0F4FF] via-[#DBEAFE] to-[#BFDBFE]",
    glow: "rgba(147, 180, 235, 0.3)",
    href: "/collection",
    active: true,
  },
  {
    id: "airflow",
    name: "Soliva AirFlow",
    subtitle: "Adaptive ventilation. Arriving soon.",
    tone: "from-[#F9F8F6] via-[#EDEBE8] to-[#DEDBD7]",
    glow: "rgba(180, 175, 168, 0.2)",
    active: false,
  },
  {
    id: "urbanshade",
    name: "Soliva UrbanShade",
    subtitle: "City-grade sun defence. In development.",
    tone: "from-[#FFF5F7] via-[#FCE7F3] to-[#FBCFE8]",
    glow: "rgba(244, 180, 210, 0.2)",
    active: false,
  },
  {
    id: "veilform",
    name: "Soliva VeilForm",
    subtitle: "Sculpted coverage, reimagined. Coming 2027.",
    tone: "from-[#FBF6F0] via-[#EDE0D0] to-[#D9C4AA]",
    glow: "rgba(190, 160, 120, 0.2)",
    active: false,
  },
];

function CategoriesRoute() {
  return (
    <section className="relative w-full overflow-hidden bg-luxury-beige/60 min-h-screen">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[60%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.045),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(243,236,226,0.7),transparent_60%)] opacity-90" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[70%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.05),transparent_45%)] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-28 sm:pt-36 pb-20 sm:pb-28 md:px-12 safe-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4"
        >
          <span className="block h-px w-5 sm:w-6 bg-brown/20" />
          <span className="font-mono text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
            Collections
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-display text-brown-deep tracking-tight leading-hero"
          style={{ fontSize: "clamp(2.25rem, 9vw, 4.5rem)" }}
        >
          Explore by Category
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mt-4 max-w-lg text-sm sm:text-base text-ink-soft font-light italic"
        >
          Curated product systems — each designed for a distinct rhythm of protection.
          More collections arrive as the line expands.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-10 sm:mt-12 h-px w-24 origin-left bg-gradient-to-r from-brown/30 via-brown/20 to-transparent"
        />

        {/* Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Cat = (typeof categories)[number];

function CategoryCard({ category, index }: { category: Cat; index: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnceEarly}
      transition={{
        delay: Math.min(index * 0.1, 0.3),
        duration: 0.9,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex flex-col"
    >
      {/* Image area */}
      <div
        className={`relative aspect-[5/4] overflow-hidden rounded-panel border transition-all duration-700 ${
          category.active
            ? "border-line-soft bg-surface-glass backdrop-blur-medium group-hover:-translate-y-1 group-hover:shadow-floating cursor-pointer"
            : "border-line-hairline bg-surface-glass-ghost"
        }`}
      >
        {/* Gradient ground */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.tone} ${
            category.active ? "opacity-90" : "opacity-50"
          }`}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${category.glow}, transparent 70%)`,
            opacity: category.active ? 0.7 : 0.4,
          }}
        />

        {/* Active card — product image */}
        {category.active && category.image && (
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8 sm:p-12">
            <motion.img
              src={category.image}
              alt={category.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(58,42,34,0.15)] transition-transform duration-700 group-hover:scale-[1.03]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnceEarly}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>
        )}

        {/* Coming soon cards — blur overlay + label */}
        {!category.active && (
          <>
            <div className="absolute inset-0 z-10 backdrop-blur-[6px] bg-luxury-beige/30" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-surface-glass-strong backdrop-blur-subtle rounded-full px-5 py-2 shadow-sm border border-white/30">
                <span className="font-mono text-micro-xs tracking-cta text-brown-deep/70 uppercase font-bold">
                  Coming Soon
                </span>
              </div>
            </div>
          </>
        )}

        {/* Active badge */}
        {category.active && (
          <div className="absolute top-5 right-5 z-20 bg-surface-glass-strong backdrop-blur-subtle rounded-full px-3 py-1.5 shadow-sm">
            <span className="font-mono text-micro-xs tracking-cta text-orange-glow uppercase font-bold">
              Available
            </span>
          </div>
        )}

        {/* Ground shadow for active card */}
        {category.active && (
          <div className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-brown-deep/20 blur-atmospheric pointer-events-none bottom-[8%] w-[60%] h-3 z-[5]" />
        )}
      </div>

      {/* Content */}
      <div className="mt-5 sm:mt-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="block h-px w-4 bg-brown/25" />
          <span className="font-mono text-micro-xs tracking-cta text-brown-deep/55 uppercase font-bold">
            {category.active ? "SS 26 · Live" : "Future Edition"}
          </span>
        </div>

        <h3
          className={`font-display text-2xl sm:text-[1.65rem] tracking-tight leading-display-snug font-medium ${
            category.active ? "text-brown-deep" : "text-brown-deep/50"
          }`}
        >
          {category.name}
        </h3>
        <p
          className={`mt-1.5 text-sm font-light italic ${
            category.active ? "text-ink-soft" : "text-ink-muted/60"
          }`}
        >
          {category.subtitle}
        </p>

        {category.active && (
          <div className="mt-4 flex items-center gap-3">
            <span className="group-hover:text-orange-glow inline-flex items-center gap-2 text-sm tracking-cta uppercase font-mono font-bold text-brown-deep/80 transition-colors duration-500">
              Explore Collection
              <span
                aria-hidden
                className="inline-block h-px w-6 bg-brown-deep/40 transition-all duration-500 group-hover:w-10 group-hover:bg-orange-glow"
              />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (category.active && category.href) {
    return <Link to={category.href}>{inner}</Link>;
  }
  return inner;
}
