"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * [Architecture §6.1 fix] Single shared pointer-position source.
 *
 * CustomCursor, the hero's mouse-parallax blobs, and magnetic buttons all
 * read from this context via usePointer() instead of each attaching their
 * own `mousemove` listener. One listener, one requestAnimationFrame loop,
 * three consumers — avoids the raf-loop contention a naive implementation
 * would hit.
 *
 * Disabled entirely on touch devices and when prefers-reduced-motion is set,
 * per the reduced-motion table in the architecture doc §6.
 */

type PointerState = {
  x: number;
  y: number;
  isEnabled: boolean; // false on touch devices or prefers-reduced-motion
};

const PointerContext = createContext<PointerState>({
  x: 0,
  y: 0,
  isEnabled: false,
});

export function usePointer() {
  return useContext(PointerContext);
}

export function PointerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PointerState>({
    x: 0,
    y: 0,
    isEnabled: false,
  });
  const frame = useRef<number | null>(null);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) {
      setState((s) => ({ ...s, isEnabled: false }));
      return;
    }

    setState((s) => ({ ...s, isEnabled: true }));

    const handleMove = (e: MouseEvent) => {
      latest.current = { x: e.clientX, y: e.clientY };
      if (frame.current === null) {
        frame.current = requestAnimationFrame(() => {
          setState((s) => ({ ...s, x: latest.current.x, y: latest.current.y }));
          frame.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <PointerContext.Provider value={state}>{children}</PointerContext.Provider>
  );
}
