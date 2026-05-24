import { useEffect, useMemo, useState } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

export function Particles({ count = 20, className = "" }: ParticlesProps) {
  // Render nothing on the server and on first client paint. Math.random() in
  // useMemo produced different values on server vs client, triggering a React
  // hydration mismatch warning and replacing the entire subtree.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [count],
  );

  if (!mounted) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
