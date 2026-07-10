import { createResourceStore } from "./createResourceStore";
import { type APIService } from "@/data/services";

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIService>({
  resourceKey: "services",
  listEndpoint: "services/list",
  detailEndpoint: "services/get",
});

export const fetchPublicServices = fetchList;
export const fetchServiceBySlug = fetchById;

export function useServicesStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { services: data, ...rest };
}