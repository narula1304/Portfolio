import { z } from "zod";

/**
 * [Architecture §7 / §10] Validates every project's frontmatter at build
 * time. A malformed case study — a typo'd section "kind", a missing
 * required field — fails the build loudly instead of silently rendering
 * blank in production.
 */
const caseStudySectionSchema = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("problem"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("architecture"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("techStack"), title: z.string().optional(), items: z.array(z.string()) }),
    z.object({ kind: z.literal("databaseDesign"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("apiDesign"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("scalability"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("challenges"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("lessonsLearned"), title: z.string().optional(), content: z.string() }),
    z.object({ kind: z.literal("futureImprovements"), title: z.string().optional(), content: z.string() }),
]);

export const projectFrontmatterSchema = z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    status: z.enum(["shipped", "building"]),
    techStack: z.array(z.string()).min(1),
    cover: z.object({
        gradientFrom: z.string(),
        gradientTo: z.string(),
    }),
    links: z.object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
    }),
    featured: z.boolean().default(false),
    sections: z.array(caseStudySectionSchema).min(1),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;