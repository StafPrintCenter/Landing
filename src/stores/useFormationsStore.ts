import { useQuery } from "@tanstack/react-query";
import { type APIFormation } from "@/data/formations";

type FormationsResponse = {
  data: APIFormation[];
  links: any;
  meta: any;
};

type FormationResponse = {
  data: APIFormation;
};

export interface FetchFormationsParams {
  category?: string;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  perPage?: number;
}

// Cibler la version gérée par votre backend
export async function fetchPublicFormations(params: FetchFormationsParams = {}): Promise<FormationsResponse> {
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

  const url = `/api/public/training/list?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des formations");
  }
  return response.json();
}

export async function fetchFormationById(id: string): Promise<APIFormation | null> {
  const response = await fetch(`/api/public/training/get/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la formation");
  }
  const json: FormationResponse = await response.json();
  return json.data;
}

/**
 * Store / Hook customisé servant de source de vérité unique pour les formations
 */
export function useFormationsStore(params: FetchFormationsParams = {}) {
  const query = useQuery({
    queryKey: ["formations", "public-list", params],
    queryFn: () => fetchPublicFormations(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    formations: query.data?.data || [],
    meta: query.data?.meta || null,
    links: query.data?.links || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}