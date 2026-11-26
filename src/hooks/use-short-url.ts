import { useQuery } from "@tanstack/react-query";
import { createShortlink } from "@/stores/useShortlinksStore";
import type { ShortlinkCategory } from "@/data/shortlinks";

interface UseShortUrlResult {
  displayUrl: string;
  alias: string | null;
  isLoading: boolean;
  isReady: boolean;
  hasError: boolean;
}

/**
 * Fournit un lien court pour une URL longue
 */
export function useShortUrl(
  longUrl: string,
  category?: ShortlinkCategory,
  enabled = true,
  turnstileToken: string | null = null,
  onTokenUsed?: () => void,
): UseShortUrlResult {
  const query = useQuery({
    queryKey: ["shortlink", "create", longUrl, category],
    queryFn: async () => {
      if (!turnstileToken) throw new Error("Turnstile token is required.");
      try {
        return await createShortlink(longUrl, turnstileToken, category);
      } finally {
        onTokenUsed?.();
      }
    },
    enabled: enabled && !!longUrl && !!turnstileToken,
    staleTime: 1000 * 60 * 30,
    retry: false,
  });

  return {
    displayUrl: query.data?.shortUrl ?? longUrl,
    alias: query.data?.alias ?? null,
    isLoading: query.isLoading,
    isReady: !!query.data,
    hasError: query.isError,
  };
}
