"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FrameColor, FrameSize } from "@/data/products";

export interface CartItem {
  id: string;
  stadiumSlug: string | null;
  stadiumName: string;
  productSlug: string;
  frameColor: FrameColor;
  frameColorLabel: string;
  size: FrameSize;
  sizeLabel: string;
  dimensionsCm: string;
  priceGbp: number;
  qty: number;
  customImageDataUrl?: string;
  personalisation?: string;
}

interface CartState {
  items: CartItem[];
  hasHydrated: boolean;
  addItem: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
  setHasHydrated: (v: boolean) => void;
}

function itemKey(input: Pick<CartItem, "stadiumSlug" | "productSlug" | "customImageDataUrl" | "personalisation">): string {
  const customMark = input.customImageDataUrl
    ? `custom-${input.customImageDataUrl.length}`
    : "no-custom";
  return [
    input.stadiumSlug ?? "no-stadium",
    input.productSlug,
    customMark,
    input.personalisation ?? "",
  ].join("|");
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      addItem: (input) => {
        const id = itemKey(input);
        const qtyDelta = input.qty ?? 1;
        const existing = get().items.find((it) => it.id === id);
        if (existing) {
          set({
            items: get().items.map((it) =>
              it.id === id ? { ...it, qty: it.qty + qtyDelta } : it
            ),
          });
        } else {
          set({
            items: [...get().items, { ...input, id, qty: qtyDelta }],
          });
        }
      },
      updateQty: (id, qty) =>
        set({
          items: get()
            .items.map((it) =>
              it.id === id ? { ...it, qty: Math.max(1, Math.floor(qty)) } : it
            ),
        }),
      removeItem: (id) =>
        set({ items: get().items.filter((it) => it.id !== id) }),
      clear: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, it) => sum + it.priceGbp * it.qty, 0),
      count: () => get().items.reduce((sum, it) => sum + it.qty, 0),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "footy-frame-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
