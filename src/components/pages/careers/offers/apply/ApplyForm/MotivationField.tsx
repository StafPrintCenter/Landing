import { FileText } from "lucide-react";

interface MotivationFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function MotivationField({ value, onChange }: MotivationFieldProps) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
        <FileText size={14} className="text-primary" /> Votre motivation{" "}
        <span className="text-xs font-normal text-muted-foreground">(Optionnel)</span>
      </span>
      <textarea
        rows={4}
        maxLength={3000}
        placeholder="Présentez brièvement vos motivations pour ce poste..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-border bg-background p-3.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
