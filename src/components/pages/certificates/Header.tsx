import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function CertificateHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <BadgeCheck size={14} /> Vérification
        </span>
        <h1 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight">
          Authenticité d'un certificat
        </h1>
        <p className="mt-3 text-muted-foreground">
          Résultat de la vérification du certificat délivré par notre centre de formation.
        </p>
      </div>
    </Reveal>
  );
}