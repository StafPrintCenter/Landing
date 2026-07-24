import { CheckCircle2, Users, Award, BookOpen, Calendar } from "lucide-react";
import { type APIFormation } from "@/data/trainings";
import { SITE } from "@/data/site";

interface FormationDetailProgramProps {
  formation: APIFormation;
}

export function FormationDetailProgram({ formation: f }: FormationDetailProgramProps) {
  const program: { title: string; items: string[] }[] = f.program ?? [
    { title: "Fondamentaux", items: f.objectives.slice(0, 2) },
    { title: "Pratique guidée", items: f.objectives.slice(2) },
    { title: "Projet final", items: ["Réalisation encadrée", "Présentation et feedback"] },
  ];

  return (
    <div className="md:col-span-2 space-y-10">
      <div>
        <h2 className="font-display text-2xl font-bold">Programme détaillé</h2>
        <div className="mt-6 space-y-4">
          {program.map((mod, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">
                <span className="text-primary mr-2">{String(i + 1).padStart(2, "0")}.</span>{mod.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {mod.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold">Objectifs pédagogiques</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {f.objectives.map((o) => (
            <li key={o} className="flex gap-2 rounded-xl border border-border bg-card p-3 text-sm">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />{o}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <Users size={20} className="text-primary" />
          <h3 className="mt-3 font-display font-semibold">Public visé</h3>
          <p className="mt-2 text-sm text-muted-foreground">{f.audience ?? "Étudiants, freelances et professionals souhaitant monter en compétence rapidement."}</p>
        </div>

        {f.prerequisites && f.prerequisites.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <BookOpen size={20} className="text-primary" />
            <h3 className="mt-3 font-display font-semibold">Prérequis</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {f.prerequisites.map((p) => (
                <li key={p} className="flex gap-1.5 items-start">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {f.schedule && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <Calendar size={20} className="text-primary" />
            <h3 className="mt-3 font-display font-semibold">Horaires</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.schedule}</p>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-6">
          <Award size={20} className="text-primary" />
          <h3 className="mt-3 font-display font-semibold">Certification</h3>
          <p className="mt-2 text-sm text-muted-foreground">{f.certification ?? `Attestation officielle ${SITE.name} remise en fin de parcours.`}</p>
        </div>
      </div>
    </div>
  );
}
