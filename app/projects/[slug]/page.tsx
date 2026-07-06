import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/layouts/CaseStudyLayout";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";

type PageParams = { slug: string };

// [Architecture §3 / §8] Required for SSG — every case study is pre-rendered
// at build time rather than falling back to on-demand SSR.
export function generateStaticParams() {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

// [Architecture §8 fix] Required on every dynamic route — without this,
// every case study would share the same generic title/description when
// shared on social platforms.
// Next.js 15: params is a Promise on both generateMetadata and the page.
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

    return <CaseStudyLayout project={project} />;
}