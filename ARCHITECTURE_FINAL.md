# Prince Narula — Portfolio Architecture (FINAL — Source of Truth)

_Revision 2. Supersedes the v1 draft. All changes below came out of a Principal-Engineer-level review — see change markers `[FIX]` inline where something was corrected from v1._

## 1. Product Framing

A product landing page for an engineer, not a card-grid student portfolio. Narrative arc: **Hook → Proof → Depth → Credibility → Action.**

---

## 2. Site Map

```
/                          Landing (Hero, About preview, Featured Projects, Skills preview,
                           Timeline preview, Achievements, Coding Profiles, Contact)
/projects                  Full project grid — search + filter, line-clamped cards [FIX: card-internal responsiveness]
/projects/[slug]           Case study page (generateStaticParams, generateMetadata) [FIX: SEO]
/blog                      Blog index — paginated once >12 posts [FIX: scalability], empty-state ready
/blog/[slug]               Blog post (generateStaticParams, generateMetadata, Article JSON-LD) [FIX: SEO]
/resume                    Redirects to /resume.pdf (tracked download)
/404                       Custom not-found (app/not-found.tsx)
/error                     app/error.tsx + app/global-error.tsx [FIX: no error boundaries in v1]
```

Landing sections remain anchor-linked (`#about`, `#projects`, `#skills`, `#timeline`, `#achievements`, `#profiles`, `#contact`) for scroll-spy. Deep content breaks into real routes for shareability and individual indexing.

---

## 3. Component Hierarchy (Atomic Design)

```
components/
├── atoms/
│   ├── Button.tsx                 (variants: primary, ghost, outline, icon; :focus-visible ring is independent of hover state) [FIX: a11y]
│   ├── Badge.tsx
│   ├── Heading.tsx
│   ├── GradientText.tsx           (usage-gated — see §6.3)
│   ├── Divider.tsx
│   ├── Spinner.tsx
│   ├── Kbd.tsx
│   ├── SkipToContent.tsx          [FIX: missing in v1 — required a11y landmark]
│   └── EmptyState.tsx             [FIX: missing — used by blog + zero search results]
│
├── molecules/
│   ├── NavLink.tsx
│   ├── ThemeToggle.tsx
│   ├── SocialLink.tsx
│   ├── SkillChip.tsx
│   ├── StatCard.tsx
│   ├── TimelineNode.tsx
│   ├── ProjectCard.tsx            (STRICTLY presentational, prop-driven, zero data-fetching —
│   │                                enforced so it's safely reused in both Hero preview and /projects grid) [FIX: reuse contract]
│   ├── CaseStudySection.tsx       (typed against a discriminated union — see §7) [FIX: no type contract in v1]
│   └── FormField.tsx
│
├── organisms/                     (page CONTENT only — see chrome/ split below) [FIX: v1 mixed content + global UI]
│   ├── Navbar.tsx                 (sticky, blur-on-scroll, scroll-spy, mobile sheet, skip-link target)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ExperienceTimeline.tsx
│   ├── ProjectsGrid.tsx
│   ├── SkillsMatrix.tsx
│   ├── AchievementsGrid.tsx
│   ├── CodingProfiles.tsx
│   ├── BlogPreview.tsx
│   └── ContactForm.tsx
│
├── chrome/                        [FIX: new — global, viewport-level, singleton UI separated from page content]
│   ├── CommandPalette.tsx         (cmdk; focus-trapped, aria-modal, returns focus to trigger on close) [FIX: a11y contract]
│   ├── ScrollProgress.tsx
│   ├── BackToTop.tsx
│   ├── LoadingScreen.tsx          (first-paint splash ONLY — distinct from route-level app/loading.tsx) [FIX: resolved conflict]
│   └── CustomCursor.tsx           (mounted ONCE in root layout, not per-page; disabled on touch + prefers-reduced-motion) [FIX: singleton mount]
│
├── layouts/
│   ├── PageShell.tsx
│   └── CaseStudyLayout.tsx
│
└── providers/
    ├── AppProviders.tsx            [FIX: new — single composition point, avoids provider-nesting sprawl]
    ├── ThemeProvider.tsx
    ├── SmoothScrollProvider.tsx    (Lenis — exposes the shared scroll context, see §9.1)
    ├── PointerProvider.tsx         [FIX: new — single shared mousemove/scroll observable consumed by
    │                                CustomCursor, parallax, and magnetic buttons instead of 3 separate listeners]
    └── CommandPaletteProvider.tsx
```

