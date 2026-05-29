import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease, useIsMobile } from "@/design-system";
import { useCart } from "@/features/cart/hooks/useCart";
import { Plus, Check, Wind, Shield, Activity, Zap } from "lucide-react";
import { InteractiveCard3D } from "@/components/AtmosphericEngine";

export const Route = createFileRoute("/_public/collection")({
  component: CollectionRoute,
});

const variants = [
  {
    id: "arctic-blue",
    name: "Arctic Blue",
    image: "/variant_blue.webp",
    tone: "from-[#EEF2FA] via-[#DBEAFE] to-[#C7D9F5]",
    glow: "rgba(147, 180, 235, 0.2)",
    hex: "#DBEAFE",
  },
  {
    id: "dusty-olive",
    name: "Dusty Olive",
    image: "/variant_olive.webp",
    tone: "from-[#F5F6F2] via-[#E8EAE0] to-[#DDE0D2]",
    glow: "rgba(160, 170, 140, 0.18)",
    hex: "#E8EAE0",
  },
  {
    id: "leaf-lime",
    name: "Leaf Lime",
    image: "/variant_lime.webp",
    tone: "from-[#F0FAF3] via-[#DCFCE7] to-[#C5F0D3]",
    glow: "rgba(134, 220, 160, 0.18)",
    hex: "#DCFCE7",
  },
  {
    id: "petal-pink",
    name: "Petal Pink",
    image: "/variant_pink.webp",
    tone: "from-[#FBF0F3] via-[#FCE7F3] to-[#F5D0E2]",
    glow: "rgba(244, 180, 210, 0.18)",
    hex: "#FCE7F3",
  },
  {
    id: "golden-sand",
    name: "Golden Sand",
    image: "/variant_golden.webp",
    tone: "from-[#F7F1EB] via-[#EDE0D0] to-[#DCCCB5]",
    glow: "rgba(190, 160, 120, 0.18)",
    hex: "#EDE0D0",
  },
] as const;

const lifestyleImages = ["/1.webp", "/2.webp"];

