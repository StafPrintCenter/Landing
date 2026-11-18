import { ETHIQUE_FAQ, ETHIQUE_POSTAL } from "@/data/ethique";
import { SITE } from "@/data/site";

export function EthiqueChannelsFaq() {
  return (
    <section className="container-x grid gap-10 py-16 md:grid-cols-2">
      <div>
        <h2 className="font-display text-2xl font-bold">Autres canaux</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">WhatsApp référent :</strong> {SITE.whatsapp}
          </li>
          <li>
            <strong className="text-foreground">E-mail :</strong> {SITE.email}
          </li>
          <li>
            <strong className="text-foreground">Courrier :</strong> {ETHIQUE_POSTAL}
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-4 space-y-3">
          {ETHIQUE_FAQ.map((item) => (
            <details key={item.q} className="rounded-xl border border-border p-4">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
