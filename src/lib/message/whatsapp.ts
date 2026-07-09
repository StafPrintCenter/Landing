import { SITE } from "@/data/site";
import { buildQuoteMessage } from "./quote";

/**
 * Ajoute un message pré-rempli à un lien WhatsApp existant
 */
export function withWhatsAppMessage(base: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return base.includes("?")
    ? `${base}&text=${encoded}`
    : `${base}?text=${encoded}`;
}

/**
 * Message de contact générique.
 */
export function createWhatsAppContactMessage(company: string) {
  return [
    `Bonjour ${company},`,
    `Je découvre votre site internet et je souhaiterais échanger avec votre équipe concernant vos services.`,
    `Pouvez-vous me recontacter lorsque vous serez disponible ?`,
    "Merci et à bientôt.",
  ].join("\n");
}

/**
 * Lien WhatsApp pour une demande de devis concernant un service précis,
 * avec message déjà pré-rempli.
 */
export function createServiceQuoteWhatsAppLink(serviceTitle: string): string {
  return withWhatsAppMessage(SITE.whatsappLink, buildQuoteMessage(serviceTitle));
}