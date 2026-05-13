import Link from "next/link";
import { SITE } from "@/lib/utils";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Stadiums", href: "/stadiums" },
  { label: "Clubs", href: "/clubs" },
  { label: "Build yours", href: "/build" },
  { label: "Journal", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="font-serif text-xl text-foreground tracking-tight"
        >
          <span aria-hidden className="text-muted-foreground mr-1">[</span>
          <span className="lowercase">{SITE.shortName}</span>
          <span aria-hidden className="text-muted-foreground ml-1">]</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/build"
            className="hidden sm:inline-flex h-9 items-center px-4 rounded bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Build yours
          </Link>
          <Link
            href="/cart"
            className="text-sm text-foreground/80 hover:text-foreground"
            aria-label="Cart"
          >
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}
