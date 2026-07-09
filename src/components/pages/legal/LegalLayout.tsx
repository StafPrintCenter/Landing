import type { LucideIcon } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { LegalHero } from "./Hero";
import { LegalSummaryMobile } from "./SummaryMobile";
import { LegalSummaryDesktop } from "./SummaryDesktop";
import { LegalSectionCard } from "./SectionCard";
import { LegalContactCard } from "./ContactCard";
import { useActiveSection } from "./useActiveSection";
import type { LegalSection } from "./types";

interface LegalLayoutProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactQuestion: string;
}

/**
 * Layout générique pour toute page "légale" (CGV, confidentialité, mentions...).
 * Ne contient aucune donnée métier : tout est injecté via props.
 */
export function LegalLayout({
  icon,
  badge,
  title,
  description,
  lastUpdated,
  sections,
  contactQuestion,
}: LegalLayoutProps) {
  const { activeId, activeIndex, scrollTo, setRef } = useActiveSection(sections);

  return (
    <SiteShell>
      <LegalHero
        icon={icon}
        badge={badge}
        title={title}
        description={description}
        lastUpdated={lastUpdated}
      />

      <section className="container-x max-w-5xl py-12 md:py-16">
        <LegalSummaryMobile sections={sections} activeId={activeId} onNavigate={scrollTo} />

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <LegalSummaryDesktop
            sections={sections}
            activeId={activeId}
            activeIndex={activeIndex}
            onNavigate={scrollTo}
          />

          <div className="space-y-5">
            {sections.map((s) => (
              <LegalSectionCard key={s.id} section={s} setRef={setRef(s.id)} />
            ))}
            <LegalContactCard question={contactQuestion} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}