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
    "ADVANCED UV DEFENSE",
    "DUAL-LAYER COMFORT",
    "FULL COVERAGE DESIGN",
    "BREATHABLE IN HEAT",
    "LIGHTWEIGHT DAILY WEAR",
    "NO SMUDGING",
    "NO MORE MESSY HAIR",
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

  return (
    <>
      {/* Section headline — one line, big & bold, sits above the video */}
      <header className="relative w-full bg-transparent px-6 pt-10 md:pt-14 pb-2 md:pb-3 text-center">
        <h2
          className="font-display font-extrabold text-[#3a2a22] tracking-tight leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(1.5rem, 5.5vw, 4.25rem)" }}
        >
          Beyond coverage. <span className="text-[#c76600]">Beyond ordinary.</span>
        </h2>
      </header>

      <section
        ref={sectionRef}
        id="video-section"
        className="relative w-full h-screen overflow-hidden bg-transparent z-0"
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
            {shouldLoadVideo && <source src="/soliva-logo-anim.mp4" type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brown-deep/15 via-transparent to-brown-deep/30 pointer-events-none" />
        </div>

        <div className="absolute bottom-0 inset-x-0 z-30 border-t border-line-soft bg-surface-panel-strong backdrop-blur-medium py-3 sm:py-4 overflow-hidden shadow-strip-top">
          <div className="marquee flex w-max gap-10 sm:gap-16 whitespace-nowrap">
            {loop.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-10 sm:gap-16 text-micro-xs sm:text-micro-sm tracking-eyebrow sm:tracking-luxe text-brown-deep/60 font-bold uppercase"
              >
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
