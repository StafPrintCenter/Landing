import { createFileRoute } from "@tanstack/react-router";
import { Building2, Server, Copyright, ShieldCheck, Cookie, Scale, Mail, Phone, MapPin, FileText, type LucideIcon, } from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/pages/legal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/legal/mentions")({
  head: () => ({
    meta: [
      { title: `Mentions légales | ${SITE.name}` },
      { name: "description", content: `Mentions légales et informations éditeur du site ${SITE.name}` },
    ],
  }),
  component: MentionsPage,
});

function Field({ label, value, icon: Icon }: { label: string; value: string; icon?: LucideIcon }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
        {Icon && <Icon size={14} className="shrink-0 text-primary" />}
        {value}
      </dd>
    </div>
  );
}

function getSections(): LegalSection[] {
  return [
    {
      id: "editeur",
      number: "01",
      icon: Building2,
      title: "Éditeur du site",
      content: (
        <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <Field label="Raison sociale" value={SITE.name} />
          <Field label="Activité" value={SITE.activity} />
          <Field label="Gérant" value={SITE.manager} />
          <Field label="Adresse" value={SITE.city} icon={MapPin} />
          <Field label="Téléphone" value={SITE.phone} icon={Phone} />
          <Field label="Email" value={SITE.email} icon={Mail} />
        </dl>
      ),
    },
    {
      id: "hebergement",
      number: "02",
      icon: Server,
      title: "Hébergement",
      content: (
        <p>
          Ce site est hébergé sur une infrastructure cloud sécurisée, garantissant disponibilité et protection des données échangées via une connexion chiffrée (HTTPS).
        </p>
      ),
    },
    {
      id: "propriete",
      number: "03",
      icon: Copyright,
      title: "Propriété intellectuelle",
      content: (
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, vidéos, logos, identité visuelle) sont la propriété exclusive de {SITE.name}, sauf mention contraire explicite. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et pourra donner lieu à des poursuites.
        </p>
      ),
    },
    {
      id: "donnees",
      number: "04",
      icon: ShieldCheck,
      title: "Données personnelles",
      content: (
        <p>
          Les informations collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes et assurer le suivi de votre dossier. Elles ne sont ni revendues ni transmises à des tiers, et sont conservées pour la durée strictement nécessaire au traitement de votre demande. Vous pouvez à tout moment demander leur consultation ou leur suppression en nous contactant.
        </p>
      ),
    },
    {
      id: "cookies",
      number: "05",
      icon: Cookie,
      title: "Cookies",
      content: (
        <p>
          Ce site peut utiliser des cookies techniques strictement nécessaires à son fonctionnement (préférence d'affichage, mémorisation de session). Aucun cookie publicitaire ou de traçage tiers n'est déposé sans votre consentement préalable.
        </p>
      ),
    },
    {
      id: "droit",
      number: "06",
      icon: Scale,
      title: "Droit applicable",
      content: (
        <p>
          Le présent site et les présentes mentions légales sont soumis au droit béninois. En cas de litige, et après tentative de résolution amiable, les tribunaux compétents de Porto-Novo seront seuls saisis.
        </p>
      ),
    },
  ];
}

function MentionsPage() {
  return (
    <LegalLayout
      icon={FileText}
      badge="Document officiel"
      title="Mentions légales"
      description={`Les informations légales relatives à l'édition, l'hébergement et l'utilisation du site ${SITE.name}.`}
      lastUpdated="30 juin 2026"
      sections={getSections()}
      contactQuestion="Une question sur ces mentions légales ?"
    />
  );
}