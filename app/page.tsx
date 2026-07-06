import { Hero } from "@/components/organisms/Hero";
import { About } from "@/components/organisms/About";
import { ProjectsGrid, ProjectsSectionHeading } from "@/components/organisms/ProjectsGrid";
import { SkillsMatrix } from "@/components/organisms/SkillsMatrix";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { AchievementsGrid } from "@/components/organisms/AchievementsGrid";
import { CodingProfiles } from "@/components/organisms/CodingProfiles";
import { getAllProjects } from "@/lib/mdx";

/**
 * Landing page. Contact section lands in build step 7.
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
      <SkillsMatrix />
      <ExperienceTimeline />
      <AchievementsGrid />
      <CodingProfiles />
    </>
  );
}