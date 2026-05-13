"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart/store";
import { formatPrice } from "@/data/products";

export function CartView() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.total());
  const hasHydrated = useCart((s) => s.hasHydrated);
  const [checkoutPending, setCheckoutPending] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function startCheckout() {
    setCheckoutError(null);
    setCheckoutPending(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({
            stadiumSlug: it.stadiumSlug,
            stadiumName: it.stadiumName,
            productSlug: it.productSlug,
            frameColorLabel: it.frameColorLabel,
            sizeLabel: it.sizeLabel,
            priceGbp: it.priceGbp,
            qty: it.qty,
            personalisation: it.personalisation,
            hasCustomImage: !!it.customImageDataUrl,
          })),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Checkout failed (${res.status})`);
      }
      const data = (await res.json()) as { url: string };
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed");
      setCheckoutPending(false);
    }
  }

  if (!hasHydrated) {
    return <div className="h-[400px]" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <div className="border border-border rounded p-10 bg-surface text-center">
        <p className="font-display text-2xl text-foreground">Your cart is empty.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Pick a stadium, frame it, see it on your wall.
        </p>
        <Link
          href="/build"
          className="inline-flex mt-6 h-11 items-center px-5 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90"
        >
          Open the builder
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
      <ul className="divide-y divide-border border-y border-border">
        {items.map((it) => (
          <li key={it.id} className="py-5 flex items-start gap-4">
            <div className="h-20 w-16 bg-background border border-border rounded-sm flex items-center justify-center overflow-hidden">
              {it.customImageDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.customImageDataUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-xs text-muted-foreground text-center px-1">
                  {it.stadiumName}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-base text-foreground">
                {it.stadiumName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {it.frameColorLabel} · {it.sizeLabel} · {it.dimensionsCm}
              </p>
              {it.personalisation && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  "{it.personalisation}"
                </p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => updateQty(it.id, it.qty - 1)}
                  aria-label="Decrease quantity"
                  className="h-8 w-8 border border-border rounded flex items-center justify-center hover:border-foreground"
                  disabled={it.qty <= 1}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span
                  aria-label="Quantity"
                  className="font-numeric text-sm min-w-[1.5rem] text-center"
                >
                  {it.qty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQty(it.id, it.qty + 1)}
                  aria-label="Increase quantity"
                  className="h-8 w-8 border border-border rounded flex items-center justify-center hover:border-foreground"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  className="ml-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </div>
            <p className="font-numeric text-foreground whitespace-nowrap">
              {formatPrice(it.priceGbp * it.qty)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="bg-surface border border-border rounded p-6">
          <h2 className="font-display text-xl text-foreground">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="text-foreground font-numeric">{formatPrice(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-foreground">Calculated at checkout</dd>
            </div>
          </dl>
          <div className="mt-6 pt-4 border-t border-border flex justify-between">
            <p className="font-display text-base text-foreground">Total</p>
            <p className="font-display text-xl text-foreground font-numeric">
              {formatPrice(total)}
            </p>
          </div>
          <button
            type="button"
            onClick={startCheckout}
            disabled={checkoutPending}
            className="mt-6 w-full h-12 rounded-sm bg-accent text-accent-foreground font-bold uppercase tracking-wider text-sm hover:bg-accent/90 disabled:opacity-60"
          >
            {checkoutPending ? "Redirecting…" : "Proceed to checkout"}
          </button>
          {checkoutError && (
            <p role="alert" className="mt-3 text-xs text-danger">
              {checkoutError}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Made on demand. UK delivery 5–7 working days, EU 7–10. Free returns within 30 days.
          </p>
        </div>
      </aside>
    </div>
  );
}
