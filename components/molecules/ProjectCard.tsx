import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/atoms/Badge";
import type { Project } from "@/types";

/**
 * [Architecture §3 fix] Strictly presentational, prop-driven, zero data-
 * fetching — reused as-is in both the landing page's featured preview and
 * the full /projects grid. Never bake fetch logic into this component.
 *
 * No real screenshots yet, so the cover is a palette-matched gradient
 * placeholder (Architecture §12) rather than a stock photo.
 */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_-15px_var(--primary)] hover:-translate-y-1">
            <div
                className="h-40 w-full transition-transform duration-500 group-hover:scale-[1.03]"
                style={{
                    background: `linear-gradient(135deg, ${project.cover.gradientFrom}, ${project.cover.gradientTo})`,
                }}
            />

            <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{project.title}</h3>
                    {project.status === "building" && (
                        <Badge className="shrink-0">Currently Building</Badge>
                    )}
                </div>

                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {project.summary}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md bg-background px-2 py-1 text-xs text-muted-foreground"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-3 text-sm">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
                    >
                        Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    {project.links.github && (
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                            <FaGithub className="h-3.5 w-3.5" /> Code
                        </a>
                    )}
                    {project.links.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                            Live Demo
                        </a>
                    )}
        </div>
      </div >
    </div >
  );
}