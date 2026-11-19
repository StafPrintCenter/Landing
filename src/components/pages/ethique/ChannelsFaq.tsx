import { ArrowUpRight, Mail, Mailbox, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ETHIQUE_FAQ, ETHIQUE_POSTAL } from "@/data/ethique";
import { SITE } from "@/data/site";
import { createEmailLink } from "@/lib/message/email";
import { withWhatsAppMessage } from "@/lib/message/whatsapp";

export function EthiqueChannelsFaq() {
  const contactMessage = [
    `Bonjour ${SITE.name},`,
    "Je souhaite contacter le référent éthique au sujet d'un signalement.",
    "Pourriez-vous m'indiquer les modalités pour transmettre les faits de manière confidentielle ?",
    "",
    "Merci.",
  ].join("\n");
  const whatsappLink = withWhatsAppMessage(SITE.whatsappLink, contactMessage);
  const emailLink = createEmailLink(
    SITE.email,
    "Demande confidentielle au référent éthique",
    contactMessage,
  );

  return (
    <section className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-24">
      <Reveal className="md:col-span-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Échange sécurisé
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
          D'autres façons de nous joindre.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Choisissez le canal qui vous convient. Vous pouvez aussi envoyer votre signalement par courrier confidentiel. WhatsApp et e-mail peuvent révéler vos coordonnées ; pour préserver votre anonymat, utilisez le formulaire de signalement.
        </p>
        <div className="mt-8 space-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary/40 hover:bg-card"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-muted-foreground">
                WhatsApp référent
              </span>
              <span className="mt-0.5 block font-semibold">{SITE.whatsapp}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
          </a>
          <a
            href={emailLink}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 transition hover:border-primary/40 hover:bg-card"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-muted-foreground">E-mail</span>
              <span className="mt-0.5 block break-all font-semibold">{SITE.email}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/70 p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mailbox className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium text-muted-foreground">
                Courrier confidentiel
              </span>
              <span className="mt-1 block text-sm leading-relaxed">{ETHIQUE_POSTAL}</span>
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="md:col-span-7">
        <div className="h-full rounded-3xl border border-border bg-linear-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Besoin d'être rassuré ?
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold">Questions fréquentes</h2>
          <div className="mt-6 space-y-3">
            {ETHIQUE_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border/80 bg-card/80 p-5 transition open:bg-card"
              >
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
