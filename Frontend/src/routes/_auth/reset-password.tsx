import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

// Backend's reset-password flow is OTP-based, not token-based:
//   /forgot-password (email) → server emails 6-digit OTP
//   /reset-password  (email + otp + new password) → backend signs the user in
const searchSchema = z.object({
  email: z.string().email().optional(),
});

export const Route = createFileRoute("/_auth/reset-password")({
  validateSearch: (s) => searchSchema.parse(s),
  component: ResetPasswordRoute,
});

function ResetPasswordRoute() {
  const { email } = Route.useSearch();

  if (!email) {
    return (
      <div className="space-y-3 rounded-xl border border-border/40 bg-card/40 p-4 text-sm text-muted-foreground">
        <p>
          This page needs the email you requested the code for. Start from{" "}
          <Link to="/forgot-password" className="text-foreground hover:underline">
            forgot password
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-foreground">New password</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to <span className="text-foreground">{email}</span> and choose
          a new password (8+ chars with a letter, number, and special character).
        </p>
      </header>

      <ResetPasswordForm email={email} />
    </div>
  );
}
