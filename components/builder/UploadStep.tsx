"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import type { UploadedImage } from "@/lib/builder/state";

const MIN_LONG_EDGE_PX = 2000;
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

interface Props {
  image: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
}

export function UploadStep({ image, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > MAX_BYTES) {
      setError("That file is over 12 MB. Try a smaller JPEG or PNG.");
      return;
    }
    if (!/^image\/(png|jpeg|jpg|webp)$/i.test(file.type)) {
      setError("PNG, JPEG or WebP only.");
      return;
    }
    const dataUrl = await readAsDataUrl(file);
    const dims = await imageDimensions(dataUrl);
    const longEdge = Math.max(dims.width, dims.height);
    if (longEdge < MIN_LONG_EDGE_PX) {
      setError(
        `Image needs to be at least ${MIN_LONG_EDGE_PX}px on its long edge. This one is ${longEdge}px.`
      );
      return;
    }
    onChange({
      dataUrl,
      filename: file.name,
      width: dims.width,
      height: dims.height,
    });
  }

  return (
    <div>
      {image ? (
        <div className="flex items-start gap-4 p-4 bg-surface border border-border rounded">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.dataUrl}
            alt=""
            className="h-20 w-20 object-cover rounded border border-border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {image.filename}
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-numeric">
              {image.width} × {image.height} px
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X aria-hidden className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-3 p-6 border border-dashed border-border bg-surface rounded hover:border-foreground transition-colors"
        >
          <Upload aria-hidden className="h-5 w-5 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm text-foreground">Upload your own image</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              PNG, JPEG, WebP · 2000 px+ long edge · up to 12 MB
            </p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />

      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function imageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error("Image failed to load"));
    img.src = src;
  });
}
