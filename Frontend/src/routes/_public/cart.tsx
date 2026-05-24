import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/features/cart/components/CartLineItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
import { useSession } from "@/features/auth/hooks/useSession";
import { EmptyState } from "@/components/shared/EmptyState";

export const Route = createFileRoute("/_public/cart")({
  component: CartRoute,
});

function CartRoute() {
  const { lines } = useCart();
  const session = useSession();

  function onCheckout() {
    if (!session) {
      toast.message("Sign in to continue to checkout");
      return;
    }
    // Phase 2 — wire to /checkout when the route lands
    toast.info("Checkout coming in Phase 2");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:px-8 md:py-16 safe-x">
      <header className="mb-6 sm:mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-foreground md:text-5xl">Cart</h1>
      </header>

      {lines.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your cart is empty"
          description="Browse the collection and add a piece you love."
          action={
            <Button asChild>
              <Link to="/products" search={{ sort: "newest" }}>
                Shop all
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 sm:gap-10 md:grid-cols-[1fr_360px]">
          <div>
            {lines.map((line) => (
              <CartLineItem key={line.productId} line={line} />
            ))}
          </div>
          <CartSummary onCheckout={onCheckout} />
        </div>
      )}
    </div>
  );
}
