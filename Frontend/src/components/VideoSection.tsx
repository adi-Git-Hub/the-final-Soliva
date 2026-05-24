import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easeGsap, useIsMobile } from "@/design-system";

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
    "ADVANCED UV DEFENSE", "DUAL-LAYER COMFORT", "FULL COVERAGE DESIGN",
    "BREATHABLE IN HEAT", "LIGHTWEIGHT DAILY WEAR", "NO SMUDGING", "NO MORE MESSY HAIR",
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
        tl.fromTo(videoContainerRef.current,
          { scale: 0.65, borderRadius: "4rem", border: "2px solid rgba(245,130,13,0.3)", boxShadow: "0 40px 100px rgba(58,42,34,0.15)" },
          { scale: 1, borderRadius: "0rem", border: "0px solid rgba(245,130,13,0)", boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 1, ease: easeGsap.power2InOut }
        );

        if (textContentRef.current) {
          // Middle-ground exit — softer than the 200vh-era pin, more present
          // than the no-pin flow, so it reads cinematic in ~80vh of scrub.
          tl.to(textContentRef.current, {
            autoAlpha: 0,
            y: -100,
            scale: 0.93,
            filter: "blur(8px)",
            duration: 0.7,
            ease: easeGsap.power2InOut
          }, 0);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      {/* Amber luxury ribbon — vertical amber-fade gradient blends into Hero
          above and VideoSection below (no hard borders), with bridge-strip
          pseudo-layers (warm drift + white light streak) sweeping across as
          glass shimmer. Glassmorphism via backdrop-blur. */}
      <div className="bridge-strip relative z-0 w-full bg-gradient-to-b from-orange-glow/5 via-orange-glow/30 to-orange-glow/5 backdrop-blur-subtle">
        <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 md:py-4">
          <p className="font-display italic text-body-xs sm:text-sm md:text-base text-brown-deep tracking-nav sm:tracking-cta text-center">
            {"Built for Indian streets. Refined for modern living."
              .split(" ")
              .map((word, i, arr) => (
                <span
                  key={i}
                  className="punchline-word"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {word}
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
          </p>
        </div>
      </div>

      <section ref={sectionRef} id="video-section" className="relative w-full h-screen overflow-hidden bg-transparent z-0">
        {/* Cinematic atmospheric depth — soft amber drift + two floating glow
            orbs that peek into the section corners while the video container
            is scaled in (0.65 → 1.0). Hidden naturally once the video fills
            the section. z-1 so video (z-10), glass card (z-20) and marquee
            (z-30) all sit above. */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="video-ambient-drift" />
          <div className="video-orb video-orb-1 -top-32 -left-32 w-[32rem] h-[32rem]" />
          <div className="video-orb video-orb-2 -bottom-32 -right-32 w-[36rem] h-[36rem]" />
        </div>

        <div
          ref={textContentRef}
          className="absolute left-1/2 top-6 z-20 w-full max-w-3xl -translate-x-1/2 px-4 text-center pointer-events-none sm:top-8 sm:px-6 md:top-10"
        >
          <div className="inline-block w-full rounded-panel-sm border border-line-hairline bg-surface-panel p-5 backdrop-blur-medium shadow-sm sm:rounded-panel sm:p-8 md:rounded-panel-lg md:p-10">
            <span className="mb-3 block text-micro-sm font-bold uppercase tracking-luxe text-orange-glow sm:mb-4 sm:text-micro-md sm:tracking-editorial">— SYSTEM CORE 01</span>
            <h2
              className="text-sculpted mt-1 font-display text-brown-deep leading-hero tracking-tight sm:mt-2 text-display-md"
            >
              Built For Real <span className="italic text-orange-glow">Daily Protection.</span>
            </h2>
          </div>
        </div>

        <div ref={videoContainerRef} className="absolute inset-0 z-10 w-full h-full overflow-hidden bg-black" style={{ willChange: "transform, border-radius" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-90"
          >
            {shouldLoadVideo && <source src="/soliva-logo-anim.mp4" type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/15 via-transparent to-brown-deep/30 pointer-events-none" />
        </div>

        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-line-soft bg-surface-panel-strong backdrop-blur-medium py-3 sm:py-4 overflow-hidden shadow-strip-top">
          <div className="marquee flex w-max gap-10 sm:gap-16 whitespace-nowrap">
            {loop.map((t, i) => (
              <span key={i} className="flex items-center gap-10 sm:gap-16 text-micro-xs sm:text-micro-sm tracking-eyebrow sm:tracking-luxe text-brown-deep/60 font-bold uppercase">
                {t}
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
