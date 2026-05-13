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
    <section className="container pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Framed stadium prints · Made on demand
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground mt-4">
            Framed stadium maps. <br className="hidden md:block" />
            Made for fans, made one at a time.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-5 max-w-lg">
            Choose your stadium. Preview it framed in oak, black or white. Delivered ready to hang, across the UK and EU.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/build"
              className="inline-flex h-12 items-center gap-2 px-6 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Open the builder
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/stadiums"
              className="inline-flex h-12 items-center px-6 rounded border border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Browse stadiums
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-[5/6] bg-cream rounded overflow-hidden border border-border">
          <HeroFrameArt />
        </div>
      </div>
    </section>
  );
}

function HeroFrameArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
      <div className="w-full h-full bg-foreground/[0.04] border-[12px] md:border-[18px] border-foreground/85 shadow-sm">
        <div className="w-full h-full bg-surface border border-border flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-4/5 h-4/5 text-foreground/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          >
            <path d="M10 40 L50 30 L100 45 L150 35 L195 55" />
            <path d="M5 70 L60 65 L120 75 L180 70" />
            <path d="M15 100 L70 95 L130 110 L195 105" />
            <path d="M20 130 L80 125 L140 138 L190 130" />
            <path d="M10 160 L70 155 L130 165 L195 158" />
            <rect x="80" y="80" width="40" height="30" />
            <text x="100" y="180" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none" fontFamily="serif">
              ANFIELD · 53.4308°N · 2.9608°W
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Pick your stadium",
      body:
        "Search any ground in the UK or Europe. We map every Premier League and major continental venue.",
    },
    {
      icon: Frame,
      title: "Preview it framed",
      body:
        "See your print in oak, black or white framing. Switch sizes from A3 up to 50×70 cm before you buy.",
    },
    {
      icon: Truck,
      title: "Delivered to your wall",
      body:
        "Made on demand, framed in the UK with anti-glare glass, shipped across the UK and EU.",
    },
  ];

  return (
    <section className="border-t border-border bg-surface">
      <div className="container py-16 md:py-24">
        <header className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            How it works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3">
            Three steps from search to wall.
          </h2>
        </header>
        <ol className="mt-12 grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-foreground pt-5">
              <p className="text-xs text-muted-foreground font-numeric">
                {String(i + 1).padStart(2, "0")}
              </p>
              <step.icon aria-hidden className="h-6 w-6 text-foreground mt-4" />
              <h3 className="font-serif text-xl text-foreground mt-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
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
    <section className="container py-16 md:py-24">
      <header className="flex items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Featured stadiums
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3">
            Start with one of these.
          </h2>
        </div>
        <Link
          href="/stadiums"
          className="hidden md:inline-flex items-center gap-2 text-sm text-foreground hover:underline"
        >
          All stadiums
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featured.map((s) => (
          <StadiumCard key={s.slug} stadium={s} />
        ))}
      </div>

      <div className="md:hidden mt-8">
        <Link
          href="/stadiums"
          className="inline-flex items-center gap-2 text-sm text-foreground hover:underline"
        >
          All stadiums
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function FindYourClub() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Find your club
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-3">
            Search by team or city.
          </h2>
          <p className="text-base text-muted-foreground mt-4">
            Type your club, your local side, or somewhere you used to live. We'll show you the prints we have for them.
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
              placeholder="Liverpool, Real Madrid, Dortmund…"
              className="flex-1 h-12 px-4 rounded bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="h-12 px-5 rounded bg-foreground text-background font-medium hover:bg-foreground/90"
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
    { title: "Cream cotton paper", body: "260gsm, archival, made in Germany." },
    { title: "FSC-certified frames", body: "Oak, black or white. UK-assembled." },
    { title: "Anti-glare glass", body: "Standard on every order." },
    { title: "Made on demand", body: "Nothing sits in a warehouse." },
  ];
  return (
    <section className="border-t border-border">
      <div className="container py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((it) => (
          <div key={it.title}>
            <p className="font-serif text-lg text-foreground">{it.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="border-t border-border bg-foreground text-background">
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-background/60">
            Journal
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            New stadiums, design notes, gift guides.
          </h2>
          <p className="text-base text-background/70 mt-4 max-w-md">
            One email a month. We send when there's something to look at, not because the calendar says so.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3" aria-label="Newsletter signup">
          <label htmlFor="home-email" className="sr-only">Email address</label>
          <input
            id="home-email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 h-12 px-4 rounded bg-transparent border border-background/40 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-background/60"
          />
          <button
            type="submit"
            className="h-12 px-6 rounded bg-background text-foreground font-medium hover:bg-background/90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
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
