import { Mail } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function NewsletterHeader() {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Mail size={14} /> Newsletter
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
          La newsletter STAF PRINT CENTER
        </h1>
        <p className="mt-3 text-muted-foreground">
          Une fois par mois. Zéro spam. Des idées concrètes pour faire rayonner votre marque.
        </p>
      </div>
    </Reveal>
  );
}