/**
 * Single source of truth for site-wide metadata.
 * Referenced by root layout metadata, footer, contact section, and JSON-LD.
 * Swap placeholder URLs once real assets are ready (see README "Placeholders to swap").
 */

export const siteConfig = {
  name: "Prince Narula",
  title: "Prince Narula — Full Stack & Backend Engineer",
  description:
    "Full stack and backend engineer building real-time systems, developer tools, and AI-driven products. B.Tech CSE, IIITDM Jabalpur.",
  // TODO: replace with the real production URL before deploying
  url: "https://princenarula.dev",
  ogImage: "/opengraph-image",
  links: {
    // TODO: replace all placeholders below with real profile URLs
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    leetcode: "https://leetcode.com/",
    codeforces: "https://codeforces.com/",
    codechef: "https://codechef.com/",
    email: "mailto:hello@example.com",
    resume: "/resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
