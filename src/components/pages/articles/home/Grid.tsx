import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { ArticleHomeCard } from "./Card";
import { ArticleHomeSkeleton } from "./Skeleton";
import type { APIArticle } from "@/data/articles";

interface ArticleGridProps {
  isLoading: boolean;
  articles: APIArticle[];
}

export function ArticleHomeGrid({ isLoading, articles }: ArticleGridProps) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`skeleton-${idx}`}>
              <ArticleHomeSkeleton />
            </div>
          ))
        ) : articles.length > 0 ? (
          articles.map((a) => <ArticleHomeCard key={a.slug} article={a} />)
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
              <SearchX size={28} className="text-muted-foreground/60" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">Aucun résultat</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Aucun article ne correspond à votre recherche. Essayez un autre filtre ou mot-clé.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
