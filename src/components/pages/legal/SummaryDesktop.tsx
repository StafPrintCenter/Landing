import { motion } from "framer-motion";
import type { LegalSection } from "./types";

interface LegalSummaryDesktopProps {
  sections: LegalSection[];
  activeId: string | undefined;
  activeIndex: number;
  onNavigate: (id: string) => void;
}

export function LegalSummaryDesktop({
  sections,
  activeId,
  activeIndex,
  onNavigate,
}: LegalSummaryDesktopProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28">
        <p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sommaire
        </p>
        <div className="relative mt-3">
          <div className="absolute left-3 top-1 bottom-1 w-px bg-border" />
          <motion.div
            className="absolute left-2.5 w-1 rounded-full bg-primary"
            animate={{
              top: `${(activeIndex / sections.length) * 100}%`,
              height: `${100 / sections.length}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <ul className="space-y-0.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  className={[
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-lg py-2 pl-7 pr-3 text-left text-sm transition-colors",
                    activeId === s.id
                      ? "font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  <span className="font-mono text-[10px] tabular-nums opacity-60">
                    {s.number}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}