import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { useCheckoutStore } from "@/features/checkout/store";
import { ease } from "@/design-system";

export const Route = createFileRoute("/_public/order-confirmed")({
  component: OrderConfirmedRoute,
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.luxe } },
};

function OrderConfirmedRoute() {
  const navigate = useNavigate();
  const { confirmedOrder, clearConfirmed } = useCheckoutStore();

  function handleExplore() {
    clearConfirmed();
    navigate({ to: "/collection" });
  }

  return (
    <div className="relative min-h-screen w-full bg-luxury-beige/60 overflow-hidden safe-x">
      {/* Atmospheric layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_20%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_70%_10%,rgba(252,231,243,0.45),transparent_55%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_60%_80%,rgba(243,236,226,0.7),transparent_50%)] opacity-60" />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(245,130,13,0.04),transparent_70%)]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(252,231,243,0.3),transparent_70%)]"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[15%] left-[40%] w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(243,236,226,0.5),transparent_70%)]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24 sm:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg flex flex-col items-center text-center"
        >
          {/* Animated checkmark */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: ease.luxe }}
                className="w-20 h-20 rounded-full bg-white/60 border border-white/80 backdrop-blur-sm shadow-[0_8px_32px_-8px_rgba(245,130,13,0.15)] flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: ease.luxe }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-glow/15 to-orange-glow/25 flex items-center justify-center"
                >
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-orange-glow"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-orange-glow/20"
              />
            </div>
          </motion.div>

          {/* Section label */}
          <motion.div variants={fadeUp} className="mb-5">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-brown/15" />
              <span className="font-mono text-micro-sm tracking-editorial text-orange-glow uppercase font-bold">
                Payment Successful
              </span>
              <div className="h-px w-8 bg-brown/15" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-brown-deep tracking-tight leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
          >
            Thank You For Your Purchase.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-ink-muted text-sm sm:text-base font-light leading-relaxed max-w-md mb-10"
          >
            Your payment has been successfully processed and your order is now confirmed. We're
            preparing it with care.
          </motion.p>

          {/* Order details — shown when available, page works without it */}
          {confirmedOrder && (
            <motion.div
              variants={fadeUp}
              className="w-full rounded-3xl bg-white/50 border border-white/70 backdrop-blur-sm shadow-[0_8px_40px_-12px_rgba(58,42,34,0.08)] p-6 sm:p-8 mb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-micro-xs tracking-eyebrow text-ink-muted uppercase font-bold">
                  Order #{confirmedOrder.orderId.slice(-8).toUpperCase()}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-glow/8 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-glow" />
                  <span className="font-mono text-micro-xs tracking-cta text-orange-glow uppercase font-bold">
                    Confirmed
                  </span>
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {confirmedOrder.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#F0F4FF] via-[#DBEAFE] to-[#BFDBFE] border border-line-soft">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm text-brown-deep font-medium truncate">{item.name}</p>
                      <p className="text-micro-xs text-ink-muted/60 font-mono">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-brown-deep">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-line-soft to-transparent mb-5" />

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-muted font-light">Total Paid</span>
                <span className="font-display text-2xl text-brown-deep tracking-tight">
                  ₹{confirmedOrder.total.toLocaleString("en-IN")}
                </span>
              </div>
            </motion.div>
          )}

          {/* Status steps — always shown */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-xs rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm p-5 mb-10"
          >
            <div className="space-y-3">
              {[
                { label: "Payment Successful", done: true },
                { label: "Order Confirmed", done: true },
                { label: "Preparing for Dispatch", done: false },
              ].map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.15, ease: ease.luxe }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] ${
                      step.done
                        ? "bg-orange-glow/12 text-orange-glow"
                        : "bg-brown-deep/5 text-ink-muted/40"
                    }`}
                  >
                    {step.done ? "✓" : "⏳"}
                  </div>
                  <span
                    className={`text-sm ${
                      step.done ? "text-brown-deep font-medium" : "text-ink-muted font-light"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Brand message */}
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <p className="font-display text-lg sm:text-xl text-brown-deep italic leading-relaxed">
              Thoughtfully layered.
              <br />
              Effortlessly worn.
            </p>
            <p className="mt-3 text-micro-sm text-ink-muted/50 font-mono tracking-cta uppercase">
              Protection. Finally designed for real life.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-full bg-brown-deep px-10 py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold shadow-[0_8px_24px_-6px_rgba(58,42,34,0.25)] hover:shadow-[0_16px_40px_-8px_rgba(58,42,34,0.3)] transition-shadow duration-700"
            >
              Explore More
            </motion.button>
          </motion.div>

          {confirmedOrder?.paymentId && (
            <motion.p
              variants={fadeUp}
              className="mt-8 text-micro-xs text-ink-muted/30 font-mono tracking-cta"
            >
              Payment ID: {confirmedOrder.paymentId}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