---

## 4. Folder Structure

```
prince-portfolio/
├── app/
│   ├── layout.tsx                  (fonts, metadataBase, AppProviders) [FIX: metadataBase required, was missing]
│   ├── page.tsx
│   ├── loading.tsx                 (route-level Suspense fallback — Next.js convention)
│   ├── error.tsx                   [FIX: added]
│   ├── global-error.tsx            [FIX: added]
│   ├── not-found.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx
│   ├── api/
│   │   └── contact/route.ts        [FIX: reserved now, not deferred — form has a real fetch target from day one]
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx         (generateStaticParams + generateMetadata required)
│   └── blog/
│       ├── page.tsx                (paginated)
│       └── [slug]/page.tsx         (generateStaticParams + generateMetadata required)
│
├── components/                     (see §3)
│
├── content/
│   ├── projects/*.mdx              (MDX only — no .ts alternative) [FIX: resolved v1 ambiguity]
│   └── blog/*.mdx
│
├── data/
│   ├── profile.ts
│   ├── skills.ts
│   ├── timeline.ts
│   ├── achievements.ts
│   └── coding-profiles.ts
│
├── config/                         [FIX: new layer — v1 implied these lived hardcoded inside components]
│   ├── site.ts                     (name, URL, social handles, single source for metadata + footer + contact)
│   └── nav.ts                      (nav items + anchor IDs — Navbar and scroll-spy both read from here)
│
├── lib/
│   ├── utils.ts
│   ├── mdx.ts
│   ├── seo.ts                      (generates Person/Article/CreativeWork JSON-LD) [FIX: schema types now explicit]
│   └── validations/
│       ├── contact.ts
│       ├── project-frontmatter.ts  [FIX: added — build fails on malformed project content]
│       └── blog-frontmatter.ts     [FIX: added]
│
├── hooks/
│   ├── useScrollSpy.ts
│   ├── useMediaQuery.ts
│   ├── usePointer.ts               [FIX: replaces useMousePosition — reads from shared PointerProvider]
│   └── useLockBodyScroll.ts
│
├── types/
│   └── index.ts                    (Project, TimelineEntry, Skill, CaseStudySection discriminated union) [FIX]
│
├── tests/                          [FIX: added — was entirely absent in v1]
│   ├── unit/                       (Vitest + React Testing Library)
│   └── e2e/                        (Playwright — one smoke test: nav → project → contact)
│
├── public/
│   ├── favicon.ico
│   ├── resume.pdf                  (placeholder stub)
│   └── images/
│
├── .github/workflows/ci.yml        [FIX: added — typecheck + lint + build on push]
├── .env.example                    [FIX: added — Cloudinary, contact-email, analytics keys stubbed]
├── next.config.ts                  (images.remotePatterns for Cloudinary) [FIX: was unspecified]
├── tailwind.config.ts
├── tsconfig.json                   (strict: true, path aliases @/* confirmed) [FIX: aliases now explicit]
└── package.json
```

---

## 5. Design System

### 5.1 Color Tokens (OKLCH, dark-first)

| Token                | Dark                         | Light                   |
| -------------------- | ---------------------------- | ----------------------- |
| `--background`       | `oklch(0.14 0.01 260)`       | `oklch(0.99 0.002 260)` |
| `--foreground`       | `oklch(0.96 0.005 260)`      | `oklch(0.15 0.01 260)`  |
| `--muted-foreground` | `oklch(0.65 0.02 260)`       | `oklch(0.45 0.02 260)`  |
| `--primary` (blue)   | `oklch(0.62 0.19 260)`       | `oklch(0.55 0.19 260)`  |
| `--accent` (purple)  | `oklch(0.62 0.22 300)`       | `oklch(0.55 0.22 300)`  |
| `--border`           | `oklch(0.27 0.01 260 / 40%)` | `oklch(0.9 0.005 260)`  |
| `--card`             | `oklch(0.17 0.01 260)`       | `oklch(1 0 0)`          |

