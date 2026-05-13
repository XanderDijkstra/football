import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Stadium } from "@/data/stadiums";

export function StadiumCard({ stadium }: { stadium: Stadium }) {
  return (
    <Link
      href={`/stadiums/${stadium.slug}`}
      className="group relative block bg-surface border border-border overflow-hidden hover:border-accent transition-colors"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <CardArt stadium={stadium} />
        <ArrowUpRight
          aria-hidden
          className="absolute top-3 right-3 h-4 w-4 text-foreground/40 group-hover:text-accent transition-colors"
        />
      </div>
      <div className="p-4 border-t border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-numeric">
          {stadium.city.name} · {stadium.country}
        </p>
        <h3 className="font-display uppercase text-2xl md:text-3xl text-foreground mt-1 leading-none tracking-tight">
          {stadium.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
          {stadium.club.name}
        </p>
      </div>
    </Link>
  );
}

function CardArt({ stadium }: { stadium: Stadium }) {
  // Bold stencil-style stadium label over a faint topo line pattern.
  return (
    <div className="absolute inset-0 bg-background flex items-end p-4">
      <svg
        aria-hidden
        viewBox="0 0 200 250"
        className="absolute inset-0 w-full h-full text-foreground/15"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      >
        <path d="M0 30 L60 25 L120 40 L200 35" />
        <path d="M0 70 L80 65 L140 78 L200 72" />
        <path d="M0 110 L70 105 L130 118 L200 112" />
        <path d="M0 150 L60 145 L130 158 L200 150" />
        <path d="M0 195 L70 190 L140 200 L200 195" />
      </svg>
      <p className="font-display uppercase text-foreground text-5xl md:text-6xl leading-[0.85] tracking-tight relative">
        {firstWord(stadium.name)}
      </p>
    </div>
  );
}

function firstWord(name: string): string {
  return name.split(" ")[0] ?? name;
}
