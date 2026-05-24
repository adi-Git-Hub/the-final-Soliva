import { Link } from "@tanstack/react-router";

import type { Category } from "../schema";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.slug }}
      className="group relative block overflow-hidden rounded-2xl"
      preload="intent"
    >
      <div className="aspect-[5/6] bg-secondary">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent p-5 text-white">
        <h3 className="font-display text-2xl leading-tight">{category.name}</h3>
        <p className="mt-1 text-xs text-white/80">
          {category.productCount} {category.productCount === 1 ? "item" : "items"}
        </p>
      </div>
    </Link>
  );
}
