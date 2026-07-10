import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfDay, isBefore, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, MapPin, Video, ChevronLeft, ChevronRight, Check, User, Mail, Phone, FileText, MessageSquare, Send } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: `Prendre rendez-vous | ${SITE.name}` },
      { name: "description", content: "Réservez un rendez-vous en ligne ou en présentiel avec STAF PRINT CENTER à Porto-Novo. Choisissez votre créneau et confirmez en quelques étapes." },
      { property: "og:title", content: `Prendre rendez-vous | ${SITE.name}` },
      { property: "og:description", content: "Réservez facilement un créneau en ligne ou en présentiel." },
      { property: "og:url", content: "/rendez-vous" },
    ],
    links: [{ rel: "canonical", href: "/rendez-vous" }],
  }),
  component: RendezVousPage,
});

type Mode = "presentiel" | "en-ligne";
type Duration = 30 | 45 | 60;

type BookingData = {
  mode: Mode | null;
  duration: Duration;
  date: Date | null;
  time: string | null;
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  cgu: boolean;
};

const INITIAL: BookingData = {
  mode: null,
  duration: 30,
  date: null,
  time: null,
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  subject: "",
  message: "",
  cgu: false,
};

const STEPS = ["Type", "Créneau", "Vos infos", "Récapitulatif"] as const;

