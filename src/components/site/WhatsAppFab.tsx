import { SITE } from "@/data/site";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function WhatsAppFab() {
  const richWhatsappLink = withWhatsAppMessage(
    SITE.whatsappLink,
    [
      `Bonjour ${SITE.name},`,
      `Je viens de visiter votre site internet et je souhaiterais obtenir davantage d'informations sur vos services.`,
      `Pouvez-vous me conseiller selon mon besoin ?`,
      "Merci d'avance.",
    ].join("\n")
  );

  return (
    <a
      href={richWhatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-xl ring-4 ring-[oklch(0.7_0.17_150_/_25%)] transition hover:scale-105"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}