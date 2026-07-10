import { createResourceStore } from "./createResourceStore";
import { type APIFaq } from "@/data/faqs";

const { fetchList, useResourceStore } = createResourceStore<APIFaq>({
  resourceKey: "faqs",
  listEndpoint: "faqs/list",
  // pas de detailEndpoint : aucune page de détail dédiée côté front pour l'instant
});

export const fetchPublicFaqs = fetchList;

export function useFaqsStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { faqs: data, ...rest };
}