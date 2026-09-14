import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Home,
  Printer,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Paper grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 paper-grid opacity-30"
      />

      {/* Decorative registration marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-6 hidden text-muted-foreground/40 sm:block"
      >
        <div className="h-5 w-5 border-l border-t" />
        <div className="absolute left-2.5 top-2.5 h-0.5 w-2 bg-muted-foreground/40" />
        <div className="absolute left-3.5 top-1 h-2 w-0.5 bg-muted-foreground/40" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 hidden text-muted-foreground/40 sm:block"
      >
        <div className="h-5 w-5 border-r border-t" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Left: editorial message */}
          <section>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
                <Printer className="h-4 w-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-bold tracking-tight">
                  STAF PRINT CENTER
                </p>
                <p className="text-[10px] text-muted-foreground">
                  L’empreinte de votre succès
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                PAGE HORS FORMAT · 404
              </p>

              <h1 className="mt-5 max-w-2xl font-display text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl">
                Cette page
                <br />
                <span className="text-muted-foreground">
                  est sortie
                </span>{" "}
                du cadre.
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                L’adresse que vous recherchez ne correspond à aucune page
                de notre site. Elle a probablement été déplacée, renommée
                ou simplement décidé de prendre quelques vacances.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Revenir à l’accueil
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Page précédente
                </Button>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-4 font-mono text-[9px] text-muted-foreground">
              <span>STAF / 404</span>
              <span className="h-px w-12 bg-border" />
              <span>PAGE_NOT_FOUND</span>
            </div>
          </section>

          {/* Right: oversized print sheet */}
          <section className="relative flex items-center justify-center">
            {/* Crop marks */}
            <div className="absolute -left-3 -top-3 h-8 w-8 border-l border-t border-muted-foreground/40" />
            <div className="absolute -right-3 -top-3 h-8 w-8 border-r border-t border-muted-foreground/40" />
            <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b border-l border-muted-foreground/40" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b border-r border-muted-foreground/40" />

            {/* Paper */}
            <div className="relative aspect-[0.78] w-full max-w-105 rotate-3 border border-border bg-card p-6 shadow-2xl sm:p-8">
              {/* Bleed area */}
              <div className="absolute inset-5 border border-dashed border-primary/20" />

              {/* Top metadata */}
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="font-mono text-[8px] tracking-widest text-muted-foreground">
                    PRINT / DOCUMENT
                  </p>

                  <p className="mt-1 text-[10px] font-semibold">
                    STAF PRINT CENTER
                  </p>
                </div>

                <div className="text-right font-mono text-[8px] text-muted-foreground">
                  <p>FORMAT</p>
                  <p className="text-foreground">404 × 404</p>
                </div>
              </div>

              {/* Main typography */}
              <div className="relative flex h-[62%] flex-col justify-center">
                <p className="font-mono text-[9px] tracking-[0.25em] text-primary">
                  ERROR / PAGE
                </p>

                <div className="relative mt-2">
                  <span className="absolute -left-2 top-1/2 h-px w-[115%] -rotate-6 bg-primary/30" />

                  <span className="relative font-display text-[clamp(7rem,18vw,10rem)] font-black leading-none -tracking-widest">
                    404
                  </span>
                </div>

                <p className="mt-3 max-w-62.5 text-sm font-semibold leading-tight">
                  Votre page semble avoir été coupée au mauvais endroit.
                </p>
              </div>

              {/* Fake artwork */}
              <div className="relative mt-auto">
                <div className="grid grid-cols-3 gap-1">
                  <div className="h-1 bg-foreground/20" />
                  <div className="h-1 bg-primary/50" />
                  <div className="h-1 bg-foreground/20" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[7px] text-muted-foreground">
                      COLOR PROFILE
                    </p>
                    <p className="font-mono text-[8px]">
                      CMYK / 300 DPI
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <span className="h-4 w-4 rounded-full border border-border bg-foreground" />
                    <span className="h-4 w-4 rounded-full border border-border bg-primary/60" />
                    <span className="h-4 w-4 rounded-full border border-border bg-muted" />
                  </div>
                </div>
              </div>

              {/* Technical annotations */}
              <span className="absolute -right-12 top-1/3 hidden rotate-90 font-mono text-[7px] tracking-widest text-muted-foreground sm:block">
                BLEED 3 MM
              </span>

              <span className="absolute -left-14 bottom-1/4 hidden -rotate-90 font-mono text-[7px] tracking-widest text-muted-foreground sm:block">
                CROP MARK
              </span>

              {/* Fold shadow */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_47%,hsl(var(--border)/0.15)_50%,transparent_53%)]" />
            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 -right-2 rotate-3 border border-border bg-background px-4 py-3 shadow-lg sm:-right-5">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-3 w-3 text-primary" />
                <span className="font-mono text-[9px] font-semibold">
                  RETOUR AU PLAN DE TRAVAIL
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom technical line */}
      <footer className="absolute bottom-0 left-0 right-0 border-t border-border/60 bg-background/70 px-5 py-3 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[8px] text-muted-foreground">
          <span>STAF PRINT CENTER</span>

          <div className="hidden items-center gap-4 sm:flex">
            <span>PORTO-NOVO · BÉNIN</span>
            <span>HTTP 404</span>
            <span>PAGE_NOT_FOUND</span>
          </div>

          <a
            href="#"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <span>SPC</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}