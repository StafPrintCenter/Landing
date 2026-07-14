import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Copy, Check, ArrowRight } from "lucide-react";
import { useServicesStore } from "@/stores/useServicesStore";
import { sendContactRequest } from "@/stores/useContactStore";
import { Field, CharacterCounter } from "./FormFields";

export const contactSchema = z.object({
  name: z.string().trim().min(3, "Nom trop court").max(80, "Le nom ne peut pas dépasser 80 caractères"),
  email: z.string().trim().email("Email invalide").max(160),
  service: z.string().min(1, "Choisissez un service"),
  customService: z.string().trim().max(100, "Le service ne peut pas dépasser 100 caractères").optional(),
  message: z.string().trim().min(100, "Message trop court").max(3000, "Le message ne peut pas dépasser 3000 caractères"),
}).superRefine((data, ctx) => {
  // customService reste requis uniquement lorsque le service choisi est "Autre"
  if (data.service === "Autre") {
    const custom = data.customService?.trim() ?? "";
    if (custom.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Veuillez préciser le service souhaité (10 caractères min.)",
        path: ["customService"],
      });
    }
  }
});

export type ContactInput = z.infer<typeof contactSchema>;

const EMPTY_VALUES: ContactInput = {
  name: "",
  email: "",
  service: "",
  customService: "",
  message: "",
};

interface ContactFormProps {
  /** Appelé après un envoi réussi — utile pour un tracking ou une redirection côté parent */
  onSuccess?: (ticketNumber: string) => void;
  initialValues: {
    service: string;
    customService: string;
    message: string;
  };
}

export function ContactForm({ onSuccess, initialValues }: ContactFormProps) {
  const { services } = useServicesStore({ perPage: 100 });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_VALUES,
  });

  const watchName = watch("name") || "";
  const watchEmail = watch("email") || "";
  const watchMessage = watch("message") || "";
  const watchService = watch("service") || "";
  const watchCustomService = watch("customService") || "";

  useEffect(() => {
    if (initialValues.service) {
      reset({
        name: watchName,
        email: watchEmail,
        service: initialValues.service,
        customService: initialValues.customService,
        message: initialValues.message
      }, {
        keepDefaultValues: false
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, reset]);

  // customService n'a de sens que si "Autre" est sélectionné — vidé automatiquement sinon
  useEffect(() => {
    if (watchService !== "Autre" && watchCustomService !== "") {
      setValue("customService", "", { shouldValidate: false });
    }
  }, [watchService, watchCustomService, setValue]);

  const onSubmit = async (data: ContactInput) => {
    setSubmitError(null);
    try {
      const result = await sendContactRequest({
        name: data.name,
        email: data.email,
        service: data.service === "Autre" ? (data.customService?.trim() || "Autre") : data.service,
        customService: data.service === "Autre" ? data.customService?.trim() : undefined,
        message: data.message,
      });
      setTicketNumber(result.ticketNumber);
      setSubmitted(true);
      setCopied(false);
      // Reset complet et explicite : tous les champs (y compris service et customService) repartent à vide
      reset(EMPTY_VALUES, { keepDefaultValues: false });
      onSuccess?.(result.ticketNumber);
    } catch {
      setSubmitError("Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.");
    }
  };

  const handleCopyTicket = async () => {
    if (!ticketNumber) return;
    await navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Prénoms & Nom"
          error={errors.name?.message}
          counter={<CharacterCounter current={watchName.length} min={3} max={80} />}
        >
          <input
            type="text"
            {...register("name")}
            maxLength={80}
            className="input w-full pr-16"
            placeholder="Comment on vous appelle ?"
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register("email")} className="input w-full" placeholder="vous@exemple.com" />
        </Field>

        <Field label="Service souhaité" error={errors.service?.message} className="md:col-span-2">
          <select {...register("service")} className="input w-full">
            <option value="">— Choisir un service —</option>
            {(services || []).map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
            <option value="Autre">Autre (préciser...)</option>
          </select>
        </Field>

        {watchService === "Autre" && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            className="md:col-span-2"
          >
            <Field
              label="Veuillez préciser le service"
              error={errors.customService?.message}
              counter={<CharacterCounter current={watchCustomService.length} min={10} max={100} />}
            >
              <input
                type="text"
                {...register("customService")}
                maxLength={100}
                className="input w-full pr-16"
                placeholder="Quel autre service souhaitez-vous (ex: Enseigne lumineuse) ?"
              />
            </Field>
          </motion.div>
        )}

        <Field
          label="Message"
          error={errors.message?.message}
          className="md:col-span-2"
          counter={<CharacterCounter current={watchMessage.length} min={100} max={3000} />}
          counterPosition="bottom-right"
        >
          <textarea
            {...register("message")}
            rows={5}
            maxLength={3000}
            className="input w-full pr-16 pb-8"
            placeholder="Décrivez votre besoin..."
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60 cursor-pointer"
      >
        {isSubmitting ? "Envoi..." : <>Envoyer la demande <Send size={16} /></>}
      </button>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle size={18} /> {submitError}
        </motion.div>
      )}

      {submitted && ticketNumber && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-[oklch(0.9_0.08_150)] px-4 py-3 text-sm text-[oklch(0.3_0.12_150)]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>Message reçu ! Nous vous répondons sous 24h.</span>
          </div>

          <div className="mt-2.5 flex items-center gap-2 rounded-md bg-white/50 px-3 py-2">
            <span className="min-w-0 flex-1 truncate font-mono text-xs font-semibold">
              {ticketNumber}
            </span>
            <button
              type="button"
              onClick={handleCopyTicket}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[oklch(0.3_0.12_150)] px-2.5 py-1 text-[11px] font-semibold text-white cursor-pointer hover:opacity-90"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copié" : "Copier"}
            </button>
          </div>

          <p className="mt-2.5 text-xs">
            Conservez ce numéro : vous pouvez suivre l'état de votre demande sur{" "}
            <Link to="/tools/lookup" className="inline-flex items-center gap-0.5 font-semibold underline underline-offset-2">
              ici <ArrowRight size={11} />
            </Link>
          </p>
        </motion.div>
      )}
    </form>
  );
}