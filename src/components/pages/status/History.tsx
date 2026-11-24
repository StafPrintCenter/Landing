import { useState } from "react";
import type { HealthCheck, HealthStatus } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";

type DayStatus = HealthStatus | "no_data";

type HistoryDay = {
  key: string;
  date: Date;
  checks: HealthCheck[];
  status: DayStatus;
};

const DAY_STATUS_STYLES: Record<DayStatus, string> = {
  operational: "bg-emerald-500 hover:bg-emerald-600",
  partially: "bg-amber-500 hover:bg-amber-600",
  degraded: "bg-red-500 hover:bg-red-600",
  no_data: "bg-muted-foreground/20 hover:bg-muted-foreground/35",
};

const DAY_STATUS_LABELS: Record<DayStatus, string> = {
  operational: "Opérationnel",
  partially: "Partiellement dégradé",
  degraded: "Dégradé",
  no_data: "Aucune donnée",
};

const SERVICE_LABELS: Record<string, string> = {
  database: "Base de données",
  cache: "Cache",
  storage: "Stockage",
  queue: "File d'attente",
  smtp: "Messagerie",
  object_storage: "Stockage objet",
};

function getDayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getDays(checks: HealthCheck[]): HistoryDay[] {
  const grouped = new Map<string, HealthCheck[]>();
  for (const check of checks) {
    const date = new Date(check.checkedAt);
    const key = getDayKey(date);
    grouped.set(key, [...(grouped.get(key) ?? []), check]);
  }

  if (grouped.size === 0) return [];

  const lastDate = new Date();
  lastDate.setHours(12, 0, 0, 0);
  const firstDate = new Date(lastDate);
  firstDate.setDate(firstDate.getDate() - 29);

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(firstDate);
    date.setDate(firstDate.getDate() + index);
    const key = getDayKey(date);
    const dayChecks = grouped.get(key) ?? [];
    const statuses = dayChecks.map((check) => normalizeHealthStatus(check.status));
    const status: DayStatus = statuses.includes("degraded")
      ? "degraded"
      : statuses.includes("partially")
        ? "partially"
        : statuses.length > 0
          ? "operational"
          : "no_data";

    return { key, date, checks: dayChecks, status };
  });
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions = { dateStyle: "medium" }) {
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

function DayDetails({ day }: { day: HistoryDay }) {
  return (
    <div
      role="dialog"
      aria-label={`Détails du ${formatDate(day.date)}`}
      className="w-72 max-w-[calc(100vw-3rem)] rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl sm:w-80"
    >
      <p className="font-semibold">{formatDate(day.date, { day: "numeric", month: "long", year: "numeric" })}</p>
      <p className="mt-1 text-sm text-muted-foreground">{DAY_STATUS_LABELS[day.status]}</p>

      {day.checks.length > 0 ? (
        <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
          {day.checks.map((check) => (
            <div key={check.checkedAt} className="rounded-lg bg-muted/60 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Contrôle à {formatDate(new Date(check.checkedAt), { hour: "2-digit", minute: "2-digit" })}
              </p>
              <ul className="space-y-1.5">
                {Object.entries(check.services).map(([name, status]) => (
                  <li key={name} className="flex items-center justify-between gap-2 text-sm">
                    <span>{SERVICE_LABELS[name] ?? name}</span>
                    <span className={status === "operational" ? "text-emerald-600" : "text-red-600"}>
                      {status === "operational" ? "Opérationnel" : "Indisponible"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Aucun contrôle enregistré pour cette date.</p>
      )}
    </div>
  );
}

export function StatusHistory({ checks, isLoading }: { checks: HealthCheck[]; isLoading: boolean }) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  if (isLoading) {
    return <div className="h-28 animate-pulse rounded-2xl border border-border bg-card" />;
  }

  const days = getDays(checks);
  if (days.length === 0) {
    return <p className="rounded-xl border border-border bg-card p-5 text-muted-foreground">Aucun historique disponible.</p>;
  }

  const activeDay = days.find((day) => day.key === (hoveredDay ?? selectedDay));

  return (
    <div
      className="relative rounded-2xl border border-border bg-card p-5 md:p-6"
      onMouseLeave={() => setHoveredDay(null)}
    >
      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>{formatDate(days[0].date)}</span>
        <span>{formatDate(days[days.length - 1].date)}</span>
      </div>
      <div className="mt-3 overflow-x-auto pb-2">
        <div className="flex min-w-140 items-center justify-between gap-1">
          {days.map((day) => (
            <button
              key={day.key}
              type="button"
              onMouseEnter={() => setHoveredDay(day.key)}
              onFocus={() => setHoveredDay(day.key)}
              onBlur={() => setHoveredDay(null)}
              onClick={() => {
                setHoveredDay(null);
                setSelectedDay((current) => current === day.key ? null : day.key);
              }}
              aria-label={`${formatDate(day.date, { day: "numeric", month: "long", year: "numeric" })} : ${DAY_STATUS_LABELS[day.status]}`}
              aria-expanded={(selectedDay ?? hoveredDay) === day.key}
              className={`h-9 min-w-2 flex-1 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${DAY_STATUS_STYLES[day.status]}`}
            />
          ))}
        </div>
      </div>
      {activeDay && (
        <div
          className={`absolute top-16 z-10 ${days.indexOf(activeDay) < 10
            ? "left-5 sm:left-6"
            : days.indexOf(activeDay) < 20
              ? "left-1/2 -translate-x-1/2"
              : "right-5 sm:right-6"
            }`}
        >
          <DayDetails day={activeDay} />
        </div>
      )}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>Il y a 30 jours</span>
        <div className="flex items-center gap-2">
          {(["operational", "partially", "degraded", "no_data"] as const).map((status) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-sm ${DAY_STATUS_STYLES[status].split(" ")[0]}`} />
              <span className="sr-only sm:not-sr-only">{status === "operational" ? "OK" : status === "partially" ? "Partiel" : status === "degraded" ? "Dégradé" : "Sans données"}</span>
            </span>
          ))}
        </div>
        <span>Aujourd'hui</span>
      </div>
    </div>
  );
}
