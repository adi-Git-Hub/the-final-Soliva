import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { getLenis } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger, Observer);

interface HorizontalStoryOptions {
  /** The full-viewport section that pins/locks while the chapter plays. */
  sectionRef: RefObject<HTMLElement | null>;
  /** The horizontal flex track holding the panels (width = slideCount * 100%). */
  trackRef: RefObject<HTMLDivElement | null>;
  /** Number of story panels in the track. */
  slideCount: number;
  /** Desktop only — pass `!isMobile`. When false the hook is inert. */
  enabled: boolean;
  /** Fired when the dominant panel changes (drives active-slide focus). */
  onChange?: (index: number) => void;
  /**
   * "scrub" (default): panels pan continuously, tied to scroll, snapping gently.
   * "lock": the page scroll FREEZES while the section is centred and each scroll
   * gesture advances exactly ONE panel — no continuous panning, no skipping.
   */
  mode?: "scrub" | "lock";
  /**
   * scrub-mode only — scroll budget per panel as a fraction of one viewport
   * (default 1). Lower = snappier.
   */
  endScale?: number;
}

/**
 * Horizontal storytelling controller.
 *
 * In "scrub" mode the section pins and the panels pan smoothly with scroll.
 * In "lock" mode the section behaves like a slide deck: when it fills the
 * viewport the page scroll freezes and every deliberate scroll / swipe / arrow
 * advances exactly ONE panel (scroll down = next, up = previous), holding each
 * panel completely still in between. Scrolling past the last panel (or before
 * the first) releases the section back to normal vertical scrolling.
 */
