import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";
import { getArticleCategoryColor, formatArticleDate, type APIArticle } from "@/data/articles";

interface ArticleCardProps {
  article: APIArticle;
}

export function ArticleHomeCard({ article: a }: ArticleCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
    >
      <Link to="/articles/$slug" params={{ slug: a.slug }} className="block flex-1 flex flex-col">
        {/* Cover */}
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={a.cover}
            alt={a.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Category badge */}
          <span
            className={[
              "w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
              getArticleCategoryColor(a.category),
            ].join(" ")}
          >
            {a.category}
          </span>

          {/* Title */}
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
            {a.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground flex-1">{a.excerpt}</p>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/40 pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User size={12} />
              {a.author}
            </span>
            <span>{formatArticleDate(a.date)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {a.readMinutes} min
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
