import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportOnce, ease } from "@/design-system";

/* ════════════════════════════════════════════════════════════════════════
   SOLIVA · TECHNOLOGY VISUAL SYSTEM
   Lightweight SVG / CSS storytelling blocks — no images, no infinite loops,
   no mouse-tracking. Motion is one-time reveal or scroll-linked only.
   Palette: cream #FAF7F3 · brown #3a2a22 · orange #c76600 · bronze #d9b27a
   ════════════════════════════════════════════════════════════════════════ */

const ORANGE = "#c76600";
const BRONZE = "#d9b27a";

/* ── small caption used under every visual ── */
function VisualCaption({ children, tone = "warm" }: { children: React.ReactNode; tone?: "warm" | "dark" }) {
  const c = tone === "dark" ? "text-white/40" : "text-[#3a2a22]/45";
  const rule = tone === "dark" ? "bg-[#d9b27a]/40" : "bg-[#c76600]/40";
  return (
    <figcaption className="mt-5 flex items-start gap-3">
      <span className={`mt-2 block h-px w-6 ${rule} flex-shrink-0`} />
      <p className={`font-mono text-[0.625rem] tracking-[0.2em] uppercase leading-[1.7] ${c}`}>
        {children}
      </p>
    </figcaption>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CHAPTER 1 — WARM SUNLIGHT  (calm environmental opening)
   Concentric sun arcs + rays drawing in, soft glow drifting with scroll.
   ════════════════════════════════════════════════════════════════════════ */
export function SunlightVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle environmental drift — scroll-linked, never continuous
  const glowY = useTransform(scrollYProgress, [0, 1], [-26, 26]);
  const arcsY = useTransform(scrollYProgress, [0, 1], [14, -14]);

  const cx = 360;
  const cy = 132;
  const rays = Array.from({ length: 11 }, (_, i) => {
    const a = (Math.PI * (0.52 + (i / 10) * 0.96)); // sweep down-left
    return { x2: cx + Math.cos(a) * 330, y2: cy + Math.sin(a) * 330 };
  });

  return (
    <figure ref={ref} className="relative w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-[#3a2a22]/8 bg-gradient-to-b from-[#FBEFD9] via-[#F6E6CD] to-[#EFE2D2]">
        {/* warm glow */}
        <motion.div
          style={{ y: glowY }}
          className="absolute -top-10 right-[-12%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(245,160,40,0.5),rgba(245,130,13,0.14)_45%,transparent_70%)]"
        />
        <motion.svg
          viewBox="0 0 420 525"
          className="absolute inset-0 h-full w-full"
          style={{ y: arcsY }}
          fill="none"
        >
          {/* rays */}
          {rays.map((r, i) => (
            <motion.line
              key={i}
              x1={cx}
              y1={cy}
              x2={r.x2}
              y2={r.y2}
              stroke={ORANGE}
              strokeWidth={1}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.18 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.05, ease: ease.smooth }}
            />
          ))}
          {/* concentric sun arcs */}
          {[46, 86, 128, 176].map((r, i) => (
            <motion.circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              stroke={ORANGE}
              strokeWidth={i === 0 ? 2 : 1}
              opacity={0.5 - i * 0.09}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.5 - i * 0.09 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: ease.luxe }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
          {/* sun core */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={26}
            fill={ORANGE}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.92 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.1, ease: ease.luxe }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          {/* horizon figure hint — calm silhouette walking in light */}
          <motion.path
            d="M150 525 Q150 470 165 452 Q150 442 152 418 Q155 396 178 396 Q201 396 204 418 Q206 442 191 452 Q206 470 206 525 Z"
            fill="#3a2a22"
            opacity={0.14}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 0.14, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, delay: 0.5, ease: ease.smooth }}
          />
        </motion.svg>

        {/* layered light bands */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#EFE2D2] to-transparent" />
        <span className="absolute bottom-6 left-6 font-mono text-[0.5625rem] tracking-[0.3em] uppercase text-[#3a2a22]/45 font-bold">
          08:14 · Morning Light
        </span>
      </div>
      <VisualCaption>Warm exposure · the everyday environment Soliva is built for</VisualCaption>
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CHAPTER 2 — UPF 50+ PROTECTION RINGS
   Layered fabric rings deflecting incoming UV. Reveals on view.
   ════════════════════════════════════════════════════════════════════════ */
export function ProtectionRings() {
  const cx = 240;
  const cy = 240;
  // incoming UV beams from top-left, stopped at the outer fabric ring
  const beams = [-0.18, 0.0, 0.18, 0.36].map((off) => {
    const angle = Math.PI * (0.78 + off);
    const sx = cx + Math.cos(angle) * 250;
    const sy = cy + Math.sin(angle) * 250;
    const hx = cx + Math.cos(angle) * 150;
    const hy = cy + Math.sin(angle) * 150;
    return { sx, sy, hx, hy };
  });

  return (
    <figure className="relative w-full">
      <div className="relative aspect-square w-full max-w-[30rem] mx-auto overflow-hidden rounded-[2.25rem] border border-[#3a2a22]/8 bg-gradient-to-br from-[#F4ECE0] to-[#EDE3D2]">
        <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" fill="none">
          {/* UV beams */}
          {beams.map((b, i) => (
            <g key={i}>
              <motion.line
                x1={b.sx}
                y1={b.sy}
                x2={b.hx}
                y2={b.hy}
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="4 5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.55 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: ease.smooth }}
              />
              {/* deflection spark at contact */}
              <motion.circle
                cx={b.hx}
                cy={b.hy}
                r={3}
                fill={ORANGE}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.8 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: ease.luxe }}
                style={{ transformOrigin: `${b.hx}px ${b.hy}px` }}
              />
            </g>
          ))}

          {/* concentric fabric layers */}
          {[150, 116, 84].map((r, i) => (
            <motion.circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              stroke="#3a2a22"
              strokeOpacity={0.16 + i * 0.06}
              strokeWidth={i === 0 ? 1.4 : 1}
              strokeDasharray={i === 0 ? "2 6" : undefined}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1, delay: 0.2 + i * 0.14, ease: ease.luxe }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
          {/* protected core */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={56}
            fill={ORANGE}
            fillOpacity={0.1}
            stroke={ORANGE}
            strokeWidth={1.5}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: 0.5, ease: ease.luxe }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </svg>

        {/* center label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.7, ease: ease.luxe }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <span className="font-display text-[1.7rem] leading-none text-[#3a2a22]">UPF 50+</span>
          <span className="mt-1.5 font-mono text-[0.5rem] tracking-[0.24em] uppercase text-[#c76600] font-bold">
            &lt; 2% UV transmitted
          </span>
        </motion.div>

        <span className="absolute top-6 left-6 font-mono text-[0.5625rem] tracking-[0.28em] uppercase text-[#3a2a22]/45 font-bold">
          UV ↘
        </span>
      </div>
      <VisualCaption>Protection woven into the fabric — UV deflected before it reaches skin</VisualCaption>
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CHAPTER 3 — AIRFLOW SYSTEM  (scroll-linked breathable cross-section)
   ════════════════════════════════════════════════════════════════════════ */
export function AirflowSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // air flows through the weave as the user scrolls — meaningful, not decorative
  const flow = useTransform(scrollYProgress, [0, 1], [240, -240]);
  const heatRise = useTransform(scrollYProgress, [0, 1], [10, -16]);

  const paths = [
    "M40 250 C 160 250, 200 150, 360 150 S 560 250, 690 250",
    "M40 195 C 170 195, 220 110, 360 110 S 580 195, 690 195",
    "M40 300 C 150 300, 210 360, 360 360 S 560 300, 690 300",
  ];

  return (
    <figure ref={ref} className="relative w-full">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[2.25rem] border border-[#3a2a22]/8 bg-gradient-to-br from-[#F5EEE3] to-[#ECE2D2]">
        <svg viewBox="0 0 720 360" className="absolute inset-0 h-full w-full" fill="none">
          {/* fabric layers (cross-section) */}
          {[
            { y: 70, label: "OUTER" },
            { y: 175, label: "MID" },
            { y: 280, label: "INNER" },
          ].map((layer, i) => (
            <motion.g
              key={layer.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, delay: i * 0.12, ease: ease.smooth }}
            >
              <rect x={36} y={layer.y} width={648} height={26} rx={13} fill="#3a2a22" fillOpacity={0.05} stroke="#3a2a22" strokeOpacity={0.12} />
              {Array.from({ length: 22 }, (_, k) => (
                <circle key={k} cx={56 + k * 28} cy={layer.y + 13} r={1.4} fill="#3a2a22" fillOpacity={0.18} />
              ))}
            </motion.g>
          ))}

          {/* airflow paths — dash flows with scroll */}
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={ORANGE}
              strokeWidth={1.6}
              strokeOpacity={0.55}
              strokeDasharray="6 12"
              strokeLinecap="round"
              style={{ strokeDashoffset: flow }}
            />
          ))}

          {/* heat escaping upward */}
          {[200, 330, 470, 560].map((x, i) => (
            <motion.g key={x} style={{ y: heatRise }} opacity={0.4}>
              <path
                d={`M${x} 60 q -6 -10 0 -20 q 6 -10 0 -20`}
                stroke={BRONZE}
                strokeWidth={1.4}
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          ))}

          {/* flow direction arrow */}
          <motion.path
            d="M676 250 l 10 0 m -4 -4 l 4 4 l -4 4"
            stroke={ORANGE}
            strokeWidth={1.6}
            fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </svg>

        <div className="absolute left-6 top-5 flex flex-col gap-[1.15rem] font-mono text-[0.5rem] tracking-[0.22em] uppercase text-[#3a2a22]/40 font-bold pointer-events-none">
          <span>Outer · shields</span>
          <span>Mid · airflow</span>
          <span>Inner · soft</span>
        </div>
        <span className="absolute bottom-5 right-6 font-mono text-[0.5625rem] tracking-[0.26em] uppercase text-[#c76600]/80 font-bold">
          Air in → heat out
        </span>
      </div>
      <VisualCaption>A breathable system — air moves through the weave while heat escapes</VisualCaption>
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CHAPTER 4 — COVERAGE FIGURE  (scroll-driven progressive zone activation)
   ════════════════════════════════════════════════════════════════════════ */
const ZONES = [
  { no: "01", name: "Face", x: 250, y: 150, lx: 70, ly: 120 },
  { no: "02", name: "Nose", x: 268, y: 168, lx: 70, ly: 175 },
  { no: "03", name: "Ears", x: 214, y: 158, lx: 70, ly: 230 },
  { no: "04", name: "Neck", x: 244, y: 232, lx: 70, ly: 285 },
  { no: "05", name: "Shoulders", x: 250, y: 300, lx: 70, ly: 340 },
  { no: "06", name: "Back", x: 196, y: 290, lx: 70, ly: 395 },
];

export function CoverageFigure() {
  // Reveal viewport — fires once when the figure is meaningfully on screen.
  const inView = { once: true, amount: 0.35 } as const;

  return (
    <div className="flex justify-center lg:justify-end">
      {/* figure — strong entrance; all zone points reveal together (staggered)
          the moment the section enters view, no scroll scrubbing. */}
      <motion.figure
        initial={{ opacity: 0, y: 60, scale: 0.84, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={inView}
        transition={{ duration: 1.4, ease: ease.luxe }}
        style={{ transformPerspective: 1100 }}
        className="relative w-full max-w-[20rem] lg:max-w-[21rem]"
      >
        {/* ambient glow behind the figure — fades in with the figure */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={inView}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_38%,rgba(199,102,0,0.2),transparent_68%)] blur-2xl"
        />
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] border border-[#3a2a22]/8 bg-gradient-to-b from-[#F4ECE0] to-[#E9DECB]">
          <svg viewBox="0 0 420 525" className="absolute inset-0 h-full w-full" fill="none">
            {/* coverage aura */}
            <motion.circle
              cx={236}
              cy={210}
              r={150}
              fill={ORANGE}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.14 }}
              viewport={inView}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {/* stylized bust silhouette */}
            <path
              d="M236 70
                 c 42 0 66 30 66 70
                 c 0 26 -10 44 -24 56
                 c 22 8 34 18 40 40
                 c 8 30 10 70 12 118
                 l -188 0
                 c 2 -48 4 -88 12 -118
                 c 6 -22 18 -32 40 -40
                 c -14 -12 -24 -30 -24 -56
                 c 0 -40 24 -70 66 -70 Z"
              fill="#3a2a22"
              fillOpacity={0.08}
              stroke="#3a2a22"
              strokeOpacity={0.16}
              strokeWidth={1.2}
            />
            {/* coverage sweep over head+shoulders */}
            <motion.path
              d="M170 96 q 66 -44 132 0 q 30 26 30 70 q 0 40 -20 64 q 26 12 34 40"
              stroke={ORANGE}
              strokeWidth={1.4}
              fill="none"
              initial={{ opacity: 0.18, pathLength: 0 }}
              whileInView={{ opacity: 0.5, pathLength: 1 }}
              viewport={inView}
              transition={{ duration: 1.1, delay: 0.3, ease: ease.luxe }}
            />

            {/* zone markers — all reveal together with a stagger on entry */}
            <motion.g
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              variants={{ visible: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } } }}
            >
              {ZONES.map((z) => (
                <motion.g
                  key={z.no}
                  variants={{
                    hidden: { opacity: 0, scale: 0.2 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ transformOrigin: `${z.x}px ${z.y}px` }}
                >
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r={13}
                    fill={ORANGE}
                    fillOpacity={0.16}
                    stroke={ORANGE}
                    strokeOpacity={0.9}
                    strokeWidth={1.4}
                  />
                  <circle cx={z.x} cy={z.y} r={2.4} fill={ORANGE} fillOpacity={1} />
                </motion.g>
              ))}
            </motion.g>
          </svg>

          <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
            <span className="font-mono text-[0.5625rem] tracking-[0.26em] uppercase text-[#3a2a22]/45 font-bold">
              Coverage map
            </span>
          </div>
        </div>
        <VisualCaption>Every protected zone · front · side · back</VisualCaption>
      </motion.figure>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   CHAPTER 5 — ENVIRONMENT SYSTEM  (Heat · Dust · Pollution · Movement)
   Four forces converging on a calm protected core. Dark section.
   ════════════════════════════════════════════════════════════════════════ */
function ForceGlyph({ kind }: { kind: "heat" | "dust" | "pollution" | "movement" }) {
  const s = { stroke: BRONZE, strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const };
  if (kind === "heat")
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7">
        <path d="M12 27 q -5 -7 0 -14 q 5 -7 0 -13" {...s} />
        <path d="M20 27 q -5 -7 0 -14 q 5 -7 0 -13" {...s} />
        <path d="M28 27 q -5 -7 0 -14 q 5 -7 0 -13" {...s} />
      </svg>
    );
  if (kind === "dust")
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7">
        {[
          [12, 14],
          [24, 11],
          [30, 20],
          [16, 24],
          [26, 28],
          [10, 30],
          [20, 19],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.4} fill={BRONZE} fillOpacity={0.85} />
        ))}
      </svg>
    );
  if (kind === "pollution")
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7">
        <circle cx={16} cy={18} r={7} fill={BRONZE} fillOpacity={0.22} />
        <circle cx={25} cy={22} r={9} fill={BRONZE} fillOpacity={0.16} />
        <path d="M8 30 h 24" {...s} strokeOpacity={0.5} />
      </svg>
    );
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7">
      <path d="M6 14 h 22" {...s} />
      <path d="M6 21 h 28" {...s} />
      <path d="M6 28 h 18" {...s} />
      <path d="M30 21 l 5 0 m -4 -3 l 4 3 l -4 3" {...s} />
    </svg>
  );
}

