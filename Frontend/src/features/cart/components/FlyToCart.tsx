import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type Flight = {
  id: string;
  image: string;
  startRect: DOMRect;
  endRect: DOMRect;
};

type FlyToCartContextType = {
  flyToCart: (image: string, source: React.MouseEvent | HTMLElement) => void;
};

const FlyToCartContext = createContext<FlyToCartContextType | null>(null);

export const useFlyToCart = () => {
  const context = useContext(FlyToCartContext);
  if (!context) throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return context;
};

export function FlyToCartProvider({ children, onComplete }: { children: ReactNode, onComplete?: () => void }) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const flightIdCounter = useRef(0);

  const flyToCart = useCallback((image: string, source: React.MouseEvent | HTMLElement) => {
    const target = document.getElementById("cart-icon-target");
    if (!target) return;

    let startRect: DOMRect;
    if ("getBoundingClientRect" in source) {
      startRect = source.getBoundingClientRect();
    } else {
      const el = source.currentTarget as HTMLElement;
      startRect = el.getBoundingClientRect();
    }
    
    const endRect = target.getBoundingClientRect();
    
    const newFlight: Flight = {
      id: `flight-${flightIdCounter.current++}`,
      image,
      startRect,
      endRect,
    };

    setFlights((prev) => [...prev, newFlight]);
  }, []);

  const handleComplete = (id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
    
    // Trigger pulse on the target icon
    const target = document.getElementById("cart-icon-target");
    if (target) {
      target.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.2)" },
          { transform: "scale(1)" }
        ],
        { duration: 300, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
      );
    }

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <FlyToCartContext.Provider value={{ flyToCart }}>
      {children}
      {typeof window !== "undefined" && createPortal(
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <AnimatePresence>
            {flights.map((flight) => (
              <FlightAnimation
                key={flight.id}
                flight={flight}
                onComplete={() => handleComplete(flight.id)}
              />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </FlyToCartContext.Provider>
  );
}

function FlightAnimation({ flight, onComplete }: { flight: Flight; onComplete: () => void }) {
  const { startRect, endRect } = flight;
  
  // Center points
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  // Use fixed size for animation to avoid distortion
  const size = Math.min(startRect.width, 200);

  // We animate X with linear ease and Y with easeIn to create an arc
  return (
    <motion.div
      initial={{ 
        x: startX - size / 2, 
        y: startY - size / 2, 
        scale: 1,
        opacity: 1
      }}
      animate={{ 
        x: endX - size / 2, 
        y: endY - size / 2,
        scale: 0.1,
        opacity: 0.5
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1], // Custom curve
        scale: { duration: 0.8, ease: "easeIn" },
        opacity: { duration: 0.8, ease: "easeIn" }
      }}
      onAnimationComplete={onComplete}
      className="absolute flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.img
        src={flight.image}
        initial={{ rotate: 0 }}
        animate={{ rotate: 5 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full object-cover mix-blend-multiply"
      />
    </motion.div>
  );
}
