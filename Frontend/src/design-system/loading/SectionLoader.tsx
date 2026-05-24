/**
 * SectionLoader — calm editorial placeholder for sections that lazy-load
 * (heavy GSAP timelines, video sections, large product grids).
 *
 * The placeholder reserves height (preventing CLS) and provides a soft
 * atmospheric panel so the page composition stays coherent until the real
 * section mounts. Once mounted, the actual section fades in over it via
 * Framer's exit transition.
 *
 * Usage:
 *   const SomeHeavySection = React.lazy(() => import("./SomeHeavySection"));
 *
 *   <Suspense fallback={<SectionLoader />}>
 *     <SomeHeavySection />
 *   </Suspense>
 *
 * Or as a direct render guard:
 *   {isReady ? <Section /> : <SectionLoader />}
 */

import { motion } from "framer-motion";
import { sectionLoader, loadingMotion } from "./loading.config";

interface SectionLoaderProps {
  /** Override min-height (defaults to `sectionLoader.minHeight` = 60vh) */
  minHeight?: string;
  /** Optional eyebrow text to communicate intent */
  label?: string;
  className?: string;
}

export function SectionLoader({
  minHeight = sectionLoader.minHeight,
  label,
  className,
}: SectionLoaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: sectionLoader.enterMs / 1000,
        ease: loadingMotion.ease,
      }}
      className={`relative w-full overflow-hidden bg-luxury-beige/60 flex items-center justify-center ${className ?? ""}`}
      style={{ minHeight }}
      role="status"
      aria-busy="true"
      aria-label={label ?? "Loading section"}
    >
      {/* Atmospheric backdrop — single soft radial, no motion */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,13,0.04),transparent_70%)]" />
      </div>

      {/* Editorial eyebrow — quiet "loading" signal in the brand voice */}
      {label && (
        <div className="relative z-10 flex items-center gap-4">
          <span className="block h-px w-10 bg-brown/20" />
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-ink-faint">
            {label}
          </span>
          <span className="block h-px w-10 bg-brown/20" />
        </div>
      )}
    </motion.section>
  );
}
