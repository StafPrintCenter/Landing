import { Reveal } from "@/components/site/Reveal";

export function ServiceHomeHeader() {
  return (
    <div className="relative overflow-hidden">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-6xl">
          Un studio complet, <span className="text-gradient-brand">une seule équipe.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Du concept au support imprimé, du logo au site web - des expertises
          alignées pour faire briller votre marque.
        </p>
      </Reveal>
    </div>
  );
}