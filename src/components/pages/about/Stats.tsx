import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { STATS } from "@/data/atelier";

export function AboutStats() {
  return (
    <section className="container-x pt-14">
      <Reveal>
        <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 md:p-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="font-display text-4xl font-bold text-gradient-brand">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}