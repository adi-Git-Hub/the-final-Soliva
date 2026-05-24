import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { useCart } from "../hooks/useCart";

type Props = {
  onCheckout?: () => void;
};

export function CartSummary({ onCheckout }: Props) {
  const { subtotalCents: subtotal } = useCart();

  return (
    <div className="space-y-4 rounded-2xl border border-border/40 bg-card/40 p-5 sm:p-6 md:sticky md:top-24 md:self-start">
      <h3 className="font-display text-xl text-foreground">Order summary</h3>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium text-foreground">{formatMoney(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="text-right text-muted-foreground">Calculated at checkout</dd>
        </div>
      </dl>

      <div className="border-t border-border/40 pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="font-display text-2xl text-foreground">{formatMoney(subtotal)}</span>
        </div>
      </div>

      <Button size="lg" className="h-12 w-full" onClick={onCheckout} disabled={subtotal === 0}>
        Checkout
      </Button>
    </div>
  );
}
