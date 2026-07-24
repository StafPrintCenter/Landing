import { createResourceStore } from "./createResourceStore";
import { type APIFormation } from "@/data/formations";

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