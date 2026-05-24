import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { viewportOnce, viewportOnceEarly } from "@/design-system";

export const Route = createFileRoute("/_public/collection")({
  component: CollectionRoute,
});

type Product = {
  id: string;
  slug: string;
  name: string;
  line: string;
  description: string;
  tags: readonly string[];
  image: string;
  tone: string;
  glow: string;
};

const products: readonly Product[] = [
  {
    id: "01",
    slug: "soliva-airshield-wrap",
    name: "Soliva AirShield Wrap",
    line: "Sculpted coverage. Silent confidence.",
    description:
      "The flagship edition — a dual-layer architecture that moves with your silhouette, deflecting harsh UV while staying invisible in wear.",
    tags: ["Advanced UV Defense", "Breathable", "Full Coverage"],
    image: "/new_blue.webp",
    tone: "from-[#F0F4FF] via-[#DBEAFE] to-[#BFDBFE]",
    glow: "rgba(147, 180, 235, 0.3)",
  },
  {
    id: "02",
    slug: "soliva-urban-veil",
    name: "Soliva Urban Veil",
    line: "City-weight protection. Zero compromise.",
    description:
      "Engineered for the daily commute — a lighter weave that shields without trapping heat, designed for eight-hour days in motion.",
    tags: ["Advanced UV Defense", "Lightweight", "Daily Wear"],
    image: "/new_gray.webp",
    tone: "from-[#F9F8F6] via-[#EDEBE8] to-[#DEDBD7]",
    glow: "rgba(180, 175, 168, 0.28)",
  },
  {
    id: "03",
    slug: "soliva-heatguard",
    name: "Soliva HeatGuard",
    line: "Thermal intelligence. All-day calm.",
    description:
      "Built for peak exposure — heat-reflective fabric that keeps skin cool during the harshest afternoon hours, without adding bulk.",
    tags: ["Heat Reflective", "Advanced UV Defense", "All-Day Comfort"],
    image: "/new_lime.webp",
    tone: "from-[#F5FFF7] via-[#DCFCE7] to-[#BBF7D0]",
    glow: "rgba(134, 220, 160, 0.28)",
  },
  {
    id: "04",
    slug: "soliva-motioncover",
    name: "Soliva MotionCover",
    line: "Moves with you. Stays in place.",
    description:
      "Adaptive stretch-soft fabric that holds its form through every ride, walk, and commute — no slipping, no readjusting, no thought required.",
    tags: ["Advanced UV Defense", "Stretch-Soft", "Indian Climate"],
    image: "/pink.webp",
    tone: "from-[#FFF5F7] via-[#FCE7F3] to-[#FBCFE8]",
    glow: "rgba(244, 180, 210, 0.3)",
  },
  {
    id: "05",
    slug: "soliva-airlite-shield",
    name: "Soliva AirLite Shield",
    line: "Barely there. Completely covered.",
    description:
      "The lightest in the collection — featherweight fabric that disappears on skin while delivering the same uncompromising protection.",
    tags: ["Ultra-Light", "Advanced UV Defense", "Breathable"],
    image: "/new_brown.webp",
    tone: "from-[#FBF6F0] via-[#EDE0D0] to-[#D9C4AA]",
    glow: "rgba(190, 160, 120, 0.3)",
  },
] as const;

