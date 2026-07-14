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
  pending: {
    label: "En attente",
    icon: Clock3,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/30"
  },
  confirmed: {
    label: "Réservé",
    icon: Lock,
    className: "bg-muted text-muted-foreground border-border"
  },
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

          {data.date && !isLoading && !isError && slots.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun créneau disponible ce jour.</p>
          )}

          {data.date && !isLoading && !isError && slots.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-80 overflow-y-auto pr-1">
              {slots.map((s) => {
                const active = data.time === s;
                const isToday = data.date ? isSameDay(data.date, new Date()) : false;
                const now = new Date();
                const [hh, mm] = s.split(":").map(Number);
                const past = isToday && (hh < now.getHours() || (hh === now.getHours() && mm <= now.getMinutes()));
                return (
                  <button
                    key={s}
                    disabled={past}
                    onClick={() => update("time", s)}
                    className={cn(
                      "cursor-pointer rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted",
                      past && "opacity-40 cursor-not-allowed line-through",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}