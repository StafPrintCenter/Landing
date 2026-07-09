import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useServicesStore } from "@/stores/useServicesStore";
import { getServiceIcon } from "@/data/services";

interface ServiceDetailOthersProps {
  currentSlug: string;
}

export function ServiceDetailOthers({ currentSlug }: ServiceDetailOthersProps) {
  const { services } = useServicesStore({ perPage: 100 });

  const others = (services || []).filter((s) => s.slug !== currentSlug).slice(0, 4);

  return (
    <section className="border-t border-border/50 bg-card/30">
      <div className="container-x py-20">
        <Reveal>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            <Sparkles size={16} /> Autres services
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Continuer d'explorer.</h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s, i) => {
            const OIcon = getServiceIcon(s.icon);
            return (
              <Reveal key={s.slug} delay={i * 0.05} className="min-w-0 overflow-hidden">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors"
                    style={{ backgroundColor: s.color }}
                  >
                    <OIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">{s.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{s.short}</div>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground/60 transition group-hover:translate-x-1 group-hover:text-primary shrink-0" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}