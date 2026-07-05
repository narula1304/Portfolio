"use client";

import { motion } from "framer-motion";
import { Heading } from "@/components/atoms/Heading";
import { Badge } from "@/components/atoms/Badge";
import { profile } from "@/data/profile";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

export function About() {
    return (
        <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-12 md:grid-cols-[1.4fr_1fr]"
            >
                <div className="flex flex-col gap-8">
                    <motion.div variants={fadeUp}>
                        <p className="mb-3 font-mono text-sm text-muted-foreground">01 / About</p>
                        <Heading as="h2" size="h1">
                            A bit about how I build.
                        </Heading>
                    </motion.div>

                    {profile.bio.map((paragraph) => (
                        <motion.p
                            key={paragraph.slice(0, 24)}
                            variants={fadeUp}
                            className="text-balance leading-relaxed text-muted-foreground"
                        >
                            {paragraph}
                        </motion.p>
                    ))}

                    <motion.blockquote
                        variants={fadeUp}
                        className="rounded-xl border border-border bg-card px-6 py-5 text-foreground"
                    >
                        {profile.philosophy}
                    </motion.blockquote>
                </div>

                <motion.div variants={fadeUp} className="flex flex-col gap-6">
                    <div className="rounded-xl border border-border bg-card p-6">
                        <p className="mb-1 text-sm text-muted-foreground">Education</p>
                        <p className="font-display font-medium">{profile.education.degree}</p>
                        <p className="text-sm text-muted-foreground">
                            {profile.education.institution}
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6">
                        <p className="mb-3 text-sm text-muted-foreground">Currently focused on</p>
                        <ul className="flex flex-col gap-2">
                            {profile.currentFocus.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                    <span className="text-foreground/90">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest) => (
                            <Badge key={interest}>{interest}</Badge>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}