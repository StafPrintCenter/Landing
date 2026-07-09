import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Database, Target, Lock, UserCheck, ServerCog } from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/pages/legal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: `Politique de Confidentialité | ${SITE.name}` },
      { name: "description", content: `Politique de confidentialité et protection des données personnelles de ${SITE.name}.` },
    ],
  }),
  component: ConfidentialitePage,
});

function getSections(): LegalSection[] {
  return [
    {
      id: "collecte",
      number: "01",
      icon: Database,
      title: "Collecte des données personnelles",
      content: (
        <p>
          {SITE.name} collecte certaines données personnelles transmises volontairement par ses clients et prospects, notamment via le formulaire de contact du site, les demandes de devis (email, WhatsApp) et les inscriptions aux formations. Les données concernées peuvent inclure : nom, prénom, adresse email, numéro de téléphone, nom de l'entreprise, ainsi que les fichiers sources et visuels transmis dans le cadre d'un projet.
        </p>
      ),
    },
    {
      id: "finalites",
      number: "02",
      icon: Target,
      title: "Finalités du traitement",
      content: (
        <p>
          Ces données sont exclusivement utilisées pour la gestion de la relation client, le suivi pédagogique des stagiaires inscrits aux formations, l'envoi des livrables finalisés et l'établissement des documents de facturation. Aucune donnée n'est traitée à des fins étrangères à ces finalités sans information préalable et consentement du Client.
        </p>
      ),
    },
    {
      id: "non-transmission",
      number: "03",
      icon: ShieldCheck,
      title: "Non-transmission à des tiers",
      content: (
        <p>
          {SITE.name} s'engage formellement à ne jamais vendre, louer ou céder les données personnelles de ses clients à des entreprises ou organismes tiers à des fins commerciales ou autres. Les données ne sont communiquées qu'aux seules personnes habilitées au sein du Prestataire, dans la stricte mesure nécessaire à l'exécution de la prestation commandée.
        </p>
      ),
    },
    {
      id: "droits",
      number: "04",
      icon: UserCheck,
      title: "Droits des utilisateurs",
      content: (
        <p>
          Conformément aux principes de protection des données applicables, tout Client ou prospect dispose d'un droit d'accès, de rectification, de limitation et de suppression des données le concernant. Ces droits peuvent être exercés sur simple demande écrite adressée à <span className="font-medium text-foreground">{SITE.email}</span>.
          Le Prestataire s'engage à répondre dans un délai raisonnable.
        </p>
      ),
    },
    {
      id: "securite",
      number: "05",
      icon: Lock,
      title: "Sécurité des données et des projets",
      content: (
        <p>
          L'ensemble des données personnelles ainsi que les fichiers de travail confiés par les clients (codes sources, fichiers graphiques) sont stockés sur des infrastructures cloud sécurisées, accessibles via des connexions chiffrées, afin de garantir leur confidentialité et leur intégrité. Le Prestataire met en œuvre des mesures techniques et organisationnelles raisonnables pour prévenir tout accès non autorisé, perte ou divulgation accidentelle de ces données.
        </p>
      ),
    },
    {
      id: "cookies",
      number: "06",
      icon: ServerCog,
      title: "Cookies et traçage",
      content: (
        <p>
          Ce site peut utiliser des cookies techniques strictement nécessaires à son fonctionnement (préférence d'affichage, mémorisation de session). Aucun cookie publicitaire ou de traçage tiers n'est déposé sans consentement préalable de l'utilisateur.
        </p>
      ),
    },
  ];
}

function ConfidentialitePage() {
  return (
    <LegalLayout
      icon={ShieldCheck}
      badge="Protection des données"
      title="Politique de confidentialité"
      description={`Comment ${SITE.name} collecte, utilise et protège vos données personnelles et vos fichiers de projet.`}
      lastUpdated="30 juin 2026"
      sections={getSections()}
      contactQuestion="Une question sur la gestion de vos données personnelles ?"
    />
  );
}