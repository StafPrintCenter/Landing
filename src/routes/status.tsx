import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import {
  ServiceGrid,
  ServiceGridSkeleton,
  StatusHistory,
  StatusOverview,
  StatusOverviewSkeleton,
} from "@/components/pages/status";
import { useHealthHistory, useHealthServices, useHealthStatus } from "@/stores/useHealthStore";

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
  const serviceDetails = useHealthServices();
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
            <StatusOverviewSkeleton />
          ) : current.health ? (
            <StatusOverview status={current.health.status} checkedAt={current.health.checkedAt} />
          ) : (
            <StatusOverview status="degraded" />
          )}

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">Détail des services</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Disponibilité et contrôles sur les {serviceDetails.periodDays ?? 30} derniers jours.
                {serviceDetails.from && serviceDetails.to && (
                  <> Du {new Intl.DateTimeFormat("fr-FR").format(new Date(`${serviceDetails.from}T12:00:00`))} au {new Intl.DateTimeFormat("fr-FR").format(new Date(`${serviceDetails.to}T12:00:00`))}.</>
                )}
              </p>
            </div>
            {serviceDetails.isError ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-600">
                Impossible de charger le détail des services.
              </p>
            ) : serviceDetails.isLoading ? (
              <ServiceGridSkeleton />
            ) : (
              <ServiceGrid services={serviceDetails.services} />
            )}
          </div>

          <div className="pt-4">
            <div className="mb-5">
              <div>
                <h2 className="text-2xl font-semibold">
                  Historique des 30 derniers jours
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Survolez une date ou sélectionnez-la pour consulter les détails.
                </p>
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
