import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, BarChart3, Share2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getThemeColor, type APIFormation } from "@/data/formations";
import { ShareModal } from "@/components/modal";
import { buildShareUrl } from "@/lib/share/build-share-url";

interface FormationDetailHeaderProps {
  formation: APIFormation;
}

export function FormationDetailHeader({ formation: f }: FormationDetailHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareUrl = buildShareUrl(`/training/${f.id}`);

  return (
    <section className="border-b border-border bg-muted">
      <div className="container-x py-12 md:py-16">
        <div className="flex items-center justify-between">
          <Link
            to="/training"
            search={{ theme: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={14} /> Toutes les formations
          </Link>

          <button
            onClick={() => setIsShareOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary cursor-pointer"
          >
            <Share2 size={14} /> Partager
          </button>
        </div>

        <Reveal>
          <span className={[
            "mt-6 inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
            getThemeColor(f.theme)
          ].join(" ")}>
            {f.theme}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{f.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{f.short}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border"><Clock size={14} />{f.duration}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border"><BarChart3 size={14} />Niveau {f.level}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground">{f.price.toLocaleString("fr-FR")} FCFA</span>
          </div>
        </Reveal>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        title={f.title}
        text={f.short}
        shortlinkCategory="formation"
      />
    </section>
  );
}
