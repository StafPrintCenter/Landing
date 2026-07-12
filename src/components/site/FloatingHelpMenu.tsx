import { useState, useEffect, useRef } from "react";
import { HelpCircle, CircleX } from "lucide-react";
import { HelpMenuPanel } from "./floatinghelp/HelpMenuPanel";

export function FloatingHelpMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestionnaire de clic extérieur pour fermer le menu
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

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {open && <HelpMenuPanel onClose={() => setOpen(false)} />}

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
    </div>
  );
}