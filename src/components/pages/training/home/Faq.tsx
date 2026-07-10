import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useFaqsStore } from "@/stores/useFaqsStore";

export function FormationHomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { faqs, isLoading } = useFaqsStore({ category: "Formation", perPage: 50 });

  return (
    <section className="bg-muted/40 border-t border-border/40">
      <div className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Questions courantes</h2>
          <p className="text-sm text-muted-foreground mt-1">Tout ce que vous devez savoir avant de nous rejoindre.</p>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={`faq-skeleton-${idx}`}
                className="h-13 animate-pulse rounded-xl border border-border bg-card"
              />
            ))
          ) : faqs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune question disponible pour le moment.</p>
          ) : (
            faqs.map((item, i) => (
              <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground/90 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  {open === i ? <Minus size={18} className="text-primary shrink-0" /> : <Plus size={18} className="text-primary shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
