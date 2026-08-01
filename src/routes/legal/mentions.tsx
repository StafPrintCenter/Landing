import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Server, Copyright, ShieldCheck, Cookie, Scale, Mail, Phone, MapPin, FileText, SquareActivity, Globe, User, type LucideIcon, } from "lucide-react";
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
          <Field label="Raison sociale" value={SITE.name} icon={Building2} />
          <Field label="Activité" value={SITE.activity} icon={SquareActivity} />
          <Field label="Adresse web" value={SITE.url} icon={Globe} />
          <Field label="Email" value={SITE.email} icon={Mail} />
          <Field label="Gérant" value={SITE.manager} icon={User} />
          <Field label="Adresse" value={SITE.city} icon={MapPin} />
          <Field label="Téléphone" value={SITE.phone} icon={Phone} />
          <Field label="WhatsApp" value={SITE.whatsapp} icon={Mail} />
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
          Le site est hébergé sur une infrastructure cloud sécurisée assurant la disponibilité, l'intégrité et la confidentialité des données échangées via un protocole chiffré (SSL/HTTPS).
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
          L'ensemble des éléments figurant sur ce site (marques, logos, textes, visuels, photographies, éléments graphiques, maquettes, vidéos et code source) est la propriété exclusive de <span className="font-bold">{SITE.name}</span>, sauf mention contraire.

          Toute reproduction, représentation, modification, publication, adaptation ou exploitation totale ou partielle de ces éléments, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de STAF PRINT CENTER. Toute exploitation non autorisée sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux lois en vigueur au Bénin.
        </p>
      ),
    },
    {
      id: "donnees",
      number: "04",
      icon: ShieldCheck,
      title: "Protection des données personnelles",
      content: (
        <div>
          <p>
            <span className="font-bold">{SITE.name}</span> s'engage à protéger la vie privée des utilisateurs de son site.
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Données collectées :</span>{" "}  Les informations recueillies via le formulaire de devis ou de contact (nom, e-mail, numéro de téléphone, détail du projet) sont exclusivement destinées au traitement de vos demandes commerciales et au suivi de la relation client.
            </li>
            <li>
              <span className="font-bold">Confidentialité :</span>{" "}  Vos données ne sont en aucun cas cédées, louées ou vendues à des tiers.
            </li>
            <li>
              <span className="font-bold">Droits des utilisateurs :</span>{" "} Conformément à la législation sur la protection des données personnelles en République du Bénin, vous disposez d'un droit d'accès, de rectification,
              de modification et de suppression des données qui vous concernent.
              <br />
              Pour exercer ce droit, vous pouvez nous contacter à :{" "}  <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookies",
      number: "05",
      icon: Cookie,
      title: "Gestion des Cookies",
      content: (
        <p>
          Ce site utilise des cookies strictement nécessaires à son bon fonctionnement technique (navigation, mémorisation de session, affichage). Aucun cookie publicitaire ou de suivi comportemental tiers n'est déposé sans votre accord préalable. Vous pouvez configurer votre navigateur pour bloquer ou être informé de la présence de ces cookies.
        </p>
      ),
    },
    {
      id: "droit",
      number: "06",
      icon: Scale,
      title: "Droit applicable et juridiction compétente",
      content: (
        <p>
          Le présent site ainsi que ses mentions légales sont régis par le droit béninois. En cas de litige, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux compétents de Porto-Novo seront seuls habilités à trancher le différend.
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