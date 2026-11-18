import { ArrowRight, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/data/site";

export function EthiqueHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Canal confidentiel - Tolérance zéro corruption
          </span>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
            Dispositif de signalement éthique &amp; droit d'alerte
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {SITE.name} refuse toute forme de corruption, de fraude ou d'arrangement occulte. Si
            vous êtes témoin d'un manquement, vous pouvez nous le signaler en toute sécurité, de
            manière anonyme si vous le souhaitez.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#formulaire"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
            >
              Faire un signalement <ArrowRight size={16} />
            </a>
            <a
              href="#cadre"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary"
            >
              Notre cadre de référence
            </a>
          </div>

          <blockquote className="mt-10 max-w-2xl border-l-4 border-primary pl-5 text-foreground/80 italic">
            « L'intégrité est la base de la confiance que nos clients nous accordent. Aucun contrat
            ne vaut une compromission. »
            <footer className="mt-2 text-sm not-italic font-semibold text-foreground">
              - {SITE.manager}, Fondateur &amp; responsable de production
            </footer>
          </blockquote>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-[5%] rounded-full border border-primary/15" />
            <div className="absolute inset-[13%] rounded-full border border-dashed border-accent/40" />
            <div className="absolute inset-[20%] rounded-full bg-linear-to-br from-primary/15 via-card/70 to-accent/20 shadow-2xl backdrop-blur-sm" />
            <div className="absolute inset-[27%] grid place-items-center rounded-full border border-border/70 bg-card/80 shadow-xl backdrop-blur">
              <div className="grid h-32 w-32 place-items-center rounded-[2rem] bg-linear-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 md:h-36 md:w-36">
                <ShieldCheck className="h-20 w-20" strokeWidth={1.4} />
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-[22%] flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <EyeOff className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Anonymat au choix</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[18%] right-0 flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-primary">
                <Lock className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Échange confidentiel</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
