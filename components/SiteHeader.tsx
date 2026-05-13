import Link from "next/link";
import { SITE } from "@/lib/utils";
import { CartLink } from "@/components/CartLink";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Stadiums", href: "/stadiums" },
  { label: "Clubs", href: "/clubs" },
  { label: "Journal", href: "/blog" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-40">
      <div className="container flex items-center justify-between h-14">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="font-display text-2xl text-foreground uppercase tracking-tight leading-none"
        >
          {SITE.shortName}<span aria-hidden className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/build"
            className="hidden sm:inline-flex h-9 items-center px-4 rounded-sm bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
          >
            Build yours
          </Link>
          <CartLink />
        </div>
      </div>
    </header>
  );
}
