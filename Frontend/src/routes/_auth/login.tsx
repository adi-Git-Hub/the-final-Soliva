import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LoginForm } from "@/features/auth/components/LoginForm";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (s) => searchSchema.parse(s),
  component: LoginRoute,
});

function LoginRoute() {
  const { redirect } = Route.useSearch();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">Sign in</h1>
        <p className="text-sm text-muted-foreground">Welcome back. Continue your ritual.</p>
      </header>

      <LoginForm redirectTo={redirect} />

      <div className="flex items-center justify-between text-xs">
        <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground">
          Forgot password?
        </Link>
        <Link to="/register" className="text-muted-foreground hover:text-foreground">
          Create account
        </Link>
      </div>
    </div>
  );
}
