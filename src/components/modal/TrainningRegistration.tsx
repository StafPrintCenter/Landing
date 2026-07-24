import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { type APIFormation } from "@/data/trainings";
import { BaseModal } from "./BaseModal";
import { createTrainingRegistration } from "@/stores/useTrainingsStore";
import { ProgressBar, StepContact, StepAvailability, StepSummary, SuccessScreen, registerSchema, type RegisterInput, } from "./training-registration";

interface TrainningRegistrationProps {
  formation: APIFormation;
  isOpen: boolean;
  onClose: () => void;
}

export function TrainningRegistration({ formation: f, isOpen, onClose }: TrainningRegistrationProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, trigger, watch, reset, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", email: "", notes: "", programRead: false, consent: undefined },
  });

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
    setSubmitError(null);
    try {
      await createTrainingRegistration({
        trainingId: f.id,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        schedulePreference: data.schedulePref,
        notes: data.notes?.trim() || undefined,
        programRead: !!data.programRead,
        consentAccepted: data.consent,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Une erreur est survenue lors de l'envoi de votre inscription. Merci de réessayer.");
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSubmitted(false);
    setSubmitError(null);
    reset();
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
          <ProgressBar step={step} totalSteps={3} />

          <AnimatePresence mode="wait">
            {step === 1 && <StepContact register={register} errors={errors} watch={watch} />}
            {step === 2 && <StepAvailability register={register} errors={errors} watch={watch} />}
            {step === 3 && <StepSummary register={register} errors={errors} watch={watch} formation={f} />}
          </AnimatePresence>

          {submitError && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <p>{submitError}</p>
            </div>
          )}

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
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Validation...
                  </>
                ) : (
                  "Confirmer mon inscription"
                )}
              </button>
            )}
          </div>
        </form>
      ) : (
        <SuccessScreen fullName={watch("fullName")} formationTitle={f.title} onClose={handleClose} />
      )}
    </BaseModal>
  );
}