function CollectionRoute() {
  const [activeVariant, setActiveVariant] = useState(variants[0]);
  const [activeLifestyle, setActiveLifestyle] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLifestyle((prev) => (prev + 1) % lifestyleImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    cart.add({
      productId: "soliva-sunwrap",
      slug: "soliva-sunwrap",
      name: `Soliva SunWrap™ - ${activeVariant.name}`,
      image: activeVariant.image,
      priceCents: 79900,
      currency: "INR",
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAF7F3] overflow-x-hidden">
      {/* ═══ SECTION 1: THE COLLECTION (Editorial Intro) ═══ */}
      <section className="relative min-h-screen pt-32 pb-[120px] flex items-center overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT: Single Premium Lifestyle Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.0, ease: ease.smooth }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-soft group will-change-transform"
            >
              <img
                src="/hero-image.webp"
                alt="Soliva Summer Movement"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/20 via-transparent to-transparent" />
              <div className="absolute inset-4 border border-white/20 rounded-[2.5rem] pointer-events-none" />
            </motion.div>

            {/* RIGHT: Rich Storytelling Content */}
            <div className="flex flex-col text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.1 }}
                className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-8 block"
              >
                SS/26 VOLUME 01
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-display text-[#3a2a22] leading-[1.05] tracking-tight mb-10"
                style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
              >
                The Summer <br />
                <span className="italic text-[#c76600]/80 text-shadow-sm">Movement.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed max-w-xl mb-12"
              >
                Thoughtfully designed for movement through Indian summers — breathable layers built
                for everyday comfort, exposure, and motion.
              </motion.p>

              {/* Structured Feature Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    label: "BREATHABLE COMFORT",
                    desc: "Dual-layer airflow system designed to release heat while shielding skin.",
                  },
                  {
                    label: "URBAN UTILITY",
                    desc: "Engineered for 60kmph motion, city commutes, and everyday routines.",
                  },
                  {
                    label: "HEAT-READY WEAR",
                    desc: "Lightweight fabrics tested in 45°C Nagpur summer conditions.",
                  },
                  {
                    label: "DAILY EXPOSURE",
                    desc: "Zero-gap protection calibrated for long outdoor exposure hours.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnceEarly}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#3a2a22] uppercase font-black">
                      {item.label}
                    </span>
                    <p className="text-[0.875rem] text-[#a08f84] font-light leading-snug">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
              >
                <button className="px-12 py-5 rounded-full bg-[#3a2a22] text-[#f7f3ee] font-mono text-[0.625rem] tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:bg-[#4a3a32] hover:-translate-y-0.5">
                  Explore Collection
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: FLAGSHIP ECOSYSTEM (Luxury Redesign) ═══ */}
      <section className="relative py-24 bg-white/40">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            {/* LEFT SIDE: Premium Product Gallery */}
            <div className="lg:col-span-7 flex flex-row gap-6">
              {/* Vertical Thumbnail Column - Amazon Style */}
              <div className="hidden md:flex flex-col gap-4 w-20 shrink-0 sticky top-32">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setActiveVariant(v)}
                    className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-400 group ${
                      activeVariant.id === v.id
                        ? "border-[#c76600] ring-4 ring-[#c76600]/5"
                        : "border-transparent opacity-50 hover:opacity-100 hover:border-[#3a2a22]/20"
                    }`}
                  >
                    <img src={v.image} className="w-full h-full object-cover" alt={v.name} />
                  </button>
                ))}
              </div>

              {/* Large Main Product Image - Unboxed Editorial */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVariant.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.6, ease: ease.smooth }}
                    className="relative aspect-[4/5] w-full group cursor-zoom-in"
                  >
                    <img
                      src={activeVariant.image}
                      alt={activeVariant.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    {/* Subtle Shadow to ground the product */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-black/5 blur-2xl rounded-full -z-10" />
                  </motion.div>
                </AnimatePresence>

                {/* Mobile Thumbnails */}
                <div className="flex md:hidden gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariant(v)}
                      className={`relative w-16 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                        activeVariant.id === v.id
                          ? "border-[#c76600]"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={v.image} className="w-full h-full object-cover" alt={v.name} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Product Information Hierarchy */}
            <div className="lg:col-span-5 flex flex-col pt-2">
              <div className="space-y-10">
                {/* 1. Header & Title */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold">
                      Flagship Series
                    </span>
                    <div className="h-px w-8 bg-[#c76600]/30" />
                  </div>
                  <h2
                    className="font-display text-[#3a2a22] leading-[1.1] tracking-tight uppercase"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                  >
                    Soliva <span className="italic font-light text-[#c76600]/90">SunWrap™</span>
                  </h2>
                </div>

                {/* 2. Price Section */}
                <div className="flex items-center gap-6 border-y border-[#3a2a22]/5 py-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-4xl text-[#3a2a22] font-semibold tracking-tighter">
                      ₹799
                    </span>
                    <span className="font-mono text-lg text-[#a08f84] line-through opacity-60">
                      ₹1,200
                    </span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#c76600] text-white font-mono text-[0.5625rem] uppercase font-black tracking-widest shadow-sm">
                    Launch Edition
                  </div>
                </div>

                {/* 3. Trust Row - Clean Icons/Text */}
                <div className="flex items-center justify-between px-1">
                  {[
                    { label: "UPF 50+ Certified", icon: Shield },
                    { label: "Breathable Wear", icon: Wind },
                    { label: "Indian Heat Ready", icon: Activity },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon size={12} className="text-[#c76600]" />
                      <span className="font-mono text-[0.5625rem] tracking-widest uppercase font-bold text-[#7b6a5f]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 4. Description */}
                <p className="text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed">
                  A breathable textile shield engineered for urban movement. The SunWrap™ silhouette
                  adapts to your form, deflecting UV while maintaining constant airflow through
                  calibrated ventilation zones.
                </p>

                {/* 5. Usage Chips */}
                <div className="space-y-4">
                  <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#a08f84] uppercase font-black">
                    Daily Context
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Women Commuters",
                      "College Routines",
                      "Long Outdoor Hours",
                      "Urban Exposure",
                      "Travel",
                      "Daily Movement",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="px-4 py-2.5 rounded-xl border border-[#3a2a22]/10 bg-[#3a2a22]/[0.02] text-[0.75rem] text-[#7b6a5f] font-medium tracking-tight hover:bg-white hover:shadow-sm transition-all cursor-default"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 6. Feature Grid - 2 Column Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Wind, title: "Ventilation", val: "High Airflow" },
                    { icon: Shield, title: "UV Guard", val: "Calibrated" },
                    { icon: Activity, title: "Stability", val: "60kmph Fit" },
                    { icon: Zap, title: "Weight", val: "Ultra-Light" },
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 p-5 rounded-3xl bg-[#3a2a22]/[0.02] border border-[#3a2a22]/[0.04] hover:bg-white hover:shadow-soft transition-all duration-500"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <f.icon size={16} className="text-[#c76600]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#a08f84] uppercase font-bold mb-0.5">
                          {f.title}
                        </span>
                        <span className="text-[0.8125rem] text-[#3a2a22] font-semibold">
                          {f.val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 7. Buying Experience */}
                <div className="space-y-6 pt-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#a08f84] uppercase font-black">
                      Quantity
                    </span>
                    <div className="flex items-center border border-[#3a2a22]/10 rounded-full bg-white px-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-[#7b6a5f] hover:text-[#3a2a22] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono text-sm font-bold text-[#3a2a22]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#7b6a5f] hover:text-[#3a2a22] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-5 rounded-full font-mono text-[0.6875rem] tracking-[0.25em] uppercase font-black transition-all duration-500 flex items-center justify-center gap-3 ${
                          addedToCart
                            ? "bg-[#2d6b3f] text-white"
                            : "bg-[#3a2a22] text-[#f7f3ee] hover:bg-[#4a3a32] shadow-lg shadow-[#3a2a22]/10"
                        }`}
                      >
                        {addedToCart ? (
                          <>
                            <Check size={16} strokeWidth={3} /> Added
                          </>
                        ) : (
                          <>
                            <Plus size={16} strokeWidth={3} /> Add To Cart
                          </>
                        )}
                      </button>
                      <button className="flex-1 py-5 rounded-full bg-[#c76600] text-white font-mono text-[0.6875rem] tracking-[0.25em] uppercase font-black transition-all duration-500 hover:bg-[#d87a1a] shadow-lg shadow-[#c76600]/20">
                        Buy Now
                      </button>
                    </div>

                    <a
                      href="https://wa.me/917350640608"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-full border border-[#3a2a22]/10 bg-white flex items-center justify-center gap-3 font-mono text-[0.625rem] tracking-[0.2em] uppercase font-bold text-[#3a2a22] hover:bg-[#3a2a22]/[0.02] transition-all"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        className="w-4 h-4 opacity-70"
                      />
                      Quick Order on WhatsApp
                    </a>
                  </div>

                  <p className="text-center font-mono text-[0.5rem] tracking-[0.3em] text-[#a08f84] uppercase font-bold opacity-40">
                    Complimentary Shipping · Secured Transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: CINEMATIC INTERMISSION (SS/26 · VOLUME 01) ═══ */}
      <section className="relative min-h-[60vh] py-[100px] flex items-center overflow-hidden bg-[#EAE2D8]">
        {/* Simplified Atmospheric Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            {/* LEFT: 60% Content */}
            <div className="w-full lg:w-[60%] flex flex-col items-start text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                className="font-mono text-[0.625rem] tracking-[0.6em] text-[#3a2a22]/50 uppercase font-black mb-8 block"
              >
                SS/26 · VOLUME 01
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="font-display text-[#3a2a22] leading-[1.1] tracking-tight mb-10"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                Protection engineered <br />
                <span className="italic text-[#c76600]/90">for Indian movement.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-[1.125rem] text-[#5c4d44] font-light leading-relaxed max-w-lg mb-12"
              >
                Thoughtfully designed around the realities of Indian summers, movement, sunlight,
                and urban exposure.
              </motion.p>
            </div>

            {/* RIGHT: 40% Video Area */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.2, duration: 1.0 }}
              className="w-full lg:w-[40%] relative will-change-transform"
            >
              <div className="relative h-[400px] lg:h-[480px] w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-lg border border-[#3a2a22]/5 bg-black/5">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover brightness-[0.98] will-change-transform"
                  style={{ transform: "translateZ(0)" }}
                >
                  <source src="/intermission_optimized.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/20 via-transparent to-transparent pointer-events-none opacity-40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: MOVEMENT STORY (Refined Editorial Framing) ═══ */}
      <section className="relative py-[120px] overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* LEFT CONTENT: 45% */}
            <div className="w-full lg:w-[45%] flex flex-col items-start text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6"
              >
                MOVEMENT STORY
              </motion.span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Protection Designed <br /> For Daily Motion
              </h2>
              <p className="text-[1.125rem] text-[#7b6a5f] font-light leading-relaxed mb-10 max-w-md">
                Built for movement through heat, travel, and everyday urban exposure — thoughtfully
                designed to move naturally with life.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  "Crafted For Indian Summers",
                  "Breathable Everyday Wear",
                  "Designed For Long Outdoor Hours",
                  "Quiet Comfort In Motion",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnceEarly}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c76600]/30 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#c76600]" />
                    <span className="text-[0.9375rem] text-[#3a2a22]/80 font-medium tracking-tight">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT SLIDER: 55% (Refined Editorial Portrait Frame) */}
            <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-end gap-10">
              <div className="w-full max-w-[520px]">
                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-editorial border border-[#3a2a22]/5 bg-white will-change-transform">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeLifestyle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "linear" }}
                      src={lifestyleImages[activeLifestyle]}
                      alt="Soliva Lifestyle Movement"
                      className="w-full h-full object-cover grayscale-[0.05]"
                      style={{ objectPosition: "center center", transform: "translateZ(0)" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a22]/15 via-transparent to-transparent opacity-40" />
                </div>
              </div>

              {/* Luxury Editorial Slider Control */}
              <div className="flex items-center justify-between w-full max-w-[520px] px-10">
                <div className="flex gap-2 items-center">
                  <span className="font-mono text-[0.625rem] text-[#3a2a22]/40 font-bold uppercase tracking-widest">
                    SCENE 0{activeLifestyle + 1}
                  </span>
                  <div className="w-12 h-px bg-[#3a2a22]/10 mx-2" />
                  <span className="font-mono text-[0.625rem] text-[#3a2a22]/20 font-bold uppercase tracking-widest">
                    TOTAL 0{lifestyleImages.length}
                  </span>
                </div>

                <div className="flex gap-4">
                  {lifestyleImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveLifestyle(i)}
                      className="group relative py-4"
                    >
                      <div className="h-[2px] w-12 bg-[#3a2a22]/5 overflow-hidden rounded-full">
                        <motion.div
                          className="h-full bg-[#c76600]"
                          initial={false}
                          animate={{
                            width: activeLifestyle === i ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: REAL WORLD UTILITY (Upgraded with 3D Depth) ═══ */}
      <section className="relative py-[120px] bg-[#FAF7F3] overflow-hidden">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              Designed Around <span className="italic">Everyday</span> Movement
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Women Commuters",
                tag: "DAILY RIDES",
                points: [
                  "Daily scooter rides",
                  "Office movement",
                  "College travel",
                  "Urban heat protection",
                ],
                base: "bg-[#EAE2D8]",
                glow: "rgba(225,160,120,0.1)",
              },
              {
                title: "Young Girls",
                tag: "SCHOOL MOTION",
                points: [
                  "School commutes",
                  "Outdoor activities",
                  "Family travel",
                  "Everyday comfort",
                ],
                base: "bg-[#DFE3DA]",
                glow: "rgba(140,170,140,0.1)",
              },
              {
                title: "Long Outdoor Hours",
                tag: "STAMINA",
                points: [
                  "Extended movement",
                  "Breathable wear",
                  "Summer duration",
                  "Daily exposure shield",
                ],
                base: "bg-[#E2DDD5]",
                glow: "rgba(190,160,130,0.1)",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative h-full min-h-[440px] border border-[#3a2a22]/5 rounded-[3.5rem] p-12 overflow-hidden transition-[transform,box-shadow] duration-500 ${card.base} shadow-sm hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="relative z-10 flex flex-col h-full">
                    <span className="font-mono text-[0.5625rem] tracking-[0.3em] text-[#c76600] uppercase font-black mb-6 block opacity-70">
                      {card.tag}
                    </span>
                    <h3 className="font-display text-3xl text-[#3a2a22] mb-12 leading-tight">
                      {card.title}
                    </h3>

                    <div className="space-y-6 flex-1">
                      {card.points.map((pt, j) => (
                        <div key={j} className="flex items-center gap-5">
                          <div className="h-[1px] w-4 bg-[#3a2a22]/10" />
                          <span className="text-[0.9375rem] text-[#7b6a5f] font-light italic">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>

          {/* COMPACT FOOTER STRIP — Integrated into Section 5 */}
          <div className="mt-24 pt-16 border-t border-[#3a2a22]/5">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
              {[
                "Breathable Comfort",
                "Lightweight Movement",
                "Heat Ready Wear",
                "Exposure Protection",
                "Long Hour Comfort",
              ].map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnceEarly}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <div className="h-1 w-1 rounded-full bg-[#c76600]/40 group-hover:bg-[#c76600] transition-colors duration-500" />
                  <span className="font-mono text-[0.5rem] md:text-[0.5625rem] tracking-[0.25em] text-[#3a2a22]/40 uppercase font-black group-hover:text-[#c76600] transition-colors duration-500">
                    {f}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: ROADMAP ═══ */}
      <section className="relative py-[120px]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8 text-left">
            <div className="max-w-xl">
              <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600] uppercase font-bold mb-6 block">
                ROADMAP
              </span>
              <h2
                className="font-display text-[#3a2a22] tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              >
                Thoughtfully <span className="italic">Growing</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Soliva Men", badge: "In Progress", desc: "Masculine movement guards." },
              { title: "Soliva Kids", badge: "In Progress", desc: "Gentle school protection." },
              { title: "Neck Shield", badge: "In Progress", desc: "Integrated facial guard." },
              {
                title: "Future Essentials",
                badge: "In Progress",
                desc: "Urban movement accessories.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceEarly}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className="group relative bg-[#EDEBE8]/30 border border-[#3a2a22]/5 rounded-[2.5rem] p-10 transition-colors duration-500 hover:bg-[#EDEBE8]/60"
              >
                <div className="flex flex-col gap-10 text-left h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#3a2a22]/5 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                    <Plus size={18} className="text-[#3a2a22]/30 group-hover:text-[#c76600]" />
                  </div>
                  <div className="mt-auto">
                    <span className="font-mono text-[0.5rem] tracking-[0.2em] text-[#c76600] uppercase font-black mb-3 block">
                      {card.badge}
                    </span>
                    <h4 className="font-display text-2xl text-[#3a2a22] mb-4">{card.title}</h4>
                    <p className="text-[0.875rem] text-[#a08f84] font-light leading-snug">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FINAL CTA ═══ */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F3] via-[#EDE5DA] to-[#F3EDE4]" />
        <div className="relative z-10 mx-auto max-w-[900px] px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2 }}
          >
            <h2
              className="font-display text-[#3a2a22] leading-[1.1] mb-10"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
            >
              Thoughtful Protection <br /> For Everyday Life
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-14 py-6 rounded-full bg-[#3a2a22] text-[#f7f3ee] font-mono text-[0.75rem] tracking-[0.25em] uppercase font-black transition-transform duration-300 hover:-translate-y-1">
                Explore Collection
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
