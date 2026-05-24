import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import type { Product } from "../schema";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: Props) {
  const onSale = product.compareAtCents != null && product.compareAtCents > product.priceCents;

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
      preload="intent"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          width={600}
          height={750}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && <Badge variant="default">Sale</Badge>}
          {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-display text-lg leading-tight text-foreground">{product.name}</h3>
        <PriceDisplay
          priceCents={product.priceCents}
          compareAtCents={product.compareAtCents}
          currency={product.currency}
          size="sm"
        />
      </div>
    </Link>
  );
}
