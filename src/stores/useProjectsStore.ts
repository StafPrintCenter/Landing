import { createResourceStore } from "./createResourceStore";
import { type APIProject } from "@/data/projects";

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIProject>({
  resourceKey: "projects",
  listEndpoint: "projects/list",
  detailEndpoint: "projects/get",
});

export const fetchPublicProjects = fetchList;
export const fetchProjectById = fetchById;

export function useProjectsStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { projects: data, ...rest };
}