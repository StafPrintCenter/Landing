import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api-url";
import type { APIAppointment, AppointmentMode, AppointmentSlotsResponse } from "@/data/appointments";

type AppointmentResponse = { data: APIAppointment };

export async function fetchAppointmentSlots(date: string): Promise<AppointmentSlotsResponse> {
  const url = resolveApiUrl(`/api/public/appointments/slots?date=${date}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des créneaux disponibles");
  }
  return response.json();
}

/**
 * Hook de récupération des créneaux d'une date donnée, répartis par état
 */
export function useAppointmentSlots(date: string | null) {
  const query = useQuery({
    queryKey: ["appointments", "slots", date],
    queryFn: () => fetchAppointmentSlots(date as string),
    enabled: !!date,
    staleTime: 1000 * 30, // les créneaux peuvent se libérer/remplir rapidement
  });

  return {
    slots: query.data?.slots ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export interface CreateAppointmentParams {
  mode: AppointmentMode;
  duration: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  firstName: string;
  lastName: string;
  email: string;
  whatsapp?: string;
  subject: string;
  message?: string;
  acceptedTerms: boolean;
}

export async function createAppointment(params: CreateAppointmentParams): Promise<APIAppointment> {
  const formData = new FormData();
  formData.append("mode", params.mode);
  formData.append("duration", String(params.duration));
  formData.append("date", params.date);
  formData.append("time", params.time);
  formData.append("first_name", params.firstName);
  formData.append("last_name", params.lastName);
  formData.append("email", params.email);
  formData.append("whatsapp", params.whatsapp ?? "");
  formData.append("subject", params.subject);
  formData.append("message", params.message ?? "");
  formData.append("accepted_terms", params.acceptedTerms ? "true" : "false");

  const url = resolveApiUrl(`/api/public/appointments/create`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du rendez-vous");
  }
  const json: AppointmentResponse = await response.json();
  return json.data;
}