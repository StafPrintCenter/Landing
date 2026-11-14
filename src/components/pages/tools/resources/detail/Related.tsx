import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatResourcePrice, getResourceIcon, type APIResource } from "@/data/resources";
import { useResourcesStore } from "@/stores/useResourcesStore";

export function ResourceDetailRelated({ resource }: { resource: APIResource }) {
  const { resources, isError } = useResourcesStore({ category: resource.category });
  const related = resources.filter((item) => item.slug !== resource.slug).slice(0, 2);

  if (isError) {
    return (
      <section className="border-t border-border bg-muted/50">
        <div className="container-x py-10 text-sm text-muted-foreground">
          Les ressources similaires ne sont pas disponibles pour le moment.
        </div>
      </section>
    );
  }
  if (!related.length) return null;

  return (
    <section className="border-t border-border bg-muted/50">
      <div className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Dans la même catégorie</p>
            <h2 className="mt-2 font-display text-3xl font-bold">À explorer aussi.</h2>
          </div>
          <Link to="/tools/ressources" className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Toute la bibliothèque <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {related.map((item) => {
            const Icon = getResourceIcon(item);
            return (
              <Link
                key={item.slug}
                to="/tools/ressources/$slug"
                params={{ slug: item.slug }}
                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={22} /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">{item.format}<span>·</span>{formatResourcePrice(item.price)}</span>
                  <span className="mt-2 block font-display text-lg font-semibold group-hover:text-primary">{item.title}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{item.short}</span>
                </span>
                <ArrowRight size={18} className="mt-1 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
