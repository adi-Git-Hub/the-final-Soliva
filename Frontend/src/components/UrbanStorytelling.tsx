import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SolivaLogo } from "./SolivaLogo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ease, easeGsap, useIsMobile } from "@/design-system";

gsap.registerPlugin(ScrollTrigger);

const problemPoints = [
  {
    id: 1,
    tag: "RADIANCE",
    title: "Silent Radiance",
    desc: "Harmful UV rays penetrate ordinary fabrics during everyday commuting, continuously exposing skin even when covered.",
    image: "/sun.webp",
    metrics: [
      { k: "UVA", v: "320–400nm" },
      { k: "BLOCK RATE", v: "<40%" },
      { k: "EXPOSURE INDEX", v: "EXT 09" },
    ],
  },
  {
    id: 2,
    tag: "ATMOSPHERE",
    title: "Atmospheric Debt",
    desc: "Dust, smoke, and micro-pollutants settle through loose fabrics and uncovered gaps during urban travel.",
    image: "/dust.webp",
    metrics: [
      { k: "PM2.5", v: "142 μg/m³" },
      { k: "PARTICLE SIZE", v: "0.3 μ" },
      { k: "FILTER STATUS", v: "OPEN" },
    ],
  },
  {
    id: 3,
    tag: "FRICTION",
    title: "Kinetic Friction",
    desc: "Traditional scarves constantly shift during movement, forcing repeated adjustment and reducing practical protection.",
    image: "/constant-slipping.webp",
    metrics: [
      { k: "SLIP RATE", v: "18/hr" },
      { k: "ANCHOR", v: "NONE" },
      { k: "ADJUSTMENT", v: "CONSTANT" },
    ],
  },
  {
    id: 4,
    tag: "THERMAL",
    title: "Stifled Breath",
    desc: "Heavy layered fabrics trap heat and reduce airflow, making long daily wear uncomfortable in Indian weather conditions.",
    image: "/heate-sufacation.webp",
    metrics: [
      { k: "TEMP LOAD", v: "+6°C" },
      { k: "AIRFLOW", v: "BLOCKED" },
      { k: "HEAT STATE", v: "TRAPPED" },
    ],
  },
  {
    id: 5,
    tag: "EXPOSURE",
    title: "Residual Exposure",
    desc: "Critical areas like the neck, ears, jawline, and side profile remain exposed despite being partially covered.",
    image: "/incompelete-protection.webp",
    metrics: [
      { k: "COVERAGE", v: "PARTIAL" },
      { k: "GAP ZONES", v: "MULTI-ZONE" },
      { k: "EXPOSED AREA", v: "62%" },
    ],
  },
];

const rationalePoints = [
  {
    title: "Adaptive Coverage Architecture",
    desc: "Designed to maintain stable protection across movement, reducing exposed zones during everyday commuting.",
  },
  {
    title: "Atmospheric Intelligence",
    desc: "Built for Indian environmental conditions including UV exposure, dust, pollution, and trapped urban heat.",
  },
  {
    title: "Breathable Mobility System",
    desc: "Dual-layer comfort structure engineered for airflow, long-duration wearability, and lightweight daily use.",
  },
  {
    title: "Kinetic Stability",
    desc: "Minimizes slipping, shifting, and repeated adjustment during active movement and two-wheeler commuting.",
  },
];

const productGallery = ["/1.webp", "/2.webp"];

