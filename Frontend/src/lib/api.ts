import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestInit_ = Omit<RequestInit, "body"> & { body?: unknown };

async function request<T>(path: string, init: RequestInit_ = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${env.VITE_API_URL}${path}`;

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new ApiError(res.status, payload.code ?? "UNKNOWN", payload.message ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: "PATCH", body }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
