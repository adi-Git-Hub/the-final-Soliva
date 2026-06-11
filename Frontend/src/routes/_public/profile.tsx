import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  CreditCard,
  Bell,
  ShieldCheck,
  Plus,
  Camera,
  Trash2,
} from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLogout } from "@/features/auth/api";
import { useRemoveAvatar, useUpdateAvatar } from "@/features/user/api";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SolivaLogo } from "@/components/SolivaLogo";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { useProducts } from "@/features/catalog/api";

export const Route = createFileRoute("/_public/profile")({
  component: ProfilePage,
});

type Tab = "overview" | "orders" | "wishlist" | "addresses" | "settings";

function ProfilePage() {
  const session = useSession();
  const navigate = useNavigate();
  const logout = useLogout();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: products = [] } = useProducts({ limit: 4, sort: "newest" });

  // Avatar upload pipeline.
  const avatarFileInput = useRef<HTMLInputElement>(null);
  const updateAvatar = useUpdateAvatar();
  const removeAvatar = useRemoveAvatar();

  async function onAvatarPicked(file: File | undefined) {
    if (!file) return;
    if (!/^image\/(jpe?g|png|webp)$/i.test(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be 10 MB or smaller");
      return;
    }
    try {
      await updateAvatar.mutateAsync(file);
      toast.success("Profile photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update photo");
    }
  }

  useEffect(() => {
    // Redirect only on confirmed sign-out. `undefined` means the /auth/me
    // fetch is still in flight — bouncing the user mid-load is a bad UX.
    if (session === null) {
      navigate({ to: "/login" });
    }
  }, [session, navigate]);

  if (!session) return null;

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-luxury-beige/60 pt-24 sm:pt-32 pb-16 sm:pb-24 z-10 safe-x">
      {/* Background Mesh (Global Consistency) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(245,130,13,0.04),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(252,231,243,0.5),transparent_60%)] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_80%,rgba(243,236,226,1),transparent_50%),radial-gradient(circle_at_30%_90%,rgba(245,130,13,0.06),transparent_40%)] opacity-70" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="flex flex-col items-start gap-6 sm:gap-8 md:flex-row lg:gap-12">
          {/* LEFT SIDEBAR: LUXURY NAVIGATION PANEL */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-shrink-0 rounded-2xl sm:rounded-panel md:w-80 md:rounded-panel-lg border border-line-hairline bg-surface-panel p-6 sm:p-8 backdrop-blur-medium shadow-sm"
          >
            <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
              <div className="relative mb-3 sm:mb-4 group">
                {/* Hidden file picker — the camera button triggers it. */}
                <input
                  ref={avatarFileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => onAvatarPicked(e.target.files?.[0])}
                />
                <Avatar
                  src={session.user.avatarUrl}
                  name={session.user.name}
                  size={96}
                  className="shadow-inner group-hover:shadow-lg transition-all duration-500 sm:!h-24 sm:!w-24"
                />
                <button
                  type="button"
                  onClick={() => avatarFileInput.current?.click()}
                  disabled={updateAvatar.isPending}
                  aria-label="Change profile photo"
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-orange-glow border-2 border-white flex items-center justify-center shadow-sm hover:bg-orange-glow/90 disabled:opacity-50 transition-all"
                >
                  <Camera className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
              {session.user.avatarUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Remove your profile photo?")) {
                      removeAvatar.mutate(undefined, {
                        onSuccess: () => toast.success("Profile photo removed"),
                        onError: (err) =>
                          toast.error(err instanceof Error ? err.message : "Could not remove"),
                      });
                    }
                  }}
                  className="mb-2 inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-ink-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove photo
                </button>
              )}
              <h2 className="font-display text-xl sm:text-2xl text-brown-deep tracking-tight font-bold break-words max-w-full">
                {session.user.name}
              </h2>
              <p className="mt-1 text-micro-lg sm:text-xs font-mono text-ink-muted tracking-widest uppercase">
                {session.user.role} member
              </p>
            </div>

            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl transition-all duration-500 group ${
                    activeTab === link.id
                      ? "bg-surface-glass-strong text-brown-deep shadow-sm border border-line-hairline"
                      : "text-ink-muted hover:bg-surface-panel-strong hover:text-brown-deep"
                  }`}
                >
                  <link.icon
                    className={`h-4 w-4 ${activeTab === link.id ? "text-orange-glow" : "opacity-70 group-hover:opacity-100"}`}
                  />
                  <span className="font-mono text-micro-md tracking-eyebrow uppercase font-bold">
                    {link.label}
                  </span>
                  {activeTab === link.id && (
                    <motion.div layoutId="tab-indicator" className="ml-auto">
                      <ChevronRight className="h-3 w-3 text-orange-glow" />
                    </motion.div>
                  )}
                </button>
              ))}

              <Separator className="my-4 bg-brown/10" />

              <button
                onClick={() => logout.mutate()}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-ink-muted hover:bg-red-500/5 hover:text-red-500 transition-all duration-500 group"
              >
                <LogOut className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                <span className="font-mono text-micro-md tracking-eyebrow uppercase font-bold">
                  Sign out
                </span>
              </button>
            </nav>
          </motion.aside>

          {/* RIGHT CONTENT AREA: DYNAMIC MODULES */}
          <main className="flex-1 w-full min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {activeTab === "overview" && (
                  <div className="space-y-6 sm:space-y-8">
                    <header className="mb-8 sm:mb-10">
                      <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                        <span className="block h-px w-5 sm:w-6 bg-brown/20" />
                        <span className="font-mono text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
                          DASHBOARD
                        </span>
                      </div>
                      <h1 className="font-display text-brown-deep tracking-tight leading-hero break-words text-display-lg">
                        Welcome back, <br />
                        <span className="italic font-serif text-orange-glow">
                          {session.user.name.split(" ")[0]}
                        </span>
                        .
                      </h1>
                    </header>

                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
                      {[
                        { label: "Active Orders", value: "01", icon: Package },
                        { label: "Wishlist Items", value: "04", icon: Heart },
                        { label: "Saved Addresses", value: "02", icon: MapPin },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel p-6 sm:p-8 backdrop-blur-medium shadow-sm group hover:-translate-y-1 transition-all duration-500"
                        >
                          <stat.icon className="h-5 w-5 text-orange-glow/60 mb-3 sm:mb-4" />
                          <div className="font-mono text-2xl sm:text-3xl text-brown-deep font-black mb-1">
                            {stat.value}
                          </div>
                          <div className="font-mono text-micro-xs tracking-cta text-ink-muted uppercase font-bold">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel md:rounded-panel-lg p-6 sm:p-8 md:p-10 backdrop-blur-medium shadow-sm">
                      <div className="mb-6 sm:mb-8 flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl sm:text-2xl text-brown-deep tracking-tight">
                          Recent activity
                        </h3>
                        <Button
                          variant="link"
                          className="text-orange-glow p-0 h-auto font-mono text-micro-sm tracking-widest uppercase"
                        >
                          View all
                        </Button>
                      </div>
                      <div className="space-y-5 sm:space-y-6">
                        {[1, 2].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 sm:gap-6 p-3.5 sm:p-4 rounded-2xl bg-surface-panel-strong border border-line-hairline"
                          >
                            <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-cream flex items-center justify-center shrink-0">
                              <Package className="h-5 w-5 text-ink-faint" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                                <span className="text-sm font-bold text-brown-deep uppercase tracking-wide">
                                  Order #SLV-26001
                                </span>
                                <span className="text-micro-md font-mono text-orange-glow font-bold uppercase">
                                  Processing
                                </span>
                              </div>
                              <p className="text-xs text-ink-muted italic">
                                Ordered 2 days ago • 1 item • ₹1,299.00
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-micro-md tracking-editorial text-orange-glow uppercase font-bold">
                          ORDER HISTORY
                        </span>
                      </div>
                      <h1 className="font-display text-brown-deep tracking-tight leading-hero text-display-lg">
                        Order history
                      </h1>
                    </header>

                    <div className="space-y-5 sm:space-y-6">
                      {[1, 2, 3].map((_, i) => (
                        <div
                          key={i}
                          className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel md:rounded-panel-lg p-5 sm:p-8 md:p-12 backdrop-blur-medium shadow-sm group"
                        >
                          <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-4 sm:gap-6 border-b border-line-soft pb-6 sm:pb-8 md:flex-row md:items-center">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-micro-sm tracking-cta text-ink-muted uppercase font-bold">
                                Ref: SLV-2600{i + 1}
                              </span>
                              <span className="font-display text-base sm:text-xl text-brown-deep italic">
                                Placed on May 1{i}, 2026
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3 sm:gap-4 md:justify-end">
                              <div className="flex flex-col items-end text-right">
                                <span className="font-mono text-micro-sm tracking-cta text-ink-muted uppercase font-bold">
                                  Total
                                </span>
                                <span className="font-display text-base sm:text-xl text-brown-deep font-bold">
                                  ₹1,299.00
                                </span>
                              </div>
                              <div className="rounded-full border border-line-accent bg-accent-ghost px-3 sm:px-4 py-1.5 font-mono text-micro-sm font-black uppercase tracking-widest text-orange-glow">
                                {i === 0 ? "Delivered" : "In Transit"}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:gap-6">
                            <div className="h-20 w-16 sm:h-24 sm:w-20 rounded-xl sm:rounded-2xl overflow-hidden bg-cream border border-line-hairline flex-shrink-0">
                              <img
                                src="/pink.webp"
                                alt="Product"
                                className="h-full w-full object-contain p-2 mix-blend-multiply opacity-80"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="mb-1 font-display text-base sm:text-xl text-brown-deep font-bold tracking-tight uppercase break-words">
                                Soliva Sunwrap 01
                              </h4>
                              <p className="mb-4 max-w-sm text-xs text-ink-muted italic">
                                Edition 01 — Blush Pink / Universal Size
                              </p>
                              <Button
                                variant="outline"
                                className="h-10 rounded-full px-4 text-micro-sm tracking-widest uppercase border-line-strong text-ink-muted hover:text-brown-deep"
                              >
                                Track package
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-micro-md tracking-editorial text-orange-glow uppercase font-bold">
                          SAVED SELECTIONS
                        </span>
                      </div>
                      <h1 className="font-display text-brown-deep tracking-tight leading-hero text-display-lg">
                        Your wishlist
                      </h1>
                    </header>

                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 gap-5 sm:gap-8 sm:grid-cols-2">
                        {products.map((p) => (
                          <div
                            key={p.id}
                            className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel md:rounded-panel-lg p-4 sm:p-6 backdrop-blur-medium group"
                          >
                            <ProductCard product={p} />
                            <div className="mt-4 pt-4 border-t border-line-soft flex flex-wrap items-center justify-between gap-3">
                              <Button
                                variant="ghost"
                                className="text-red-500/60 hover:text-red-500 p-0 h-auto font-mono text-micro-xs tracking-widest uppercase"
                              >
                                Remove
                              </Button>
                              <Button className="h-10 rounded-full bg-brown-deep px-5 text-micro-sm tracking-widest uppercase text-white">
                                Move to cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl sm:rounded-panel md:rounded-panel-lg border border-line-hairline bg-surface-panel p-10 sm:p-14 md:p-20 text-center backdrop-blur-medium shadow-sm">
                        <Heart className="mx-auto mb-5 sm:mb-6 h-10 w-10 sm:h-12 sm:w-12 text-ink-disabled" />
                        <h3 className="mb-2 font-display text-xl sm:text-2xl italic text-brown-deep">
                          Nothing saved yet
                        </h3>
                        <p className="mx-auto mb-7 sm:mb-8 max-w-xs text-sm italic text-ink-muted">
                          Browse our collections to find your favorite editions.
                        </p>
                        <Button
                          asChild
                          className="rounded-full bg-brown-deep text-white px-8 sm:px-10 py-5 sm:py-6 uppercase font-bold tracking-cta sm:tracking-cta text-micro-md"
                        >
                          <Link to="/collection">Explore collection</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "addresses" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-micro-md tracking-editorial text-orange-glow uppercase font-bold">
                          SAVED NODES
                        </span>
                      </div>
                      <h1 className="font-display text-brown-deep tracking-tight leading-hero text-display-lg">
                        Addresses
                      </h1>
                    </header>

                    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                      {[
                        { label: "Home", addr: "42, Shanti Niketan, New Delhi, 110021" },
                        { label: "Work", addr: "Atelier SOLIVA, Level 4, DLF Cyber City, Gurgaon" },
                      ].map((addr, i) => (
                        <div
                          key={i}
                          className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel p-6 sm:p-8 backdrop-blur-medium shadow-sm group"
                        >
                          <div className="mb-4 flex items-start justify-between">
                            <div className="h-10 w-10 rounded-2xl bg-cream flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-ink-faint" />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                className="text-ink-faint hover:text-brown-deep p-0 h-auto font-mono text-micro-xs tracking-widest uppercase"
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                          <h4 className="mb-2 font-mono text-micro-md tracking-cta text-brown-deep uppercase font-black">
                            {addr.label}
                          </h4>
                          <p className="text-sm text-ink-soft leading-relaxed font-light italic break-words">
                            {addr.addr}
                          </p>
                        </div>
                      ))}
                      <button className="flex flex-col items-center justify-center gap-4 rounded-2xl sm:rounded-panel border border-dashed border-line-strong bg-surface-glass-ghost p-8 transition-all duration-500 group hover:bg-surface-panel">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-panel-strong transition-transform duration-500 group-hover:scale-110">
                          <Plus className="h-4 w-4 text-ink-faint" />
                        </div>
                        <span className="font-mono text-micro-sm tracking-eyebrow text-ink-muted uppercase font-bold">
                          Add new address
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-8">
                    <header className="mb-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="block h-px w-6 bg-brown/20" />
                        <span className="font-mono text-micro-md tracking-editorial text-orange-glow uppercase font-bold">
                          CALIBRATION
                        </span>
                      </div>
                      <h1 className="font-display text-brown-deep tracking-tight leading-hero text-display-lg">
                        Settings
                      </h1>
                    </header>

                    <div className="bg-surface-panel border border-line-hairline rounded-2xl sm:rounded-panel md:rounded-panel-lg p-6 sm:p-10 md:p-14 backdrop-blur-medium shadow-sm">
                      <form className="space-y-10 sm:space-y-12">
                        <section className="space-y-6 sm:space-y-8">
                          <h3 className="font-mono text-micro-lg tracking-eyebrow sm:tracking-luxe text-ink-faint uppercase font-black">
                            Personal Info
                          </h3>
                          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <label className="ml-3 sm:ml-4 font-mono text-micro-sm tracking-widest text-ink-muted uppercase font-bold">
                                Full Name
                              </label>
                              <Input
                                defaultValue={session.user.name}
                                className="h-12 sm:h-14 rounded-full border-line-soft bg-surface-glass-ghost px-5 sm:px-8 text-brown-deep placeholder:text-ink-disabled focus:border-orange-glow transition-all"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="ml-3 sm:ml-4 font-mono text-micro-sm tracking-widest text-ink-muted uppercase font-bold">
                                Email Address
                              </label>
                              <Input
                                defaultValue={session.user.email}
                                type="email"
                                className="h-12 sm:h-14 rounded-full border-line-soft bg-surface-glass-ghost px-5 sm:px-8 text-brown-deep placeholder:text-ink-disabled focus:border-orange-glow transition-all"
                              />
                            </div>
                          </div>
                        </section>

                        <section className="space-y-6 sm:space-y-8">
                          <h3 className="font-mono text-micro-lg tracking-eyebrow sm:tracking-luxe text-ink-faint uppercase font-black">
                            Security
                          </h3>
                          <div className="max-w-md space-y-3">
                            <label className="ml-3 sm:ml-4 font-mono text-micro-sm tracking-widest text-ink-muted uppercase font-bold">
                              Current Password
                            </label>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="h-12 sm:h-14 rounded-full border-line-soft bg-surface-glass-ghost px-5 sm:px-8 text-brown-deep placeholder:text-ink-disabled focus:border-orange-glow transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                              <label className="ml-3 sm:ml-4 font-mono text-micro-sm tracking-widest text-ink-muted uppercase font-bold">
                                New Password
                              </label>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 sm:h-14 rounded-full border-line-soft bg-surface-glass-ghost px-5 sm:px-8 text-brown-deep placeholder:text-ink-disabled focus:border-orange-glow transition-all"
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="ml-3 sm:ml-4 font-mono text-micro-sm tracking-widest text-ink-muted uppercase font-bold">
                                Confirm Password
                              </label>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 sm:h-14 rounded-full border-line-soft bg-surface-glass-ghost px-5 sm:px-8 text-brown-deep placeholder:text-ink-disabled focus:border-orange-glow transition-all"
                              />
                            </div>
                          </div>
                        </section>

                        <div className="flex justify-end pt-6 sm:pt-8">
                          <Button className="w-full sm:w-auto rounded-full bg-brown-deep px-8 sm:px-12 py-5 sm:py-7 text-micro-lg uppercase font-bold tracking-cta sm:tracking-cta text-white shadow-lg transition-all duration-500 hover:bg-brown hover:shadow-xl">
                            Save changes
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
