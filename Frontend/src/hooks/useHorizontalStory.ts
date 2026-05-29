import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalStoryOptions {
  /** The full-viewport section that should pin while the chapter plays. */
  sectionRef: RefObject<HTMLElement | null>;
  /** The horizontal flex track holding the panels (width = slideCount * 100%). */
  trackRef: RefObject<HTMLDivElement | null>;
  /** Number of story panels in the track. */
  slideCount: number;
  /** Desktop only — pass `!isMobile`. When false the hook is inert. */
  enabled: boolean;
  /** Fired when the dominant panel changes (drives active-slide focus). */
  onChange?: (index: number) => void;
}

/**
 * Pinned horizontal storytelling — smooth, scroll-tied panning.
 *
 * The section pins when it reaches the top of the viewport and the panels pan
 * horizontally as the user scrolls, smoothed by `scrub` for a buttery feel.
 * Scroll snaps gently to one panel at a time so each settles like a chapter, and
 * because the pan is tied to real scroll distance, scrolling past the last panel
 * always releases the section and continues normal vertical scrolling.
 */
export function useHorizontalStory({
  sectionRef,
  trackRef,
  slideCount,
  enabled,
  onChange,
}: HorizontalStoryOptions) {
  useEffect(() => {
    if (!enabled || slideCount < 2) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const steps = slideCount - 1;
    // How far the track travels: last panel sits flush to the viewport.
    const endXPercent = -(100 * steps) / slideCount;
    let lastIndex = -1;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: endXPercent,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // One viewport of scroll budget per panel transition.
          end: () => "+=" + window.innerHeight * steps,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / steps, // settle on each panel
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
  }, [enabled, slideCount, sectionRef, trackRef, onChange]);
}
