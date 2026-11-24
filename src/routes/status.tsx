import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import { StatusOverview, ServiceGrid, StatusHistory } from "@/components/pages/status";
import { useHealthHistory, useHealthStatus } from "@/stores/useHealthStore";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: `État des services | ${SITE.name}` },
      { name: "description", content: "Consultez l'état actuel et l'historique des services de l'API SPC." },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const current = useHealthStatus();
  const history = useHealthHistory(100);

  return (
    <SiteShell>
      <section className="container-x py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Infrastructure</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">État des services</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Surveillance des composants essentiels de l'écosystème SPC.
        </p>

        <div className="mt-10 space-y-8">
          {current.isLoading ? (
            <div className="h-36 animate-pulse rounded-2xl border border-border bg-card" />
          ) : current.health ? (
            <>
              <StatusOverview status={current.health.status} checkedAt={current.health.checkedAt} />
              <ServiceGrid services={current.health.services} />
            </>
          ) : (
            <StatusOverview status="degraded" />
          )}

          <div className="pt-4">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-semibold">Historique - 30 derniers jours</h2>
                <p className="mt-1 text-sm text-muted-foreground">Survolez une date ou sélectionnez-la pour consulter les détails.</p>
              </div>
            </div>

            {history.isError ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-600">
                Impossible de charger l'historique des services.
              </p>
            ) : (
              <StatusHistory checks={history.checks} isLoading={history.isLoading} />
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