const FORCES = [
  { kind: "heat", label: "Heat", note: "Peak sun hours" },
  { kind: "dust", label: "Dust", note: "Open roads" },
  { kind: "pollution", label: "Pollution", note: "Urban air" },
  { kind: "movement", label: "Movement", note: "Constant motion" },
] as const;

export function EnvironmentSystem() {
  return (
    <figure className="relative w-full">
      <div className="relative mx-auto grid max-w-[58rem] grid-cols-2 gap-3 sm:gap-4">
        {/* connecting core */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: ease.luxe }}
            className="flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border border-[#d9b27a]/30 bg-[#2a1d16] text-center shadow-[0_0_60px_-20px_rgba(217,178,122,0.4)]"
          >
            <span className="font-display text-sm text-[#FAF7F3] leading-tight">Protected</span>
            <span className="mt-1 font-mono text-[0.45rem] tracking-[0.22em] uppercase text-[#d9b27a]/70 font-bold">
              One system
            </span>
          </motion.div>
        </div>

        {FORCES.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: i * 0.12, ease: ease.luxe }}
            className={`relative flex flex-col gap-2 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7 ${
              i === 0 ? "items-start" : i === 1 ? "items-end text-right" : i === 2 ? "items-start" : "items-end text-right"
            }`}
          >
            <ForceGlyph kind={f.kind} />
            <span className="font-display text-xl text-[#FAF7F3]">{f.label}</span>
            <span className="font-mono text-[0.5625rem] tracking-[0.24em] uppercase text-white/40 font-bold">
              {f.note}
            </span>
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-6 text-center font-mono text-[0.625rem] tracking-[0.24em] uppercase text-white/40">
        Designed for real environments — not laboratory conditions
      </figcaption>
    </figure>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   EPILOGUE — LAYERED SIMPLIFICATION  (calm convergence into one line)
   ════════════════════════════════════════════════════════════════════════ */
