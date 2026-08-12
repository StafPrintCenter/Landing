import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useFaqsStore } from "@/stores/useFaqsStore";
import { getDisciplineColorClass } from "@/data/categories";
import { ServiceHomeCta } from "./Cta";
import type { APIFaq } from "@/data/faqs";

export function ServiceHomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  // Récupération de l'ensemble des FAQs
  const { faqs, isLoading } = useFaqsStore({ perPage: 50 });

  // Mélange aléatoire des données une fois qu'elles sont chargées
  const randomizedFaqs = useMemo(() => {
    if (!faqs || faqs.length === 0) return [];

    const grouped = faqs.reduce<Record<string, APIFaq[]>>((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    return Object.values(grouped).map((items) => {
      const randomIndex = Math.floor(Math.random() * items.length);
      return items[randomIndex];
    });
  }, [faqs]);

  return (
    <section className="bg-muted/40 border-t border-border/40">
      <div className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Questions courantes</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tout ce que vous devez savoir sur nos services et processus.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
          {/* Liste des FAQ */}
          <div className="space-y-3 lg:col-span-7">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={`faq-skeleton-${idx}`}
                  className="h-13 animate-pulse rounded-xl border border-border bg-card"
                />
              ))
            ) : randomizedFaqs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune question disponible pour le moment.</p>
            ) : (
              randomizedFaqs.map((item, i) => (
                <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground/90 hover:text-primary transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">
                      <span className="mr-2 text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
                        {item.category}
                      </span>
                      {item.question}
                    </span>
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

          {/* CTA sur-mesure */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ServiceHomeCta />
          </div>
        </div>
      </div>
    </section>
  );
}