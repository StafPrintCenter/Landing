import { useMemo } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServicesStore } from "@/stores/useServicesStore";
import type { ReportableType } from "@/data/reports";

export interface ReportPrefill {
  reportableType: ReportableType | null;
  reportableId: string;
  /** true si l'identifiant n'a pas pu être détecté automatiquement sur cette page */
  idUnresolved: boolean;
}

/**
 * Détecte si l'utilisateur se trouve sur une page "enfant" (service, formation,
 * réalisation ouverte en lightbox, article) et pré-remplit le type + l'identifiant
 * de la ressource correspondante pour le formulaire de signalement.
 */
export function useReportPrefill(): ReportPrefill {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search as Record<string, unknown>;

  const serviceSlugMatch = pathname.match(/^\/services\/([^/]+)\/?$/);
  const trainingIdMatch = pathname.match(/^\/training\/([^/]+)\/?$/);
  const articleSlugMatch = pathname.match(/^\/articles\/([^/]+)\/?$/);
  const isProjectsPage = pathname === "/projects" || pathname === "/projects/";
  const openProjectId = isProjectsPage && typeof search.open === "string" ? search.open : null;

  // Store déjà utilisé/caché ailleurs sur le site (même clé de requête) —
  // l'appeler ici est quasi gratuit dans la majorité des cas.
  const { services } = useServicesStore({ perPage: 100 });

  return useMemo<ReportPrefill>(() => {
    if (serviceSlugMatch) {
      const service = services.find((s) => s.slug === serviceSlugMatch[1]);
      return { reportableType: "service", reportableId: service?.id ?? "", idUnresolved: !service };
    }

    if (trainingIdMatch) {
      return { reportableType: "training", reportableId: trainingIdMatch[1], idUnresolved: false };
    }

    if (articleSlugMatch) {
      // ⚠️ L'API publique des articles n'expose qu'un slug, pas d'UUID —
      // impossible de pré-remplir automatiquement cet identifiant pour le moment.
      return { reportableType: "article", reportableId: "", idUnresolved: true };
    }

    if (openProjectId) {
      return { reportableType: "project", reportableId: openProjectId, idUnresolved: false };
    }

    return { reportableType: null, reportableId: "", idUnresolved: false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, JSON.stringify(search), services]);
}