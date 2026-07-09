import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info, Star, X, MessageSquareText } from "lucide-react";
import { useSearch, useNavigate, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SERVICE_CATEGORIES, getServiceIcon } from "@/data/services";
import { useServicesStore } from "@/stores/useServicesStore";
import { ServicesSkeleton } from "@/components/skeleton/HomeServices";

export function ServicesPreview() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const search = useSearch({ from: "/" });
  const navigate = useNavigate();

  const { services, isLoading, isError } = useServicesStore({ perPage: 100 });

  useEffect(() => {
    if (!search.service || services.length === 0) return;

    const target = services.find((s) => s.slug === search.service);
    if (!target) return;

    setExpandedSlug(target.slug);

    const scrollToCard = () => {
      const el = document.getElementById(`service-${target.slug}`);
      if (!el) return;

      const headerOffset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToCard);
    });

    navigate({ to: "/", search: {}, hash: "services", replace: true });
  }, [search.service, services]);

  const displayed = useMemo(() => {
    if (services.length === 0) return [];

    const featured = services.filter((s) => s.featured);
    const rest = services.filter((s) => !s.featured);
    const ordered = [...featured, ...rest];

    if (search.service) {
      const idx = ordered.findIndex((s) => s.slug === search.service);
      if (idx > 3) {
        const [target] = ordered.splice(idx, 1);
        ordered.unshift(target);
      }
    }

    return ordered.slice(0, 4);
  }, [search.service, services]);

  const requestQuote = (slug: string) => {
    navigate({
      to: "/",
      hash: "contact",
      search: (prev) => ({ ...prev, quote: slug }),
    });
  };

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return <ServicesSkeleton />;
  }

  if (isError) {
    return (
      <section className="container-x py-24 text-center">
        <div className="inline-block rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-8 text-destructive max-w-xl mx-auto">
          <p className="font-semibold text-lg">Oups, une erreur est survenue</p>
          <p className="mt-1 text-sm text-destructive/80">
            Impossible de charger les services populaires. Veuillez vérifier votre connexion.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="container-x py-24">
      {/* ── En-tête ── */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Nos services
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl leading-tight">
              De l'idée à l'image.{" "}
              <span className="text-primary">De l'image au monde.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tout ce qu'il faut pour faire exister votre marque, au même endroit.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Grille de Services ── */}
      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {displayed.map((s, i) => {
            const Icon = getServiceIcon(s.icon);
            const isExpanded = expandedSlug === s.slug;

            return (
              <motion.div
                key={s.slug}
                layout
                id={`service-${s.slug}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <Reveal delay={i * 0.04}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={[
                      "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300",
                      isExpanded
                        ? "border-primary bg-card shadow-xl"
                        : s.featured
                          ? "border-primary/30 bg-primary/6 hover:border-primary/50 hover:shadow-lg"
                          : "border-border bg-card hover:shadow-lg",
                    ].join(" ")}
                  >
                    {/* Ligne du Haut : Icône & Actions */}
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: s.color }}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        {s.featured && (
                          <span
                            title="Service populaire"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                          >
                            <Star size={15} className="fill-primary text-primary" />
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedSlug(isExpanded ? null : s.slug)}
                          title={isExpanded ? "Fermer les détails" : "Lire plus"}
                          className={[
                            "inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                            isExpanded
                              ? "bg-primary/20 text-primary rotate-90"
                              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                          ].join(" ")}
                        >
                          {isExpanded ? <X size={16} /> : <Info size={16} />}
                        </button>

                        <button
                          type="button"
                          onClick={() => requestQuote(s.slug)}
                          title="Demander un devis"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer"
                        >
                          <MessageSquareText size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Titre & Description */}
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {s.short}
                    </p>

                    {/* Description Longue */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="long-wrapper"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden border-t border-border/60 pt-3"
                        >
                          <p className="text-xs leading-relaxed text-foreground/80 bg-muted/30 p-2.5 rounded-lg border border-border/40">
                            {s.long}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex-1 min-h-4" />

                    {/* Pied de Carte */}
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className={[
                          "inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all duration-200",
                          "opacity-0 lg:group-hover:opacity-100 max-lg:opacity-100",
                        ].join(" ")}
                      >
                        En savoir plus
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>

                      <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {SERVICE_CATEGORIES.find((c) => c.value === s.category)?.label || s.category}
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          search={{ category: "all", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          Voir tous les services <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}