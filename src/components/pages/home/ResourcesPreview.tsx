import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ResourceHomeCard } from "@/components/pages/tools/resources/home/Card";
import { ResourcesSkeleton } from "@/components/skeleton/HomeResources";
import { useResourcesStore } from "@/stores/useResourcesStore";

export function ResourcesPreview() {
  const { resources, isLoading, isError } = useResourcesStore({ perPage: 100 });

  if (isLoading) return <ResourcesSkeleton />;

  if (isError) {
    return (
      <section className="bg-muted/50 border-y border-border/50">
        <div className="container-x py-24 text-center">
          <div className="mx-auto inline-block max-w-xl rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive">
            <p className="text-lg font-semibold">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger les ressources récentes. Veuillez vérifier votre connexion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const latestResources = [...resources]
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .slice(0, 3);

  if (latestResources.length === 0) return null;

  return (
    <section className="bg-muted/50 border-y border-border/50">
      <div className="container-x py-24">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Ressources</p>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              Des outils pour vos projets.
            </h2>
          </Reveal>
          <Link
            to="/tools/ressources"
            className="hidden items-center gap-2 text-sm font-semibold text-primary hover:underline md:inline-flex"
          >
            Toutes les ressources <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {latestResources.map((resource, index) => (
            <Reveal key={resource.slug} delay={index * 0.05}>
              <ResourceHomeCard resource={resource} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/tools/ressources"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Voir toutes les ressources <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
