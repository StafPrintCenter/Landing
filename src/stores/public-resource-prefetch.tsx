import { createContext, useContext, type ReactNode } from "react";

export interface PublicResourceResponse<T = unknown> {
  data: T[];
  links: unknown;
  meta: unknown;
}

export type PublicResourcePrefetchMap = Record<
  string,
  PublicResourceResponse<unknown>
>;

interface PublicResourceRequest {
  resourceKey: string;
  params: object;
  fetch: () => Promise<PublicResourceResponse<unknown>>;
}

const PublicResourcePrefetchContext = createContext<PublicResourcePrefetchMap>({});

export function publicResourceQueryKey(resourceKey: string, params: object): string {
  return JSON.stringify([resourceKey, "public-list", params]);
}

export function PublicResourcePrefetchProvider({
  data,
  children,
}: {
  data: PublicResourcePrefetchMap;
  children: ReactNode;
}) {
  return (
    <PublicResourcePrefetchContext.Provider value={data}>
      {children}
    </PublicResourcePrefetchContext.Provider>
  );
}

export function usePublicResourcePrefetch<T>(
  resourceKey: string,
  params: object,
): PublicResourceResponse<T> | undefined {
  const prefetched = useContext(PublicResourcePrefetchContext);
  return prefetched[publicResourceQueryKey(resourceKey, params)] as
    | PublicResourceResponse<T>
    | undefined;
}

export async function prefetchPublicResources(
  requests: PublicResourceRequest[],
): Promise<PublicResourcePrefetchMap> {
  const results = await Promise.allSettled(requests.map((request) => request.fetch()));
  const prefetched: PublicResourcePrefetchMap = {};

  results.forEach((result, index) => {
    const request = requests[index];
    if (result.status === "fulfilled") {
      prefetched[publicResourceQueryKey(request.resourceKey, request.params)] = result.value;
    } else {
      console.error(`SSR prefetch failed for public resource "${request.resourceKey}"`, result.reason);
    }
  });

  return prefetched;
}
