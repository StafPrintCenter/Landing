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
          L'ensemble des éléments figurant sur ce site (marques, logos, textes, visuels, photographies, éléments graphiques, maquettes, vidéos et code source) est la propriété exclusive de <span className="font-bold">{SITE.name}</span>, sauf mention contraire. <br />

          Toute reproduction, représentation, modification, publication, adaptation ou exploitation totale ou partielle de ces éléments, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de {SITE.name}. <br />
          Toute exploitation non autorisée sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux lois en vigueur au Bénin.
        </p>
      ),
    },
    {
      id: "donnees",
      number: "04",
      icon: ShieldCheck,
      title: "Protection des données personnelles",
      content: (
        <div className="space-y-4">
          <p>
            <span className="font-bold">{SITE.name}</span> s'engage à protéger la vie privée des utilisateurs de ses services et plateformes.
          </p>

          <ul className="list-disc space-y-4 pl-5">
            <li>
              <span className="font-bold">Données directement fournies :</span>{" "}
              Les informations recueillies via les formulaires (demande de devis, prise de contact, avis, inscription à une formation ou candidature) telles que vos nom, prénom, adresse e-mail, numéro de téléphone et informations relatives à votre projet sont utilisées exclusivement pour traiter votre demande, assurer le suivi de la relation client et gérer nos activités de recrutement.
            </li>
            <li>
              <span className="font-bold">Données de navigation et de redirection :</span>{" "}
              Lors de l'utilisation de notre site internet ou de notre service de réduction de liens{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
                <a href="https://go.stafprint.com" target="_blank" rel="noopener noreferrer" className="text-primary no-underline hover:underline">go.stafprint.com</a>
              </code>
              , certaines informations techniques sont collectées automatiquement à des fins de mesure d'audience, d'analyse statistique et d'amélioration de nos services.

              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Horodatage précis des vues, clics et redirections.</li>
                <li>Pays et ville estimés à partir de l'adresse IP.</li>
                <li>Type d'appareil utilisé (ordinateur, tablette ou mobile).</li>
                <li>Système d'exploitation et navigateur web.</li>
                <li>Version du navigateur.</li>
                <li>URL de provenance (Referer).</li>
                <li>URL de destination de la redirection.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Confidentialité :</span>{" "}
              Les données collectées sont exclusivement utilisées par {SITE.name}. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales.
            </li>
            <li>
              <span className="font-bold">Droits des utilisateurs :</span>{" "}
              Conformément à la législation applicable en République du Bénin relative à la protection des données personnelles, vous disposez d'un droit d'accès, de rectification, de mise à jour, d'opposition et de suppression de vos données.
              <br /> <br />

              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante :{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-primary underline underline-offset-4"
              >
                {SITE.email}
              </a>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "cookies",
      number: "05",
      icon: Cookie,
      title: "Gestion des Cookies et Mesure d'Audience",
      content: (
        <div className="space-y-4">
          <p>
            Afin d'assurer le bon fonctionnement du site et de mesurer l'utilisation de nos services, nous utilisons exclusivement des technologies nécessaires au fonctionnement de la plateforme et à la production de statistiques internes.
          </p>

          <ul className="list-disc space-y-4 pl-5">
            <li>
              <span className="font-bold">Cookies techniques :</span>{" "}
              Ce site utilise des cookies strictement nécessaires à son bon fonctionnement technique (navigation, mémorisation de session, affichage).
            </li>

      <li>
        <span className="font-bold">Suivi des annonces et widgets :</span>{" "}
        Afin de mesurer l'efficacité de nos communications internes (notifications, bannières d'information, offres d'emploi et autres widgets), nous enregistrons le nombre de vues, de clics et de fermetures de ces éléments d'affichage. Ces mesures sont réalisées sans déposer de cookies publicitaires tiers ni mettre en œuvre un suivi comportemental à des fins marketing.
      </li>

      <li>
        <span className="font-bold">Configuration :</span>{" "}
        Vous pouvez configurer votre navigateur afin de bloquer les cookies ou d'être informé lorsqu'un cookie est enregistré sur votre appareil. Le refus de certains cookies techniques peut toutefois affecter le bon fonctionnement de certaines fonctionnalités du site.
      </li>
    </ul>
  </div>
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