"use client";

import { motion } from "framer-motion";
import { Heading } from "@/components/atoms/Heading";
import { SkillChip } from "@/components/molecules/SkillChip";
import { skillGroups } from "@/data/skills";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

export function SkillsMatrix() {
    return (
        <section id="skills" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="mb-10">
                <p className="mb-3 font-mono text-sm text-muted-foreground">03 / Skills</p>
                <Heading as="h2" size="h1">
                    Tools I reach for.
                </Heading>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {skillGroups.map((group) => (
                    <motion.div
                        key={group.category}
                        variants={fadeUp}
                        className="rounded-xl border border-border bg-card p-6"
                    >
                        <p className="mb-4 text-sm font-medium text-muted-foreground">
                            {group.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <SkillChip key={skill} label={skill} />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}