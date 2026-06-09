import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  QrCode,
  Landmark,
  Wallet,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  ChevronDown,
  Minus,
  Plus,
  Check,
  MapPin,
  Loader2,
  Shield,
  Sun,
  Wind,
  Activity,
  Sparkles,
  BadgeCheck,
  Headset,
  Clock,
} from "lucide-react";

import { useSession } from "@/features/auth/hooks/useSession";
import { useCheckoutStore } from "@/features/checkout/store";
import { useCreateOrder, useVerifyPayment } from "@/features/orders/api";
import { openRazorpayCheckout } from "@/features/payments/razorpay";
import type { RazorpayHandlerResponse } from "@/features/payments/razorpay";
import { ease, useIsMobile } from "@/design-system";
import { TermsAndConditions } from "@/components/TermsAndConditions";

export const Route = createFileRoute("/_public/checkout")({
  component: CheckoutRoute,
});

// Desktop motion — slow, cinematic fade-up with a generous stagger.
const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: ease.luxe },
  }),
};

// Mobile motion — a different language: lighter, faster slide-up, tighter stagger.
const mobileReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -2, transition: { duration: 0.4, ease: ease.luxe } },
};

// SOLIVA PROMISE — product reassurance shown below the customer form.
const solivaPromise: { icon: typeof Shield; text: string }[] = [
  { icon: Shield, text: "Full Face, Neck & Upper Back Coverage" },
  { icon: Sun, text: "Designed For Everyday Indian Conditions" },
  { icon: Wind, text: "Breathable Long-Wear Comfort" },
  { icon: Activity, text: "Structured Fit For Daily Movement" },
  { icon: Sparkles, text: "Thoughtfully Designed Exposure Protection" },
];

// Trust & reassurance — shown beneath the order summary.
const trustPoints: { icon: typeof Truck; text: string }[] = [
  { icon: Truck, text: "Free Shipping Across India" },
  { icon: BadgeCheck, text: "GST Included" },
  { icon: ShieldCheck, text: "Secure Checkout" },
  { icon: Headset, text: "Easy Customer Support" },
  { icon: Clock, text: "Estimated Delivery 5–7 Business Days" },
];

type PaymentMethod = "upi" | "upi-qr" | "card" | "netbanking" | "wallet";

