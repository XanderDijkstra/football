import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getStadium, stadiums } from "@/data/stadiums";
import { getClub } from "@/data/clubs";
import { getCity } from "@/data/cities";
import { products, formatPrice } from "@/data/products";
import { getGlossaryTerm } from "@/data/glossary";
import { SITE } from "@/lib/utils";
import {
  breadcrumbList,
  faqPage,
  place,
  product as productSchema,
} from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stadiums.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stadium = getStadium(slug);
  if (!stadium) return {};

  const title = `${stadium.name} Print & Framed Map`;
  const description = `A framed map print of ${stadium.name}, home of ${stadium.club.name}. Choose oak, black or white framing in A3, A2, A1 or 50×70 cm. Delivered framed and ready to hang.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/stadiums/${stadium.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function StadiumPage({ params }: Props) {
  const { slug } = await params;
  const stadium = getStadium(slug);
  if (!stadium) notFound();

  const club = getClub(stadium.club.slug);
  const city = getCity(stadium.city.slug);
  const relatedStadiums = stadium.related
    .map((s) => getStadium(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const startingFrom = Math.min(...products.map((p) => p.priceGbp));
  const glossaryTerms = stadium.glossaryTerms
    .map((t) => getGlossaryTerm(t))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container py-6 md:py-8">
        <Breadcrumbs
          items={[
            { label: "Stadiums", href: "/stadiums" },
            { label: stadium.name },
          ]}
        />

        {/* Hero */}
        <section className="mt-3 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {stadium.country} · {stadium.city.name}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground mt-3">
              {stadium.name} framed prints
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-lg">
              {stadium.intro}
            </p>
            <div className="mt-6 flex items-baseline gap-3">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-serif text-2xl text-foreground font-numeric">
                {formatPrice(startingFrom)}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/build?stadium=${stadium.slug}`}
                className="inline-flex h-12 items-center gap-2 px-6 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90"
              >
                Build your {stadium.name} print
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center px-6 rounded border border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                See all frame options
              </Link>
            </div>
          </div>

          <div className="aspect-[4/5] bg-cream rounded overflow-hidden border border-border relative">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full bg-foreground/[0.04] border-[14px] border-foreground/85">
                <div className="w-full h-full bg-surface border border-border flex flex-col items-center justify-center p-6">
                  <MapPin aria-hidden className="h-6 w-6 text-foreground/40" />
                  <p className="font-serif text-xl text-foreground mt-3 text-center">
                    {stadium.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-numeric">
                    {stadium.lat.toFixed(4)}° {stadium.lat >= 0 ? "N" : "S"} ·{" "}
                    {Math.abs(stadium.lng).toFixed(4)}° {stadium.lng >= 0 ? "E" : "W"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto mt-16 md:mt-24 space-y-16 md:space-y-20">
          {/* About */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              About {stadium.name}
            </h2>
            <p className="mt-5 text-base text-foreground/90 leading-relaxed">
              {stadium.about}
            </p>
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-6">
              {stadium.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="font-serif text-lg text-foreground mt-1 font-numeric">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            {stadium.architect && (
              <p className="text-sm text-muted-foreground mt-4">
                Architect: {stadium.architect}
              </p>
            )}
          </section>

          {/* What's on the map */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              What's on the map
            </h2>
            <p className="mt-5 text-base text-foreground/90 leading-relaxed">
              {stadium.whatsOnMap}
            </p>
            {glossaryTerms.length > 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                Mentioned in the print:{" "}
                {glossaryTerms.map((g, i) => (
                  <span key={g.slug}>
                    <Link href={`/glossary/${g.slug}`} className="underline hover:text-foreground">
                      {g.term}
                    </Link>
                    {i < glossaryTerms.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </section>

          {/* Frame options */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground">
              Frame options
            </h2>
            <p className="mt-5 text-base text-muted-foreground max-w-prose">
              Three frame colours, four sizes. All FSC-certified, hand-assembled in the UK with anti-glare glass.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex items-center justify-between gap-4 p-4 bg-surface border border-border rounded hover:border-foreground transition-colors"
                  >
                    <div>
                      <p className="font-serif text-base text-foreground">
                        {p.frameColorLabel} · {p.sizeLabel}
                      </p>
                      <p className="text-xs text-muted-foreground">{p.dimensionsCm}</p>
                    </div>
                    <p className="font-numeric text-foreground">{formatPrice(p.priceGbp)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              Common questions
            </h2>
            <Faq items={stadium.faqs} />
          </section>

          {/* Related cluster */}
          <section className="grid sm:grid-cols-3 gap-4 text-sm">
            {club && (
              <Link
                href={`/clubs/${club.slug}`}
                className="block p-5 bg-surface border border-border rounded hover:border-foreground"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Club
                </p>
                <p className="font-serif text-lg text-foreground mt-1">{club.name}</p>
                <p className="text-muted-foreground mt-1">Prints, history, more</p>
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
                  Football in {city.name}
                </p>
                <p className="text-muted-foreground mt-1">All grounds in the city</p>
              </Link>
            )}
            <Link
              href="/blog/anatomy-of-the-modern-stand"
              className="block p-5 bg-surface border border-border rounded hover:border-foreground"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Read
              </p>
              <p className="font-serif text-lg text-foreground mt-1">
                Anatomy of the modern stand
              </p>
              <p className="text-muted-foreground mt-1">
                How stadium design has changed
              </p>
            </Link>
          </section>
        </div>

        {/* Related stadiums */}
        {relatedStadiums.length > 0 && (
          <section className="mt-20 md:mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              More stadiums
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedStadiums.map((s) => (
                <StadiumCard key={s.slug} stadium={s} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />

      <JsonLd
        data={[
          productSchema({
            name: `${stadium.name} framed map print`,
            description: `Framed stadium map print of ${stadium.name}, home of ${stadium.club.name}.`,
            url: `/stadiums/${stadium.slug}`,
            sku: `stadium-${stadium.slug}`,
            priceGbp: startingFrom,
          }),
          faqPage(stadium.faqs),
          place({ name: stadium.name, lat: stadium.lat, lng: stadium.lng }),
          breadcrumbList([
            { name: "Home", href: "/" },
            { name: "Stadiums", href: "/stadiums" },
            { name: stadium.name, href: `/stadiums/${stadium.slug}` },
          ]),
        ]}
      />
    </div>
  );
}
