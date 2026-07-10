import { useQuery } from "@tanstack/react-query";
import { type APIFaq } from "@/data/faqs";

type FaqsResponse = {
  data: APIFaq[];
  links: any;
  meta: any;
};

type FaqResponse = {
  data: APIFaq;
};

export interface FetchFaqsParams {
  category?: string;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  perPage?: number;
}

// Cibler la version gérée par votre backend
export async function fetchPublicFaqs(params: FetchFaqsParams = {}): Promise<FaqsResponse> {
  const queryParams = new URLSearchParams();

  if (params.category && params.category !== "all" && params.category !== "Tout") {
    queryParams.append("category", params.category);
  }
  if (params.query) {
    queryParams.append("query", params.query);
  }
  if (params.sortBy) {
    queryParams.append("sortBy", params.sortBy);
  }
  if (params.sortDir) {
    queryParams.append("sortDir", params.sortDir);
  }
  if (params.page) {
    queryParams.append("page", String(params.page));
  }
  if (params.perPage) {
    queryParams.append("perPage", String(params.perPage));
  }

  const url = `/api/public/faqs/list?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des FAQs");
  }
  return response.json();
}











/**
 * Store / Hook customisé servant de source de vérité unique pour les FAQs.
 */
export function useFaqsStore(params: FetchFaqsParams = {}) {
  const query = useQuery({
    queryKey: ["faqs", "public-list", params],
    queryFn: () => fetchPublicFaqs(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    faqs: query.data?.data || [],
    meta: query.data?.meta || null,
    links: query.data?.links || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}