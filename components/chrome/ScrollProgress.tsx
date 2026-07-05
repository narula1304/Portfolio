"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin bar at the very top of the viewport tracking scroll progress.
 * Reads from Framer's useScroll (window-level), which resolves against
 * the same scroll position Lenis drives — see PointerProvider/
 * SmoothScrollProvider comments for the shared-scroll-source rationale.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
    />
  );
}
