import { useQuery } from "@tanstack/react-query";
import { resolveApiUrl } from "@/lib/api/resolve-url";
import { parseApiError } from "@/lib/api/error";

export type HealthStatus = "operational" | "partially" | "degraded";
export type HealthStatusInput = HealthStatus;
export type ServiceStatus = "operational" | "unavailable";
export type ServiceHistoryStatus = HealthStatus | "unknown";

export type HealthCheck = {
  status: HealthStatusInput;
  services: Record<string, ServiceStatus>;
  checkedAt: string;
};

export type HealthServiceDay = {
  date: string;
  status: ServiceHistoryStatus;
  checksCount: number;
  unavailableChecks: number;
  availabilityPercentage: number | null;
};

export type HealthService = {
  name: string;
  currentStatus: ServiceStatus;
  history: HealthServiceDay[];
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
type HealthServicesResponse = {
  data: {
    from: string;
    to: string;
    periodDays: number;
    services: HealthService[];
  };
};

export function normalizeHealthStatus(status: HealthStatusInput): HealthStatus {
  if (status === "degraded") return "degraded";
  if (status === "partially") return "partially";
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
  return fetchHealth("/api/public/health/state");
}

export function fetchHealthHistory(perPage = 100): Promise<HistoryResponse> {
  return fetchHealth(`/api/public/health/dates?perPage=${perPage}`);
}

export function fetchHealthServices(): Promise<HealthServicesResponse> {
  return fetchHealth("/api/public/health/services");
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

export function useHealthServices() {
  const query = useQuery({
    queryKey: ["health", "services"],
    queryFn: fetchHealthServices,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  return {
    services: query.data?.data.services ?? [],
    from: query.data?.data.from ?? null,
    to: query.data?.data.to ?? null,
    periodDays: query.data?.data.periodDays ?? null,
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
