import { ETHIQUE_PILLARS } from "@/data/ethique";

export function EthiquePillars() {
  return (
    <section className="container-x py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {ETHIQUE_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 shadow-sm transition hover:border-primary/30 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
