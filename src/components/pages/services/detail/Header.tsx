import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/icons/WhatsAppIcon";
import { createServiceQuoteEmailLink } from "@/lib/message/email";
import { createServiceQuoteWhatsAppLink } from "@/lib/message/whatsapp";
import { SERVICE_CATEGORIES, type APIService, getServiceIcon } from "@/data/services";

interface ServiceDetailHeaderProps {
  service: APIService;
}

export function ServiceDetailHeader({ service }: ServiceDetailHeaderProps) {
  const Icon = getServiceIcon(service.icon);

  const categoryLabel = SERVICE_CATEGORIES.find((c) => c.value === service.category)?.label || service.category;

  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container-x relative py-16 md:py-24">
        <Link
          to="/services"
          search={{ category: "all", sortBy: "default", sortDir: "asc", query: "", page: 1, perPage: 9 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground/70 transition hover:text-accent"
        >
          <ArrowLeft size={14} /> Tous les services
        </Link>

        <div className="md:max-w-xl lg:max-w-2xl">
          <div className="mt-6 flex items-center">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground/95 backdrop-blur-xs ring-1 ring-white/10">
              {categoryLabel}
            </span>
          </div>

          <div className="mt-4 flex items-start gap-5 md:hidden">
            <div
              className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
              style={{ backgroundColor: service.color }}
            >
              <Icon size={28} />
              {service.featured && (
                <span
                  title="Service populaire"
                  className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-secondary shadow-md ring-2 ring-secondary"
                >
                  <Star size={11} className="fill-secondary" />
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight">{service.title}</h1>
          </div>

          <h1 className="mt-4 hidden font-display text-5xl font-bold leading-tight md:block lg:text-6xl">
            {service.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-secondary-foreground/80 leading-relaxed">{service.long}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              hash="contact"
              search={{ quote: service.slug }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-secondary transition-transform hover:scale-[1.02]"
            >
              Demander un devis <ArrowRight size={16} />
            </Link>

            <a
              href={createServiceQuoteEmailLink(service.title)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-white/10 transition-colors"
            >
              <Mail size={16} /> Nous écrire
            </a>

            <a
              href={createServiceQuoteWhatsAppLink(service.title)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-secondary-foreground hover:bg-white/10 transition-colors"
            >
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 hidden h-40 w-40 -translate-y-1/2 items-center justify-center rounded-4xl text-white shadow-2xl md:flex lg:right-16 lg:h-56 lg:w-56"
          style={{ backgroundColor: service.color }}
        >
          <Icon size={80} />
          {service.featured && (
            <span
              title="Service populaire"
              className="pointer-events-auto absolute -right-3 -top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-secondary shadow-lg ring-4 ring-secondary lg:h-12 lg:w-12"
            >
              <Star size={20} className="fill-secondary" />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}