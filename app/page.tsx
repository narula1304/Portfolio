import { Hero } from "@/components/organisms/Hero";
import { About } from "@/components/organisms/About";
import { ProjectsGrid, ProjectsSectionHeading } from "@/components/organisms/ProjectsGrid";
import { getAllProjects } from "@/lib/mdx";

/**
 * Landing page. Sections beyond Projects (Skills, Timeline, Achievements,
 * Coding Profiles, Contact) land in build steps 6-7.
 */
export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />
      <About />
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ProjectsSectionHeading />
        <ProjectsGrid projects={projects} variant="preview" />
      </section>
    </>
  );
}