import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertCircle } from "lucide-react";
import { APPOINTMENT_MODE_LABELS } from "@/data/appointments";
import type { BookingData } from "./types";

interface StepRecapProps {
  data: BookingData;
  onEdit: (s: number) => void;
  submitError: string | null;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value || "—"}</span>
    </div>
  );
}

export function StepRecap({ data, onEdit, submitError }: StepRecapProps) {
  const modeLabel = data.mode ? APPOINTMENT_MODE_LABELS[data.mode] : "—";
  const dateStr = data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: fr }) : "";

  return (
    <div>
      <h2 className="text-xl font-bold">Récapitulatif</h2>
      <p className="mt-1 text-sm text-muted-foreground">Vérifiez les informations avant l'envoi.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Rendez-vous</h3>
            <button onClick={() => onEdit(0)} className="cursor-pointer text-xs font-semibold text-primary hover:underline">Modifier</button>
          </div>
          <div className="mt-2">
            <Row label="Type" value={modeLabel} />
            <Row label="Durée" value={`${data.duration} min`} />
            <Row label="Date" value={dateStr} />
            <Row label="Heure" value={data.time} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Vos informations</h3>
            <button onClick={() => onEdit(2)} className="cursor-pointer text-xs font-semibold text-primary hover:underline">Modifier</button>
          </div>
          <div className="mt-2">
            <Row label="Nom" value={`${data.lastName} ${data.firstName}`} />
            <Row label="Email" value={data.email} />
            <Row label="WhatsApp" value={data.whatsapp} />
            <Row label="Sujet" value={data.subject} />
          </div>
        </div>

        {data.message && (
          <div className="md:col-span-2 rounded-2xl border border-border bg-background p-5">
            <h3 className="font-semibold">Message</h3>
            <p className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap">{data.message}</p>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm text-foreground/80">
        En confirmant, votre demande est enregistrée et une confirmation vous sera envoyée par email à{" "}
        <span className="font-semibold">{data.email || "votre adresse"}</span>. Vous pourrez également en envoyer une copie via WhatsApp ensuite.
      </div>

      {submitError && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}
    </div>
  );
}