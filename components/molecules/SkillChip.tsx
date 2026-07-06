import { cn } from "@/lib/utils";

export function SkillChip({ label, className }: { label: string; className?: string }) {
    return (
        <span
            className={cn(
                "rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary/40",
                className
            )}
        >
            {label}
        </span>
    );
}