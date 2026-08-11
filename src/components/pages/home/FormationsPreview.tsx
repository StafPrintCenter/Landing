import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { formatDate, getThemeColor, type APIFormation } from "@/data/trainings";
import { useFormationsStore } from "@/stores/useTrainingsStore";
import { TrainningRegistration } from "@/components/modal";
import { FormationsSkeleton } from "@/components/skeleton/HomeFormations";

export function FormationsPreview() {
  const { formations, isLoading, isError } = useFormationsStore({ perPage: 3 });

  // États pour gérer l'ouverture de la modal
  const [selectedFormation, setSelectedFormation] = useState<APIFormation | null>(null);

  // 1. Gestion de l'état de chargement
  if (isLoading) return <FormationsSkeleton />;

  if (isError) {
    return (
      <section className="bg-muted/50 border-y border-border/50">
        <div className="container-x py-24 text-center">
          <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
            <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger le catalogue de formations. Veuillez vérifier votre connexion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/50 border-y border-border/50">
      <div className="container-x py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Formations</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-bold md:text-5xl">
            Apprenez le design, le web et la vidéo avec un pro.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {formations.map((f, i) => {
            const isFull = f.seatsRemaining !== null && f.seatsRemaining <= 0;
            const isOpen = f.enrollmentStatus === "open";
            const color = f.coverColor || "var(--primary)";

            return (
              <Reveal key={f.id} delay={i * 0.08}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:shadow-md">
                  {/* Bordure supérieure de couleur */}
                  <div
                    className="h-1.5 w-full shrink-0"
                    style={{ backgroundColor: color }}
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={[
                          "inline-flex rounded-full border px-3 py-0.5 text-xs font-semibold",
                          getThemeColor(f.theme),
                        ].join(" ")}
                      >
                        {f.theme}
                      </span>
                      <span className="font-display font-bold text-primary text-base">
                        {f.price.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{f.short}</p>

                    <div className="flex-1 min-h-4" />

                    {/* Dates & métadonnées */}
                    <div className="mt-4 space-y-2 text-xs text-muted-foreground border-t border-border/40 pt-4">
                      {f.startDate && f.endDate && (
                        <div className="flex items-center gap-1.5 font-medium text-foreground">
                          <Calendar size={13} className="text-primary" />
                          <span>
                            Du {formatDate(f.startDate)} au {formatDate(f.endDate)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-muted-foreground pt-1">
                        <span>{f.duration} • {f.level}</span>
                        {f.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {f.location}
                          </span>
                        )}
                      </div>

                      {f.seatsRemaining !== null && (
                        <div className="flex items-center gap-1 font-medium">
                          <Users size={12} />
                          <span className={isFull ? "text-destructive font-semibold" : ""}>
                            {isFull ? "Session complète" : `${f.seatsRemaining} place(s) disponible(s)`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-border/60 pt-4">
                      <Link
                        to="/trainings/$id"
                        params={{ id: f.id }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted"
                      >
                        Détails <ArrowRight size={14} />
                      </Link>
                      <button
                        type="button"
                        disabled={isFull || !isOpen}
                        onClick={() => setSelectedFormation(f)}
                        className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${isFull || !isOpen
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                          }`}
                      >
                        {isFull ? "Complet" : !isOpen ? "Clôturé" : "S'inscrire"}
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/trainings"
            search={{ theme: "Tout", sortBy: "default", sortDir: "asc", query: "", availableOnly: false, page: 1, perPage: 9 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
          >
            Voir toutes les formations <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Rendu unique de la modal d'inscription */}
      {selectedFormation && (
        <TrainningRegistration
          formation={selectedFormation}
          isOpen={true}
          onClose={() => setSelectedFormation(null)}
        />
      )}
    </section>
  );
}