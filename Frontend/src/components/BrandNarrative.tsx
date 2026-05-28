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

export function BrandNarrative() {
  return (
    <div className="relative w-full bg-[#3a2a22] overflow-hidden pt-24 md:pt-32 pb-10 z-10 min-h-[90vh] flex flex-col justify-center">
      {/* Visual Depth: Ambient Radial Diffusion */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,130,13,0.02),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 relative z-10 w-full">
        {/* Compact Editorial Grid — Designed for Single Screen Visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-x-16 gap-y-10 items-start border-b border-white/5 pb-12">
          {/* LEFT SIDE: Brand Storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: ease.smooth }}
            className="flex flex-col text-left"
          >
            {/* Identity Anchor */}
            <div className="mb-8">
              <img
                src="/logo-new.png"
                alt="Soliva"
                className="h-10 md:h-12 w-auto object-contain brightness-[1.5] mb-6"
              />
              <div className="flex items-center gap-3">
                <span className="text-[#c76600] text-xs">✦</span>
                <span className="font-mono text-[0.75rem] tracking-[0.4em] text-[#c76600] uppercase font-black">
                  ABOUT SOLIVA
                </span>
              </div>
            </div>

            <h2
              className="font-display text-white tracking-tight leading-[1.15] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Thoughtful Protection, <br />
              <span className="italic text-[#c76600]/90 font-light">Engineered For Real Life.</span>
            </h2>

            <div className="space-y-10 max-w-[520px]">
              <div className="flex gap-4">
                <span className="text-[#c76600] opacity-30">—</span>
                <p className="text-[1.0625rem] md:text-[1.125rem] text-white/80 font-light leading-relaxed">
                  Soliva was born from a simple observation: Indian movement is constant exposure.
                  We noticed that protection hadn’t evolved alongside the streets it was built for.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.5rem] text-[#c76600]/60">○</span>
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#c76600]/60 uppercase font-bold">
                      The Philosophy
                    </span>
                  </div>
                  <p className="text-[0.8125rem] text-white/60 font-light leading-relaxed">
                    Wearable systems that balance coverage with breathable usability.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.5rem] text-[#c76600]/60">○</span>
                    <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#c76600]/60 uppercase font-bold">
                      The Standard
                    </span>
                  </div>
                  <p className="text-[0.8125rem] text-white/60 font-light leading-relaxed">
                    Tested against harsh summer conditions to feel natural.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Information Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, delay: 0.1, ease: ease.smooth }}
            className="grid grid-cols-2 gap-x-12 gap-y-12 lg:pl-12 lg:border-l border-white/5"
          >
            {/* IDENTITY Block */}
            <div className="col-span-2 space-y-4">
              <span className="font-mono text-[0.5625rem] tracking-[0.4em] text-[#c76600] uppercase font-black opacity-60">
                Identity
              </span>
              <h4 className="font-display text-xl md:text-2xl text-white tracking-wide uppercase leading-tight">
                SOLIVAGUARD PRIVATE LIMITED
              </h4>
              <div className="flex items-start gap-3">
                <MapPin size={12} className="text-[#c76600] mt-1 shrink-0 opacity-50" />
                <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-white/50 leading-relaxed uppercase">
                  D-12 SHOURYA ESTATE, PIPLA <br /> NAGPUR 440034, MH INDIA
                </p>
              </div>
            </div>

            {/* SPECIAL CTA & NAVIGATION */}
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-[0.5625rem] tracking-[0.4em] text-[#c76600] uppercase font-black opacity-60">
                  Action
                </span>
                <a href="https://wa.me/917350640608" className="group flex flex-col w-fit">
                  <div className="flex items-center gap-3 text-white/80 group-hover:text-[#c76600] transition-colors duration-500 font-mono text-[0.75rem] tracking-[0.2em] font-black uppercase">
                    <MessageCircle
                      size={14}
                      className="text-[#25D366] opacity-70 group-hover:opacity-100"
                    />
                    WhatsApp
                  </div>
                  <div className="h-px w-full bg-white/10 mt-2 group-hover:bg-[#c76600] transition-colors" />
                </a>
              </div>

              <div className="space-y-4">
                <span className="font-mono text-[0.5625rem] tracking-[0.4em] text-[#c76600] uppercase font-black opacity-60">
                  Explore
                </span>
                <nav className="flex flex-col gap-3">
                  {["Home", "Collection", "Story", "Identity"].map((label) => (
                    <Link
                      key={label}
                      to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                      className="group flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-white/40 hover:text-white uppercase transition-all duration-500"
                    >
                      <ArrowRight
                        size={10}
                        className="opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all"
                      />
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* PRESENCE Block */}
            <div className="space-y-6">
              <span className="font-mono text-[0.5625rem] tracking-[0.4em] text-[#c76600] uppercase font-black opacity-60">
                Presence
              </span>
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/solivaguard/",
                    color: "#E1306C",
                    icon: Instagram,
                  },
                  {
                    name: "YouTube",
                    url: "https://www.youtube.com/@SolivaGuard",
                    color: "#FF0000",
                    icon: Youtube,
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/people/Soliva/61585231307391/",
                    color: "#1877F2",
                    icon: Facebook,
                  },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/solivaguard/",
                    color: "#0077B5",
                    icon: Linkedin,
                  },
                  {
                    name: "Pinterest",
                    url: "https://in.pinterest.com/solivaguard/",
                    color: "#BD081C",
                    icon: Share2,
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 font-mono text-[0.6875rem] tracking-[0.1em] text-white/40 hover:text-white transition-all duration-500"
                  >
                    <div className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-all duration-500">
                      <div
                        className="w-full h-full transition-colors duration-500 group-hover:text-[var(--hover-color)]"
                        style={{ "--hover-color": s.color } as any}
                      >
                        <s.icon size={16} strokeWidth={1.5} />
                      </div>
                    </div>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimal Closure Row */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-20 font-mono text-[0.5rem] tracking-[0.4em] uppercase text-white">
          <div className="flex items-center gap-8">
            <span>© 2026 SOLIVA</span>
            <span>Sun · Motion</span>
          </div>
          <div className="flex items-center gap-4 border-l border-white/20 pl-4">
            <span>Engineered in India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
