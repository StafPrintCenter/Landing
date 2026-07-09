import { SITE } from "@/data/site";
import { buildQuoteMessage } from "./quote";

/**
 * Construit un lien mailto avec un sujet et un corps de message pré-remplis.
 */
export function createEmailLink(to: string, subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Lien mailto pour une demande de devis concernant un service précis,
 * avec sujet et message déjà pré-remplis.
 */
export function createServiceQuoteEmailLink(serviceTitle: string): string {
  const subject = `Demande de devis — ${serviceTitle}`;
  const body = buildQuoteMessage(serviceTitle);
  return createEmailLink(SITE.email, subject, body);
}