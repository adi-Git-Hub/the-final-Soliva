# Homepage Layout Blueprint — Desktop (Soliva Sunwrap)

> **Viewport:** 1440 × 900 · **Content container:** 1280 px (`max-w-7xl`) · **Editorial wide:** 1440 px (`max-w-[90rem]`)
> **Stack:** React 19 · Vite · TanStack Router · Tailwind v4 · Framer Motion · GSAP · Lenis
> **Entry file:** `src/routes/index.tsx`

ASCII scale convention: **1 column ≈ 14.4 px**. Diagrams are 100 cols wide = full 1440 px viewport.

---

## 0. Full Page — Vertical Stack Map

```
                           ┌──────────── 1440 px ────────────┐
y=0     ┌──────────────────┴──────────────────────────────────┴──────────────────┐  ▲
        │                  H E A D E R  ( sticky )    h-20 / h-14 scrolled       │  │ 80
y=80    ├──────────────────────────────────────────────────────────────────────── ┤  ▼
        │                                                                        │  ▲
        │                                                                        │  │
        │                        H E R O   ( h-screen )                          │  │ 900
        │                                                                        │  │
        │                                                                        │  │
y=900   ├──────────────────────────────────────────────────────────────────────── ┤  ▼
        │  ░░░░░░░ AMBER BRIDGE RIBBON ░░░░░░░  ░ punchline · per-word stagger ░ │   56
y=956   ├──────────────────────────────────────────────────────────────────────── ┤
        │                                                                        │  ▲
        │             V I D E O   S E C T I O N    ( GSAP-pinned )               │  │ 1620
        │             scale 0.65 → 1   |   radius 4rem → 0                       │  │ (incl
        │                                                                        │  │  pin
y≈2576  ├──────────────────────────────────────────────────────────────────────── ┤  ▼  budget)
        │                                                                        │  ▲
        │   U R B A N   S T O R Y T E L L I N G   ( pinned + horizontal scrub )  │  │ 900
        │   PANEL 1  (Stressor Map)   →→→→→→→→→→   PANEL 2  (Rationale)          │  │ visible
        │                                                                        │  │ +
        │   ┌─────────────────── spacer 400vh ─────────────────────────────┐     │  │ 3600
        │   │ scroll budget reserved below sticky section for the scrub   │     │  │ spacer
        │   └─────────────────────────────────────────────────────────────┘     │  ▼
y≈7076  ├──────────────────────────────────────────────────────────────────────── ┤
        │                                                                        │  ▲
        │        C O L L E C T I O N    ( 5-card editorial grid )                │  │ 922
        │                                                                        │  ▼
y≈7998  ├──────────────────────────────────────────────────────────────────────── ┤
        │                                                                        │  ▲
        │                                                                        │  │
        │         C O M P A R E   ( 2-up cards: old vs engineered )              │  │ 2047
        │                                                                        │  │
        │                                                                        │  ▼
y≈10045 ├──────────────────────────────────────────────────────────────────────── ┤
        │                                                                        │  ▲
        │              F I N A L   C T A   ( dark veil  ·  PREMIERE SOON )       │  │ 1139
        │                                                                        │  ▼
y=11240 └──────────────────────────────────────────────────────────────────────── ┘

   ◄────── global luxury background image rendered ONCE on body::before ──────►
                          (position: fixed; z-index: -10; cover)
```

---

## 1. Global Layout System

```
┌────────────────────── viewport = 1440 px ───────────────────────────────────┐
│        ┌─────────── max-w-[90rem] = 1440 px (editorial wide) ──────────┐    │
│  ┌─────┴──────── max-w-7xl = 1280 px (primary content) ────────────────┴──┐ │
│  │                                                                       │ │
│  │   ┌── side gutter px-4 (16) ──┐                ┌── px-4 (16) ──┐      │ │
│  │   │                           │                │                │      │ │
│  │   │   ┌─── px-8 (32) header gutter ───┐                              │ │ │
│  │   │   │     px-12 (48) catalog ───────┤                              │ │ │
│  │   │   │     px-20 (80) hero navbar ───┤                              │ │ │
│  │   │                                                                   │ │
│  │                                                                       │ │
└──┴───────────────────────────────────────────────────────────────────────┴─┘
```

### Vertical rhythm cheat-sheet
```
section padding-y          ┄┄┄  py-16  (64)  ◄── compact
                           ┄┄┄  py-20  (80)
                           ┄┄┄  py-24  (96)
                           ┄┄┄  py-32  (128) ◄── tall
inter-section gap          ┄┄┄  mt-24  (96)  Footer top, etc.
grid-gap (5-up cards)      ┄┄┄  gap-6  (24)
grid-gap (2-up panels)     ┄┄┄  gap-20 (80)
compare-card gap           ┄┄┄  gap-8  (32)
```

### Radius scale (visual ladder)
```
6px ▏ rounded-md       ── inputs, badges
12  ▏▏rounded-xl       ── order rows, line items
16  ▏▏▏ rounded-2xl    ── thumbnails, mini cards
24  ▏▏▏▏ rounded-3xl   ── stressor cards
32  ▏▏▏▏▏ rounded-[2rem]
40  ▏▏▏▏▏▏ rounded-[2.5rem]
48  ▏▏▏▏▏▏▏ rounded-[3rem]      ◄── most editorial panels
56  ▏▏▏▏▏▏▏▏ rounded-[3.5rem]   ◄── gallery shell
64  ▏▏▏▏▏▏▏▏▏ rounded-[4rem]    ◄── compare outer shell
∞   ●                            rounded-full (pills, badges)
```

### Color palette
```
┌──────────────────────────────────────────────────────────────────┐
│  ▓▓ #f7f3ee  luxury-beige     ── base background                 │
│  ▓▓ #f3ece2  cream            ── card / popover                  │
│  ▓▓ #efe6da  secondary        ── muted surface                   │
│  ▓▓ #7b6a5f  brown            ── body text                       │
│  ▓▓ #3a2a22  brown-deep       ── headings, foreground            │
│  ▓▓ #f5820d  orange-glow      ── accent + glow                   │
│  ▓▓ #a08f84  muted-foreground ── tertiary text                   │
│     rgba(58,42,34,0.08)       ── border hairline                 │
│  ██ rgba(58,42,34,0.82)→(42,30,23,0.86) ── FinalCTA dark veil    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Header / Navigation        height 80 / scrolled 56

```
 sticky · top-0 · z-40 · bg-background/60 backdrop-blur-md · border-b border-border/40
