"use client";

import { motion } from "framer-motion";

interface TimelineNodeProps {
    date: string;
    title: string;
    description: string;
    isLast?: boolean;
}

/**
 * [Architecture §6] "Timeline nodes: draw-in line as you scroll, node
 * pop-in, whileInView." The connecting segment scales in from the dot
 * downward (transform-origin top) as each node enters view.
 */
export function TimelineNode({ date, title, description, isLast }: TimelineNodeProps) {
    return (
        <div className="relative flex gap-6 pb-10 last:pb-0">
            <div className="relative flex flex-col items-center">
                <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]"
                />
                {!isLast && (
                    <motion.span
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ transformOrigin: "top" }}
                        className="w-px flex-1 bg-border"
                    />
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="pb-2"
            >
                <p className="mb-1 font-mono text-xs text-muted-foreground">{date}</p>
                <h3 className="mb-1 font-display font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </motion.div>
        </div>
    );
}