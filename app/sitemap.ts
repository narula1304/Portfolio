import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProjectSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
    const projectEntries: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
        url: `${siteConfig.url}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteConfig.url}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${siteConfig.url}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
        },
        ...projectEntries,
    ];
}