import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import type { APIService } from "@/data/services";
import type { APIEcosystemSite } from "@/data/ecosystem";

interface FooterResourceColumnsProps {
  services: APIService[];
  ecosystems: APIEcosystemSite[];
  hasMoreServices: boolean;
  hasMoreEcosystems: boolean;
}

export function FooterResourceColumns({
  services,
  ecosystems,
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
        <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
          {services.map((service, index) => (
            <li key={`${service.slug}-${index}`} className="min-w-0">
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="block truncate hover:text-accent transition-colors"
                title={service.title}
              >
                {service.title}
              </Link>
            </li>
          ))}
          {hasMoreServices && (
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
        <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
          {ecosystems.map((site, index) => (
            <li key={`${site.id || site.url}-${index}`} className="min-w-0">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 max-w-full truncate hover:text-accent transition-colors"
                title={site.name}
              >
                <span className="truncate">{site.name}</span>
                <ExternalLink size={12} className="shrink-0 text-secondary-foreground/50" />
              </a>
            </li>
          ))}
          {hasMoreEcosystems && (
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
