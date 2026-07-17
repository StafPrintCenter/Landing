import { useCategoriesStore } from "@/stores/useCategoriesStore";

interface CategoryCheckboxListProps {
  selected: string[];
  onToggle: (categoryId: string) => void;
}

export function CategoryCheckboxList({ selected, onToggle }: CategoryCheckboxListProps) {
  const { categories, isLoading } = useCategoriesStore({ context: "newsletter", perPage: 20 });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-10 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((c) => {
        const checked = selected.includes(c.id);
        return (
          <label
            key={c.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm transition hover:bg-muted/50"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(c.id)}
              className="cursor-pointer"
            />
            <span className="font-medium">{c.name}</span>
          </label>
        );
      })}
    </div>
  );
}