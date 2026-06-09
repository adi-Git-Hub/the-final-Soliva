import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  type Auth,
} from "firebase/auth";

// Firebase web config — supplied via Vite env (all VITE_ vars are public client
// identifiers, NOT secrets). Set these in Frontend/.env:
//   VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
//   VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID,
//   VITE_FIREBASE_APP_ID, VITE_FIREBASE_MEASUREMENT_ID
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

/** True only when the real Firebase keys are present. Drives graceful fallback. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

// Startup diagnostics (dev only) — prints exactly what Vite loaded so a missing
// or misnamed VITE_FIREBASE_* var is obvious at a glance.
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log("[firebase] startup env check", {
    VITE_FIREBASE_API_KEY: firebaseConfig.apiKey
      ? `set (len ${firebaseConfig.apiKey.length})`
      : `MISSING (${JSON.stringify(firebaseConfig.apiKey)})`,
    VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain ?? "MISSING",
    VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId ?? "MISSING",
    VITE_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket ?? "MISSING",
    VITE_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId ?? "MISSING",
    VITE_FIREBASE_APP_ID: firebaseConfig.appId ?? "MISSING",
    VITE_FIREBASE_MEASUREMENT_ID: firebaseConfig.measurementId ?? "MISSING",
    isFirebaseConfigured,
  });
}

let cachedAuth: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig as Record<string, string>);
}

function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Google sign-in isn't configured yet. Add your Firebase keys to Frontend/.env.",
    );
  }
  if (!cachedAuth) {
    cachedAuth = getAuth(getFirebaseApp());
    // Auth-state persistence + session restore on refresh: keep the Firebase
    // session in localStorage so it survives reloads and new tabs. (The Soliva
    // backend httpOnly cookie remains the app's source of truth — this just
    // keeps the Firebase client consistent so re-auth is seamless.)
    setPersistence(cachedAuth, browserLocalPersistence).catch(() => {
      /* non-fatal: falls back to in-memory persistence */
    });
  }
  return cachedAuth;
}

/**
 * Open the Google sign-in popup and return the Firebase ID token, which the
 * backend (`POST /auth/google`) verifies before issuing a Soliva session.
 * Throws on cancel/closed-popup so callers can ignore those quietly.
 */
export async function signInWithGooglePopup(): Promise<string> {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  // Always let the user pick an account instead of silently reusing one.
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(auth, provider);
  return result.user.getIdToken();
}

/**
 * Clear the Firebase client session. Called alongside the backend logout so a
 * Google user is fully signed out (no lingering Firebase session). Best-effort
 * and safe to call when Firebase isn't configured.
 */
export async function signOutFirebase(): Promise<void> {
  if (!isFirebaseConfigured) return;
  try {
    await signOut(getFirebaseAuth());
  } catch {
    /* ignore — the backend cookie clear is the source of truth */
  }
}
