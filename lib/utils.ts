import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "The Footy Frame",
  shortName: "Footy Frame",
  url: "https://thefootyframe.com",
  tagline: "Framed stadium maps. Made for fans, made one at a time.",
  description:
    "Framed stadium map prints for football fans. Pick your stadium, preview it in oak, black or white, and we deliver across the UK and EU.",
} as const;
