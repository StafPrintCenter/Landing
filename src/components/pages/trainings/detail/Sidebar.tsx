import { useState } from "react";
import { ArrowRight, Mail, Calendar, MapPin, Users, Ticket, AlertCircle } from "lucide-react";
import { formatDate, type APIFormation } from "@/data/trainings";
import { SITE } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/icons/WhatsAppIcon";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";
import { createEmailLink } from "@/lib/message/email";
import { TrainningRegistration } from "@/components/modal";

interface FormationDetailSidebarProps {
  formation: APIFormation;
}

export function FormationDetailSidebar({ formation: f }: FormationDetailSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFull = f.seatsRemaining !== null && f.seatsRemaining <= 0;
  const isOpen = f.enrollmentStatus === "open";

  const seatsFormatted = (() => {
    if (f.seatsRemaining === null) return null;
    if (isFull) return "Session complète";
    if (f.maxSeats !== null) return `${f.seatsRemaining} / ${f.maxSeats} places`;
    return `${f.seatsRemaining} place${f.seatsRemaining > 1 ? "s" : ""}`;
  })();

  // Utilisation du helper WhatsApp
  const whatsappText = [
    `Bonjour ${SITE.name},`,
    `Je souhaite obtenir davantage d'informations concernant la formation *${f.title}*.`,
    `- Tarif : *${f.price.toLocaleString("fr-FR")} FCFA*`,
    `- Niveau : *${f.level}*`,
    `- Durée : *${f.duration}*`,
    seatsFormatted ? `- Places restantes : *${seatsFormatted}*` : "",
    "",
    `Pouvez-vous me communiquer :`,
    `- Les prochaines dates de session`,
    `- Les modalités d'inscription`,
    `- Les modalités de paiement`,
    "",
    "Merci d'avance pour votre retour.",
  ].filter(Boolean).join("\n");

  const richWhatsappLink = withWhatsAppMessage(SITE.whatsappLink, whatsappText);

  // Utilisation du helper Email
  const emailSubject = `Demande d'information - Formation ${f.title}`;
  const emailBody = [
    `Bonjour,`,
    ``,
    `Je souhaite obtenir des informations complémentaires sur la formation "${f.title}" de ${f.price.toLocaleString("fr-FR")} FCFA, d'une durée de ${f.duration} pour niveau ${f.level}.`,
    ``,
    `Merci de me préciser :`,
    `- Les prochaines dates de session`,
    `- Les modalités de paiement`,
    `- Les places disponibles`,
    ``,
    `Cordialement,`,
  ].join("\n");

  const richEmailLink = createEmailLink(SITE.email, emailSubject, emailBody);

  return (
    <>
      <aside className="space-y-6">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div>
            <p className="text-sm text-muted-foreground">Tarif de la formation</p>
            <p className="mt-1 font-display text-3xl font-bold text-primary">
              {f.price.toLocaleString("fr-FR")} FCFA
            </p>

            {f.registrationFee !== undefined && f.registrationFee > 0 && (
              <div className="flex items-center text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Ticket size={13} /> Frais d'inscription
                </span>
                <span className="font-semibold text-foreground">
                  {f.registrationFee.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            )}
          </div>

          <div className="my-5 h-px bg-border" />

          <ul className="space-y-3 text-sm mb-6">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Durée</span>
              <span className="font-medium">{f.duration}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Niveau</span>
              <span className="font-medium">{f.level}</span>
            </li>
            {seatsFormatted && (
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">Places restantes</span>
                <span className={`font-medium ${isFull ? "text-destructive" : "text-foreground"}`}>
                  {seatsFormatted}
                </span>
              </li>
            )}
            <li className="flex justify-between">
              <span className="text-muted-foreground">Format</span>
              <span className="font-medium">Présentiel</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Lieu</span>
              <span className="font-medium">Porto-Novo</span>
            </li>
          </ul>

          <div className="flex flex-col gap-2.5">
            {/* Action 1: S'inscrire (Ouvre la modal) */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isFull}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${isFull
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                }`}
            >
              {isFull ? "Session complète" : "S'inscrire maintenant"} <ArrowRight size={14} />
            </button>

            {/* Action 2: Plus d'infos WhatsApp */}
            <a
              href={richWhatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
            >
              <WhatsAppIcon size={14} /> Plus d'infos (WhatsApp)
            </a>

            {/* Action 3: Nous écrire (Mail structuré) */}
            <a
              href={richEmailLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <Mail size={14} />Nous écrire par Email
            </a>
          </div>
        </div>
      </aside>

      {/* Rendu de la modal */}
      <TrainningRegistration
        formation={f}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}