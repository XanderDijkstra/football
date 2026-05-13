"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { stadiums } from "@/data/stadiums";

interface Props {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export function StadiumPicker({ selectedSlug, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return stadiums;
    return stadiums.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.club.name.toLowerCase().includes(q) ||
        s.city.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <label htmlFor="builder-stadium-search" className="sr-only">
        Search stadiums
      </label>
      <div className="relative">
        <Search
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <input
          id="builder-stadium-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by stadium, club or city"
          className="w-full h-11 pl-10 pr-4 rounded bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No stadium matches "{query}". Try a different spelling.
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-1">
          {filtered.map((s) => {
            const active = s.slug === selectedSlug;
            return (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(s.slug)}
                  aria-pressed={active}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface hover:border-foreground"
                  }`}
                >
                  <p className="font-serif text-sm leading-tight">{s.name}</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      active ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {s.club.name} · {s.city.name}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
