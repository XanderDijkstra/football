import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { products, getProduct, formatPrice } from "@/data/products";
import { stadiums } from "@/data/stadiums";
import { SITE } from "@/lib/utils";
import {
  breadcrumbList,
  faqPage,
  product as productSchema,
} from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = `${p.frameColorLabel} Framed Football Print — ${p.sizeLabel}`;
  const description = `${p.frameColorLabel} framed football print in ${p.sizeLabel}. ${p.paper}. Available for every Premier League and major European stadium.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: `${p.frameColorLabel} ${p.sizeLabel}` },
          ]}
        />

        <section className="mt-3 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="aspect-[4/5] bg-surface rounded-sm overflow-hidden border border-border relative">
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div
                className={`w-full h-full bg-foreground/[0.04] border-[16px] ${
                  p.frameColor === "oak"
                    ? "border-amber-900/70"
                    : p.frameColor === "white"
                    ? "border-foreground/15"
                    : "border-foreground/85"
                }`}
              >
                <div className="w-full h-full bg-surface border border-border" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {p.frameColorLabel} · {p.sizeLabel}
            </p>
            <h1 className="font-display text-3xl md:text-5xl text-foreground mt-3">
              {p.frameColorLabel} framed football prints — {p.sizeLabel}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-md">
              {p.intro}
            </p>
            <p className="font-display text-3xl text-foreground mt-6 font-numeric">
              {formatPrice(p.priceGbp)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/build?frame=${p.frameColor}&size=${p.size}`}
                className="inline-flex h-12 items-center gap-2 px-6 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90"
              >
                Open the builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/stadiums"
                className="inline-flex h-12 items-center px-6 rounded border border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                Pick a stadium
              </Link>
            </div>

            <dl className="mt-10 border-t border-border pt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Frame</dt>
                <dd className="text-foreground mt-1">{p.frameColorLabel} ash, FSC-certified</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Size</dt>
                <dd className="text-foreground mt-1 font-numeric">{p.dimensionsCm}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Glazing</dt>
                <dd className="text-foreground mt-1">{p.glazing}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Paper</dt>
                <dd className="text-foreground mt-1">{p.paper}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">Mounting</dt>
                <dd className="text-foreground mt-1">{p.mounting}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="max-w-3xl mx-auto mt-16 md:mt-24 space-y-16">
          <section>
            <h2 className="font-display text-2xl md:text-3xl text-foreground">
              Available in this format
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every stadium on the site can be printed in this frame and size.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {stadiums.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/stadiums/${s.slug}`}
                    className="block p-4 bg-surface border border-border rounded hover:border-foreground"
                  >
                    <p className="font-display text-base text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {s.club.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
              Common questions
            </h2>
            <Faq items={p.faqs} />
          </section>
        </div>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          productSchema({
            name: `${p.frameColorLabel} framed football print, ${p.sizeLabel}`,
            description: p.intro,
            url: `/products/${p.slug}`,
            sku: p.slug,
            priceGbp: p.priceGbp,
          }),
          faqPage(p.faqs),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
            { name: `${p.frameColorLabel} ${p.sizeLabel}`, href: `/products/${p.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
