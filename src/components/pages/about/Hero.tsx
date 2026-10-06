import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SITE } from "@/data/site";
import images from "@/assets/images.json";
import { useStatsStore } from "@/stores/useStatsStore";
import { StatsSkeleton } from "./StatsSkeleton";

export function AboutHero() {
  const { stats, isLoading, isError } = useStatsStore();

  // Sélection aléatoire d'une statistique pour le badge d'image
  const randomStat = useMemo(() => {
    if (!stats || stats.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * stats.length);
    return stats[randomIndex];
  }, [stats]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-grain" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="container-x grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Notre atelier
            </p>
            <h1 className="mt-2 font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Nous produisons <span className="text-gradient-brand">à Porto-Novo</span>, du premier croquis à la livraison.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              {SITE.name} est un studio béninois : une équipe, des machines
              et un savoir-faire réunis sous le même toit pour donner une forme
              physique à vos idées - une carte, une bâche, un stand, une marque
              entière.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tools/appointment"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
              >
                Prendre rendez-vous à l'atelier <ArrowRight size={16} />
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary"
              >
                Discuter sur WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div whileHover={{ y: -6 }} className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-2xl">
                <img
                  src={images.atHr}
                  alt={`L'atelier de production ${SITE.name}`}
                  width={1600}
                  height={912}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Badge d'overlay dynamique */}
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl">
                {isLoading ? (
                  <div className="space-y-1">
                    <div className="h-7 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded bg-muted/70" />
                  </div>
                ) : randomStat ? (
                  <>
                    <p className="font-display text-2xl font-bold text-primary">
                      <Counter to={randomStat.value} suffix={randomStat.suffix} />
                    </p>
                    <p className="text-xs text-muted-foreground">{randomStat.label}</p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-2xl font-bold text-primary">
                      <Counter to={480} suffix="+" />
                    </p>
                    <p className="text-xs text-muted-foreground">projets livrés</p>
                  </>
                )}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Chiffres */}
      <section className="container-x pt-14">
        {isLoading ? (
          <StatsSkeleton />
        ) : isError ? (
          <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive">
            <p className="text-lg font-semibold">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger les statistiques de l'atelier.
            </p>
          </div>
        ) : (
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 md:p-10 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.id} className="text-center lg:text-left">
                  <p className="font-display text-4xl font-bold text-gradient-brand">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}