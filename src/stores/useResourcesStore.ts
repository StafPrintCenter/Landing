import { useQuery } from "@tanstack/react-query";
import { type APIResource } from "@/data/resources";
import { createResourceStore } from "./createResourceStore";

const { fetchList, fetchById } = createResourceStore<APIResource>({
  resourceKey: "resources",
  listEndpoint: "resources/list",
  detailEndpoint: "resources",
});

export async function fetchPublicResources(params: Parameters<typeof fetchList>[0] = {}) {
  const perPage = 100;
  const firstPage = await fetchList({ ...params, page: 1, perPage });
  const lastPage = Math.max(1, Number(firstPage.meta?.last_page ?? 1));
  const remainingPages = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) =>
      fetchList({ ...params, page: index + 2, perPage }),
    ),
  );

  return {
    ...firstPage,
    data: [firstPage, ...remainingPages].flatMap((response) => response.data),
  };
}

export const fetchResourceBySlug = fetchById;

export function useResourcesStore(params: Parameters<typeof fetchList>[0] = {}) {
  const query = useQuery({
    queryKey: ["resources", "public-list", params],
    queryFn: () => fetchPublicResources(params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    resources: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
