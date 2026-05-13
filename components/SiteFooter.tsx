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
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <p className="font-serif text-2xl text-foreground">
              <span aria-hidden className="text-muted-foreground mr-1">[</span>
              <span className="lowercase">{SITE.shortName}</span>
              <span aria-hidden className="text-muted-foreground ml-1">]</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Framed stadium map prints, made on demand and shipped across the UK and EU.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 h-10 px-3 rounded bg-surface border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded bg-foreground text-background text-sm font-medium hover:bg-foreground/90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
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

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Prints reference stadiums by location and architecture; no club crests or official trademarks are used.
          </p>
          <p>UK and EU delivery · FSC-certified frames · Made on demand</p>
        </div>
      </div>
    </footer>
  );
}
