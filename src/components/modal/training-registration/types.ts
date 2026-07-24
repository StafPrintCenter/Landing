import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(3, "Nom trop court").max(80, "Le nom ne peut pas dépasser 80 caractères"),
  phone: z.string().trim().min(8, "Numéro de téléphone trop court"),
  email: z.string().trim().email("Adresse email invalide"),
  schedulePref: z.enum(["Semaine", "Weekend", "Planning"], {
    message: "Sélectionnez une préférence horaire",
  }),
  notes: z.string().trim().max(300, "Maximum 300 caractères").optional(),
  programRead: z.boolean().optional(),
  consent: z.literal(true, {
    message: "Vous devez accepter pour valider l'inscription",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export interface StepProps {
  register: UseFormRegister<RegisterInput>;
  errors: FieldErrors<RegisterInput>;
  watch: UseFormWatch<RegisterInput>;
}