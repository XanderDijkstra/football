"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/store";

export function CheckoutSuccessSideEffect() {
  const clear = useCart((s) => s.clear);
  const hasHydrated = useCart((s) => s.hasHydrated);

  useEffect(() => {
    if (hasHydrated) clear();
  }, [hasHydrated, clear]);

  return null;
}
