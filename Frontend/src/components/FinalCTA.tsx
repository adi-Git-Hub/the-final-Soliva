import { useState } from "react";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { SolivaLogo } from "./SolivaLogo";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ease, viewportOnce } from "@/design-system";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useScrollReveal();

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-cinematic-veil grain py-12 sm:py-14 lg:py-16 xl:py-20 perspective-2000"
    >
      <Particles count={24} />

      {/* Cinematic Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,130,13,0.12),transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(42,30,23,0.4)_100%)] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: ease.luxe }}
          className="relative z-10 rounded-panel-sm sm:rounded-panel-lg border border-luxury-beige/10 bg-black/15 p-6 sm:p-9 lg:p-12 xl:p-16 shadow-cinematic"
        >
          <div className="reveal-on-scroll mx-auto inline-flex text-cream/90">
            <SolivaLogo variant="primary" height={56} className="sm:hidden" />
            <SolivaLogo variant="primary" height={72} className="hidden sm:inline-flex" />
          </div>

          <h2
            className="reveal-on-scroll font-display mt-6 sm:mt-8 tracking-editorial text-cream leading-none will-change-transform"
            style={{
              fontSize: "clamp(1.8rem, 8vw, 6.5rem)",
              transitionDelay: "200ms",
              textShadow:
                "0.5px 0.5px 0 #a55300, 1px 1px 0 #864300, 2px 2px 5px rgba(245,130,13,0.3), 0 0 40px rgba(245,130,13,0.15)",
            }}
          >
            PREMIERE <span className="italic ml-2 sm:ml-4">SOON</span>
          </h2>

          <p
            className="reveal-on-scroll font-display mt-6 sm:mt-8 text-base sm:text-lg md:text-xl italic text-cream/70"
            style={{ transitionDelay: "400ms" }}
          >
            Engineering protection. Designed in India.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="reveal-on-scroll mx-auto mt-10 sm:mt-14 flex max-w-md flex-col items-stretch gap-3 sm:flex-row sm:gap-4"
              style={{ transitionDelay: "600ms" }}
            >
              <div className="relative flex-1 group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  inputMode="email"
                  className="w-full min-w-0 rounded-full border border-cream/20 bg-white/[0.03] px-6 sm:px-8 py-3.5 sm:py-4 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-brown transition-all backdrop-blur-medium shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="group relative overflow-hidden rounded-full bg-gradient-to-br from-brown via-orange-glow to-brown-deep px-6 sm:px-10 py-3.5 sm:py-4 text-micro-sm tracking-cta sm:tracking-eyebrow text-white transition-all duration-700 hover:scale-[1.02] hover:shadow-glow light-sweep uppercase font-bold"
              >
                <span className="relative z-10">SECURE ACCESS</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="reveal-on-scroll mx-auto mt-10 sm:mt-14 max-w-md rounded-full border border-line-accent bg-accent-ghost px-6 sm:px-8 py-3.5 sm:py-4 text-body-xs sm:text-sm tracking-nav text-cream/90 backdrop-blur-subtle"
            >
              You're on the list. Welcome to SOLIVA.
            </motion.div>
          )}
        </motion.div>

        {/* Release dossier — editorial micro-anchor */}
        <div
          className="reveal-on-scroll mx-auto mt-10 sm:mt-12 grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 sm:gap-y-6 sm:gap-x-8 border-t border-cream/5 pt-8 sm:pt-10 text-left"
          style={{ transitionDelay: "700ms" }}
        >
          {[
            { k: "Edition", v: "Sunwrap 01" },
            { k: "Serial", v: "SLV / 26.001" },
            { k: "Release", v: "Spring · 2026" },
            { k: "Atelier", v: "Delhi · IN" },
          ].map((item) => (
            <div key={item.k} className="space-y-1">
              <span className="block font-mono text-micro-xs tracking-editorial text-cream/25 uppercase">
                {item.k}
              </span>
              <span className="block font-display text-sm text-cream/70 italic">{item.v}</span>
            </div>
          ))}
        </div>

        {/* Footer Meta */}
        <div
          className="reveal-on-scroll mt-10 sm:mt-14 flex flex-col items-center gap-8 sm:gap-10"
          style={{ transitionDelay: "800ms" }}
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-10 text-micro-xs tracking-eyebrow sm:tracking-luxe font-light items-center uppercase text-cream/40">
            <span className="hover:text-cream transition-colors cursor-pointer">INSTAGRAM</span>
            <span className="opacity-20 text-xs">✦</span>
            <span className="hover:text-cream transition-colors cursor-pointer">JOURNAL</span>
            <span className="opacity-20 text-xs">✦</span>
            <span className="hover:text-cream transition-colors cursor-pointer">PRESS</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="opacity-40">
              <SolivaLogo variant="icon" height={40} />
            </div>
            <div className="font-mono text-micro-xs opacity-30 uppercase tracking-cta">
              © 2026 SOLIVA SUNWRAP — DESIGNED IN INDIA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
