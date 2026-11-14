import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { getDisciplineColorClass } from "@/data/categories";
import { shuffleFaqs, type APIFaq } from "@/data/faqs";
import { useFaqsStore } from "@/stores/useFaqsStore";
import { Reveal } from "@/components/site/Reveal";
import { ResourceHomeCta } from "./Cta";

const RESOURCE_FAQ_CATEGORIES = new Set(["Conseils", "Actus"]);

export function ResourceHomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [randomFaqs, setRandomFaqs] = useState<APIFaq[]>([]);
  const { faqs, isLoading, isError, error } = useFaqsStore({ perPage: 50 });

  useEffect(() => {
    const selected = faqs.filter((faq) => RESOURCE_FAQ_CATEGORIES.has(faq.category));
    setRandomFaqs(shuffleFaqs(selected).slice(0, 4));
  }, [faqs]);

  const hasEligibleFaqs = faqs.some((faq) => RESOURCE_FAQ_CATEGORIES.has(faq.category));
  const isDataLoading = isLoading || (hasEligibleFaqs && randomFaqs.length === 0);

  return (
    <section className="border-t border-border/40 bg-muted/40">
      <div className="container-x py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Conseils et astuces</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quelques réponses pratiques pour mieux préparer vos projets et utiliser nos ressources.
          </p>
        </Reveal>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-7">
            {isDataLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`resource-faq-skeleton-${index}`}
                  className="h-16 animate-pulse rounded-xl border border-border bg-card"
                />
              ))
            ) : isError ? (
              <p className="text-sm text-destructive">
                Impossible de charger les conseils.{error instanceof Error && error.message ? ` ${error.message}` : ""}
              </p>
            ) : randomFaqs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun conseil disponible pour le moment.</p>
            ) : (
              randomFaqs.map((item, index) => (
                <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200">
                  <button
                    type="button"
                    aria-expanded={open === index}
                    onClick={() => setOpen(open === index ? null : index)}
                    className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left font-medium text-foreground/90 transition-colors hover:text-primary"
                  >
                    <span className="flex flex-col gap-1.5">
                      <span className={`w-fit rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getDisciplineColorClass(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-sm sm:text-base">{item.question}</span>
                    </span>
                    {open === index ? (
                      <Minus size={18} className="mt-1 shrink-0 text-primary" />
                    ) : (
                      <Plus size={18} className="mt-1 shrink-0 text-primary" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {open === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-border/60 bg-muted/10 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <ResourceHomeCta />
          </div>
        </div>
      </div>
    </section>
  );
}
