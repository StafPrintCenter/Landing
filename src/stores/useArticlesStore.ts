import { createResourceStore } from "./createResourceStore";
import { type APIArticle } from "@/data/articles";

const { fetchList, fetchById, useResourceStore } = createResourceStore<APIArticle>({
  resourceKey: "articles",
  listEndpoint: "articles/list",
  detailEndpoint: "articles/get",
});

export const fetchPublicArticles = fetchList;
export const fetchArticleBySlug = fetchById;

export function useArticlesStore(params: Parameters<typeof useResourceStore>[0] = {}) {
  const { data, ...rest } = useResourceStore(params);
  return { articles: data, ...rest };
}