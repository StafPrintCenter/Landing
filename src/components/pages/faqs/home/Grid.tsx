import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, SearchX } from "lucide-react";
import { getDisciplineColorClass } from "@/data/categories";
import type { APIFaq } from "@/data/faqs";

interface FaqHomeGridProps {
  isLoading: boolean;
  faqs: APIFaq[];
  openId?: string;
}

export function FaqHomeGrid({ isLoading, faqs, openId }: FaqHomeGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Ouvre et scrolle automatiquement vers l'élément ciblé par ?open=id (s'il est sur la page courante)
  useEffect(() => {
    if (!openId || faqs.length === 0) return;
    const idx = faqs.findIndex((f) => f.id === openId);
    if (idx !== -1) {
      setOpenIndex(idx);
      itemRefs.current[faqs[idx].id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [openId, faqs]);

  if (isLoading) {
    return (
      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={`faq-skeleton-${idx}`} className="h-13 animate-pulse rounded-xl border border-border bg-card" />
        ))}
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
          <SearchX size={28} className="text-muted-foreground/60" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">Aucun résultat</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Aucune question ne correspond aux critères sélectionnés. Essayez un autre filtre.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      {faqs.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => { itemRefs.current[item.id] = el; }}
          className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground/90 hover:text-primary transition-colors cursor-pointer"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span
                className={[
                  "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  getDisciplineColorClass(item.category),
                ].join(" ")}
              >
                {item.category}
              </span>
              <span className="text-sm sm:text-base">{item.question}</span>
            </span>
            {openIndex === i ? <Minus size={18} className="text-primary shrink-0" /> : <Plus size={18} className="text-primary shrink-0" />}
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="border-t border-border/60 px-5 py-4 text-sm text-muted-foreground leading-relaxed bg-muted/10">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}