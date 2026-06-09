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
      // ── Queued panel navigation (no hard lock) ────────────────────────────
      // There is no "wait after every panel" block. Every scroll / swipe / key
      // adds to a TARGET panel; a pump loop walks the track toward that target
      // ONE panel at a time. Scroll aggressively and the target accumulates far
      // ahead — the queue then plays each intermediate panel back-to-back at a
      // shorter duration, so power users race through the story while still
      // SEEING every panel in order. The track never jumps across panels: each
      // animation moves exactly one panel, and the next starts the instant the
      // previous finishes.
      const PANEL_PX = 120; // accumulated wheel distance that queues one panel
      const DUR_NORMAL = 0.65; // a lone, deliberate step (0.6–0.7s band)
      const ENTRY_ABSORB = 520; // swallow the scroll that carried the user in

      let index = 0; // panel currently shown
      let target = 0; // panel we're heading toward (the queue depth)
      let animating = false; // a single-panel transition is in flight
      let accum = 0; // accumulated wheel delta toward the next panel
      let releaseDir: 0 | 1 | -1 = 0; // pending exit once an edge is reached
      let active = false; // section centred + page scroll frozen
      let guardUntil = 0; // ignore re-engage briefly after releasing
      let stepFloor = 0; // ignore wheel until the entry settle completes
      let lastScroll = 0;
      let prevTop = Infinity;
      let settleTimer: ReturnType<typeof setTimeout> | undefined;

      const scrollY = () =>
        getLenis()?.scroll ?? window.scrollY ?? document.documentElement.scrollTop;
      const absTop = () => section.getBoundingClientRect().top + scrollY();

      // Walk ONE panel toward `target`; when it lands, immediately continue to
      // the next queued panel — or, if an edge was over-scrolled, release.
      const pump = () => {
        if (!active || animating) return;
        if (index === target) {
          if (releaseDir) {
            const d = releaseDir;
            releaseDir = 0;
            release(d);
          }
          return;
        }
        const dir = target > index ? 1 : -1;
        const remaining = Math.abs(target - index);
        // Duration adapts to how much is queued: a single step settles gently
        // (0.65s); a backlog (aggressive scroll) plays fast, deeper = faster,
        // clamped to the 0.25–0.35s band.
        const duration =
          remaining > 1 ? Math.max(0.25, 0.36 - remaining * 0.02) : DUR_NORMAL;
        index += dir;
        animating = true;
        onChange?.(index);
        gsap.to(track, {
          xPercent: -per * index,
          duration,
          ease: remaining > 1 ? "power2.inOut" : "power3.inOut",
          overwrite: true,
          onComplete: () => {
            animating = false;
            pump(); // continue to the next queued panel at once
          },
        });
      };

      // Queue one panel in `dir`. Over-scrolling past an edge arms a release;
      // the move itself is always ±1, so panels are never skipped.
      const requestStep = (dir: 1 | -1) => {
        const next = target + dir;
        if (next < 0) {
          releaseDir = -1;
          pump();
          return;
        }
        if (next > steps) {
          releaseDir = 1;
          pump();
          return;
        }
        releaseDir = 0;
        target = next;
        pump();
      };

      const engage = (startIndex: number) => {
        if (active) return;
        active = true;
        index = startIndex;
        target = startIndex;
        accum = 0;
        releaseDir = 0;
        animating = false;
        // Promote the track to its own GPU layer so the horizontal slide stays
        // buttery (no per-frame re-raster of the panels).
        gsap.set(track, { xPercent: -per * startIndex, willChange: "transform" });
        onChange?.(startIndex);
        const l = getLenis();
        if (l) {
          // SMOOTH freeze: ease the section flush into the viewport, then stop.
          l.scrollTo(absTop(), { duration: 0.45, lock: true, force: true });
          stepFloor = performance.now() + 560; // cover settle + entry inertia
          clearTimeout(settleTimer);
          settleTimer = setTimeout(() => {
            getLenis()?.stop();
            observer.enable();
          }, 460);
        } else {
          window.scrollTo({ top: absTop(), behavior: "smooth" });
          stepFloor = performance.now() + ENTRY_ABSORB;
          observer.enable();
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
        const dest =
          direction === 1
            ? top + section.offsetHeight + 2
            : Math.max(0, top - window.innerHeight * 0.5);
        if (l) l.scrollTo(dest, { duration: 0.6, force: true });
        else window.scrollTo({ top: dest, behavior: "smooth" });
      };

      const observer = Observer.create({
        type: "touch",
        tolerance: 10,
        preventDefault: true,
        onUp: () => active && requestStep(1),
        onDown: () => active && requestStep(-1),
      });
      observer.disable();

      // Wheel — accumulate distance into the target panel. Each PANEL_PX of
      // scroll queues one more panel; aggressive scrolling queues several, which
      // the pump loop then plays through in order (never skipped).
      const onWheel = (e: WheelEvent) => {
        if (!active) return;
        e.preventDefault();
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // ignore horizontal
        if (performance.now() < stepFloor) return; // entry settle window
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
        accum += e.deltaY * unit;
        while (accum >= PANEL_PX) {
          accum -= PANEL_PX;
          requestStep(1);
        }
        while (accum <= -PANEL_PX) {
          accum += PANEL_PX;
          requestStep(-1);
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
        requestStep(forward ? 1 : -1);
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
