import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { JsonLd } from "@/components/JsonLd";
import { clubs, getClub } from "@/data/clubs";
import { getStadium } from "@/data/stadiums";
import { getCity } from "@/data/cities";
import { SITE } from "@/lib/utils";
import { breadcrumbList, collectionPage, faqPage } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) return {};
  const stadium = getStadium(club.stadiumSlug);
  const title = `${club.name} Wall Art & Framed Prints`;
  const description = stadium
    ? `Framed prints celebrating ${club.name} and ${stadium.name}. Stadium maps, framing options and gift-ready delivery across the UK and EU.`
    : `Framed prints celebrating ${club.name}. UK and EU delivery.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/clubs/${club.slug}` },
  };
}

export default async function ClubPage({ params }: Props) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();
  const stadium = getStadium(club.stadiumSlug);
  const city = getCity(club.city.slug);
  const related = club.related
    .map((s) => getClub(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs
          items={[{ label: "Clubs", href: "/clubs" }, { label: club.name }]}
        />
        <header className="mt-3 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {club.city.name} · est. {club.founded}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground mt-3">
            {club.name} framed prints and wall art
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-4">
            {club.intro}
          </p>
        </header>

        <div className="max-w-3xl mx-auto mt-12 md:mt-16 space-y-16">
          {stadium && (
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Prints featuring {club.name}
              </h2>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                Our {club.name} print is a framed map of {stadium.name}, the
                ground where they play.{" "}
                <Link
                  href={`/stadiums/${stadium.slug}`}
                  className="underline hover:text-foreground"
                >
                  See the {stadium.name} print
                </Link>
                .
              </p>
              <div className="mt-8 max-w-xs">
                <StadiumCard stadium={stadium} />
              </div>
            </section>
          )}

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              About the club
            </h2>
            <p className="mt-5 text-foreground/90 leading-relaxed">{club.about}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Common questions
            </h2>
            <Faq items={club.faqs} />
          </section>

          <section className="grid sm:grid-cols-3 gap-4 text-sm">
            {stadium && (
              <Link
                href={`/stadiums/${stadium.slug}`}
                className="block p-5 bg-surface border border-border rounded hover:border-foreground"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Stadium
                </p>
                <p className="font-serif text-lg text-foreground mt-1">
                  {stadium.name}
                </p>
              </Link>
            )}
            {city && (
              <Link
                href={`/cities/${city.slug}`}
                className="block p-5 bg-surface border border-border rounded hover:border-foreground"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  City
                </p>
                <p className="font-serif text-lg text-foreground mt-1">
                  {city.name}
                </p>
              </Link>
            )}
            <Link
              href="/blog/gift-guide-football-fan"
              className="block p-5 bg-surface border border-border rounded hover:border-foreground"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Read
              </p>
              <p className="font-serif text-lg text-foreground mt-1">
                Gift guide: football fans
              </p>
            </Link>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-20 md:mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              Other clubs
            </h2>
            <ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/clubs/${c.slug}`}
                    className="flex items-center justify-between gap-4 p-5 bg-surface border border-border rounded hover:border-foreground"
                  >
                    <span className="font-serif text-base text-foreground">
                      {c.name}
                    </span>
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          collectionPage({
            name: club.name,
            description: club.intro,
            url: `/clubs/${club.slug}`,
            items: stadium
              ? [{ name: stadium.name, href: `/stadiums/${stadium.slug}` }]
              : [],
          }),
          faqPage(club.faqs),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Clubs", href: "/clubs" },
            { name: club.name, href: `/clubs/${club.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