// Mon-Fri 8-18, Sat 10-15, closed Sunday
function slotsForDate(d: Date): string[] {
  const day = d.getDay(); // 0=Sun
  if (day === 0) return [];
  const [start, end] = day === 6 ? [10, 15] : [8, 18];
  const out: string[] = [];
  for (let h = start; h < end; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}

function isDateDisabled(d: Date) {
  const today = startOfDay(new Date());
  if (isBefore(d, today)) return true;
  if (isBefore(addDays(today, 60), d)) return true;
  return d.getDay() === 0;
}

function RendezVousPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>(INITIAL);
  const [sent, setSent] = useState(false);

  const update = <K extends keyof BookingData>(k: K, v: BookingData[K]) =>
    setData((s) => ({ ...s, [k]: v }));

  const slots = useMemo(() => (data.date ? slotsForDate(data.date) : []), [data.date]);

  const canNext = (() => {
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
  })();

  const next = () => canNext && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const buildRecap = () => {
    const modeLabel = data.mode === "presentiel" ? "Présentiel (Porto-Novo)" : "En ligne (visio)";
    const dateStr = data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: fr }) : "";
    return `Nouvelle demande de rendez-vous — STAF PRINT CENTER

Nom : ${data.lastName} ${data.firstName}
Email : ${data.email}
WhatsApp : ${data.whatsapp || "—"}

Type : ${modeLabel}
Durée : ${data.duration} min
Date : ${dateStr}
Heure : ${data.time}

Sujet : ${data.subject}

Message :
${data.message || "—"}`;
  };

  const submit = () => {
    const body = buildRecap();
    const subject = `Rendez-vous — ${data.firstName} ${data.lastName} (${data.date ? format(data.date, "dd/MM/yyyy") : ""} ${data.time ?? ""})`;
    const mail = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mail;
    setSent(true);
  };

  const openWhatsapp = () => {
    const url = `${SITE.whatsappLink}?text=${encodeURIComponent(buildRecap())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sent) {
    return (
      <SiteShell>
        <section className="container-x py-16 md:py-24">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-12 text-center shadow-lg">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Demande envoyée !</h1>
            <p className="mt-3 text-muted-foreground">
              Nous avons bien reçu votre demande de rendez-vous et vous enverrons une confirmation par email très prochainement. Vous pouvez également nous en envoyer une copie sur WhatsApp pour accélérer la confirmation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={openWhatsapp}
                className="cursor-pointer rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                Envoyer une copie sur WhatsApp
              </button>
              <Link
                to="/"
                className="cursor-pointer rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </section>
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

        {/* Stepper */}
        <div className="mt-10 mx-auto max-w-3xl">
          <ol className="flex items-center justify-between gap-2">
            {STEPS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={label} className="flex-1 flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold border transition-colors",
                      done && "bg-primary text-primary-foreground border-primary",
                      active && "border-primary text-primary bg-primary/10",
                      !done && !active && "border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      "hidden sm:block text-sm",
                      active ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px bg-border ml-2" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-8 mx-auto max-w-3xl rounded-3xl border border-border bg-card p-5 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && (
                <StepType data={data} update={update} />
              )}
              {step === 1 && (
                <StepSlot data={data} update={update} slots={slots} />
              )}
              {step === 2 && (
                <StepInfos data={data} update={update} />
              )}
              {step === 3 && (
                <StepRecap data={data} onEdit={(s) => setStep(s)} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border pt-6">
            <button
              onClick={back}
              disabled={step === 0}
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
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                <Send size={16} /> Confirmer et envoyer
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

function StepType({
  data,
  update,
}: {
  data: BookingData;
  update: <K extends keyof BookingData>(k: K, v: BookingData[K]) => void;
}) {
  const options: Array<{ id: Mode; icon: typeof MapPin; title: string; desc: string }> = [
    { id: "presentiel", icon: MapPin, title: "Présentiel", desc: "À notre atelier de Porto-Novo" },
    { id: "en-ligne", icon: Video, title: "En ligne", desc: "Visio (Google Meet / WhatsApp)" },
  ];
  const durations: Duration[] = [30, 45, 60];

  return (
    <div>
      <h2 className="text-xl font-bold">Type de rendez-vous</h2>
      <p className="mt-1 text-sm text-muted-foreground">Comment souhaitez-vous nous rencontrer ?</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const active = data.mode === o.id;
          const Icon = o.icon;
          return (
            <button
              key={o.id}
              onClick={() => update("mode", o.id)}
              className={cn(
                "cursor-pointer text-left rounded-2xl border p-5 transition-all",
                active
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
                  <Icon size={18} />
                </span>
                <div>
                  <div className="font-semibold">{o.title}</div>
                  <div className="text-xs text-muted-foreground">{o.desc}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold flex items-center gap-2"><Clock size={16} /> Durée</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {durations.map((d) => {
            const active = data.duration === d;
            return (
              <button
                key={d}
                onClick={() => update("duration", d)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                )}
              >
                {d} min
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepSlot({
  data,
  update,
  slots,
}: {
  data: BookingData;
  update: <K extends keyof BookingData>(k: K, v: BookingData[K]) => void;
  slots: string[];
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Date et heure</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sélectionnez un jour puis un créneau disponible.</p>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-2 flex justify-center">
          <Calendar
            mode="single"
            selected={data.date ?? undefined}
            onSelect={(d) => {
              update("date", d ?? null);
              update("time", null);
            }}
            disabled={isDateDisabled}
            locale={fr}
            weekStartsOn={1}
            className={cn("p-3 pointer-events-auto")}
          />
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">
            {data.date
              ? `Créneaux — ${format(data.date, "EEEE d MMMM", { locale: fr })}`
              : "Sélectionnez une date"}
          </div>
          {data.date && slots.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun créneau ce jour.</p>
          )}
          {data.date && slots.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-80 overflow-y-auto pr-1">
              {slots.map((s) => {
                const active = data.time === s;
                const isToday = data.date ? isSameDay(data.date, new Date()) : false;
                const now = new Date();
                const [hh, mm] = s.split(":").map(Number);
                const past =
                  isToday && (hh < now.getHours() || (hh === now.getHours() && mm <= now.getMinutes()));
                return (
                  <button
                    key={s}
                    disabled={past}
                    onClick={() => update("time", s)}
                    className={cn(
                      "cursor-pointer rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-muted",
                      past && "opacity-40 cursor-not-allowed line-through",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepInfos({
  data,
  update,
}: {
  data: BookingData;
  update: <K extends keyof BookingData>(k: K, v: BookingData[K]) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Vos informations</h2>
      <p className="mt-1 text-sm text-muted-foreground">Remplissez vos coordonnées pour la confirmation.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="lastName" className="flex items-center gap-1.5"><User size={14} /> Nom *</Label>
          <Input id="lastName" value={data.lastName} onChange={(e) => update("lastName", e.target.value)} maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="firstName" className="flex items-center gap-1.5"><User size={14} /> Prénom *</Label>
          <Input id="firstName" value={data.firstName} onChange={(e) => update("firstName", e.target.value)} maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email" className="flex items-center gap-1.5"><Mail size={14} /> Email *</Label>
          <Input id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} maxLength={200} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="whatsapp" className="flex items-center gap-1.5"><Phone size={14} /> WhatsApp (optionnel)</Label>
          <Input id="whatsapp" placeholder="+229 …" value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} maxLength={30} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="subject" className="flex items-center gap-1.5"><FileText size={14} /> Sujet *</Label>
          <Input id="subject" placeholder="Ex : Devis site vitrine, logo, formation Photoshop…" value={data.subject} onChange={(e) => update("subject", e.target.value)} maxLength={140} className="mt-1.5" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message" className="flex items-center gap-1.5"><MessageSquare size={14} /> Message (optionnel)</Label>
          <Textarea id="message" rows={4} maxLength={1000} value={data.message} onChange={(e) => update("message", e.target.value)} placeholder="Décrivez votre projet ou vos questions…" className="mt-1.5" />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3 cursor-pointer">
        <Checkbox
          checked={data.cgu}
          onCheckedChange={(v) => update("cgu", Boolean(v))}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground/80">
          J'accepte d'être contacté(e) pour la confirmation de mon rendez-vous et j'ai lu les{" "}
          <Link to="/legal/mentions" className="underline text-primary">mentions légales</Link>. *
        </span>
      </label>
    </div>
  );
}

function StepRecap({
  data,
  onEdit,
}: {
  data: BookingData;
  onEdit: (s: number) => void;
}) {
  const modeLabel = data.mode === "presentiel" ? "Présentiel (Porto-Novo)" : "En ligne (visio)";
  const dateStr = data.date ? format(data.date, "EEEE d MMMM yyyy", { locale: fr }) : "";

  const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value || "—"}</span>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold">Récapitulatif</h2>
      <p className="mt-1 text-sm text-muted-foreground">Vérifiez les informations avant l'envoi.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Rendez-vous</h3>
            <button onClick={() => onEdit(0)} className="cursor-pointer text-xs font-semibold text-primary hover:underline">Modifier</button>
          </div>
          <div className="mt-2">
            <Row label="Type" value={modeLabel} />
            <Row label="Durée" value={`${data.duration} min`} />
            <Row label="Date" value={dateStr} />
            <Row label="Heure" value={data.time} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Vos informations</h3>
            <button onClick={() => onEdit(2)} className="cursor-pointer text-xs font-semibold text-primary hover:underline">Modifier</button>
          </div>
          <div className="mt-2">
            <Row label="Nom" value={`${data.lastName} ${data.firstName}`} />
            <Row label="Email" value={data.email} />
            <Row label="WhatsApp" value={data.whatsapp} />
            <Row label="Sujet" value={data.subject} />
          </div>
        </div>

        {data.message && (
          <div className="md:col-span-2 rounded-2xl border border-border bg-background p-5">
            <h3 className="font-semibold">Message</h3>
            <p className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap">{data.message}</p>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm text-foreground/80">
        En confirmant, votre demande est enregistrée et une confirmation vous sera envoyée par email à{" "}
        <span className="font-semibold">{data.email || "votre adresse"}</span>. Vous pourrez également en envoyer une copie via WhatsApp ensuite.
      </div>
    </div>
  );
}
