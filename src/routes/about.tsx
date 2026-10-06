import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Quote } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { SITE } from "@/data/site";
import {
  ENGAGEMENTS,
  EXPERTISE,
  MACHINES,
  PROCESS,
  STATS,
  TIMELINE,
} from "@/data/atelier";
import images from "@/assets/images.json";
import { useDarkMode } from "@/hooks/use-dark-mode";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Notre atelier — STAF PRINT CENTER" },
      { name: "description", content: "Visitez l'atelier STAF PRINT CENTER à Porto-Novo : parc machines, savoir-faire local, finitions et engagements de production." },
      { property: "og:title", content: "Notre atelier — STAF PRINT CENTER" },
      { property: "og:description", content: "Presse numérique, traceur grand format, finitions et savoir-faire béninois : comment nous produisons à Porto-Novo." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Notre atelier — STAF PRINT CENTER",
          description: "Présentation de l'atelier STAF PRINT CENTER à Porto-Novo : machines, savoir-faire et engagements.",
          about: {
            "@type": "LocalBusiness",
            name: "STAF PRINT CENTER",
            founder: { "@type": "Person", name: "Steve Aster Afovo" },
            address: { "@type": "PostalAddress", addressLocality: "Porto-Novo", addressCountry: "BJ" },
            email: "stafprintcenter@gmail.com",
            areaServed: "Bénin",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "/a-propos#" },
            ],
          },
        }),
      },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  const dark = useDarkMode();

  return (
    <SiteShell>
      {/* ============ HERO ============ */}
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
              STAF PRINT CENTER est un studio béninois : une équipe, des machines
              et un savoir-faire réunis sous le même toit pour donner une forme
              physique à vos idées — une carte, une bâche, un stand, une marque
              entière.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tools/appointment"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
              >
                Prendre rendez-vous à l'atelier <ArrowRight size={16} />
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary"
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
                  alt="L'atelier de production STAF PRINT CENTER"
                  width={1600}
                  height={912}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-bold text-primary">
                  <Counter to={480} suffix="+" />
                </p>
                <p className="text-xs text-muted-foreground">projets livrés</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ============ CHIFFRES ============ */}
      <section className="container-x pt-14">
        <Reveal>
          <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 sm:grid-cols-2 lg:grid-cols-4 md:p-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-display text-4xl font-bold text-gradient-brand">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ HISTOIRE ============ */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Notre histoire
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
              Une imprimerie née sur place, <span className="text-gradient-brand">pas importée.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Nous avons grandi avec nos clients : chaque machine est arrivée
              parce qu'un projet l'exigeait, et chaque compétence s'est ajoutée
              pour répondre à une demande réelle du quartier, puis de la ville.
            </p>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <MapPin size={16} /> Voir l'atelier sur la carte
            </a>
          </Reveal>

          <div className="relative pl-8">
            <div className="absolute bottom-2 left-1.75 top-2 w-px bg-border" />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="relative pb-10 last:pb-0">
                  <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {t.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARC MACHINES ============ */}
      <section className="border-y border-border bg-muted/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Le parc machines
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
              Ce dont nous disposons, <span className="text-gradient-brand">ici, pas en transit.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Rien n'est sous-traité à l'autre bout du monde : vos supports sont
              imprimés, découpés et finis dans le même atelier, ce qui nous
              permet de tenir un délai et une couleur.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MACHINES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.name} delay={i * 0.05}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold">{m.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {m.spec}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{m.usage}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <figure className="mt-12 overflow-hidden rounded-3xl border border-border">
              <img
                src={images.atGf}
                alt="Impression grand format sur vinyle à l'atelier"
                width={1200}
                height={912}
                loading="lazy"
                className="h-64 w-full object-cover object-[center_70%] md:h-96"
              />
              <figcaption className="bg-card px-6 py-4 text-sm text-muted-foreground">
                Le traceur grand format en production : 1,60 m de laize pour vos
                bâches, roll-up et habillages de vitrine.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ============ SAVOIR-FAIRE ============ */}
      <section className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src={images.atFt}
                alt="Poste de finitions : découpe, pelliculage et cartes de visite"
                width={1200}
                height={912}
                loading="lazy"
                className="h-80 w-full object-cover md:h-112"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Le poste de finitions : c'est là qu'une impression correcte devient
              un support professionnel.
            </p>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Savoir-faire local
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
                La machine compte moins <span className="text-gradient-brand">que la main qui la règle.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Un fichier mal préparé s'imprime aussi bien qu'un bon — jusqu'au
                premier contrôle. Voici ce que nos opérateurs vérifient avant
                que la presse ne démarre.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-6">
              {EXPERTISE.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.04}>
                  <li className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={15} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{e.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ PROCESSUS ============ */}
      <section className="border-y border-border bg-muted/40 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Comment nous travaillons
            </p>
            <h2 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
              Cinq étapes, aucune zone d'ombre.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-display text-3xl font-bold text-primary/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENGAGEMENTS ============ */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Nos engagements
          </p>
          <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
            Ce sur quoi vous pouvez compter.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENGAGEMENTS.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ FONDATEUR ============ */}
      <section className="container-x pb-20 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 md:p-12">
            <Quote
              size={90}
              className="absolute -right-4 -top-4 text-primary/10"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-border bg-white p-1">
                <img
                  src={dark ? images.stafMw : images.stafMc}
                  alt="Steve Aster"
                  width={88}
                  height={88}
                  loading="lazy"
                  className="h-full w-full rounded-full object-cover object-center"
                />
              </div>
              <div className="max-w-2xl">
                <p className="font-display text-xl font-semibold md:text-2xl">
                  {SITE.manager}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-primary">
                  Fondateur &amp; responsable de production
                </p>
                <p className="mt-5 text-lg italic text-muted-foreground">
                  « Mon métier, ce n'est pas de vendre des feuilles imprimées.
                  C'est de faire en sorte qu'une idée qui tient dans une tête
                  tienne aussi sur un mur, une table ou une façade. »
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="container-x pb-24">
        <div className="rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Passez voir l'atelier avant de commander.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            On vous montre les machines, les finitions et les épreuves. Vous
            repartez avec un devis clair et une date de retrait.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/tools/appointment"
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
            >
              Prendre rendez-vous <ArrowRight size={16} />
            </Link>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary"
            >
              Écrire sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
