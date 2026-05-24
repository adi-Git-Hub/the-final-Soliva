/**
 * ImageLoader — drop-in `<img>` replacement that:
 *   1. Reserves layout space (no CLS)
 *   2. Shows a soft cream placeholder while loading
 *   3. Reveals the image with a brief blur-up + fade-in on load
 *
 * The blur-up technique: render the image with a blur filter while the
 * `onLoad` event hasn't fired, then transition to 0 blur + full opacity
 * once the image is fully decoded. Browsers paint progressively, so the
 * blur smoothly "resolves" into the sharp image.
 *
 * Usage:
 *   <ImageLoader
 *     src="/pink.png"
 *     alt="Blush Pink edition"
 *     aspectRatio="4 / 5.2"
 *     className="rounded-panel"
 *   />
 */

import { useState, type ImgHTMLAttributes } from "react";
import { imageLoader, loadingMotion } from "./loading.config";

interface ImageLoaderProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad"> {
  /**
   * CSS aspect-ratio (e.g. "4 / 5.2", "16 / 9", "1 / 1"). Prevents CLS.
   * If omitted, the image's natural aspect after load will determine height.
   */
  aspectRatio?: string;
  /** Override the placeholder background color (defaults to surface-raised) */
  placeholderBg?: string;
  /** Wrapper className — usually for borderRadius / overflow / sizing */
  className?: string;
  /** Optional callback after the image finishes loading + revealing */
  onReveal?: () => void;
}

export function ImageLoader({
  aspectRatio,
  placeholderBg = imageLoader.placeholderBg,
  className,
  onReveal,
  style,
  alt = "",
  ...imgProps
}: ImageLoaderProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        aspectRatio,
        backgroundColor: placeholderBg,
        ...style,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...imgProps}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
          onReveal?.();
        }}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : `blur(${imageLoader.blurPx}px)`,
          transform: loaded ? "scale(1)" : "scale(1.02)",
          transition: `opacity ${imageLoader.revealMs}ms cubic-bezier(${loadingMotion.ease.join(
            ",",
          )}), filter ${imageLoader.revealMs}ms cubic-bezier(${loadingMotion.ease.join(
            ",",
          )}), transform ${imageLoader.revealMs}ms cubic-bezier(${loadingMotion.ease.join(",")})`,
        }}
      />
    </div>
  );
}
