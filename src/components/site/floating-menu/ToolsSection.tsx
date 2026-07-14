// src/components/site/floating-menu/ToolsSection.tsx

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Wrench, ChevronDown, CalendarCheck, Search, LayoutGrid } from "lucide-react";

export function ToolsSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2 border-t border-border pt-3">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Outils
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <Link
            to="/tools/appointment"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
          >
            <CalendarCheck size={14} />
            Prendre rendez-vous
          </Link>

          <Link
            to="/tools/lookup"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
          >
            <Search size={14} />
            Suivre une demande
          </Link>

          <Link
            to="/tools"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-medium hover:bg-muted/70 cursor-pointer transition"
          >
            <LayoutGrid size={14} />
            Tous les outils
          </Link>
        </div>
      )}
    </div>
  );
}