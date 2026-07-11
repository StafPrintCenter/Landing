import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { ShortlinkChecker } from "./ShortlinkChecker";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFab />
      <ShortlinkChecker />
    </div>
  );
}