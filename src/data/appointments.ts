export type AppointmentMode = "presentiel" | "en_ligne"; // ⚠️ valeur "en_ligne" à confirmer côté backend
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

export type AppointmentSlotsResponse = {
  date: string;
  slots: string[];
};