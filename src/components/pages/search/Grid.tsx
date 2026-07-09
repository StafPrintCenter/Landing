import { SearchX } from "lucide-react";
import { SearchResultCard } from "./Card";
import type { SearchItem } from "@/lib/search";

interface SearchGridProps {
  items: SearchItem[];
  onNavigate: (item: SearchItem) => void;
}

export function SearchGrid({ items, onNavigate }: SearchGridProps) {
  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
          <SearchX size={28} className="text-muted-foreground/60" />
        </div>
        <p className="max-w-xs text-muted-foreground">
          Aucun résultat. Essayez d'autres mots-clés ou changez le filtre.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <SearchResultCard key={item.id} item={item} onNavigate={() => onNavigate(item)} />
      ))}
    </div>
  );
}