┌────────────────────────────── 1440 px ──────────────────────────────────────────┐
│  ◄── px-8 (32) ──►          ◄────── max-w-7xl = 1280 ──────►         ◄ px-8 ──► │
│  ┌──────────────┬───────────────────────────────────────┬──────────────────────┐│
│  │   [LOGO]     │   HOME    SHOP    CATEGORIES   SEARCH    CART     │  ⊙  👤  🛍│
│  │   110×110    │                                                   │  40 40 40││
│  │              │  ◄── gap-10 (40) between links ──►                │ icon btns││
│  └──────────────┴───────────────────────────────────────┴──────────────────────┘│
└────────────────────────────────────────────────────────────────────────────────┘
       ▲                            ▲                                       ▲
       │  fixed-width logo zone     │  flex-1 centered nav (hidden < md)    │  fixed actions
       │                            │                                       │  (gap-3 = 12)
       ▼                            ▼                                       ▼
  Link to "/"          5 × Link · text-[11px] · font-bold        ApiStatusDot · Search overlay
  SolivaLogo PNG       tracking-[0.25em] · uppercase             Account dropdown · Cart
  drop-shadow              hover : -translate-y-0.5
                           active: orange underline 1.5px → 100%
                           cart-badge : 14×14 px circle orange w/ count
```

### Right-action cluster (zoom)
```
                                                          ┌────── 280-ish px ──────┐
                                                          │                        │
   ┌────┐    ┌────┐    ┌────┐                             │   ┌─────── 288 ──────┐ │
   │ ⊙  │    │ 👤 │    │ 🛍 │   ←── 40 × 40 px each       │   │  Account menu    │ │
   │40px│    │40px│    │40px│       hover bg-accent/40    │   │  rounded-[2rem]  │ │
   └────┘    └────┘    └────┘       focus-ring-1          │   │  backdrop-blur-2x│ │
   search    account   cart                               │   │  shadow-2xl      │ │
                                                          │   └──────────────────┘ │
                                                          └────────────────────────┘
   Search OPEN → input slides L:
   ┌──────────────────────────────────┐ X
   │  Search...                  ⌫    │     width = min(60vw, 200px) · h-8
   └──────────────────────────────────┘     rounded-full · bg-white/5
```

---

## 3. Hero Section          height = 900 (h-screen) · sticky inner

```
┌──────────────────────────── 1440 × 900 ────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░ /hero-image.jpg  bg-size 165% auto, mix-blend-multiply ░░░░░░│
│ ░░ overlay 1: from-luxury-beige/40 to-transparent (vertical)                          ░│
│ ░░ overlay 2: from-brown-deep/20 to-transparent (top-right)                           ░│
│ ░░ overlay 3: stardust texture · mix-blend-overlay · opacity 0.03                     ░│
│                                                                                       ░│
│  ┌── floating nav ──────────────────────────────────────────────────────────────┐  ░  │
│  │  [Soliva logo 38h]                                                           │  ░  │
│  └──────────────────────────────────────────────────────────────────────────────┘  ░  │
│                                                                                       ░│
│  ┌── LEFT RAIL ──────┐         ┌──── CENTER COMPOSITION ────┐    ┌── RIGHT RAIL ───┐ ░│
│  │ 219 × 300         │         │                            │    │ 228 × 300        │ │
│  │ rounded-[2rem]    │         │      [ Soliva mark 80x ]   │    │ rounded-[2rem]   │ │
│  │ bg-white/10       │         │                            │    │ bg-white/10      │ │
│  │ backdrop-blur-md  │         │     ╔════ chip ═══════╗    │    │ backdrop-blur-md │ │
│  │ p-8 (32)          │         │     ║ ─ SS/26 VOL01 ─ ║    │    │ p-8 (32)         │ │
│  │                   │         │     ╚═════════════════╝    │    │  Environ · Live  │ │
│  │ ─ Dossier 26.01   │         │                            │    │                  │ │
│  │                   │         │  ┌────────────────────────┐│    │  UV Index        │ │
│  │ Edition           │         │  │      S O L I V A       ││    │      0 9         │ │
│  │ Sunwrap 01        │         │  │   (h1, ~160 px,        ││    │     EXTREME      │ │
│  │                   │         │  │    tracking 0.3em,     ││    │                  │ │
│  │ Origin            │         │  │    leading-none)       ││    │  Particulate     │ │
│  │ Delhi · IN        │         │  └────────────────────────┘│    │  142 μg/m³       │ │
│  │                   │         │                            │    │                  │ │
│  │ Calibrated        │         │   Sunwrap • UPF 50+ •      │    │  Ambient         │ │
│  │ 28.6°N · 77.2°E   │         │   Engineered in India      │    │  41°C · 18% RH   │ │
│  │                   │         │                            │    │                  │ │
│  │ ●  In Atelier     │         │   ─── Coming Soon ───      │    │  Threshold ─────►│ │
│  │   (pulse)         │         │                            │    │                  │ │
│  └───────────────────┘         │   ┌────────────────────┐   │    └──────────────────┘ │
│                                │   │ "Redefining urban  │   │                         │
│                                │   │  movement through  │   │                         │
│                                │   │  advanced textile  │   │                         │
│                                │   │  architecture."    │   │                         │
│                                │   │  max-w-2xl, italic │   │                         │
│                                │   └────────────────────┘   │                         │
│                                └────────────────────────────┘                         │
│                                                                                       │
│  ┌── archive label ──────────┐                            ┌── scroll pill ─────────┐  │
│  │ SYSTEM ARCHIVE // 26.01   │                            │  SCROLL TO EXPLORE  ▼  │  │
│  │ ──── 64×2 bar             │                            │  bg-white/10 px-6 py-2 │  │
│  └───────────────────────────┘                            └────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────────────┘
   ▲                                                                                   ▲
   └── absolute bottom-12 inset-x-12 — pointer-events-none ──────────────────────────►─┘

  Parallax (Framer Motion · useScroll):
    contentY :  0  →  -60 px
    bgScale  :  1  →   1.1
    opacity  :  1 (until 70 %) →  0  (at 100 %)
