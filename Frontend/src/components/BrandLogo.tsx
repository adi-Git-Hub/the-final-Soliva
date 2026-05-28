import { motion } from "framer-motion";
import { ease, duration as motionDuration } from "@/design-system";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  isScrolled?: boolean;
  className?: string;
}

export function BrandLogo({ isScrolled = false, className }: BrandLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: ease.luxe }}
      className={cn(
        "relative group flex items-center justify-between overflow-hidden transition-all duration-700 ease-in-out",
        "rounded-full border border-white/30 bg-surface-glass-strong backdrop-blur-strong",
        "shadow-card inset-shadow-line cursor-pointer",
        isScrolled ? "h-9 px-4 min-w-[140px]" : "h-11 px-5 min-w-[170px]",
        className,
      )}
    >
      {/* Premium Surface Treatment: Glossy Reflection Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

      {/* Cinematic Shine Sweep */}
      <motion.div
        animate={{
          x: ["-150%", "150%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none"
      />

      {/* Warm Ambient Glow (Hover State) */}
      <motion.div
        className="absolute inset-0 bg-orange-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ filter: "blur(12px)" }}
      />

      {/* Logo Lockup */}
      <div className="relative flex items-center w-full justify-between gap-3">
        {/* LEFT: Animated Soliva "S" mark */}
        <motion.div
          animate={{
            rotateY: [0, 10, 0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex-shrink-0"
        >
          <svg
            viewBox="0 0 28 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "transition-all duration-500 text-orange-glow drop-shadow-glow-soft",
              isScrolled ? "h-5 w-auto" : "h-6 w-auto",
            )}
          >
            <path
              d="M25 11C25 7 21.5 3.5 15 3.5C8.5 3.5 5 7 5 11C5 15 8.5 18 15 20C21.5 22 25 25 25 30C25 36 20 39.5 15 39.5C9 39.5 5 36 5 30H9C9 34 11.5 36 15 36C18.5 36 21 34 21 30C21 26.5 17.5 24 11 22C4.5 20 1 17 1 11C1 5 6 0 15 0C23 0 29 4.5 29 11H25Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        {/* Divider / Spacer - Editorial Horizontal Balance */}
        <div className="h-4 w-px bg-white/20 mx-1" />

        {/* RIGHT: SOLIVA wordmark */}
        <div className="flex-grow flex items-center justify-end">
          <span
            className={cn(
              "font-mono uppercase tracking-[0.25em] text-ink-strong transition-all duration-500 select-none",
              isScrolled ? "text-[10px]" : "text-[12px]",
            )}
          >
            SOLIVA
          </span>
        </div>
      </div>

      {/* Subtle Bottom Highlight (Hairline) */}
      <div className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
    </motion.div>
  );
}
