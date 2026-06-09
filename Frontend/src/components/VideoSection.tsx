import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Shield, Wind, Activity } from "lucide-react";
import { easeGsap, useIsMobile } from "@/design-system";

// Premium mobile easing (matches the rest of the mobile motion language).
const MOBILE_EASE = [0.22, 1, 0.36, 1] as const;

// Mobile-only compact feature row shown below the video (md:hidden on desktop).
const videoFeatures = [
  { icon: Shield, label: "Coverage Design" },
  { icon: Wind, label: "Breathable In Heat" },
  { icon: Activity, label: "Built For Movement" },
];

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  // Lazy-load the 3.4 MB video. Only attach <source> once the section is
  // about to enter the viewport, so first-paint never waits for it.
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Tell the <video> to actually fetch once we've attached the <source>.
  useEffect(() => {
    if (shouldLoadVideo) videoRef.current?.load();
  }, [shouldLoadVideo]);

  const trustItems = [
    "Lightweight",
    "Certified UV Protection",
    "Full Coverage",
    "Thoughtful Protection",
    "Built for Indian Conditions",
    "Breathable",
    "More Freedom",
  ];
  const loop = [...trustItems, ...trustItems];

  useEffect(() => {
    // Skip the GSAP pin entirely on mobile — scroll-jacking a 50vh hold on a
    // small screen interrupts the reading flow and competes with native
    // momentum. Mobile gets the video at its natural full-bleed state without
    // the cinematic scale-in.
    if (isMobile) return;

    const ctx = gsap.context(() => {
      if (videoContainerRef.current) {
        // Light cinematic hold — pinned for ~80vh (vs the old 200vh trap) with
        // a snappier scrub (0.8) and anticipatePin so the magnet engages
        // smoothly. pinSpacing default (true) lets ScrollTrigger reserve the
        // exact scroll budget; no manual 200vh spacer needed.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=50%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Video scale-in / border-radius / border / shadow easing — untouched.
        tl.fromTo(
          videoContainerRef.current,
          {
            scale: 0.65,
            borderRadius: "4rem",
            border: "2px solid rgba(245,130,13,0.3)",
            boxShadow: "0 40px 100px rgba(58,42,34,0.15)",
          },
          {
            scale: 1,
            borderRadius: "0rem",
            border: "0px solid rgba(245,130,13,0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 1,
            ease: easeGsap.power2InOut,
          },
        );

        if (textContentRef.current) {
          // Middle-ground exit — softer than the 200vh-era pin, more present
          // than the no-pin flow, so it reads cinematic in ~80vh of scrub.
          tl.to(
            textContentRef.current,
            {
              autoAlpha: 0,
              y: -100,
              scale: 0.93,
              filter: "blur(8px)",
              duration: 0.7,
              ease: easeGsap.power2InOut,
            },
            0,
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile-only entrance reveals — desktop keeps its GSAP scroll choreography,
  // so these props are empty on desktop (no conflict). GPU-cheap: opacity,
  // translateY and a small scale only.
  const reveal = (delay = 0) =>
    isMobile
      ? {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.5, delay, ease: MOBILE_EASE },
        }
      : {};

  const videoReveal = isMobile
    ? {
        initial: { opacity: 0, scale: 0.96 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: MOBILE_EASE },
      }
    : {};

  return (
    <div className="contents m-video-screen">
      {/* Section headline — one line, big & bold, sits above the video */}
      <header className="relative w-full bg-transparent px-6 pt-10 md:pt-14 pb-2 md:pb-3 text-center">
        {/* Mobile section label (mobile only) */}
        <motion.div
          {...reveal(0)}
          className="md:hidden mb-3 flex items-center justify-center gap-2.5"
        >
          <span className="h-px w-5 bg-[#3a2a22]/20" />
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#c76600]">
            Protection In Motion
          </span>
          <span className="h-px w-5 bg-[#3a2a22]/20" />
        </motion.div>
        <motion.h2
          {...reveal(0.08)}
          className="font-display font-extrabold text-[#3a2a22] tracking-tight leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(1.5rem, 5.5vw, 4.25rem)" }}
        >
          Beyond coverage. <span className="text-[#c76600]">Beyond ordinary.</span>
        </motion.h2>
      </header>

      <motion.section
        ref={sectionRef}
        id="video-section"
        {...videoReveal}
        className="m-video relative w-full h-svh md:h-screen overflow-hidden bg-transparent z-0"
      >
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="video-ambient-drift" />
          <div className="video-orb video-orb-1 -top-32 -left-32 w-[32rem] h-[32rem]" />
          <div className="video-orb video-orb-2 -bottom-32 -right-32 w-[36rem] h-[36rem]" />
        </div>

        <div
          ref={videoContainerRef}
          className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-black"
          style={{ willChange: "transform, border-radius" }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-90"
          >
            {shouldLoadVideo && (
              <>
                <source src="/soliva-logo-anim.webm" type="video/webm" />
                <source src="/soliva-logo-anim.mp4" type="video/mp4" />
              </>
            )}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/15 via-transparent to-brown-deep/30 pointer-events-none" />
        </div>

        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-line-soft bg-surface-panel-strong backdrop-blur-medium py-3 sm:py-4 overflow-hidden shadow-strip-top">
          <div className="marquee flex w-max gap-3 whitespace-nowrap">
            {loop.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-xs tracking-[0.04em] text-brown-deep/60 font-bold"
              >
                {t}
                <span className="text-xs text-brown-deep/40">*</span>
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mobile compact feature row — sits below the video (mobile only) */}
      <div className="md:hidden grid grid-cols-3 gap-2 px-6">
        {videoFeatures.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            {...reveal(0.12 + i * 0.09)}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#c76600]/[0.08] text-[#c76600]">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[0.55rem] font-semibold uppercase leading-tight tracking-[0.06em] text-[#3a2a22]/70">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
