import type { LegalSection } from "./types";

interface LegalSummaryMobileProps {
  sections: LegalSection[];
  activeId: string | undefined;
  onNavigate: (id: string) => void;
}

export function LegalSummaryMobile({ sections, activeId, onNavigate }: LegalSummaryMobileProps) {
  return (
    <nav className="sticky top-16 z-40 -mx-4 mb-8 overflow-x-auto border-b border-border bg-background/90 px-4 pb-2 pt-3 backdrop-blur-md lg:hidden">
      <div className="flex gap-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            className={[
              "shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeId === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground",
            ].join(" ")}
          >
            {s.number}- {s.title}
          </button>
        ))}
      </div>
    </nav>
  );
}