function CollectionRoute() {
  return (
    <section className="relative w-full overflow-hidden bg-luxury-beige/60">
      {/* Ambient background — same warm radial palette used across the site */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[60%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.045),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(243,236,226,0.7),transparent_60%)] opacity-90" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[70%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.05),transparent_45%)] opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 md:px-12 md:py-32 safe-x">
        {/* ─────────── Editorial header ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4"
        >
          <span className="block h-px w-5 sm:w-6 bg-brown/20" />
          <span className="font-mono text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
            SS / 26 · VOLUME 01
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
          The Collection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mt-4 max-w-xl text-sm sm:text-base text-ink-soft font-light italic"
        >
          Five editions, engineered for daily exposure. Each piece is a study in
          thoughtful layering — breathable, intentional, made for Indian conditions.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-10 sm:mt-12 h-px w-24 origin-left bg-gradient-to-r from-brown/30 via-brown/20 to-transparent"
        />

        {/* ─────────── Atelier note ─────────── */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="block h-px w-5 sm:w-6 bg-brown/20" />
            <span className="font-mono text-micro-sm tracking-luxe text-brown-deep/70 uppercase font-bold">
              The Editions
            </span>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-ink-muted font-light italic sm:text-right">
            Five curated editions — each designed for a different rhythm of daily
            exposure. Explore the lineup below.
          </p>
        </div>

        {/* ─────────── Editions grid ─────────── */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* ─────────── Closing editorial line ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9 }}
          className="mt-20 sm:mt-28 text-center"
        >
          <h4 className="font-display text-2xl sm:text-3xl md:text-4xl text-brown-deep leading-display-snug tracking-tight">
            Thoughtfully layered.
            <br />
            <span className="italic text-orange-glow">Effortlessly worn.</span>
          </h4>
          <p className="mx-auto mt-5 max-w-md text-sm text-ink-muted font-light italic">
            Browse what's already shippable on the{" "}
            <Link
              to="/products"
              search={{ sort: "newest" }}
              className="text-brown-deep underline-offset-4 hover:underline"
            >
              shop catalogue
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnceEarly}
      transition={{
        delay: Math.min(index * 0.08, 0.32),
        duration: 0.9,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group flex flex-col"
    >
      {/* Image area */}
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block relative aspect-[4/5] overflow-hidden rounded-panel border border-line-soft bg-surface-glass backdrop-blur-medium transition-all duration-700 group-hover:-translate-y-1 group-hover:shadow-floating">
        {/* Warm gradient ground */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${product.tone} opacity-95`}
        />

        {/* Ambient inner glow */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-60 group-hover:opacity-90"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${product.glow}, transparent 70%)`,
          }}
        />

        {/* Product image */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(58,42,34,0.15)] transition-transform duration-700 group-hover:scale-[1.03]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnceEarly}
            transition={{ delay: 0.2 + index * 0.06, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>

        {/* Slow, premium shimmer sweep */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
            mixBlendMode: "soft-light",
          }}
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
        />

        {/* Edition chip */}
        <div className="absolute top-5 left-5 z-20 bg-surface-glass-strong backdrop-blur-subtle rounded-2xl px-3 py-2 shadow-sm">
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-mono text-micro-xs tracking-cta text-brown-deep/60 uppercase font-bold">
              Edition
            </span>
            <span className="font-mono text-sm tracking-tighter text-brown-deep font-bold">
              {product.id}
            </span>
          </div>
        </div>

        {/* Launch badge */}
        <div className="absolute top-5 right-5 z-20 bg-surface-glass-strong backdrop-blur-subtle rounded-full px-3 py-1.5 shadow-sm">
          <span className="font-mono text-micro-xs tracking-cta text-orange-glow uppercase font-bold">
            Launch
          </span>
        </div>

        {/* Cinematic ground shadow */}
        <div className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-brown-deep/20 blur-atmospheric pointer-events-none bottom-[8%] w-[60%] h-3 z-[5]" />
      </Link>

      {/* Content */}
      <div className="mt-5 sm:mt-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="block h-px w-4 bg-brown/25" />
          <span className="font-mono text-micro-xs tracking-cta text-brown-deep/55 uppercase font-bold">
            SS 26 · Edition {product.id}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-[1.65rem] text-brown-deep tracking-tight leading-display-snug font-medium">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink-soft font-light italic">
          {product.line}
        </p>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-3">
          <span className="font-mono text-lg sm:text-xl text-brown-deep tracking-tight font-medium">
            ₹799
          </span>
          <span className="font-mono text-micro-sm text-ink-muted/60 line-through tracking-tight">
            ₹1,200
          </span>
          <span className="font-mono text-micro-xs tracking-cta text-orange-glow uppercase font-bold">
            Launch Offer
          </span>
        </div>

        <p className="mt-3 text-sm text-ink-muted font-light leading-relaxed max-w-md">
          {product.description}
        </p>

        {/* Feature tags */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="border border-line-hairline bg-surface-panel/70 backdrop-blur-subtle rounded-full px-3 py-1 text-micro-xs font-mono tracking-cta uppercase text-brown-deep/75 font-bold"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-3">
          <span className="group/cta inline-flex items-center gap-2 text-sm tracking-cta uppercase font-mono font-bold text-brown-deep/80 cursor-pointer transition-colors duration-500 hover:text-orange-glow">
            Notify on launch
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-brown-deep/40 transition-all duration-500 group-hover/cta:w-10 group-hover/cta:bg-orange-glow"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
