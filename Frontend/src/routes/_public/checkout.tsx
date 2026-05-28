import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState, useRef } from "react";
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
} from "lucide-react";

import { useSession } from "@/features/auth/hooks/useSession";
import { useCheckoutStore } from "@/features/checkout/store";
import { useCreateOrder, useVerifyPayment } from "@/features/orders/api";
import { openRazorpayCheckout } from "@/features/payments/razorpay";
import type { RazorpayHandlerResponse } from "@/features/payments/razorpay";
import { ease } from "@/design-system";

export const Route = createFileRoute("/_public/checkout")({
  component: CheckoutRoute,
});

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: ease.luxe },
  }),
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.01, y: -2, transition: { duration: 0.4, ease: ease.luxe } },
};

type PaymentMethod = "upi" | "upi-qr" | "card" | "netbanking" | "wallet";

function CheckoutRoute() {
  const navigate = useNavigate();
  const session = useSession();
  const { items, setItems, clear, setConfirmedOrder } = useCheckoutStore();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

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

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 xl:gap-20">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-8 sm:space-y-10">
            {/* SECTION 1: Customer */}
            <motion.div custom={0} variants={sectionReveal} initial="hidden" animate="visible">
              <CheckoutCard>
                <SectionHeader
                  number="01"
                  title="Customer"
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
                            className="w-full rounded-2xl bg-brown-deep py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold hover:bg-brown transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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

            {/* SECTION 2: Shipping */}
            <motion.div custom={1} variants={sectionReveal} initial="hidden" animate="visible">
              <CheckoutCard>
                <SectionHeader
                  number="02"
                  title="Shipping"
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
                            className="w-full rounded-2xl bg-brown-deep py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold hover:bg-brown transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
            <motion.div custom={2} variants={sectionReveal} initial="hidden" animate="visible">
              <CheckoutCard>
                <SectionHeader
                  number="03"
                  title="Payment"
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
              variants={sectionReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 sm:py-6"
            >
              {[
                { icon: ShieldCheck, text: "256-bit SSL" },
                { icon: Lock, text: "Razorpay Secured" },
                { icon: Truck, text: "Free Shipping" },
                { icon: RotateCcw, text: "Easy Returns" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-ink-muted/40">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="font-mono text-micro-xs tracking-cta uppercase">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <motion.div
            custom={1}
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[380px] xl:w-[420px] shrink-0"
          >
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl bg-white/55 border border-white/70 p-6 sm:p-8 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(58,42,34,0.08)]">
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-px w-5 bg-brown/15" />
                  <span className="font-mono text-micro-xs tracking-editorial text-ink-muted uppercase font-bold">
                    Order Summary
                  </span>
                </div>

                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="h-20 w-[68px] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#F0F4FF] via-[#DBEAFE] to-[#BFDBFE] border border-line-soft">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="text-sm text-brown-deep font-medium leading-snug">
                            {item.name}
                          </p>
                          <p className="text-micro-xs text-ink-muted/60 font-mono mt-0.5">
                            Midnight Blue
                          </p>
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
                          <span className="font-mono text-sm text-brown-deep font-medium">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-line-soft to-transparent" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted font-light">Subtotal</span>
                    <span className="text-brown-deep font-mono">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted font-light">Shipping</span>
                    <span className="text-orange-glow font-mono text-micro-sm tracking-cta uppercase font-bold">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted font-light">GST</span>
                    <span className="text-ink-muted font-mono">Included</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-line-soft">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-ink-muted font-light">Total</span>
                    <span className="font-display text-3xl text-brown-deep tracking-tight">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
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
                  className="mt-6 w-full rounded-2xl bg-brown-deep py-[18px] text-white font-mono text-micro-sm tracking-cta uppercase font-bold hover:shadow-[0_12px_32px_-8px_rgba(58,42,34,0.3)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed"
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
                    `Pay ₹${total.toLocaleString("en-IN")}`
                  )}
                </motion.button>

                <p className="mt-4 text-center text-micro-xs text-ink-muted/40 font-mono tracking-cta">
                  By placing this order you agree to our terms
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden z-50">
        <div className="bg-white/80 backdrop-blur-md border-t border-line-soft px-4 py-3 safe-x">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-muted">Total</span>
            <span className="font-display text-xl text-brown-deep">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={paying || !isReadyToPay}
            className="w-full rounded-2xl bg-brown-deep py-4 text-white font-mono text-micro-sm tracking-cta uppercase font-bold disabled:opacity-30 transition-all duration-500"
          >
            {paying
              ? "Processing..."
              : isReadyToPay
                ? `Pay ₹${total.toLocaleString("en-IN")}`
                : "Complete all fields"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════ SUB-COMPONENTS ════════ */

function CheckoutCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/50 border border-white/65 p-6 sm:p-8 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(58,42,34,0.06)] transition-shadow duration-700 hover:shadow-[0_8px_40px_-12px_rgba(58,42,34,0.1)]">
      {children}
    </div>
  );
}

function SectionHeader({
  number,
  title,
  expanded,
  onToggle,
  complete,
}: {
  number: string;
  title: string;
  expanded: boolean;
  onToggle: () => void;
  complete: boolean;
}) {
  return (
    <button onClick={onToggle} className="w-full flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-micro-xs font-mono font-bold transition-all duration-500 ${
            complete ? "bg-orange-glow/10 text-orange-glow" : "bg-brown-deep/5 text-ink-muted"
          }`}
        >
          {complete ? <Check className="h-3.5 w-3.5" /> : number}
        </div>
        <h3 className="font-display text-lg sm:text-xl text-brown-deep tracking-tight">{title}</h3>
      </div>
      <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown className="h-4 w-4 text-ink-muted/40 group-hover:text-ink-muted transition-colors" />
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
          scale: active ? 0.75 : 1,
          opacity: active ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.25, ease: ease.luxe }}
        className="absolute left-5 top-4 origin-left font-mono text-micro-sm tracking-cta uppercase font-bold text-ink-muted pointer-events-none"
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
        className={`w-full rounded-2xl border bg-white/50 backdrop-blur-sm px-5 pt-5 pb-3 text-sm text-brown-deep font-light placeholder:text-ink-muted/30 focus:outline-none transition-all duration-500 ${
          focused
            ? "border-orange-glow/30 shadow-[0_0_0_4px_rgba(245,130,13,0.06)]"
            : missing
              ? "border-orange-glow/15 bg-orange-glow/[0.02]"
              : "border-white/60 hover:border-brown/15"
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
          ? "bg-white/70 border-2 border-orange-glow/30 shadow-[0_4px_20px_-6px_rgba(245,130,13,0.12)]"
          : "bg-white/30 border border-white/60 hover:bg-white/50"
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
