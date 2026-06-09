import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    tag: "01",
    title: "Advanced UV Defense",
    desc: "Engineered to block 98% of UVA/UVB rays during peak commute hours.",
  },
  {
    tag: "02",
    title: "Breathable Dual Layer",
    desc: "Two micro-perforated layers that exchange heat without losing coverage.",
  },
  {
    tag: "03",
    title: "Full Coverage Design",
    desc: "Wraps from crown to collarbone with no gaps — no constant adjusting.",
  },
  {
    tag: "04",
    title: "Lightweight Comfort",
    desc: "Under 90 grams. You'll forget you're wearing it.",
  },
  {
    tag: "05",
    title: "Designed For Indian Conditions",
    desc: "Tested across heat, monsoon humidity, and Tier-1 city pollution.",
  },
];

export function TechSection() {
  const containerRef = useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-beige/60 py-24 md:py-32 perspective-2000 z-20"
    >
      {/* LUXURY EDITORIAL BACKGROUND SYSTEM */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Drifting Mesh Gradients */}
        <div
          className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80 transition-transform duration-1000"
          style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70 transition-transform duration-1000"
          style={{ transform: `translate3d(0, ${scrollY * -0.05}px, 0)` }}
        />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 z-10">
        <div className="flex flex-col items-center text-center reveal-on-scroll mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-brown/20" />
            <span className="text-micro-md tracking-editorial text-orange-glow uppercase font-black">
              FABRIC TECHNOLOGY
            </span>
            <div className="h-px w-8 bg-brown/20" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-brown-deep leading-hero tracking-tight">
            Engineered as a
            <br />
            <span className="italic font-serif text-orange-glow drop-shadow-glow-soft">
              single layer of relief.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center bg-surface-panel border border-line-soft rounded-panel-lg p-8 md:p-16 backdrop-blur-medium shadow-editorial">
          {/* 3D scarf object */}
          <div className="reveal-on-scroll relative flex items-center justify-center min-h-[400px] transform-gpu">
            <div className="absolute inset-0 flex items-center justify-center rotate-slow scale-110 opacity-60">
              <svg viewBox="0 0 400 400" className="h-full w-full max-w-sm">
                <defs>
                  <linearGradient id="scarf" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5820d" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a55300" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 24 }).map((_, i) => {
                  const r = 80 + i * 4;
                  return (
                    <ellipse
                      key={i}
                      cx="200"
                      cy="200"
                      rx={r}
                      ry={r * 0.4}
                      fill="none"
                      stroke="url(#scarf)"
                      strokeWidth="0.8"
                      opacity={0.7 - i * 0.025}
                      transform={`rotate(${i * 7} 200 200)`}
                    />
                  );
                })}
              </svg>
            </div>

            <div
              className="relative float-y will-change-transform"
              style={{
                transform: `translate3d(0, ${scrollY * -0.05}px, 0) rotateY(${scrollY * 0.05}deg)`,
              }}
            >
              <div className="h-40 w-40 rounded-full bg-accent-faint blur-[60px] animate-premium-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-28 w-28 rounded-full border border-line-accent bg-surface-panel-strong backdrop-blur-medium shadow-glow-soft" />
              </div>
            </div>

            {/* airflow lines */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox="0 0 400 500"
            >
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M ${50 + i * 30} 50 Q 200 ${200 + i * 20} ${350 - i * 30} 450`}
                  stroke="#f5820d"
                  strokeWidth="0.6"
                  fill="none"
                  strokeDasharray="2 8"
                  opacity="0.3"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    dur={`${4 + i}s`}
                    repeatCount="indefinite"
                    values="0;-100"
                  />
                </path>
              ))}
            </svg>
          </div>

          {/* Tech features */}
          <div className="flex flex-col">
            {features.map((f, i) => (
              <div
                key={f.tag}
                className="reveal-on-scroll group flex gap-6 border-t border-line-soft bg-transparent hover:bg-surface-glass-strong py-8 px-6 transition-all duration-500 rounded-2xl cursor-default"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex-1">
                  <h4 className="font-display text-2xl text-brown-deep group-hover:text-orange-glow transition-all duration-500 tracking-tight">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed font-light transition-colors">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-line-soft w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
