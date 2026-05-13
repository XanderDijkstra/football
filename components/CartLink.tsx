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
      className="text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground inline-flex items-center gap-2"
    >
      <span>Cart</span>
      {hasHydrated && count > 0 && (
        <span
          aria-hidden
          className="inline-flex h-5 min-w-5 px-1.5 items-center justify-center rounded-sm bg-accent text-accent-foreground text-[10px] font-bold font-numeric"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
