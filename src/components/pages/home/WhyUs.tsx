import { Zap, Shield, Award, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function WhyUs() {
  const items = [
    {
      icon: Award,
      title: "Qualité premium",
      text: "Du papier au pixel, chaque détail compte. Finitions soignées, fichiers irréprochables."
    },
    {
      icon: Zap,
      title: "Délais courts",
      text: "Bons à tirer rapides, production en 48-72h sur la plupart des supports imprimés."
    },
    {
      icon: Shield,
      title: "Prix accessibles",
      text: "Tarifs alignés sur le marché local, devis transparent, aucune surprise."
    },
    {
      icon: MapPin,
      title: "Expertise locale",
      text: "7 ans d'ancrage à Porto-Novo. Nous connaissons votre marché et votre public."
    },
  ];
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="container-x py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">Pourquoi nous</p>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
                Un partenaire <span className="text-accent">qui livre.</span>
              </h2>
              <p className="mt-5 text-secondary-foreground/70">
                Nous combinons rigueur graphique, savoir-faire d'imprimerie et
                vision web. Le tout au service d'entreprises et institutions
                béninoises qui veulent passer un cap.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <it.icon className="text-accent" size={28} />
                  <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
                  <p className="mt-2 text-sm text-secondary-foreground/70">{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
