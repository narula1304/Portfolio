"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { usePointer } from "@/components/providers/PointerProvider";
import { profile } from "@/data/profile";
import { siteConfig } from "@/config/site";

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const word = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/**
 * [Architecture §6] The hero background blobs are the ONE continuous/
 * looping animation on this screen — everything else here is triggered
 * once on mount (the word stagger) or via hover (buttons). Parallax offset
 * reads from the shared PointerProvider rather than its own listener.
 */
function HeroBackground() {
    const pointer = usePointer();
    const offsetX = pointer.isEnabled ? (pointer.x / window.innerWidth - 0.5) * 24 : 0;
    const offsetY = pointer.isEnabled ? (pointer.y / window.innerHeight - 0.5) * 24 : 0;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Faint grid */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)",
                }}
            />

            {/* Drifting glow blobs — the one continuous animation on this screen */}
            <motion.div
                animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                style={{ translateX: offsetX, translateY: offsetY }}
                className="absolute -top-24 left-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[100px]"
            />
            <motion.div
                animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                style={{ translateX: offsetX * -1, translateY: offsetY * -1 }}
                className="absolute top-1/3 right-1/4 h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-[100px]"
            />
        </div>
    );
}

export function Hero() {
    return (
        <section
            id="hero"
            className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6"
        >
            <HeroBackground />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center"
            >
                <motion.div variants={word}>
                    <Badge>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {profile.availability} · {profile.education.institution}
                    </Badge>
                </motion.div>

                <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
                    {profile.heroWords.map((w) => (
                        <motion.span key={w} variants={word} className="mr-4 inline-block last:mr-0">
                            {w}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    variants={word}
                    className="max-w-xl text-balance text-lg text-muted-foreground md:text-xl"
                >
                    {profile.role} building{" "}
                    <GradientText className="font-medium">real-time systems</GradientText>,
                    developer tools, and AI-driven products.
                </motion.p>

                <motion.div variants={word} className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <Button asChild size="lg">
                        <a href={siteConfig.links.resume} download>
                            Resume
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="h-4 w-4" /> GitHub
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="h-4 w-4" /> LinkedIn
                        </a>
                    </Button>
                    <Button asChild variant="ghost" size="lg">
                        <a href="#projects">View Projects</a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}