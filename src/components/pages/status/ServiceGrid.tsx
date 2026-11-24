import { Check, X } from "lucide-react";
import type { ServiceStatus } from "@/stores/useHealthStore";

const SERVICE_LABELS: Record<string, string> = {
  database: "Base de données",
  cache: "Cache",
  storage: "Stockage",
  queue: "File d'attente",
  smtp: "Messagerie",
  object_storage: "Stockage objet",
};

export function ServiceGrid({ services }: { services: Record<string, ServiceStatus> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(services).map(([key, status]) => (
        <div key={key} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4">
          <span className="font-medium">{SERVICE_LABELS[key] ?? key}</span>
          <span className={`inline-flex items-center gap-1.5 text-sm ${status === "operational" ? "text-emerald-600" : "text-red-600"}`}>
            {status === "operational" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {status === "operational" ? "Opérationnel" : "Indisponible"}
          </span>
        </div>
      ))}
    </div>
  );
}
