"use client";

import { useEffect, useReducer, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import {
  builderReducer,
  initialBuilderState,
  isBuilderReady,
} from "@/lib/builder/state";
import { getStadium } from "@/data/stadiums";
import {
  products,
  formatPrice,
  type FrameColor,
  type FrameSize,
} from "@/data/products";
import { useCart } from "@/lib/cart/store";
import { StadiumPicker } from "./StadiumPicker";
import { FrameColorPicker } from "./FrameColorPicker";
import { SizePicker } from "./SizePicker";
import { UploadStep } from "./UploadStep";
import { FramePreview } from "./FramePreview";

const FRAME_COLORS: FrameColor[] = ["oak", "black", "white"];
const SIZES: FrameSize[] = ["a3", "a2", "a1", "50x70"];

export function Builder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addItem = useCart((s) => s.addItem);

  const [state, dispatch] = useReducer(builderReducer, initialBuilderState);

  // Seed from URL: /build?stadium=anfield&frame=oak&size=a2
  useEffect(() => {
    const sParam = searchParams.get("stadium");
    const fParam = searchParams.get("frame");
    const zParam = searchParams.get("size");
    if (sParam && getStadium(sParam)) {
      dispatch({ type: "SET_STADIUM", slug: sParam });
    }
    if (fParam && FRAME_COLORS.includes(fParam as FrameColor)) {
      dispatch({ type: "SET_FRAME_COLOR", color: fParam as FrameColor });
    }
    if (zParam && SIZES.includes(zParam as FrameSize)) {
      dispatch({ type: "SET_SIZE", size: zParam as FrameSize });
    }
    // We only want to seed once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stadium = state.stadiumSlug ? getStadium(state.stadiumSlug) ?? null : null;
  const product = useMemo(
    () =>
      products.find(
        (p) => p.frameColor === state.frameColor && p.size === state.size
      ),
    [state.frameColor, state.size]
  );

  const sizeOptions = useMemo(
    () =>
      SIZES.map((size) => {
        const match = products.find(
          (p) => p.frameColor === state.frameColor && p.size === size
        );
        return {
          value: size,
          label: match?.sizeLabel ?? size,
          cm: match?.dimensionsCm ?? "",
          priceGbp: match?.priceGbp ?? 0,
        };
      }),
    [state.frameColor]
  );

  const ready = isBuilderReady(state) && !!product;

  function handleAddToCart() {
    if (!product || !ready) return;
    addItem({
      stadiumSlug: state.stadiumSlug,
      stadiumName: stadium?.name ?? "Custom upload",
      productSlug: product.slug,
      frameColor: product.frameColor,
      frameColorLabel: product.frameColorLabel,
      size: product.size,
      sizeLabel: product.sizeLabel,
      dimensionsCm: product.dimensionsCm,
      priceGbp: product.priceGbp,
      customImageDataUrl: state.customImage?.dataUrl,
      personalisation: state.personalisation || undefined,
    });
    router.push("/cart");
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
      {/* Left: live preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <FramePreview
          stadium={stadium}
          customImage={state.customImage}
          frameColor={state.frameColor}
          size={state.size}
          personalisation={state.personalisation}
        />
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Live preview · approximate. Final crop and label set in the studio.
        </p>
      </div>

      {/* Right: stepper / controls */}
      <div className="space-y-10">
        <Step n={1} title="Pick a stadium">
          <StadiumPicker
            selectedSlug={state.stadiumSlug}
            onSelect={(slug) => dispatch({ type: "SET_STADIUM", slug })}
          />
          <details className="mt-4 group">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Or upload your own image
            </summary>
            <div className="mt-3">
              <UploadStep
                image={state.customImage}
                onChange={(image) =>
                  dispatch({ type: "SET_CUSTOM_IMAGE", image })
                }
              />
            </div>
          </details>
        </Step>

        <Step n={2} title="Choose a frame">
          <FrameColorPicker
            value={state.frameColor}
            onChange={(color) => dispatch({ type: "SET_FRAME_COLOR", color })}
          />
        </Step>

        <Step n={3} title="Pick a size">
          <SizePicker
            value={state.size}
            options={sizeOptions}
            onChange={(size) => dispatch({ type: "SET_SIZE", size })}
          />
        </Step>

        <Step n={4} title="Personalise (optional)">
          <label htmlFor="builder-personalisation" className="sr-only">
            Personalisation text
          </label>
          <input
            id="builder-personalisation"
            type="text"
            maxLength={60}
            placeholder="e.g. 14 May 2005 · Istanbul"
            value={state.personalisation}
            onChange={(e) =>
              dispatch({ type: "SET_PERSONALISATION", value: e.target.value })
            }
            className="w-full h-11 px-3 rounded bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1.5">
            One line, up to 60 characters. Printed below the map in matching type.
          </p>
        </Step>

        <div className="border-t border-border pt-6">
          {product && (
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.frameColorLabel} · {product.sizeLabel}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-numeric">
                  {product.dimensionsCm}
                </p>
              </div>
              <p className="font-display text-2xl text-foreground font-numeric">
                {formatPrice(product.priceGbp)}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!ready}
            className="w-full h-12 rounded bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {ready ? "Add to cart" : "Pick a stadium to continue"}
          </button>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Made on demand in the UK. Delivery 5–7 working days UK, 7–10 EU. Free returns within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span
          aria-hidden
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground text-xs font-numeric text-foreground"
        >
          {n}
        </span>
        <h2 className="font-display text-xl text-foreground">{title}</h2>
        <Check className="hidden text-accent h-4 w-4" />
      </div>
      <div>{children}</div>
    </section>
  );
}
