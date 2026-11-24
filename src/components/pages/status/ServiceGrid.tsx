import { AlertTriangle, Check, X } from "lucide-react";
import type { HealthService, ServiceHistoryStatus } from "@/stores/useHealthStore";

const SERVICE_LABELS: Record<string, string> = {
  database: "Base de données",
  cache: "Cache",
  storage: "Stockage",
  queue: "File d'attente",
  smtp: "Messagerie",
  object_storage: "Stockage objet",
};

const HISTORY_STATUS_LABELS: Record<ServiceHistoryStatus, string> = {
  operational: "Opérationnel",
  partially: "Partiellement dégradé",
  degraded: "Indisponible",
  unknown: "Aucune donnée",
};

const HISTORY_STATUS_STYLES: Record<ServiceHistoryStatus, string> = {
  operational: "bg-emerald-500",
  partially: "bg-amber-500",
  degraded: "bg-red-500",
  unknown: "bg-muted-foreground/20",
};

function formatDay(date: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(`${date}T12:00:00`));
}

function ServiceCard({ service }: { service: HealthService }) {
  const checksCount = service.history.reduce((total, day) => total + day.checksCount, 0);
  const unavailableChecks = service.history.reduce((total, day) => total + day.unavailableChecks, 0);
  const availability = checksCount > 0
    ? Math.round(((checksCount - unavailableChecks) / checksCount) * 100)
    : null;
  const isOperational = service.currentStatus === "operational";
  const StatusIcon = isOperational ? Check : X;

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold">{SERVICE_LABELS[service.name] ?? service.name}</h3>
        <span className={`inline-flex shrink-0 items-center gap-1.5 text-sm ${isOperational ? "text-emerald-600" : "text-red-600"}`}>
          <StatusIcon className="h-4 w-4" />
          {isOperational ? "Opérationnel" : "Indisponible"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-2xl font-semibold">
          {availability === null ? "—" : `${availability}%`}
          <span className="ml-1 text-xs font-normal text-muted-foreground">de disponibilité</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {checksCount} contrôle{checksCount === 1 ? "" : "s"}
          {unavailableChecks > 0 && ` · ${unavailableChecks} indisponible${unavailableChecks === 1 ? "" : "s"}`}
        </p>
      </div>

      <div className="mt-4" aria-label={`Historique de disponibilité de ${SERVICE_LABELS[service.name] ?? service.name}`}>
        <div className="flex items-center gap-1" role="list">
          {service.history.map((day) => (
            <span
              key={day.date}
              role="listitem"
              title={`${formatDay(day.date)} : ${HISTORY_STATUS_LABELS[day.status]}${day.availabilityPercentage === null ? "" : ` (${day.availabilityPercentage} %)`} · ${day.checksCount} contrôle${day.checksCount === 1 ? "" : "s"}`}
              className={`h-8 min-w-0 flex-1 rounded-sm ${HISTORY_STATUS_STYLES[day.status]}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {service.history.length > 0 ? (
            <>
              <span>{formatDay(service.history[0].date)}</span>
              <span>{formatDay(service.history[service.history.length - 1].date)}</span>
            </>
          ) : (
            <span>Aucun historique disponible</span>
          )}
        </div>
      </div>

      {service.history.some((day) => day.status === "partially" || day.status === "degraded") && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
          L'historique indique des interruptions sur la période.
        </div>
      )}
    </article>
  );
}

export function ServiceGrid({ services }: { services: HealthService[] }) {
  if (services.length === 0) {
    return <p className="rounded-xl border border-border bg-card p-5 text-muted-foreground">Aucun détail de service disponible.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => <ServiceCard key={service.name} service={service} />)}
    </div>
  );
}

export function ServiceGridSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Chargement des détails des services">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-border bg-card p-5">
          <div className="flex justify-between gap-3">
            <div className="h-5 w-32 rounded bg-muted" />
            <div className="h-5 w-24 rounded bg-muted" />
          </div>
          <div className="mt-4 h-7 w-36 rounded bg-muted" />
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 30 }, (_, day) => <div key={day} className="h-8 min-w-0 flex-1 rounded-sm bg-muted" />)}
          </div>
          <div className="mt-2 flex justify-between">
            <div className="h-3 w-20 rounded bg-muted/70" />
            <div className="h-3 w-20 rounded bg-muted/70" />
          </div>
        </div>
      ))}
    </div>
  );
}
