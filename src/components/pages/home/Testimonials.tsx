import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { getInitials } from "@/data/testimonials";
import { useStatsStore, useTestimonialsStore } from "@/stores/useStatsStore";
import { TestimonialsSkeleton } from "@/components/skeleton/HomeTestimonials";

export function Testimonials() {
  const { stats } = useStatsStore();
  const { testimonials, isLoading, isError } = useTestimonialsStore();

  // Le nombre de clients vient de la même ressource /stats que le composant Stats
  const clientsStat = stats.find((s) => s.key === "clients");

  // 1. Gestion de l'état de chargement
  if (isLoading) {
    return <TestimonialsSkeleton />;
  }

  // 2. Gestion de l'état d'erreur
  if (isError) {
    return (
      <section className="py-28">
        <div className="container-x text-center">
          <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
            <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
            <p className="mt-1 text-sm text-destructive/80">
              Impossible de charger les témoignages. Veuillez vérifier votre connexion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  // On se base sur le flag explicite plutôt que sur la position dans le tableau,
  // même si le back trie déjà featured en premier — ceinture et bretelles
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured.id);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-40" />
      </div>

      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Témoignages</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            La confiance <span className="text-gradient-brand">se construit.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {clientsStat ? `${clientsStat.suffix}${clientsStat.value}` : ""} marques, institutions et créateurs béninois
            nous confient leur image. Voici ce qu'ils en disent.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Featured testimonial */}
          <Reveal className="lg:col-span-7">
            <motion.figure
              whileHover={{ y: -4 }}
              className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-secondary p-8 text-secondary-foreground shadow-xl md:p-12"
            >
              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

              <Quote className="relative text-accent" size={44} strokeWidth={1.5} />

              <blockquote className="relative mt-6 flex-1 font-display text-2xl font-medium leading-snug md:text-3xl">
                « {featured.quote} »
              </blockquote>

              <div className="relative mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-primary to-accent font-display text-lg font-bold text-secondary shadow-lg">
                  {getInitials(featured.name)}
                </div>
                <figcaption className="flex-1">
                  <div className="font-display text-lg font-semibold">{featured.name}</div>
                  <div className="text-sm text-secondary-foreground/70">{featured.role}</div>
                </figcaption>
                <div className="flex gap-0.5">
                  {[...Array(featured.rating)].map((_, k) => (
                    <Star key={k} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </motion.figure>
          </Reveal>

          {/* Trust card + smaller quotes */}
          <div className="grid gap-6 lg:col-span-5">
            <Reveal delay={0.08}>
              <a
                href={SITE.notice}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 transition hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-primary">{SITE.opinion.stars}</span>
                  <span className="text-sm font-medium text-muted-foreground">/ 5</span>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={16} className="fill-accent text-accent transition group-hover:scale-110" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Note moyenne sur <strong className="text-foreground underline-offset-4 group-hover:underline">{SITE.opinion.nb} avis</strong> clients vérifiés.
                </p>
              </a>
            </Reveal>

            {rest.slice(0, 2).map((t, i) => (
              <Reveal key={t.id} delay={0.15 + i * 0.06}>
                <motion.figure
                  whileHover={{ y: -3 }}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-secondary">
                    {getInitials(t.name)}
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-sm leading-relaxed text-foreground/90 line-clamp-3">
                      « {t.quote} »
                    </blockquote>
                    <figcaption className="mt-3 text-xs">
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-muted-foreground"> — {t.role}</span>
                    </figcaption>
                  </div>
                </motion.figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Extra row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.slice(2, 4).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <motion.figure
                whileHover={{ y: -3 }}
                className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg"
              >
                <Quote className="absolute right-5 top-5 text-primary/15" size={40} strokeWidth={1.5} />
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-primary to-accent text-sm font-bold text-secondary">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  « {t.quote} »
                </blockquote>
                <div className="mt-4 flex gap-0.5">
                  {[...Array(t.rating)].map((_, k) => (
                    <Star key={k} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section >
  );
}