import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { getDisciplineColorClass } from "@/data/categories";
import type { APIFaq } from "@/data/faqs";

interface FaqHomeCardProps {
  faq: APIFaq;
  isOpen: boolean;
  onToggle: () => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}

export function FaqHomeCard({ faq: item, isOpen, onToggle, cardRef }: FaqHomeCardProps) {
  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left font-medium text-foreground/90 hover:text-primary transition-colors cursor-pointer"
      >
        <span className="flex flex-col gap-1.5">
          <span
            className={[
              "w-fit rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              getDisciplineColorClass(item.category),
            ].join(" ")}
          >
            {item.category}
          </span>
          <span className="text-sm sm:text-base">{item.question}</span>
        </span>
        {isOpen ? <Minus size={18} className="text-primary shrink-0 mt-1" /> : <Plus size={18} className="text-primary shrink-0 mt-1" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
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
  );
}