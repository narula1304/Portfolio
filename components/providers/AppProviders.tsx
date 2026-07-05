import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { PointerProvider } from "./PointerProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { CommandPaletteProvider } from "./CommandPaletteProvider";

/**
 * [Architecture §3 fix] Single composition point for every provider.
 * Root layout imports only <AppProviders>, keeping layout.tsx readable
 * as more providers get added over time instead of nesting growing there.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <PointerProvider>
        <SmoothScrollProvider>
          <CommandPaletteProvider>{children}</CommandPaletteProvider>
        </SmoothScrollProvider>
      </PointerProvider>
    </ThemeProvider>
  );
}
