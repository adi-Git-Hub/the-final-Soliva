/**
 * SolivaLogo — single brand-mark component, two variants.
 *
 *   <SolivaLogo height={80} />                       Primary wordmark (default)
 *   <SolivaLogo variant="icon" size={48} />          Icon / symbol mark
 *
 * Variants
 *   primary  → "soliva logo_high resolution.png"     Used in: navbar, footer,
 *                                                    hero branding, mobile menu,
 *                                                    FinalCTA central mark, auth.
 *   icon     → "soliva details (18 x 24 in).png"     Used in: loaders, watermarks,
 *                                                    floating micro-marks, favicon.
 *
 * Filenames are preserved as-is per the brand's source-of-truth — URL-encoded
 * via encodeURIComponent() so spaces and parens resolve correctly.
 */

const PRIMARY_SRC = "/" + encodeURIComponent("soliva logo_high resolution.webp");
const ICON_SRC = "/" + encodeURIComponent("soliva details (18 x 24 in).webp");

type LogoVariant = "primary" | "icon";

interface SolivaLogoProps {
  /** Square dimension (used when `height` is not provided) */
  size?: number;
  /** Pixel or CSS height; width auto-derives from intrinsic aspect */
  height?: number | string;
  /** Pick the brand mark variant */
  variant?: LogoVariant;
  /** Browser load priority — navbar should be eager; everything else lazy */
  loading?: "eager" | "lazy";
  /** Decode hint for the browser */
  decoding?: "auto" | "sync" | "async";
  /** Optional className for the wrapping span */
  className?: string;
  /** Override the default alt text */
  alt?: string;
}

export function SolivaLogo({
  size = 32,
  height,
  variant = "primary",
  loading = "lazy",
  decoding = "async",
  className = "",
  alt,
}: SolivaLogoProps) {
  const finalHeight = height ?? size;
  const finalWidth = height ? "auto" : size;

  const src = variant === "icon" ? ICON_SRC : PRIMARY_SRC;
  const altText = alt ?? (variant === "icon" ? "Soliva Brand Icon" : "Soliva Logo");

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: finalWidth,
        height: finalHeight,
      }}
    >
      <img
        src={src}
        alt={altText}
        loading={loading}
        decoding={decoding}
        draggable={false}
        className="h-full w-full object-contain select-none"
        style={{
          filter: "drop-shadow(0 4px 10px rgba(180,120,40,0.15))",
        }}
      />
    </span>
  );
}