```

---

## 4. Amber Bridge Ribbon          height = 56

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ░░ bg-gradient-to-b from-orange-glow/5 via orange-glow/30 to orange-glow/5 │
│ ░░ backdrop-blur-sm     ::before warm drift  ::after light streak          │
│                                                                            │
│           "Built for Indian streets. Refined for modern living."           │
│            font-display italic · text-base · tracking-[0.18em]             │
│            ↑ per-word stagger reveal (animation-delay i × 90ms)            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Video Section          visible 900 · pin spacer +720 → 1620 px

```
┌────────────────────── pinned · z-0 · overflow-hidden ────────────────────────┐
│  ░░ atmospheric drift  +  orb1 (512×512 amber)  +  orb2 (576×576 cream)  ░░  │
│                                                                              │
│   ┌────── max-w-3xl = 768 px · absolute top-10 · centered ────────┐          │
│   │  rounded-[3rem] · bg-white/10 · border-brown/5 · p-10 (40)    │          │
│   │  ─ SYSTEM CORE 01                                             │          │
│   │                                                               │          │
│   │   Built For Real  *Daily Protection.*                         │          │
│   │   font-display · ~72 px (clamp 1.6→4.5rem) · leading-1.05     │          │
│   │   ↑ exits on scrub: y -100 · scale .93 · blur 8px · opacity 0 │          │
│   └───────────────────────────────────────────────────────────────┘          │
│                                                                              │
│         ┌─────────────────────────────────────────────────────┐              │
│         │                                                     │              │
│         │   VIDEO  CONTAINER     (absolute inset-0)           │              │
│         │   <video autoplay loop muted playsInline>           │              │
│         │   ◄────── scrub timeline ──────►                    │              │
│         │   scale  0.65 ──────────────► 1.00                  │              │
│         │   radius  4rem ──────────────► 0                    │              │
│         │   border  2px orange/30 ────► 0                     │              │
│         │   shadow  0 40px 100px brown ──► 0                  │              │
│         │   bg-black · object-cover · opacity-90              │              │
│         │   lazy mount via IntersectionObserver(rootMargin400)│              │
│         │                                                     │              │
│         └─────────────────────────────────────────────────────┘              │
│                                                                              │
│  ── MARQUEE STRIP  (absolute bottom-0 · z-30 · bg-white/20 backdrop-blur)──  │
│  ░░░  UPF 50+ ● DUAL-LAYER ● FULL COVERAGE ● BREATHABLE ● ... ●  ░░░         │
│  text-[9px] · tracking-[0.4em] · uppercase · animate 40 s (mobile 22 s)      │
└──────────────────────────────────────────────────────────────────────────────┘
                              GSAP scrollTrigger:
                              start: top top   end: +=80 %
                              scrub: 0.8       pin: true
```

---

## 6. Urban Storytelling — Horizontal Pin     visible 900 · spacer +3600

```
                          INNER TRACK · md:w-[200%] = 2880 px
       ┌───────────── translates -50 % during scrub ──────────────┐
       │                                                          │
       ▼                                                          ▼
 ╔══ PANEL 1 (720 px) ══════════════╦══ PANEL 2 (720 px) ════════════╗
 ║                                  ║                                 ║
 ║  STRESSOR  MAP                   ║   PRODUCT GALLERY (480×480)     ║
 ║                                  ║   + RATIONALE COLUMN            ║
 ║                                  ║                                 ║
 ╚══════════════════════════════════╩═════════════════════════════════╝

                  ↑ visible viewport = 1440 px window onto track
```

### 6.1 PANEL 1 — Stressor Map      (720 × 900 visible)

```
┌── px-12 (48) ─────────────────────────────────────────────── px-12 (48) ──┐
│                                                                            │
│  ╔══ EDITORIAL HEADER PANEL ═══════════════════════════════════════════╗  │
│  ║ bg-white/5 · border-brown/5 · rounded-[3rem] · p-10 (40) · blur-md  ║  │
│  ║                                                                     ║  │
│  ║  STRESSOR MAP                                  ┌─── max-w-[260] ──┐ ║  │
│  ║                                                │ "Everyday commute║  │
│  ║  Protection is often an *illusion*             │  silently exposes║  │
│  ║  we choose to believe.                         │  people to UV..."║  │
│  ║  (h2 ~58 px · clamp 1.8→3.25rem · leading 1.1) └──────────────────┘ ║  │
│  ╚═════════════════════════════════════════════════════════════════════╝  │
│                                                                            │
│   ─── STRESSOR MAP ───────────────────── 05 VECTORS ───                    │
│                                                                            │
│  ┌─── 5-up grid · gap-6 (24) · grid-cols-5 ───────────────────────────┐    │
│  │ ┌─── 254 wide ──┐ ┌─── 254 ─┐ ┌── 254 ──┐ ┌── 254 ──┐ ┌── 254 ──┐ │    │
│  │ │ RADIANCE 01/05│ │ATMOSPH. │ │ FRICTION│ │ THERMAL │ │EXPOSURE │ │    │
│  │ │ ┌────────────┐│ │┌───────┐│ │┌───────┐│ │┌───────┐│ │┌───────┐│ │    │
│  │ │ │  3:4 IMAGE ││ ││ image ││ ││ image ││ ││ image ││ ││ image ││ │    │
│  │ │ │ rounded-2xl││ │└───────┘│ │└───────┘│ │└───────┘│ │└───────┘│ │    │
│  │ │ │ grayscale-1││ │         │ │         │ │         │ │         │ │    │
│  │ │ │ ╔═badge 01═╗││ │         │ │         │ │         │ │         │ │    │
│  │ │ │   24×24    ││ │         │ │         │ │         │ │         │ │    │
│  │ │ │ SLV·F26    ││ │         │ │         │ │         │ │         │ │    │
│  │ │ │ ─ EXHIBIT  ││ │         │ │         │ │         │ │         │ │    │
│  │ │ └────────────┘│ │         │ │         │ │         │ │         │ │    │
│  │ │ Silent        │ │Atmosph. │ │Kinetic  │ │Stifled  │ │Residual │ │    │
│  │ │ Radiance      │ │Debt     │ │Friction │ │Breath   │ │Exposure │ │    │
│  │ │ desc 10px×2ln │ │desc...  │ │desc...  │ │desc...  │ │desc...  │ │    │
│  │ │ ───────────── │ │         │ │         │ │         │ │         │ │    │
│  │ │ UVA│BLOCK│EXP │ │PM2.5│SZ│ │SLIP│ADJ │ │TEMP│AIR │ │COV│GAP│EX│ │    │
│  │ │ 320│ <40 │EXT │ │142  │.3│ │18×  │NONE│ │+6° │BLK │ │PT │MZ │62│ │    │
│  │ └───────────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                            │
│  ─ Field Study — Delhi · Aug 2025 ──────── Subjects · 142 ─ Hours · 2310 ─ │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 PANEL 2 — Rationale      (720 × 900 visible)

