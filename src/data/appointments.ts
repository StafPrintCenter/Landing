export type AppointmentMode = "presentiel" | "en_ligne";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed" | string;

export const APPOINTMENT_MODE_LABELS: Record<AppointmentMode, string> = {
  presentiel: "Présentiel (Porto-Novo)",
  en_ligne: "En ligne (visio)",
};

/**
 * Type aligné sur la réponse de l'API publique /appointments/create
 */
export type APIAppointment = {
  id: string;
  mode: AppointmentMode;
  duration: string;
  scheduledAt: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string | null;
  subject: string;
  message: string | null;
  status: AppointmentStatus;
  handledBy: string | null;
  handledAt: string | null;
  createdAt: string;
};

/**
 * Répartition des créneaux d'une journée selon leur disponibilité
 */
export type AppointmentSlotsResponse = {
  date: string;
  slots: {
    available: string[];
    confirmed: string[];
    pending: string[];
  };
};

export type SlotState = "available" | "pending" | "confirmed";

/**
 * Aplati les 3 listes de la réponse API en une liste triée unique de créneaux,
 * chacun annoté de son état, pour un rendu simple en grille.
 */
export function buildSlotList(slots: AppointmentSlotsResponse["slots"]): Array<{ time: string; state: SlotState }> {
  const entries: Array<{ time: string; state: SlotState }> = [
    ...slots.available.map((time) => ({ time, state: "available" as const })),
    ...slots.pending.map((time) => ({ time, state: "pending" as const })),
    ...slots.confirmed.map((time) => ({ time, state: "confirmed" as const })),
  ];
  return entries.sort((a, b) => a.time.localeCompare(b.time));
}