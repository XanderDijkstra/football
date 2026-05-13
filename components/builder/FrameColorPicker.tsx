"use client";

import type { FrameColor } from "@/data/products";

const COLORS: { value: FrameColor; label: string; swatch: string }[] = [
  { value: "oak", label: "Oak", swatch: "bg-[#b08043]" },
  { value: "black", label: "Black", swatch: "bg-[#0F1115]" },
  { value: "white", label: "White", swatch: "bg-[#EEE9DD]" },
];

interface Props {
  value: FrameColor;
  onChange: (color: FrameColor) => void;
}

export function FrameColorPicker({ value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Frame colour" className="grid grid-cols-3 gap-2">
      {COLORS.map((c) => {
        const active = c.value === value;
        return (
          <button
            key={c.value}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => onChange(c.value)}
            className={`flex items-center gap-3 p-3 rounded border transition-colors text-left ${
              active
                ? "border-foreground bg-surface"
                : "border-border bg-surface hover:border-foreground"
            }`}
          >
            <span
              aria-hidden
              className={`h-6 w-6 rounded-sm border border-foreground/15 ${c.swatch}`}
            />
            <span className="text-sm font-medium text-foreground">{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
