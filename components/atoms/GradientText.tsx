import { cn } from "@/lib/utils";

/**
 * [Architecture §5.3] The ONE gradient moment per screen — do not combine
 * with a gradient CTA or glow shadow in the same viewport. Used on at most
 * a short phrase, never a full paragraph.
 */
export function GradientText({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                className
            )}
        >
            {children}
        </span>
    );
}