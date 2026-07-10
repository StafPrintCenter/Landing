import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaqHomeCard } from "./Card";
import { FaqHomeSkeleton } from "./Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
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

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`faq-skeleton-${idx}`}>
              <FaqHomeSkeleton />
            </div>
          ))
        ) : faqs.length > 0 ? (
          faqs.map((item, i) => (
            <FaqHomeCard
              key={item.id}
              faq={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              cardRef={(el) => { itemRefs.current[item.id] = el; }}
            />
          ))
        ) : (
          <EmptyState description="Aucune question ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </div>
  );
}