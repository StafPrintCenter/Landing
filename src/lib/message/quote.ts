import { SITE } from "@/data/site";

/**
 * Message de demande de devis pré-rempli pour un service donné.
 * Utilisé à la fois pour préremplir le formulaire de contact (via ?quote=slug)
 * et pour construire les liens directs WhatsApp / Email de la fiche service.
 */
export function buildQuoteMessage(serviceTitle: string): string {
  return `Bonjour l'équipe ${SITE.name},

Je souhaite obtenir un devis personnalisé ainsi que les délais d'exécution concernant votre service de « ${serviceTitle} ».

Voici quelques détails préliminaires concernant mon projet actuel :
[Décrivez ici votre support, dimensions, quantité ou vos objectifs généraux...]

Pourriez-vous me recontacter pour échanger sur les délais, le tarif et les modalités de réalisation ?
Merci d'avance pour votre retour`;
}
