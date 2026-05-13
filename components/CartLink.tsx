"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/store";

export function CartLink() {
  const count = useCart((s) => s.count());
  const hasHydrated = useCart((s) => s.hasHydrated);
  return (
    <Link
      href="/cart"
      aria-label={hasHydrated ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart"}
      className="text-sm text-foreground/80 hover:text-foreground inline-flex items-center gap-1"
    >
      <span>Cart</span>
      {hasHydrated && count > 0 && (
        <span
          aria-hidden
          className="inline-flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-numeric"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
