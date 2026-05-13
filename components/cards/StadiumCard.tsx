import Link from "next/link";
import type { Stadium } from "@/data/stadiums";

export function StadiumCard({ stadium }: { stadium: Stadium }) {
  return (
    <Link
      href={`/stadiums/${stadium.slug}`}
      className="group block bg-surface border border-border rounded overflow-hidden transition-colors hover:border-foreground"
    >
      <div
        className="aspect-[4/5] bg-cream relative overflow-hidden"
        aria-hidden
      >
        <FrameMock />
      </div>
      <div className="p-4 md:p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {stadium.city.name} · {stadium.country}
        </p>
        <h3 className="font-serif text-lg text-foreground mt-1">
          {stadium.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{stadium.club.name}</p>
      </div>
    </Link>
  );
}

// Lightweight visual placeholder for product imagery.
// Replaced later by real framed-print photography.
function FrameMock() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full h-full bg-foreground/[0.04] border border-foreground/15 p-4">
        <div className="w-full h-full bg-surface border border-border flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-2/3 h-2/3 text-foreground/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          >
            <path d="M10 30 L40 25 L70 40 L90 35" />
            <path d="M15 55 L45 50 L75 60 L92 58" />
            <path d="M20 75 L50 70 L80 80" />
            <circle cx="50" cy="50" r="6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
