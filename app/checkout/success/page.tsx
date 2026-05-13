import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckoutSuccessSideEffect } from "@/components/cart/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Check aria-hidden className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-foreground mt-6">
            Your order's in the studio.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            We're framing your print now. You'll get an email when it ships — UK in 5–7 working days, EU in 7–10.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/stadiums"
              className="inline-flex h-12 items-center px-6 rounded border border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Browse more stadiums
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center px-6 rounded bg-foreground text-background font-medium hover:bg-foreground/90"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <CheckoutSuccessSideEffect />
    </div>
  );
}
