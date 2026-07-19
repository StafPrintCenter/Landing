import { useEffect, useState } from "react";
import {
  registerVisitOncePerSession,
  shouldShowNewsletterPrompt,
  markSubscribed,
  markBlocked,
  snoozeFor,
} from "@/lib/newsletter-prompt/storage";

export function useNewsletterPrompt() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    registerVisitOncePerSession();
    // Léger délai pour ne pas apparaître pile au chargement de la page
    const timer = setTimeout(() => {
      if (shouldShowNewsletterPrompt()) setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setIsOpen(false);

  const handleSubscribed = () => {
    markSubscribed();
    close();
  };

  const handleRemindLater = (days = 7) => {
    snoozeFor(days);
    close();
  };

  const handleNeverAgain = () => {
    markBlocked();
    close();
  };

  return { isOpen, close, handleSubscribed, handleRemindLater, handleNeverAgain };
}