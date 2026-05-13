"use client";

import type { FrameSize } from "@/data/products";
import { formatPrice } from "@/data/products";

interface SizeOption {
  value: FrameSize;
  label: string;
  cm: string;
  priceGbp: number;
}

interface Props {
  value: FrameSize;
  options: SizeOption[];
  onChange: (size: FrameSize) => void;
}

export function SizePicker({ value, options, onChange }: Props) {
  return (
    <ul role="radiogroup" aria-label="Print size" className="space-y-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <li key={o.value}>
            <button
              role="radio"
              aria-checked={active}
              type="button"
              onClick={() => onChange(o.value)}
              className={`w-full flex items-center justify-between gap-4 p-4 rounded border transition-colors text-left ${
                active
                  ? "border-foreground bg-surface"
                  : "border-border bg-surface hover:border-foreground"
              }`}
            >
              <div>
                <p className="font-display text-base text-foreground">{o.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-numeric">
                  {o.cm}
                </p>
              </div>
              <p className="font-numeric text-foreground">
                {formatPrice(o.priceGbp)}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
