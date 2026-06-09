import { z } from "zod";

// Resolve the backend API base URL.
//
// Priority:
//   1. Explicit VITE_API_URL from the environment (use this for production /
//      a separate API domain).
//   2. Derived from the current page host in the browser — so the app works
//      whether it's opened via http://localhost:8080, a LAN IP, or the
//      machine's public IP (e.g. a cloud VM at http://178.104.199.229:8080).
//      Calling the SAME host on :5000 avoids the Chrome "private network
//      access" / loopback block you hit when a public-IP page fetches
//      http://localhost:5000.
//   3. localhost fallback for SSR (no window) — the SSR server runs on the
//      same machine as the backend, so localhost is correct there.
function resolveApiUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined;
  if (fromEnv && fromEnv.trim()) return fromEnv.trim();

  if (typeof window !== "undefined" && window.location?.hostname) {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:5000/api/v1`;
  }

  return "http://localhost:5000/api/v1";
}

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_USE_MOCK_API: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

export const env = envSchema.parse({
  VITE_API_URL: resolveApiUrl(),
  VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API,
});

export type Env = z.infer<typeof envSchema>;
