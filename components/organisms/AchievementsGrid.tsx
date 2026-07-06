"use client";

import { motion } from "framer-motion";
import { Medal, Code2 } from "lucide-react";
import { Heading } from "@/components/atoms/Heading";
import { CountUp } from "@/components/atoms/CountUp";
import { achievements } from "@/data/achievements";

const ICONS = { medal: Medal, code: Code2 } as const;

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function AchievementsGrid() {
    return (
        <section id="achievements" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="mb-10">
                <p className="mb-3 font-mono text-sm text-muted-foreground">05 / Achievements</p>
                <Heading as="h2" size="h1">
                    A few milestones.
                </Heading>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid gap-6 sm:grid-cols-2"
            >
                {achievements.map((achievement) => {
                    const Icon = ICONS[achievement.icon as keyof typeof ICONS];
                    const hasCountUp = "countUpTo" in achievement && achievement.countUpTo;

                    return (
                        <motion.div
                            key={achievement.title}
                            variants={fadeUp}
                            className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                {hasCountUp && (
                                    <p className="font-display text-2xl font-semibold text-primary">
                                        <CountUp
                                            to={achievement.countUpTo!}
                                            suffix={"countUpSuffix" in achievement ? achievement.countUpSuffix : ""}
                                        />
                                    </p>
                                )}
                                <p className="font-display font-semibold">{achievement.title}</p>
                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}