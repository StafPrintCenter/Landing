import { EyeOff, Lock, ShieldCheck } from "lucide-react";
import { ETHIQUE_PILLARS } from "@/data/ethique";

const PILLAR_ICONS = [EyeOff, Lock, ShieldCheck];

export function EthiquePillars() {
  return (
    <section className="container-x py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {ETHIQUE_PILLARS.map((pillar, index) => {
          const Icon = PILLAR_ICONS[index];
          if (!Icon) return null;

          return (
            <div key={pillar.title} className="rounded-2xl border border-border bg-card p-6">
              <Icon className="h-8 w-8 text-primary" />
              <h2 className="mt-4 font-display text-xl font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
