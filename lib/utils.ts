import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard shadcn-style class merge helper — clsx for conditional
 * classes, tailwind-merge to resolve conflicting Tailwind utilities
 * (e.g. "px-2" vs "px-4") in favor of the later one.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
