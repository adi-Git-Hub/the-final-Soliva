import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPassword } from "../api";
import { resetPasswordSchema, type ResetPasswordInput } from "../schema";

type Props = {
  email: string;
};

export function ResetPasswordForm({ email }: Props) {
  const navigate = useNavigate();
  const reset = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await reset.mutateAsync({ ...values, email });
      toast.success("Password updated — you're signed in");
      // Backend returns a sendToken response → cookie is set, session invalidated.
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reset password");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="otp">6-digit code</Label>
        <Input
          id="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          {...register("otp")}
        />
        {errors.otp && <p className="text-xs text-destructive">{errors.otp.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm">Confirm password</Label>
        <Input id="confirm" type="password" autoComplete="new-password" {...register("confirm")} />
        {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
