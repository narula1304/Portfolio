import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Elegant, minimal — per the brief's "Footer: Elegant. Minimal." spec.
 * Brand icons (GitHub/LinkedIn) come from react-icons — lucide-react
 * dropped brand/logo icons, so generic UI icons stay on lucide and brand
 * marks use react-icons, matching the original tech-stack spec.
 * Social links reuse siteConfig.links (single source of truth), so the
 * placeholder-swap checklist in the README covers this automatically.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: siteConfig.links.github, label: "GitHub", icon: FaGithub },
    { href: siteConfig.links.linkedin, label: "LinkedIn", icon: FaLinkedin },
    { href: siteConfig.links.email, label: "Email", icon: Mail },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
