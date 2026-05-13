import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { JsonLd } from "@/components/JsonLd";
import { stadiums } from "@/data/stadiums";
import { SITE } from "@/lib/utils";
import {
  breadcrumbList,
  collectionPage,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "All Stadiums",
  description:
    "Every framed stadium map print on the site. Premier League, La Liga, Bundesliga, Serie A and more — pick a ground and preview it framed.",
  alternates: { canonical: `${SITE.url}/stadiums` },
};

export default function StadiumsIndex() {
  const grouped = groupByCountry(stadiums);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: "Stadiums" }]} />
        <header className="mt-3 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Every stadium we frame.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            A growing catalogue of stadium map prints, framed in oak, black or white. Start with one of the grounds below, or open the builder.
          </p>
        </header>

        <div className="mt-12 md:mt-16 space-y-16">
          {grouped.map(([country, list]) => (
            <section key={country}>
              <h2 className="font-display text-2xl text-foreground mb-6">{country}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {list.map((s) => (
                  <StadiumCard key={s.slug} stadium={s} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: "All Stadiums",
            description: metadata.description as string,
            url: "/stadiums",
            items: stadiums.map((s) => ({
              name: s.name,
              href: `/stadiums/${s.slug}`,
            })),
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Stadiums", href: "/stadiums" },
          ]),
        ]}
      />
    </div>
  );
}

function groupByCountry(list: typeof stadiums) {
  const map = new Map<string, typeof stadiums>();
  for (const s of list) {
    const arr = map.get(s.country) ?? [];
    arr.push(s);
    map.set(s.country, arr);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}
