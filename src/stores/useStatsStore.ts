import { createResourceStore } from "./createResourceStore";
import { type APIStat } from "@/data/stats";

const { fetchList, useResourceStore } = createResourceStore<APIStat>({
  resourceKey: "stats",
  listEndpoint: "stats",
  // pas de pagination/filtre pour cette ressource : la liste complète est toujours renvoyée
});

export const fetchPublicStats = fetchList;

export function useStatsStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { stats: data, ...rest };
}