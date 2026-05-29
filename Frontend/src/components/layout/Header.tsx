import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  LogIn,
  UserPlus,
  KeyRound,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ApiStatusDot } from "@/components/shared/ApiStatusDot";
import { Avatar } from "@/components/shared/Avatar";
import { SolivaLogo } from "@/components/SolivaLogo";
import { useSession } from "@/features/auth/hooks/useSession";
import { useLogout } from "@/features/auth/api";
import { useCart } from "@/features/cart/hooks/useCart";
import { cn } from "@/lib/utils";

const primaryLinks: readonly { to: string; label: string; search?: Record<string, string> }[] = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/categories", label: "Categories" },
  { to: "/story", label: "Story" },
  { to: "/technology", label: "How It Works" },
  { to: "/identity", label: "Identity" },
];

const authLinks = [
  { to: "/login", label: "Sign in", icon: LogIn },
  { to: "/register", label: "Create account", icon: UserPlus },
  { to: "/forgot-password", label: "Forgot password", icon: KeyRound },
] as const;

export function Header() {
  const session = useSession();
  const { itemCount: cartCount } = useCart();
  const logout = useLogout();
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Auto-focus the input when the search icon expands it.
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const videoSection = document.getElementById("video-section");
      const urbanSection = document.getElementById("urban-storytelling");

      if (videoSection && urbanSection) {
        const videoRect = videoSection.getBoundingClientRect();
        const urbanRect = urbanSection.getBoundingClientRect();

        // Hide when video section is active in viewport
        // We hide if video section has started (top <= 100) and hasn't fully passed (bottom > 100)
        // AND urban section hasn't arrived yet (top > 100)
        if (videoRect.top <= 100 && urbanRect.top > 100) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQ.trim()) return;
    navigate({ to: "/search", search: { q: searchQ.trim() } });
    setSearchQ("");
    setSearchOpen(false);
  }

  const getUserInitials = () => {
    if (!session?.user?.name) return "??";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-in-out",
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      {/* 
          ATHER-STYLE PREMIUM SHELL SCALE 
          -------------------------------
          Larger floating presence with disciplined Gradio internal rhythm.
          Increased vertical breathing and shell geometry for a premium feel.
      */}
      <div
        className={cn(
          "pointer-events-auto relative mx-auto transition-all duration-700 ease-in-out flex items-center justify-between",
          "border-b backdrop-blur-xl",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20 after:pointer-events-none",
          isScrolled
            ? "h-14 w-[min(96vw,1100px)] px-6 mt-2 rounded-2xl border border-white/20 bg-white/40 shadow-editorial"
            : "h-16 w-full px-8 mt-0 rounded-none border-transparent bg-white/40 shadow-none",
        )}
      >
        <div
          className={cn(
            "flex h-full w-full items-center justify-between mx-auto transition-all duration-700",
            !isScrolled && "max-w-7xl",
          )}
        >
          <div className="flex items-center gap-8 lg:gap-12 h-full">
            {/* Soliva Branding — Left aligned, increased to ~20% of navbar length */}
            <Link to="/" className="flex items-center outline-none group h-full py-2">
              <img
                src="/logo-new.png"
                alt="Soliva"
                className={cn(
                  "object-contain transition-all duration-700 ease-in-out h-full w-auto max-w-[200px] lg:max-w-[240px]",
                )}
              />
            </Link>

            {/* Desktop Nav — Engineered readable rhythm */}
            <nav className="hidden md:flex items-center gap-6 h-full">
              {primaryLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  search={l.search as any}
                  className="text-[13px] font-medium tracking-tight text-ink-default/70 hover:text-ink-strong transition-colors outline-none"
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-ink-strong font-semibold" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Action Cluster — Continuous Utility Strip */}
          <div className="flex items-center gap-5 ml-auto">
            {/* Search — icon-only by default; clicking the icon expands an
                input. Same submit logic as before (navigates /search?q=...). */}
            <div className="relative flex items-center">
              {searchOpen ? (
                <form onSubmit={onSearch} className="flex relative items-center">
                  <Search className="absolute left-3.5 h-4 w-4 text-ink-muted" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    onBlur={() => {
                      if (!searchQ.trim()) setSearchOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchQ("");
                        setSearchOpen(false);
                      }
                    }}
                    placeholder="Search..."
                    className="h-10 w-48 rounded-full border border-border/60 bg-black/5 pl-10 pr-4 text-[13px] transition-all focus:bg-white focus:ring-1 focus:ring-orange-glow/20 outline-none"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10.5 px-3 items-center justify-center rounded-full text-ink-default/60 hover:text-ink-strong hover:bg-black/5 transition-all outline-none"
                  aria-label="Search"
                >
                  <Search className="h-[18px] w-[18px]" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {session ? (
                    // Signed in → round Avatar (uploaded image if present,
                    // initials-on-deterministic-color fallback otherwise).
                    <button
                      type="button"
                      aria-label={`Account · ${session.user.name}`}
                      className="rounded-full outline-none transition-all hover:opacity-85 focus-visible:ring-2 focus-visible:ring-orange-glow/30"
                    >
                      <Avatar src={session.user.avatarUrl} name={session.user.name} size={44} />
                    </button>
                  ) : (
                    // Signed out → unchanged icon + "Account" text trigger.
                    <button className="flex h-10.5 px-4 items-center justify-center gap-2.5 rounded-full text-ink-default/70 hover:text-ink-strong hover:bg-black/5 transition-all outline-none">
                      <User className="h-[18px] w-[18px]" />
                      <span className="hidden lg:inline text-[13px] font-medium tracking-tight">
                        Account
                      </span>
                    </button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-52 rounded-xl border-border/40 shadow-lg"
                >
                  {session ? (
                    <>
                      <DropdownMenuLabel className="px-4 py-3">
                        <span className="block text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-black mb-1">
                          Account
                        </span>
                        <div className="truncate text-sm font-semibold text-ink-strong">
                          {session.user.name}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer focus:bg-accent/50 text-[12px] font-medium py-2.5 px-4"
                      >
                        <Link to="/profile" className="flex items-center w-full">
                          <User className="mr-3 h-4 w-4 opacity-70" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      {session.user.role === "admin" && (
                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer focus:bg-accent/50 text-[12px] font-medium py-2.5 px-4"
                        >
                          <Link to="/admin/dashboard" className="flex items-center w-full">
                            <LayoutDashboard className="mr-3 h-4 w-4 opacity-70" />
                            Admin dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onSelect={() => logout.mutate()}
                        className="cursor-pointer focus:bg-red-500/5 text-red-500 text-[12px] font-bold py-2.5 px-4"
                      >
                        <LogOut className="mr-3 h-4 w-4 opacity-70" />
                        Sign out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    authLinks.map((l) => (
                      <DropdownMenuItem
                        key={l.to}
                        asChild
                        className="cursor-pointer focus:bg-accent/50 text-[12px] font-medium py-2.5 px-4"
                      >
                        <Link to={l.to} className="w-full">
                          {l.label}
                        </Link>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/cart"
                className="flex h-10.5 px-4 items-center justify-center gap-2.5 rounded-full text-ink-default/70 hover:text-ink-strong hover:bg-black/5 transition-all outline-none"
              >
                <div className="relative">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-glow px-1.5 text-[9px] font-black text-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-[13px] font-medium tracking-tight">
                  Cart
                </span>
              </Link>

              <div className="hidden lg:flex items-center ml-2 border-l border-border/10 pl-3">
                <ApiStatusDot />
              </div>

              {/* Mobile Menu Trigger */}
              <div className="flex items-center md:hidden ml-1">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <button className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-black/5 outline-none">
                      <Menu className="h-4 w-4 text-ink-default" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[min(20rem,85vw)] bg-background">
                    <nav className="mt-12 flex flex-col gap-1 px-4">
                      {primaryLinks.map((l) => (
                        <Link
                          key={l.label}
                          to={l.to}
                          search={l.search as any}
                          onClick={() => setMobileOpen(false)}
                          className="py-2.5 text-sm font-medium border-b border-border/5 text-ink-default hover:text-orange-glow"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
