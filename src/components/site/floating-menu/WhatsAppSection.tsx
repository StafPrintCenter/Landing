import { SITE } from "@/data/site";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { WhatsAppIcon } from "../icons/WhatsAppIcon";

export function WhatsAppSection() {
  // Lien WhatsApp pré-rempli
  const richPropsWhatsappLink = withWhatsAppMessage(
    SITE.whatsappLink,
    [
      `Bonjour ${SITE.name},`,
      `Je viens de visiter votre site internet et je souhaiterais obtenir davantage d'informations sur vos services.`,
      `Pouvez-vous me conseiller selon mon besoin ?`,
      "Merci d'avance.",
    ].join("\n")
  );

  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Assistance directe
      </span>
      <a
        href={richPropsWhatsappLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 rounded-xl border border-[oklch(0.7_0.17_150)/30%] bg-[oklch(0.7_0.17_150/6%)] px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-[oklch(0.7_0.17_150/12%)]"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.7_0.17_150)] text-white shadow-sm">
          <WhatsAppIcon size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-semibold text-foreground">Discuter sur WhatsApp</p>
          <p className="truncate text-[11px] text-muted-foreground">Conseils & questions en temps réel</p>
        </div>
      </a>
    </div>
  );
}