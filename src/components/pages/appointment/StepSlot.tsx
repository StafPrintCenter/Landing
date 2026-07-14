import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2, Lock, Clock3 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAppointmentSlots } from "@/stores/useAppointmentsStore";
import { buildSlotList, type SlotState } from "@/data/appointments";
import { isDateDisabled, type BookingData, type UpdateBooking } from "./types";

interface StepSlotProps {
  data: BookingData;
  update: UpdateBooking;
}

const STATE_BADGE: Record<Exclude<SlotState, "available">, { label: string; icon: typeof Lock; className: string }> = {
  pending: { label: "En attente", icon: Clock3, className: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  confirmed: { label: "Réservé", icon: Lock, className: "bg-muted text-muted-foreground border-border" },
};

export function StepSlot({ data, update }: StepSlotProps) {
  const dateKey = data.date ? format(data.date, "yyyy-MM-dd") : null;
  const { slots, isLoading, isError } = useAppointmentSlots(dateKey);

  const slotList = buildSlotList(slots);

  return (
    <div>
      <h2 className="text-xl font-bold">Date et heure</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sélectionnez un jour puis un créneau disponible.</p>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-2 flex justify-center">
          <Calendar
            mode="single"
            selected={data.date ?? undefined}
            onSelect={(d) => {
              update("date", d ?? null);
              update("time", null);
            }}
            disabled={isDateDisabled}
            locale={fr}
            weekStartsOn={1}
            className={cn("p-3 pointer-events-auto")}
          />
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">
            {data.date
              ? `Créneaux — ${format(data.date, "EEEE d MMMM", { locale: fr })}`
              : "Sélectionnez une date"}
          </div>

          {data.date && isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={16} className="animate-spin" /> Chargement des créneaux…
            </div>
          )}

          {data.date && isError && (
            <p className="text-sm text-destructive">
              Impossible de récupérer les créneaux pour cette date. Réessayez ou choisissez une autre date.
            </p>
          )}

          {data.date && !isLoading && !isError && slotList.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun créneau disponible ce jour.</p>
          )}

          {data.date && !isLoading && !isError && slotList.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-80 overflow-y-auto pr-1">
                {slotList.map(({ time: s, state }) => {
                  const active = data.time === s;
                  const isToday = data.date ? isSameDay(data.date, new Date()) : false;
                  const now = new Date();
                  const [hh, mm] = s.split(":").map(Number);
                  const isPastToday = isToday && (hh < now.getHours() || (hh === now.getHours() && mm <= now.getMinutes()));
                  const unavailable = state !== "available" || isPastToday;
                  const badge = state !== "available" ? STATE_BADGE[state] : null;
                  const BadgeIcon = badge?.icon;

                  return (
                    <button
                      key={s}
                      disabled={unavailable}
                      onClick={() => update("time", s)}
                      title={badge ? badge.label : undefined}
                      className={cn(
                        "relative h-10 cursor-pointer flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                        active && !unavailable
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-muted",
                        unavailable && "cursor-not-allowed opacity-60 hover:bg-transparent",
                      )}
                    >
                      {/* Si un badge existe, on masque l'heure textuelle pour afficher uniquement le badge centré */}
                      {badge && BadgeIcon ? (
                        <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold", badge.className)}>
                          <BadgeIcon size={10} />
                          {badge.label}
                        </span>
                      ) : (
                        // Sinon, on affiche l'heure normalement (avec line-through si c'est aujourd'hui dans le passé)
                        <span className={cn(isPastToday && "line-through text-muted-foreground")}>
                          {s}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-border bg-card" /> Disponible
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-amber-500/30 bg-amber-500/10" /> En attente de confirmation
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-border bg-muted" /> Réservé
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}