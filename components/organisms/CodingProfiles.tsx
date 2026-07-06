"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { codingProfiles } from "@/data/coding-profiles";

const PLATFORM_ICONS = {
    GitHub: FaGithub,
    LeetCode: SiLeetcode,
    Codeforces: SiCodeforces,
    CodeChef: SiCodechef,
} as const;

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function CodingProfiles() {
    return (
        <section id="profiles" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="mb-10">
                <p className="mb-3 font-mono text-sm text-muted-foreground">06 / Coding Profiles</p>
                <Heading as="h2" size="h1">
                    Where I compete and ship.
                </Heading>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {codingProfiles.map((profile) => {
                    const Icon = PLATFORM_ICONS[profile.platform as keyof typeof PLATFORM_ICONS];

                    return (
                        <motion.div
                            key={profile.platform}
                            variants={fadeUp}
                            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5" />
                                <p className="font-display font-semibold">{profile.platform}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                {profile.stats.map((stat) => (
                                    <div key={stat.label} className="flex items-baseline justify-between">
                                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                                        <span className="font-mono text-sm">{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <Button asChild variant="outline" size="sm" className="mt-auto">
                                <a href={profile.url} target="_blank" rel="noopener noreferrer">
                                    View Profile
                                </a>
                            </Button>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}