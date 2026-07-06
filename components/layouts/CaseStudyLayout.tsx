import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Heading } from "@/components/atoms/Heading";
import { CaseStudySection } from "@/components/molecules/CaseStudySection";
import type { Project } from "@/types";

export function CaseStudyLayout({ project }: { project: Project }) {
    return (
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <Link
                href="/projects"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> All projects
            </Link>

            <div
                className="mb-8 h-48 w-full rounded-xl md:h-64"
                style={{
                    background: `linear-gradient(135deg, ${project.cover.gradientFrom}, ${project.cover.gradientTo})`,
                }}
            />

            <div className="mb-3 flex items-center gap-2">
                {project.status === "building" && <Badge>Currently Building</Badge>}
            </div>

            <Heading as="h1" size="hero" className="mb-4">
                {project.title}
            </Heading>

            <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                {project.summary}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                ))}
            </div>

            <div className="mb-12 flex gap-3">
                {project.links.github && (
                    <Button asChild variant="outline">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="h-4 w-4" /> GitHub
                        </a>
                    </Button>
                )}
                {project.links.demo && (
                    <Button asChild>
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            Live Demo
                        </a>
                    </Button>
                )}
            </div>

            <div>
                {project.sections.map((section) => (
                    <CaseStudySection key={section.kind} section={section} />
                ))}
            </div>
        </article>
    );
}