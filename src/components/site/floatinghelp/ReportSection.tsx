import { useState } from "react";
import { Flag } from "lucide-react";
import { SiteReportModal } from "@/components/modal/SiteReportModal";

interface ReportSectionProps {
  /** Ferme le panneau d'aide parent quand la modale de signalement s'ouvre */
  onTriggerOpen?: () => void;
}

export function ReportSection({ onTriggerOpen }: ReportSectionProps) {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        Signalement
      </span>
      <button
        onClick={() => {
          onTriggerOpen?.();
          setIsReportOpen(true);
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
      >
        <Flag size={14} />
        Signaler un problème
      </button>

      <SiteReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}