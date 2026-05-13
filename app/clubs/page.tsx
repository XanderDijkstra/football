import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { clubs } from "@/data/clubs";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "All Clubs",
  description:
    "Framed prints by club: Premier League, La Liga, Bundesliga and more. Pick your team and see their stadium framed.",
  alternates: { canonical: `${SITE.url}/clubs` },
};

export default function ClubsIndex({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Clubs" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-serif text-3xl md:text-5xl text-foreground">
            Find your club.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            Every club we currently frame, sorted by country. Pick yours to see what prints are available.
          </p>
        </header>

        <ClubsBody searchParams={searchParams} />
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: "All Clubs",
            description: metadata.description as string,
            url: "/clubs",
            items: clubs.map((c) => ({
              name: c.name,
              href: `/clubs/${c.slug}`,
            })),
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Clubs", href: "/clubs" },
          ]),
        ]}
      />
    </div>
  );
}

async function ClubsBody({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").trim().toLowerCase();
  const filtered = q
    ? clubs.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.name.toLowerCase().includes(q) ||
          (c.nickname?.toLowerCase().includes(q) ?? false)
      )
    : clubs;

  const grouped = new Map<string, typeof clubs>();
  for (const c of filtered) {
    const arr = grouped.get(c.country) ?? [];
    arr.push(c);
    grouped.set(c.country, arr);
  }

  return (
    <>
      <form
        role="search"
        aria-label="Club search"
        className="mt-8 flex gap-2 max-w-md"
        action="/clubs"
      >
        <label htmlFor="clubs-search" className="sr-only">
          Search clubs
        </label>
        <input
          id="clubs-search"
          name="q"
          defaultValue={q}
          type="search"
          placeholder="Liverpool, Real Madrid, Dortmund…"
          className="flex-1 h-11 px-4 rounded bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="h-11 px-5 rounded bg-foreground text-background font-medium"
        >
          Search
        </button>
      </form>

      {filtered.length === 0 ? (
        <p className="mt-12 text-muted-foreground">
          No clubs found for "{q}". Try a different name or{" "}
          <Link href="/clubs" className="underline">clear the search</Link>.
        </p>
      ) : (
        <div className="mt-12 space-y-12">
          {Array.from(grouped.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([country, list]) => (
              <section key={country}>
                <h2 className="font-serif text-2xl text-foreground mb-6">{country}</h2>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/clubs/${c.slug}`}
                        className="block p-5 bg-surface border border-border rounded hover:border-foreground transition-colors"
                      >
                        <p className="font-serif text-lg text-foreground">{c.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {c.city.name} · est. {c.founded}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      )}
    </>
  );
}
