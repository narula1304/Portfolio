"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently "active" for the Navbar's underline
 * indicator. Uses IntersectionObserver rather than scroll-position math so
 * it stays correct regardless of Lenis's smooth-scroll easing.
 *
 * rootMargin biases the trigger toward the top third of the viewport, so a
 * section is marked active once it's clearly the one the user is reading,
 * not the instant its top pixel appears at the very bottom of the screen.
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
