import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { glossary, getGlossaryTerm } from "@/data/glossary";
import { getStadium } from "@/data/stadiums";
import { SITE } from "@/lib/utils";
import { breadcrumbList, definedTerm } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossary.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGlossaryTerm(slug);
  if (!g) return {};
  return {
    title: `${g.term} — What It Means in Football`,
    description: g.definition,
    alternates: { canonical: `${SITE.url}/glossary/${g.slug}` },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const g = getGlossaryTerm(slug);
  if (!g) notFound();

  const stadiums = g.appearsAt
    .map((s) => getStadium(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const related = g.related
    .map((s) => getGlossaryTerm(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs
          items={[{ label: "Glossary", href: "/glossary" }, { label: g.term }]}
        />
        <article className="max-w-3xl mx-auto mt-3">
          <header>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">
              {g.term}
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              {g.definition}
            </p>
          </header>

          <div className="mt-12 prose-content">
            <p className="text-foreground/90 leading-relaxed text-base md:text-lg">
              {g.body}
            </p>
          </div>

          {stadiums.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Appears at
              </h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {stadiums.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/stadiums/${s.slug}`}
                      className="block p-4 bg-surface border border-border rounded hover:border-foreground"
                    >
                      <p className="font-serif text-base text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.city.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Related terms
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/glossary/${r.slug}`}
                      className="inline-flex h-10 items-center px-4 rounded border border-border text-foreground hover:border-foreground"
                    >
                      {r.term}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          definedTerm({
            term: g.term,
            description: g.definition,
            url: `/glossary/${g.slug}`,
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Glossary", href: "/glossary" },
            { name: g.term, href: `/glossary/${g.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
