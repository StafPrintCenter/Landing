import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import type { APIService } from "@/data/services";
import type { APIEcosystemSite } from "@/data/ecosystem";

interface FooterResourceColumnsProps {
  services: APIService[];
  ecosystems: APIEcosystemSite[];
  isLoadingServices: boolean;
  isLoadingEcosystems: boolean;
  hasMoreServices: boolean;
  hasMoreEcosystems: boolean;
}

const SKELETON_WIDTHS = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-4/5", "w-3/5"];

function FooterLinkSkeleton({ width, hasExternalIcon = false }: { width: string; hasExternalIcon?: boolean }) {
  return (
    <span className="flex w-full items-center gap-1.5" aria-hidden="true">
      <span className={`h-4 ${width} animate-pulse rounded bg-secondary-foreground/20`} />
      {hasExternalIcon && <span className="h-3 w-3 shrink-0 animate-pulse rounded-sm bg-secondary-foreground/20" />}
    </span>
  );
}

export function FooterResourceColumns({
  services,
  ecosystems,
  isLoadingServices,
  isLoadingEcosystems,
  hasMoreServices,
  hasMoreEcosystems,
}: FooterResourceColumnsProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
          Navigation
        </h4>
        <ul className="mt-4 space-y-2 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <a href={link.to} className="hover:text-accent transition-colors">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/about" className="hover:text-accent transition-colors">
              A propos
            </Link>
          </li>
          <li>
            <Link to="/careers/offers" className="hover:text-accent transition-colors">
              Offre d'emploi
            </Link>
          </li>
        </ul>
      </div>

      <div className="w-full min-w-0">
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
          Services
        </h4>
        <ul aria-busy={isLoadingServices} className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
          {isLoadingServices
            ? SKELETON_WIDTHS.map((width, index) => (
                <li key={`service-skeleton-${index}`} className="min-w-0">
                  <FooterLinkSkeleton width={width} />
                </li>
              ))
            : services.map((service, index) => (
                <li key={`${service.slug}-${index}`} className="min-w-0">
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="block truncate transition-colors hover:text-accent"
                    title={service.title}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
          {!isLoadingServices && hasMoreServices && (
            <li>
              <Link
                to="/services"
                search={{
                  category: "all",
                  sortBy: "default",
                  sortDir: "asc",
                  query: "",
                  page: 1,
                  perPage: 9,
                }}
                className="text-accent hover:underline"
              >
                Plus ...
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="w-full min-w-0">
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">
          Écosystème
        </h4>
        <ul aria-busy={isLoadingEcosystems} className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
          {isLoadingEcosystems
            ? SKELETON_WIDTHS.map((width, index) => (
                <li key={`ecosystem-skeleton-${index}`} className="min-w-0">
                  <FooterLinkSkeleton width={width} hasExternalIcon />
                </li>
              ))
            : ecosystems.map((site, index) => (
                <li key={`${site.id || site.url}-${index}`} className="min-w-0">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-1.5 truncate transition-colors hover:text-accent"
                    title={site.name}
                  >
                    <span className="truncate">{site.name}</span>
                    <ExternalLink size={12} className="shrink-0 text-secondary-foreground/50" />
                  </a>
                </li>
              ))}
          {!isLoadingEcosystems && hasMoreEcosystems && (
            <li>
              <Link to="/tools/ecosystem" className="text-accent hover:underline">
                Voir tout ...
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
