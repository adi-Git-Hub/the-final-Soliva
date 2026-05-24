const nodemailer = require('nodemailer');
const logger = require('./logger');

// Env names match Backend/.env.example:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
// Legacy names (SMTP_EMAIL / SMTP_PASSWORD / FROM_NAME) are still accepted
// as a fallback so older .env files keep working.

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const portStr = process.env.SMTP_PORT;

  if (!host) {
    throw new Error(
      'SMTP_HOST is not set. Configure SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS in Backend/.env. ' +
      'For local dev, run Mailpit (docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit) ' +
      'and set SMTP_HOST=localhost, SMTP_PORT=1025 (no user/pass).'
    );
  }

  const port = Number(portStr) || 587;
  // 465 uses implicit TLS; 587 / 25 / 1025 use STARTTLS (or plain in dev).
  const secure = port === 465;

  const user = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  const transportOpts = {
    host,
    port,
    secure,
    // Short timeouts so a misconfigured / blocked SMTP host fails fast
    // (default Nodemailer timeouts can hang an API request for minutes).
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  };
  if (user && pass) {
    transportOpts.auth = { user, pass };
  }

  return nodemailer.createTransport(transportOpts);
}

function buildFrom() {
  // Prefer SMTP_FROM ("Name <addr>") verbatim. Fall back to a Name+addr build.
  if (process.env.SMTP_FROM) return process.env.SMTP_FROM;
  const name = process.env.FROM_NAME || 'Soliva';
  const addr =
    process.env.SMTP_USER ||
    process.env.SMTP_EMAIL ||
    'no-reply@soliva.example';
  return `${name} <${addr}>`;
}

const sendEmail = async (options) => {
  const transporter = buildTransport();

  const message = {
    from: buildFrom(),
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  logger.info(`[EMAIL] Sent to ${options.email} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} (messageId=${info.messageId})`);
  return info;
};

module.exports = sendEmail;