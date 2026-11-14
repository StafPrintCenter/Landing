import { EmptyState } from "@/components/shared/EmptyState";
import type { APIResource } from "@/data/resources";
import { ResourceHomeCard } from "./Card";
import { ResourceHomeSkeleton } from "./Skeleton";

interface ResourceGridProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  resources: APIResource[];
  onRetry: () => void;
}

export function ResourceHomeGrid({ isLoading, isError, error, resources, onRetry }: ResourceGridProps) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading ? (
        Array.from({ length: 6 }, (_, index) => <ResourceHomeSkeleton key={`skeleton-${index}`} />)
      ) : isError ? (
        <div className="col-span-full rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold text-destructive">Impossible de charger les ressources.</p>
          {error?.message && <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>}
          <button type="button" onClick={onRetry} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
            Réessayer
          </button>
        </div>
      ) : resources.length ? (
        resources.map((resource) => <ResourceHomeCard key={resource.slug} resource={resource} />)
      ) : (
        <EmptyState description="Aucune ressource ne correspond aux critères sélectionnés. Essayez un autre filtre." />
      )}
    </div>
  );
}
