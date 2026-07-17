import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CookieConsent, FloatingHelpMenu } from "./";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />

      <FloatingHelpMenu />
      <CookieConsent />
      <Toaster position="bottom-left" richColors closeButton />
    </div>
  );
}