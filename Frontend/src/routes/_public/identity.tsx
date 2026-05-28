import { useState, useEffect, useRef } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { viewportOnce, viewportOnceEarly, ease, useIsMobile } from "@/design-system";
import { BrandNarrative } from "@/components/BrandNarrative";

export const Route = createFileRoute("/_public/identity")({
  component: IdentityRoute,
});

function IdentityRoute() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative w-full bg-[#FAF7F3] min-h-screen">
      <BrandNarrative />
    </main>
  );
}
