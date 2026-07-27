import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Briefcase, Calendar, Building2 } from "lucide-react";
import {
  JOB_CONTRACT_TYPE_LABELS,
  formatSalaryRange,
  isJobOfferExpired,
  type APIJobOffer,
} from "@/data/jobs";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/icons/WhatsAppIcon";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { createEmailLink } from "@/lib/message/email";

interface JobOfferDetailSidebarProps {
  offer: APIJobOffer;
}

export function JobOfferDetailSidebar({ offer }: JobOfferDetailSidebarProps) {
  const expired = isJobOfferExpired(offer);
  const salary = formatSalaryRange(offer.salaryMin, offer.salaryMax);

  // Helper message WhatsApp
  const whatsappText = [
    `Bonjour ${SITE.name},`,
    `Je vous contacte au sujet de l'offre d'emploi : *${offer.title}*.`,
    `- Département : *${offer.department}*`,
    `- Type de contrat : *${JOB_CONTRACT_TYPE_LABELS[offer.contractType]}*`,
    `- Localisation : *${offer.location}*`,
    salary ? `- Rémunération : *${salary}*` : "",
    "",
    "J'aimerais obtenir plus d'informations concernant ce poste et les modalités du recrutement.",
    "",
    "Merci d'avance pour votre retour.",
  ]
    .filter(Boolean)
    .join("\n");

  const richWhatsappLink = withWhatsAppMessage(SITE.whatsappLink, whatsappText);

  // Helper Email
  const emailSubject = `Candidature / Renseignements — Offre : ${offer.title}`;
  const emailBody = [
    `Bonjour,`,
    ``,
    `Je souhaite obtenir des informations complémentaires ou postuler à l'offre de "${offer.title}" (${offer.department}) chez ${SITE.name}.`,
    ``,
    `Type de contrat : ${JOB_CONTRACT_TYPE_LABELS[offer.contractType]}`,
    `Lieu : ${offer.location}`,
    ``,
    `Cordialement,`,
  ].join("\n");

  const richEmailLink = createEmailLink(SITE.email, emailSubject, emailBody);

  return (
    <aside className="sticky top-24 h-fit space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Aperçu de l'offre
        </p>

        <p className="mt-2 font-display text-2xl font-bold text-foreground">
          {JOB_CONTRACT_TYPE_LABELS[offer.contractType]}
        </p>

        <div className="my-5 h-px bg-border" />

        {/* Liste des détails */}
        <ul className="mb-6 space-y-3 text-sm">
          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Building2 size={15} /> Département
            </span>
            <span className="font-medium text-foreground">{offer.department}</span>
          </li>

          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={15} /> Localisation
            </span>
            <span className="font-medium text-foreground">{offer.location}</span>
          </li>

          {salary && (
            <li className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Briefcase size={15} /> Rémunération
              </span>
              <span className="font-medium text-primary">{salary}</span>
            </li>
          )}

          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Calendar size={15} /> Date limite
            </span>
            <span className={`font-medium ${expired ? "text-destructive" : "text-foreground"}`}>
              {new Date(offer.expiresAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          {/* Action 1 : Postuler */}
          {expired ? (
            <div className="rounded-xl bg-destructive/10 p-3.5 text-center text-xs font-semibold text-destructive">
              Cette offre est clôturée et n'accepte plus de candidatures.
            </div>
          ) : (
            <Link
              to="/careers/offers/apply/$slug"
              params={{ slug: offer.slug }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 cursor-pointer shadow-sm"
            >
              Postuler maintenant <ArrowRight size={16} />
            </Link>
          )}

          {/* Action 2 : WhatsApp */}
          <a
            href={richWhatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary/90 cursor-pointer"
          >
            <WhatsAppIcon size={16} /> Contacter par WhatsApp
          </a>

          {/* Action 3 : Email */}
          <a
            href={richEmailLink}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted cursor-pointer"
          >
            <Mail size={16} /> Nous écrire par Email
          </a>
        </div>
      </div>
    </aside>
  );
}