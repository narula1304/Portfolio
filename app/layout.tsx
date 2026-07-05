import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { SkipToContent } from "@/components/atoms/SkipToContent";
import { PageShell } from "@/components/layouts/PageShell";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * [Architecture §5.4 fix] Only the weights actually used are subsetted in —
 * this is the single biggest lever for the >95 Lighthouse performance target,
 * so it's enforced here rather than left to default font imports.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

// [Architecture §8 fix] metadataBase required in Next 15 for OG/Twitter
// image URLs to resolve to absolute paths — silently broken without it.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <AppProviders>
          <SkipToContent />
          <PageShell>{children}</PageShell>
        </AppProviders>
      </body>
    </html>
  );
}
