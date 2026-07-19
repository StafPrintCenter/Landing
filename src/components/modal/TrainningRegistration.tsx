import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Calendar, ArrowRight, ArrowLeft, CheckCircle2, MessageSquare, Mail } from "lucide-react";
import { type APIFormation } from "@/data/formations";
import { SITE } from "@/data/site";
import { BaseModal } from "./BaseModal";

const registerSchema = z.object({
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

type RegisterInput = z.infer<typeof registerSchema>;

interface TrainningRegistrationProps {
  formation: APIFormation;
  isOpen: boolean;
  onClose: () => void;
}

function CharacterCounter({ current, min, max }: { current: number; min: number; max: number }) {
  let colorClass = "text-muted-foreground";

  if (current === 0) {
    colorClass = "text-muted-foreground";
  } else if (current < min) {
    colorClass = "text-red-500 font-medium";
  } else if (current >= max) {
    colorClass = "text-red-500 font-bold";
  } else if (current >= max * 0.8) {
    colorClass = "text-pink-500 font-medium";
  }

  return (
    <span className={`text-[10px] transition-colors duration-200 select-none ${colorClass}`}>
      {current}/{max}
    </span>
  );
}

export function TrainningRegistration({ formation: f, isOpen, onClose }: TrainningRegistrationProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, trigger, watch, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", email: "", notes: "", programRead: false, consent: undefined },
  });

  const nameLength = (watch("fullName") || "").length;
  const notesLength = (watch("notes") || "").length;
  const watchNotes = watch("notes")?.trim();

  const nextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let fieldsToValidate: ("fullName" | "phone" | "email" | "schedulePref" | "notes" | "consent")[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "phone", "email"];
    if (step === 2) fieldsToValidate = ["schedulePref", "consent"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmitForm = async (data: RegisterInput) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`Nouvelle inscription à ${f.title}`, data);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSubmitted(false);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      variant="center"
      maxWidthClassName="max-w-lg"
      backdropClassName="bg-background/80 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="font-display text-lg font-bold">S'inscrire à la formation</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{f.title}</p>
        </div>
        <button onClick={handleClose} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
          <X size={18} />
        </button>
      </div>

      {!submitted ? (
        <form onSubmit={(e) => e.preventDefault()} className="p-6">
          {/* Progress Bar */}
          <div className="mb-6 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
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
            )}

            {step === 2 && (
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
            )}

            {step === 3 && (
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
            )}
          </AnimatePresence>

          {/* Navigation Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
            {step > 1 ? (
              <button type="button" onClick={prevStep} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft size={16} /> Retour
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Continuer <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmitForm)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {isSubmitting ? "Validation..." : "Confirmer mon inscription"}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle2 size={48} className="text-[oklch(0.5_0.15_140)] mb-3" />
          <h4 className="font-display text-xl font-bold">Pré-inscription enregistrée !</h4>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Merci {watch("fullName")}, votre demande pour <strong>{f.title}</strong> a bien été prise en compte. Un conseiller vous appellera sous 24h.
          </p>
          <button type="button" onClick={handleClose} className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-muted">
            Fermer la fenêtre
          </button>
        </div>
      )}
    </BaseModal>
  );
}