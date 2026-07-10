import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { searchItems, categoriesForType, TYPE_LABELS } from "@/lib/search";
import { type SearchType } from "@/data/categories";
import { useSearchHistory } from "@/hooks/use-search-history";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { useGlobalSearchData } from "@/hooks/use-global-search-data";
import { SITE } from "@/data/site";
import { FilterMobileTrigger, FilterMobileSheet } from "@/components/shared";
import {
  SearchHeader,
  SearchBar,
  SearchFilters,
  SearchResultsCount,
  SearchGrid,
  SEARCH_SORT_OPTIONS,
  SEARCH_SORT_DIRECTIONS,
  type SearchSortOption,
  type SearchSortDirection,
} from "@/components/pages/search";

// 1. Schéma de validation dérivé des sources uniques
const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  type: fallback(z.enum(["all", "service", "project", "formation", "article", "faq"]), "all").default("all"),
  category: fallback(z.string(), "Toutes").default("Toutes"),
  sortBy: fallback(z.enum(SEARCH_SORT_OPTIONS), "relevance").default("relevance"),
  sortDir: fallback(z.enum(SEARCH_SORT_DIRECTIONS), "asc").default("asc"),
});

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: `Recherche | ${SITE.name}` },
      { name: "description", content: "Recherchez parmi nos services, réalisations, formations, articles et questions fréquentes." },
      { property: "og:title", content: `Recherche | ${SITE.name}` },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  // 2. Récupération des paramètres typés depuis l'URL
  const { q, type, category, sortBy, sortDir } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [input, setInput] = useState(q);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { pushQuery, pushPage } = useSearchHistory();

  const { services } = useServicesStore({ perPage: 100 });
  const { projects } = useProjectsStore({ perPage: 100 });
  const { formations } = useFormationsStore({ perPage: 100 });
  const { articles } = useArticlesStore({ perPage: 100 });
  const { faqs } = useFaqsStore({ perPage: 100 });

  useEffect(() => setInput(q), [q]);

  // Verrouille le scroll pendant que le tiroir de filtres mobile est ouvert
  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [filtersOpen]);

  const categories = useMemo(
    () => categoriesForType(type, services, projects, formations, articles, faqs),
    [type, services, projects, formations, articles, faqs]
  );

  const matched = useMemo(
    () => searchItems(q, services, projects, formations, articles, faqs, { type, category }),
    [q, services, projects, formations, articles, faqs, type, category]
  );

  // 3. Tri appliqué après le filtrage
  const results = useMemo(() => {
    const list = [...matched];
    const dir = sortDir === "desc" ? -1 : 1;

    switch (sortBy) {
      case "alpha":
        list.sort((a, b) => a.title.localeCompare(b.title) * dir);
        break;
      case "category":
        list.sort((a, b) => (a.category ?? "").localeCompare(b.category ?? "") * dir);
        break;
      case "type":
        list.sort((a, b) => TYPE_LABELS[a.type].localeCompare(TYPE_LABELS[b.type]) * dir);
        break;
      default:
        break;
    }
    return list;
  }, [matched, sortBy, sortDir]);

  useEffect(() => {
    if (q.trim()) pushQuery(q);
  }, [q, pushQuery]);

  // 4. Centralisation de la mise à jour de l'URL
  const updateSearch = (params: Partial<z.infer<typeof searchSchema>>) => {
    navigate({ to: "/search", search: (prev) => ({ ...prev, ...params }) });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({ q: input.trim() });
  };

  const setType = (t: SearchType | "all") => updateSearch({ type: t, category: "Toutes" });
  const setCategory = (c: string) => updateSearch({ category: c });
  const setSortBy = (s: SearchSortOption) => updateSearch({ sortBy: s, sortDir: "asc" });
  const setSortDir = (d: SearchSortDirection) => updateSearch({ sortDir: d });
  const resetFilters = () => updateSearch({ type: "all", category: "Toutes", sortBy: "relevance", sortDir: "asc" });

  const activeFilterCount =
    (type !== "all" ? 1 : 0) + (category !== "Toutes" ? 1 : 0) + (sortBy !== "relevance" ? 1 : 0);

  // Inclut l'état actuel des filtres dans le lien partagé
  const shareUrl = buildShareUrl(
    `/search?${new URLSearchParams({ q, type, category, sortBy, sortDir }).toString()}`
  );

  const filtersPanel = (
    <SearchFilters
      type={type}
      sortBy={sortBy}
      sortDir={sortDir}
      category={category}
      categories={categories}
      activeFilterCount={activeFilterCount}
      onTypeChange={setType}
      onSortChange={setSortBy}
      onSortDirChange={setSortDir}
      onCategoryChange={setCategory}
      onReset={resetFilters}
    />
  );

  return (
    <SiteShell>
      <section className="container-x py-10 md:py-14">
        <SearchHeader shareUrl={shareUrl} query={q} />

        {/* Barre de recherche — visible uniquement sur mobile ici, où il n'y a pas de sidebar persistante */}
        <div className="mt-6 md:hidden">
          <SearchBar value={input} onChange={setInput} onSubmit={submit} />
        </div>

        <FilterMobileTrigger activeFilterCount={activeFilterCount} onOpen={() => setFiltersOpen(true)} />

        <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr] md:items-start lg:grid-cols-[280px_1fr]">
          {/* Sidebar — desktop only */}
          <aside className="hidden space-y-8 md:sticky md:top-24 md:block">
            <SearchBar value={input} onChange={setInput} onSubmit={submit} />
            {filtersPanel}
          </aside>

          {/* Résultats */}
          <div>
            <SearchResultsCount query={q} type={type} category={category} count={results.length} />
            <SearchGrid
              items={results}
              onNavigate={(item) => pushPage({ id: item.id, title: item.title, url: item.url, type: item.type })}
            />
          </div>
        </div>
      </section>

      {/* Tiroir de filtres mobile — pas de recherche ici, déjà visible en haut de page */}
      <SearchMobileSheet isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} resultCount={results.length}>
        {filtersPanel}
      </SearchMobileSheet>
    </SiteShell>
  );
}