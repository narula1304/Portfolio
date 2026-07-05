import type { ReactNode } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { BackToTop } from "@/components/chrome/BackToTop";
import { LoadingScreen } from "@/components/chrome/LoadingScreen";

/**
 * Composes Navbar + ScrollProgress + Footer + global chrome widgets
 * (Architecture §3). Mounted once in the root layout so Navbar/Footer
 * persist across client-side route transitions instead of remounting
 * per page.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
