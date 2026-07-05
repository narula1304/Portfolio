/**
 * Placeholder landing page for the scaffold step (build order §13, step 1).
 * Hero, About, Projects, etc. organisms are built in step 4 onward — this
 * page exists only to prove the token system, fonts, and providers render
 * correctly end-to-end before content is layered in.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        scaffold ✓ — step 1 of 10
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
        Prince Narula
      </h1>
      <p className="max-w-md text-muted-foreground">
        Full stack &amp; backend engineer. Design tokens, fonts, and providers
        are wired up — Hero and the rest of the sections land in the next build
        steps.
      </p>
    </div>
  );
}
