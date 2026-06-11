import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Sun,
  User,
  Baby,
  Plane,
  Gift,
  Info,
  LayoutGrid,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Product Data (Mirrored from collection.tsx) ── */
const EDITIONS = [
  { id: "blush-pink", name: "Blush Pink", swatch: "#E4B7C6", image: "/product_images/pink-1.webp" },
  {
    id: "green-edition",
    name: "Olive Green",
    swatch: "#6A7038",
    image: "/product_images/olive-1.webp",
  },
  { id: "deep-blue", name: "Deep Blue", swatch: "#33508A", image: "/product_images/blue-1.webp" },
  {
    id: "classic-beige",
    name: "Classic Beige",
    swatch: "#D8C3A0",
    image: "/product_images/beige-1.webp",
  },
  { id: "zesty-lime", name: "Zesty Lime", swatch: "#AEC96B", image: "/product_images/lime-1.webp" },
];

const RECOMMENDATIONS = {
  available: [{ name: "SunWrap", to: "/collection", icon: Sun, color: "#B88445" }],
  future: [
    { name: "Men Series", icon: User, status: "Coming Soon", color: "#6A7038" },
    { name: "Kids Series", icon: Baby, status: "Coming Soon", color: "#E4B7C6" },
    { name: "Travel Series", icon: Plane, status: "Coming Soon", color: "#D8C3A0" },
    { name: "Gifting Series", icon: Gift, status: "Coming Soon", color: "#33508A" },
  ],
  explore: [
    { name: "How It Works", to: "/technology", icon: LayoutGrid, color: "#B88445" },
    { name: "Collection", to: "/collection", icon: BookOpen, color: "#B88445" },
    { name: "Our Story", to: "/story", icon: Info, color: "#B88445" },
  ],
};

/* ── Interactive 3D Card ── */
function SearchCard({
  children,
  to,
  onClick,
  color,
  className = "",
}: {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  color: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300",
        "hover:bg-white/10 hover:border-white/20",
        className,
      )}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: color }}
      />
      {children}
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="block perspective-1000">
        {content}
      </Link>
    );
  }
  return <div className="perspective-1000">{content}</div>;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* ── Live Filtering Logic ── */
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return EDITIONS.filter(
      (e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.id.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  /* ── Fuzzy Suggestion Logic ── */
  const suggestion = useMemo(() => {
    if (!query.trim() || results.length > 0) return null;
    // Simple logic: if query has > 2 chars and no exact results, find closest name
    return EDITIONS.find((e) =>
      e.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(query.toLowerCase().slice(0, 2))),
    );
  }, [query, results]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center bg-black/60"
        >
          {/* Animated Background Aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-[#B88445]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-white/5 rounded-full blur-[100px]" />
          </motion.div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white transition-colors z-[110]"
          >
            <X size={20} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ transformOrigin: "top right" }}
            className="w-full max-w-4xl px-6 pt-[15vh] relative z-[105]"
          >
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/30 h-8 w-8" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search Soliva..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none py-6 pl-14 text-4xl md:text-6xl font-display text-white placeholder:text-white/10 outline-none"
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#B88445] via-[#B88445]/20 to-transparent" />
            </div>

            {/* LIVE RESULTS OR RECOMMENDATIONS */}
            <div className="mt-16 overflow-y-auto max-h-[60vh] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-20">
              {query.trim() ? (
                <div className="space-y-12">
                  {/* Results List */}
                  {results.length > 0 ? (
                    <section>
                      <h3 className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-6 font-black">
                        Matches
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((item) => (
                          <Link
                            key={item.id}
                            to="/collection"
                            search={{ edition: item.id }}
                            onClick={onClose}
                            className="group flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            <div className="h-20 w-16 rounded-xl overflow-hidden bg-white/5 shrink-0 shadow-lg">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-white/90 text-xl font-display group-hover:text-[#B88445] transition-colors">
                                {item.name}
                              </span>
                              <span className="text-[0.65rem] uppercase tracking-widest text-white/30 font-black">
                                SunWrap™ Edition
                              </span>
                            </div>
                            <ArrowRight
                              size={16}
                              className="ml-auto text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-1"
                            />
                          </Link>
                        ))}
                      </div>
                    </section>
                  ) : (
                    /* Suggestions if no results */
                    <section className="flex flex-col items-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white/20">
                        <AlertCircle size={32} />
                      </div>
                      <h4 className="text-white/40 font-display text-2xl">
                        No direct matches found.
                      </h4>
                      {suggestion && (
                        <div className="mt-4">
                          <span className="text-white/30 text-sm">Did you mean </span>
                          <button
                            onClick={() => setQuery(suggestion.name)}
                            className="text-[#B88445] text-sm font-bold border-b border-[#B88445]/20 hover:border-[#B88445] transition-all ml-1"
                          >
                            {suggestion.name}?
                          </button>
                        </div>
                      )}
                    </section>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* AVAILABLE NOW */}
                  <section>
                    <h3 className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-6 font-black">
                      Available Now
                    </h3>
                    <div className="space-y-3">
                      {RECOMMENDATIONS.available.map((item) => (
                        <SearchCard
                          key={item.name}
                          to={item.to}
                          onClick={onClose}
                          color={item.color}
                        >
                          <div className="h-10 w-10 rounded-xl bg-[#B88445]/20 flex items-center justify-center text-[#B88445]">
                            <item.icon size={20} />
                          </div>
                          <span className="text-white/80 font-medium group-hover:text-white transition-colors relative z-10">
                            {item.name}
                          </span>
                          <ArrowRight
                            size={14}
                            className="ml-auto text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-1 relative z-10"
                          />
                        </SearchCard>
                      ))}
                    </div>
                  </section>

                  {/* FUTURE COLLECTION */}
                  <section>
                    <h3 className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-6 font-black">
                      Future Collection
                    </h3>
                    <div className="space-y-3">
                      {RECOMMENDATIONS.future.map((item) => (
                        <SearchCard
                          key={item.name}
                          color={item.color}
                          className="opacity-60 grayscale group"
                        >
                          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 relative z-10">
                            <item.icon size={20} />
                          </div>
                          <div className="flex flex-col relative z-10">
                            <span className="text-white/60 text-sm font-medium">{item.name}</span>
                            <span className="text-[0.6rem] uppercase tracking-wider text-white/30 font-black">
                              {item.status}
                            </span>
                          </div>
                        </SearchCard>
                      ))}
                    </div>
                  </section>

                  {/* EXPLORE */}
                  <section>
                    <h3 className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-white/40 mb-6 font-black">
                      Explore
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {RECOMMENDATIONS.explore.map((item) => (
                        <SearchCard
                          key={item.name}
                          to={item.to}
                          onClick={onClose}
                          color={item.color}
                          className="bg-transparent border-transparent"
                        >
                          <item.icon
                            size={18}
                            className="text-white/30 group-hover:text-[#B88445] transition-colors relative z-10"
                          />
                          <span className="text-white/60 text-sm group-hover:text-white transition-colors relative z-10">
                            {item.name}
                          </span>
                        </SearchCard>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
