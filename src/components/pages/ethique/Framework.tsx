import { Scale } from "lucide-react";
import { ETHIQUE_FRAMEWORK } from "@/data/ethique";

export function EthiqueFramework() {
  return (
    <section id="cadre" className="container-x scroll-mt-24 pb-16">
      <h2 className="flex items-center gap-3 font-display text-3xl font-bold">
        <Scale className="h-7 w-7 text-primary" /> Cadre de référence
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {ETHIQUE_FRAMEWORK.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
