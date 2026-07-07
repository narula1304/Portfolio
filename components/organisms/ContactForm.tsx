"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";
import { siteConfig } from "@/config/site";

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
    });

    async function onSubmit(values: ContactFormValues) {
        setSubmitState("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("Request failed");

            setSubmitState("success");
            reset();
        } catch {
            setSubmitState("error");
        }
    }

    const links = [
        { label: siteConfig.links.email.replace("mailto:", ""), href: siteConfig.links.email, icon: Mail },
        { label: "GitHub", href: siteConfig.links.github, icon: FaGithub },
        { label: "LinkedIn", href: siteConfig.links.linkedin, icon: FaLinkedin },
    ];

    return (
        <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
            <div className="grid gap-12 md:grid-cols-2">
                <div>
                    <p className="mb-3 font-mono text-sm text-muted-foreground">07 / Contact</p>
                    <Heading as="h2" size="h1" className="mb-4">
                        Let&apos;s build something.
                    </Heading>
                    <p className="mb-8 max-w-sm text-muted-foreground">
                        Open to SDE internship and full-time opportunities. The fastest way
                        to reach me is the form, or directly through any of these:
                    </p>

                    <div className="flex flex-col gap-3">
                        {links.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto:") ? undefined : "_blank"}
                                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <Icon className="h-4 w-4" /> {label}
                            </a>
            ))}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <FormField
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <FormField
                    as="textarea"
                    label="Message"
                    placeholder="What are you looking to build?"
                    error={errors.message?.message}
                    {...register("message")}
                />

                <Button type="submit" disabled={submitState === "loading"} className="mt-2">
                    {submitState === "loading" ? "Sending…" : "Send message"}
                </Button>

                <AnimatePresence>
                    {submitState === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-sm text-primary"
                        >
                            <CheckCircle2 className="h-4 w-4" /> Message sent — thanks for reaching out.
                        </motion.p>
                    )}
                    {submitState === "error" && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-sm text-destructive"
                        >
                            <AlertCircle className="h-4 w-4" /> Something went wrong. Try again, or email
                            directly.
                        </motion.p>
                    )}
                </AnimatePresence>
            </form>
        </div>
    </section >
  );
}