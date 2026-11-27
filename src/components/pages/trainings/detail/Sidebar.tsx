import { useState } from "react";
import { ArrowRight, Mail, Percent } from "lucide-react";
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
  const discount = f.discountPercentage ?? 0;

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

            {discount > 0 && f.originalPrice != null && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Prix original</span>
                <span className="text-sm font-medium text-muted-foreground line-through">
                  {f.originalPrice.toLocaleString("fr-FR")} FCFA
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                  <Percent size={12} />
                  {discount}% de réduction
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
            {f.startDate && f.endDate && (
              <li className="flex justify-between">
                <span className="text-muted-foreground">Périodes</span>
                <span className="font-medium text-right text-xs">
                  {formatDate(f.startDate)} - {formatDate(f.endDate)}
                </span>
              </li>
            )}
            {f.registrationDeadline && (
              <li className="flex justify-between">
                <span className="text-muted-foreground">Délais d'inscription</span>
                <span className="font-medium text-right text-xs">
                  {formatDate(f.registrationDeadline)}
                </span>
              </li>
            )}
            {seatsFormatted && (
              <li className="flex justify-between">
                <span className="text-muted-foreground">Places disponibles</span>
                <span
                  className={`font-medium ${isFull ? "text-destructive" : "text-foreground"
                    }`}
                >
                  {seatsFormatted}
                </span>
              </li>
            )}
            <li className="flex justify-between">
              <span className="text-muted-foreground">Inscrits actuels</span>
              <span className="font-medium">{f.currentStudents ?? 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Lieu</span>
              <span className="font-medium">{f.location || "Porto-Novo"}</span>
            </li>
          </ul>

          <div className="flex flex-col gap-2.5">
            {/* Action 1: S'inscrire (Ouvre la modal) */}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isFull || !isOpen}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${isFull || !isOpen
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                }`}
            >
              {isFull ? "Session complète" : !isOpen ? "Inscriptions closes" : "S'inscrire maintenant"}{" "}
              <ArrowRight size={14} />
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
              <Mail size={14} /> Nous écrire par Email
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