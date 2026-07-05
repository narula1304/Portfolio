import { Spinner } from "@/components/atoms/Spinner";

/**
 * Next.js route-level Suspense fallback — fires on client-side route
 * transitions (e.g. navigating to /projects/[slug]). Deliberately separate
 * from components/chrome/LoadingScreen, which only ever shows once on a
 * hard page load. See Architecture §11 for why these two are kept apart.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner />
    </div>
  );
}
