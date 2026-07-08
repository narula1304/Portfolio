import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";
import type { Project } from "@/types";

const PLACEHOLDER_LINKS = new Set([
    "https://github.com/",
    "https://linkedin.com/in/",
]);

/**
 * [Architecture §8] Person schema for the homepage. Placeholder social
 * links (still unset in config/site.ts) are filtered out of sameAs rather
 * than emitting broken/empty URLs into structured data.
 */
export function getPersonJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        jobTitle: profile.role,
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: profile.education.institution,
        },
        sameAs: [siteConfig.links.github, siteConfig.links.linkedin].filter(
            (url) => !PLACEHOLDER_LINKS.has(url)
        ),
    };
}

/**
 * [Architecture §8] SoftwareSourceCode/CreativeWork schema for each case
 * study — more accurate than generic CreativeWork given every project
 * here is, specifically, source code.
 */
export function getProjectJsonLd(project: Project) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.summary,
        programmingLanguage: project.techStack,
        ...(project.links.github ? { codeRepository: project.links.github } : {}),
        author: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };
}

/**
 * [Architecture §8] Article schema — ready for when the first blog post
 * ships (content/blog is scaffolded but empty, see app/blog/page.tsx).
 * Not wired anywhere yet since there's no post to call it with.
 */
export function getArticleJsonLd(post: {
    title: string;
    description: string;
    publishedAt: string;
    slug: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        author: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        url: `${siteConfig.url}/blog/${post.slug}`,
    };
}