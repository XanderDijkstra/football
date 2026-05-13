import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Cart" }]} />
        <header className="mt-3">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Your cart
          </h1>
        </header>
        <div className="mt-12">
          <CartView />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
