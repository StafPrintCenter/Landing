import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { SITE } from "@/data/site";
import { CharacterCounter } from "./CharacterCounter";
import type { StepProps } from "./types";

export function StepAvailability({ register, errors, watch }: StepProps) {
  const notesLength = (watch("notes") || "").length;

  return (
    <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
      <h4 className="font-medium text-sm text-primary uppercase tracking-wider">Étape 2 : Vos disponibilités</h4>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Préférence horaire</span>
        <div className="relative flex items-center">
          <Calendar size={16} className="absolute left-3 text-muted-foreground" />
          <select {...register("schedulePref")} className="input w-full pl-10">
            <option value="">— Choisir un créneau —</option>
            <option value="Semaine">En Semaine (Lundi au Vendredi)</option>
            <option value="Weekend">Le Weekend (Samedi / Dimanche)</option>
            <option value="Planning">Selon le planning de la formation</option>
          </select>
        </div>
        {errors.schedulePref && <span className="mt-1 block text-xs text-destructive">{errors.schedulePref.message}</span>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Notes ou questions (Optionnel)</span>
        <div className="relative flex items-center">
          <textarea {...register("notes")} maxLength={300} rows={3} className="input w-full pr-14 pb-6" placeholder="Un besoin spécifique ?" />
          <div className="absolute right-3 bottom-2 pointer-events-none bg-card/90 px-1.5 py-0.5 rounded">
            <CharacterCounter current={notesLength} min={0} max={300} />
          </div>
        </div>
      </label>

      <div className="space-y-2.5">
        <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 select-none cursor-pointer hover:bg-muted/40 transition-colors">
          <input type="checkbox" {...register("programRead")} className="mt-1 accent-primary" />
          <span className="text-xs text-muted-foreground leading-tight">
            J'ai pris connaissance du programme et des prérequis de cette formation. <span className="text-[10px] italic text-muted-foreground/70">(Optionnel)</span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-3 select-none cursor-pointer">
          <input type="checkbox" {...register("consent")} className="mt-1 accent-primary" />
          <span className="text-xs text-muted-foreground leading-tight">
            J'accepte que {SITE.name} me contacte par WhatsApp, email ou téléphone pour finaliser mon inscription.
          </span>
        </label>
        {errors.consent && <span className="mt-0.5 block text-xs text-destructive">{errors.consent.message}</span>}
      </div>
    </motion.div>
  );
}