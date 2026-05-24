import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "../api";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../schema";

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const forgot = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await forgot.mutateAsync(values);
      toast.success("If an account exists, a 6-digit reset code is on its way");
      // Pre-fill email on the OTP / new-password page.
      navigate({ to: "/reset-password", search: { email: values.email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset code");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send reset code"}
      </Button>
    </form>
  );
}
