import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:5000/api/v1"),
  VITE_USE_MOCK_API: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API,
});

export type Env = z.infer<typeof envSchema>;
