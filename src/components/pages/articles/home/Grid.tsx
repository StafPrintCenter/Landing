import { AnimatePresence } from "framer-motion";
import { ArticleHomeCard } from "./Card";
import { ArticleHomeSkeleton } from "./Skeleton";
import type { APIArticle } from "@/data/articles";
import { EmptyState } from "@/components/shared/EmptyState";

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
          <EmptyState description="Aucun article ne correspond aux critères sélectionnés. Essayez un autre filtre." />
        )}
      </AnimatePresence>
    </div>
  );
}
