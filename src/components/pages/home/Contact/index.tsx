import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useServicesStore } from "@/stores/useServicesStore";
import { SITE } from "@/data/site";
import { buildQuoteMessage } from "@/lib/message/quote";
import { ContactForm, type ContactInput } from "./ContactForm";
import { createWhatsAppContactMessage, withWhatsAppMessage } from "@/lib/message/whatsapp";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formInit, setFormInit] = useState({ service: "", customService: "", message: "" });
  const { services } = useServicesStore({ perPage: 100 });

  // Utilise la route "/" pour hériter du typage exact défini dans src/routes/index.tsx
  const search = useSearch({ from: "/" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!search.quote) return;

    const smoothScrollToContact = () => {
      const el = document.getElementById("contact");
      if (!el) return;
      const headerOffset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (search.quote === "autre") {
      setFormInit({
        service: "Autre",
        customService: search.custom || "",
        message: search.details || ""
      });
    } else {
      const target = (services || []).find((s) => s.slug === search.quote);
      if (target) {
        setFormInit({
          service: target.title,
          customService: "",
          message: buildQuoteMessage(target.title)
        });
      }
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(smoothScrollToContact);
    });

    navigate({
      to: "/",
      search: (prev) => {
        const { quote, details, custom, ...rest } = prev;
        return rest;
      },
      hash: "contact",
      replace: true,
    });
  }, [search.quote, search.details, search.custom, navigate, services]);

  const handleFormSubmit = async (data: ContactInput, resetForm: () => void) => {
    await new Promise((r) => setTimeout(r, 700));
    const finalService = data.service === "Autre" ? data.customService : data.service;
    console.log("Contact form submitted:", data.email, "Service:", finalService);

    setSubmitted(true);
    resetForm();
    setFormInit({ service: "", customService: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const whatsappContactLink = withWhatsAppMessage(
    SITE.whatsappLink,
    createWhatsAppContactMessage(SITE.name)
  );

  return (
    <section id="contact" className="container-x py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Parlons de votre projet.</h2>
          <p className="mt-4 text-muted-foreground">
            Un devis, une question, une formation ? Nous répondons sous 24h ouvrées, ou immédiatement sur WhatsApp.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5" size={18} />
              <a href={SITE.maps} target="_blank" rel="noreferrer" className="hover:text-primary">{SITE.city}</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-primary mt-0.5" size={18} />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-primary">{SITE.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="text-primary mt-0.5" size={18} />
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">{SITE.email}</a>
            </li>
          </ul>
          <a
            href={whatsappContactLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground"
          >
            Discuter sur WhatsApp <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm
            onSubmit={handleFormSubmit}
            submitted={submitted}
            initialValues={formInit}
          />
        </Reveal>
      </div>
    </section>
  );
}