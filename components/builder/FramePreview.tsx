"use client";

import type { Stadium } from "@/data/stadiums";
import type { FrameColor, FrameSize } from "@/data/products";
import type { UploadedImage } from "@/lib/builder/state";

const FRAME_STYLE: Record<FrameColor, string> = {
  oak: "bg-[#b08043]",
  black: "bg-[#0F1115]",
  white: "bg-[#EEE9DD]",
};

const FRAME_INNER_SHADOW: Record<FrameColor, string> = {
  oak: "ring-1 ring-amber-900/30",
  black: "ring-1 ring-black/40",
  white: "ring-1 ring-foreground/10",
};

const SIZE_ASPECT: Record<FrameSize, string> = {
  a3: "aspect-[1/1.414]",
  a2: "aspect-[1/1.414]",
  a1: "aspect-[1/1.414]",
  "50x70": "aspect-[5/7]",
};

interface Props {
  stadium: Stadium | null;
  customImage: UploadedImage | null;
  frameColor: FrameColor;
  size: FrameSize;
  personalisation: string;
}

export function FramePreview({
  stadium,
  customImage,
  frameColor,
  size,
  personalisation,
}: Props) {
  return (
    <div className="bg-cream rounded p-6 md:p-10 border border-border flex items-center justify-center">
      <div className={`relative w-full max-w-xs ${SIZE_ASPECT[size]}`}>
        {/* Frame moulding */}
        <div
          className={`absolute inset-0 ${FRAME_STYLE[frameColor]} ${FRAME_INNER_SHADOW[frameColor]} shadow-xl rounded-[2px]`}
        >
          {/* Mat + glass */}
          <div className="absolute inset-[8%] bg-surface border border-foreground/5 flex flex-col items-center justify-center p-4 overflow-hidden">
            {customImage ? (
              // Inline preview of user upload
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={customImage.dataUrl}
                alt="Your upload"
                className="w-full h-full object-cover"
              />
            ) : stadium ? (
              <StadiumMapArt stadium={stadium} personalisation={personalisation} />
            ) : (
              <p className="text-xs text-muted-foreground text-center font-serif italic">
                Pick a stadium or upload an image to preview it framed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StadiumMapArt({
  stadium,
  personalisation,
}: {
  stadium: Stadium;
  personalisation: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      className="w-full h-full text-foreground/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Suggestion of streets */}
      <path d="M5 50 L60 40 L120 60 L180 50 L195 70" />
      <path d="M0 80 L70 75 L130 90 L195 85" />
      <path d="M10 110 L60 105 L130 120 L195 115" />
      <path d="M0 145 L80 140 L150 155 L200 150" />
      <path d="M5 175 L70 170 L130 185 L195 175" />
      <path d="M15 205 L70 200 L130 210 L195 205" />
      {/* Stadium outline */}
      <rect x="80" y="100" width="40" height="30" />
      {/* Name + coords */}
      <text
        x="100"
        y="245"
        textAnchor="middle"
        fontSize="9"
        fill="currentColor"
        stroke="none"
        fontFamily="serif"
      >
        {stadium.name.toUpperCase()}
      </text>
      <text
        x="100"
        y="258"
        textAnchor="middle"
        fontSize="5"
        fill="currentColor"
        stroke="none"
        fontFamily="serif"
        opacity="0.65"
      >
        {stadium.lat.toFixed(4)}°{stadium.lat >= 0 ? "N" : "S"} ·{" "}
        {Math.abs(stadium.lng).toFixed(4)}°{stadium.lng >= 0 ? "E" : "W"}
      </text>
      {personalisation && (
        <text
          x="100"
          y="270"
          textAnchor="middle"
          fontSize="5"
          fill="currentColor"
          stroke="none"
          fontFamily="serif"
        >
          {personalisation.slice(0, 60)}
        </text>
      )}
    </svg>
  );
}