```
┌── px-20 (80) ─────────────────────────────────────────────── px-20 (80) ──┐
│                                                                            │
│ ┌─── grid md:grid-cols-2 · gap-20 (80) · items-center ──────────────────┐  │
│ │ ┌────── GALLERY CARD ─────────┐  ┌────── RATIONALE PANEL ──────────┐ │  │
│ │ │ aspect-square ≈ 480 × 480   │  │ bg-white/10 · rounded-[3rem]    │ │  │
│ │ │ rounded-[3.5rem]            │  │ p-10 (40) · backdrop-blur-md    │ │  │
│ │ │ bg-white/40 · blur-xl       │  │                                 │ │  │
│ │ │                             │  │ 02 — THE RATIONALE              │ │  │
│ │ │   ┌──── image fill ────┐    │  │                                 │ │  │
│ │ │   │                    │    │  │ Engineered for                  │ │  │
│ │ │   │   /1.JPG  /2.JPG   │    │  │ *Everyday Exposure.*            │ │  │
│ │ │   │   object-cover     │    │  │ (h2 ~86 px clamp 1.75→4.25rem)  │ │  │
│ │ │   │   crossfade 800ms  │    │  │                                 │ │  │
│ │ │   │                    │    │  │ "Protection should move        " │ │  │
│ │ │   └────────────────────┘    │  │ "naturally with the body..."   " │ │  │
│ │ │                             │  │ max-w-xl · text-sm · italic     │ │  │
│ │ │  ◄ │ ○ ─── │ ► chevrons     │  │                                 │ │  │
│ │ │  44×44 hover-only           │  │ ┌──── rationale list ────────┐  │ │  │
│ │ │                             │  │ │ 01  ADAPTIVE COVERAGE      │  │ │  │
│ │ │  ┌─── floating card ────┐   │  │ │     desc 11px max-w-md     │  │ │  │
│ │ │  │ Certified Protection │   │  │ │     ──── orange underline  │  │ │  │
│ │ │  │   UPF 50+            │   │  │ ├────────────────────────────┤  │ │  │
│ │ │  │ Blocks 98% UV        │   │  │ │ 02  ATMOSPHERIC INTEL.     │  │ │  │
│ │ │  │ rounded-3xl bg-w/60  │   │  │ ├────────────────────────────┤  │ │  │
│ │ │  └──────────────────────┘   │  │ │ 03  BREATHABLE MOBILITY    │  │ │  │
│ │ │  ● ─ System Core top-right  │  │ ├────────────────────────────┤  │ │  │
│ │ │  pagination · ○ ─── ○ ○ ○   │  │ │ 04  KINETIC STABILITY      │  │ │  │
│ │ └─────────────────────────────┘  │ └────────────────────────────┘  │ │  │
│ │                                  └─────────────────────────────────┘ │  │
│ └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│ ── FIXED BOTTOM STRIP (z-50 · bg-luxury-beige/95 · py-3) ──────────────── │
│  [Logo20] ┃ SYSTEM ARCHIVE 26.01 ┃ MILAN PARIS TOKYO ┃ … ┃ [Engineered →]│
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Collection Section      height ≈ 922 px

```
┌─────────────── max-w-[90rem] · px-12 ─────────────────────────────────────────────────┐
│                                                                                       │
│  ╔══ HEADER CAPSULE ═══════════════════════════════════════════════════════════════╗  │
│  ║ rounded-[2.5rem] · bg-white/10 · border-brown/5 · px-8 py-3 · backdrop-blur-md  ║  │
│  ║                                                                                 ║  │
│  ║          ─── PREVIEW COLLECTION ───                                             ║  │
│  ║                                                                                 ║  │
│  ║         Five editions.  *One philosophy.*                                       ║  │
│  ║         font-display · ~41.6 px · leading-[1.1] · whitespace-nowrap (md+)       ║  │
│  ║                  ────────────  64×2 hairline gradient  ────────────             ║  │
│  ║         Protective essentials, engineered for everyday Indian conditions.       ║  │
│  ╚═════════════════════════════════════════════════════════════════════════════════╝  │
│                                                                                       │
│  ┌── grid-cols-5 · gap-4 (16) · items-end ───────────────────────────────────────┐    │
│  │                                                                                │    │
│  │  ┌─ 254 ─┐ ┌─ 254 ─┐ ┌─ 254 ─┐ ┌─ 254 ─┐ ┌─ 254 ─┐                            │    │
│  │  │ EDITION│ │EDITION│ │EDITION│ │EDITION│ │EDITION│                            │    │
│  │  │   01   │ │  02   │ │  03   │ │  04   │ │  05   │     ── badge 14×14 black │    │
│  │  │        │ │       │ │       │ │       │ │       │        rounded-2xl       │    │
│  │  │ image  │ │image  │ │image  │ │image  │ │image  │     aspect [4/5.2]       │    │
│  │  │ frame  │ │frame  │ │frame  │ │frame  │ │frame  │     rounded-[2.5rem]     │    │
│  │  │ 4:5.2  │ │       │ │       │ │       │ │       │     bg-white/30 blur-md  │    │
│  │  │ tone:  │ │tone:  │ │tone:  │ │tone:  │ │tone:  │     hover -translate-y-1 │    │
│  │  │ pink   │ │lime   │ │green  │ │blue   │ │beige  │                          │    │
│  │  │        │ │       │ │       │ │       │ │       │     product img         │    │
│  │  │  PNG   │ │ PNG   │ │ PNG   │ │ PNG   │ │ PNG   │     object-contain      │    │
│  │  │  floats│ │       │ │       │ │       │ │       │     y [0,-5,0] · 4s    │    │
│  │  │  y±5px │ │       │ │       │ │       │ │       │                          │    │
│  │  │ ╭─ground╮│ │      │ │       │ │       │ │       │     blur-2xl shadow    │    │
│  │  │ ╰──blur╯ │ │      │ │       │ │       │ │       │                          │    │
│  │  │        │ │       │ │       │ │       │ │       │  ┌── HOVER pill ──┐     │    │
│  │  │ [hover │ │       │ │       │ │       │ │       │  │ Reveal on Launch│     │    │
│  │  │  pill] │ │       │ │       │ │       │ │       │  └─────────────────┘     │    │
│  │  ├────────┤ ├───────┤ ├───────┤ ├───────┤ ├───────┤                          │    │
│  │  │Blush   │ │Zesty  │ │Green  │ │Deep   │ │Classic│   text block            │    │
│  │  │Pink    │ │Lime   │ │Edition│ │Blue   │ │Beige  │   bg-white/10           │    │
│  │  │desc 2L │ │desc   │ │desc   │ │desc   │ │desc   │   rounded-2xl p-4       │    │
│  │  └────────┘ └───────┘ └───────┘ └───────┘ └───────┘                          │    │
│  └────────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                       │
│      Thoughtfully layered.                                                            │
│      *Effortlessly worn.*                          (h4 · 36 px · text-center)         │
│                                                                                       │
│ ──── TRUST-LINE MARQUEE  (mt-8 · border-y · py-8 · mask 15→85%) ────────────────────  │
│ ░░░  UPF 50+ Protection ✦ Breathable Comfort ✦ Full Coverage ✦ Built for India ✦ ░░░ │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Compare Section      height ≈ 2047 px

