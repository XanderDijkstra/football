export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <details
          key={i}
          className="group py-4 px-1 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
            <dt className="font-display text-lg text-foreground">{item.q}</dt>
            <span
              aria-hidden
              className="mt-1 text-foreground/60 group-open:rotate-45 transition-transform"
            >
              +
            </span>
          </summary>
          <dd className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-prose">
            {item.a}
          </dd>
        </details>
      ))}
    </dl>
  );
}
