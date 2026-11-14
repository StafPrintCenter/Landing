import { BookOpenCheck, Check, MonitorCheck, ShieldCheck } from "lucide-react";
import type { APIResource } from "@/data/resources";

export function ResourceDetailSections({ resource }: { resource: APIResource }) {
  const includes = resource.includes ?? [];
  const outcomes = resource.outcomes ?? [];
  const requirements = resource.requirements ?? [];

  return (
    <section className="container-x py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        <div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contenu du fichier</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Tout ce qui est inclus.</h2>
            {includes.length > 0 ? (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">Les détails du contenu seront bientôt disponibles.</p>
            )}
          </div>

          {outcomes.length > 0 && (
            <div className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">À quoi ça sert ?</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Des résultats concrets, rapidement.</h2>
              <div className="mt-7 space-y-4">
                {outcomes.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 border-b border-border pb-4 last:border-0">
                    <span className="font-display text-2xl font-bold text-primary/35">{String(index + 1).padStart(2, "0")}</span>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {resource.audience && (
            <div className="rounded-2xl border border-border bg-muted/60 p-6">
              <BookOpenCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Pour qui ?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.audience}</p>
            </div>
          )}
          {requirements.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <MonitorCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Prérequis</h2>
              <ul className="mt-4 space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />{item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resource.license && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <ShieldCheck className="text-primary" size={24} />
              <h2 className="mt-4 font-display text-xl font-bold">Licence simple</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.license}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
