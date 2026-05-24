import { Link, createFileRoute } from "@tanstack/react-router";

import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterRoute,
});

function RegisterRoute() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">Create account</h1>
        <p className="text-sm text-muted-foreground">Start your collection. Just a few details.</p>
      </header>

      <RegisterForm />

      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
