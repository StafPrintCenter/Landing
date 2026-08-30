import { createResourceStore } from "./createResourceStore";
import type { APIEcosystemSite } from "@/data/ecosystem";

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIEcosystemSite>({
  resourceKey: "ecosystem-sites",
  listEndpoint: "ecosystem-sites/list",
  detailEndpoint: "ecosystem-sites",
});

export const fetchPublicEcosystemSites = fetchList;
export const fetchEcosystemSiteById = fetchById;

export function useEcosystemSitesStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { sites: data, ...rest };
}