import { SkeletonCard } from "@/design-system/loading";

import { ProductCard } from "./ProductCard";
import type { Product } from "../schema";

type Props = {
  products: Product[];
  loading?: boolean;
};

export function ProductGrid({ products, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} variant="product" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
