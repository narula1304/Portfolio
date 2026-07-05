import { Hero } from "@/components/organisms/Hero";
import { About } from "@/components/organisms/About";

/**
 * Landing page. Sections beyond About (Projects, Skills, Timeline,
 * Achievements, Coding Profiles, Contact) land in build steps 5-7.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}