# Prince Narula — Portfolio

Personal portfolio site. Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4, Framer Motion, shadcn/ui conventions.

Build follows `ARCHITECTURE_FINAL.md` — that document is the single source of truth for structure and decisions. This README covers local setup only.

## Status

**Step 1 of 10 complete: scaffold.** Design tokens, fonts, providers (theme, pointer, smooth-scroll, command palette stub), tooling (ESLint/Prettier/Husky/lint-staged), and testing (Vitest + Playwright) are all wired and passing. The landing page is a placeholder — Hero, About, Projects, etc. land in the following build steps.

**Step 2 of 10 complete: layout shell.** Navbar (sticky, blur-on-scroll, scroll-spy, mobile menu), Footer, global chrome (ScrollProgress, BackToTop, LoadingScreen), and error/loading/not-found pages.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command                | What it does                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm run dev`          | Local dev server                                                         |
| `npm run build`        | Production build                                                         |
| `npm run start`        | Serve the production build                                               |
| `npm run lint`         | ESLint                                                                   |
| `npm run format`       | Prettier — writes fixes                                                  |
| `npm run format:check` | Prettier — check only                                                    |
| `npm run typecheck`    | `tsc --noEmit`                                                           |
| `npm run test:unit`    | Vitest                                                                   |
| `npm run test:e2e`     | Playwright (requires `npx playwright install` once, and a running build) |

Husky runs `lint-staged` (ESLint + Prettier on staged files) on every commit automatically once you `npm install` locally (the `prepare` script sets this up).

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as they become available:

```bash
cp .env.example .env.local
```

Nothing is required to run `npm run dev` today — these are stubs for the contact form, Cloudinary, and analytics, wired in later build steps.

## Placeholders to swap before launch

Everything below is a deliberate placeholder so the site runs and looks complete today. Search for `TODO:` in the codebase to find every instance.

| Placeholder                                               | File                           | Replace with                                               |
| --------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| GitHub / LinkedIn / LeetCode / Codeforces / CodeChef URLs | `config/site.ts`               | Your real profile URLs                                     |
| Resume                                                    | `public/resume.pdf`            | Your real resume PDF (same filename)                       |
| Production URL                                            | `config/site.ts` (`url` field) | Your real deployed domain                                  |
| Project screenshots                                       | (added in build step 5)        | Real screenshots/GIFs, replacing gradient placeholder SVGs |
| Coding profile stats                                      | (added in build step 6)        | Your real LeetCode/Codeforces/CodeChef numbers             |

## Deployment

Designed for Vercel (zero-config for Next.js App Router). Any Node-compatible host works too.

## Architecture

See `ARCHITECTURE_FINAL.md` in the repo root for the full design system, component hierarchy, folder structure rationale, and build order.
