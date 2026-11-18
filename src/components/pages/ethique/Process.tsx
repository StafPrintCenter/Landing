import { ETHIQUE_PROCESS } from "@/data/ethique";

export function EthiqueProcess() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container-x">
        <h2 className="font-display text-3xl font-bold">Traitement &amp; délais</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-5">
          {ETHIQUE_PROCESS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-5">
              <span className="text-xs font-semibold text-primary">
                {index + 1}. {step.delay}
              </span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
