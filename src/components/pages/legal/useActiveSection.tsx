import { useEffect, useRef, useState } from "react";
import type { LegalSection } from "./types";

/**
 * Observe les sections à l'écran pour surligner l'entrée active du sommaire,
 */
export function useActiveSection(sections: LegalSection[]) {
  const [activeId, setActiveId] = useState<string | undefined>(sections[0]?.id);
  const refs = useRef<Record<string, HTMLElement | null>>({});
  
  const isProgrammaticScroll = useRef(false);

  // Défilement fluide vers une section ciblée
  const scrollTo = (id: string) => {
    const el = refs.current[id];
    if (!el) return;

    isProgrammaticScroll.current = true;
    setActiveId(id);

    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });

    // On libère l'observer une fois le défilement fluide stabilisé
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  // Mise à jour purement VISUELLE du sommaire lors du défilement naturel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = refs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Traitement UNIQUE du deep-linking (Ancre présente au chargement initial de la page)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const hasTarget = sections.some((s) => s.id === hash);
    if (!hasTarget) return;

    isProgrammaticScroll.current = true;
    
    // Attente que le layout et les dimensions du DOM soient stabilisés
    const timer = setTimeout(() => {
      scrollTo(hash);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return { activeId, activeIndex, scrollTo, setRef };
}