import { ETHIQUE_SCOPE } from "@/data/ethique";

export function EthiqueScope() {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container-x">
        <h2 className="font-display text-3xl font-bold">Ce que vous pouvez signaler</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETHIQUE_SCOPE.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Les réclamations commerciales (retard, réimpression, litige de prix) relèvent du service
          client, pas de ce dispositif.
        </p>
      </div>
    </section>
  );
}