**[FIX] Every token pair above must be run through a contrast checker for WCAG AA (4.5:1 body text, 3:1 large text) before implementation — not eyeballed.**

### 5.2 Elevation & Radius Tokens

**[FIX: promoted from prose in v1 to real tokens]**

```
--radius-sm: 0.5rem;  --radius-md: 0.75rem;  --radius-lg: 1rem;  --radius-xl: 1.5rem;
--shadow-glow-primary: 0 0 40px -15px oklch(0.62 0.19 260 / 50%);
--shadow-glow-accent:  0 0 40px -15px oklch(0.62 0.22 300 / 50%);
```

Components consume these tokens directly — no arbitrary Tailwind shadow/radius values in component code.

### 5.3 Gradient / Accent Discipline

**[FIX: new rule, v1 had no usage limit]**
One gradient moment per viewport, matching the animation restraint rule in §6. Gradient text, glow shadows, and gradient CTAs never all appear in the same section simultaneously — pick exactly one accent moment per screen.

### 5.4 Typography

- Display/headings: Geist Sans — tight tracking at large sizes
- Body: Inter — 1.6 line-height
- Mono (stats, code, coding-profile numbers): Geist Mono
- **[FIX] All three loaded via `next/font` with only the actual weights used subsetted in** — this is the single biggest lever for the >95 Lighthouse performance target, so it's a hard requirement, not a nice-to-have.

### 5.5 Spacing & Grid

Base unit 4px. Section rhythm `py-24 md:py-32`. `max-w-6xl` prose, `max-w-7xl` grids. Project grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`.

**[FIX] Card-internal responsiveness rule (missing in v1):** long titles/descriptions in `ProjectCard` use `line-clamp-2`/`line-clamp-3` — grid column count is not the only responsive concern; content inside a card must degrade gracefully independent of column width.

---

## 6. Animation Plan

Same table as v1 (fade/stagger on scroll, hero word-stagger, magnetic buttons, timeline draw-in, etc.) — restraint rule unchanged: **max one continuous/looping animation per viewport** (hero background only). Everything else is hover/scroll/click-triggered.

**[FIX] Explicit reduced-motion / touch disabling, per component (v1 only had a blanket statement):**

| Component                    | Disabled when                                                           |
| ---------------------------- | ----------------------------------------------------------------------- |
| `CustomCursor`               | touch device OR `prefers-reduced-motion`                                |
| Mouse-parallax on hero blobs | touch device OR `prefers-reduced-motion`                                |
| Magnetic buttons             | touch device OR `prefers-reduced-motion` (falls back to standard hover) |
| Gradient drift               | `prefers-reduced-motion` (falls back to static gradient)                |

### 6.1 Shared Pointer/Scroll Context

**[FIX: v1 had 3 independent listeners — cursor, parallax, Lenis — a real jank risk]**
`PointerProvider` owns the single `mousemove` listener and `SmoothScrollProvider` (Lenis) owns the single scroll listener. `CustomCursor`, parallax blobs, and magnetic buttons all _read_ from `PointerProvider` via `usePointer()` — none attach their own raw listener. Lenis's scroll position is the single source of truth that Framer's `whileInView` and native anchor-scroll (`#about` links) both key off, so scroll-triggered animations and nav-jump behavior never disagree about scroll position.

---

## 7. Type Contracts

**[FIX: new section — v1 left case-study shape untyped]**

```ts
type CaseStudySectionType =
  | { kind: "problem"; content: string }
  | { kind: "architecture"; content: string; diagram?: string }
  | { kind: "techStack"; items: string[] }
  | { kind: "databaseDesign"; content: string; schema?: string }
  | { kind: "apiDesign"; content: string }
  | { kind: "scalability"; content: string }
  | { kind: "challenges"; content: string }
  | { kind: "lessonsLearned"; content: string }
  | { kind: "futureImprovements"; content: string };
```