```
┌─────────── max-w-[90rem] · px-8 (32) ─────────────────────────────────────────────────┐
│ ░ atmospheric mask (h-64 · bg-gradient white/60 → luxury-beige/40 → transparent) ░    │
│                                                                                       │
│ ╔══ CHAMPAGNE EDITORIAL SHELL ═══════════════════════════════════════════════════════╗│
│ ║ rounded-[4rem] · p-12 · md:px-20 md:pt-10 md:pb-16 · bg-white/10 · blur-md         ║│
│ ║ shadow 0 40 100 -40 brown/10 · inset 0 0 80 cream/30                               ║│
│ ║                                                                                    ║│
│ ║                  ──── THE COMPARISON ────                                          ║│
│ ║                                                                                    ║│
│ ║                Still using a dupatta or                                            ║│
│ ║                *regular scarf?*                                                    ║│
│ ║                (h2 · ~72 px · clamp 1.85→4.5rem · tracking-tighter)                ║│
│ ║                                                                                    ║│
│ ║                "It feels like protection.                                          ║│
│ ║                 But it was never engineered for daily exposure."                   ║│
│ ║                                                                                    ║│
│ ║ ┌── 2-col flex · gap-8 (32) · items-stretch · perspective-2000 ──────────────────┐ ║│
│ ║ │ ╔═══ LEFT · flex-1 · ≈ 560 px ════╗  ╔═══ RIGHT · flex-[1.1] · ≈ 615 px ════╗ │ ║│
│ ║ │ ║ bg-[#EBE5DE]/80 · rounded-[3rem]║  ║ bg-[#FDFBF7]/95 · rounded-[3rem]    ║ │ ║│
│ ║ │ ║ p-12 (48) · border-brown/20    ║  ║ p-14 (56) · border-2 orange/30      ║ │ ║│
│ ║ │ ║                                ║  ║                                     ║ │ ║│
│ ║ │ ║ 01 // CONVENTIONAL             ║  ║ 02 // SOLIVA AIRSHIELD™      ● pulse║ │ ║│
│ ║ │ ║                                ║  ║                                     ║ │ ║│
│ ║ │ ║ Borrowed                       ║  ║ Engineered                          ║ │ ║│
│ ║ │ ║ protection.   (h3 · 36 px)     ║  ║ protection.   (h3 · 60 px)          ║ │ ║│
│ ║ │ ║ desc max-w-[240]               ║  ║ desc max-w-[320]                    ║ │ ║│
│ ║ │ ║                                ║  ║                                     ║ │ ║│
│ ║ │ ║ ┌──── stats grid 3 ────┐       ║  ║ ┌──── stats grid 3 (bigger) ────┐   ║ │ ║│
│ ║ │ ║ │ UPF │ ADJ/HR │ COVER │       ║  ║ │  UPF  │ ADJ/HR │ COVER       │   ║ │ ║│
│ ║ │ ║ │ ≤15 │  18×   │Partial│       ║  ║ │  50+  │   0×   │ 360°        │   ║ │ ║│
│ ║ │ ║ │ font-mono italic 24px│       ║  ║ │  font-mono black 48px         │   ║ │ ║│
│ ║ │ ║ └──────────────────────┘       ║  ║ └───────────────────────────────┘   ║ │ ║│
│ ║ │ ║                                ║  ║                                     ║ │ ║│
│ ║ │ ║  ─ Slips during rides          ║  ║  ▬ Full face & neck coverage        ║ │ ║│
│ ║ │ ║  ─ Constant repositioning      ║  ║  ▬ Dual-layer breathable airflow    ║ │ ║│
│ ║ │ ║  ─ Traps heat & sweat          ║  ║  ▬ Stays secure while moving        ║ │ ║│
│ ║ │ ║  ─ Leaves neck exposed         ║  ║  ▬ Lightweight all-day comfort      ║ │ ║│
│ ║ │ ║  ─ Gaps around ears & nose     ║  ║  ▬ Designed for real-world commute  ║ │ ║│
│ ║ │ ║  ─ Tangled hair & makeup       ║  ║  ▬ No exposed gaps                  ║ │ ║│
│ ║ │ ║   (12 px hairline · 14 px text)║  ║   (20×6 px orange pill · 17 px bold)║ │ ║│
│ ║ │ ║                                ║  ║                                     ║ │ ║│
│ ║ │ ║ ── Looks covered.              ║  ║ ── Designed once.                   ║ │ ║│
│ ║ │ ║    *Still exposed.*            ║  ║    *Worn effortlessly.*             ║ │ ║│
│ ║ │ ╚════════════════════════════════╝  ╚═════════════════════════════════════╝ │ ║│
│ ║ └──────────────────────────────────────────────────────────────────────────────┘ ║│
│ ║                                                                                    ║│
│ ║           Protection shouldn't depend on *adjustment.*  (h4 · ~48 px)              ║│
│ ║           ─── Designed for real life. Not temporary fixes. ───                     ║│
│ ╚════════════════════════════════════════════════════════════════════════════════════╝│
│                                                                                       │
│ ──── BOTTOM MARQUEE  (mt-20 · border-y · py-12 · 60 s linear · mask 15→85%) ──────── │
│ ░░░  UPF 50+ Protection ✦ Breathable Airflow ✦ 360° Coverage ✦ ... ✦  ░░░            │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Final CTA      height ≈ 1139 px

```
┌──────────────────── full bleed · bg-cinematic-veil grain · py-20 ────────────────────┐
│ ▒▒▒ dark veil over global luxury image (rgba 58,42,34,.82 → 42,30,23,.86) ▒▒▒        │
│ ▒▒▒ radial 60%×50% at 50%/50% rgba(245,130,13,.12) + central vignette ▒▒▒            │
│ ▒▒▒ 24 floating <Particles /> dots ▒▒▒                                               │
│                                                                                      │
│        ┌──────────── max-w-5xl = 1024 px · text-center ─────────────┐                │
│        │                                                            │                │
│        │  ╔══ DARK GLASS CARD ═════════════════════════════════╗    │                │
│        │  ║ rounded-[3rem] · bg-black/15 · border luxury/10    ║    │                │
│        │  ║ p-16 (64) · shadow 0 40 100 -20 black/40           ║    │                │
│        │  ║                                                    ║    │                │
│        │  ║              [ SolivaLogo 110 ]                    ║    │                │
│        │  ║                                                    ║    │                │
│        │  ║              P R E M I E R E                       ║    │                │
│        │  ║              *  S O O N  *                         ║    │                │
│        │  ║   (h2 · ~112 px clamp 2.25→7rem · cream)           ║    │                │
│        │  ║   text-shadow: amber bevel stack + orange glow     ║    │                │
│        │  ║                                                    ║    │                │
│        │  ║   "Engineering protection. Designed in India."     ║    │                │
│        │  ║   font-display · text-xl · italic · cream/70       ║    │                │
│        │  ║                                                    ║    │                │
│        │  ║   ┌── max-w-md = 448 · row · gap-4 ──────────────┐ ║    │                │
│        │  ║   │ ┌──── input ────────────┐ ┌─── button ────┐ │ ║    │                │
│        │  ║   │ │  your@email.com       │ │ SECURE ACCESS │ │ ║    │                │
│        │  ║   │ │  rounded-full px-8 py4│ │ rounded-full   │ │ ║    │                │
│        │  ║   │ │  bg-white/[.03]       │ │ px-10 py-4     │ │ ║    │                │
│        │  ║   │ │  border cream/20      │ │ gradient brown │ │ ║    │                │
│        │  ║   │ └───────────────────────┘ │ ↘ orange ↘ deep│ │ ║    │                │
│        │  ║   │                            │ light-sweep   │ │ ║    │                │
│        │  ║   │                            └───────────────┘ │ ║    │                │
│        │  ║   └────────────────────────────────────────────────┘ ║  │                │
│        │  ╚════════════════════════════════════════════════════╝    │                │
│        │                                                            │                │
│        │  ┌── max-w-3xl = 768 · grid grid-cols-4 · gap-8 · border-t ─┐               │
│        │  │ Edition       │ Serial       │ Release      │ Atelier   │                │
│        │  │ Sunwrap 01    │ SLV/26.001   │ Spring · 2026│ Delhi · IN│                │
│        │  │ 7px label↑    · italic 14px display value           │                    │
│        │  └─────────────────────────────────────────────────────┘                    │
│        │                                                            │                │
│        │      INSTAGRAM ✦ JOURNAL ✦ PRESS                           │                │
│        │              [ SolivaLogo 40 (opacity 0.4 pulse) ]         │                │
│        │      © 2026 SOLIVA SUNWRAP — DESIGNED IN INDIA             │                │
│        └────────────────────────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Footer       (rendered on `_public` routes; **not** on `/` — FinalCTA is the closer)

