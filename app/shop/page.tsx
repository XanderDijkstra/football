import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { JsonLd } from "@/components/JsonLd";
import { stadiums } from "@/data/stadiums";
import { products, formatPrice } from "@/data/products";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop — All Framed Football Prints",
  description:
    "Every framed football print on the site. Pick a stadium and a frame: oak, black or white in A3, A2, A1 or 50×70 cm.",
  alternates: { canonical: `${SITE.url}/shop` },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Shop" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            All framed football prints
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            One frame at a time. Pick a stadium below for the print itself, or jump to a frame variant for the spec sheet.
          </p>
        </header>

        <section className="mt-12 md:mt-16">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
            By stadium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stadiums.map((s) => (
              <StadiumCard key={s.slug} stadium={s} />
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
            By frame
          </h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex items-center justify-between gap-4 p-5 bg-surface border border-border rounded hover:border-foreground"
                >
                  <div>
                    <p className="font-display text-base text-foreground">
                      {p.frameColorLabel} · {p.sizeLabel}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {p.dimensionsCm}
                    </p>
                  </div>
                  <p className="font-numeric text-foreground">
                    {formatPrice(p.priceGbp)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: "All framed football prints",
            description: metadata.description as string,
            url: "/shop",
            items: [
              ...stadiums.map((s) => ({
                name: s.name,
                href: `/stadiums/${s.slug}`,
              })),
              ...products.map((p) => ({
                name: `${p.frameColorLabel} ${p.sizeLabel}`,
                href: `/products/${p.slug}`,
              })),
            ],
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
          ]),
        ]}
      />
    </div>
  );
}
