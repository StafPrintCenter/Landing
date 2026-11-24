import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { HealthCheck } from "@/stores/useHealthStore";
import { normalizeHealthStatus } from "@/stores/useHealthStore";
import {
  formatStatusDate,
  getServiceLabel,
  HISTORY_STATUS_KEYS,
  STATUS_BAR_STYLES,
  STATUS_LABELS,
  STATUS_SHORT_LABELS,
  STATUS_TEXT_STYLES,
  HealthStatus
} from "@/data/status";

type DayStatus = HealthStatus | "no_data";

type HistoryDay = {
  key: string;
  date: Date;
  checks: HealthCheck[];
  status: DayStatus;
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

function DayDetails({ day, arrowPosition, onClose }: { day: HistoryDay; arrowPosition: number; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label={`Détails du ${formatStatusDate(day.date)}`}
      className="relative w-full max-w-[calc(100vw-3rem)] rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold">{formatStatusDate(day.date, { day: "numeric", month: "long", year: "numeric" })}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer les détails"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{STATUS_LABELS[day.status]}</p>

      {day.checks.length > 0 ? (
        <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
          {day.checks.map((check) => (
            <div key={check.checkedAt} className="rounded-lg bg-muted/60 p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Contrôle à {formatStatusDate(new Date(check.checkedAt), { hour: "2-digit", minute: "2-digit" })}
              </p>
              <ul className="space-y-1.5">
                {Object.entries(check.services).map(([name, status]) => (
                  <li key={name} className="flex items-center justify-between gap-2 text-sm">
                    <span>{getServiceLabel(name)}</span>
                    <span className={STATUS_TEXT_STYLES[status]}>{STATUS_LABELS[status]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Aucun contrôle enregistré pour cette date.</p>
      )}
      <span
        aria-hidden
        style={{ left: `${arrowPosition}px` }}
        className="absolute -top-2 block h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-border"
      />
      <span
        aria-hidden
        style={{ left: `${arrowPosition}px` }}
        className="absolute -top-1.5 block h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[7px] border-x-transparent border-b-popover"
      />
    </div>
  );
}

export function StatusHistory({ checks, isLoading }: { checks: HealthCheck[]; isLoading: boolean }) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ left: 20, width: 288, arrow: 20 });
  const historyRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedDay) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const targetElement = event.target as HTMLElement;
      const isInsideDetails = detailsRef.current?.contains(target);
      const isDayButton = targetElement.closest("button[data-history-day]");

      if (!isInsideDetails && !isDayButton) {
        setSelectedDay(null);
        setHoveredDay(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedDay(null);
        setHoveredDay(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDay]);

  const positionPopover = (button: HTMLButtonElement) => {
    const historyElement = historyRef.current;
    if (!historyElement) return;

    const historyRect = historyElement.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const width = Math.min(
      window.matchMedia("(min-width: 640px)").matches ? 320 : 288,
      Math.max(160, historyElement.clientWidth - 40),
    );
    const anchor = buttonRect.left + buttonRect.width / 2 - historyRect.left;
    const left = Math.max(20, Math.min(anchor - width / 2, historyElement.clientWidth - width - 20));
    setPopoverPosition({ left, width, arrow: Math.max(12, Math.min(width - 12, anchor - left)) });
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Chargement de l'historique des services"
        className="animate-pulse rounded-2xl border border-border bg-card p-5 md:p-6"
      >
        <div className="flex justify-between gap-4">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 30 }, (_, index) => (
            <div key={index} className="h-9 min-w-0 flex-1 rounded-sm bg-muted" />
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <div className="h-3 w-24 rounded bg-muted/70" />
          <div className="h-3 w-24 rounded bg-muted/70" />
        </div>
      </div>
    );
  }

  const days = getDays(checks);
  if (days.length === 0) {
    return <p className="rounded-xl border border-border bg-card p-5 text-muted-foreground">Aucun historique disponible.</p>;
  }

  const activeDay = days.find((day) => day.key === (hoveredDay ?? selectedDay));

  return (
    <div
      ref={historyRef}
      className="relative rounded-2xl border border-border bg-card p-5 md:p-6"
      onMouseLeave={() => setHoveredDay(null)}
    >
      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>{formatStatusDate(days[0].date)}</span>
        <span>{formatStatusDate(days[days.length - 1].date)}</span>
      </div>
      <div className="mt-3 overflow-x-auto pb-2">
        <div className="flex min-w-140 items-center justify-between gap-1">
          {days.map((day) => (
            <button
              key={day.key}
              type="button"
              data-history-day
              onMouseEnter={(event) => {
                if (!selectedDay) {
                  setHoveredDay(day.key);
                  positionPopover(event.currentTarget);
                }
              }}
              onFocus={(event) => {
                if (!selectedDay) {
                  setHoveredDay(day.key);
                  positionPopover(event.currentTarget);
                }
              }}
              onBlur={() => setHoveredDay(null)}
              onClick={(event) => {
                setHoveredDay(null);
                positionPopover(event.currentTarget);
                setSelectedDay((current) => current === day.key ? null : day.key);
              }}
              aria-label={`${formatStatusDate(day.date, { day: "numeric", month: "long", year: "numeric" })} : ${STATUS_LABELS[day.status]}`}
              aria-expanded={(selectedDay ?? hoveredDay) === day.key}
              className={`h-9 min-w-2 flex-1 rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${STATUS_BAR_STYLES[day.status]}`}
            />
          ))}
        </div>
      </div>
      {activeDay && (
        <div
          ref={detailsRef}
          className="absolute top-28 z-10"
          style={{ left: `${popoverPosition.left}px` }}
        >
          <div style={{ width: `${popoverPosition.width}px` }}>
            <DayDetails
              day={activeDay}
              arrowPosition={popoverPosition.arrow}
              onClose={() => {
                setSelectedDay(null);
                setHoveredDay(null);
              }}
            />
          </div>
        </div>
      )}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>Il y a 30 jours</span>
        <div className="flex items-center gap-2">
          {HISTORY_STATUS_KEYS.map((status) => (
            <span key={status} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-sm ${STATUS_BAR_STYLES[status].split(" ")[0]}`} />
              <span className="sr-only sm:not-sr-only">{STATUS_SHORT_LABELS[status]}</span>
            </span>
          ))}
        </div>
        <span>Aujourd'hui</span>
      </div>
    </div>
  );
}
