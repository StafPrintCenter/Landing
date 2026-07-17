import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api-url";
import type { APICategory } from "@/data/api-categories";

type CategoriesResponse = {
  data: APICategory[];
  links: any;
  meta: any;
};

export interface FetchCategoriesParams {
  /** Filtre le référentiel utilisé par un contexte donné (ex: "newsletter", "formation") */
  context?: string;
  query?: string;
  page?: number;
  perPage?: number;
}

export async function fetchCategories(params: FetchCategoriesParams = {}): Promise<CategoriesResponse> {
  const queryParams = new URLSearchParams();
  if (params.context) queryParams.append("context", params.context);
  if (params.query) queryParams.append("query", params.query);
  if (params.page) queryParams.append("page", String(params.page));
  if (params.perPage) queryParams.append("perPage", String(params.perPage));

  const url = resolveApiUrl(`/api/public/categories/list?${queryParams.toString()}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des catégories");
  }
  return response.json();
}

export function useCategoriesStore(params: FetchCategoriesParams = {}) {
  const query = useQuery({
    queryKey: ["categories", "public-list", params],
    queryFn: () => fetchCategories(params),
    staleTime: 1000 * 60 * 30, // référentiel stable, rafraîchi peu souvent
  });

  return {
    categories: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}