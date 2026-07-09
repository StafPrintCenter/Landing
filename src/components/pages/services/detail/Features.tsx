import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

interface ServiceDetailFeaturesProps {
  features: string[];
}

export function ServiceDetailFeatures({ features }: ServiceDetailFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <section className="container-x py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Ce qui est inclus</p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Une prestation complète, sans mauvaise surprise.</h2>
          <p className="mt-4 text-muted-foreground">Un livrable clair, des fichiers propres, un suivi rapide. On s'occupe des détails pour que vous restiez focus sur votre business.</p>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {features.map((f, i) => (
            <Reveal key={f} delay={i * 0.05}>
              <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors">
                <CheckCircle2 className="mt-0.5 shrink-0 text-primary" size={20} />
                <span className="text-sm font-medium text-foreground/90">{f}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}