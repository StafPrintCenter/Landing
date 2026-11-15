import { useQuery } from "@tanstack/react-query";
import { type APIResource } from "@/data/resources";
import { createResourceStore } from "./createResourceStore";
import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";

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

export interface ResourceDownload {
  url: string;
  expires_in: number;
  file_name: string;
  remaining_downloads?: number;
}

export interface ResourceCheckout {
  id: string;
  status: string;
  amount: number;
  currency: string;
  description: string;
  payableType: string;
  payableId: string;
  paymentUrl: string;
  paidAt: string | null;
  createdAt: string;
}

export type ResourcePayment = Omit<ResourceCheckout, "paymentUrl">;

export interface ResourceCheckoutDetails {
  email: string;
  firstName?: string;
  lastName?: string;
}

export function getResourceCheckoutStorageKey(slug: string) {
  return `spc:resource-checkout:${slug}`;
}

export async function createResourceCheckout(
  slug: string,
  details: ResourceCheckoutDetails,
): Promise<ResourceCheckout> {
  const formData = new FormData();
  formData.append("email", details.email);
  if (details.firstName?.trim()) formData.append("firstName", details.firstName.trim());
  if (details.lastName?.trim()) formData.append("lastName", details.lastName.trim());

  const url = resolveApiUrl(`/api/public/resources/${encodeURIComponent(slug)}/checkout`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    throw await parseApiError(response, "Impossible de démarrer le paiement.");
  }

  const result: { data: ResourceCheckout } = await response.json();
  return result.data;
}

export async function fetchResourcePayment(transactionId: string): Promise<ResourcePayment> {
  const url = resolveApiUrl(`/api/public/payments/${encodeURIComponent(transactionId)}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw await parseApiError(response, "Impossible de vérifier cette transaction.");
  }

  const result: { data: ResourcePayment } = await response.json();
  return result.data;
}

export async function fetchResourceDownload(
  slug: string,
  transactionId?: string,
): Promise<ResourceDownload> {
  const query = transactionId ? `?transaction=${encodeURIComponent(transactionId)}` : "";
  const url = resolveApiUrl(`/api/public/resources/${encodeURIComponent(slug)}/download${query}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw await parseApiError(response, "Impossible de générer le lien de téléchargement.");
  }

  const result: { data: ResourceDownload } = await response.json();
  return result.data;
}

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
