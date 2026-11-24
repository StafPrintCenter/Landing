import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { SITE } from "@/data/site";
import { SiteShell } from "@/components/site/SiteShell";
import { Pagination } from "@/components/site/Pagination";
import { StatusOverview, ServiceGrid, StatusHistory } from "@/components/pages/status";
import { useHealthHistory, useHealthStatus, normalizeHealthStatus, type HealthStatus } from "@/stores/useHealthStore";

const statusSearchSchema = z.object({
  status: z.enum(["all", "operational", "partially", "degraded"]).catch("all").default("all"),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(10).default(10),
});

export const Route = createFileRoute("/status")({
  validateSearch: zodValidator(statusSearchSchema),
  head: () => ({
    meta: [
      { title: `État des services | ${SITE.name}` },
      { name: "description", content: "Consultez l'état actuel et l'historique des services de l'API SPC." },
    ],
  }),
  component: StatusPage,
});

function StatusPage() {
  const { status, page, perPage } = useSearch({ from: "/status" });
  const navigate = useNavigate({ from: "/status" });
  const current = useHealthStatus();
  const history = useHealthHistory(100);

  const filtered = status === "all"
    ? history.checks
    : history.checks.filter((check) => normalizeHealthStatus(check.status) === status);
  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  const displayed = filtered.slice(start, start + perPage);

  const updateSearch = (params: Partial<z.infer<typeof statusSearchSchema>>) => {
    navigate({
      search: (prev) => ({ ...prev, ...params, page: params.page ?? 1 }),
      replace: true,
    });
  };

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
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Historique - 30 derniers jours</h2>
                <p className="mt-1 text-sm text-muted-foreground">{filtered.length} contrôle(s)</p>
              </div>
              <select
                value={status}
                onChange={(event) => updateSearch({ status: event.target.value as HealthStatus | "all" })}
                className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
                aria-label="Filtrer l'historique par état"
              >
                <option value="all">Tous les états</option>
                <option value="operational">Opérationnel</option>
                <option value="partially">Partiellement dégradé</option>
                <option value="degraded">Dégradé</option>
              </select>
            </div>

            {history.isError ? (
              <p className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-red-600">
                Impossible de charger l'historique des services.
              </p>
            ) : (
              <StatusHistory checks={displayed} isLoading={history.isLoading} />
            )}

            {filtered.length > 0 && (
              <Pagination
                currentPage={safePage}
                lastPage={lastPage}
                onPageChange={(nextPage) => updateSearch({ page: nextPage })}
                meta={{ from: start + 1, to: Math.min(start + perPage, filtered.length), total: filtered.length }}
              />
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
