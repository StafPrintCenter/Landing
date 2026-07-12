import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { SITE } from "@/data/site";
import { CalendarDays, MapPin, Users, Clock, Filter } from "lucide-react";

export const Route = createFileRoute("/tests/calendar")({
  head: () => ({
    meta: [
      { title: "Calendrier des sessions (test) — STAF PRINT CENTER" },
      { name: "description", content: "Prochaines sessions de formation ouvertes aux inscriptions." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CalendrierPage,
});

type Theme = "Design" | "Web" | "Vidéo" | "Impression";
type Mode = "Présentiel" | "En ligne" | "Hybride";

const SESSIONS: {
  id: string; title: string; theme: Theme; mode: Mode;
  start: string; duration: string; seatsLeft: number; totalSeats: number; price: string;
}[] = [
    { id: "s1", title: "Photoshop & Illustrator — De zéro au pro", theme: "Design", mode: "Présentiel", start: "2026-07-27", duration: "5 semaines", seatsLeft: 4, totalSeats: 12, price: "120 000 FCFA" },
    { id: "s2", title: "WordPress : votre site en 4 semaines", theme: "Web", mode: "Hybride", start: "2026-08-03", duration: "4 semaines", seatsLeft: 7, totalSeats: 10, price: "100 000 FCFA" },
    { id: "s3", title: "Montage vidéo avec Premiere Pro", theme: "Vidéo", mode: "Présentiel", start: "2026-08-10", duration: "3 semaines", seatsLeft: 2, totalSeats: 10, price: "90 000 FCFA" },
    { id: "s4", title: "Préparation de fichiers pour l'impression", theme: "Impression", mode: "En ligne", start: "2026-08-17", duration: "2 weekends", seatsLeft: 9, totalSeats: 15, price: "60 000 FCFA" },
    { id: "s5", title: "Motion design avec After Effects", theme: "Vidéo", mode: "Présentiel", start: "2026-09-07", duration: "4 semaines", seatsLeft: 6, totalSeats: 10, price: "150 000 FCFA" },
    { id: "s6", title: "Développement web moderne (React)", theme: "Web", mode: "Hybride", start: "2026-09-14", duration: "8 semaines", seatsLeft: 5, totalSeats: 12, price: "200 000 FCFA" },
  ];

const THEMES: (Theme | "Tous")[] = ["Tous", "Design", "Web", "Vidéo", "Impression"];
const MODES: (Mode | "Tous")[] = ["Tous", "Présentiel", "En ligne", "Hybride"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function CalendrierPage() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("Tous");
  const [mode, setMode] = useState<(typeof MODES)[number]>("Tous");

  const list = useMemo(() => SESSIONS.filter((s) =>
    (theme === "Tous" || s.theme === theme) && (mode === "Tous" || s.mode === mode),
  ), [theme, mode]);

  return (
    <SiteShell>
      <section className="container-x max-w-6xl py-16 md:py-24">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/60">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span>Tests</span>
          <span>/</span>
          <span className="text-foreground">Calendrier des sessions</span>
        </div>

        <div className="mb-10 flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarDays size={24} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Calendrier des sessions</h1>
            <p className="mt-2 text-foreground/70">Découvrez les prochaines dates ouvertes et réservez votre place en quelques clics.</p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><Filter size={16} /> Filtres :</div>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button key={t} onClick={() => setTheme(t)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${theme === t ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="mx-2 hidden h-6 w-px bg-border md:block" />
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition ${mode === m ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {list.map((s) => {
            const almostFull = s.seatsLeft <= 3;
            const wa = encodeURIComponent(`Bonjour, je souhaite m'inscrire à la session : ${s.title} — démarrage ${formatDate(s.start)} (${s.mode}).`);
            return (
              <article key={s.id} className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-[160px_1fr_auto] md:items-center">
                <div className="rounded-xl bg-primary/10 p-4 text-center">
                  <div className="text-xs font-medium uppercase tracking-wide text-primary">{new Date(s.start).toLocaleDateString("fr-FR", { month: "short" })}</div>
                  <div className="font-display text-3xl font-bold text-primary">{new Date(s.start).getDate()}</div>
                  <div className="text-xs text-foreground/60">{new Date(s.start).getFullYear()}</div>
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{s.theme}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">{s.mode}</span>
                    {almostFull && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">Bientôt complet</span>}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-foreground/70">
                    <span className="inline-flex items-center gap-1"><Clock size={14} /> {s.duration}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={14} /> {s.mode === "En ligne" ? "Zoom / Meet" : "Porto-Novo"}</span>
                    <span className="inline-flex items-center gap-1"><Users size={14} /> {s.seatsLeft}/{s.totalSeats} places restantes</span>
                  </div>
                  <div className="mt-1 text-sm text-foreground/60 capitalize">Démarrage : {formatDate(s.start)}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="font-display text-xl font-bold text-primary">{s.price}</div>
                  <a href={`${SITE.whatsappLink}?text=${wa}`} target="_blank" rel="noreferrer"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    Réserver
                  </a>
                </div>
              </article>
            );
          })}
          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-foreground/60">
              Aucune session ne correspond à ces filtres pour l'instant.
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}