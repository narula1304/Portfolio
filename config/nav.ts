/**
 * Nav items + anchor IDs live here so Navbar, mobile menu, and the
 * useScrollSpy hook all read from one place instead of duplicating
 * section IDs across components.
 */

export type NavItem = {
  label: string;
  href: string; // "#id" for landing sections, "/path" for real routes
};

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

// Section IDs used by useScrollSpy — kept separate from navItems so
// sections that exist but aren't in the nav (if any) can still be tracked.
export const scrollSpySectionIds = [
  "about",
  "projects",
  "skills",
  "timeline",
  "achievements",
  "profiles",
  "contact",
];
