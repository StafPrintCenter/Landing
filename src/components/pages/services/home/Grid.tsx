import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ServiceHomeSkeleton } from "./Skeleton";
import { ArrowRight, Star } from "lucide-react";
import { SERVICE_CATEGORIES, type APIService, getServiceIcon } from "@/data/services";
import { EmptyState } from "@/components/shared/EmptyState";

interface ServiceHomeGridProps {
  isLoading: boolean;
  services: APIService[];
}

export function ServiceHomeGrid({ isLoading, services }: ServiceHomeGridProps) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          // Chargement via Skeletons
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`skeleton-${idx}`}>
              <ServiceHomeSkeleton />
            </div>
          ))
        ) : services.length > 0 ? (
          // Liste
          services.map((s) => {
            const Icon = getServiceIcon(s.icon);

            return (
              <motion.div
                key={s.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -6 }}
                className="group h-full"
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={[
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-shadow hover:shadow-xl",
                    s.featured ? "border-primary/30 bg-primary/5" : "border-border bg-card",
                  ].join(" ")}
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition group-hover:bg-primary/10" />

                  <div className="relative flex items-center justify-between">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white transition group-hover:scale-105"
                      style={{ backgroundColor: s.color }}
                    >
                      <Icon size={22} />
                    </div>

                    {s.featured && (
                      <span
                        title="Service populaire"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                      >
                        <Star size={15} className="fill-primary text-primary" />
                      </span>
                    )}
                  </div>

                  <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="relative mt-2 flex-1 text-sm text-muted-foreground">{s.long}</p>

                  <div className="relative mt-6 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      En savoir plus
                      <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </span>

                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {SERVICE_CATEGORIES.find((c) => c.value === s.category)?.label || s.category}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          // 4. Aucun résultat
          <EmptyState description="Aucun service ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </div>
  );
}