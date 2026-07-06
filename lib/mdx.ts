import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { projectFrontmatterSchema } from "@/lib/validations/project-frontmatter";
import type { Project } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Reads every .mdx file in content/projects, validates its frontmatter
 * against projectFrontmatterSchema, and returns typed Project objects.
 * Throws (failing the build) if any project's frontmatter is malformed —
 * this is intentional, see Architecture §7.
 */
export function getAllProjects(): Project[] {
    const filenames = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

    const projects = filenames.map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const fullPath = path.join(PROJECTS_DIR, filename);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        const result = projectFrontmatterSchema.safeParse(data);
        if (!result.success) {
            throw new Error(
                `Invalid frontmatter in content/projects/${filename}:\n${result.error.toString()}`
            );
        }

        return { slug, ...result.data } satisfies Project;
    });

    // Featured projects first, then alphabetical by title within each group.
    return projects.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.title.localeCompare(b.title);
    });
}

export function getProjectBySlug(slug: string): Project | null {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const result = projectFrontmatterSchema.safeParse(data);
    if (!result.success) {
        throw new Error(
            `Invalid frontmatter in content/projects/${slug}.mdx:\n${result.error.toString()}`
        );
    }

    return { slug, ...result.data } satisfies Project;
}

export function getAllProjectSlugs(): string[] {
    return fs
        .readdirSync(PROJECTS_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}