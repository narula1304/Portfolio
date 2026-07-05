"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Context/open-state only. The actual <CommandPalette> UI (cmdk, focus-trap,
 * aria-modal, ⌘K listener) ships in build step 8 per the architecture doc's
 * build order — this stub exists now so AppProviders has a stable shape and
 * nothing has to be rewired later.
 */

type CommandPaletteState = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CommandPaletteContext = createContext<CommandPaletteState>({
  isOpen: false,
  setIsOpen: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}
