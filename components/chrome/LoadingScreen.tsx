"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";

/**
 * [Architecture §3 fix] First-paint splash ONLY — mounted once in PageShell,
 * which itself lives in the root layout, so it only appears on a hard
 * navigation/reload, never on client-side route transitions. This is a
 * deliberately separate mechanism from app/loading.tsx, which is the
 * per-route Suspense fallback Next.js triggers on route changes. The two
 * are not allowed to overlap in responsibility (see Architecture §11 fix).
 */
export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-sm tracking-wide text-muted-foreground"
          >
            {siteConfig.name}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
