import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resolveShortlink, createShortlink } from "@/stores/useShortlinksStore";

/**
 * Fournit un lien court pour une URL longue donnée.
 * 1. Tente `resolve` (GET, mis en cache par React Query) pour voir si un lien existe déjà.
 * 2. Si aucun lien n'existe, appelle `create` en repli.
 * Retombe silencieusement sur l'URL longue tant que le lien court n'est pas prêt
 * ou si l'API shortlink échoue — ne bloque jamais le partage.
 */
export function useShortUrl(longUrl: string, category: string, enabled: boolean = true) {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const resolveQuery = useQuery({
    queryKey: ["shortlink", "resolve", longUrl],
    queryFn: () => resolveShortlink(longUrl),
    enabled: enabled && !!longUrl,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!enabled || !longUrl) return;

    // Lien déjà résolu : on l'utilise directement
    if (resolveQuery.data) {
      setShortUrl(resolveQuery.data.shortUrl);
      return;
    }

    // Résolution terminée mais rien trouvé → on crée le lien court
    if (resolveQuery.isSuccess && resolveQuery.data === null) {
      let cancelled = false;
      createShortlink(longUrl, category)
        .then((created) => {
          if (!cancelled) setShortUrl(created.shortUrl);
        })
        .catch(() => {
          // Échec silencieux : le lien long reste affiché en repli
        });
      return () => {
        cancelled = true;
      };
    }
  }, [resolveQuery.data, resolveQuery.isSuccess, longUrl, category, enabled]);

  return {
    /** Lien court si disponible, sinon repli sur l'URL longue d'origine */
    shortUrl: shortUrl ?? longUrl,
    isReady: !!shortUrl,
  };
}