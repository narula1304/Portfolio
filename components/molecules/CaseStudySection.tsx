import { Heading } from "@/components/atoms/Heading";
import type { CaseStudySectionType } from "@/types";

const DEFAULT_TITLES: Record<CaseStudySectionType["kind"], string> = {
    problem: "Problem",
    architecture: "Architecture",
    techStack: "Tech Stack",
    databaseDesign: "Database Design",
    apiDesign: "API Design",
    scalability: "Scalability",
    challenges: "Challenges",
    lessonsLearned: "Lessons Learned",
    futureImprovements: "Future Improvements",
};

/**
 * Renders one block of a case study. Typed against the CaseStudySectionType
 * discriminated union (Architecture §7) — TypeScript enforces that every
 * "kind" is handled here, so adding a new section kind without updating
 * this component is a compile error, not a silent gap.
 */
export function CaseStudySection({ section }: { section: CaseStudySectionType }) {
    const title = section.title ?? DEFAULT_TITLES[section.kind];

    return (
        <section className="border-b border-border py-10 first:pt-0 last:border-b-0">
            <Heading as="h2" size="h3" className="mb-4">
                {title}
            </Heading>

            {section.kind === "techStack" ? (
                <ul className="flex flex-col gap-2">
                    {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="max-w-3xl leading-relaxed text-muted-foreground">
                    {section.content}
                </p>
            )}
        </section>
    );
}