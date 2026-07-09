import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useProjectsStore } from "@/stores/useProjectsStore";
import type { ProjectCategory } from "@/data/projects";

interface ServiceDetailRelatedProps {
  projectCategory: ProjectCategory;
}

export function ServiceDetailRelated({ projectCategory }: ServiceDetailRelatedProps) {
  const { projects: related, isLoading } = useProjectsStore({ category: projectCategory, perPage: 6 });

  if (!isLoading && related.length === 0) return null;

  return (
    <section className="container-x py-20">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Ils nous ont fait confiance</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Quelques réalisations.</h2>
        </Reveal>
        <Link
          to="/projects"
          search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline group"
        >
          Voir le portfolio <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
            <div key={`related-skeleton-${idx}`} className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card h-full">
              <div className="aspect-4/3 bg-muted" />
              <div className="p-5 space-y-2">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </div>
            </div>
          ))
          : related.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <motion.article whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-border bg-card h-full">
                <div className="aspect-4/3 overflow-hidden bg-muted">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
      </div>
    </section>
  );
}