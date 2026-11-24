import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";

export type HealthStatus = "operational" | "partially" | "degraded";
export type HealthStatusInput = HealthStatus | "Partially";
export type ServiceStatus = "operational" | "unavailable";

export type HealthCheck = {
  status: HealthStatusInput;
  services: Record<string, ServiceStatus>;
  checkedAt: string;
};

export type HealthHistoryMeta = {
  periodDays: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
};

type HealthResponse = { data: { status: HealthStatusInput; checkedAt: string; services: Record<string, ServiceStatus> } };
type HistoryResponse = { data: HealthCheck[]; meta: HealthHistoryMeta };

export function normalizeHealthStatus(status: HealthStatusInput): HealthStatus {
  const normalized = status.toLowerCase();
  if (normalized === "degraded") return "degraded";
  if (normalized === "partially") return "partially";
  return "operational";
}

async function fetchHealth(path: string) {
  const response = await fetch(resolveApiUrl(path), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw await parseApiError(response, "Impossible de récupérer l'état des services");
  }
  return response.json();
}

export function fetchCurrentHealth(): Promise<HealthResponse> {
  return fetchHealth("/api/public/health");
}

export function fetchHealthHistory(perPage = 100): Promise<HistoryResponse> {
  return fetchHealth(`/api/public/health/history?perPage=${perPage}`);
}

export function useHealthStatus() {
  const query = useQuery({
    queryKey: ["health", "current"],
    queryFn: fetchCurrentHealth,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  return {
    health: query.data?.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useHealthHistory(perPage = 100) {
  const query = useQuery({
    queryKey: ["health", "history", perPage],
    queryFn: () => fetchHealthHistory(perPage),
    staleTime: 60_000,
  });

  return {
    checks: query.data?.data ?? [],
    meta: query.data?.meta ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
