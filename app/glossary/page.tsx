import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { glossary } from "@/data/glossary";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Football culture, defined. Kop, Tifo, Curva Nord, derby — the terms supporters use, and where they come from.",
  alternates: { canonical: `${SITE.url}/glossary` },
};

export default function GlossaryIndex() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Glossary" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Glossary
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            The terms that make football football. Short definitions, longer context, links back to the stadiums where they apply.
          </p>
        </header>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {sorted.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/glossary/${g.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <div className="max-w-2xl">
                  <p className="font-display text-xl text-foreground group-hover:underline">
                    {g.term}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {g.definition}
                  </p>
                </div>
                <span aria-hidden className="text-foreground/40 group-hover:text-foreground">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: "Glossary",
            description: metadata.description as string,
            url: "/glossary",
            items: sorted.map((g) => ({
              name: g.term,
              href: `/glossary/${g.slug}`,
            })),
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Glossary", href: "/glossary" },
          ]),
        ]}
      />
    </div>
  );
}
