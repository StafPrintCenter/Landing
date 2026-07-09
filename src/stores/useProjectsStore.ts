import { useQuery } from "@tanstack/react-query";
import { type APIProject } from "@/data/projects";

type ProjectsResponse = {
  data: APIProject[];
  links: any;
  meta: any;
};

type ProjectResponse = {
  data: APIProject;
};

export interface FetchProjectsParams {
  category?: string;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  perPage?: number;
}

// Cibler la version gérée par votre backend
export async function fetchPublicProjects(params: FetchProjectsParams = {}): Promise<ProjectsResponse> {
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

  const url = `/api/public/projects/list?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des projets");
  }
  return response.json();
}

export async function fetchProjectById(id: string): Promise<APIProject | null> {
  const response = await fetch(`/api/public/projects/get/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du projet");
  }
  const json: ProjectResponse = await response.json();
  return json.data;
}

/**
 * Store / Hook customisé servant de source de vérité unique pour les projets
 */
export function useProjectsStore(params: FetchProjectsParams = {}) {
  const query = useQuery({
    queryKey: ["projects", "public-list", params],
    queryFn: () => fetchPublicProjects(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    projects: query.data?.data || [],
    meta: query.data?.meta || null,
    links: query.data?.links || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}