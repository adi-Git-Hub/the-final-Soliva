import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Camera, Trash2 } from "lucide-react";

import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPendingAvatar } from "@/lib/pending-avatar";
import { useRegister } from "../api";
import { registerSchema, type RegisterInput } from "../schema";
import { GoogleAuthButton } from "./GoogleAuthButton";

export function RegisterForm({ redirectTo = "/" }: { redirectTo?: string }) {
  const navigate = useNavigate();
  const reg = useRegister();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      otpChannel: "email",
      agreeToTerms: false,
    },
  });

  const otpChannel = watch("otpChannel");
  const agreed = watch("agreeToTerms");
  const nameTyped = watch("name");

  // Local-only avatar preview. The file is stashed via setPendingAvatar so
  // /verify-email can upload it after the JWT cookie is set.
  const avatarFileInput = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  function onAvatarPicked(file: File | undefined) {
    if (!file) return;
    if (!/^image\/(jpe?g|png|webp)$/i.test(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be 10 MB or smaller");
      return;
    }
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
  }

  function clearAvatar() {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
    if (avatarFileInput.current) avatarFileInput.current.value = "";
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      const { email } = await reg.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      });
      // Stash the picked avatar so /verify-email can upload it once we have
      // an authenticated session cookie.
      setPendingAvatar(avatarFile);
      toast.success("Check your inbox for a 6-digit verification code");
      navigate({ to: "/verify-email", search: { email } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create account");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Avatar picker — preview only. Upload happens on /verify-email once
          the JWT cookie is set. */}
      <div className="flex items-center gap-4 pb-1">
        <input
          ref={avatarFileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => onAvatarPicked(e.target.files?.[0])}
        />
        <div className="relative">
          <Avatar src={avatarPreview} name={nameTyped || "?"} size={64} />
          <button
            type="button"
            onClick={() => avatarFileInput.current?.click()}
            aria-label="Choose profile photo"
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
          >
            <Camera className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>
            {avatarFile
              ? "Photo will upload after you verify your email."
              : "Add a profile photo (optional) — or we'll use your initials."}
          </p>
          {avatarFile && (
            <button
              type="button"
              onClick={clearAvatar}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Remove
            </button>
          )}
        </div>
      </div>

      {/* Google sign-in — below the photo section, above the form. */}
      <GoogleAuthButton redirectTo={redirectTo} />

      {/* Divider */}
      <div className="flex items-center gap-3 py-0.5">
        <span className="h-px flex-1 bg-[#E8D7C8]" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-[#3a2a22]/45">
          Or continue with
        </span>
        <span className="h-px flex-1 bg-[#E8D7C8]" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" autoComplete="name" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phoneNumber">
          Phone number <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-destructive">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* OTP delivery choice — Email is wired today, Phone is collected for
          when the SMS provider lands. */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Send verification code via
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <label
            className={
              "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors " +
              (otpChannel === "email"
                ? "border-foreground bg-accent/40 text-foreground"
                : "border-border/60 text-muted-foreground hover:border-border")
            }
          >
            <input
              type="radio"
              value="email"
              {...register("otpChannel")}
              className="accent-foreground"
            />
            Email
          </label>
          <label
            title="SMS delivery coming soon — we'll keep the OTP via email for now"
            className="flex cursor-not-allowed items-center gap-2 rounded-md border border-border/40 px-3 py-2 text-sm text-muted-foreground/60 opacity-70"
          >
            <input type="radio" value="phone" disabled className="accent-foreground" />
            Phone
            <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
              Soon
            </span>
          </label>
        </div>
      </fieldset>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
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

      {/* Terms checkbox — required. View link opens the dedicated page in a
          new tab so the user doesn't lose what they've typed. */}
      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id="agreeToTerms"
          checked={!!agreed}
          onCheckedChange={(v) => setValue("agreeToTerms", v === true, { shouldValidate: true })}
          className="mt-0.5"
        />
        <div className="space-y-1">
          <Label htmlFor="agreeToTerms" className="text-xs font-normal leading-snug">
            I agree to the{" "}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Terms &amp; Privacy Policy
            </Link>
            .
          </Label>
          {errors.agreeToTerms && (
            <p className="text-xs text-destructive">{errors.agreeToTerms.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
