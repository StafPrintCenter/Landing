import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Clock, History, Trash2, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchItems, TYPE_LABELS, type SearchItem } from "@/lib/search";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useServicesStore, useProjectsStore, useFormationsStore, useArticlesStore, useFaqsStore } from "@/stores";
import logos from "@/assets/logos.json";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function SearchDialog({ open, onOpenChange }: Props) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { queries, pages, pushPage, pushQuery, clearAll } = useSearchHistory();
  const { services } = useServicesStore({ perPage: 100 });
  const { projects } = useProjectsStore({ perPage: 100 });
  const { formations } = useFormationsStore({ perPage: 100 });
  const { articles } = useArticlesStore({ perPage: 100 });
  const { faqs } = useFaqsStore({ perPage: 100 });

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  const results = useMemo(
    () => searchItems(q, services, projects, formations, articles, faqs, { limit: 8 }),
    [q, services, projects, formations, articles, faqs]
  );

  const goToItem = (item: SearchItem) => {
    pushPage({ id: item.id, title: item.title, url: item.url, type: item.type });
    if (q.trim()) pushQuery(q);
    onOpenChange(false);

    if (item.type === "project" && item.projectId) {
      navigate({
        to: "/projects",
        search: { open: item.projectId } as never,
      });
    } else if (item.type === "faq" && item.faqId) {
      navigate({
        to: "/faqs",
        search: { open: item.faqId } as never,
      });
    } else {
      navigate({ to: item.routePattern as never, params: item.params as never });
    }
  };

  const goToSearchPage = (query?: string) => {
    const t = (query ?? q).trim();
    if (t) pushQuery(t);
    onOpenChange(false);
    navigate({ to: "/search", search: { q: t, type: "all", category: "Toutes" } as never });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && q.trim()) goToItem(results[0]);
      else goToSearchPage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* [&>button]:hidden supprime la croix de fermeture générée par défaut par Shadcn UI */}
      <DialogContent className="top-[10%] max-w-2xl translate-y-0 gap-0 p-0 overflow-hidden [&>button]:hidden">
        <DialogTitle className="sr-only">Rechercher sur le site</DialogTitle>
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Rechercher services, réalisations, formations, articles, FAQ…"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />

          {/* Bouton unique contextuel */}
          {q ? (
            <button
              onClick={() => { setQ(""); inputRef.current?.focus(); }}
              aria-label="Effacer la recherche"
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          ) : (
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Fermer le modal"
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {q.trim() === "" ? (
            <div className="p-4">
              {queries.length === 0 && pages.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  Cherchez un service, un projet, une formation, un article ou une question fréquente.
                </p>
              ) : (
                <>
                  {queries.length > 0 && (
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><History size={12} /> Recherches récentes</span>
                      </div>
                      <div className="flex flex-wrap gap-2 px-2">
                        {queries.map((query) => (
                          <button key={query} onClick={() => goToSearchPage(query)} className="rounded-full border border-border bg-muted/40 px-3 py-1 text-sm hover:bg-muted">
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {pages.length > 0 && (
                    <div>
                      <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock size={12} /> Pages consultées</span>
                      </div>
                      <ul className="space-y-1">
                        {pages.map((p) => (
                          <li key={p.id}>
                            <button
                              onClick={() => {
                                onOpenChange(false);
                                if (p.type === "project") {
                                  const projectId = p.id.replace(/^project-/, "");
                                  navigate({ to: "/projects", search: { open: projectId } as never });
                                } else {
                                  navigate({ to: p.url as never });
                                }
                              }}
                              className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                            >
                              <span className="truncate">{p.title}</span>
                              <span className="shrink-0 text-xs text-muted-foreground">{TYPE_LABELS[p.type as keyof typeof TYPE_LABELS] ?? p.type}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(queries.length > 0 || pages.length > 0) && (
                    <div className="mt-3 flex justify-end px-2">
                      <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                        <Trash2 size={12} /> Effacer l'historique
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Aucun résultat pour « {q} ».</p>
          ) : (
            <ul className="p-2">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => goToItem(item)}
                    className="flex w-full items-start gap-3 rounded-md p-3 text-left hover:bg-muted"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-12 w-12 shrink-0 rounded object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded bg-primary/5">
                        <img
                          src={logos.mc}
                          alt={item.title}
                          className="h-8 w-8 object-contain opacity-90"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-medium text-foreground">{item.title}</span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{TYPE_LABELS[item.type]}</span>
                        {item.category && <span>{item.category}</span>}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-xs text-muted-foreground">{item.description}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {q.trim() !== "" && (
          <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-xs">
            <span className="text-muted-foreground">Entrée pour ouvrir le premier résultat</span>
            <button onClick={() => goToSearchPage()} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
              Voir tous les résultats <ArrowRight size={12} />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SearchTrigger({ onOpen, className }: { onOpen: () => void; className?: string }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Rechercher"
      className={className ?? "inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-muted hover:text-primary"}
    >
      <Search size={18} />
    </button>
  );
}
