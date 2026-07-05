import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Consistent tracking/leading scale across every section heading
 * (Architecture §3 — atoms know nothing about content).
 */
const headingVariants = cva("font-display font-semibold tracking-tight", {
    variants: {
        size: {
            hero: "text-4xl leading-[1.05] md:text-6xl lg:text-7xl",
            h1: "text-4xl leading-tight md:text-5xl",
            h2: "text-3xl leading-tight md:text-4xl",
            h3: "text-xl leading-snug md:text-2xl",
        },
    },
    defaultVariants: {
        size: "h2",
    },
});

interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
    as?: "h1" | "h2" | "h3" | "h4";
}

export function Heading({
    as: Tag = "h2",
    size,
    className,
    ...props
}: HeadingProps) {
    return <Tag className={cn(headingVariants({ size, className }))} {...props} />;
}