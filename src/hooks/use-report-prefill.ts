import { useMemo } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServicesStore, useArticlesStore } from "@/stores";
import type { ReportableType } from "@/data/reports";

export interface ReportPrefill {
  reportableType: ReportableType | null;
  /** Identifiant détecté automatiquement — vide si non disponible sur cette page */
  reportableId: string;
  /** true si le type est connu mais qu'aucun identifiant précis n'a pu être détecté (page listing) */
  onListingPage: boolean;
}

/**
 * Détecte le contexte de la page courante pour pré-remplir le formulaire de signalement :
 * - Pages de détail (/services/$slug, /training/$id, /articles/$slug, /projects?open=id)
 *   → type + identifiant précis.
 * - Pages listing (/services, /training, /articles, /projects sans ?open=)
 *   → type seul, l'identifiant reste à saisir manuellement.
 */
export function useReportPrefill(): ReportPrefill {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search as Record<string, unknown>;

  const isServicesIndex = pathname === "/services" || pathname === "/services/";
  const serviceSlugMatch = pathname.match(/^\/services\/([^/]+)\/?$/);

  const isTrainingIndex = pathname === "/training" || pathname === "/training/";
  const trainingIdMatch = pathname.match(/^\/training\/([^/]+)\/?$/);

  const isArticlesIndex = pathname === "/articles" || pathname === "/articles/";
  const articleSlugMatch = pathname.match(/^\/articles\/([^/]+)\/?$/);

  const isProjectsPage = pathname === "/projects" || pathname === "/projects/";
  const openProjectId = isProjectsPage && typeof search.open === "string" ? search.open : null;

  const { services } = useServicesStore({ perPage: 100 });
  const { articles } = useArticlesStore({ perPage: 100 });

  return useMemo<ReportPrefill>(() => {
    if (serviceSlugMatch) {
      const service = services.find((s) => s.slug === serviceSlugMatch[1]);
      return { reportableType: "service", reportableId: service?.id ?? "", onListingPage: false };
    }
    if (isServicesIndex) {
      return { reportableType: "service", reportableId: "", onListingPage: true };
    }

    if (trainingIdMatch) {
      return { reportableType: "training", reportableId: trainingIdMatch[1], onListingPage: false };
    }
    if (isTrainingIndex) {
      return { reportableType: "training", reportableId: "", onListingPage: true };
    }

    if (articleSlugMatch) {
      const article = articles.find((a) => a.slug === articleSlugMatch[1]);
      return { reportableType: "article", reportableId: article?.id ?? "", onListingPage: false };
    }
    if (isArticlesIndex) {
      return { reportableType: "article", reportableId: "", onListingPage: true };
    }

    if (openProjectId) {
      return { reportableType: "project", reportableId: openProjectId, onListingPage: false };
    }
    if (isProjectsPage) {
      return { reportableType: "project", reportableId: "", onListingPage: true };
    }

    return { reportableType: null, reportableId: "", onListingPage: false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, JSON.stringify(search), services, articles]);
}