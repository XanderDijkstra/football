export type FrameColor = "oak" | "black" | "white";
export type FrameSize = "a3" | "a2" | "a1" | "50x70";

export interface Product {
  slug: string;
  frameColor: FrameColor;
  frameColorLabel: string;
  size: FrameSize;
  sizeLabel: string;
  dimensionsCm: string;
  dimensionsIn: string;
  priceGbp: number;
  glazing: string;
  paper: string;
  mounting: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

const FRAME_COLORS: Record<FrameColor, string> = {
  oak: "Oak",
  black: "Black",
  white: "White",
};

const FRAME_COLOR_NOTES: Record<FrameColor, string> = {
  oak:
    "European white oak with a clear, low-sheen lacquer that lets the grain through. Warm against the cream paper.",
  black:
    "Matte black ash, 20 mm profile. The most editorial option — sits against either light or dark walls.",
  white:
    "Matte white ash. Disappears against off-white walls; the print does all the talking.",
};

const SIZES: {
  size: FrameSize;
  label: string;
  cm: string;
  inches: string;
  priceGbp: number;
}[] = [
  { size: "a3", label: "A3", cm: "29.7 × 42.0 cm", inches: '11.7" × 16.5"', priceGbp: 59 },
  { size: "a2", label: "A2", cm: "42.0 × 59.4 cm", inches: '16.5" × 23.4"', priceGbp: 89 },
  { size: "a1", label: "A1", cm: "59.4 × 84.1 cm", inches: '23.4" × 33.1"', priceGbp: 129 },
  { size: "50x70", label: "50 × 70 cm", cm: "50 × 70 cm", inches: '19.7" × 27.6"', priceGbp: 99 },
];

const COMMON_FAQS = (frameColor: string, sizeLabel: string): { q: string; a: string }[] => [
  {
    q: "What's the print made of?",
    a: "260 gsm cream cotton paper, archival pigment ink, anti-glare glass, FSC-certified wooden frame. Ready to hang with a sawtooth fixing on the back.",
  },
  {
    q: `Will a ${frameColor.toLowerCase()} ${sizeLabel} fit my wall?`,
    a: `${sizeLabel} works well above a sofa, on a feature wall, or in a hallway. We list exact frame dimensions including the moulding on every product page — measure twice before ordering.`,
  },
  {
    q: "Which stadiums are available in this format?",
    a: "Every stadium on the site is available in every frame and size combination. Pick a stadium in the builder, then pick this frame.",
  },
  {
    q: "Shipping?",
    a: "Made on demand in the UK. Delivery 5–7 working days in the UK, 7–10 in the EU. Tracked from dispatch.",
  },
];

function build(): Product[] {
  const out: Product[] = [];
  (Object.keys(FRAME_COLORS) as FrameColor[]).forEach((color) => {
    SIZES.forEach((s) => {
      out.push({
        slug: `${color}-${s.size}`,
        frameColor: color,
        frameColorLabel: FRAME_COLORS[color],
        size: s.size,
        sizeLabel: s.label,
        dimensionsCm: s.cm,
        dimensionsIn: s.inches,
        priceGbp: s.priceGbp,
        glazing: "Anti-glare glass",
        paper: "260 gsm cream cotton, archival pigment ink",
        mounting: "Sawtooth fixing, ready to hang",
        intro: `${FRAME_COLORS[color]} framed football print in ${s.label}. ${FRAME_COLOR_NOTES[color]}`,
        faqs: COMMON_FAQS(FRAME_COLORS[color], s.label),
      });
    });
  });
  return out;
}

export const products: Product[] = build();

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(gbp: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(gbp);
}
