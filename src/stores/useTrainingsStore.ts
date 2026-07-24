import { createResourceStore } from "./createResourceStore";
import { resolveApiUrl } from "@/lib/api-url";
import { type APIFormation } from "@/data/trainings";

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIFormation>({
  resourceKey: "formations",
  listEndpoint: "trainings/list",
  detailEndpoint: "trainings",
});

export const fetchPublicFormations = fetchList;
export const fetchFormationById = fetchById;

export function useFormationsStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { formations: data, ...rest };
}


export class TrainingRegistrationApiError extends Error { }

export async function createTrainingRegistration(params: CreateTrainingRegistrationParams): Promise<APITrainingRegistration> {
  const formData = new FormData();
  formData.append("training_id", params.trainingId);
  formData.append("full_name", params.fullName);
  formData.append("phone", params.phone);
  formData.append("email", params.email);
  formData.append("schedule_preference", params.schedulePreference);
  if (params.notes) formData.append("notes", params.notes);
  formData.append("program_read", params.programRead ? "true" : "false");
  formData.append("consent_accepted", params.consentAccepted ? "true" : "false");

  const url = resolveApiUrl(`/api/public/trainings/registrations/create`);
  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    throw new TrainingRegistrationApiError("Erreur lors de l'envoi de votre inscription.");
  }
  const json: RegistrationResponse = await response.json();
  return json.data;
}