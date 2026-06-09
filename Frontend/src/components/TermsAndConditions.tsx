import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * Reusable Terms & Conditions block.
 *
 * Renders a compact 4-line summary (fits inside any footer — no extra screen)
 * plus a trigger that opens the FULL terms in a scrollable modal. Used in the
 * home About footer (dark), the checkout summary, and the product page.
 *
 * `variant` adapts the inline summary colours to dark vs light surfaces.
 */
export function TermsAndConditions({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const summaryColor = variant === "dark" ? "text-white/45" : "text-ink-muted";
  const linkColor =
    variant === "dark"
      ? "text-[#d9b27a] hover:text-white"
      : "text-[#c76600] hover:text-[#a3530a]";

  return (
    <div className={`text-[11px] leading-relaxed ${summaryColor} ${className}`}>
      <p>
        By using Soliva you agree to our Terms &amp; Conditions. Free shipping across India with
        delivery in 5–7 business days. Returns accepted within 5–7 days on unused items in original
        packaging. Prices are in INR (GST included); all designs &amp; content remain © Soliva.
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className={`mt-1 font-mono text-[10px] tracking-[0.18em] uppercase font-bold underline underline-offset-4 transition-colors ${linkColor}`}
          >
            Read full Terms &amp; Conditions
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto bg-[#FAF7F3] text-[#3a2a22]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-tight">
              Soliva — Terms &amp; Conditions
            </DialogTitle>
            <DialogDescription className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Last Updated: June 2026
            </DialogDescription>
          </DialogHeader>
          <TermsBody />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Full legal copy (verbatim) ─────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h3 className="font-display text-base font-semibold tracking-tight text-[#3a2a22]">{title}</h3>
      <div className="mt-1.5 space-y-2 text-[13px] font-light leading-relaxed text-[#5a4a40]">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-1 space-y-1">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#c76600]/70" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function TermsBody() {
  return (
    <div className="pt-1 text-[#5a4a40]">
      <p className="text-[13px] font-light leading-relaxed">
        Welcome to Soliva. By accessing our website, placing an order, or using any Soliva services,
        you agree to the following Terms &amp; Conditions.
      </p>

      <Section title="1. Product Information">
        <p>
          We strive to ensure all product descriptions, specifications, images, and pricing are
          accurate. However, minor variations in color, appearance, or presentation may occur due to
          screen settings, photography, or manufacturing updates.
        </p>
      </Section>

      <Section title="2. Pricing">
        <p>All prices displayed on the website are in Indian Rupees (INR).</p>
        <Bullets
          items={[
            "GST is included where applicable.",
            "Promotional pricing may change without prior notice.",
            "Soliva reserves the right to correct pricing errors at any time.",
          ]}
        />
      </Section>

      <Section title="3. Orders">
        <p>Placing an order does not guarantee acceptance. Soliva reserves the right to:</p>
        <Bullets
          items={[
            "Accept or reject orders.",
            "Cancel suspected fraudulent transactions.",
            "Limit quantities purchased.",
          ]}
        />
        <p>Customers will be notified if an order cannot be fulfilled.</p>
      </Section>

      <Section title="4. Shipping">
        <Bullets
          items={[
            "Free Shipping Across India.",
            "Orders are typically delivered within 5–7 business days.",
            "Delivery timelines may vary due to location, weather conditions, public holidays, or courier delays.",
          ]}
        />
      </Section>

      <Section title="5. Return Policy">
        <p>Customers may request a return within 5–7 days of delivery. Return eligibility:</p>
        <Bullets
          items={[
            "Product must be unused.",
            "Product must be in original condition.",
            "Original packaging must be available.",
            "Proof of purchase may be required.",
          ]}
        />
        <p>Returns may be rejected if products show signs of use, damage, or alteration.</p>
      </Section>

      <Section title="6. Refunds">
        <p>Approved refunds will be processed to the original payment method.</p>
        <p>
          Processing times may vary depending on the payment provider and banking institution.
        </p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>All content including:</p>
        <Bullets items={["Logos", "Designs", "Images", "Product names", "Website content"]} />
        <p>
          remain the intellectual property of Soliva and may not be copied, reproduced, or
          distributed without permission.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          Soliva shall not be liable for indirect, incidental, or consequential damages arising from
          the use of its products or website.
        </p>
      </Section>

      <Section title="9. Changes to Terms">
        <p>
          Soliva reserves the right to update these Terms &amp; Conditions at any time without prior
          notice. Continued use of the website constitutes acceptance of any updated terms.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          For any questions regarding these Terms &amp; Conditions, please contact Soliva Customer
          Support.
        </p>
      </Section>
    </div>
  );
}
