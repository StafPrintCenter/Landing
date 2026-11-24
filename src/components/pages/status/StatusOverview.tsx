import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { HealthStatusInput } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";
import { formatStatusDateTime, STATUS_OVERVIEW_LABELS, STATUS_OVERVIEW_STYLES } from "@/data/status/status";

export function StatusOverview({ status, checkedAt }: { status: HealthStatusInput; checkedAt?: string }) {
  const normalized = normalizeHealthStatus(status);
  const Icon = normalized === "operational" ? CheckCircle2 : normalized === "partially" ? AlertTriangle : XCircle;
  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${STATUS_OVERVIEW_STYLES[normalized]}`}>
      <div className="flex items-start gap-4">
        <Icon className="mt-0.5 h-7 w-7 shrink-0" />
        <div>
          <h2 className="text-xl font-semibold">État actuel</h2>

          <div className="mt-2 flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <p className="min-w-0 text-base">{STATUS_OVERVIEW_LABELS[normalized]}</p>
            {checkedAt && (
              <div className="flex min-w-0 items-center gap-2 text-sm opacity-75">
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-current" />
                <p>
                  Dernière vérification : {formatStatusDateTime(checkedAt)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusOverviewSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement de l'état des services"
      className="animate-pulse rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="h-7 w-7 shrink-0 rounded-full bg-muted" />
        <div className="w-full space-y-3">
          <div className="h-6 w-36 rounded bg-muted" />
          <div className="h-4 w-64 max-w-full rounded bg-muted" />
          <div className="h-3 w-52 max-w-full rounded bg-muted/70" />
        </div>
      </div>
    </div>
  );
}
