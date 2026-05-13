import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <main>
        {/* Massive masthead hero */}
        <section className="border-b border-border">
          <div className="container pt-6 md:pt-8 pb-12 md:pb-16">
            <Breadcrumbs
              items={[
                { label: "Stadiums", href: "/stadiums" },
                { label: stadium.name },
              ]}
            />
            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
              / {stadium.country} · {stadium.city.name} · est. {stadium.opened}
            </p>
            {/* Sliced wordmark of the stadium name */}
            <h1
              aria-label={`${stadium.name} framed prints`}
              className="mt-4 font-display uppercase text-foreground leading-[0.85] tracking-tightest break-words text-[18vw] md:text-[14rem] lg:text-[18rem]"
            >
              {stadium.name}
            </h1>
            <p className="mt-8 text-base md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
              {stadium.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-border pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Price from
                </p>
                <p className="font-display uppercase text-foreground text-4xl md:text-5xl mt-1 font-numeric leading-none">
                  {formatPrice(startingFrom)}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/build?stadium=${stadium.slug}`}
                  className="inline-flex h-12 items-center gap-2 px-6 rounded-sm bg-accent text-accent-foreground font-bold uppercase tracking-wider text-sm hover:bg-accent/90"
                >
                  Frame {stadium.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex h-12 items-center px-6 rounded-sm border border-foreground/30 text-foreground font-bold uppercase tracking-wider text-sm hover:border-foreground"
                >
                  All frame sizes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Facts strip */}
        <section className="border-b border-border bg-surface">
          <div className="container py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6">
            {stadium.facts.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </p>
                <p className="font-display uppercase text-foreground text-2xl md:text-3xl mt-1 font-numeric leading-none">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="container py-16 md:py-24 grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* Main column */}
          <div className="space-y-16 md:space-y-20 max-w-3xl">
            <section>
              <SectionTitle eyebrow="/ The ground" title="What it is." />
              <p className="mt-6 text-base md:text-lg text-foreground/90 leading-relaxed">
                {stadium.about}
              </p>
              {stadium.architect && (
                <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wider">
                  Architect — {stadium.architect}
                </p>
              )}
            </section>

            <section>
              <SectionTitle eyebrow="/ The print" title="What's on the map." />
              <p className="mt-6 text-base md:text-lg text-foreground/90 leading-relaxed">
                {stadium.whatsOnMap}
              </p>
              {glossaryTerms.length > 0 && (
                <p className="mt-5 text-xs text-muted-foreground uppercase tracking-wider">
                  Picked out:{" "}
                  {glossaryTerms.map((g, i) => (
                    <span key={g.slug}>
                      <Link
                        href={`/glossary/${g.slug}`}
                        className="text-accent hover:underline normal-case tracking-normal"
                      >
                        {g.term}
                      </Link>
                      {i < glossaryTerms.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}
            </section>

            <section>
              <SectionTitle eyebrow="/ Options" title="Frame it." />
              <p className="mt-6 text-sm text-muted-foreground">
                Three frame colours, four sizes. FSC-certified ash, hand-assembled in the UK with anti-glare glass.
              </p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="flex items-center justify-between gap-4 p-4 bg-surface border border-border hover:border-accent transition-colors"
                    >
                      <div>
                        <p className="font-display uppercase text-foreground text-xl leading-none tracking-tight">
                          {p.frameColorLabel} · {p.sizeLabel}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1.5 font-numeric">
                          {p.dimensionsCm}
                        </p>
                      </div>
                      <p className="font-display text-foreground text-2xl font-numeric leading-none">
                        {formatPrice(p.priceGbp)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle eyebrow="/ FAQ" title="Asked + answered." />
              <div className="mt-8">
                <Faq items={stadium.faqs} />
              </div>
            </section>
          </div>

          {/* Sidebar / related cluster */}
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-3 text-sm">
            {club && (
              <Link
                href={`/clubs/${club.slug}`}
                className="block p-5 bg-surface border border-border hover:border-accent transition-colors"
              >
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                  Club
                </p>
                <p className="font-display uppercase text-foreground text-2xl mt-1 leading-none tracking-tight">
                  {club.name}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Prints, history, more →
                </p>
              </Link>
            )}
            {city && (
              <Link
                href={`/cities/${city.slug}`}
                className="block p-5 bg-surface border border-border hover:border-accent transition-colors"
              >
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                  City
                </p>
                <p className="font-display uppercase text-foreground text-2xl mt-1 leading-none tracking-tight">
                  {city.name}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  All grounds in the city →
                </p>
              </Link>
            )}
            <Link
              href="/blog/anatomy-of-the-modern-stand"
              className="block p-5 bg-surface border border-border hover:border-accent transition-colors"
            >
              <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                Read
              </p>
              <p className="font-display uppercase text-foreground text-xl mt-1 leading-tight tracking-tight">
                Anatomy of the modern stand
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                How stadium design has changed →
              </p>
            </Link>
          </aside>
        </div>

        {/* Related stadiums */}
        {relatedStadiums.length > 0 && (
          <section className="border-t border-border">
            <div className="container py-16 md:py-24">
              <SectionTitle eyebrow="/ Next" title="More grounds." />
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedStadiums.map((s) => (
                  <StadiumCard key={s.slug} stadium={s} />
                ))}
              </div>
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

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <header>
      <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
        {eyebrow}
      </p>
      <h2 className="font-display uppercase text-foreground text-4xl md:text-6xl mt-3 tracking-tight leading-[0.9]">
        {title}
      </h2>
    </header>
  );
}
