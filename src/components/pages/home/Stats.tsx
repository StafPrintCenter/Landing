import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { useStatsStore } from "@/stores/useStatsStore";

export function Stats() {
  const { stats, isLoading, isError } = useStatsStore();

  if (isError) {
    return (
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="container-x py-12 text-center text-sm text-secondary-foreground/70">
          Impossible de charger les statistiques pour le moment.
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
            <div key={`stat-skeleton-${idx}`} className="text-center">
              <div className="mx-auto h-10 w-20 animate-pulse rounded-lg bg-secondary-foreground/10 md:h-12" />
              <div className="mx-auto mt-3 h-4 w-24 animate-pulse rounded bg-secondary-foreground/10" />
            </div>
          ))
          : stats.map((s, i) => (
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