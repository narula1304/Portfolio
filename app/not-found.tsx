import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="max-w-sm text-muted-foreground">
        The page you&apos;re looking for was moved, deleted, or never existed.
      </p>
      <Button asChild className="mt-2">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
