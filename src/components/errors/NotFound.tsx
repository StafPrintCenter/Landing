import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, Printer, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col justify-between bg-muted/40 text-foreground select-none p-4 sm:p-6 font-mono">
      {/* Background avec grille technique */}
      <div className="pointer-events-none absolute inset-0 grid-field opacity-40" />

      {/* Header minimaliste */}
      <header className="relative z-10 mx-auto flex w-full max-w-md items-center justify-between text-xs text-muted-foreground pb-4">
        <span className="flex items-center gap-2 font-bold text-foreground">
          <Printer size={16} className="text-primary" /> STAF PRINT CENTER
        </span>
        <span className="rounded bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
          JOB_CANCELLED
        </span>
      </header>

      {/* CONTENU CENTRAL : LE TICKET DE TIRAGE */}
      <main className="relative z-10 my-auto mx-auto w-full max-w-md">

        {/* Bordure supérieure style ticket de caisse / papier imprimé */}
        <div className="h-3 w-full bg-[radial-gradient(circle,transparent_8px,#ffffff_8px)] dark:bg-[radial-gradient(circle,transparent_8px,#1e293b_8px)] bg-[length:20px_20px] bg-[position:0_-10px]" />

        {/* Corps du Ticket */}
        <div className="bg-card text-card-foreground p-6 sm:p-8 shadow-2xl border-x border-border/40">

          {/* En-tête Ticket */}
          <div className="text-center border-b-2 border-dashed border-border pb-6">
            <h1 className="font-extrabold text-2xl tracking-wider uppercase text-foreground">
              STAF PRINT CENTER
            </h1>
            <p className="text-[11px] text-muted-foreground mt-1">
              Impression Offset & Digital • Web • Training
            </p>
            <p className="text-[10px] text-muted-foreground">====================================</p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs font-bold tracking-widest uppercase">
              <AlertCircle size={14} /> TICKET 404 : INTERROMPU
            </div>
          </div>

          {/* Corps de l'erreur */}
          <div className="py-6 space-y-4 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">DATE:</span>
              <span>{new Date().toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">STATUT DE LA PAGE:</span>
              <span className="text-destructive font-bold">NON TROUVÉE (404)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">RAISON:</span>
              <span>PAGE_HORS_MATRICE</span>
            </div>

            <div className="border-t border-dashed border-border pt-4">
              <p className="text-muted-foreground leading-relaxed text-center italic">
                "Le travail d'impression n'a pas pu être finalisé. La page demandée a été retirée du plateau de tirage."
              </p>
            </div>

            {/* Code-barres simulé en CSS/Texte */}
            <div className="py-4 text-center">
              <div className="font-mono text-2xl tracking-[0.3em] font-black opacity-80 select-all">
                |||| | ||||| ||| || |||||| | |||
              </div>
              <span className="text-[10px] text-muted-foreground tracking-widest block mt-1">
                *ERR-404-STAF-PRINT*
              </span>
            </div>
          </div>

          {/* Boutons d'actions intégrés au ticket */}
          <div className="border-t-2 border-dashed border-border pt-6 space-y-2.5">
            <Button asChild size="default" className="w-full font-bold uppercase tracking-wider text-xs">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Relancer vers l'accueil
              </Link>
            </Button>

            <Button
              variant="outline"
              size="default"
              className="w-full font-bold uppercase tracking-wider text-xs"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Revenir en arrière
            </Button>
          </div>

        </div>

        {/* Bordure inférieure style papier déchiré */}
        <div className="h-3 w-full bg-[radial-gradient(circle,transparent_8px,#ffffff_8px)] dark:bg-[radial-gradient(circle,transparent_8px,#1e293b_8px)] bg-[length:20px_20px] bg-[position:0_3px]" />
      </main>

      {/* Footer minimaliste */}
      <footer className="relative z-10 mx-auto text-center text-[10px] text-muted-foreground pt-4">
        STAF PRINT CENTER © {new Date().getFullYear()} — TOUS DROITS RÉSERVÉS
      </footer>
    </div>
  );
}