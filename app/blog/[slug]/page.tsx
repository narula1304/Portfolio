import type { Metadata } from "next";
import { EmptyState } from "@/components/atoms/EmptyState";

export const metadata: Metadata = {
    title: "Blog",
    description: "Writing on Socket.IO, Redis, AI, system design, Node.js, and React.",
};

/**
 * [Architecture §2 fix] Empty-state ready — content/blog is set up for
 * MDX posts (same pattern as content/projects) once the first one is
 * written; this prevents the Navbar's Blog link from being a dead 404
 * in the meantime.
 */
export default function BlogPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
            <p className="mb-3 font-mono text-sm text-muted-foreground">Blog</p>
            <h1 className="mb-10 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Writing on backend systems and AI.
            </h1>
            <EmptyState
                title="No posts yet"
                description="Check back soon — first posts will cover Socket.IO, Redis, system design, Node.js, and React."
            />
        </div>
    );
}