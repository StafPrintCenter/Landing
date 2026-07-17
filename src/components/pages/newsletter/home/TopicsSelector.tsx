import { useCategoriesStore } from "@/stores/useCategoriesStore";

interface TopicsSelectorProps {
  selected: string[];
  onToggle: (categoryId: string) => void;
}

export function TopicsSelector({ selected, onToggle }: TopicsSelectorProps) {
  const { categories, isLoading } = useCategoriesStore({ context: "newsletter", perPage: 20 });

  return (
    <div>
      <div className="mb-2 block text-sm font-medium">Sujets qui vous intéressent</div>

      {isLoading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-7 w-20 animate-pulse rounded-full bg-muted" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = selected.includes(c.id);
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => onToggle(c.id)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${on ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                  }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}