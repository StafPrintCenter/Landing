import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { Pagination } from "@/components/site/Pagination";
import { SITE } from "@/data/site";
import { JOB_CONTRACT_TYPES } from "@/data/jobs";
import { useJobOffersStore } from "@/stores/useJobsStore";
import {
  CareersHomeHeader,
  CareersHomeFilters,
  CareersHomeResultsCount,
  CareersHomeGrid,
} from "@/components/pages/careers/home";

const searchSchema = z.object({
  contractType: z.enum(["", ...JOB_CONTRACT_TYPES] as [string, ...string[]]).catch("").default(""),
  query: z.string().catch("").default(""),
  page: z.number().catch(1).default(1),
  perPage: z.number().catch(9).default(9),
});

export const Route = createFileRoute("/careers/offers/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: `Carrières | ${SITE.name}` },
      { name: "description", content: `Découvrez les offres d'emploi ouvertes chez ${SITE.name} et postulez en ligne.` },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { contractType, query, page, perPage } = useSearch({ from: "/careers/offers/" });
  const navigate = useNavigate({ from: "/careers/offers/" });

  const { offers, meta, isLoading } = useJobOffersStore({
    contractType: contractType as any,
    query,
    page,
    perPage,
  });

  const [uiLoading, setUiLoading] = useState(false);
  useEffect(() => {
    setUiLoading(true);
    const t = setTimeout(() => setUiLoading(false), 300);
    return () => clearTimeout(t);
  }, [contractType, query, page, perPage]);

  const updateSearch = (params: Partial<z.infer<typeof searchSchema>>) => {
    navigate({
      search: (prev) => {
        const nextPage = params.page !== undefined ? params.page : 1;
        return { ...prev, ...params, page: nextPage };
      },
      replace: true,
    });
  };

  return (
    <SiteShell>
      <section className="container-x py-16">
        <CareersHomeHeader />

        <CareersHomeFilters
          contractType={contractType as any}
          onContractTypeChange={(v) => updateSearch({ contractType: v })}
        />

        <CareersHomeResultsCount count={meta?.total ?? offers.length} isLoading={uiLoading || isLoading} />

        <CareersHomeGrid isLoading={uiLoading || isLoading} offers={offers} />

        {!uiLoading && !isLoading && meta && meta.last_page > 1 && (
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={(p) => updateSearch({ page: p })}
            meta={meta}
          />
        )}
      </section>
    </SiteShell>
  );
}