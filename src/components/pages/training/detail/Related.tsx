import { Link } from "@tanstack/react-router";
import { type APIFormation } from "@/data/formations";

interface FormationRelatedProps {
  related: APIFormation[];
}

export function FormationDetailRelated({ related }: FormationRelatedProps) {
  if (related.length === 0) return null;

  return (
    <section className="bg-muted">
      <div className="container-x py-16">
        <h2 className="font-display text-2xl font-bold">Formations similaires</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {related.map((r) => (
            <Link
              key={r.id}
              to="/training/$id"
              params={{ id: r.id }}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary"
            >
              <span className="text-xs font-semibold text-secondary">{r.theme}</span>
              <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-primary">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
