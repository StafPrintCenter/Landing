import type { AppointmentMode } from "@/data/appointments";

export type Duration = 20 | 30 | 45 | 60;

export type BookingData = {
  mode: AppointmentMode | null;
  duration: Duration;
  date: Date | null;
  time: string | null;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  cgu: boolean;
};

export const INITIAL_BOOKING: BookingData = {
  mode: null,
  duration: 30,
  date: null,
  time: null,
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  subject: "",
  message: "",
  cgu: false,
};

export type UpdateBooking = <K extends keyof BookingData>(k: K, v: BookingData[K]) => void;

export const STEPS = ["Type", "Créneau", "Vos infos", "Récapitulatif"] as const;

/** Contrainte de disponibilité côté calendrier — heuristique avant de connaître les vrais créneaux */
export function isDateDisabled(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 2); // 48h à l'avance minimum
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  if (d < minDate) return true;
  if (d > maxDate) return true;
  return d.getDay() === 0; // fermé le dimanche
}