export function useHorizontalStory({
  sectionRef,
  trackRef,
  slideCount,
  enabled,
  onChange,
  mode = "scrub",
  endScale = 1,
}: HorizontalStoryOptions) {
  useEffect(() => {
    if (!enabled || slideCount < 2) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const steps = slideCount - 1;
    const per = 100 / slideCount; // xPercent of the track per single panel

    /* ──────────────────────── LOCK MODE ──────────────────────── */
    if (mode === "lock") {
      // Gesture detection by velocity. A page advances on the LEADING EDGE of a
      // scroll motion — either after the wheel goes idle (a fresh motion) or on a
      // velocity SPIKE (the user flicking again while the previous motion's
      // inertia is still decaying). The decaying inertia in between is absorbed,
      // so ONE motion = ONE page no matter how long the inertia runs (never a
      // skip to the last page), while a deliberate re-flick still fires at once.
      const IDLE_GAP = 200; // ms of wheel-silence that ends a motion
      const SPIKE_RATIO = 2.5; // re-flick: |delta| jumps this × over the inertia
      const SPIKE_MIN = 24; // …and is at least this large (ignore noise)
      const REARM = 150; // floor between steps (one motion can't double-fire)
      const ENTRY_ABSORB = 380; // swallow the scroll that carried the user in
      let index = 0;
      let active = false; // section centred + scroll frozen
      let guardUntil = 0; // ignore re-engage briefly after releasing
      let lastWheelT = -Infinity;
      let avgMag = 0; // smoothed |deltaY| (tracks/decays with inertia)
      let stepFloor = 0;
      let lastScroll = 0;
      let prevTop = Infinity;
      let settleTimer: ReturnType<typeof setTimeout> | undefined;
      // While a page is still arriving (slide in flight, or the entry settle),
      // ALL input is blocked — the chapter must reach 100% on screen before the
      // next scroll counts, and the section can't release to vertical scroll
      // until the last page has fully settled. (Wheel timing is still tracked so
      // a flick's inertia tail is absorbed, not read as a fresh gesture after.)
      let transitioning = false;

      const scrollY = () =>
        getLenis()?.scroll ?? window.scrollY ?? document.documentElement.scrollTop;
      const absTop = () => section.getBoundingClientRect().top + scrollY();

      const goto = (next: number) => {
        const clamped = Math.max(0, Math.min(steps, next));
        if (clamped === index) return;
        index = clamped;
        transitioning = true; // block input until this slide finishes
        gsap.to(track, {
          xPercent: -per * index,
          duration: 0.3,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            transitioning = false;
          },
        });
        onChange?.(index);
      };

      const engage = (startIndex: number) => {
        if (active) return;
        active = true;
        transitioning = true; // block until page 1 has fully settled in
        index = startIndex;
        // Promote the track to its own GPU layer so the horizontal slide stays
        // buttery (no per-frame re-raster of the panels).
        gsap.set(track, { xPercent: -per * startIndex, willChange: "transform" });
        onChange?.(startIndex);
        const l = getLenis();
        lastWheelT = performance.now();
        avgMag = 90; // moderate seed so the entry inertia won't read as a spike
        if (l) {
          // SMOOTH freeze: ease the section flush into the viewport (no hard
          // snap), then stop + accept input — so it never feels like a "lock".
          l.scrollTo(absTop(), { duration: 0.45, lock: true, force: true });
          stepFloor = performance.now() + 520; // cover the settle + entry inertia
          clearTimeout(settleTimer);
          settleTimer = setTimeout(() => {
            getLenis()?.stop();
            observer.enable();
            transitioning = false; // page 1 fully on screen → accept input
          }, 460);
        } else {
          window.scrollTo({ top: absTop(), behavior: "smooth" });
          stepFloor = performance.now() + ENTRY_ABSORB;
          observer.enable();
          transitioning = false;
        }
      };

      const release = (direction: 1 | -1) => {
        if (!active) return;
        active = false;
        clearTimeout(settleTimer);
        observer.disable();
        gsap.set(track, { willChange: "auto" });
        guardUntil = performance.now() + 1000;
        const l = getLenis();
        l?.start();
        const top = absTop();
        const target =
          direction === 1
            ? top + section.offsetHeight + 2
            : Math.max(0, top - window.innerHeight * 0.5);
        if (l) l.scrollTo(target, { duration: 0.6, force: true });
        else window.scrollTo({ top: target, behavior: "smooth" });
      };

      const doStep = (direction: 1 | -1) => {
        if (direction === 1) index < steps ? goto(index + 1) : release(1);
        else index > 0 ? goto(index - 1) : release(-1);
      };
      // Discrete inputs (touch swipe, arrow key) — one event = one intent.
      const commit = (direction: 1 | -1) => {
        if (!active || transitioning) return;
        const now = performance.now();
        if (now < stepFloor) return;
        stepFloor = now + 360;
        doStep(direction);
      };

      const observer = Observer.create({
        type: "touch",
        tolerance: 10,
        preventDefault: true,
        onUp: () => commit(1),
        onDown: () => commit(-1),
      });
      observer.disable();

      // Wheel — velocity gated: leading edge of a fresh motion, or a re-flick
      // spike. The inertia tail in between is absorbed (no skipping).
      const onWheel = (e: WheelEvent) => {
        if (!active) return;
        e.preventDefault();
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // ignore horizontal
        const now = performance.now();
        const mag = Math.abs(e.deltaY);
        const gap = now - lastWheelT;
        lastWheelT = now;
        const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
        const afterIdle = gap > IDLE_GAP;
        const spike = mag > avgMag * SPIKE_RATIO && mag > SPIKE_MIN;
        avgMag = afterIdle ? mag : avgMag * 0.8 + mag * 0.2;
        if (transitioning) return; // page still arriving → block (timing tracked above)
        if ((afterIdle || spike) && now >= stepFloor) {
          stepFloor = now + REARM;
          doStep(dir);
        }
      };
      window.addEventListener("wheel", onWheel, { passive: false });

      const onScroll = () => {
        const cur = scrollY();
        const goingDown = cur > lastScroll + 0.5;
        const goingUp = cur < lastScroll - 0.5;
        lastScroll = cur;
        const top = section.getBoundingClientRect().top;
        if (!active && performance.now() >= guardUntil) {
          if (goingDown && prevTop > 0 && top <= 0) engage(0);
          else if (goingUp && prevTop < 0 && top >= 0) engage(steps);
        }
        prevTop = top;
      };
      lastScroll = scrollY();
      prevTop = section.getBoundingClientRect().top;
      window.addEventListener("scroll", onScroll, { passive: true });

      const onKey = (e: KeyboardEvent) => {
        if (!active) return;
        const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const forward = ["ArrowDown", "PageDown", "End", " "].includes(e.key);
        commit(forward ? 1 : -1);
      };
      window.addEventListener("keydown", onKey);

      return () => {
        clearTimeout(settleTimer);
        observer.kill();
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("keydown", onKey);
        getLenis()?.start();
        gsap.set(track, { xPercent: 0, willChange: "auto" });
      };
    }

    /* ──────────────────────── SCRUB MODE (default) ──────────────────────── */
    const endXPercent = -(100 * steps) / slideCount;
    let lastIndex = -1;
    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: endXPercent,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + window.innerHeight * steps * endScale,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / steps,
            duration: { min: 0.5, max: 0.9 },
            delay: 0.06,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const index = Math.round(self.progress * steps);
            if (index !== lastIndex) {
              lastIndex = index;
              onChange?.(index);
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [enabled, slideCount, sectionRef, trackRef, onChange, mode, endScale]);
}
