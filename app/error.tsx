"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";

/**
 * [Architecture §3 fix] Route-level error boundary — was entirely missing
 * in v1, so a single component throw would take down the whole route with
 * Next.js's default (unstyled) error screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">Error</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-sm text-muted-foreground">
        An unexpected error occurred while rendering this page.
      </p>
      <Button onClick={() => reset()} className="mt-2">
        Try again
      </Button>
    </div>
  );
}
