import Link from "next/link";
import { SITE } from "@/lib/utils";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All prints", href: "/shop" },
      { label: "Stadium maps", href: "/stadiums" },
      { label: "By club", href: "/clubs" },
      { label: "Build your own", href: "/build" },
    ],
  },
  {
    title: "Read",
    links: [
      { label: "Journal", href: "/blog" },
      { label: "Glossary", href: "/glossary" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container py-16 md:py-20">
        {/* Massive wordmark across the footer — fanzine masthead energy */}
        <p className="font-display uppercase text-foreground leading-[0.9] text-[18vw] md:text-[12rem] tracking-tightest -ml-1">
          {SITE.shortName}
        </p>
        <div className="h-1 w-24 bg-accent mt-4" aria-hidden />

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 max-w-sm">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Framed stadium map prints, made on demand and shipped across the UK and EU. No crests, no clichés.
            </p>
            <form
              className="mt-6 flex gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 h-11 px-3 rounded-sm bg-surface border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="h-11 px-4 rounded-sm bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider hover:bg-accent/90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[10px] uppercase tracking-widest text-accent mb-5 font-bold">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE.name} · Map prints only. No club crests or trademarks used.
          </p>
          <p>UK + EU delivery · FSC frames · Made on demand</p>
        </div>
      </div>
    </footer>
  );
}
