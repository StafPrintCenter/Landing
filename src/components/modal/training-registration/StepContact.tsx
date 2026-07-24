import { motion } from "framer-motion";
import { User, Phone, Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { CharacterCounter } from "./CharacterCounter";
import type { StepProps } from "./types";

export function StepContact({ register, errors, watch }: StepProps) {
  const nameLength = (watch("fullName") || "").length;

  return (
    <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
      <h4 className="font-medium text-sm text-primary uppercase tracking-wider">Étape 1 : Vos coordonnées</h4>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Nom complet</span>
        <div className="relative flex items-center">
          <User size={16} className="absolute left-3 text-muted-foreground" />
          <input type="text" {...register("fullName")} maxLength={80} className="input w-full pl-10 pr-14" placeholder="Ex: Jean Gandonou" />
          <div className="absolute right-3 pointer-events-none bg-card/90 px-1 py-0.5 rounded">
            <CharacterCounter current={nameLength} min={3} max={80} />
          </div>
        </div>
        {errors.fullName && <span className="mt-1 block text-xs text-destructive">{errors.fullName.message}</span>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Téléphone (WhatsApp)</span>
        <div className="relative flex items-center">
          <Phone size={16} className="absolute left-3 text-muted-foreground" />
          <input type="tel" {...register("phone")} className="input w-full pl-10" placeholder={`Ex: ${SITE.whatsapp}`} />
        </div>
        {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone.message}</span>}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Adresse email</span>
        <div className="relative flex items-center">
          <Mail size={16} className="absolute left-3 text-muted-foreground" />
          <input type="email" {...register("email")} className="input w-full pl-10" placeholder={`Ex: ${SITE.email}`} />
        </div>
        {errors.email && <span className="mt-1 block text-xs text-destructive">{errors.email.message}</span>}
      </label>
    </motion.div>
  );
}