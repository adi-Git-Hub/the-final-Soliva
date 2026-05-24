import { useEffect, useState } from "react";

import { useBackendStatus } from "@/hooks/use-backend-status";
import { cn } from "@/lib/utils";

// Dev-only dot in the header. Tells you at a glance whether the Fastify
// backend is reachable. Hidden in production builds and during SSR to avoid
// hydration mismatches.
export function ApiStatusDot() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!import.meta.env.DEV) return null;
  if (!mounted) return null;

  return <Inner />;
}

function Inner() {
  const { status, isMock } = useBackendStatus();

  const color =
    status === "up" ? "bg-emerald-500" : status === "checking" ? "bg-amber-400" : "bg-red-500";

  const label =
    status === "up"
      ? `API connected${isMock ? " · mocks ON" : ""}`
      : status === "checking"
        ? "API checking…"
        : `API unreachable${isMock ? " · mocks ON" : ""}`;

  return (
    <div
      className="flex items-center gap-1.5 rounded-full border border-border/40 bg-card/60 px-2.5 py-1 text-micro-md text-muted-foreground"
      title={label}
      aria-label={label}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", color, status === "checking" && "animate-pulse")}
      />
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}
