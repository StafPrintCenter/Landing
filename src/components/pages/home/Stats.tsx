import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { STATS } from "@/data/stats";

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary text-secondary-foreground">
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
        {Object.values(STATS).map((s, i) => (
          <Reveal key={i} delay={i * 0.08} className="text-center">
            <div className="font-display text-4xl font-bold text-accent md:text-5xl">
              <Counter to={s.n} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-secondary-foreground/70">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}