```
┌─────────── mt-24 (96) · border-t border-border/40 · bg-background/60 ──────────────┐
│ ┌──────────── max-w-7xl = 1280 · px-8 · py-16 ─────────────────────────────────┐  │
│ │ ┌──── grid grid-cols-4 · gap-10 (40) ─────────────────────────────────────┐  │  │
│ │ │                                                                          │ │  │
│ │ │ ┌── BRAND ──┐  ┌── SHOP ─────┐  ┌── COMPANY ──┐  ┌── ACCOUNT ───┐        │ │  │
│ │ │ │           │  │             │  │             │  │              │        │ │  │
│ │ │ │ Soliva    │  │ All products│  │ About       │  │ Sign in      │        │ │  │
│ │ │ │ (display  │  │ Categories  │  │ Contact     │  │ Create acct  │        │ │  │
│ │ │ │  24 px)   │  │ Search      │  │             │  │              │        │ │  │
│ │ │ │           │  │             │  │             │  │              │        │ │  │
│ │ │ │ "Consid-  │  │ link 14 px  │  │             │  │              │        │ │  │
│ │ │ │  ered ob- │  │ space-y-2   │  │             │  │              │        │ │  │
│ │ │ │  jects    │  │ min-h 32 px │  │             │  │              │        │ │  │
│ │ │ │  for a    │  │ hover full  │  │             │  │              │        │ │  │
│ │ │ │  quieter  │  │ opacity     │  │             │  │              │        │ │  │
│ │ │ │  ritual." │  │             │  │             │  │              │        │ │  │
│ │ │ │ max-w-xs  │  │             │  │             │  │              │        │ │  │
│ │ │ └───────────┘  └─────────────┘  └─────────────┘  └──────────────┘        │ │  │
│ │ │                                                                          │ │  │
│ │ │  group title : text-xs uppercase tracking-widest muted-foreground         │ │  │
│ │ └──────────────────────────────────────────────────────────────────────────┘ │  │
│ └──────────────────────────────────────────────────────────────────────────────┘  │
│ ──── border-t border-border/40 ──── copyright row · py-6 ─────────────────────── │
│ © 2026 Soliva. All rights reserved.                              Made with care   │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Typography — Visual Scale Ladder

```
─ font-display = Cormorant Garamond ─────────────────────────────────────────────────

      ████████████████████████████████████████████████████████████  160 px  Hero H1 "SOLIVA"
      ██████████████████████████████████████████████                112 px  FinalCTA  "PREMIERE SOON"
      ██████████████████████████████████████                         86 px  Storytelling P2 H2
      ████████████████████████████████                               72 px  Compare H2 · Video H2 · Products H1
      ████████████████████████████                                   60 px  Compare RIGHT card H3
      ████████████████████████                                       58 px  Storytelling P1 H2
      ████████████████████                                           48 px  Compare bottom H4
      ████████████████                                               42 px  Collection H2
      ████████████████                                               36 px  Compare LEFT H3 · Collection H4
      ██████████                                                     24 px  Wordmark "Soliva"
      ███████                                                        20 px  Storytelling rationale H4

─ font-body = Inter ────────────────────────────────────────────────────────────────
      ████████  16 px   text-base
      ███████   14 px   text-sm
      ██████    13 px   compare bullets
      █████     12 px   text-xs
      ████      11 px   text-[11px] · nav links, rationale body
      ████      10 px   eyebrows, micro-labels

─ font-mono = JetBrains Mono ────────────────────────────────────────────────────────
      ████   10 px   eyebrows, badges
      ███     9 px   metric values
      ███     8 px   editorial micro-labels
      ██      7 px   image badges, secondary labels
      █       6 px   stressor metric keys
                   tracking-[0.4em] → tracking-[0.8em]  ◄── luxury cadence
```

### Heading max-widths
```
   max-w-2xl (672 px)  ┃ Hero mission strap · Compare subtext
   max-w-3xl (768 px)  ┃ VideoSection card · FinalCTA dossier
   max-w-xl  (576 px)  ┃ Rationale subtext
   max-w-md  (448 px)  ┃ Collection subtext · Rationale body
   max-w-[320] / [240] ┃ Compare card subtexts
