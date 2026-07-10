import { SearchX, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
  animated?: boolean;
}

export function EmptyState({
  title = "Aucun résultat",
  description,
  icon: Icon = SearchX,
  className = "col-span-full",
  animated = true,
}: EmptyStateProps) {
  const inner = (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
        <Icon size={28} className="text-muted-foreground/60" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-foreground">{title}</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  if (!animated) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      {inner}
    </motion.div>
  );
}