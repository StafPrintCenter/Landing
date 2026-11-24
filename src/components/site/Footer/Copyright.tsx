import { SITE } from "@/data/site";
import { Link } from "@tanstack/react-router";
import { useHealthStatus, normalizeHealthStatus } from "@/stores/useHealthStore";
import { StatusDot } from "@/components/pages/status";

export function FooterCopyright() {
  const { health, isLoading, isError } = useHealthStatus();
  const status = health ? normalizeHealthStatus(health.status) : "degraded";
  const label = isLoading ? "Vérification..." : isError ? "État indisponible" : status === "operational"
    ? "Tous les services opérationnels"
    : status === "partially"
      ? "Services partiellement dégradés"
      : "Services dégradés";

  return (
    <div className="border-t border-white/10">
      <div className="container-x flex flex-col items-center justify-center gap-3 py-5 text-xs text-secondary-foreground/60 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {SITE.name} - Tous droits réservés.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <p>{SITE.slogan}</p>
          <Link to="/status" className="inline-flex items-center gap-2 hover:text-secondary-foreground">
            {!isLoading && !isError && <StatusDot status={status} />}
            {isLoading && <span className="h-2 w-2 rounded-full bg-secondary-foreground/40" />}
            {isError && <span className="h-2 w-2 rounded-full bg-red-500" />}
            <span>État des services</span>
            <span aria-hidden>·</span>
            <span>{label}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
