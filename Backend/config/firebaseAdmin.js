const admin = require('firebase-admin');
const logger = require('../utils/logger');

// Firebase Admin — used only to VERIFY the Google ID token the browser sends.
// Credentials come from a service account, supplied via env so nothing secret
// is committed:
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY   (paste with literal \n; we restore real newlines)
//
// The server boots fine WITHOUT these set — Google sign-in is simply disabled
// until they're provided (verifyIdToken then throws a clear 503).

const isConfigured = () =>
  Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );

let initTried = false;

function ensureInit() {
  if (admin.apps.length) return true;
  if (initTried) return admin.apps.length > 0;
  initTried = true;

  if (!isConfigured()) {
    logger.warn(
      '[FIREBASE] Admin not configured (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY missing). Google sign-in is disabled.',
    );
    return false;
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // .env keeps the PEM on one line with escaped newlines — restore them.
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
  logger.info('[FIREBASE] Admin initialized.');
  return true;
}

/**
 * Verify a Google ID token issued to the browser. Resolves with the decoded
 * token ({ uid, email, name, picture, email_verified, ... }).
 * Throws a 503-tagged error when the server isn't configured for Google sign-in.
 */
async function verifyIdToken(idToken) {
  if (!ensureInit()) {
    const err = new Error('Google sign-in is not configured on the server.');
    err.statusCode = 503;
    throw err;
  }
  return admin.auth().verifyIdToken(idToken);
}

module.exports = { verifyIdToken, isConfigured };
