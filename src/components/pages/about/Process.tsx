import { Reveal } from "@/components/site/Reveal";
import { PROCESS } from "@/data/atelier";

export function AboutProcess() {
  return (
    <section className="border-y border-border bg-muted/40 py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Comment nous travaillons
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
            Cinq étapes, aucune zone d'ombre.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}