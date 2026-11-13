import { SITE } from "@/data/site";

export function FooterCopyright() {
  return (
    <div className="border-t border-white/10">
      <div className="container-x flex flex-col items-center justify-center gap-3 py-5 text-xs text-secondary-foreground/60 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name} - Tous droits réservés.</p>
        <p>{SITE.slogan}</p>
      </div>
    </div>
  );
}
