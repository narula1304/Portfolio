/**
 * [Architecture §7] Case study sections as a discriminated union — every
 * project's case study is validated against this shape at build time
 * (lib/validations/project-frontmatter.ts), so a malformed case study
 * fails the build instead of rendering blank in production.
 */
export type CaseStudySectionType =
    | { kind: "problem"; title?: string; content: string }
    | { kind: "architecture"; title?: string; content: string }
    | { kind: "techStack"; title?: string; items: string[] }
    | { kind: "databaseDesign"; title?: string; content: string }
    | { kind: "apiDesign"; title?: string; content: string }
    | { kind: "scalability"; title?: string; content: string }
    | { kind: "challenges"; title?: string; content: string }
    | { kind: "lessonsLearned"; title?: string; content: string }
    | { kind: "futureImprovements"; title?: string; content: string };

export type ProjectStatus = "shipped" | "building";

export interface ProjectLinks {
    github?: string;
    demo?: string;
}

/**
 * Placeholder cover strategy (Architecture §12): real screenshots don't
 * exist yet, so each project defines a two-color gradient used to render
 * a palette-matched placeholder cover instead of a stock photo.
 */
export interface ProjectCover {
    gradientFrom: string;
    gradientTo: string;
}

export interface Project {
    slug: string;
    title: string;
    summary: string;
    status: ProjectStatus;
    techStack: string[];
    cover: ProjectCover;
    links: ProjectLinks;
    featured: boolean;
    sections: CaseStudySectionType[];
}