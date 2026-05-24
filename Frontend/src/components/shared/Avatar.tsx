import { useState } from "react";

import { cn } from "@/lib/utils";

// Deterministic palette — same seed always gives the same color so a user's
// fallback avatar is stable across sessions. Picked from the Soliva-adjacent
// warm palette so it feels on-brand.
const PALETTE = [
  { bg: "bg-orange-glow/15", fg: "text-orange-glow", ring: "border-orange-glow/40" },
  { bg: "bg-brown-deep/10", fg: "text-brown-deep", ring: "border-brown-deep/30" },
  { bg: "bg-emerald-500/10", fg: "text-emerald-700", ring: "border-emerald-500/30" },
  { bg: "bg-rose-500/10", fg: "text-rose-700", ring: "border-rose-500/30" },
  { bg: "bg-sky-500/10", fg: "text-sky-700", ring: "border-sky-500/30" },
  { bg: "bg-amber-500/10", fg: "text-amber-700", ring: "border-amber-500/30" },
  { bg: "bg-violet-500/10", fg: "text-violet-700", ring: "border-violet-500/30" },
  { bg: "bg-teal-500/10", fg: "text-teal-700", ring: "border-teal-500/30" },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function paletteFor(seed: string) {
  return PALETTE[hashString(seed || "?") % PALETTE.length];
}

export function initialsFromName(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return (
    parts
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "?"
  );
}

type Props = {
  /** Image URL — if missing/broken, falls back to initials */
  src?: string | null;
  /** Used for the initials AND the deterministic color */
  name?: string | null;
  /** Pixel size of the square */
  size?: number;
  /** Optional extra classes (e.g. ring, shadow) */
  className?: string;
  /** Show a thin border ring (matches navbar style) */
  ring?: boolean;
};

/**
 * Single source of truth for user avatars across the app.
 *
 *   <Avatar src={user.avatarUrl} name={user.name} size={40} />
 *
 * If `src` is missing OR the image 404s at runtime, we render the user's
 * initials on a per-user deterministic color background.
 */
export function Avatar({ src, name, size = 40, className, ring = true }: Props) {
  const palette = paletteFor(name || "?");
  const initials = initialsFromName(name);
  const [imgFailed, setImgFailed] = useState(false);

  const showImage = Boolean(src) && !imgFailed;
  const style = { width: size, height: size };

  if (showImage) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-full bg-cream select-none",
          ring && `border ${palette.ring}`,
          className,
        )}
        style={style}
      >
        <img
          src={src!}
          alt={name || "User"}
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-black uppercase tracking-wide select-none",
        palette.bg,
        palette.fg,
        ring && `border ${palette.ring}`,
        className,
      )}
      style={{
        ...style,
        fontSize: Math.max(10, Math.round(size / 2.6)),
      }}
    >
      {initials}
    </span>
  );
}
