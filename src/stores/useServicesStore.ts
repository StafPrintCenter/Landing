import { useQuery } from "@tanstack/react-query";
import { type APIService } from "@/data/services";

type ServicesResponse = {
  data: APIService[];
  links: any;
  meta: any;
};

type ServiceResponse = {
  data: APIService;
};

export interface FetchServicesParams {
  category?: string;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  perPage?: number;
}

// Cibler la version gérée par votre backend
export async function fetchPublicServices(params: FetchServicesParams = {}): Promise<ServicesResponse> {
  const queryParams = new URLSearchParams();

  if (params.category && params.category !== "all") {
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

  const url = `/api/public/services/list?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des services");
  }
  return response.json();
}

export async function fetchServiceBySlug(slug: string): Promise<APIService | null> {
  const response = await fetch(`/api/public/services/get/${slug}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du service");
  }
  const json: ServiceResponse = await response.json();
  return json.data;
}

/**
 * Store / Hook customisé servant de source de vérité unique pour les services
 */
export function useServicesStore(params: FetchServicesParams = {}) {
  const query = useQuery({
    queryKey: ["services", "public-list", params],
    queryFn: () => fetchPublicServices(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    services: query.data?.data || [],
    meta: query.data?.meta || null,
    links: query.data?.links || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}