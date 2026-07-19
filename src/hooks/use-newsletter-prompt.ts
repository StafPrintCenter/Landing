import { useEffect, useState } from "react";
import {
  registerVisitOncePerSession,
  shouldShowNewsletterPrompt,
  markBlocked,
  snoozeFor,
} from "@/lib/newsletter-prompt";

export function useNewsletterPrompt() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    registerVisitOncePerSession();
    const timer = setTimeout(() => {
      if (shouldShowNewsletterPrompt()) setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setIsOpen(false);

  const handleRemindLater = (days = 7) => {
    snoozeFor(days);
    close();
  };

  const handleNeverAgain = () => {
    markBlocked();
    close();
  };

  return { isOpen, close, handleRemindLater, handleNeverAgain };
}