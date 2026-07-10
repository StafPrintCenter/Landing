import { type APIService } from "@/data/services";
import { type APIProject } from "@/data/projects";
import { type APIFormation } from "@/data/formations";
import { type APIArticle } from "@/data/articles";
import { type APIFaq } from "@/data/faqs";
import { type SearchType, SEARCH_TYPE_LABELS } from "@/data/categories";

export type { SearchType };
export const TYPE_LABELS = SEARCH_TYPE_LABELS;

export type SearchItem = {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  category?: string;
  image?: string;
  url: string;
  params?: Record<string, string>;
  routePattern: "/projects" | "/training" | "/training/$id" | "/articles/$slug" | "/services/$slug" | "/faqs";
  keywords: string;
  projectId?: string;
  faqId?: string;
};

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Génère l'index de recherche dynamiquement en injectant les services,
 * projets, formations, articles et FAQ récupérés de l'API
 */
function buildSearchIndex(
  apiServices: APIService[],
  apiProjects: APIProject[],
  apiFormations: APIFormation[],
  apiArticles: APIArticle[],
  apiFaqs: APIFaq[]
): SearchItem[] {
  const services = Array.isArray(apiServices) ? apiServices : [];
  const projects = Array.isArray(apiProjects) ? apiProjects : [];
  const formations = Array.isArray(apiFormations) ? apiFormations : [];
  const articles = Array.isArray(apiArticles) ? apiArticles : [];
  const faqs = Array.isArray(apiFaqs) ? apiFaqs : [];

  return [
    ...services.map<SearchItem>((s) => ({
      id: `service-${s.slug}`,
      type: "service",
      title: s.title,
      description: s.short,
      category: "Service",
      url: `/services/${s.slug}`,
      params: { slug: s.slug },
      routePattern: "/services/$slug",
      keywords: norm(`${s.title} ${s.short} ${s.long}`),
    })),
    ...projects.map<SearchItem>((p) => ({
      id: `project-${p.id}`,
      type: "project",
      title: p.title,
      description: p.description,
      category: p.category,
      image: p.cover,
      url: `/projects?open=${p.id}`,
      routePattern: "/projects",
      keywords: norm(`${p.title} ${p.description} ${p.client} ${p.category}`),
      projectId: p.id,
    })),
    ...formations.map<SearchItem>((f) => ({
      id: `formation-${f.id}`,
      type: "formation",
      title: f.title,
      description: f.short,
      category: f.theme,
      url: `/training/${f.id}`,
      params: { id: f.id },
      routePattern: "/training/$id",
      keywords: norm(`${f.title} ${f.short} ${f.theme} ${f.level} ${f.objectives.join(" ")}`),
    })),
    ...articles.map<SearchItem>((a) => ({
      id: `article-${a.slug}`,
      type: "article",
      title: a.title,
      description: a.excerpt,
      category: a.category,
      image: a.cover,
      url: `/articles/${a.slug}`,
      params: { slug: a.slug },
      routePattern: "/articles/$slug",
      keywords: norm(`${a.title} ${a.excerpt} ${a.category}`),
    })),
    ...faqs.map<SearchItem>((f) => ({
      id: `faq-${f.id}`,
      type: "faq",
      title: f.question,
      description: f.answer,
      category: f.category,
      url: `/faqs?open=${f.id}`,
      routePattern: "/faqs",
      keywords: norm(`${f.question} ${f.answer} ${f.category}`),
      faqId: f.id,
    })),
  ];
}

export function searchItems(
  query: string,
  apiServices: APIService[],
  apiProjects: APIProject[],
  apiFormations: APIFormation[],
  apiArticles: APIArticle[],
  apiFaqs: APIFaq[],
  opts?: { type?: SearchType | "all"; category?: string; limit?: number }
): SearchItem[] {
  const q = norm(query.trim());
  const type = opts?.type ?? "all";
  const category = opts?.category;
  const limit = opts?.limit;

  let items = buildSearchIndex(apiServices, apiProjects, apiFormations, apiArticles, apiFaqs);

  if (type !== "all") items = items.filter((i) => i.type === type);
  if (category && category !== "Toutes")
    items = items.filter((i) => i.category === category);

  if (!q) return limit ? items.slice(0, limit) : items;

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = items
    .map((i) => {
      let score = 0;
      for (const t of tokens) {
        if (norm(i.title).includes(t)) score += 5;
        if (i.keywords.includes(t)) score += 2;
      }
      return { i, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.i);

  return limit ? scored.slice(0, limit) : scored;
}

/**
 * Récupère les catégories disponibles pour un type donné
 */
export function categoriesForType(
  type: SearchType | "all",
  apiServices: APIService[],
  apiProjects: APIProject[],
  apiFormations: APIFormation[],
  apiArticles: APIArticle[],
  apiFaqs: APIFaq[]
): string[] {
  const set = new Set<string>();
  const items = buildSearchIndex(apiServices, apiProjects, apiFormations, apiArticles, apiFaqs);

  for (const i of items) {
    if (type !== "all" && i.type !== type) continue;
    if (i.category) set.add(i.category);
  }
  return ["Toutes", ...Array.from(set).sort()];
}
