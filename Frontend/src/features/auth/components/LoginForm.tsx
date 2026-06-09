import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "../api";
import { loginSchema, type LoginInput } from "../schema";
import { GoogleAuthButton } from "./GoogleAuthButton";

type Props = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: Props) {
  const navigate = useNavigate();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
      toast.success("Welcome back");
      navigate({ to: redirectTo ?? "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not sign in");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Google sign-in */}
      <GoogleAuthButton redirectTo={redirectTo ?? "/"} />

      {/* Divider */}
      <div className="flex items-center gap-3 py-0.5">
        <span className="h-px flex-1 bg-[#E8D7C8]" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-[#3a2a22]/45">
          Or continue with
        </span>
        <span className="h-px flex-1 bg-[#E8D7C8]" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
