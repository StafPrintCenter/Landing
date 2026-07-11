import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resolveShortlink, createShortlink } from "@/stores/useShortlinksStore";
import type { ShortlinkCategory } from "@/data/shortlinks";

interface UseShortUrlResult {
  /** Lien court si disponible, sinon l'URL longue d'origine en repli */
  displayUrl: string;
  /** true tant que la résolution/création est en cours */
  isLoading: boolean;
  /** true une fois le lien court effectivement obtenu */
  isReady: boolean;
  /** true si la résolution ou la création a échoué (on reste alors sur l'URL longue) */
  hasError: boolean;
}

/**
 * Fournit un lien court pour une URL longue donnée.
 * 1. Tente `resolve` (GET, mis en cache par React Query) pour voir si un lien existe déjà.
 * 2. Si aucun lien n'existe, appelle `create` en repli — `category` est optionnel,
 *    le backend la définit à "other" si absente.
 * Ne bloque jamais l'affichage : en cas d'échec, retombe silencieusement sur l'URL longue.
 */
export function useShortUrl(longUrl: string, category?: ShortlinkCategory): UseShortUrlResult {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resolveQuery = useQuery({
    queryKey: ["shortlink", "resolve", longUrl],
    queryFn: () => resolveShortlink(longUrl),
    enabled: !!longUrl,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  // Reset propre si l'URL longue change (ex. modal réutilisé pour un autre contenu)
  useEffect(() => {
    setShortUrl(null);
    setHasError(false);
  }, [longUrl]);

  useEffect(() => {
    if (!longUrl) return;

    if (resolveQuery.data) {
      setShortUrl(resolveQuery.data.shortUrl);
      return;
    }

    if (resolveQuery.isSuccess && resolveQuery.data === null) {
      let cancelled = false;
      setIsCreating(true);
      createShortlink(longUrl, category)
        .then((created) => {
          if (!cancelled) setShortUrl(created.shortUrl);
        })
        .catch(() => {
          if (!cancelled) setHasError(true);
        })
        .finally(() => {
          if (!cancelled) setIsCreating(false);
        });
      return () => {
        cancelled = true;
      };
    }

    if (resolveQuery.isError) {
      setHasError(true);
    }
  }, [resolveQuery.data, resolveQuery.isSuccess, resolveQuery.isError, longUrl, category]);

  const isLoading = (resolveQuery.isLoading || isCreating) && !shortUrl && !hasError;

  return {
    displayUrl: shortUrl ?? longUrl,
    isLoading,
    isReady: !!shortUrl,
    hasError,
  };
}