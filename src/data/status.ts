export type HealthStatus = "operational" | "partially" | "degraded";
export type HealthStatusInput = HealthStatus;
export type ServiceStatus = "operational" | "unavailable";
export type ServiceHistoryStatus = HealthStatus | "unknown";

export type StatusDisplayKey = HealthStatus | ServiceHistoryStatus | ServiceStatus | "no_data";

export const STATUS_HISTORY_DAYS = 15;

export const SERVICE_LABELS: Record<string, string> = {
  database: "Base de données",
  cache: "Cache",
  storage: "Stockage",
  queue: "File d'attente",
  smtp: "Messagerie",
  object_storage: "Stockage objet",
};

export const STATUS_LABELS: Record<StatusDisplayKey, string> = {
  operational: "Opérationnel",
  partially: "Partiellement dégradé",
  degraded: "Dégradé",
  unavailable: "Indisponible",
  unknown: "Aucune donnée",
  no_data: "Aucune donnée",
};

export const STATUS_SHORT_LABELS: Record<HealthStatus | "no_data", string> = {
  operational: "OK",
  partially: "Partiel",
  degraded: "Dégradé",
  no_data: "Sans données",
};

export const STATUS_OVERVIEW_LABELS: Record<HealthStatus, string> = {
  operational: "Tous les services sont opérationnels",
  partially: "Certains services sont partiellement dégradés",
  degraded: "Plusieurs services rencontrent des difficultés",
};

export const STATUS_OVERVIEW_STYLES: Record<HealthStatus, string> = {
  operational: "border-emerald-500/25 bg-emerald-500/8 text-emerald-600",
  partially: "border-amber-500/25 bg-amber-500/8 text-amber-600",
  degraded: "border-red-500/25 bg-red-500/8 text-red-600",
};

export const STATUS_DOT_STYLES: Record<HealthStatus, string> = {
  operational: "bg-emerald-500",
  partially: "bg-amber-500",
  degraded: "bg-red-500",
};

export const STATUS_BAR_STYLES: Record<StatusDisplayKey, string> = {
  operational: "bg-emerald-500 hover:bg-emerald-600",
  partially: "bg-amber-500 hover:bg-amber-600",
  degraded: "bg-red-500 hover:bg-red-600",
  unavailable: "bg-red-500 hover:bg-red-600",
  unknown: "bg-muted-foreground/20 hover:bg-muted-foreground/35",
  no_data: "bg-muted-foreground/20 hover:bg-muted-foreground/35",
};

export const STATUS_TEXT_STYLES: Record<StatusDisplayKey, string> = {
  operational: "text-emerald-600",
  partially: "text-amber-600",
  degraded: "text-red-600",
  unavailable: "text-red-600",
  unknown: "text-muted-foreground",
  no_data: "text-muted-foreground",
};

export const HISTORY_STATUS_KEYS = ["operational", "partially", "degraded", "no_data"] as const;

export function getServiceLabel(name: string) {
  return SERVICE_LABELS[name] ?? name;
}

export function formatStatusDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
) {
  const parsedDate = typeof date === "string"
    ? new Date(date.length === 10 ? `${date}T12:00:00` : date)
    : date;
  return new Intl.DateTimeFormat("fr-FR", options).format(parsedDate);
}

export function formatStatusDateTime(date: string) {
  return formatStatusDate(date, { dateStyle: "medium", timeStyle: "short" });
}