export function LayeredEpilogue() {
  const layers = [0, 1, 2, 3, 4];
  return (
    <figure className="relative mx-auto w-full max-w-[40rem]">
      <svg viewBox="0 0 600 200" className="w-full" fill="none">
        {layers.map((i) => {
          const spread = 36 - i * 9; // layers converge toward the centre line
          return (
            <motion.path
              key={i}
              d={`M40 ${100 - spread} C 200 ${100 - spread}, 400 ${100 - spread + spread * 0.5}, 560 100`}
              stroke={i === 0 ? "#3a2a22" : BRONZE}
              strokeOpacity={i === 0 ? 0.5 : 0.3 - i * 0.04}
              strokeWidth={i === 0 ? 1.6 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.6, delay: 0.15 * i, ease: ease.luxe }}
            />
          );
        })}
        <motion.line
          x1={40}
          y1={100}
          x2={560}
          y2={100}
          stroke={BRONZE}
          strokeWidth={1.4}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={viewportOnce}
          transition={{ duration: 1.8, delay: 0.7, ease: ease.luxe }}
        />
      </svg>
      <figcaption className="mt-2 text-center font-mono text-[0.625rem] tracking-[0.26em] uppercase text-white/35">
        Many layers · one effortless experience
      </figcaption>
    </figure>
  );
}
