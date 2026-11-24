import { Flag } from "lucide-react";

interface ReportSectionProps {
  onOpenReport: () => void;
}

export function ReportSection({ onOpenReport }: ReportSectionProps) {
  return (
    <div className="space-y-2 border-t border-border pt-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Signalement
      </span>
      <button
        onClick={onOpenReport}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
      >
        <Flag size={14} />
        Signaler un problème
      </button>
    </div>
  );
}