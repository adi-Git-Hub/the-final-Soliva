import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for the refined editorial sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // STEP 1: Image Card Reveal (3D Perspective Flip)
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
          rotationY: 10,
          filter: "blur(12px)",
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
      );

      // STEP 2: Staggered Text Content Reveal (After image finishes)
      const textElements = textContentRef.current?.children;
      if (textElements) {
        tl.fromTo(
          Array.from(textElements),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.25,
            ease: "expo.out",
          },
          "-=0.4", // Slight overlap for fluid transition
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-luxury-beige/60 flex items-center justify-center py-20 md:py-28 overflow-hidden z-10"
    >
      {/* Background Mesh (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_70%_20%,rgba(243,236,226,0.8),transparent_70%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* Editorial Grid Container */}
      <div className="container relative mx-auto px-8 md:px-16 lg:px-24 max-w-[90rem] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-center">
          {/* LEFT: Large vertical rounded image card */}
          <div className="relative flex justify-center md:justify-end order-2 md:order-1">
            <div
              ref={imageRef}
              className="relative w-full max-w-[480px] aspect-[4/5] rounded-panel-lg overflow-hidden shadow-editorial bg-cream will-change-transform border border-line-soft"
            >
              <img
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
                alt="Cinematic Urban Exposure"
                className="h-full w-full object-cover grayscale-[0.3] contrast-[1.05] brightness-[0.95]"
              />
              {/* Subtle Atmospheric Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/30 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 grain opacity-[0.03] pointer-events-none" />
            </div>
          </div>

          {/* RIGHT: Editorial typography content in a premium translucent panel */}
          <div
            className="flex flex-col space-y-12 md:space-y-14 order-1 md:order-2 bg-surface-panel border border-line-hairline rounded-panel-lg p-10 md:p-16 backdrop-blur-medium shadow-sm relative overflow-hidden"
          >
            {/* Inner ambient glow for the text panel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(245,130,13,0.02),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(252,231,243,0.1),transparent_50%)] pointer-events-none" />

            <div ref={textContentRef} className="relative z-10 space-y-12">
              {/* Small uppercase label */}
              <div className="overflow-hidden flex items-center gap-4">
                <span className="block h-px w-6 bg-brown/20" />
                <span className="block font-mono text-micro-md tracking-editorial text-orange-glow uppercase font-bold">
                  STORYLINE 01 — THE CONTEXT
                </span>
              </div>

              {/* Large serif headline */}
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-hero text-brown-deep tracking-tight">
                The city is <br />
                <span className="italic font-normal text-orange-glow opacity-90 drop-shadow-glow-soft">designed</span> to <br />
                test you.
              </h2>

              {/* Supporting paragraph */}
              <div className="space-y-8 max-w-lg">
                <p className="font-light text-xl md:text-2xl text-ink-soft leading-relaxed">
                  Daily exposure to pollution, UV radiation, and trapped heat affects urban comfort
                  more than we realize.
                </p>
              </div>

              {/* Bottom faded statement */}
              <div className="pt-10 md:pt-12 border-t border-line-soft">
                <p className="font-mono text-micro-lg tracking-cta uppercase text-ink-faint italic leading-loose max-w-md font-bold">
                  Traditional fabrics were never designed <br />
                  for modern urban conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
