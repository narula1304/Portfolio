import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

/**
 * Per-project OG image using each project's own gradient cover (Architecture
 * §12 placeholder strategy) so case studies don't all share the identical
 * social preview.
 */
export default async function Image({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    const title = project?.title ?? siteConfig.title;
    const summary = project?.summary ?? siteConfig.description;
    const gradientFrom = project?.cover.gradientFrom ?? "oklch(0.62 0.19 260)";
    const gradientTo = project?.cover.gradientTo ?? "oklch(0.62 0.22 300)";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    padding: 64,
                }}
            >
                <div style={{ fontSize: 56, fontWeight: 700, color: "white", letterSpacing: -1.5 }}>
                    {title}
                </div>
                <div
                    style={{
                        fontSize: 26,
                        color: "rgba(255,255,255,0.85)",
                        marginTop: 12,
                        maxWidth: 900,
                    }}
                >
                    {summary}
                </div>
            </div>
        ),
        { ...size }
    );
}