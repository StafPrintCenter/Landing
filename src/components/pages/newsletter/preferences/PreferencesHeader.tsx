import { Settings2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function PreferencesHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Settings2 size={14} /> Préférences newsletter
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
          Gérez votre abonnement
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choisissez les sujets qui vous intéressent, ou désabonnez-vous à tout moment.
        </p>
      </div>
    </Reveal>
  );
}