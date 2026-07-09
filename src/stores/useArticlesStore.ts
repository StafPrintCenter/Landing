import { useQuery } from "@tanstack/react-query";
import { type APIArticle } from "@/data/articles";

type ArticlesResponse = {
  data: APIArticle[];
  links: any;
  meta: any;
};

type ArticleResponse = {
  data: APIArticle;
};

export interface FetchArticlesParams {
  category?: string;
  query?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  perPage?: number;
}

// Cibler la version gérée par votre backend
export async function fetchPublicArticles(params: FetchArticlesParams = {}): Promise<ArticlesResponse> {
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

  const url = `/api/public/articles/list?${queryParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des articles");
  }
  return response.json();
}

export async function fetchArticleBySlug(slug: string): Promise<APIArticle | null> {
  const response = await fetch(`/api/public/articles/get/${slug}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de l'article");
  }
  const json: ArticleResponse = await response.json();
  return json.data;
}

/**
 * Store / Hook customisé servant de source de vérité unique pour les articles
 */
export function useArticlesStore(params: FetchArticlesParams = {}) {
  const query = useQuery({
    queryKey: ["articles", "public-list", params],
    queryFn: () => fetchPublicArticles(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    articles: query.data?.data || [],
    meta: query.data?.meta || null,
    links: query.data?.links || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}