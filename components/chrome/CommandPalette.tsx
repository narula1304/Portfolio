"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import {
    FileText,
    FolderGit2,
    Moon,
    Newspaper,
    Search,
    Sun,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useCommandPalette } from "@/components/providers/CommandPaletteProvider";
import { navItems } from "@/config/nav";
import { siteConfig } from "@/config/site";

/**
 * [Architecture §9] Radix Dialog provides the focus-trap, aria-modal, and
 * return-focus-on-close behavior for free — cmdk itself is unstyled/
 * behavior-only, so it's composed inside Dialog.Content rather than
 * hand-rolling that accessibility contract.
 *
 * Dynamically imported with ssr:false via CommandPaletteLoader (Architecture
 * §10) since it's client-only and not needed for first paint.
 */
export function CommandPalette() {
    const { isOpen, setIsOpen } = useCommandPalette();
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();

    function navigate(href: string) {
        setIsOpen(false);
        if (href.startsWith("#")) {
            router.push(`/${href}`);
        } else {
            router.push(href);
        }
    }

    function openExternal(href: string) {
        setIsOpen(false);
        window.open(href, href.startsWith("mailto:") ? undefined : "_blank", "noopener,noreferrer");
    }

    function toggleTheme() {
        setIsOpen(false);
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-sm" />
                <Dialog.Content
                    className="fixed left-1/2 top-24 z-[100] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
                    onOpenAutoFocus={(e) => {
                        // Let cmdk's own input claim focus rather than the dialog root.
                        e.preventDefault();
                        document.getElementById("command-palette-input")?.focus();
                    }}
                >
                    <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                    <Dialog.Description className="sr-only">
                        Search for a section, project, or action.
                    </Dialog.Description>

                    <Command label="Command palette" className="flex flex-col">
                        <div className="flex items-center gap-2 border-b border-border px-4">
                            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <CommandInput
                                id="command-palette-input"
                                placeholder="Search sections, projects, actions…"
                                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>

                        <CommandList className="max-h-80 overflow-y-auto p-2">
                            <CommandEmpty className="py-8 text-center text-sm text-muted-foreground">
                                No results found.
                            </CommandEmpty>

                            <CommandGroup
                                heading="Navigate"
                                className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
                            >
                                {navItems.map((item) => (
                                    <CommandItem
                                        key={item.href}
                                        onSelect={() => navigate(item.href)}
                                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                    >
                                        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                                        {item.label}
                                    </CommandItem>
                                ))}
                                <CommandItem
                                    onSelect={() => navigate("/projects")}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                                    All Projects
                                </CommandItem>
                                <CommandItem
                                    onSelect={() => navigate("/blog")}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                                    Blog
                                </CommandItem>
                            </CommandGroup>

                            <CommandGroup
                                heading="Actions"
                                className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
                            >
                                <CommandItem
                                    onSelect={toggleTheme}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    {resolvedTheme === "dark" ? (
                                        <Sun className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Moon className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    Toggle theme
                                </CommandItem>
                            </CommandGroup>

                            <CommandGroup
                                heading="Links"
                                className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
                            >
                                <CommandItem
                                    onSelect={() => openExternal(siteConfig.links.github)}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    <FaGithub className="h-4 w-4 text-muted-foreground" />
                                    GitHub
                                </CommandItem>
                                <CommandItem
                                    onSelect={() => openExternal(siteConfig.links.linkedin)}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    <FaLinkedin className="h-4 w-4 text-muted-foreground" />
                                    LinkedIn
                                </CommandItem>
                                <CommandItem
                                    onSelect={() => openExternal(siteConfig.links.resume)}
                                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-background"
                                >
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    Download Resume
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}