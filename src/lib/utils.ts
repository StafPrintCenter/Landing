import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralize(word: string, count: number): string {
  if (count <= 1) return word;
  if (/[sxz]$/i.test(word)) return word;
  return `${word}s`;
}