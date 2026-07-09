import { useCallback, useEffect, useState } from "react";

const QUERIES_KEY = "spc:search:queries";
const PAGES_KEY = "spc:search:pages";
const MAX_QUERIES = 8;
const MAX_PAGES = 8;

export type RecentPage = {
  id: string;
  title: string;
  url: string;
  type: string;
  visitedAt: number;
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("spc:history:updated"));
  } catch {
    /* noop */
  }
}

export function useSearchHistory() {
  const [queries, setQueries] = useState<string[]>(() => read(QUERIES_KEY, []));
  const [pages, setPages] = useState<RecentPage[]>(() => read(PAGES_KEY, []));

  useEffect(() => {
    const sync = () => {
      setQueries(read(QUERIES_KEY, []));
      setPages(read(PAGES_KEY, []));
    };
    window.addEventListener("storage", sync);
    window.addEventListener("spc:history:updated", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("spc:history:updated", sync as EventListener);
    };
  }, []);

  const pushQuery = useCallback((q: string) => {
    const t = q.trim();
    if (!t) return;
    const next = [t, ...read<string[]>(QUERIES_KEY, []).filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, MAX_QUERIES);
    write(QUERIES_KEY, next);
  }, []);

  const pushPage = useCallback((p: Omit<RecentPage, "visitedAt">) => {
    const list = read<RecentPage[]>(PAGES_KEY, []).filter((x) => x.id !== p.id);
    const next = [{ ...p, visitedAt: Date.now() }, ...list].slice(0, MAX_PAGES);
    write(PAGES_KEY, next);
  }, []);

  const clearQueries = useCallback(() => write(QUERIES_KEY, []), []);
  const clearPages = useCallback(() => write(PAGES_KEY, []), []);
  const clearAll = useCallback(() => {
    write(QUERIES_KEY, []);
    write(PAGES_KEY, []);
  }, []);

  return { queries, pages, pushQuery, pushPage, clearQueries, clearPages, clearAll };
}