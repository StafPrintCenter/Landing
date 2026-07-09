import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Typewriter } from "@/components/site/Typewriter";
import { SITE } from "@/data/site";
import logo from "@/assets/logos.json";
import { createWhatsAppContactMessage, withWhatsAppMessage } from "@/lib/message/whatsapp";

const whatsappLink = withWhatsAppMessage(
  SITE.whatsappLink,
  createWhatsAppContactMessage(SITE.name)
);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -left-24 h-112 w-md rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute inset-0 bg-grain opacity-60" />
        <img
          src={logo.mc}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[min(80vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] select-none"
        />
      </div>

      <div className="absolute right-24 top-24 hidden md:block z-10">
        <motion.div
          initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="grid grid-cols-3 gap-3"
        >
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: 10, zIndex: 20, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`h-24 w-24 rounded-md ${i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-secondary" : "bg-accent"} opacity-90 cursor-pointer`}
            />
          ))}
        </motion.div>
      </div>

      <div className="container-x grid items-center gap-12 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            {SITE.city} · Depuis 2019
          </motion.div>

          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            On donne forme<br />
            à vos idées en<br />
            <span className="text-gradient-brand">
              <Typewriter words={["Design.", "Impression.", "Web.", "Vidéo.", "Formation."]} />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Studio de création basé à Porto-Novo. De la carte de visite à la
            bâche grand format, du logo au site web — un seul interlocuteur,
            une exécution irréprochable.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects"
              search={{ category: "Tout", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
            >
              Voir nos réalisations <ArrowRight size={16} />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-secondary px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-secondary-foreground"
            >
              Discuter sur WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
              <span className="ml-2 font-medium text-foreground">{SITE.opinion.stars}/5</span>
              <span>· {SITE.opinion.nb} {SITE.opinion.label}</span>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
