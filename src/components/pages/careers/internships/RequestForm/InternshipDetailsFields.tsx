import { Calendar, MessageSquare, Timer } from "lucide-react";

interface InternshipDetailsFieldsProps {
  desiredStartDate: string;
  duration: string;
  message: string;
  minStartDate: string;
  maxStartDate: string;
  setDesiredStartDate: (value: string) => void;
  setDuration: (value: string) => void;
  setMessage: (value: string) => void;
}

export function InternshipDetailsFields({
  desiredStartDate, duration, message, minStartDate, maxStartDate,
  setDesiredStartDate, setDuration, setMessage,
}: InternshipDetailsFieldsProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Calendar size={14} className="text-primary" /> Date de début souhaitée{" "}
            <span className="font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <input
            type="date"
            min={minStartDate}
            max={maxStartDate}
            value={desiredStartDate}
            onChange={(e) => {
              const value = e.target.value;
              if (value && value < minStartDate) return setDesiredStartDate(minStartDate);
              if (value && value > maxStartDate) return setDesiredStartDate(maxStartDate);
              setDesiredStartDate(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && desiredStartDate && desiredStartDate <= minStartDate) e.preventDefault();
              if (e.key === "ArrowUp" && desiredStartDate && desiredStartDate >= maxStartDate) e.preventDefault();
            }}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Timer size={14} className="text-primary" /> Durée souhaitée{" "}
            <span className="font-normal text-muted-foreground">(Optionnel)</span>
          </span>
          <input
            type="text"
            placeholder="Ex: 3 mois"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <MessageSquare size={14} className="text-primary" /> Message / Motivations{" "}
          <span className="font-normal text-muted-foreground">(Optionnel)</span>
        </span>
        <textarea
          rows={4}
          maxLength={2000}
          placeholder="Présentez votre projet académique, vos attentes pour ce stage..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
    </>
  );
}
