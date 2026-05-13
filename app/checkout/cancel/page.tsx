import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Checkout cancelled.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Your cart's still there. Pick up where you left off whenever you're ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/cart"
              className="inline-flex h-12 items-center px-6 rounded bg-foreground text-background font-medium hover:bg-foreground/90"
            >
              Back to cart
            </Link>
            <Link
              href="/build"
              className="inline-flex h-12 items-center px-6 rounded border border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Keep building
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
