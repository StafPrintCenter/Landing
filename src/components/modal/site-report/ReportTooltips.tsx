import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";

interface BaseTooltipProps {
  label: string; // Ce titre sera maintenant bien visible dans la bulle !
  text: string;
}

function TooltipPortal({ label, text }: BaseTooltipProps) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ top: rect.top - 8, left: rect.left + rect.width / 2 });
  };

  const handleShow = () => {
    updatePosition();
    setShow(true);
  };

  return (
    <span className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={handleShow}
        onMouseLeave={() => setShow(false)}
        onFocus={handleShow}
        onBlur={() => setShow(false)}
        aria-label={label} // Conservé pour l'accessibilité
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-primary cursor-help"
      >
        <Info size={14} />
      </button>

      {show && coords && typeof document !== "undefined" &&
        createPortal(
          <span
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            className="fixed z-200 w-64 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-card p-2.5 text-[11px] leading-relaxed text-muted-foreground shadow-lg"
          >
            {/* 🎯 On affiche le label en gras au début de la bulle */}
            <strong className="block mb-1 text-foreground font-semibold">
              {label}
            </strong>
            {text}
          </span>,
          document.body
        )}
    </span>
  );
}

export function IdTooltip() {
  return (
    <TooltipPortal
      label="Identifiant de ressource"
      text="Cet identifiant est rempli automatiquement lorsque vous ouvrez ce formulaire depuis la page précise du service, de la formation, de l'article ou de la réalisation concernée. Si ce n'est pas le cas, ouvrez d'abord cette page, puis revenez signaler le problème — le champ se remplira alors tout seul."
    />
  );
}

export function EmailTooltip() {
  return (
    <TooltipPortal
      label="Pourquoi renseigner votre email ?"
      text="Votre adresse nous permettra de vous recontacter si des précisions supplémentaires sont nécessaires pour isoler le bug, ou pour vous informer dès que le problème est résolu."
    />
  );
}