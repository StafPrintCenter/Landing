import { getResourceIcon, type APIResource } from "@/data/resources";

interface InvoiceResourceDetailsProps {
  resource: APIResource | null;
  error: string | null;
  isLoading: boolean;
}

export function InvoiceResourceDetails({ resource, error, isLoading }: InvoiceResourceDetailsProps) {
  if (error) {
    return <p role="status" className="mt-2 text-sm text-muted-foreground">{error}</p>;
  }

  if (isLoading) {
    return <p className="mt-2 text-sm text-muted-foreground">Chargement des informations de la ressource…</p>;
  }

  if (!resource) return null;
  const Icon = getResourceIcon(resource);

  return (
    <div className="mt-3 flex items-start gap-4">
      {resource.cover ? (
        <img src={resource.cover} alt="" className="h-20 w-28 shrink-0 rounded-lg object-cover" />
      ) : (
        <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon size={28} />
        </div>
      )}
      <div>
        <p className="font-semibold">{resource.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{resource.category} · {resource.format}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.short}</p>
      </div>
    </div>
  );
}
