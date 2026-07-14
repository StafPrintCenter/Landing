import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { APIAppointment } from "@/data/appointments";
import { SITE } from "@/data/site";

interface ConfirmationScreenProps {
  appointment: APIAppointment;
  onWhatsAppCopy: () => void;
}

export function ConfirmationScreen({ appointment, onWhatsAppCopy }: ConfirmationScreenProps) {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-12 text-center shadow-lg">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check size={32} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">Demande envoyée !</h1>
        <p className="mt-3 text-muted-foreground">
          Nous avons bien reçu votre demande de rendez-vous et vous enverrons une confirmation par email très prochainement. Vous pouvez également nous en envoyer une copie sur WhatsApp pour accélérer la confirmation.
        </p>

        <div className="mt-5 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          Statut actuel : <span className="font-semibold text-foreground">{appointment.status === "pending" ? "En attente de confirmation" : appointment.status}</span>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={onWhatsAppCopy}
            className="cursor-pointer rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
          >
            Envoyer une copie sur WhatsApp
          </button>
          <Link
            to="/"
            className="cursor-pointer rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}