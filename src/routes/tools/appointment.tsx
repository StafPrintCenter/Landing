import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Send, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { createAppointment } from "@/stores/useAppointmentsStore";
import type { APIAppointment } from "@/data/appointments";
import {
  Stepper,
  StepType,
  StepSlot,
  StepInfos,
  StepRecap,
  ConfirmationScreen,
  STEPS,
  INITIAL_BOOKING,
  type BookingData,
} from "@/components/pages/tools/appointment";

export const Route = createFileRoute("/tools/appointment")({
  head: () => ({
    meta: [
      { title: `Prendre rendez-vous | ${SITE.name}` },
      {
        name: "description", content: `Réservez un rendez-vous en ligne ou en présentiel avec {SITE.name} à Porto-Novo. Choisissez votre créneau et confirmez en quelques étapes.`
      },
      { property: "og:title", content: `Prendre rendez-vous | ${SITE.name}` },
      { property: "og:description", content: "Réservez facilement un créneau en ligne ou en présentiel." },
      { property: "og:url", content: "/appointment" },
    ],
    links: [{ rel: "canonical", href: "/appointment" }],
  }),
  component: RendezVousPage,
});

function RendezVousPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL_BOOKING);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<APIAppointment | null>(null);

  const update = <K extends keyof BookingData>(k: K, v: BookingData[K]) =>
    setData((s) => ({ ...s, [k]: v }));

  const canNext = useMemo(() => {
    if (step === 0) return !!data.mode && !!data.duration;
    if (step === 1) return !!data.date && !!data.time;
    if (step === 2)
      return (
        data.firstName.trim().length > 1 &&
        data.lastName.trim().length > 1 &&
        /.+@.+\..+/.test(data.email) &&
        data.subject.trim().length > 2 &&
        data.cgu
      );
    return true;
  }, [step, data]);

  const next = () => canNext && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const buildRecap = (appointment: APIAppointment) => {
    const modeLabel = appointment.mode === "presentiel" ? "Présentiel (Porto-Novo)" : "En ligne (visio)";
    return `Nouvelle demande de rendez-vous - ${SITE.name}

Nom : ${appointment.lastName} ${appointment.firstName}
Email : ${appointment.email}
WhatsApp : ${appointment.whatsapp || "—"}

Type : ${modeLabel}
Durée : ${appointment.duration} min
Date : ${appointment.date}
Heure : ${appointment.time}

Sujet : ${appointment.subject}

Message :
${appointment.message || "—"}`;
  };

  const submit = async () => {
    if (!data.mode || !data.date || !data.time) return;
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const appointment = await createAppointment({
        mode: data.mode,
        duration: data.duration,
        date: format(data.date, "yyyy-MM-dd"),
        time: data.time,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        whatsapp: data.whatsapp || undefined,
        subject: data.subject,
        message: data.message || undefined,
        acceptedTerms: data.cgu,
      });
      setConfirmed(appointment);
    } catch {
      setSubmitError("Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsapp = () => {
    if (!confirmed) return;
    const url = `${SITE.whatsappLink}?text=${encodeURIComponent(buildRecap(confirmed))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (confirmed) {
    return (
      <SiteShell>
        <ConfirmationScreen appointment={confirmed} onWhatsAppCopy={openWhatsapp} />
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="container-x py-10 md:py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <CalendarIcon size={14} /> Prise de rendez-vous
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              Réservez votre créneau
            </h1>
            <p className="mt-3 text-muted-foreground">
              Choisissez le type, la date et l'heure. Nous vous confirmons rapidement par email ou WhatsApp.
            </p>
          </div>
        </Reveal>

        <Stepper step={step} />

        <div className="mt-8 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-5 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <StepType data={data} update={update} />}
              {step === 1 && <StepSlot data={data} update={update} />}
              {step === 2 && <StepInfos data={data} update={update} />}
              {step === 3 && <StepRecap data={data} onEdit={setStep} submitError={submitError} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border pt-6">
            <button
              onClick={back}
              disabled={step === 0 || isSubmitting}
              className="cursor-pointer inline-flex items-center justify-center gap-1 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
            >
              <ChevronLeft size={16} /> Retour
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                disabled={!canNext}
                className="cursor-pointer inline-flex items-center justify-center gap-1 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuer <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={isSubmitting}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Envoi…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Confirmer et envoyer
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Horaires : Lun–Ven 08h–18h · Sam 10h–15h · Fermé le dimanche
        </p>
      </section>
    </SiteShell>
  );
}