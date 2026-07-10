import { useEffect, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import { FaqHomeCard } from "./Card";
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
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={`faq-skeleton-${idx}`} className="h-[68px] animate-pulse rounded-xl border border-border bg-card" />
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
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {faqs.map((item, i) => (
        <FaqHomeCard
          key={item.id}
          faq={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          cardRef={(el) => { itemRefs.current[item.id] = el; }}
        />
      ))}
    </div>
  );
}