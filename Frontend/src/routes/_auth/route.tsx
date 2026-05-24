import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useSession } from "@/features/auth/hooks/useSession";

// We can't use `beforeLoad` for the redirect anymore: the session is now
// async (React Query → /auth/me) and not available synchronously on the
// server. We do a client-side redirect in AuthLayout instead.
export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect after the session has resolved (Session, not undefined).
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-transparent safe-x">
      <header className="border-b border-border/40 bg-luxury-beige/40 backdrop-blur-subtle">
        <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center px-4 md:px-8">
          <Link to="/" className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
            Soliva
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 safe-bottom">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
