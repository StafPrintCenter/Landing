import { Reveal } from "@/components/site/Reveal";
import type { ServiceProcessStep } from "@/data/services";

interface ServiceDetailProcessProps {
  process: ServiceProcessStep[];
}

export function ServiceDetailProcess({ process }: ServiceDetailProcessProps) {
  return (
    <section className="bg-muted/50 border-y border-border/40">
      <div className="container-x py-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Notre process</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Simple, transparent, efficace.</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {(process || []).map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-6 h-full transition-all hover:shadow-md">
                <div className="font-display text-4xl font-bold text-primary/20">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{p.step}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}