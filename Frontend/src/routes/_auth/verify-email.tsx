import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResendOtp, useVerifyEmail } from "@/features/auth/api";
import { verifyEmailSchema, type VerifyEmailInput } from "@/features/auth/schema";
import { useUpdateAvatar } from "@/features/user/api";
import { takePendingAvatar } from "@/lib/pending-avatar";

const searchSchema = z.object({
  email: z.string().email().optional(),
});

export const Route = createFileRoute("/_auth/verify-email")({
  validateSearch: (s) => searchSchema.parse(s),
  component: VerifyEmailRoute,
});

function VerifyEmailRoute() {
  const { email } = Route.useSearch();
  const navigate = useNavigate();
  const verify = useVerifyEmail();
  const resend = useResendOtp();
  const updateAvatar = useUpdateAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
  });

  if (!email) {
    return (
      <div className="space-y-3 text-center">
        <h1 className="font-display text-3xl text-foreground">Verify email</h1>
        <p className="text-sm text-muted-foreground">
          Start from <Link to="/register" className="text-foreground hover:underline">create an
          account</Link> or <Link to="/login" className="text-foreground hover:underline">sign in</Link>.
        </p>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      await verify.mutateAsync({ email, otp: values.otp });
      toast.success("Email verified — you're signed in");

      // If the user picked an avatar back on /register, upload it now that
      // the JWT cookie is set. Fail silently — they can always re-upload
      // from the profile page.
      const pendingFile = takePendingAvatar();
      if (pendingFile) {
        try {
          await updateAvatar.mutateAsync(pendingFile);
        } catch {
          toast.message("Profile photo couldn't be uploaded — try again from Profile.");
        }
      }

      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid or expired code");
    }
  });

  const onResend = async () => {
    try {
      await resend.mutateAsync(email);
      toast.success("New code sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resend code");
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-3xl text-foreground">Verify email</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to <span className="text-foreground">{email}</span>.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            {...register("otp")}
          />
          {errors.otp && <p className="text-xs text-destructive">{errors.otp.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Verifying…" : "Verify email"}
        </Button>
      </form>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={onResend}
          disabled={resend.isPending}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          {resend.isPending ? "Sending…" : "Resend code"}
        </button>
        <Link to="/login" className="text-muted-foreground hover:text-foreground">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
