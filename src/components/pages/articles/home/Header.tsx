import { Reveal } from "@/components/site/Reveal";

export function ArticleHomeHeader() {
  return (
    <Reveal>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Blog</p>
      <h1 className="mt-2 font-display text-5xl font-bold md:text-6xl">Le carnet du studio.</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Conseils pratiques, retours d'expérience et tendances autour du design,
        de l'impression et du web.
      </p>
    </Reveal>
  );
}
