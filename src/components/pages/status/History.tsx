import type { HealthCheck } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";
import { StatusDot } from "./StatusIndicator";

const LABELS = {
  operational: "Opérationnel",
  partially_degraded: "Partiellement dégradé",
  degraded: "Dégradé",
};

export function StatusHistory({ checks, isLoading }: { checks: HealthCheck[]; isLoading: boolean }) {
  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border bg-card" />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {checks.map((check) => {
        const status = normalizeHealthStatus(check.status);
        return (
          <div key={check.checkedAt} className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 last:border-b-0 md:px-6">
            <div className="flex items-center gap-3">
              <StatusDot status={status} />
              <span className="font-medium">{LABELS[status]}</span>
            </div>
            <time className="shrink-0 text-sm text-muted-foreground" dateTime={check.checkedAt}>
              {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(check.checkedAt))}
            </time>
          </div>
        );
      })}
    </div>
  );
}
