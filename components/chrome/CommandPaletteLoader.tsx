"use client";

import dynamic from "next/dynamic";

/**
 * [Architecture §10 fix] next/dynamic with ssr:false must be called from a
 * Client Component in the App Router — this thin wrapper exists so
 * PageShell (a Server Component) can still render the palette without
 * needing "use client" itself. Not needed for first paint, so it's
 * excluded from the initial bundle entirely.
 */
const CommandPalette = dynamic(
    () => import("./CommandPalette").then((mod) => mod.CommandPalette),
    { ssr: false }
);

export function CommandPaletteLoader() {
    return <CommandPalette />;
}