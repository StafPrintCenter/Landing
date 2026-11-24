import type { HealthStatus, HealthStatusInput } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";

const STATUS_STYLES: Record<HealthStatus, string> = {
  operational: "bg-emerald-500",
  partially: "bg-amber-500",
  degraded: "bg-red-500",
};

export function StatusDot({ status, className = "" }: { status: HealthStatusInput; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${STATUS_STYLES[normalizeHealthStatus(status)]} ${className}`}
    />
  );
}