function CheckoutRoute() {
  const navigate = useNavigate();
  const session = useSession();
  const { items, setItems, clear, setConfirmedOrder } = useCheckoutStore();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  // Motion language switches between desktop (cinematic) and mobile (lighter).
  const isMobile = useIsMobile();
  const reveal = isMobile ? mobileReveal : sectionReveal;

  const [paying, setPaying] = useState(false);
  const [activePayment, setActivePayment] = useState<PaymentMethod | null>(null);
  const [upiId, setUpiId] = useState("");
  const [expandedSection, setExpandedSection] = useState<number>(0);
  const [locating, setLocating] = useState(false);

  const [form, setForm] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
  });

  const upiInputRef = useRef<HTMLInputElement>(null);

  const isCustomerValid = !!(form.name.trim() && form.email.trim() && form.phone.trim());
  const isShippingValid = !!(
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.pinCode.trim() &&
    form.country.trim()
  );
  const isReadyToPay = isCustomerValid && isShippingValid && !!activePayment;

  if (!items.length) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <div className="fixed inset-0">
          <img src="/luxury-bg.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: ease.luxe }}
          className="relative z-10 text-center space-y-6"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-white/60 border border-white/80 backdrop-blur-sm flex items-center justify-center">
            <Wallet className="h-7 w-7 text-ink-muted/40" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-xl text-brown-deep">Nothing here yet</p>
            <p className="text-sm text-ink-muted font-light">Add something beautiful to begin.</p>
          </div>
          <button
            onClick={() => navigate({ to: "/collection" })}
            className="inline-flex items-center gap-2 rounded-full border border-brown-deep/15 bg-white/60 backdrop-blur-sm px-6 py-3 text-micro-sm font-mono tracking-cta uppercase font-bold text-brown-deep hover:bg-brown-deep hover:text-white transition-all duration-500"
          >
            Browse Collection
          </button>
        </motion.div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 0;
  const gst = 0;
  const total = subtotal + shipping + gst;
  // Shipping row shows the entered delivery address once available.
  const shipTo = [form.address, form.city, form.state, form.pinCode]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ");

  // Launch-pricing display only — does NOT affect the charged total above.
  const LAUNCH_MRP_PER_UNIT = 999;
  const totalUnits = items.reduce((n, i) => n + i.quantity, 0);
  const mrpTotal = LAUNCH_MRP_PER_UNIT * totalUnits;
  const savings = Math.max(0, mrpTotal - subtotal);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateQuantity(productId: string, delta: number) {
    setItems(
      items
        .map((i) =>
          i.productId === productId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function toggleSection(idx: number) {
    setExpandedSection(expandedSection === idx ? -1 : idx);
  }

  async function detectLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await res.json();
          const addr = data.address || {};

          setForm((prev) => ({
            ...prev,
            address:
              [addr.road, addr.neighbourhood, addr.suburb].filter(Boolean).join(", ") ||
              prev.address,
            city: addr.city || addr.town || addr.village || addr.county || prev.city,
            state: addr.state || prev.state,
            pinCode: addr.postcode || prev.pinCode,
            country: addr.country || prev.country,
          }));

          toast.success("Location detected");
        } catch {
          toast.error("Could not fetch address. Please enter manually.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          toast.error("Location access denied. Please enter address manually.");
        } else {
          toast.error("Could not detect location. Please enter manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function handlePay() {
    if (!session?.user) {
      toast.message("Sign in to continue");
      return;
    }
    if (!isCustomerValid) {
      toast.error("Please fill in all customer details");
      setExpandedSection(0);
      return;
    }
    if (!isShippingValid) {
      toast.error("Please fill in your shipping address");
      setExpandedSection(1);
      return;
    }
    if (!activePayment) {
      toast.error("Select a payment method");
      setExpandedSection(2);
      return;
    }
    if (paying) return;
    setPaying(true);

    try {
      const orderItems = items.map((i) => ({
        product: i.productId,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        image: i.image.startsWith("http") ? i.image : `${window.location.origin}${i.image}`,
      }));

      const res = await createOrder.mutateAsync({
        shippingInfo: {
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          pinCode: parseInt(form.pinCode) || 110001,
          phoneNo: parseInt(form.phone.replace(/\D/g, "")) || 9999999999,
        },
        orderItems,
        itemsPrice: subtotal,
        taxPrice: gst,
        shippingPrice: shipping,
        totalPrice: total,
      });

      const { razorpayOrderId, amount } = res;
      const orderId = res.order.id ?? res.order._id;

      const prefill: Record<string, string> = {
        name: form.name,
        email: form.email,
        contact: form.phone.replace(/\D/g, ""),
      };
      if (activePayment === "upi" && upiId) {
        prefill.vpa = upiId;
      }

      await openRazorpayCheckout({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Soliva",
        description: items.map((i) => i.name).join(", "),
        order_id: razorpayOrderId,
        handler: async (response: RazorpayHandlerResponse) => {
          try {
            await verifyPayment.mutateAsync({
              orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setConfirmedOrder({
              orderId,
              items: [...items],
              total,
              paymentId: response.razorpay_payment_id,
            });
            clear();
            navigate({ to: "/order-confirmed" });
          } catch {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        prefill,
        theme: { color: "#f5820d" },
        modal: {
          ondismiss: () => {
            setPaying(false);
            toast.info("Payment cancelled");
          },
        },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      if (msg.includes("Login") || msg.includes("login")) {
        toast.error("Please sign in first");
      } else {
        toast.error(msg);
      }
    } finally {
      setPaying(false);
    }
  }

  const paymentMethods: {
    id: PaymentMethod;
    label: string;
    sub: string;
    icon: typeof Smartphone;
  }[] = [
    { id: "upi", label: "UPI", sub: "GPay · PhonePe · Paytm", icon: Smartphone },
    { id: "upi-qr", label: "Scan & Pay", sub: "QR Code", icon: QrCode },
    { id: "card", label: "Card", sub: "Credit · Debit", icon: CreditCard },
    { id: "netbanking", label: "Net Banking", sub: "All major banks", icon: Landmark },
    { id: "wallet", label: "Wallets", sub: "Paytm · Mobikwik", icon: Wallet },
  ];

  return (
    <div className="relative min-h-screen w-full safe-x">
      {/* SOLIVA branded background */}
      <div className="fixed inset-0">
        <img src="/luxury-bg.webp" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-32 sm:pb-24">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <button
            onClick={() => navigate({ to: -1 as any })}
            className="group flex items-center gap-2.5 text-ink-muted hover:text-brown-deep transition-colors duration-500"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-500" />
            <span className="font-mono text-micro-md tracking-cta uppercase font-bold">Back</span>
          </button>
        </motion.div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.luxe }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-8 bg-brown/20" />
            <span className="font-mono text-micro-sm tracking-editorial text-orange-glow uppercase font-bold">
              Secure Checkout
            </span>
          </div>
          <h1 className="font-display text-brown-deep tracking-tight leading-tight text-display-sm sm:text-display-lg">
            Complete your order
          </h1>
        </motion.div>

        {/* Progress journey — Customer · Shipping · Payment */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: ease.luxe }}
          className="mb-10 max-w-lg sm:mb-14"
        >
          <CheckoutSteps
            expandedSection={expandedSection}
            customerDone={isCustomerValid}
            shippingDone={isShippingValid}
            paymentDone={!!activePayment}
            onJump={(i) => setExpandedSection(i)}
          />
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 xl:gap-20">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-8 sm:space-y-10">
            {/* SECTION 1: Customer */}
            <motion.div custom={0} variants={reveal} initial="hidden" animate="visible">
              <CheckoutCard active={expandedSection === 0}>
                <SectionHeader
                  number="01"
                  title="Customer"
                  subtitle="Complete your details to continue your Soliva journey."
                  expanded={expandedSection === 0}
                  onToggle={() => toggleSection(0)}
                  complete={isCustomerValid}
                />
                <AnimatePresence initial={false}>
                  {expandedSection === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: ease.luxe }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 space-y-5">
                        <LuxuryInput
                          label="Full Name"
                          value={form.name}
                          onChange={(v) => updateField("name", v)}
                          placeholder="Aditya Cloud"
                          required
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <LuxuryInput
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={(v) => updateField("email", v)}
                            placeholder="aditya@soliva.in"
                            required
                          />
                          <LuxuryInput
                            label="Phone"
                            type="tel"
                            value={form.phone}
                            onChange={(v) => updateField("phone", v)}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => isCustomerValid && setExpandedSection(1)}
                            disabled={!isCustomerValid}
                            className="w-full rounded-2xl bg-gradient-to-b from-[#4a3a32] to-[#3a2a22] py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold shadow-[0_8px_22px_-12px_rgba(58,42,34,0.5)] hover:shadow-[0_12px_30px_-12px_rgba(58,42,34,0.55)] transition-all duration-500 disabled:from-[#3a2a22]/25 disabled:to-[#3a2a22]/25 disabled:text-white/60 disabled:shadow-none disabled:cursor-not-allowed"
                          >
                            Continue to Shipping
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CheckoutCard>
            </motion.div>

            {/* SOLIVA PROMISE — product reassurance */}
            <motion.div custom={1} variants={reveal} initial="hidden" animate="visible">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#3a2a22]/[0.07] bg-gradient-to-br from-[#fdfbf8]/85 to-[#f7efe4]/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_1px_4px_-1px_rgba(58,42,34,0.04),0_14px_34px_-24px_rgba(58,42,34,0.16)]">
                {/* soft glass highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-orange-glow/[0.07] blur-3xl"
                />
                <div className="relative">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-glow" />
                    <span className="font-mono text-micro-xs tracking-editorial text-brown-deep/70 uppercase font-bold">
                      Soliva Promise
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {solivaPromise.map(({ icon: Icon, text }, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: isMobile ? 0.32 : 0.5,
                          delay: i * (isMobile ? 0.04 : 0.07),
                          ease: ease.luxe,
                        }}
                        className={`flex items-center gap-3 rounded-2xl border border-[#3a2a22]/[0.06] bg-white/55 px-3.5 py-3 transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[0_12px_26px_-16px_rgba(58,42,34,0.3)] ${
                          i === solivaPromise.length - 1 && solivaPromise.length % 2 === 1
                            ? "sm:col-span-2"
                            : ""
                        }`}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-glow/[0.08] text-orange-glow">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[0.82rem] font-light leading-snug text-brown-deep">
                          {text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 2: Shipping */}
            <motion.div custom={2} variants={reveal} initial="hidden" animate="visible">
              <CheckoutCard active={expandedSection === 1}>
                <SectionHeader
                  number="02"
                  title="Shipping"
                  subtitle="Where should we deliver your protection system?"
                  expanded={expandedSection === 1}
                  onToggle={() => toggleSection(1)}
                  complete={isShippingValid}
                />
                <AnimatePresence initial={false}>
                  {expandedSection === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: ease.luxe }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 space-y-5">
                        {/* Use Current Location */}
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={detectLocation}
                          disabled={locating}
                          className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-orange-glow/20 bg-orange-glow/[0.04] py-3.5 text-orange-glow font-mono text-micro-sm tracking-cta uppercase font-bold hover:bg-orange-glow/[0.08] transition-all duration-500 disabled:opacity-50"
                        >
                          {locating ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Detecting your location...
                            </>
                          ) : (
                            <>
                              <MapPin className="h-4 w-4" />
                              Use Current Location
                            </>
                          )}
                        </motion.button>

                        <LuxuryInput
                          label="Address"
                          value={form.address}
                          onChange={(v) => updateField("address", v)}
                          placeholder="123, Civil Lines"
                          required
                        />
                        <div className="grid grid-cols-2 gap-5">
                          <LuxuryInput
                            label="City"
                            value={form.city}
                            onChange={(v) => updateField("city", v)}
                            placeholder="Nagpur"
                            required
                          />
                          <LuxuryInput
                            label="State"
                            value={form.state}
                            onChange={(v) => updateField("state", v)}
                            placeholder="Maharashtra"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <LuxuryInput
                            label="PIN Code"
                            value={form.pinCode}
                            onChange={(v) => updateField("pinCode", v)}
                            placeholder="440001"
                            required
                          />
                          <LuxuryInput
                            label="Country"
                            value={form.country}
                            onChange={(v) => updateField("country", v)}
                            placeholder="India"
                            required
                          />
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => isShippingValid && setExpandedSection(2)}
                            disabled={!isShippingValid}
                            className="w-full rounded-2xl bg-gradient-to-b from-[#4a3a32] to-[#3a2a22] py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold shadow-[0_8px_22px_-12px_rgba(58,42,34,0.5)] hover:shadow-[0_12px_30px_-12px_rgba(58,42,34,0.55)] transition-all duration-500 disabled:from-[#3a2a22]/25 disabled:to-[#3a2a22]/25 disabled:text-white/60 disabled:shadow-none disabled:cursor-not-allowed"
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CheckoutCard>
            </motion.div>

            {/* SECTION 3: Payment */}
            <motion.div custom={2} variants={reveal} initial="hidden" animate="visible">
              <CheckoutCard active={expandedSection === 2}>
                <SectionHeader
                  number="03"
                  title="Payment"
                  subtitle="Choose your preferred payment method securely."
                  expanded={expandedSection === 2}
                  onToggle={() => toggleSection(2)}
                  complete={!!activePayment}
                />
                <AnimatePresence initial={false}>
                  {expandedSection === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: ease.luxe }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {paymentMethods.map((m) => (
                            <PaymentMethodCard
                              key={m.id}
                              method={m}
                              selected={activePayment === m.id}
                              onSelect={() => {
                                setActivePayment(m.id);
                                if (m.id === "upi") {
                                  setTimeout(() => upiInputRef.current?.focus(), 200);
                                }
                              }}
                            />
                          ))}
                        </div>

                        <AnimatePresence>
                          {activePayment === "upi" && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: ease.luxe }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm p-5 space-y-3">
                                <label className="block font-mono text-micro-xs tracking-eyebrow text-ink-muted uppercase font-bold">
                                  Your UPI ID
                                </label>
                                <input
                                  ref={upiInputRef}
                                  type="text"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  placeholder="name@paytm"
                                  className="w-full rounded-xl border border-line-soft bg-white/70 px-5 py-3.5 text-sm text-brown-deep font-light placeholder:text-ink-muted/40 focus:outline-none focus:border-orange-glow/40 focus:shadow-[0_0_0_3px_rgba(245,130,13,0.08)] transition-all duration-500"
                                />
                                <div className="flex items-center gap-3 pt-1">
                                  {["GPay", "PhonePe", "Paytm"].map((app) => (
                                    <span
                                      key={app}
                                      className="px-3 py-1.5 rounded-full bg-white/60 border border-white/70 text-micro-xs font-mono tracking-cta text-ink-muted uppercase font-bold"
                                    >
                                      {app}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CheckoutCard>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              custom={3}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-2.5 py-3 sm:py-5"
            >
              {[
                { icon: ShieldCheck, text: "256-bit SSL" },
                { icon: Lock, text: "Razorpay Secured" },
                { icon: Truck, text: "Free Shipping" },
                { icon: RotateCcw, text: "Easy Returns" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-[#3a2a22]/[0.07] bg-[#fdfbf8]/55 px-3.5 py-1.5 text-ink-muted/75 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-orange-glow/65" />
                  <span className="font-mono text-micro-xs tracking-cta uppercase font-semibold">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[380px] xl:w-[420px] shrink-0"
          >
            <div className="lg:sticky lg:top-28">
              <div className="rounded-[1.75rem] bg-[#fdfbf8]/90 border border-[#3a2a22]/[0.08] p-6 sm:p-7 backdrop-blur-xl shadow-[0_2px_8px_-2px_rgba(58,42,34,0.05),0_30px_60px_-28px_rgba(58,42,34,0.28)]">
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-glow" />
                  <span className="font-mono text-micro-xs tracking-editorial text-brown-deep/70 uppercase font-bold">
                    Order Summary
                  </span>
                  <span className="ml-auto font-mono text-micro-xs tracking-cta text-ink-muted/50 uppercase">
                    {items.reduce((n, i) => n + i.quantity, 0)}{" "}
                    {items.reduce((n, i) => n + i.quantity, 0) === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="h-24 w-[76px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FBF6F0] via-[#F3ECE2] to-[#E7D8C4] border border-[#3a2a22]/[0.07] shadow-[0_8px_20px_-12px_rgba(58,42,34,0.35)]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="text-sm text-brown-deep font-medium leading-snug">
                            {item.name}
                          </p>
                          <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-orange-glow/[0.1] px-2 py-[3px] font-mono text-[0.56rem] tracking-[0.14em] uppercase font-bold text-[#c76600]">
                            <Sparkles className="h-2.5 w-2.5" /> Launch Price
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-0 rounded-full border border-line-soft bg-white/60">
                            <button
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="h-7 w-7 flex items-center justify-center text-ink-muted hover:text-brown-deep transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-micro-sm font-mono font-bold text-brown-deep">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="h-7 w-7 flex items-center justify-center text-ink-muted hover:text-brown-deep transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex flex-col items-end leading-none">
                            <span className="font-mono text-sm text-brown-deep font-semibold">
                              ₹{(LAUNCH_MRP_PER_UNIT * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <span className="mt-1 font-mono text-micro-xs text-[#c76600] font-bold">
                              −₹{((LAUNCH_MRP_PER_UNIT - item.price) * item.quantity).toLocaleString("en-IN")} off
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-line-soft to-transparent" />

                <div className="space-y-3.5">
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-ink-muted font-light">
                        <Sparkles className="h-3.5 w-3.5 text-[#c76600]" /> Discount
                      </span>
                      <span className="font-mono font-bold text-[#c76600]">
                        −₹{savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted font-light">Subtotal</span>
                    <span className="text-brown-deep font-mono">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="shrink-0 text-ink-muted font-light">Shipping</span>
                    {shipTo ? (
                      <span className="text-right font-mono text-micro-sm leading-snug text-brown-deep">
                        {shipTo}
                      </span>
                    ) : (
                      <span className="text-orange-glow font-mono text-micro-sm tracking-cta uppercase font-bold">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted font-light">GST</span>
                    <span className="text-ink-muted font-mono">Included</span>
                  </div>
                </div>

                {/* Total — bold */}
                <div className="mt-6 flex items-end justify-between rounded-2xl border border-[#3a2a22]/[0.07] bg-[#3a2a22]/[0.025] px-5 py-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-micro-xs tracking-editorial text-brown-deep uppercase font-black">
                      Total
                    </span>
                    <span className="mt-1 font-mono text-micro-xs tracking-cta text-ink-muted uppercase font-bold">
                      Incl. all taxes
                    </span>
                  </div>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: ease.luxe }}
                      className="font-display text-[2.15rem] leading-none text-brown-deep tracking-tight"
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-white/50 border border-white/60 px-4 py-3">
                  <Truck className="h-4 w-4 text-orange-glow/70 shrink-0" />
                  <span className="text-micro-xs font-mono tracking-cta text-ink-muted uppercase">
                    Estimated delivery · 5–7 business days
                  </span>
                </div>

                <motion.button
                  whileHover={isReadyToPay ? { scale: 1.01 } : {}}
                  whileTap={isReadyToPay ? { scale: 0.98 } : {}}
                  onClick={handlePay}
                  disabled={paying || !isReadyToPay}
                  className="mt-6 w-full rounded-2xl bg-gradient-to-b from-[#4a3a32] to-[#3a2a22] py-[18px] text-white font-mono text-micro-sm tracking-cta uppercase font-bold shadow-[0_10px_28px_-12px_rgba(58,42,34,0.5)] hover:shadow-[0_16px_40px_-12px_rgba(58,42,34,0.55)] transition-all duration-500 disabled:from-[#3a2a22]/30 disabled:to-[#3a2a22]/30 disabled:opacity-100 disabled:text-white/70 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {paying ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing
                    </span>
                  ) : !isCustomerValid ? (
                    "Fill customer details"
                  ) : !isShippingValid ? (
                    "Add shipping address"
                  ) : !activePayment ? (
                    "Select payment method"
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      {`Pay ₹${total.toLocaleString("en-IN")}`}
                    </span>
                  )}
                </motion.button>

                <TermsAndConditions variant="light" className="mt-4 text-center" />
              </div>

              {/* Trust & reassurance */}
              <div className="mt-5 rounded-[1.5rem] border border-[#3a2a22]/[0.07] bg-[#fdfbf8]/75 p-5 backdrop-blur-xl shadow-[0_1px_4px_-1px_rgba(58,42,34,0.04),0_14px_34px_-26px_rgba(58,42,34,0.16)]">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-glow" />
                  <span className="font-mono text-micro-xs tracking-editorial text-brown-deep/70 uppercase font-bold">
                    Soliva Assurance
                  </span>
                </div>
                <div className="space-y-2.5">
                  {trustPoints.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3 rounded-xl border border-[#3a2a22]/[0.05] bg-white/50 px-3.5 py-2.5 transition-[transform,background-color] duration-500 hover:bg-white/80"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-glow/[0.09] text-orange-glow">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[0.82rem] font-light leading-snug text-brown-deep">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden z-50">
        <div className="bg-[#fdfbf8]/90 backdrop-blur-xl border-t border-[#3a2a22]/[0.08] shadow-[0_-12px_30px_-18px_rgba(58,42,34,0.25)] px-4 pt-3 pb-3 safe-x safe-bottom">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-micro-xs tracking-cta text-ink-muted uppercase font-bold">
                Total
              </span>
              <span className="font-mono text-micro-xs text-ink-muted/40 uppercase">incl. taxes</span>
            </div>
            <span className="font-display text-2xl text-brown-deep tracking-tight">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={paying || !isReadyToPay}
            className="w-full rounded-2xl bg-gradient-to-b from-[#4a3a32] to-[#3a2a22] py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold shadow-[0_10px_26px_-12px_rgba(58,42,34,0.5)] disabled:from-[#3a2a22]/30 disabled:to-[#3a2a22]/30 disabled:text-white/70 disabled:shadow-none transition-all duration-500"
          >
            {paying ? (
              "Processing..."
            ) : isReadyToPay ? (
              <span className="flex items-center justify-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                {`Pay ₹${total.toLocaleString("en-IN")}`}
              </span>
            ) : (
              "Complete all fields"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════ SUB-COMPONENTS ════════ */

function CheckoutSteps({
  expandedSection,
  customerDone,
  shippingDone,
  paymentDone,
  onJump,
}: {
  expandedSection: number;
  customerDone: boolean;
  shippingDone: boolean;
  paymentDone: boolean;
  onJump: (i: number) => void;
}) {
  const steps = [
    { n: "01", label: "Customer", done: customerDone },
    { n: "02", label: "Shipping", done: shippingDone },
    { n: "03", label: "Payment", done: paymentDone },
  ];

  return (
    <div className="flex items-start">
      {steps.map((s, i) => {
        const active = expandedSection === i;
        const state = s.done ? "done" : active ? "active" : "upcoming";
        return (
          <Fragment key={s.n}>
            <button
              type="button"
              onClick={() => onJump(i)}
              className="flex shrink-0 flex-col items-center gap-2.5"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-full font-mono text-micro-sm font-bold tracking-tight transition-all duration-500 ${
                  state === "done"
                    ? "bg-orange-glow text-white shadow-[0_6px_16px_-5px_rgba(245,130,13,0.55)]"
                    : state === "active"
                      ? "bg-brown-deep text-white shadow-[0_6px_16px_-6px_rgba(58,42,34,0.5)] ring-4 ring-brown-deep/[0.08]"
                      : "bg-[#fdfbf8]/80 text-ink-muted/70 ring-1 ring-inset ring-[#3a2a22]/12"
                }`}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : s.n}
              </span>
              <span
                className={`font-mono text-micro-xs tracking-cta uppercase font-bold transition-colors duration-500 ${
                  state === "upcoming" ? "text-ink-muted/45" : "text-brown-deep"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className="mx-2 mt-5 h-px flex-1 overflow-hidden rounded-full bg-[#3a2a22]/[0.10] sm:mx-3">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-glow to-[#c76600]"
                  initial={false}
                  animate={{ scaleX: s.done ? 1 : 0 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.7, ease: ease.luxe }}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

function CheckoutCard({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-[1.75rem] border bg-[#fdfbf8]/85 p-6 sm:p-7 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-700 ${
        active
          ? "border-[#3a2a22]/[0.10] bg-[#fdfbf8]/92 shadow-[0_2px_6px_-2px_rgba(58,42,34,0.05),0_24px_50px_-26px_rgba(58,42,34,0.22)]"
          : "border-[#3a2a22]/[0.06] shadow-[0_1px_4px_-1px_rgba(58,42,34,0.04),0_14px_34px_-24px_rgba(58,42,34,0.16)]"
      }`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
  expanded,
  onToggle,
  complete,
}: {
  number: string;
  title: string;
  subtitle?: string;
  expanded: boolean;
  onToggle: () => void;
  complete: boolean;
}) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-3 group">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-micro-sm font-mono font-bold tracking-tight transition-all duration-500 ${
            complete
              ? "bg-orange-glow text-white shadow-[0_4px_12px_-3px_rgba(245,130,13,0.5)]"
              : expanded
                ? "bg-brown-deep text-white shadow-[0_4px_12px_-4px_rgba(58,42,34,0.45)]"
                : "bg-[#3a2a22]/[0.05] text-ink-muted/70 ring-1 ring-inset ring-[#3a2a22]/10"
          }`}
        >
          {complete ? <Check className="h-4 w-4" /> : number}
        </div>
        <div className="min-w-0 text-left">
          <h3
            className={`font-display text-lg sm:text-xl tracking-tight transition-colors duration-500 ${
              expanded || complete ? "text-brown-deep" : "text-brown-deep/55"
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 truncate text-[0.78rem] font-light text-ink-muted/70">{subtitle}</p>
          )}
        </div>
      </div>
      <motion.div
        animate={{ rotate: expanded ? 180 : 0 }}
        transition={{ duration: 0.4, ease: ease.luxe }}
        className="grid h-7 w-7 place-items-center rounded-full transition-colors duration-500 group-hover:bg-[#3a2a22]/[0.04]"
      >
        <ChevronDown className="h-4 w-4 text-ink-muted/50 group-hover:text-ink-muted transition-colors" />
      </motion.div>
    </button>
  );
}

function LuxuryInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!value;
  const missing = required && !focused && !value;

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -22 : 0,
          scale: active ? 0.74 : 1,
          opacity: active ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.25, ease: ease.luxe }}
        className={`absolute left-5 top-[15px] origin-left font-mono text-micro-sm tracking-cta uppercase font-bold pointer-events-none transition-colors duration-500 ${
          focused ? "text-orange-glow" : "text-ink-muted"
        }`}
      >
        {label}
        {required && " *"}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ""}
        className={`w-full rounded-2xl border bg-white/70 px-5 pt-[22px] pb-2.5 text-[0.95rem] text-brown-deep font-normal placeholder:text-ink-muted/35 focus:outline-none transition-all duration-500 ${
          focused
            ? "border-orange-glow/50 bg-white/90 shadow-[0_0_0_4px_rgba(245,130,13,0.09),0_6px_18px_-10px_rgba(245,130,13,0.3)]"
            : missing
              ? "border-orange-glow/20 bg-orange-glow/[0.03]"
              : "border-[#3a2a22]/[0.09] hover:border-[#3a2a22]/20 hover:bg-white/80"
        }`}
      />
    </div>
  );
}

function PaymentMethodCard({
  method,
  selected,
  onSelect,
}: {
  method: { id: string; label: string; sub: string; icon: typeof Smartphone };
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = method.icon;
  return (
    <motion.button
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      onClick={onSelect}
      className={`relative rounded-2xl p-4 sm:p-5 text-left transition-all duration-500 ${
        selected
          ? "bg-orange-glow/[0.06] border-2 border-orange-glow/45 shadow-[0_8px_24px_-10px_rgba(245,130,13,0.28)]"
          : "bg-white/55 border border-[#3a2a22]/[0.08] hover:bg-white/80 hover:border-[#3a2a22]/15"
      }`}
    >
      {selected && (
        <motion.div
          layoutId="payment-check"
          className="absolute top-2.5 right-2.5 h-5 w-5 rounded-full bg-orange-glow flex items-center justify-center"
          transition={{ duration: 0.3, ease: ease.luxe }}
        >
          <Check className="h-3 w-3 text-white" />
        </motion.div>
      )}
      <Icon
        className={`h-5 w-5 mb-3 transition-colors duration-500 ${selected ? "text-orange-glow" : "text-ink-muted/50"}`}
      />
      <p
        className={`text-sm font-medium transition-colors duration-500 ${selected ? "text-brown-deep" : "text-ink-muted"}`}
      >
        {method.label}
      </p>
      <p className="text-micro-xs text-ink-muted/50 font-mono mt-0.5">{method.sub}</p>
    </motion.button>
  );
}
