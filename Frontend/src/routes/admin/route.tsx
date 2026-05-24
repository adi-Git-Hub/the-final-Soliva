import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "@/features/auth/hooks/useSession";

// Admin route group.
//   - URL-typed access to /admin/* is blocked here.
//   - Real security is on the backend (every /api/v1/admin/* + /admin scoped
//     mutations are gated by isAuthenticatedUser + authorizeRoles('admin')).
//   - This guard is UX: don't render admin UI for non-admins.
export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Session resolved to "definitely signed out" → kick to /login.
    if (session === null) {
      navigate({ to: "/login" });
      return;
    }
    // Signed in but not admin → kick home. No leaked admin URL access.
    if (session && session.user.role !== "admin") {
      navigate({ to: "/" });
    }
  }, [session, navigate]);

  // States that should NOT render admin content:
  //   undefined → /auth/me still in flight (don't flash)
  //   null      → about to redirect to /login
  //   user      → about to redirect to /
  if (!session) {
    return <CheckingFrame label="Checking permissions…" />;
  }
  if (session.user.role !== "admin") {
    return <CheckingFrame label="Redirecting…" />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function CheckingFrame({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
