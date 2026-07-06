import { SearchX } from "lucide-react";

/**
 * [Architecture §3 fix] Used by the projects search (zero results) and,
 * later, the blog index before any posts exist.
 */
export function EmptyState({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
            <SearchX className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">{title}</p>
            {description && (
                <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}