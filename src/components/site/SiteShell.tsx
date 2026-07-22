import type { ReactNode } from "react";
import { Nav, Footer, CookieConsent, FloatingHelpMenu } from "./";
import { NewsletterPromptModal } from "@/components/modal/NewsletterPromptModal";
import { useNewsletterPrompt } from "@/hooks/use-newsletter-prompt";

export function SiteShell({ children }: { children: ReactNode }) {
  const { isOpen, close, handleRemindLater, handleNeverAgain } = useNewsletterPrompt();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />

      <FloatingHelpMenu />
      <CookieConsent />

      <NewsletterPromptModal
        isOpen={isOpen}
        onClose={close}
        onRemindLater={handleRemindLater}
        onNeverAgain={handleNeverAgain}
      />
    </div>
  );
}