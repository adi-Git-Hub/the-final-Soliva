import { Link, createFileRoute } from "@tanstack/react-router";

import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordRoute,
});

function ForgotPasswordRoute() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter the email tied to your account and we'll send a reset link.
        </p>
      </header>

      <ForgotPasswordForm />

      <p className="text-center text-xs">
        <Link to="/login" className="text-muted-foreground hover:text-foreground">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
