import { useState, useEffect, useRef } from "react";
import { HelpCircle, CircleX } from "lucide-react";
import { SiteReportModal } from "@/components/modal/SiteReportModal";
import { HelpMenuHeader, WhatsAppSection, LinkCheckerSection, ReportSection } from "./floating-menu";

export function FloatingHelpMenu() {
  const [open, setOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestionnaire de clic extérieur pour refermer le menu d'aide
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleOpenReport = () => {
    setOpen(false);
    setIsReportOpen(true);
  };

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Fenêtre volante du Centre d'aide */}
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <HelpMenuHeader onClose={() => setOpen(false)} />

          <div className="mt-4 space-y-4">
            <WhatsAppSection />
            <LinkCheckerSection />
            <ReportSection onOpenReport={handleOpenReport} />
          </div>
        </div>
      )}

      {/* Bouton d'action principal flottant (Trigger) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Ouvrir le menu d'aide"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 cursor-pointer transition duration-200 ring-4 ring-primary/10"
      >
        {open ? (
          <CircleX size={18} className="animate-in spin-in-90 duration-200" />
        ) : (
          <HelpCircle size={18} className="animate-in fade-in zoom-in-75 duration-200" />
        )}
      </button>

      {/* Boîte modale de signalement */}
      <SiteReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}