// Tiny module-level holder for "the file the user picked during registration
// but hasn't yet been able to upload (since they have no account yet)".
//
// We keep the File in memory (NOT sessionStorage) so we don't have to
// serialize a binary blob. The /verify-email page reads + clears this after a
// successful verification, then posts the file to /users/me/avatar.
//
// Trade-off: if the user closes the tab between register and verify, the
// file is lost. Acceptable — they can upload from the profile page afterward.

let pending: File | null = null;

export function setPendingAvatar(file: File | null) {
  pending = file;
}

export function takePendingAvatar(): File | null {
  const out = pending;
  pending = null;
  return out;
}

export function hasPendingAvatar(): boolean {
  return pending !== null;
}
