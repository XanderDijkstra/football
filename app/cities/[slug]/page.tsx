import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { JsonLd } from "@/components/JsonLd";
import { cities, getCity } from "@/data/cities";
import { getStadium } from "@/data/stadiums";
import { getClub } from "@/data/clubs";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const clubsHere = city.clubSlugs
    .map((s) => getClub(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const description = `Framed football prints of every ${city.name} stadium and club. ${
    clubsHere.slice(0, 2).map((c) => c.name).join(", ")
  } and more, framed and shipped across Europe.`;
  return {
    title: `Football Prints from ${city.name}`,
    description,
    alternates: { canonical: `${SITE.url}/cities/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const stadiumsHere = city.stadiumSlugs
    .map((s) => getStadium(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const clubsHere = city.clubSlugs
    .map((s) => getClub(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs items={[{ label: city.name }]} />
        <header className="mt-3 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {city.country}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground mt-3">
            Football frames from {city.name}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            {city.intro}
          </p>
        </header>

        <div className="mt-12 md:mt-16 space-y-16 md:space-y-20">
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              About football in {city.name}
            </h2>
            <p className="mt-5 text-foreground/90 leading-relaxed max-w-3xl">
              {city.about}
            </p>
          </section>

          {stadiumsHere.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                Stadiums in {city.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stadiumsHere.map((s) => (
                  <StadiumCard key={s.slug} stadium={s} />
                ))}
              </div>
            </section>
          )}

          {clubsHere.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                Clubs in {city.name}
              </h2>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {clubsHere.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/clubs/${c.slug}`}
                      className="block p-5 bg-surface border border-border rounded hover:border-foreground"
                    >
                      <p className="font-serif text-lg text-foreground">{c.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        est. {c.founded}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: `Football in ${city.name}`,
            description: city.intro,
            url: `/cities/${city.slug}`,
            items: [
              ...stadiumsHere.map((s) => ({
                name: s.name,
                href: `/stadiums/${s.slug}`,
              })),
              ...clubsHere.map((c) => ({
                name: c.name,
                href: `/clubs/${c.slug}`,
              })),
            ],
          }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: city.name, href: `/cities/${city.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
