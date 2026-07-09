import { Link } from "@tanstack/react-router";
import { getDisciplineColorClass, getSearchTypeColorClass } from "@/data/categories";
import { TYPE_LABELS, type SearchItem } from "@/lib/search";
import logos from "@/assets/logos.json";

interface SearchResultCardProps {
  item: SearchItem;
  onNavigate: () => void;
}

export function SearchResultCard({ item, onNavigate }: SearchResultCardProps) {
  // Un résultat de type "projet" doit ouvrir directement le lightbox de /projects,
  // exactement comme le fait SearchDialog — il faut donc aussi transmettre
  // search={{ open: projectId }}, sinon le Link atterrit sur /projects sans
  // jamais déclencher l'ouverture du lightbox.
  const isProject = item.type === "project" && !!item.projectId;

  return (
    <Link
      to={item.routePattern as never}
      params={item.params as never}
      search={isProject ? ({ open: item.projectId } as never) : undefined}
      onClick={onNavigate}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-md"
    >
      {item.image ? (
        <div className="aspect-16/10 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="grid aspect-16/10 place-items-center bg-primary/5">
          <img
            src={logos.mc}
            alt={item.title}
            loading="lazy"
            className="h-24 w-24 object-contain opacity-90 transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className={[
              "rounded-full border px-2 py-0.5 font-semibold",
              getSearchTypeColorClass(item.type),
            ].join(" ")}
          >
            {TYPE_LABELS[item.type]}
          </span>
          {item.category && (
            <span
              className={[
                "rounded-full border px-2 py-0.5 font-semibold",
                getDisciplineColorClass(item.category),
              ].join(" ")}
            >
              {item.category}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-base font-semibold group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </Link>
  );
}