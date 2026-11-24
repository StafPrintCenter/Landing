import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { HealthStatus, HealthStatusInput } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";

const LABELS: Record<HealthStatus, string> = {
  operational: "Tous les services sont opérationnels",
  partially: "Certains services sont partiellement dégradés",
  degraded: "Plusieurs services rencontrent des difficultés",
};

export function StatusOverview({ status, checkedAt }: { status: HealthStatusInput; checkedAt?: string }) {
  const normalized = normalizeHealthStatus(status);
  const Icon = normalized === "operational" ? CheckCircle2 : normalized === "partially" ? AlertTriangle : XCircle;
  const styles = {
    operational: "border-emerald-500/25 bg-emerald-500/8 text-emerald-600",
    partially: "border-amber-500/25 bg-amber-500/8 text-amber-600",
    degraded: "border-red-500/25 bg-red-500/8 text-red-600",
  }[normalized];

  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${styles}`}>
      <div className="flex items-start gap-4">
        <Icon className="mt-0.5 h-7 w-7 shrink-0" />
        <div>
          <h2 className="text-xl font-semibold">État actuel</h2>

          <div className="mt-2 flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <p className="min-w-0 text-base">{LABELS[normalized]}</p>
            {checkedAt && (
              <div className="flex min-w-0 items-center gap-2 text-sm opacity-75">
                <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-current" />
                <p>
                  Dernière vérification : {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(checkedAt))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
