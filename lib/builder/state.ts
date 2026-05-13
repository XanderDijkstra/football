import type { FrameColor, FrameSize } from "@/data/products";

export interface UploadedImage {
  dataUrl: string;
  filename: string;
  width: number;
  height: number;
}

export interface BuilderState {
  stadiumSlug: string | null;
  customImage: UploadedImage | null;
  frameColor: FrameColor;
  size: FrameSize;
  personalisation: string;
}

export type BuilderAction =
  | { type: "SET_STADIUM"; slug: string | null }
  | { type: "SET_CUSTOM_IMAGE"; image: UploadedImage | null }
  | { type: "SET_FRAME_COLOR"; color: FrameColor }
  | { type: "SET_SIZE"; size: FrameSize }
  | { type: "SET_PERSONALISATION"; value: string }
  | { type: "RESET" };

export const initialBuilderState: BuilderState = {
  stadiumSlug: null,
  customImage: null,
  frameColor: "oak",
  size: "a2",
  personalisation: "",
};

export function builderReducer(
  state: BuilderState,
  action: BuilderAction
): BuilderState {
  switch (action.type) {
    case "SET_STADIUM":
      // Picking a stadium clears any custom image — they're mutually exclusive sources.
      return { ...state, stadiumSlug: action.slug, customImage: null };
    case "SET_CUSTOM_IMAGE":
      // Uploading a custom image clears the stadium choice.
      return {
        ...state,
        customImage: action.image,
        stadiumSlug: action.image ? null : state.stadiumSlug,
      };
    case "SET_FRAME_COLOR":
      return { ...state, frameColor: action.color };
    case "SET_SIZE":
      return { ...state, size: action.size };
    case "SET_PERSONALISATION":
      return { ...state, personalisation: action.value.slice(0, 60) };
    case "RESET":
      return initialBuilderState;
  }
}

export function isBuilderReady(state: BuilderState): boolean {
  return Boolean(state.stadiumSlug || state.customImage);
}
