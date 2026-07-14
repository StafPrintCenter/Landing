import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { useStatsStore } from "@/stores/useStatsStore";
import { StatsSkeleton } from "@/components/skeleton/HomeStats";

export function Stats() {
  const { stats, isLoading, isError } = useStatsStore();

  // 1. Gestion de l'état de chargement
  if (isLoading) {
    return <StatsSkeleton />;
  }

  // 2. Gestion de l'état d'erreur
  if (isError) {
    return (
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="container-x py-12 text-center">
          <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
            <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger les statistiques. Veuillez vérifier votre connexion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="text-center">
            <div className="font-display text-4xl font-bold text-accent md:text-5xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-secondary-foreground/70">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}