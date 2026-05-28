/**
 * SkeletonCard — cinematic atmospheric placeholder.
 *
 * Transforms data-fetch states into editorial "preview" surfaces.
 * Eschews utility-grade gray bars for warm, layered neutral tones and
 * high-inertia atmospheric shimmer.
 *
 * Design: Material-aware glass depth and soft highlight falloff.
 * Motion: Inertia-driven shimmer (2.4s cycle) using GPU-accelerated transforms.
 */

import { motion, useReducedMotion } from "framer-motion";
import { skeleton, loadingMotion } from "./loading.config";
import { cn } from "@/lib/utils";

type SkeletonVariant = "product" | "row" | "metric" | "block";

interface SkeletonCardProps {
  variant?: SkeletonVariant;
  className?: string;
  /** Override aspect-ratio (for variant="product" / "block") */
  aspectRatio?: string;
}

const VARIANT_DIMENSIONS: Record<SkeletonVariant, { aspect?: string; minHeight?: string }> = {
  product: { aspect: skeleton.card.aspect }, // 4 / 5.2
  row: { minHeight: "6rem" },
  metric: { aspect: "1 / 1" },
  block: { minHeight: "14rem" },
};

export function SkeletonCard({ variant = "product", className, aspectRatio }: SkeletonCardProps) {
  const dims = VARIANT_DIMENSIONS[variant];
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line-hairline bg-surface-muted",
        "shadow-inner-highlight", // Atmospheric depth layer
        className,
      )}
      style={{
        aspectRatio: aspectRatio ?? dims.aspect,
        minHeight: dims.minHeight,
        borderRadius: skeleton.card.radius,
      }}
      role="status"
      aria-busy="true"
      aria-label="Content arriving..."
    >
      {/* 1. Atmospheric Surface Layer: Warm neutral foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-muted via-surface-raised to-surface-muted opacity-80" />

      {/* 2. Shimmer Drift: Restrained atmospheric highlight sweep */}
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%", skewX: -20 }}
          animate={{ x: "200%" }}
          transition={{
            duration: skeleton.shimmerMs / 1000,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: loadingMotion.ease,
          }}
          className="absolute inset-0 w-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          }}
        />
      )}

      {/* 3. Material Depth: Subtle top highlight (glass edge illusion) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-px w-full bg-white/20 absolute top-0 left-0" />
        <div className="h-full w-px bg-white/10 absolute top-0 left-0" />
      </div>

      {/* 4. Layered Opacity Breathing (Barely Noticeable) */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-surface-raised mix-blend-soft-light"
        />
      )}

      {/* Variant-specific preview structures */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
        {variant === "row" && (
          <div className="flex h-full items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-surface-raised shadow-sm" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-3/5 rounded-full bg-surface-raised opacity-60" />
              <div className="h-2 w-2/5 rounded-full bg-surface-raised opacity-40" />
            </div>
          </div>
        )}

        {(variant === "product" || variant === "block") && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-surface-raised opacity-70" />
              <div className="h-3 w-1/2 rounded-md bg-surface-raised opacity-40" />
            </div>
            {variant === "product" && (
              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-16 rounded-md bg-surface-raised opacity-80" />
                <div className="h-8 w-8 rounded-full bg-surface-raised opacity-60" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Atmospheric Vignette: Focus the internal depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />
    </div>
  );
}
