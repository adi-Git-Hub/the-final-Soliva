import { useQuery } from "@tanstack/react-query";

import { authClient, type Session } from "@/lib/auth-client";

/**
 * Query key for the current session. Mutations should invalidate this key
 * after login / register-verification / reset-password / logout.
 */
export const sessionQueryKey = ["auth", "me"] as const;

/**
 * Returns the current session. Three states:
 *   - `undefined` → still loading (first /auth/me roundtrip in flight)
 *   - `null`      → confirmed signed out (server replied 401)
 *   - `Session`   → signed in
 *
 * Consumers that need to distinguish loading from signed-out (e.g. a route
 * guard that redirects on `null` but waits on `undefined`) should compare
 * to `null` explicitly: `if (session === null) navigate(...)`.
 */
export function useSession(): Session | null | undefined {
  // `enabled` keeps this query inert during SSR. The cookie isn't forwarded
  // to the SSR fetch anyway, so attempting it would always return null and
  // burn a network roundtrip per render. Client takes over after hydration.
  const isClient = typeof window !== "undefined";

  const query = useQuery({
    queryKey: sessionQueryKey,
    queryFn: () => authClient.me(),
    enabled: isClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (!isClient) return null;
  if (query.isLoading) return undefined;
  return query.data ?? null;
}
