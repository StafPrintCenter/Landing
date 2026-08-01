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
      title: "Collecte des données personnelles et de projets",
      content: (
        <div>
          <p>
            Nous collectons les informations que vous nous fournissez volontairement lors de l'utilisation de nos services (formulaire de contact, demande de devis via e-mail/WhatsApp, inscription à une formation ou création de compte client) :
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Données d'identification & contact :</span>{" "}  Nom, prénom, adresse e-mail, numéro de téléphone, nom de l'entreprise.
            </li>
            <li>
              <span className="font-bold">Fichiers & Contenus de projet :</span>{" "}  Fichiers sources, identités visuelles, codes sources, images, maquettes et documents transmis pour l'exécution d'une commande (impression, site web, vidéo, etc.).
            </li>
            <li>
              <span className="font-bold">Données de suivi de formation :</span>{" "} Informations nécessaires à l'organisation et au suivi pédagogique des apprenants
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "finalites",
      number: "02",
      icon: Target,
      title: "Finalités et bases légales du traitement",
      content: (
        <div>
          <p>Vos données sont strictement utilisées pour :</p>

          <ol className="list-decimal pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">La gestion de vos commandes :</span>{" "}  Établissement des devis, facturation, suivi de production et livraison des travaux d'impression ou digitaux.
            </li>
            <li>
              <span className="font-bold">Le suivi pédagogique :</span>{" "} Inscription, communication et accompagnement des apprenants aux formations.
            </li>
            <li>
              <span className="font-bold">Le support & la relation client :</span>{" "} Réponse à vos questions, assistance technique et suivi après-vente.
            </li>
            <li>
              <span className="font-bold">L'amélioration de nos services  :</span>{" "} Analyses internes pour optimiser nos prestations et la navigation sur notre site.
            </li>
          </ol>
        </div>
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
      description={`Chez ${SITE.name}, nous attachons une importance capitale à la protection de vos données personnelles et à la confidentialité de vos projets créatifs. Cette politique détaille comment nous collectons, utilisons, stockons et protégeons vos informations.`}
      lastUpdated="30 juin 2026"
      sections={getSections()}
      contactQuestion="Une question sur la gestion de vos données personnelles ?"
    />
  );
}