import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { viewportOnce, ease } from "@/design-system";
import {
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Share2,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { ParticleLogo } from "./ParticleLogo";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/solivaguard/", color: "#E1306C", icon: Instagram },
  { name: "YouTube", url: "https://www.youtube.com/@SolivaGuard", color: "#FF0000", icon: Youtube },
  { name: "Facebook", url: "https://www.facebook.com/people/Soliva/61585231307391/", color: "#1877F2", icon: Facebook },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/solivaguard/", color: "#0077B5", icon: Linkedin },
  { name: "Pinterest", url: "https://in.pinterest.com/solivaguard/", color: "#BD081C", icon: Share2 },
];

const label =
  "font-mono text-[0.5625rem] tracking-[0.35em] text-[#c76600] uppercase font-black opacity-70";

export function BrandNarrative() {
  return (
    <div className="relative w-full bg-[#3a2a22] overflow-hidden z-10 min-h-screen flex flex-col justify-center pt-20 pb-8">
      {/* Ambient depth */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,130,13,0.02),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 w-full">
        {/* ── HEADER — eyebrow + headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: ease.smooth }}
          className="flex flex-col items-center text-center mb-6 lg:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#c76600] text-xs">✦</span>
            <span className="font-mono text-[0.7rem] tracking-[0.4em] text-[#c76600] uppercase font-black">
              ABOUT SOLIVA
            </span>
          </div>
          <h2
            className="font-display text-white tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(1.65rem, 3.2vw, 2.6rem)" }}
          >
            Thoughtful Protection,{" "}
            <span className="italic text-[#c76600]/90 font-light">Engineered For Real Life.</span>
          </h2>
        </motion.div>

        {/* ── DATA LEFT · LOGO CENTER · DATA RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.25fr_0.95fr] gap-x-8 xl:gap-x-12 gap-y-8 items-center">
          {/* LEFT — Story + Philosophy/Standard */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="flex flex-col gap-6 lg:text-right"
          >
            <div className="flex gap-3 lg:flex-row-reverse">
              <span className="text-[#c76600] opacity-30">—</span>
              <p className="text-[0.9375rem] text-white/75 font-light leading-relaxed">
                Soliva was born from a simple observation: Indian movement is constant exposure.
                We noticed that protection hadn’t evolved alongside the streets it was built for.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 border-t border-white/10 pt-5">
              <div className="space-y-1.5">
                <span className={label}>The Philosophy</span>
                <p className="text-[0.8125rem] text-white/60 font-light leading-relaxed">
                  Wearable systems that balance coverage with breathable usability.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className={label}>The Standard</span>
                <p className="text-[0.8125rem] text-white/60 font-light leading-relaxed">
                  Tested against harsh summer conditions to feel natural.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CENTER — Logo (focal) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: ease.smooth }}
            className="order-first lg:order-none flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-[540px] h-[46vh] max-h-[540px] mx-auto">
              <ParticleLogo color="#e3c187" />
            </div>
          </motion.div>

          {/* RIGHT — Identity + Action + Explore + Presence */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="grid grid-cols-2 gap-x-8 gap-y-7"
          >
            {/* Identity */}
            <div className="col-span-2 space-y-2.5">
              <span className={label}>Identity</span>
              <h4 className="font-display text-base md:text-lg text-white tracking-wide uppercase leading-tight">
                SOLIVAGUARD PRIVATE LIMITED
              </h4>
              <div className="flex items-start gap-2 text-white/50">
                <MapPin size={11} className="text-[#c76600] mt-0.5 shrink-0 opacity-60" />
                <p className="font-mono text-[0.625rem] tracking-[0.08em] leading-relaxed uppercase">
                  D-12 Shourya Estate, Pipla <br /> Nagpur 440034, MH India
                </p>
              </div>
            </div>

            {/* Action + Explore */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className={label}>Action</span>
                <a href="https://wa.me/917350640608" className="group flex flex-col w-fit">
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-[#c76600] transition-colors duration-500 font-mono text-[0.7rem] tracking-[0.2em] font-black uppercase">
                    <MessageCircle size={13} className="text-[#25D366] opacity-70 group-hover:opacity-100" />
                    WhatsApp
                  </div>
                  <div className="h-px w-full bg-white/10 mt-1.5 group-hover:bg-[#c76600] transition-colors" />
                </a>
              </div>
              <div className="space-y-3">
                <span className={label}>Explore</span>
                <nav className="flex flex-col gap-2">
                  {["Home", "Collection", "Story", "Identity"].map((l) => (
                    <Link
                      key={l}
                      to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                      className="group flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-white/40 hover:text-white uppercase transition-colors duration-500"
                    >
                      <ArrowRight
                        size={9}
                        className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all"
                      />
                      {l}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Presence */}
            <div className="space-y-3">
              <span className={label}>Presence</span>
              <div className="flex flex-col gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.08em] text-white/40 hover:text-white transition-colors duration-500"
                  >
                    <span
                      className="opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:text-[var(--hc)]"
                      style={{ "--hc": s.color } as React.CSSProperties}
                    >
                      <s.icon size={14} strokeWidth={1.5} />
                    </span>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Closure ── */}
        <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 opacity-20 font-mono text-[0.5rem] tracking-[0.4em] uppercase text-white border-t border-white/5 pt-5">
          <div className="flex items-center gap-8">
            <span>© 2026 SOLIVA</span>
            <span>Sun · Motion</span>
          </div>
          <span>Engineered in India</span>
        </div>
      </div>
    </div>
  );
}
