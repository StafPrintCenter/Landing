import { useState } from "react";
import { Link2, Check } from "lucide-react";
import type { LegalSection } from "./types";
import { buildShareUrl } from "@/lib/share/build-share-url";

interface LegalSectionCardProps {
  section: LegalSection;
  setRef: (el: HTMLElement | null) => void;
}

export function LegalSectionCard({ section, setRef }: LegalSectionCardProps) {
  const Icon = section.icon;
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Génère l'URL absolue actuelle avec le hash de la section
    const sectionUrl = buildShareUrl(`${window.location.pathname}#${section.id}`);
    
    // Met à jour l'URL du navigateur de façon visible pour l'utilisateur
    window.history.pushState(null, "", `#${section.id}`);
    
    // Copie dans le presse-papiers
    navigator.clipboard.writeText(sectionUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <article
      id={section.id}
      ref={setRef}
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 transition-colors md:p-8 group relative"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {section.number}
            </span>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>

            {/* Bouton de partage optimisé Mobile & Desktop */}
            <button
              onClick={handleCopyLink}
              title="Partager cette section"
              className={[
                "inline-flex items-center justify-center gap-1 rounded-md transition-all cursor-pointer",
                // Mobile : toujours visible, format compact (carré) pour le tactile
                "opacity-100 p-1.5 bg-muted/40 text-muted-foreground",
                // Desktop : masqué par défaut, apparaît au survol ou focus, format étendu
                "md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100 md:px-2 md:py-0.5 md:text-xs",
                copied
                  ? "bg-primary text-primary-foreground md:bg-primary md:text-primary-foreground"
                  : "hover:bg-primary/10 hover:text-primary md:bg-muted/60",
              ].join(" ")}
            >
              {copied ? (
                <>
                  <Check size={14} className="md:size-3" />
                  <span className="font-medium text-xs hidden md:inline">Copié !</span>
                </>
              ) : (
                <>
                  <Link2 size={14} className="md:size-3" />
                  <span className="hidden md:inline">Partager</span>
                </>
              )}
            </button>
          </div>
          
          <div className="prose-article mt-3 text-sm leading-relaxed text-foreground/80">
            {section.content}
          </div>
        </div>
      </div>
    </article>
  );
}