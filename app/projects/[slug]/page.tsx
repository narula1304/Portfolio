import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/layouts/CaseStudyLayout";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { getProjectJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";

type PageParams = { slug: string };

export function generateStaticParams() {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    return {
        title: project.title,
        description: project.summary,
        alternates: {
            canonical: `${siteConfig.url}/projects/${slug}`,
        },
        openGraph: {
            title: project.title,
            description: project.summary,
        },
    };
}

export default async function ProjectCaseStudyPage({
    params,
}: {
    params: Promise<PageParams>;
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const jsonLd = getProjectJsonLd(project);

    return (
        <>
            {/* [Architecture §8] SoftwareSourceCode schema for this case study */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CaseStudyLayout project={project} />
        </>
    );
}