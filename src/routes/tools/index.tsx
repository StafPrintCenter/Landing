import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/data/site";
import { buildShareUrl } from "@/lib/share/build-share-url";
import { AVAILABLE_TOOLS } from "@/data/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: `Outils | ${SITE.name}` },
      { name: "description", content: `Retrouvez tous les outils pratiques mis à disposition par ${SITE.name} : rendez-vous, suivi de demande, newsletter et plus.` },
    ],
    links: [{ rel: "canonical", href: buildShareUrl("/tools") }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <SiteShell>
      <section className="container-x py-16">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <div className="mb-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles size={14} /> Outils
                </span>
              </div>
              <h1 className="text-3xl font-bold md:text-4xl">Outils pratiques</h1>
              <p className="mt-3 text-foreground/70">
                Découvrez les outils actuellement disponibles pour gérer vos demandes et préparer vos projets.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/70">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {AVAILABLE_TOOLS.length} outil{AVAILABLE_TOOLS.length > 1 ? "s" : ""} disponible{AVAILABLE_TOOLS.length > 1 ? "s" : ""}
            </div>
          </div>
        </Reveal>

        {/* Outils disponibles */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isExternal = Boolean(tool.href);

            const cardContent = (
              <>
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  {isExternal && (
                    <span className="text-muted-foreground/60 group-hover:text-primary transition-colors">
                      <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {tool.actionLabel} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </>
            );

            const className = "group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md";

            return tool.to ? (
              <Link key={tool.id} to={tool.to} className={className}>
                {cardContent}
              </Link>
            ) : (
              <a key={tool.id} href={tool.href} target="_blank" rel="noreferrer" className={className}>
                {cardContent}
              </a>
            );
          })}
        </div>

      </section>
    </SiteShell>
  );
}