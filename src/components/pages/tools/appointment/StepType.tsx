import { MapPin, Video, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppointmentMode } from "@/data/appointments";
import type { BookingData, Duration, UpdateBooking } from "./types";

interface StepTypeProps {
  data: BookingData;
  update: UpdateBooking;
}

const OPTIONS: Array<{ id: AppointmentMode; icon: typeof MapPin; title: string; desc: string }> = [
  { id: "presentiel", icon: MapPin, title: "Présentiel", desc: "À notre atelier de Porto-Novo" },
  { id: "en_ligne", icon: Video, title: "En ligne", desc: "Visio (Google Meet / Microsoft Teams)" },
];

const DURATIONS: Duration[] = [20, 30, 45, 60];

export function StepType({ data, update }: StepTypeProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">Type de rendez-vous</h2>
      <p className="mt-1 text-sm text-muted-foreground">Comment souhaitez-vous nous rencontrer ?</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((o) => {
          const active = data.mode === o.id;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              onClick={() => update("mode", o.id)}
              className={cn(
                "cursor-pointer text-left rounded-2xl border p-5 transition-all",
                active
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                  <Icon size={18} />
                </span>
                <div>
                  <div className="font-semibold">{o.title}</div>
                  <div className="text-xs text-muted-foreground">{o.desc}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold flex items-center gap-2"><Clock size={16} /> Durée</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {DURATIONS.map((d) => {
            const active = data.duration === d;
            return (
              <button
                key={d}
                onClick={() => update("duration", d)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                )}
              >
                {d} min
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}