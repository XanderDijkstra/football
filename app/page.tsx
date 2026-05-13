import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StadiumCard } from "@/components/cards/StadiumCard";
import { stadiums } from "@/data/stadiums";
import { SITE } from "@/lib/utils";
import { ArrowRight, Frame, Search, Truck } from "lucide-react";

export default function HomePage() {
  const featured = stadiums.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Manifesto />
        <HowItWorks />
        <FeaturedStadiums featured={featured} />
        <FindYourClub />
        <TrustStrip />
        <Newsletter />
      </main>
      <SiteFooter />
      <OrganizationJsonLd />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="container pt-12 md:pt-16 pb-12 md:pb-16">
        {/* Eyebrow */}
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
          Framed stadium maps · Made on demand
        </p>

        {/* Massive sliced wordmark headline */}
        <h1 className="mt-6 font-display uppercase text-foreground leading-[0.85] tracking-tightest">
          <span className="block text-[16vw] md:text-[14rem] lg:text-[16rem]">
            Made
          </span>
          <span className="block text-[16vw] md:text-[14rem] lg:text-[16rem]">
            <span className="text-accent">for</span> fans.
          </span>
          <span className="block text-[16vw] md:text-[14rem] lg:text-[16rem]">
            One <span className="italic">frame</span>
          </span>
          <span className="block text-[16vw] md:text-[14rem] lg:text-[16rem]">
            at a time.
          </span>
        </h1>

        {/* Subhead + CTAs */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 max-w-xl">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Pick your stadium. Preview it framed in oak, black or white. Delivered ready to hang, across the UK and Europe. No crests, no clichés.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/build"
                className="inline-flex h-12 items-center gap-2 px-6 rounded-sm bg-accent text-accent-foreground font-bold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
              >
                Open the builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/stadiums"
                className="inline-flex h-12 items-center px-6 rounded-sm border border-foreground/30 text-foreground font-bold uppercase tracking-wider text-sm hover:border-foreground transition-colors"
              >
                Browse stadiums
              </Link>
            </div>
          </div>

          {/* Stats / receipt block */}
          <dl className="border border-border rounded-sm p-5 bg-surface space-y-3 text-sm">
            <Stat label="Stadiums framed" value="42" />
            <Stat label="Delivery" value="UK + EU" />
            <Stat label="Frames" value="3 finishes · 4 sizes" />
            <Stat label="Made in" value="Britain" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border last:border-0 pb-3 last:pb-0">
      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="font-display uppercase text-foreground text-lg leading-none">
        {value}
      </dd>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container py-16 md:py-20 grid md:grid-cols-[200px_1fr] gap-8 md:gap-16">
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold pt-2">
          / The pitch
        </p>
        <p className="font-display uppercase text-foreground text-3xl md:text-5xl leading-tight tracking-tight max-w-3xl">
          A framed print is a place you've been. We make them for the grounds you've shouted in, the ones you've never made it to, and the ones your dad never shut up about.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Pick your ground",
      body:
        "Search any stadium in the UK or Europe. Premier League down to the cult mid-tier — we map all of it.",
    },
    {
      icon: Frame,
      title: "Frame it live",
      body:
        "Oak, black or white. A3 up to 50 × 70. See the print framed on a wall before you commit a penny.",
    },
    {
      icon: Truck,
      title: "On your wall",
      body:
        "Printed and framed in Britain on demand. UK in 5–7 days, EU in 7–10. Ships ready to hang.",
    },
  ];

  return (
    <section className="border-b border-border">
      <div className="container py-16 md:py-24">
        <SectionHeader eyebrow="/ How it works" title="Three steps." />
        <ol className="mt-12 grid md:grid-cols-3 gap-0 md:divide-x divide-border border-y border-border">
          {steps.map((step, i) => (
            <li key={step.title} className="p-6 md:p-8 group">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-accent text-5xl md:text-6xl leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon aria-hidden className="h-5 w-5 text-foreground/40" />
              </div>
              <h3 className="font-display uppercase text-foreground text-2xl md:text-3xl mt-4 tracking-tight leading-none">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FeaturedStadiums({ featured }: { featured: typeof stadiums }) {
  return (
    <section className="border-b border-border">
      <div className="container py-16 md:py-24">
        <SectionHeader
          eyebrow="/ Selected grounds"
          title="Start with one of these."
          aside={
            <Link
              href="/stadiums"
              className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-accent"
            >
              All stadiums
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {featured.map((s) => (
            <StadiumCard key={s.slug} stadium={s} />
          ))}
        </div>
        <div className="md:hidden mt-8">
          <Link
            href="/stadiums"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground"
          >
            All stadiums
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FindYourClub() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <SectionHeader eyebrow="/ Find your club" title="Type a name. Any name." />
          <p className="text-sm text-muted-foreground mt-6 max-w-md">
            Your local side, your nan's side, somewhere you used to live. If we frame their ground, we'll find it.
          </p>
          <form
            className="mt-8 flex gap-2 max-w-md"
            role="search"
            aria-label="Club search"
            action="/clubs"
          >
            <label htmlFor="club-search" className="sr-only">
              Search clubs
            </label>
            <input
              id="club-search"
              name="q"
              type="search"
              placeholder="Liverpool, Dortmund, Forest…"
              className="flex-1 h-12 px-4 rounded-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="h-12 px-5 rounded-sm bg-accent text-accent-foreground font-bold uppercase tracking-wider text-sm hover:bg-accent/90"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { title: "260 gsm", body: "Cream cotton paper, archival pigment ink." },
    { title: "FSC frames", body: "Oak, black, white. UK-assembled." },
    { title: "Anti-glare", body: "Standard glass on every order." },
    { title: "No warehouse", body: "Made the day you buy it." },
  ];
  return (
    <section className="border-b border-border">
      <div className="container py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
        {items.map((it) => (
          <div key={it.title}>
            <p className="font-display uppercase text-foreground text-3xl leading-none">
              {it.title}
            </p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold">
            / The dispatch
          </p>
          <h2 className="font-display uppercase text-3xl md:text-5xl mt-4 tracking-tightest leading-[0.9]">
            New stadiums. Design notes. Sent monthly.
          </h2>
        </div>
        <form className="flex flex-col sm:flex-row gap-3" aria-label="Newsletter signup">
          <label htmlFor="home-email" className="sr-only">Email address</label>
          <input
            id="home-email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 h-12 px-4 rounded-sm bg-transparent border border-accent-foreground/40 text-accent-foreground placeholder:text-accent-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent-foreground/60"
          />
          <button
            type="submit"
            className="h-12 px-6 rounded-sm bg-accent-foreground text-accent font-bold uppercase tracking-wider text-sm hover:bg-accent-foreground/90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-6">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
          {eyebrow}
        </p>
        <h2 className="font-display uppercase text-foreground text-4xl md:text-6xl mt-3 tracking-tight leading-[0.9]">
          {title}
        </h2>
      </div>
      {aside}
    </header>
  );
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: SITE.name, url: SITE.url },
      {
        "@type": "WebSite",
        url: SITE.url,
        name: SITE.name,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/clubs?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
