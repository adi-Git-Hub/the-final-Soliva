import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease } from "@/design-system";

export const Route = createFileRoute("/_public/story")({
  component: StoryRoute,
});

/* ─── Editorial image placeholder ─────────────────────────────── */
function StoryImage({
  label,
  caption,
  src,
  videoSrc,
  alt = "",
  aspect = "aspect-[4/5]",
  rounded = "rounded-[2.25rem]",
  className = "",
}: {
  label: string;
  caption?: string;
  src?: string;
  videoSrc?: string;
  alt?: string;
  aspect?: string;
  rounded?: string;
  className?: string;
}) {
  return (
    <figure className={`relative w-full ${className}`}>
      <div
        className={`relative ${aspect} w-full overflow-hidden ${rounded} bg-[#EDE6D8] border border-[#3a2a22]/8`}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="block h-px w-10 bg-[#c76600]/30 mb-3" />
            <span className="font-mono text-[0.625rem] tracking-[0.4em] text-[#c76600]/70 uppercase font-medium">
              {label}
            </span>
            <span className="font-mono text-[0.5rem] tracking-[0.32em] text-[#3a2a22]/30 mt-1.5 uppercase">
              Image · placeholder
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-start gap-3 max-w-md">
          <span className="mt-2 block h-px w-6 bg-[#c76600]/40 flex-shrink-0" />
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-[#3a2a22]/50 leading-[1.7]">
            {caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Animated speaker / mute icon ────────────────────────────── */
function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
    >
      {/* Speaker body */}
      <path
        d="M4 9.5v5h3.2L12 18.5v-13L7.2 9.5H4Z"
        fill="currentColor"
      />

      {/* Sound waves — drawn + pulsing when unmuted */}
      <motion.path
        d="M15 9.2a4 4 0 0 1 0 5.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={false}
        animate={
          muted
            ? { pathLength: 0, opacity: 0 }
            : { pathLength: 1, opacity: [0.55, 1, 0.55] }
        }
        transition={
          muted
            ? { duration: 0.25 }
            : {
                pathLength: { duration: 0.3 },
                opacity: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />
      <motion.path
        d="M17.6 6.8a8 8 0 0 1 0 10.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={false}
        animate={
          muted
            ? { pathLength: 0, opacity: 0 }
            : { pathLength: 1, opacity: [0.4, 0.85, 0.4] }
        }
        transition={
          muted
            ? { duration: 0.25 }
            : {
                pathLength: { duration: 0.3, delay: 0.05 },
                opacity: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              }
        }
      />

      {/* Diagonal slash — drawn when muted */}
      <motion.line
        x1="15"
        y1="7.5"
        x2="21"
        y2="16.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: muted ? 1 : 0, opacity: muted ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </svg>
  );
}

/* ─── Story video with animated mute control ──────────────────── */
function StoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  };

  return (
    <div className="relative mx-auto">
      <div className="relative mx-auto h-[min(60vh,40rem)] max-w-[92vw] aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#3a2a22]/10 bg-[#EDE6D8] shadow-[0_44px_100px_-32px_rgba(58,42,34,0.55)]">
        <video
          ref={videoRef}
          src="/product_images/IMG_4705.mp4"
          poster="/product_images/IMG_4705-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />

        {/* Mute / unmute toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          className="group absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-[#3a2a22]/55 text-[#FAF7F3] backdrop-blur-md ring-1 ring-white/20 transition-[background-color,transform] duration-300 hover:bg-[#c76600] hover:scale-105 active:scale-95"
        >
          {/* Pulsing ring invites the user to unmute */}
          {muted && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-white/40"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <SpeakerIcon muted={muted} />
        </button>
      </div>

      <p className="mt-3 text-center font-mono text-[0.5625rem] tracking-[0.3em] uppercase text-[#3a2a22]/40">
        {muted ? "Tap the icon to hear it" : "Sound on"}
      </p>
    </div>
  );
}

function StoryRoute() {
  /* Single scroll subscription powers the hero portrait parallax only. */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroParallax = useTransform(heroProgress, [0, 1], [30, -30]);

  /* Enable section-by-section scroll snap only while this page is mounted. */
  useEffect(() => {
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    const prevPad = html.style.scrollPaddingTop;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "0px";
    return () => {
      html.style.scrollSnapType = prevSnap;
      html.style.scrollPaddingTop = prevPad;
    };
  }, []);

  return (
    <div className="relative w-full bg-[#FAF7F3] overflow-x-hidden text-[#3a2a22]">
      {/* ════════════════════════════════════════════════════════════════
         PAGE 01 — A DAILY PROBLEM WORTH SOLVING
         ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative snap-start pt-24 pb-12 sm:pt-28 sm:pb-16"
      >
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
            {/* LEFT — Founder narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: ease.smooth }}
            >
              <h1
                className="font-display leading-[1.02] tracking-tight mb-10 whitespace-nowrap"
                style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}
              >
                A daily problem{" "}
                <span className="italic font-light text-[#c76600]">worth solving.</span>
              </h1>

              <div className="max-w-xl space-y-5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.75]">
                <p>Soliva began with a simple observation.</p>
                <p>
                  Like many people, I spent years relying on everyday coverings while commuting,
                  travelling, and spending time outdoors. Over time, I noticed how much effort went
                  into making them work — adjusting, repositioning, and constantly managing something
                  that was meant to feel protective.
                </p>
                <p>What started as a personal frustration became a larger realization.</p>
                <p>
                  Millions of people face the same reality every day, often accepting discomfort as
                  part of the routine.
                </p>
                <p>We believed there had to be a more thoughtful way forward.</p>
                <p className="italic text-[#3a2a22]/80">
                  Sometimes the most familiar problems are the ones worth questioning.
                </p>
              </div>
            </motion.div>

            {/* RIGHT — Founder portrait with subtle parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.3, ease: ease.smooth, delay: 0.1 }}
            >
              <motion.div style={{ y: heroParallax }} className="max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto">
                <StoryImage
                  label="FOUNDER · CHENALI BISEN"
                  src="/founder-commute.webp"
                  alt="Founder Chenali Bisen"
                  aspect="aspect-[4/5]"
                  caption="Founder Chenali Bisen"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         PAGE 02 — DESIGNED AROUND REAL LIFE
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start min-h-screen flex flex-col justify-center bg-[#F3ECE2]/50 border-y border-[#3a2a22]/8 pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          {/* Manifesto — each statement on its own line */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: ease.smooth }}
              className="font-display leading-[1.05] tracking-tight mb-2"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Designed around{" "}
              <span className="italic font-light text-[#c76600]">real life.</span>
            </motion.h2>

            <div className="mx-auto max-w-2xl space-y-3 text-[0.95rem] md:text-[1.05rem] text-[#7b6a5f] font-light leading-[1.6]">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: ease.smooth }}
              >
                Soliva wasn't created in a boardroom. It was shaped by everyday
                commutes, outdoor hours, changing weather, and the realities of
                daily movement.
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: ease.smooth }}
                className="font-display italic text-[#3a2a22]/80 text-[1.05rem] md:text-[1.2rem] leading-[1.5] pt-1"
              >
                Every decision begins with a simple question: Will this make
                everyday life easier for the wearer?
              </motion.p>
            </div>
          </motion.div>

          {/* Video centered, principles flanking left & right */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceEarly}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-x-10 gap-y-8 xl:gap-x-16"
          >
            {/* LEFT principles */}
            <div className="order-2 lg:order-1 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8 lg:gap-y-12">
              {[
                { title: "Thoughtful Design", desc: "Every detail should serve a purpose." },
                { title: "Everyday Comfort", desc: "Comfort should never be optional." },
              ].map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.9, ease: ease.smooth }}
                  className="lg:text-right"
                >
                  <span className="block h-px w-8 bg-[#c76600]/40 mb-4 lg:ml-auto" />
                  <h3
                    className="font-display leading-[1.15] tracking-tight mb-2"
                    style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-[1.75] lg:ml-auto max-w-xs">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CENTER video */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: ease.smooth }}
              className="order-1 lg:order-2"
            >
              <StoryVideo />
            </motion.div>

            {/* RIGHT principles */}
            <div className="order-3 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-8 lg:gap-y-12">
              {[
                { title: "Built For Movement", desc: "Designed for routines, not occasions." },
                { title: "Accessible Quality", desc: "Protection should be within reach." },
              ].map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.9, ease: ease.smooth }}
                  className="lg:text-left"
                >
                  <span className="block h-px w-8 bg-[#c76600]/40 mb-4" />
                  <h3
                    className="font-display leading-[1.15] tracking-tight mb-2"
                    style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-[0.9375rem] text-[#7b6a5f] font-light leading-[1.75] max-w-xs">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
         PAGE 03 — BUILT WITH INTENTION
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative snap-start min-h-screen flex flex-col justify-center py-16">
        <div className="mx-auto max-w-[1340px] w-full px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.smooth }}
            className="max-w-3xl mb-10 text-center mx-auto"
          >
            <h2
              className="font-display leading-[1.06] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Built with
              <span className="italic font-light text-[#c76600]"> intention.</span>
            </h2>

            <div className="mt-5 space-y-1.5 text-[1rem] md:text-[1.0625rem] text-[#7b6a5f] font-light leading-[1.6]">
              <p>We are not here to create more products.</p>
              <p>We are here to create better ones.</p>
            </div>
          </motion.div>

          {/* Production stages — 3 placeholders */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceEarly}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-3 gap-4 sm:gap-6 max-w-[920px] mx-auto"
          >
            {[
              { label: "PRODUCT DEVELOPMENT", src: "/product_images/Video-461-compressed.mp4" },
              { label: "PROTOTYPE", src: "/product_images/Video-737-compressed.mp4" },
              { label: "MANUFACTURING", src: "/product_images/IMG_6543-compressed.mp4" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, ease: ease.smooth }}
              >
                <StoryImage label={item.label} videoSrc={item.src} aspect="aspect-[3/4]" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/collection"
              className="px-10 py-5 rounded-full bg-[#3a2a22] text-[#FAF7F3] font-mono text-[0.625rem] tracking-[0.32em] uppercase font-bold transition-[transform,background-color] duration-300 hover:bg-[#c76600] hover:-translate-y-0.5"
            >
              Explore the Collection
            </Link>
            <Link
              to="/technology"
              className="px-10 py-5 rounded-full border border-[#3a2a22]/25 text-[#3a2a22] font-mono text-[0.625rem] tracking-[0.32em] uppercase font-bold transition-[transform,background-color] duration-300 hover:bg-[#3a2a22]/5 hover:-translate-y-0.5"
            >
              Read the Technology
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
