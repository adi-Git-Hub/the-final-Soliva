import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { 
  Shield, 
  Wind, 
  Move, 
  ArrowRight, 
  ChevronRight, 
  Sun
} from "lucide-react";
import { viewportOnce } from "@/design-system";

export const Route = createFileRoute("/_public/products/")({
  component: ProductsRoute,
});

/* ── CONSTANTS & DATA ── */

const EASE = [0.16, 1, 0.3, 1] as const;

const EXPOSURE_STORIES = [
  {
    id: "uv",
    category: "UV Exposure",
    title: "Silent aging.",
    image: "/sun.webp",
    desc: "Invisible rays that penetrate deeper than immediate discomfort.",
  },
  {
    id: "pollution",
    category: "Dust & Pollution",
    title: "Urban atmosphere.",
    image: "/dust.webp",
    desc: "Environmental stress captured in every breath and movement.",
  },
  {
    id: "heat",
    category: "Trapped Heat",
    title: "Thermal stress.",
    image: "/trapped-heat-new.png",
    desc: "When protection becomes a burden, comfort is the first casualty.",
  },
  {
    id: "adjustment",
    category: "Constant Adjustment",
    title: "Movement friction.",
    image: "/constant-slipping.webp",
    desc: "Loose coverings that require your attention instead of providing it.",
  },
  {
    id: "hidden",
    category: "Hidden Zones",
    title: "Gap exposure.",
    image: "/product_images/hidden-exposure-new.png",
    desc: "The areas overlooked by traditional design remain vulnerable.",
  }
];

const FUTURE_COLLECTION = [
  {
    id: "sunwrap",
    name: "SunWrap™",
    status: "Available Now",
    image: "/product_images/IMG_0491.webp",
    link: "/collection",
    isLive: true,
  },
  {
    id: "men",
    name: "Men Series",
    status: "Coming Soon",
    image: "/product_images/olive-green-front.webp",
    isLive: false,
  },
  {
    id: "kids",
    name: "Kids Series",
    status: "Coming Soon",
    image: "/product_images/pink-1.webp",
    isLive: false,
  },
  {
    id: "travel",
    name: "Travel Series",
    status: "Coming Soon",
    image: "/product_images/beige-1.webp",
    isLive: false,
  },
  {
    id: "gifting",
    name: "Gifting Series",
    status: "Coming Soon",
    image: "/product_images/blue-1.webp",
    isLive: false,
  }
];

const ROADMAP = [
  { phase: "NOW", title: "SunWrap™", desc: "Foundation of urban protection." },
  { phase: "NEXT", title: "Men Series", desc: "Engineered for masculine routines." },
  { phase: "UPCOMING", title: "Kids Series", desc: "Protection for little explorers." },
  { phase: "FUTURE", title: "Travel Series", desc: "Long-range movement defense." },
  { phase: "BEYOND", title: "Gifting Series", desc: "Considered objects for others." }
];

const CATEGORIES = ["All", "Women", "Men", "Kids", "Gifting"] as const;

/* ── COMPONENTS ── */

function AuraBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#FAF7F3]">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-[#f6efe4] opacity-40 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 100, -40, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 h-[90vh] w-[90vh] rounded-full bg-[#e9e9ec] opacity-30 blur-[140px]"
      />
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            delay: i * 2,
          }}
          className="absolute h-1 w-1 rounded-full bg-[#B88445] blur-[1px]"
          style={{
            left: `${(i * 15) % 100}%`,
            top: `${(i * 12) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12 md:mb-20 flex flex-col items-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="mb-4 flex items-center gap-3"
      >
        <span className="block h-px w-6 bg-[#B88445]/30" />
        <span className="font-mono text-[0.65rem] tracking-[0.4em] text-[#B88445] uppercase font-black">
          {kicker}
        </span>
        <span className="block h-px w-6 bg-[#B88445]/30" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE }}
        className="font-display text-[2.5rem] md:text-[4rem] text-[#2D241E] leading-[0.95] tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-xl text-[#7b6a5f] font-light italic text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function ProductsRoute() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  const filteredCollection = useMemo(() => {
    return FUTURE_COLLECTION.filter(item => 
      activeCategory === "All" || 
      item.name.includes(activeCategory) || 
      (activeCategory === "Women" && item.id === "sunwrap") ||
      (activeCategory === "Gifting" && item.id === "gifting") || 
      (activeCategory === "Kids" && item.id === "kids")
    );
  }, [activeCategory]);

  return (
    <div className="relative w-full bg-[#FAF7F3]">
      <AuraBackground />

      {/* ════════ SECTION 1 — CINEMATIC HERO ════════ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(184,132,69,0.08)_0%,transparent_70%)]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#B88445]/40" />
              <span className="font-mono text-[0.7rem] tracking-[0.5em] text-[#B88445] uppercase font-black">
                The Soliva Collection
              </span>
              <span className="h-px w-12 bg-[#B88445]/40" />
            </motion.div>
            
            <h1 className="font-display text-[clamp(2.5rem,10vw,6.5rem)] text-[#2D241E] leading-[0.85] tracking-tighter mb-8">
              Protection <br />
              <span className="italic font-light text-[#B88445]">Engineered.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              className="max-w-xl text-lg md:text-xl text-[#7b6a5f] font-light leading-relaxed"
            >
              Built for today. Expanding tomorrow. <br />
              A larger protection ecosystem is coming.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="h-16 w-px bg-gradient-to-b from-[#2D241E] to-transparent" />
        </motion.div>
      </section>

      {/* ════════ FLOATING PILL NAVIGATION ════════ */}
      <div className="sticky top-24 z-50 w-full flex justify-center px-6 pointer-events-none mb-[-4rem]">
        <motion.nav 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={viewportOnce}
          className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/40 bg-white/45 p-1.5 backdrop-blur-xl shadow-[0_20px_40px_-10px_rgba(45,36,30,0.12)]"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative rounded-full px-6 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === cat ? 'text-white' : 'text-[#2D241E]/60 hover:text-[#2D241E]'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#2D241E] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.nav>
      </div>

      {/* ════════ SECTION 2 — FEATURED PRODUCT (SUNWRAP) ════════ */}
      <section ref={featuredRef} className="relative py-24 md:py-40 bg-[#3a2a22] overflow-hidden">
        {/* Ambient Dark Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(184,132,69,0.15)_0%,transparent_65%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.4em] text-[#B88445] uppercase font-black mb-4 block">
                Featured Product
              </span>
              <h2 className="font-display text-5xl md:text-8xl text-white tracking-tighter leading-none mb-4">
                SUNWRAP™
              </h2>
              <p className="text-[#B88445] font-mono text-xs uppercase tracking-widest">Available Now</p>
            </motion.div>

            {/* Large Hero Image with Hover Scale */}
            <div className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9] mb-20 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] group cursor-pointer">
              <motion.img
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2, ease: EASE }}
                src="/product_images/IMG_0494.webp"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2">
                <span className="font-mono text-[0.6rem] text-white/90 uppercase tracking-widest font-bold italic">Limited Edition</span>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl">
              {[
                { icon: Shield, title: "Full Face", sub: "Coverage" },
                { icon: Wind, title: "Breathable", sub: "Comfort" },
                { icon: Move, title: "Movement", sub: "Optimized" },
                { icon: Sun, title: "Everyday", sub: "Exposure" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#B88445]">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-white font-display text-lg mb-1">{item.title}</h4>
                  <p className="text-white/40 font-mono text-[0.6rem] uppercase tracking-widest">{item.sub}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              className="mt-20"
            >
              <Link to="/collection" className="group relative block">
                <div className="absolute inset-0 translate-y-1 rounded-full bg-[#B88445]/20 blur-md transition-transform group-hover:translate-y-2" />
                <div className="relative px-12 py-5 bg-white rounded-full border border-white/20 flex items-center gap-3 transition-transform group-hover:-translate-y-1">
                  <span className="font-mono text-[0.8rem] text-[#2D241E] uppercase tracking-[0.25em] font-black">Explore SunWrap™</span>
                  <ArrowRight size={16} className="text-[#B88445] transition-transform group-hover:translate-x-1.5" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — FUTURE COLLECTION GALLERY ════════ */}
      <section className="py-24 md:py-40 bg-transparent overflow-hidden">
        <SectionHeading 
          kicker="Expansion" 
          title="Future Artifacts." 
          subtitle="One product available today. A larger ecosystem coming tomorrow."
        />

        <div className="flex overflow-x-auto gap-6 px-6 md:px-20 pb-12 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filteredCollection.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
              className="relative w-[300px] md:w-[400px] aspect-[4/5] shrink-0 snap-center group cursor-pointer"
            >
              <div className="h-full w-full rounded-[2.5rem] overflow-hidden border border-[#2D241E]/5 bg-white shadow-xl transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(45,36,30,0.15)] group-hover:-translate-y-2">
                <img 
                  src={item.image} 
                  className={`w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 ${!item.isLive ? 'grayscale-[0.8] brightness-[0.7]' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Labels */}
                <div className="absolute top-8 left-8">
                  <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/50">{item.status}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mt-1">{item.name}</h3>
                </div>

                {item.isLive && (
                  <div className="absolute bottom-8 left-8 right-8">
                    <Link to={item.link || "/"} className="w-full flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-mono text-[0.6rem] uppercase tracking-widest font-black group/btn hover:bg-white hover:text-[#2D241E] transition-colors">
                      View Collection
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 4 — EXPOSURE STORIES ════════ */}
      <section className="py-24 md:py-40 bg-[#FAF7F3] border-y border-[#2D241E]/5">
        <SectionHeading 
          kicker="Intelligence" 
          title="Exposure Realities." 
          subtitle="Protection isn't just about coverage. It's about context."
        />

        <div className="flex overflow-x-auto gap-8 px-6 md:px-20 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {EXPOSURE_STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative w-[320px] md:w-[480px] shrink-0 snap-center"
            >
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg border border-[#2D241E]/5">
                <img src={story.image} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#B88445] font-black">{story.category}</span>
              <h3 className="font-display text-2xl md:text-3xl text-[#2D241E] mt-2 mb-3">{story.title}</h3>
              <p className="text-[#7b6a5f] font-light leading-relaxed">{story.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 5 — COLLECTION ROADMAP ════════ */}
      <section className="py-24 md:py-40 bg-transparent">
        <SectionHeading 
          kicker="Timeline" 
          title="The Evolution." 
        />

        <div className="mx-auto max-w-4xl px-6">
          <div className="relative space-y-24">
            {/* Timeline Line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B88445]/50 via-[#2D241E]/10 to-transparent" />

            {ROADMAP.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, ease: EASE }}
                className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0`}
              >
                {/* Node */}
                <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#B88445]/20 bg-white flex items-center justify-center z-10 shadow-sm">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#B88445]' : 'bg-[#2D241E]/20'}`} />
                </div>

                <div className={`w-full md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-end md:text-right md:pr-16' : 'md:items-start md:text-left md:pl-16'} pl-12 md:pl-0`}>
                  <span className={`font-mono text-[0.65rem] font-black tracking-[0.4em] mb-2 ${i === 0 ? 'text-[#B88445]' : 'text-[#2D241E]/30'}`}>{item.phase}</span>
                  <h3 className="font-display text-2xl md:text-3xl text-[#2D241E] mb-2">{item.title}</h3>
                  <p className="text-[#7b6a5f] font-light max-w-sm">{item.desc}</p>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 6 — FLOATING COLLECTION UNIVERSE ════════ */}
      <section className="py-24 md:py-40 bg-[#2D241E] min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
        {/* Dark Starfield Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
           {[...Array(30)].map((_, i) => (
             <div 
               key={i} 
               className="absolute h-px w-px bg-white rounded-full"
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 opacity: Math.random() 
               }}
             />
           ))}
        </div>

        <SectionHeading 
          kicker="Ecosystem" 
          title="Collective Defense." 
        />

        <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center mt-20">
          {/* Central Anchor */}
          <motion.div
            animate={reduce ? {} : { 
              y: [0, -15, 0],
              rotate: [0, 1, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="z-20 p-8 md:p-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-2xl text-center group"
          >
            <h3 className="font-display text-4xl md:text-6xl text-white mb-2">SunWrap™</h3>
            <p className="font-mono text-[0.6rem] text-[#B88445] tracking-[0.4em] uppercase font-black">Live Now</p>
            
            <div className="mt-8 max-w-xs opacity-0 h-0 overflow-hidden transition-all duration-700 group-hover:opacity-100 group-hover:h-auto">
               <p className="text-white/60 text-sm font-light italic">The world’s first movement-optimized sun protection system.</p>
               <Link to="/collection" className="mt-6 inline-flex items-center gap-2 text-white font-mono text-[0.6rem] uppercase tracking-widest border-b border-white/20 pb-1">Explore</Link>
            </div>
          </motion.div>

          {/* Satellite Orbs */}
          {[
            { name: "Men", pos: { top: "10%", left: "15%" }, delay: 0.5, desc: "Structured protection for masculine routines." },
            { name: "Kids", pos: { bottom: "15%", left: "10%" }, delay: 1.2, desc: "Breathable shields for active play." },
            { name: "Travel", pos: { top: "15%", right: "12%" }, delay: 0.8, desc: "Long-haul defense for the traveller." },
            { name: "Gifting", pos: { bottom: "10%", right: "15%" }, delay: 1.5, desc: "Considered objects for considered rituals." }
          ].map((orb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={reduce ? {} : { 
                y: [0, Math.sin(i) * 30, 0],
                x: [0, Math.cos(i) * 30, 0]
              }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
              className="absolute z-10 cursor-help"
              style={orb.pos}
            >
              <div className="group relative">
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center shadow-xl transition-all duration-700 hover:bg-white/15 hover:scale-110">
                  <span className="font-display text-xl md:text-2xl text-white/80">{orb.name}</span>
                </div>
                
                {/* Reveal Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-48 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity text-center">
                  <p className="text-white/40 text-[0.7rem] leading-relaxed font-light italic mb-2">{orb.desc}</p>
                  <span className="text-[#B88445] font-mono text-[0.55rem] uppercase tracking-widest font-black">Coming Soon</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ FOOTER CALL ════════ */}
      <section className="py-24 bg-[#FAF7F3] flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center px-6"
        >
          <h2 className="font-display text-3xl md:text-5xl text-[#2D241E] leading-tight mb-8">
            Start with the <br />
            <span className="italic font-light text-[#B88445]">Foundation.</span>
          </h2>
          <Link to="/collection" className="inline-flex items-center gap-4 bg-[#2D241E] text-white px-10 py-5 rounded-full font-mono text-[0.75rem] uppercase tracking-[0.3em] font-black shadow-2xl hover:-translate-y-1 transition-transform">
             Shop SunWrap™
             <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
