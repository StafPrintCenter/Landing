import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CookieConsent } from "./";
import { FloatingHelpMenu } from "./FloatingHelpMenu";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />

      {/* Menu d'aide centralisé tout-en-un */}
      <FloatingHelpMenu />

      <CookieConsent />
    </div>
  );
}