Every case study is validated against this union at build time via `lib/validations/project-frontmatter.ts` — a malformed case study fails the build instead of rendering blank in production.

---

## 8. SEO

**[FIX: v1 listed "Structured Data" as a bullet with no spec — now explicit]**

- `metadataBase` set once in root `layout.tsx` (required in Next 15 for OG/Twitter image URL resolution)
- `generateMetadata` required on every dynamic route (`/projects/[slug]`, `/blog/[slug]`) — no shared generic title/description across case studies
- JSON-LD structured data: `Person` schema on `/`, `Article` on blog posts, `CreativeWork`/`SoftwareSourceCode` on case studies
- `sitemap.ts`, `robots.ts`, dynamic `opengraph-image.tsx` unchanged from v1

---

## 9. Accessibility

**[FIX: v1 had a blanket a11y bullet list, now concrete requirements]**

- Skip-to-content link (`SkipToContent` atom) as the first focusable element, targeting `<main>`
- `:focus-visible` ring tokens defined independently of hover/cursor styling — keyboard focus must work identically whether or not `CustomCursor` is active
- `CommandPalette`: focus-trapped while open, `aria-modal="true"`, returns focus to the trigger element on close
- Reduced-motion table in §6 — checked per-component, not assumed globally
- All color pairs verified for WCAG AA contrast (§5.1)

---

## 10. Performance

- Code-splitting: `CommandPalette` and `CustomCursor` loaded via `next/dynamic(..., { ssr: false })` — neither is needed for first paint **[FIX: v1 implied eager load]**
- `next.config.ts` `images.remotePatterns` configured for Cloudinary **[FIX: unspecified in v1]**
- Font subsetting per §5.4
- Shared pointer/scroll context per §6.1 to avoid competing raf loops

---

## 11. Developer Experience

**[FIX: entirely new section — v1 had none of this]**

- ESLint + Prettier + Husky + lint-staged, enforced pre-commit
- `.github/workflows/ci.yml`: typecheck + lint + build on every push
- `tests/unit` (Vitest + RTL) for components, `tests/e2e` (Playwright) — one smoke test covering nav → project case study → contact form
- `.env.example` stubbing Cloudinary, contact-form email service, and analytics keys
- `tsconfig.json` path aliases (`@/components`, `@/lib`, `@/data`, `@/config`) confirmed at scaffold time, not assumed later

---

## 12. Placeholder Strategy (unchanged from v1, confirmed)

- Social/coding-profile URLs → `#` placeholders in `data/profile.ts` / `data/coding-profiles.ts`, marked `TODO:`, listed in a README section
- `public/resume.pdf` → stub file so the button doesn't 404
- Project screenshots → palette-matched gradient placeholder SVGs, not stock photos
- Coding profile stats → realistic-shaped placeholder numbers, commented as sample data

---

## 13. Build Order

1. Scaffold: Next.js 15 + TS (strict, aliased) + Tailwind + shadcn/ui + fonts + `AppProviders` + CI + lint/format config
2. Design tokens: `globals.css`, `tailwind.config.ts` (colors, radius, shadow — all tokenized per §5)
3. Layout shell: `Navbar`, `Footer`, `chrome/` (ScrollProgress, BackToTop, LoadingScreen), skip-link, `app/error.tsx`/`app/loading.tsx`
4. Hero + About
5. Projects grid + first 2 case studies (CampusOps, LingoLens) as the template, with frontmatter validation wired
6. Skills, Timeline, Achievements, Coding Profiles
7. Contact form (RHF + Zod) wired to the real (stubbed) `app/api/contact/route.ts`
8. Command Palette + keyboard shortcuts (dynamically imported, focus-trapped)
9. SEO: sitemap, robots, OG image, JSON-LD per §8
10. Custom 404, one Playwright smoke test, accessibility audit, Lighthouse pass, CI green

Each step ships working, runnable code.