```

---

## 12. Image & Media — Boxed Spec

```
┌── /hero-image.jpg ─────────────────┐  ┌── /new_BG.png ──────────────────────┐
│ Full viewport · 1440 × 900         │  │ Fixed bg via body::before           │
│ bg-size 165% auto · bg-top         │  │ background-size: cover              │
│ mix-blend-multiply · opacity 80    │  │ z-index: -10                        │
│ Parallax scale 1 → 1.1             │  │ Rendered ONCE, GPU layer            │
│ Reveal blur 20px → 0  /  2.5s      │  │                                     │
└────────────────────────────────────┘  └─────────────────────────────────────┘

┌── /logo-new.png ───────────────────┐  ┌── /soliva-logo-anim.mp4 ────────────┐
│ Combined mark + wordmark PNG       │  │ 1440 × 900 within video container   │
│ object-contain                     │  │ object-cover · opacity 90           │
│ drop-shadow(0 4 10 amber/15)       │  │ autoplay loop muted playsInline     │
│ Header · 90 / 110 (scrolled / not) │  │ Lazy mount IntersectionObserver     │
│ Hero center · 80                   │  │ (rootMargin 400 px)                 │
│ FinalCTA · 110 + small 40 pulse    │  │ Bg-black · scaled 0.65 → 1          │
└────────────────────────────────────┘  └─────────────────────────────────────┘

┌── /1.JPG · /2.JPG  (gallery) ──────┐  ┌── /sun · dust · slipping · etc ─────┐
│ 480 × 480 inside gallery card      │  │ Aspect 3:4  ·  ≈ 240 × 320          │
│ object-cover                       │  │ object-cover  ·  rounded-2xl        │
│ Crossfade 800 ms ease (.19,1,.22,1)│  │ grayscale-[.1] contrast 1.1 br 1.05 │
│ Soft ambient overlay top-right     │  │ Hover scale 1.1 over 2 s            │
└────────────────────────────────────┘  └─────────────────────────────────────┘

┌── /pink · /lemon · /lime · /blue (Collection) ──────────────────────────────┐
│ Aspect 4:5.2  ·  254 × 330  ·  object-contain  ·  rounded-[2.5rem]          │
│ drop-shadow(0 20 40 brown/18)  ·  float y [0,-5,0] · 4 s                    │
│ Per-card linear-gradient tone overlay + radial glow on hover                │
│ Ground shadow: 52 % × 10 px blur-2xl brown-deep/30                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Z-index audit
```
                                                       z
   Loader overlays         ████████████████████████  100  / 10 000
   Storytelling fixed strip ██████████████████████   50
   Header (sticky)         █████████████████████     40
   Editorial rails / chips ████████████████████      20
   Section content         ██████████████████        10
   Section atmosphere      ██████                    0-1
   body::before bg image   ▒▒                       -10
```

---

## 13. Buttons & Interactive — Variant Map

```
shadcn buttonVariants  (desktop · md+)
┌──────────────────────────────────────────────────────────────────────────────┐
│ size      │ height │ padding         │ typography      │ example use case   │
├───────────┼────────┼─────────────────┼─────────────────┼────────────────────┤
│ default   │ 36 px  │ px-4 py-2       │ text-sm 500     │ generic            │
│ sm        │ 32 px  │ px-3 text-xs    │ text-xs         │ filter clear       │
│ lg        │ 40 px  │ px-6/px-8       │ text-sm 500     │ "Add to cart" base │
│ icon      │ 36×36  │ —               │ —               │ menu, search, etc. │
└──────────────────────────────────────────────────────────────────────────────┘

  Custom CTAs:

  ┌── STORYTELLING FOOTER PILL ────────────────┐
  │  ENGINEERED FOR MOVEMENT  →                │   bg gradient brown→orange-glow
  │  px-8 py-2.5 · rounded-full · text-[10px]  │   3D rotateX 90→0 on scrollY
  │  tracking-[0.2em] uppercase font-bold      │   hover: y-2 scale 1.02 + glow
  └────────────────────────────────────────────┘

  ┌── FINALCTA "SECURE ACCESS" ────────────────┐
  │  px-10 py-4 · rounded-full                 │   gradient brown→orange→brown-deep
  │  text-[9px] tracking-[0.3em] uppercase     │   light-sweep shimmer 800ms
  │  font-bold white                           │   hover shadow 0 0 40 amber/.3
  └────────────────────────────────────────────┘

  ┌── PRODUCT DETAIL "ADD TO CART" ────────────┐
  │  w-full · rounded-full · py-7 (≈ 72 px)    │   bg-brown-deep → bg-brown
  │  text-[11px] tracking-[0.2em] uppercase    │   hover shadow 0 10 30 brown/.3
  │  font-bold white                           │
  └────────────────────────────────────────────┘

  ┌── HEADER PILL TOGGLES (search / acct / cart)
  │  40 × 40 px · rounded-full · icon 18×18    │   hover bg-accent/40 + scale 1.1
  └────────────────────────────────────────────┘

  ┌── GALLERY CHEVRONS ────────────────────────┐
  │  44 × 44 px · rounded-full · icon 20×20    │   bg-white/30 backdrop-blur-xl
  │  opacity 0 → 1 on group-hover (500 ms)     │   hover bg-white/50
  └────────────────────────────────────────────┘
```

### Input system
```
  ┌────────── shadcn Input ────────────────────────────────────────────┐
  │  height 36 px desktop / 44 px mobile · px-3 py-1                   │
  │  border 1px input · bg-transparent                                 │
  │  text-sm (14 px) desktop · text-base (16 px) mobile (anti-zoom)    │
  │  focus-visible:ring-1 focus-visible:ring-ring                      │
  └────────────────────────────────────────────────────────────────────┘
```

---

## 14. Component Hierarchy Map  (full tree)

