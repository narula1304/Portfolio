import type { Metadata } from "next";
import { ProjectsGrid, ProjectsSectionHeading } from "@/components/organisms/ProjectsGrid";
import { getAllProjects } from "@/lib/mdx";

export const metadata: Metadata = {
    title: "Projects",
    description: "Real-time systems, developer tools, and AI-driven products.",
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <ProjectsSectionHeading />
            <ProjectsGrid projects={projects} variant="full" />
        </div>
    );
}