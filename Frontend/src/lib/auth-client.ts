// Real auth client backed by the Soliva backend.
// Backend issues an httpOnly JWT cookie; lib/api.ts already sends
// `credentials: "include"` so every call carries the cookie automatically.
//
// Response shapes from the backend are not uniform:
//   sendToken     → { success, token, user }              (login, verify-email, reset-password)
//   sendResponse  → { success, message, data: { ... } }   (everything else, including /auth/me)
// We unwrap per-endpoint here so callers see a clean User/Session.

import { z } from "zod";

import { api, ApiError } from "./api";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["user", "admin"]),
  isVerified: z.boolean().optional(),
  username: z.string().optional(),
  // Public URL of the uploaded avatar, or null when the user hasn't uploaded
  // one. The frontend Avatar component shows an initials fallback in that case.
  avatarUrl: z.string().nullable().optional(),
});
export type User = z.infer<typeof userSchema>;

// We keep the `Session` type for backwards compatibility with components that
// read `session.user.name`. The cookie holds the actual session — the client
// never sees a token string.
export const sessionSchema = z.object({
  user: userSchema,
});
export type Session = z.infer<typeof sessionSchema>;

// Backend returns Mongo `_id`; map to a stable string `id` and validate shape.
function normalizeUser(raw: unknown): User {
  const r = raw as Record<string, unknown>;
  return userSchema.parse({
    id: String(r._id ?? r.id ?? ""),
    email: r.email,
    name: r.name,
    role: r.role,
    isVerified: r.isVerified,
    username: r.username,
    avatarUrl: (r.avatarUrl as string | null | undefined) ?? null,
  });
}

type SendTokenResponse = { success: boolean; token?: string; user: unknown };
type EnvelopedResponse<T> = { success: boolean; message?: string; data: T };

export const authClient = {
  /** Returns the current session, or null if not signed in / cookie expired. */
  async me(): Promise<Session | null> {
    try {
      const res = await api.get<EnvelopedResponse<{ user: unknown }>>("/auth/me");
      return { user: normalizeUser(res.data.user) };
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return null;
      throw err;
    }
  },

  async login(input: { email: string; password: string }): Promise<Session> {
    const res = await api.post<SendTokenResponse>("/auth/login", input);
    return { user: normalizeUser(res.user) };
  },

  /** Returns the email the OTP was sent to. No session is created yet. */
  async register(input: {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }): Promise<{ email: string }> {
    // Strip empty-string phone (backend treats undefined / absent as "no phone")
    const payload: Record<string, unknown> = {
      name: input.name,
      email: input.email,
      password: input.password,
    };
    if (input.phoneNumber && input.phoneNumber.trim()) {
      payload.phoneNumber = input.phoneNumber.trim();
    }
    await api.post<EnvelopedResponse<unknown>>("/auth/register", payload);
    return { email: input.email };
  },

  /** Verifies the registration OTP; backend issues the JWT cookie on success. */
  async verifyEmail(input: { email: string; otp: string }): Promise<Session> {
    const res = await api.post<SendTokenResponse>("/auth/verify-email", input);
    return { user: normalizeUser(res.user) };
  },

  async resendOtp(email: string): Promise<void> {
    await api.post<EnvelopedResponse<unknown>>("/auth/resend-otp", { email });
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post<EnvelopedResponse<unknown>>("/auth/forgot-password", { email });
  },

  async verifyForgotOtp(input: { email: string; otp: string }): Promise<void> {
    await api.post<EnvelopedResponse<unknown>>("/auth/verify-forgot-otp", input);
  },

  /** Resets password and signs the user in (backend issues JWT cookie). */
  async resetPassword(input: { email: string; otp: string; password: string }): Promise<Session> {
    const res = await api.post<SendTokenResponse>("/auth/reset-password", input);
    return { user: normalizeUser(res.user) };
  },

  async logout(): Promise<void> {
    await api.get<EnvelopedResponse<unknown>>("/auth/logout");
  },
};
