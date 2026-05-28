import { useMemo } from "react";

import { useSession } from "@/features/auth/hooks/useSession";
import {
  useAddToServerCart,
  useClearServerCart,
  useRemoveServerCartItem,
  useServerCartQuery,
  useUpdateServerCartItem,
} from "../api";
import { useCartStore } from "../store";
import type { CartLine } from "../schema";

// Unified cart facade. Components don't care whether the user is signed in:
// they call `add` / `remove` / `setQuantity` / `clear` and read `lines`,
// `itemCount`, `subtotalCents` the same way.
//
//   session === undefined → still loading; treat as guest until known.
//   session === null      → guest. Use the local Zustand store.
//   session === Session   → signed in. Use the server cart via React Query.
export type CartFacade = {
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  isLoading: boolean;
  isSignedIn: boolean;
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export function useCart(): CartFacade {
  const session = useSession();
  const isSignedIn = Boolean(session);

  // Guest store (always subscribed so logging out reverts instantly).
  const guestLines = useCartStore((s) => s.lines);
  const guestAdd = useCartStore((s) => s.add);
  const guestRemove = useCartStore((s) => s.remove);
  const guestSet = useCartStore((s) => s.setQuantity);
  const guestClear = useCartStore((s) => s.clear);

  // Server cart — only fetches when authenticated.
  const serverQuery = useServerCartQuery(isSignedIn);
  const addMut = useAddToServerCart();
  const updateMut = useUpdateServerCartItem();
  const removeMut = useRemoveServerCartItem();
  const clearMut = useClearServerCart();

  const lines: CartLine[] = isSignedIn ? (serverQuery.data ?? []) : guestLines;

  const { itemCount, subtotalCents } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of lines) {
      count += l.quantity;
      subtotal += l.priceCents * l.quantity;
    }
    return { itemCount: count, subtotalCents: subtotal };
  }, [lines]);

  function add(input: Omit<CartLine, "quantity"> & { quantity?: number }) {
    const quantity = input.quantity ?? 1;
    if (isSignedIn) {
      addMut.mutate({ productId: input.productId, quantity });
    } else {
      guestAdd(input);
    }
  }

  function remove(productId: string) {
    if (isSignedIn) {
      removeMut.mutate(productId);
    } else {
      guestRemove(productId);
    }
  }

  function setQuantity(productId: string, quantity: number) {
    if (isSignedIn) {
      if (quantity <= 0) removeMut.mutate(productId);
      else updateMut.mutate({ productId, quantity });
    } else {
      guestSet(productId, quantity);
    }
  }

  function clear() {
    if (isSignedIn) {
      clearMut.mutate();
    } else {
      guestClear();
    }
  }

  return {
    lines,
    itemCount,
    subtotalCents,
    isLoading: isSignedIn ? serverQuery.isLoading : false,
    isSignedIn,
    add,
    remove,
    setQuantity,
    clear,
  };
}