export function UrbanStorytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  // Scroll logic for global interaction
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const buttonRotateX = useTransform(scrollYProgress, [0.9, 1], [90, 0]);
  const buttonOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
  const buttonScale = useTransform(scrollYProgress, [0.9, 1], [0.8, 1]);

  // Refs for animations
  const p2VisualRef = useRef<HTMLDivElement>(null);
  const p2TextRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=250%",
            anticipatePin: 1,
            pinSpacing: false,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Elements
        const p1Headline = ".p1-headline";
        const p1Subtext = ".p1-subtext";
        const p1Labels = ".p1-label";
        const cards = ".problem-card-container";
        const cardMetrics = ".card-metric";

        // Initial setup
        gsap.set([p1Headline, p1Subtext, p1Labels, cards, cardMetrics], { autoAlpha: 0 });

        // --- PANEL 1 SEQUENCE ---
        tl.fromTo(
          p1Headline,
          { autoAlpha: 0, y: 50, filter: "blur(15px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 2, ease: easeGsap.power4Out },
        );
        tl.fromTo(
          p1Subtext,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.5, ease: easeGsap.power3Out },
          "-=1.5",
        );
        tl.fromTo(
          p1Labels,
          { autoAlpha: 0, scaleX: 0, transformOrigin: "left" },
          { autoAlpha: 1, scaleX: 1, stagger: 0.2, duration: 1.2, ease: easeGsap.expoOut },
          "-=1.2",
        );
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 40, rotationY: -10 },
          { autoAlpha: 1, y: 0, rotationY: 0, duration: 2, stagger: 0.2, ease: easeGsap.power3Out },
          "-=1.0",
        );
        tl.fromTo(
          cardMetrics,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: easeGsap.power3Out },
          "-=0.5",
        );

        tl.to({}, { duration: 1 });

        // --- TRANSITION ---
        tl.to(containerRef.current, { xPercent: -50, duration: 3, ease: easeGsap.power2InOut });

        // Background Logo Parallax during transition
        tl.to(
          bgLogoRef.current,
          { x: -100, rotation: -5, duration: 3, ease: easeGsap.power2InOut },
          "-=3",
        );

        // --- PANEL 2 SEQUENCE ---
        const p2Headline = ".p2-headline";
        const p2Subtext = ".p2-subtext";
        const rationaleItems = ".rationale-point";
        const rationaleNumbers = ".rationale-number";

        gsap.set([p2Headline, p2Subtext, rationaleItems, rationaleNumbers], { autoAlpha: 0 });

        tl.fromTo(
          p2VisualRef.current,
          { autoAlpha: 0, scale: 0.95, rotationY: 10 },
          { autoAlpha: 1, scale: 1, rotationY: 0, duration: 2, ease: easeGsap.expoOut },
          "-=1.5",
        );
        tl.fromTo(
          p2Headline,
          { autoAlpha: 0, y: 60, filter: "blur(15px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: easeGsap.power4Out },
          "-=1.5",
        );
        tl.fromTo(
          p2Subtext,
          { autoAlpha: 0, opacity: 0 },
          { autoAlpha: 1, opacity: 1, duration: 1.5 },
          "-=1.2",
        );
        tl.fromTo(
          rationaleNumbers,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, stagger: 0.3, duration: 1, ease: easeGsap.power3Out },
          "-=1.0",
        );
        tl.fromTo(
          rationaleItems,
          { autoAlpha: 0, x: 30 },
          { autoAlpha: 1, x: 0, stagger: 0.3, duration: 1.5, ease: easeGsap.power3Out },
          "-=1.2",
        );

        tl.to({}, { duration: 2 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % productGallery.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + productGallery.length) % productGallery.length);

  return (
    <>
      <section
        ref={sectionRef}
        id="urban-storytelling"
        className="relative bg-transparent w-full z-10 overflow-hidden min-h-screen md:h-screen"
      >
        {/* Animated Background Gradients — calmer 1-axis breath, longer cycles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ opacity: [0.35, 0.45, 0.35] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,var(--cream),transparent)] blur-[120px]"
          />
          <motion.div
            animate={{ opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[-10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,130,13,0.1),transparent)] blur-[150px]"
          />
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10 bg-gradient-to-b from-luxury-beige/50 to-transparent" />

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row md:flex-nowrap md:w-[200%] md:h-full items-center z-10 relative overflow-visible"
        >
          {/* PANEL 1 — EDITORIAL GRID PROBLEM */}
          <div className="relative flex flex-col w-full md:h-full md:w-1/2 justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-14 pb-10 sm:pt-16 sm:pb-12 md:pt-16 md:pb-12 lg:pt-18 lg:pb-14 flex-shrink-0 overflow-visible">
            <div className="flex flex-col w-full gap-y-3 sm:gap-y-4 md:gap-y-5 max-w-[1400px] mx-auto relative z-10 overflow-visible">
              <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-10 overflow-visible bg-surface-glass-ghost border border-line-hairline rounded-panel-sm sm:rounded-panel md:rounded-panel-lg p-4 sm:p-5 md:p-7 backdrop-blur-medium shadow-sm">
                <div className="max-w-3xl space-y-2 z-10 overflow-visible">
                  <span className="p1-label block font-mono text-micro-sm uppercase tracking-editorial text-ink-soft mb-0.5 font-bold">
                    STRESSOR MAP
                  </span>
                  <div className="relative overflow-visible">
                    <h2 className="p1-headline font-display text-sculpted text-[clamp(1.4rem,3vw,2.5rem)] leading-display-tight tracking-display text-brown-deep py-1">
                      Protection is often an{" "}
                      <span className="italic font-normal text-orange-glow">
                        illusion
                      </span>{" "}
                      we choose to believe.
                    </h2>
                  </div>
                </div>
                <div className="md:max-w-[220px] flex flex-col items-start md:items-end gap-2 md:mt-10">
                  <div className="p1-label hidden md:block h-px w-8 bg-brown/20" />
                  <p className="p1-subtext text-micro-lg md:text-xs font-light text-brown leading-relaxed italic md:text-right">
                    Everyday commuting silently exposes people to{" "}
                    <span className="text-orange-glow font-medium">
                      UV rays, pollution, trapped heat,
                    </span>{" "}
                    and incomplete coverage — even while feeling “covered.”
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="p1-label font-mono text-micro-sm tracking-luxe text-ink-soft uppercase">
                  STRESSOR MAP
                </span>
                <span className="block h-px flex-1 bg-brown/15" />
                <span className="p1-label hidden sm:block font-mono text-micro-sm tracking-luxe text-ink-faint uppercase">
                  05 VECTORS
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 items-start">
                {problemPoints.map((point) => (
                  <div
                    key={point.id}
                    className="problem-card-container flex-shrink-0 space-y-1.5 group cursor-pointer relative bg-surface-panel-strong border border-line-soft rounded-xl sm:rounded-2xl p-2 sm:p-2.5 backdrop-blur-subtle hover:bg-surface-glass-strong transition-all duration-500 shadow-sm"
                  >
                    <div className="flex items-center justify-between px-1 mb-1.5">
                      <span className="font-mono text-micro-xs tracking-eyebrow text-orange-glow font-bold uppercase">
                        {point.tag}
                      </span>
                      <span className="font-mono text-micro-xs tracking-cta text-ink-muted">
                        0{point.id}
                        <span className="text-ink-faint"> / 05</span>
                      </span>
                    </div>
                    <div
                      className="relative aspect-[3/4] rounded-xl overflow-hidden bg-cream perspective-1000 border border-line-hairline"
                    >
                      <img
                        src={point.image}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover grayscale-[0.1] contrast-[1.1] brightness-[1.05] transition-transform duration-[2000ms] group-hover:scale-105"
                        alt={point.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/40 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-1.5 left-1.5 h-5 w-5 rounded-full border border-white/30 bg-black/30 flex items-center justify-center text-micro-xs font-mono text-white/90">
                        0{point.id}
                      </div>
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[6px] font-mono tracking-soft text-white/90 uppercase">
                        <span>SLV · F26</span>
                        <span className="block h-px w-3 bg-surface-glass-strong" />
                        <span>EXHIBIT</span>
                      </div>
                    </div>
                    <div className="space-y-1 px-1 pt-1.5 transition-opacity duration-500 group-hover:opacity-100 opacity-90">
                      <h3 className="font-display text-sm lg:text-base text-brown-deep leading-tight tracking-tight">
                        {point.title}
                      </h3>
                      <p className="font-light text-micro-sm text-brown leading-relaxed line-clamp-2">
                        {point.desc}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-1 px-1 pt-1.5 mt-1 border-t border-line-soft">
                      {point.metrics.map((m) => (
                        <div key={m.k} className="card-metric space-y-0.5">
                          <span className="block font-mono text-[6px] tracking-eyebrow text-ink-muted uppercase">
                            {m.k}
                          </span>
                          <span className="block font-mono text-micro-xs tracking-soft text-brown-deep font-bold">
                            {m.v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p1-label hidden md:flex items-center justify-between pt-3 border-t border-line-soft px-3">
                <div className="flex items-center gap-3">
                  <span className="block h-1.5 w-1.5 rounded-full bg-accent-soft animate-premium-pulse" />
                  <span className="font-mono text-micro-sm tracking-luxe text-ink-muted uppercase font-bold">
                    Field Study — Delhi · Aug 2025
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-micro-sm tracking-luxe text-ink-muted uppercase">
                  <span>Subjects · 142</span>
                  <span className="block h-px w-5 bg-brown/20" />
                  <span>Hours Logged · 2,310</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2 — THE RATIONALE */}
          <div className="relative flex w-full md:h-full md:w-1/2 items-center bg-transparent px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 py-14 sm:py-16 md:py-0 flex-shrink-0 overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center w-full max-w-[1400px] mx-auto relative z-10 overflow-visible">
              {/* IMMERSIVE PRODUCT SHOWCASE — REDUCED SCALE TO FIX CLIPPING */}
              <div ref={p2VisualRef} className="relative aspect-square group scale-[0.94] origin-center">
                <div
                  className="absolute inset-0 bg-surface-glass-strong border border-line-hairline rounded-shell overflow-hidden shadow-editorial backdrop-blur-medium"
                >
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(var(--brown-deep) 0.5px, transparent 0.5px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Gallery Container — Full Bleed Immersive */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Background Logo Glow with Parallax */}
                    <div
                      ref={bgLogoRef}
                      className="absolute opacity-[0.02] scale-150 rotate-[-12deg] z-0"
                    >
                      <SolivaLogo variant="icon" height={400} />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, x: 20, scale: 1.05 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: ease.smooth }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <img
                          src={productGallery[activeImage]}
                          alt={`Soliva Product View ${activeImage + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Soft Ambient Overlay for Premium Feel */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brown-deep/10 via-transparent to-white/10 pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Minimal Interactive Controls */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button
                        onClick={prevImage}
                        className="p-3 rounded-full bg-surface-glass backdrop-blur-medium border border-white/40 text-brown-deep hover:bg-surface-glass-strong transition-all shadow-sm"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="p-3 rounded-full bg-surface-glass backdrop-blur-medium border border-white/40 text-brown-deep hover:bg-surface-glass-strong transition-all shadow-sm"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                      {productGallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`h-1.5 transition-all duration-700 rounded-full ${activeImage === i ? "w-8 bg-orange-glow" : "w-1.5 bg-brown-deep/30"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Certification Card — calmer 1-axis drift */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-6 left-6 z-40 p-3.5 rounded-3xl bg-surface-glass-strong border border-white/50 backdrop-blur-medium shadow-floating pointer-events-none"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-micro-xs uppercase tracking-widest text-orange-glow font-bold">
                        Certified Protection
                      </span>
                      <span className="font-display text-xl text-brown-deep leading-none">Advanced UV Defense</span>
                      <div className="h-px w-full bg-brown/10 my-1.5" />
                      <span className="font-mono text-micro-xs text-ink-soft uppercase tracking-tighter">
                        Blocks 98% of UV Rays
                      </span>
                    </div>
                  </motion.div>

                  {/* System Core Micro Label */}
                  <div className="absolute top-8 right-8 flex items-center gap-3 opacity-40 z-40">
                    <span className="font-mono text-micro-xs uppercase tracking-eyebrow text-brown-deep font-bold">
                      System Core
                    </span>
                    <div className="h-px w-8 bg-brown-deep" />
                  </div>
                </div>
              </div>

              <div ref={p2TextRef} className="space-y-4 sm:space-y-5 md:space-y-6 bg-surface-panel border border-line-hairline rounded-panel-sm sm:rounded-panel md:rounded-panel-lg p-4 sm:p-6 md:p-7 backdrop-blur-medium shadow-sm max-w-full">
                <div className="space-y-2 relative">
                  <span className="block font-mono text-micro-sm uppercase tracking-editorial text-orange-glow font-bold">
                    02 — THE RATIONALE
                  </span>
                  <h2 className="p2-headline font-display text-sculpted leading-hero tracking-tight text-brown-deep" style={{ fontSize: "clamp(1.4rem, 4.5vw, 3rem)" }}>
                    Engineered for <br />
                    <span className="italic font-normal text-orange-glow">Everyday Exposure.</span>
                  </h2>
                  <p className="p2-subtext max-w-xl text-micro-lg md:text-xs text-ink-soft leading-relaxed font-light italic">
                    Protection should move naturally with the body — without heat, friction,
                    constant adjustment, or discomfort.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {rationalePoints.map((point, i) => (
                    <div
                      key={i}
                      className="rationale-point group flex items-start gap-4 cursor-default p-3 rounded-xl hover:bg-surface-glass transition-colors duration-500 border border-transparent hover:border-line-hairline"
                    >
                      <span className="rationale-number font-mono text-micro-sm text-orange-glow/80 pt-1 font-bold">
                        0{i + 1}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-display text-base md:text-lg text-brown-deep tracking-tight transition-colors duration-500 font-medium">
                          {point.title}
                        </h4>
                        <p className="text-micro-md text-ink-soft leading-relaxed font-light max-w-md group-hover:text-brown transition-colors duration-500">
                          {point.desc}
                        </p>
                        <div className="h-px bg-orange-glow/40 w-0 group-hover:w-full transition-all duration-700 mt-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LUXURY FOOTER STRIP */}
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 w-full px-12 lg:px-16 py-4 items-center border-t border-line-soft bg-luxury-beige/60 backdrop-blur-medium shadow-strip-top">
          {/* LEFT — Logo */}
          <div className="flex flex-1 items-center min-w-0">
            <div className="opacity-90 hover:opacity-100 transition-opacity duration-500 shrink-0">
              <SolivaLogo height={22} />
            </div>
          </div>

          {/* CENTER — Philosophy anchor */}
          <div className="hidden lg:flex flex-1 justify-center px-6">
            <p className="font-display text-base xl:text-lg text-brown-deep leading-none tracking-tight text-nowrap">
              Thoughtfully layered.{" "}
              <span className="italic text-orange-glow drop-shadow-sm">
                Effortlessly worn.
              </span>
            </p>
          </div>

          {/* RIGHT — CTA */}
          <div className="perspective-2000 flex flex-1 justify-end">
            <motion.button
              onClick={() => navigate({ to: "/products", search: { sort: "newest" } })}
              style={{
                rotateX: buttonRotateX,
                opacity: buttonOpacity,
                scale: buttonScale,
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 15px 35px -10px rgba(245,130,13,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden flex items-center gap-4 px-8 py-2.5 rounded-full bg-gradient-to-r from-brown to-orange-glow border border-white/30 shadow-sm"
            >
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
              <span className="font-body text-micro-md font-bold tracking-cta uppercase text-white relative z-10">
                ENGINEERED FOR MOVEMENT →
              </span>
              <svg
                width="14"
                height="10"
                viewBox="0 0 16 12"
                fill="none"
                className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-500"
              >
                <path
                  d="M10 1L15 6L10 11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M1 6H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Spacer — only reserved on desktop where the GSAP pin consumes scroll.
          Sized to match the ScrollTrigger end (+=250%). */}
      <div className="hidden md:block md:h-[250vh] w-full pointer-events-none bg-transparent relative overflow-hidden" />
    </>
  );
}
