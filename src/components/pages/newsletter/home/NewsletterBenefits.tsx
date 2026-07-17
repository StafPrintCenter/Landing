import { Sparkles, Tag, BookOpen, type LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const BENEFITS: Benefit[] = [
  { icon: Sparkles, title: "Conseils exclusifs", desc: "Chaque mois, 3 astuces design, impression ou web actionnables tout de suite." },
  { icon: Tag, title: "Offres réservées", desc: "Promotions abonnés sur les formations et prestations digitales." },
  { icon: BookOpen, title: "Ressources gratuites", desc: "Templates, guides et checklists envoyés en avant-première." },
];

export function NewsletterBenefits() {
  return (
    <div className="space-y-4">
      {BENEFITS.map((b) => (
        <div key={b.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <b.icon size={20} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">{b.title}</div>
            <p className="mt-1 text-sm text-foreground/70">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}