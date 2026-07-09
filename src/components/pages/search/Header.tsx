import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/modal";

interface SearchHeaderProps {
  shareUrl: string;
  query?: string;
}

export function SearchHeader({ shareUrl, query }: SearchHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareTitle = query?.trim() ? `Recherche : « ${query.trim()} »` : "Recherche";

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">Recherche</h1>
          <p className="mt-2 text-muted-foreground">
            Services, réalisations, formations et articles.
          </p>
        </div>

        <button
          onClick={() => setIsShareOpen(true)}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Share2 size={14} /> Partager
        </button>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={shareTitle}
        text="Services, réalisations, formations et articles."
      />
    </div>
  );
}