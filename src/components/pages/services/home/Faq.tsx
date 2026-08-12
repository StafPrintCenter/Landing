import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useFaqsStore } from "@/stores/useFaqsStore";
import { getDisciplineColorClass } from "@/data/categories";
import { ServiceHomeCta } from "./Cta";
import type { APIFaq } from "@/data/faqs";

export function ServiceHomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [randomFaqs, setRandomFaqs] = useState<APIFaq[]>([]);

  // Récupération de l'ensemble des FAQs
  const { faqs, isLoading } = useFaqsStore({ perPage: 50 });

  // Exécuté uniquement sur le navigateur du client après le chargement des faqs
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    // 1. Exclusion stricte de la catégorie "Formation" / "Formations"
    const serviceFaqs = faqs.filter(
      (faq) => faq.category.toLowerCase() !== "formation" && faq.category.toLowerCase() !== "formations"
    );

    // 2. Regroupement par catégorie
    const grouped = serviceFaqs.reduce<Record<string, APIFaq[]>>((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    // 2. Sélection d'une FAQ aléatoire par catégorie
    const selected = Object.values(grouped).map((items) => {
      const randomIndex = Math.floor(Math.random() * items.length);
      return items[randomIndex];
    });

    // 3. Mélange facultatif de l'ordre d'affichage des catégories
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    setRandomFaqs(selected);
  }, [faqs]);

  const isDataLoading = isLoading || (faqs.length > 0 && randomFaqs.length === 0);

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
          {/* Liste des FAQ : 1 par catégorie */}
          <div className="space-y-3 lg:col-span-7">
            {isDataLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`faq-skeleton-${idx}`}
                  className="h-16 animate-pulse rounded-xl border border-border bg-card"
                />
              ))
            ) : randomFaqs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucune question disponible pour le moment.</p>
            ) : (
              randomFaqs.map((item, i) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
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
                    {open === i ? (
                      <Minus size={18} className="text-primary shrink-0 mt-1" />
                    ) : (
                      <Plus size={18} className="text-primary shrink-0 mt-1" />
                    )}
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

          {/* CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ServiceHomeCta />
          </div>
        </div>
      </div>
    </section>
  );
}