import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    as?: "input" | "textarea";
}

/**
 * Shared input/textarea wrapper wired for React Hook Form via forwardRef —
 * used with register() so RHF controls the field without extra state.
 */
export const FormField = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    FormFieldProps
>(({ label, error, as = "input", className, ...props }, ref) => {
        const fieldClasses = cn(
            "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground transition-colors focus-visible:border-primary",
            error && "border-destructive",
            className
        );

        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">{label}</label>
                {as === "textarea" ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        rows={5}
                        className={fieldClasses}
                        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input ref={ref as React.Ref<HTMLInputElement>} className={fieldClasses} {...props} />
                )}
                {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
        );
    });
FormField.displayName = "FormField";