import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { UrbanStorytelling } from "@/components/UrbanStorytelling";
import { CollectionSection } from "@/components/CollectionSection";
import { CompareSection } from "@/components/CompareSection";
import { VideoSection } from "@/components/VideoSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SOLIVA SUNWRAP — Luxury Sun Protection" },
      {
        name: "description",
        content: "SOLIVA SUNWRAP — A new era of luxury sun protection.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Global Lenis Smooth Scroll on Body (Natural Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Ensure scroll locking is completely disabled
    ScrollTrigger.normalizeScroll(false);

    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Refresh ScrollTrigger after first paint so measurements include final layout.
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-transparent w-full">
        <Hero isRevealed />
        <VideoSection />
        <UrbanStorytelling />
        <CollectionSection />
        <CompareSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
