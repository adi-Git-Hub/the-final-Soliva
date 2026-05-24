import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const INTERVAL = 4000;
const DURATION = 1;

export function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const next = useCallback(() => {
    setActive((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-transparent"
    >
      {/* HeroViewport — fullscreen, overflow hidden */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">

        {/* SliderTrack — 200% width, holds exactly 2 slides */}
        <motion.div
          animate={{ x: active === 0 ? "0%" : "-50%" }}
          transition={{ duration: DURATION, ease: [0.4, 0, 0.15, 1] }}
          className="absolute inset-y-0 left-0 flex will-change-transform"
          style={{ width: "200%" }}
        >
          {/* Slide 1 — 50% of track = 100% of viewport */}
          <div className="relative h-full w-1/2 shrink-0">
            <img
              src="/hero-image.webp"
              alt="Soliva SunWrap — Engineered Sun Protection"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Slide 2 — 50% of track = 100% of viewport */}
          <div className="relative h-full w-1/2 shrink-0">
            <img
              src="/hero-banner-2.webp"
              alt="Soliva — Advanced UV Defense"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-beige/20 via-transparent to-luxury-beige/10 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(58,42,34,0.04)_100%)] pointer-events-none z-10" />

        {/* Indicators */}
        <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Banner ${i + 1}`}
              className="relative h-[2.5px] rounded-full overflow-hidden transition-all duration-500"
              style={{ width: active === i ? 32 : 14 }}
            >
              <div className="absolute inset-0 bg-white/30" />
              {active === i && (
                <motion.div
                  key={`fill-${active}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-white/80 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
