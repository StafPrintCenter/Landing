import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/tests/devis")({
  head: () => ({
    meta: [
      { title: "Devis intelligent (test) — STAF PRINT CENTER" },
      { name: "description", content: "Configurateur de devis en ligne — estimation instantanée pour vos impressions et prestations digitales." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DevisPage,
});

type Category = "impression" | "digital";

const IMPRESSION_PRODUCTS = [
  { id: "carte-visite", label: "Carte de visite (100)", base: 8000 },
  { id: "flyer-a5", label: "Flyer A5 (100)", base: 15000 },
  { id: "bache", label: "Bâche publicitaire (m²)", base: 6000 },
  { id: "kakemono", label: "Kakemono roll-up", base: 45000 },
];

const DIGITAL_PRODUCTS = [
  { id: "logo", label: "Création de logo", base: 75000 },
  { id: "site-vitrine", label: "Site vitrine", base: 350000 },
  { id: "site-ecom", label: "Site e-commerce", base: 750000 },
  { id: "identite", label: "Identité visuelle complète", base: 180000 },
];

const FINISHES = [
  { id: "standard", label: "Standard", mult: 1 },
  { id: "premium", label: "Premium", mult: 1.35 },
  { id: "express", label: "Express (48h)", mult: 1.6 },
];

function DevisPage() {
  const [category, setCategory] = useState<Category>("impression");
  const [productId, setProductId] = useState(IMPRESSION_PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [finish, setFinish] = useState("standard");

  const products = category === "impression" ? IMPRESSION_PRODUCTS : DIGITAL_PRODUCTS;
  const product = products.find((p) => p.id === productId) ?? products[0];
  const finishOpt = FINISHES.find((f) => f.id === finish) ?? FINISHES[0];

  const total = useMemo(() => Math.round(product.base * quantity * finishOpt.mult), [product, quantity, finishOpt]);

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite un devis :\n- Catégorie : ${category}\n- Produit : ${product.label}\n- Quantité : ${quantity}\n- Finition : ${finishOpt.label}\n- Estimation : ${total.toLocaleString("fr-FR")} FCFA`,
  );

  return (
    <SiteShell>
      <section className="container-x max-w-4xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span>Tests</span>
          <span>/</span>
          <span className="text-foreground">Devis intelligent</span>
        </div>
        <div className="mb-10 flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Devis intelligent</h1>
            <p className="mt-2 text-foreground/70">Estimez le coût de votre commande en quelques clics. Ceci est une page de test.</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Catégorie</label>
              <div className="grid grid-cols-2 gap-2">
                {(["impression", "digital"] as Category[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      setProductId((c === "impression" ? IMPRESSION_PRODUCTS : DIGITAL_PRODUCTS)[0].id);
                    }}
                    className={`cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium capitalize transition ${category === c ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Produit / prestation</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-border bg-background px-4 py-3 text-sm"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.label} — dès {p.base.toLocaleString("fr-FR")} FCFA</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Quantité</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Finition / délai</label>
              <div className="grid grid-cols-3 gap-2">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition ${finish === f.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-border bg-primary/5 p-6">
            <div className="text-sm text-foreground/70">Estimation</div>
            <div className="font-display text-4xl font-bold text-primary">{total.toLocaleString("fr-FR")}<span className="ml-1 text-base text-foreground/60">FCFA</span></div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Estimation indicative</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Devis final sous 24h</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Sans engagement</li>
            </ul>
            <a
              href={`${SITE.whatsappLink}?text=${waMessage}`}
              target="_blank" rel="noreferrer"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Valider ce devis <ArrowRight size={16} />
            </a>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}