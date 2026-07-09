import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getDisciplineColor } from "@/data/projects";
import { useProjectsStore } from "@/stores/useProjectsStore";
import { Link } from "@tanstack/react-router";
import { ProjectsSkeleton } from "@/components/skeleton/HomeProjects";

export function ProjectsPreview() {
  const { projects, isLoading, isError } = useProjectsStore({ perPage: 6 });

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isError) {
    return (
      <section className="container-x py-24 text-center">
        <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
          <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
          <p className="mt-1 text-sm text-destructive/80">
            Impossible de charger les réalisations récentes. Veuillez vérifier votre connexion.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-24">
      <div className="flex items-end justify-between gap-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Réalisations</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Quelques projets récents.</h2>
        </Reveal>
        <Link to="/projects"
          search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Voir tout <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <motion.article
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card h-full flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className={[
                      "inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                      getDisciplineColor(p.category),
                    ].join(" ")}
                  >
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.client}</p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/projects"
          search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Voir tout le portfolio <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
