"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * [Architecture §6.1 fix] Lenis owns the single scroll listener/raf loop.
 * Framer Motion's `whileInView` and native anchor scrolling (`#about` links
 * from the Navbar) both resolve against this same scroll position, so they
 * never disagree about where the viewport actually is.
 *
 * Respects prefers-reduced-motion by not instantiating Lenis at all —
 * native scroll behavior takes over, which is the correct reduced-motion
 * fallback (see globals.css `scroll-behavior: auto` under that media query).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
