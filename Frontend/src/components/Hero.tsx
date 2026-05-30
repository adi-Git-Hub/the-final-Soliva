import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { viewportOnce, ease } from "@/design-system";

const stripItems = [
  "Lightweight",
  "Certified UV Protection",
  "Full Coverage",
  "Thoughtful Protection",
  "Built for Indian Conditions",
  "Breathable",
  "More Freedom",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

export function Hero({ isRevealed = false }: { isRevealed?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F3] pt-12 md:pt-16 pb-2 overflow-hidden"
    >
      <div className="mx-auto w-full px-1.5 sm:px-3">
        <motion.div
          style={{ opacity: scrollOpacity }}
          className="relative h-[86vh] md:h-[92vh] w-full rounded-[1.75rem] md:rounded-[2.75rem] overflow-hidden shadow-cinematic bg-white border border-[#3a2a22]/5"
        >
          {/* Main Cinematic Banner */}
          <div className="absolute inset-0">
            <img
              src="/soliva-banner.webp"
              alt="Soliva Engineered Sun Protection"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover object-center transition-transform duration-[3000ms] hover:scale-105"
            />
          </div>

          {/* Cinematic Scrims — Softened for the new background */}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-beige/10 via-transparent to-luxury-beige/20 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(58,42,34,0.06)_100%)] pointer-events-none z-10" />

          {/* Content Overlay - Hidden (Removed buttons/tagline) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            {/* Elements removed as requested */}
          </div>

          {/* Top-right — Join WhatsApp Community */}
          <div className="absolute top-8 right-6 md:top-12 md:right-12 z-30 pointer-events-auto">
            <a
              href="https://chat.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 font-mono text-[0.55rem] md:text-[0.6rem] tracking-[0.12em] uppercase font-black text-white shadow-[0_4px_0_0_#15a347] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#2ee06f] hover:shadow-[0_5px_0_0_#15a347] active:translate-y-1 active:shadow-[0_1px_0_0_#15a347]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Join WhatsApp Community
            </a>
          </div>

          {/* Footer cluster — brand etymology (amber) above the marquee strip */}
          <div className="absolute bottom-0 inset-x-0 z-30">
            <div className="flex items-center justify-center gap-3 pb-2.5 font-mono text-[12px] md:text-[14px] tracking-[0.14em] uppercase text-[#e3c187] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              <span>
                <span className="font-bold">Sol</span> — Sun
              </span>
              <span className="h-3.5 w-px bg-[#e3c187]/40" aria-hidden />
              <span>
                <span className="font-bold">Iva</span> — Motion
              </span>
            </div>

            <div className="border-t border-[#e3c187]/20 bg-[#3a2a22]/95 backdrop-blur-sm py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div className="flex whitespace-nowrap items-center justify-center">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex gap-14 items-center pr-14"
                >
                  {[...stripItems, ...stripItems].map((t, i) => (
                    <div key={i} className="flex items-center gap-14">
                      <span className="text-micro-sm tracking-[0.2em] text-[#e3c187] font-bold uppercase">
                        {t}
                      </span>
                      <span className="text-[#e3c187]/45 font-serif text-xl">&rsaquo;</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
