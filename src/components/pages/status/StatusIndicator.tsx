import { normalizeHealthStatus } from "@/stores/useHealthStore";
import { STATUS_DOT_STYLES, HealthStatusInput } from "@/data/status";

export function StatusDot({
  status,
  className = ""
}: {
  status: HealthStatusInput;
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${STATUS_DOT_STYLES[normalizeHealthStatus(status)]} ${className}`}
    />
  );
}
