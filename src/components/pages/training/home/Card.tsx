import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Clock, BarChart3, ArrowRight } from "lucide-react";
import { getThemeColor, type APIFormation } from "@/data/formations";

interface FormationCardProps {
  formation: APIFormation;
  onRegister: () => void;
}

export function FormationHomeCard({ formation: f, onRegister }: FormationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={[
          "rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wider",
          getThemeColor(f.theme)
        ].join(" ")}>
          {f.theme}
        </span>
        <span className="font-display text-xl font-bold text-primary">{f.price.toLocaleString("fr-FR")} FCFA</span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">{f.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{f.short}</p>

      <div className="mt-4 flex gap-4 text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md"><Clock size={13} /> {f.duration}</span>
        <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md"><BarChart3 size={13} /> {f.level}</span>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-foreground/80">
        {f.objectives.slice(0, 4).map((o) => (
          <li key={o} className="flex gap-2 items-start">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
            <span className="leading-snug">{o}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
        {/* Bouton Voir détails */}
        <Link
          to="/trainings/$id"
          params={{ id: f.id }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition"
        >
          Voir détails <ArrowRight size={14} />
        </Link>

        {/* Bouton S'inscrire */}
        <button
          onClick={onRegister}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm cursor-pointer"
        >
          S'inscrire
        </button>
      </div>
    </motion.div>
  );
}