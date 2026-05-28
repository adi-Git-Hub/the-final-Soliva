import { createFileRoute } from "@tanstack/react-router";

// Public legal page. Linked from the registration form (opens in a new tab so
// users don't lose what they've typed). Content here is a starting structure
// — replace each section's body with the legally-reviewed copy when ready.
export const Route = createFileRoute("/_public/terms")({
  component: TermsRoute,
});

function TermsRoute() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20 md:px-8 md:py-24 safe-x">
      <header className="mb-10 sm:mb-14">
        <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
          <span className="block h-px w-5 sm:w-6 bg-brown/20" />
          <span className="font-mono text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
            Legal
          </span>
        </div>
        <h1
          className="font-display text-brown-deep tracking-tight leading-hero"
          style={{ fontSize: "clamp(2rem, 7vw, 3.5rem)" }}
        >
          Terms &amp; Privacy Policy
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">
          Last updated: <time dateTime="2026-05-23">23 May 2026</time>
        </p>
      </header>

      <section className="space-y-4 sm:space-y-5 mb-12 sm:mb-16">
        <h2 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">
          1. Terms of Service
        </h2>

        <h3 className="font-display text-lg text-foreground mt-6">1.1 Account</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          By creating a Soliva account, you confirm that the information you provide is accurate and
          that you are at least 18 years of age. You're responsible for the activity on your
          account; keep your password private.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">1.2 Orders &amp; Payment</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Orders placed through the storefront are subject to product availability. We reserve the
          right to cancel any order. Payment is processed via Razorpay; we do not store card numbers
          or CVVs on our servers.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">1.3 Returns</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Unopened items in original condition may be returned within 14 days of delivery.
          Hygiene-sealed accessories are non-returnable once opened.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">1.4 Acceptable Use</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          You agree not to use the service to violate any law, infringe the rights of others, or
          attempt to disrupt the service.
        </p>
      </section>

      <section className="space-y-4 sm:space-y-5">
        <h2 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">
          2. Privacy Policy
        </h2>

        <h3 className="font-display text-lg text-foreground mt-6">2.1 What we collect</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Account information (name, email, optional phone), order history, and shipping addresses.
          Technical data such as IP address and device fingerprint is logged for security and abuse
          prevention.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">2.2 How we use it</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          To deliver your orders, send transactional emails (order confirmations, shipping updates,
          OTPs), and improve the product. We do not sell your data.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">2.3 Cookies</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          We set a single HTTP-only session cookie after sign-in. It expires after 30 days or when
          you sign out. No third-party advertising cookies.
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">2.4 Your rights</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          You may request a copy of your data, correct inaccuracies, or delete your account at any
          time by writing to{" "}
          <a
            href="mailto:privacy@solivaguard.com"
            className="text-foreground underline-offset-4 hover:underline"
          >
            privacy@solivaguard.com
          </a>
          .
        </p>

        <h3 className="font-display text-lg text-foreground mt-6">2.5 Contact</h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          Soliva · Delhi, India.{" "}
          <a
            href="mailto:hello@solivaguard.com"
            className="text-foreground underline-offset-4 hover:underline"
          >
            hello@solivaguard.com
          </a>
        </p>
      </section>

      <p className="mt-12 text-xs text-muted-foreground italic">
        This page is a structural draft. Replace each section's copy with your legally-reviewed text
        before launch.
      </p>
    </div>
  );
}