```
<RootShell>                                            src/routes/__root.tsx
└── <html lang="en">
    └── <body>   overflow-x: hidden · body::before global bg image
        └── <QueryClientProvider>
            └── <Outlet>
                └── <Index>                            src/routes/index.tsx
                    │
                    ├── <LoadingPage>  (conditional, sessionStorage gate)
                    │
                    ├── <Header>                       src/components/layout/Header.tsx
                    │   └── motion.header  (sticky · z-40)
                    │       └── <div max-w-7xl · flex justify-between>
                    │           ├── <Sheet>  (mobile trigger)
                    │           ├── motion.div .logo
                    │           │   └── <SolivaLogo />
                    │           ├── <nav>   (desktop · gap-10)
                    │           │   └── 5 × <Link>     Home · Shop · Categories · Search · Cart
                    │           └── <div .right-actions>
                    │               ├── <ApiStatusDot />
                    │               ├── search overlay (AnimatePresence)
                    │               ├── <DropdownMenu>  account
                    │               └── cart icon button + badge
                    │
                    └── <main>  fades opacity 0 → 1 via GSAP after loader exits
                        │
                        ├── <Hero>                     src/components/Hero.tsx
                        │   └── <section h-screen>
                        │       └── <div sticky>
                        │           ├── bg image layer  (parallax + blur in)
                        │           ├── 3 atmospheric overlays
                        │           ├── <nav> floating (SolivaLogo h-38)
                        │           ├── motion.aside  LEFT  Dossier 26.01
                        │           ├── motion.aside  RIGHT Environ · Live
                        │           ├── motion.div  .center
                        │           │   ├── SolivaLogo  (mark, animated y)
                        │           │   ├── .pre-title chip  "SS / 26 · VOLUME 01"
                        │           │   ├── motion.h1 "SOLIVA"
                        │           │   ├── .counterweight  "Sunwrap • UPF 50+ • India"
                        │           │   └── .subtitle  "Coming Soon" + mission strap
                        │           └── absolute bottom row  (Archive label + Scroll pill)
                        │
                        ├── <VideoSection>             src/components/VideoSection.tsx
                        │   ├── .bridge-strip ribbon
                        │   │   └── <p>  punchline · per-word stagger
                        │   └── <section pinned>
                        │       ├── atmospheric drift  +  orb1  +  orb2
                        │       ├── text card  (ref textContentRef)
                        │       ├── video container  (ref videoContainerRef)
                        │       │   └── <video> lazy mp4 + dark overlay
                        │       └── marquee strip  (z-30 bottom)
                        │
                        ├── <UrbanStorytelling>        src/components/UrbanStorytelling.tsx
                        │   └── <section pinned>
                        │       ├── 2 radial mesh layers + texture
                        │       ├── top fade gradient
                        │       ├── <div containerRef> (x translate -50%)
                        │       │   ├── PANEL 1 — Stressor Map
                        │       │   │   ├── editorial intro panel
                        │       │   │   ├── 5-up stressor card grid
                        │       │   │   └── field study footer strip
                        │       │   └── PANEL 2 — Rationale
                        │       │       ├── gallery card  (gallery · chevrons · dots · cert card · system label)
                        │       │       └── rationale panel  (eyebrow · h2 · subtext · 4-item list)
                        │       └── fixed bottom luxury strip  (logo · meta · CTA pill)
                        │
                        ├── <CollectionSection>        src/components/CollectionSection.tsx
                        │   ├── deco layers
                        │   ├── header capsule  (eyebrow · h2 · hairline · subtext)
                        │   ├── grid 5-up collection cards
                        │   │   └── <motion.article> × 5
                        │   │       ├── image frame  (tone · glow · ground · badge · img · hover pill)
                        │   │       └── text block   (title · desc)
                        │   ├── bottom CTA h4  "Thoughtfully layered. Effortlessly worn."
                        │   └── trust-line marquee
                        │
                        ├── <CompareSection>           src/components/CompareSection.tsx
                        │   ├── top atmospheric mask
                        │   ├── 2 animated mesh layers
                        │   └── champagne editorial shell
                        │       ├── header  (eyebrow · h2 · subtext)
                        │       ├── 2-up comparison cards (Old vs Engineered)
                        │       └── bottom statement  (h4 · tagline)
                        │   + luxury bottom marquee (60 s)
                        │
                        └── <FinalCTA>                 src/components/FinalCTA.tsx
                            ├── <Particles count={24} />
                            ├── atmospheric overlays
                            └── dark glass card
                                ├── SolivaLogo
                                ├── h2  "PREMIERE / SOON"
                                ├── strap line
                                ├── email form  OR  confirmation pill
                                ├── release dossier  (4-up grid)
                                └── footer meta  (social links · small logo · copyright)
```

---

## 15. Spacing Logic — Visual Token Map

```
PADDING-X SCALE (Tailwind tokens used on this page)
  px-4 (16)  ┃  px-6 (24)  ┃  px-8 (32)  ┃  px-12 (48)  ┃  px-20 (80)
   ▏▏▏▏        ▏▏▏▏▏▏        ▏▏▏▏▏▏▏▏      ▏▏▏▏▏▏▏▏▏▏▏▏    ▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏▏

PADDING-Y SCALE
  py-2 (8)  py-3 (12)  py-4 (16)  py-6 (24)  py-8 (32)  py-10 (40)  py-12 (48)
   ▏▏        ▏▏▏        ▏▏▏▏       ▏▏▏▏▏▏      ▏▏▏▏▏▏▏▏     ▏▏▏▏▏▏▏▏▏▏      ▏▏▏▏▏▏▏▏▏▏▏▏
  py-14 (56)  py-16 (64)  py-20 (80)  py-24 (96)  py-32 (128)

GAP SCALE
  gap-1.5 (6)   ── stressor metric grid
  gap-3   (12)  ── small card stacks
  gap-4   (16)  ── collection grid
  gap-6   (24)  ── stressor card grid
  gap-8   (32)  ── compare 2-up
  gap-10  (40)  ── header nav · footer columns
  gap-12  (48)  ── product page grids
  gap-16  (64)  ── marquees
  gap-20  (80)  ── storytelling 2-up
```

---

## 16. Implementation Notes (compact)

```
1. Mount order  : LoadingPage → Header → main (GSAP fade-in opacity 0→1)
2. Smooth scroll: single Lenis instance · ticker bound to ScrollTrigger.update
3. Pin timelines:
     VideoSection         start:top top   end:+=80%    scrub:0.8  pin:true
     UrbanStorytelling    start:top top   end:+=400%   scrub:true pin:true pinSpacing:false
4. Hero parallax uses Framer Motion useScroll, independent of GSAP.
5. Marquees    : motion.div animate x ["0%","-50%"] with duplicated content + edge mask.
6. Reduced motion overrides cancel: marquee · bridge-strip ::before/::after · depth-float
                                    · text-3d-float · punchline-word · video-orb-*
7. Editorial rails are pointer-events-none (decorative).
8. Logo is a SINGLE PNG (mark + wordmark combined) — never two elements.
9. Container math (1440 vw):
     max-w-7xl px-8   → 1248 px content
     max-w-[90rem] px-12 → 1344 px content
     storytelling panels → max-w-[1400] mx-auto
```

---

*Blueprint generated from live DOM measurements at `http://localhost:8083/` (viewport 1440 × 900) and source inspection across `src/components/*` + `src/routes/*`. ASCII column scale ≈ 14.4 px / col.*
