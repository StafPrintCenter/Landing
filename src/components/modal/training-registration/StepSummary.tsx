import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import type { APIFormation } from "@/data/formations";
import type { StepProps } from "./types";

interface StepSummaryProps extends StepProps {
  formation: APIFormation;
}

export function StepSummary({ formation: f, watch }: StepSummaryProps) {
  const watchNotes = watch("notes")?.trim();

  return (
    <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
      <h4 className="font-medium text-sm text-primary uppercase tracking-wider">Étape 3 : Récapitulatif</h4>
      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2.5 text-sm">
        <div className="flex justify-between gap-4"><span className="text-muted-foreground shrink-0">Formation :</span> <span className="font-semibold text-right">{f.title}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Tarif :</span> <span className="font-semibold text-primary">{f.price.toLocaleString("fr-FR")} FCFA</span></div>
        <hr className="border-border my-2" />
        <div className="flex justify-between"><span className="text-muted-foreground">Étudiant :</span> <span className="font-medium">{watch("fullName")}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Téléphone :</span> <span className="font-medium">{watch("phone")}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Email :</span> <span className="font-medium">{watch("email")}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Horaire choisi :</span> <span className="font-medium">{watch("schedulePref")}</span></div>

        {watchNotes && (
          <div className="mt-3 rounded-lg border border-border/60 bg-card p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium text-foreground mb-1">
              <MessageSquare size={12} className="text-primary" />
              <span>Votre message :</span>
            </div>
            <p className="italic whitespace-pre-line">"{watchNotes}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}