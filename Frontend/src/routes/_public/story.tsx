import { createFileRoute } from "@tanstack/react-router";

// Minimal placeholder. Real long-form brand story lands later.
export const Route = createFileRoute("/_public/story")({
  component: StoryRoute,
});

function StoryRoute() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 md:px-12 md:py-32 safe-x">
      <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
        <span className="block h-px w-5 sm:w-6 bg-brown/20" />
        <span className="font-mono text-micro-sm sm:text-micro-md tracking-luxe sm:tracking-editorial text-orange-glow uppercase font-bold">
          THE STORY
        </span>
      </div>
      <h1
        className="font-display text-brown-deep tracking-tight leading-hero"
        style={{ fontSize: "clamp(2.25rem, 9vw, 4.5rem)" }}
      >
        Engineered in India.
      </h1>
      <p className="mt-4 max-w-xl text-sm sm:text-base text-ink-soft font-light italic">
        The making of Soliva — calibrated for the streets it was built for.
        Full narrative to follow.
      </p>
    </div>
  );
}
