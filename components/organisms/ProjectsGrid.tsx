"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Heading } from "@/components/atoms/Heading";
import { Badge } from "@/components/atoms/Badge";
import { EmptyState } from "@/components/atoms/EmptyState";
import type { Project } from "@/types";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

interface ProjectsGridProps {
    projects: Project[];
    /** "preview" = landing page's featured subset, no search/filter.
     *  "full" = /projects route, with search + tech filter. */
    variant?: "preview" | "full";
}

export function ProjectsGrid({ projects, variant = "full" }: ProjectsGridProps) {
    const [query, setQuery] = useState("");
    const [activeTech, setActiveTech] = useState<string | null>(null);

    const allTech = useMemo(
        () => Array.from(new Set(projects.flatMap((p) => p.techStack))).sort(),
        [projects]
    );

    const visibleProjects = useMemo(() => {
        const base = variant === "preview" ? projects.filter((p) => p.featured) : projects;

        return base.filter((project) => {
            const matchesQuery =
                query.trim() === "" ||
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.summary.toLowerCase().includes(query.toLowerCase());
            const matchesTech = !activeTech || project.techStack.includes(activeTech);
            return matchesQuery && matchesTech;
        });
    }, [projects, variant, query, activeTech]);

    return (
        <div>
            {variant === "full" && (
                <div className="mb-8 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search projects…"
                            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-primary"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setActiveTech(null)}>
                            <Badge
                                className={
                                    activeTech === null ? "border-primary text-foreground" : undefined
                                }
                            >
                                All
                            </Badge>
                        </button>
                        {allTech.map((tech) => (
                            <button key={tech} onClick={() => setActiveTech(tech)}>
                                <Badge
                                    className={
                                        activeTech === tech ? "border-primary text-foreground" : undefined
                                    }
                                >
                                    {tech}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {visibleProjects.length === 0 ? (
                <EmptyState
                    title="No projects match your search"
                    description="Try a different keyword or clear the tech filter."
                />
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {visibleProjects.map((project) => (
                        <motion.div key={project.slug} variants={fadeUp}>
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {variant === "preview" && (
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/projects"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        View all projects →
                    </Link>
                </div>
            )}
        </div>
    );
}

export function ProjectsSectionHeading() {
    return (
        <div className="mb-10">
            <p className="mb-3 font-mono text-sm text-muted-foreground">02 / Projects</p>
            <Heading as="h2" size="h1">
                Things I&apos;ve built.
            </Heading>
        </div>
    );
}