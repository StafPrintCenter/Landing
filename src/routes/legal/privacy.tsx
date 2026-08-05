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
  const localStorageItems = [
    { title: "Brouillon : Demande de devis", desc: "Sauvegarde temporaire du formulaire", duration: "6 heures" },
    { title: "Brouillon : Offre d'emploi", desc: "Sauvegarde temporaire de candidature", duration: "24 heures" },
    { title: "Brouillon : Demande de stage", desc: "Sauvegarde temporaire du formulaire", duration: "2 jours" },
    { title: "Brouillon : Déposer un avis", desc: "Sauvegarde d'un avis en cours de rédaction", duration: "3 jours" },
    { title: "Identifiant visiteur (staf_visitor_id)", desc: "Reconnaissance anonyme des visites récurrentes", duration: "Jusqu'au nettoyage" },
    { title: "Newsletter", desc: "Mémorisation de votre choix (abonné, masqué ou reporté)", duration: "Persistant" },
    { title: "Historique de recherche", desc: "Conservation des 8 dernières recherches", duration: "Persistant" },
    { title: "Consentement cookies", desc: "Mémorisation de votre choix de consentement", duration: "Persistant" },
  ];

  return [
    {
      id: "collecte",
      number: "01",
      icon: Database,
      title: "Collecte des données personnelles et de projets",
      content: (
        <div>
          <div>
            <h3 className="font-semibold">a. Données fournies volontairement</h3>
            <p className="mt-1">
              Nous collectons les informations que vous nous fournissez volontairement lors de l'utilisation de nos services (formulaire de contact, demande de devis, inscription à une formation ou création de compte client).
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="font-bold">Données d'identification & contact :</span>{" "}
                Nom, prénom, adresse e-mail, numéro de téléphone et nom de l'entreprise.
              </li>
              <li>
                <span className="font-bold">Fichiers & contenus de projet :</span>{" "}
                Fichiers sources, identités visuelles, codes sources, images, maquettes et tout document transmis dans le cadre d'une prestation.
              </li>
              <li>
                <span className="font-bold">Données de suivi de formation :</span>{" "}
                Informations nécessaires à l'inscription, à l'accompagnement pédagogique et au suivi des apprenants.
              </li>
            </ul>
          </div>
          <br />

          <div className="mt-6">
            <h3 className="font-semibold">b. Données collectées automatiquement (Redirections & Interactions)</h3>
            <p className="mt-1">
              Lors de l'interaction avec nos liens courts{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">go.stafprint.com</code>{" "}
              ou avec nos bannières et annonces d'information, nous collectons automatiquement certaines données techniques anonymisées ou pseudonymisées.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="font-bold">Données de géolocalisation :</span>{" "}
                Pays et ville d'origine déduits de l'adresse IP.
              </li>

              <li>
                <span className="font-bold">Informations sur le dispositif :</span>{" "}
                Type d'appareil (mobile ou ordinateur) et navigateur web utilisé.
              </li>

              <li>
                <span className="font-bold">
                  Données d'horodatage et de provenance :
                </span>{" "}
                Date et heure exactes des interactions ainsi que le domaine référent (Referer).
              </li>

              <li>
                <span className="font-bold">Métriques d'affichage :</span>{" "}
                Nombre de vues, clics et fermetures des annonces et bannières publiées sur le site.
              </li>
            </ul>
          </div>
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
              <span className="font-bold">La gestion de vos commandes :</span>{" "} Établissement des devis, facturation, suivi de production et livraison des travaux d'impression ou digitaux.
            </li>
            <li>
              <span className="font-bold">Le suivi pédagogique :</span>{" "} Inscription, communication et accompagnement des apprenants aux formations.
            </li>
            <li>
              <span className="font-bold">Le support & la relation client :</span>{" "} Réponse à vos questions, assistance technique et suivi après-vente.
            </li>
            <li>
              <span className="font-bold">L'amélioration de nos services :</span>{" "} Analyses internes pour optimiser nos prestations et la navigation sur notre site.
            </li>
            <li>
              <span className="font-bold">
                La mesure d'audience et d'engagement :
              </span>{" "}
              Analyse des performances de nos campagnes d'information (vues, taux de clic, fermetures des annonces) ainsi que mesure du trafic acheminé via notre service de redirection{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
                go.stafprint.com
              </code>.
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: "non-transmission",
      number: "03",
      icon: ShieldCheck,
      title: "Engagement de non-transmission et confidentialité",
      content: (
        <div>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Aucune revente :</span>{" "} {SITE.name} s'engage formellement à ne jamais vendre, louer, échanger ou céder vos données personnelles ou vos fichiers de projet à des tiers à des fins commerciales ou publicitaires.
            </li>
            <li>
              <span className="font-bold">Accès restreint :</span>{" "} Seuls les membres habilités de notre équipe (graphistes, imprimeurs, développeurs, formateurs) ont accès aux données strictement nécessaires à la réalisation de leur mission.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "securite-donnees",
      number: "04",
      icon: Lock,
      title: "Sécurité de vos données et fichiers créatifs",
      content: (
        <div>
          <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles renforcées :</p>

          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Hébergement sécurisé :</span>{" "} Vos données et fichiers sources sont stockés sur des serveurs cloud sécurisés, avec accès restreint et connexions chiffrées (SSL/HTTPS).
            </li>
            <li>
              <span className="font-bold">Confidentialité des projets :</span>{" "} Vos fichiers créatifs (maquettes, logos non publiés, éléments de marque) restent votre propriété et sont traités avec la plus stricte confidentialité pendant et après la prestation.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "stockage-local",
      number: "05",
      icon: ServerCog,
      title: "Cookies et technologies de stockage local",
      content: (
        <div className="space-y-6">
          <p>
            Afin d'améliorer l'expérience utilisateur, d'assurer le bon fonctionnement technique du site et d'effectuer certaines mesures d'audience, nous utilisons les fonctionnalités de stockage de votre navigateur (<code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">localStorage</code>, <code className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[13px]">sessionStorage</code>) ainsi que des cookies lorsque cela est nécessaire.
          </p>

          <div>
            <h3 className="font-semibold"> a. Stockage local de confort (localStorage)</h3>

            <p className="mt-2">
              Ces informations sont enregistrées uniquement sur votre appareil afin de mémoriser certaines préférences et faciliter votre navigation. Elles ne sont jamais transmises à des tiers.
            </p>

            {/* 1. VUE MOBILE : Cartes empilées sans aucun risque de débordement */}
            <div className="mt-4 space-y-2.5 sm:hidden">
              {localStorageItems.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3.5 shadow-xs space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-xs text-foreground">{item.title}</span>
                    <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 2. VUE DESKTOP : Tableau classique propre */}
            <div className="mt-4 hidden w-full overflow-hidden rounded-xl border border-border bg-card shadow-xs sm:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Donnée / Fonction</th>
                    <th className="px-4 py-3 text-left font-semibold">Finalité</th>
                    <th className="px-4 py-3 text-left font-semibold">Durée</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">Brouillon : Demande de devis</td>
                    <td className="px-4 py-3">
                      Sauvegarde temporaire du formulaire
                    </td>
                    <td className="px-4 py-3">6 heures</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Brouillon : Offre d'emploi</td>
                    <td className="px-4 py-3">
                      Sauvegarde temporaire de candidature
                    </td>
                    <td className="px-4 py-3">24 heures</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Brouillon : Demande de stage</td>
                    <td className="px-4 py-3">
                      Sauvegarde temporaire du formulaire
                    </td>
                    <td className="px-4 py-3">2 jours</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Brouillon : Déposer un avis</td>
                    <td className="px-4 py-3">
                      Sauvegarde d'un avis en cours de rédaction
                    </td>
                    <td className="px-4 py-3">3 jours</td>
                  </tr>

                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      Identifiant visiteur
                      <br />
                      <code className="text-xs font-normal text-muted-foreground">staf_visitor_id</code>
                    </td>
                    <td className="px-4 py-3">Reconnaissance anonyme des visites récurrentes</td>
                    <td className="px-4 py-3 text-muted-foreground">Jusqu'au nettoyage du navigateur</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Newsletter</td>
                    <td className="px-4 py-3">
                      Mémorisation de votre choix (abonné, masqué ou reporté)
                    </td>
                    <td className="px-4 py-3">Persistant</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Historique de recherche</td>
                    <td className="px-4 py-3">
                      Conservation des 8 dernières recherches
                    </td>
                    <td className="px-4 py-3">Persistant</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Consentement cookies</td>
                    <td className="px-4 py-3">
                      Mémorisation de votre choix de consentement
                    </td>
                    <td className="px-4 py-3">Persistant</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm dark:border-amber-900 dark:bg-amber-950/30">
              <strong>Note importante :</strong> Les fichiers joints ainsi que les cases de consentement légal ne sont jamais enregistrés dans les brouillons automatiques.
            </div>
          </div>

          <div>
            <h3 className="font-semibold">b. Stockage temporaire de session (sessionStorage)</h3>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong>Annonces & notifications :</strong> mémorisation des
                bannières et notifications fermées pendant votre session.
              </li>

              <li>
                <strong>Navigation :</strong> restauration automatique de la
                position de défilement lors du retour sur une page précédente.
              </li>

              <li>
                <strong>Session de visite :</strong> prévention des affichages
                multiples du module de newsletter durant une même session.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">c. Mesure d'audience et cookies tiers</h3>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong>Google Analytics (gtag.js) :</strong> utilisé uniquement si
                vous acceptez les cookies d'analyse. L'anonymisation de l'adresse IP
                est activée.
              </li>

              <li>
                <strong>Absence de traçage publicitaire :</strong> aucun cookie de
                ciblage publicitaire ou de profilage commercial tiers n'est déposé
                sur votre appareil.
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "droits",
      number: "06",
      icon: UserCheck,
      title: "Vos droits sur vos données",
      content: (
        <div>
          <p>Conformément à la réglementation sur la protection des données personnelles, vous disposez des droits suivants :</p>

          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              <span className="font-bold">Droit d’accès et de rectification :</span>{" "} Consulter ou corriger vos informations personnelles.
            </li>
            <li>
              <span className="font-bold">Droit à l’effacement ("Droit à l'oubli") :</span>{" "} Demander la suppression de vos données personnelles et fichiers de nos serveurs, sous réserve des obligations légales de conservation (ex. facturation).
            </li>
            <li>
              <span className="font-bold">Droit d’opposition et de limitation :</span>{" "} Refuser ou restreindre certains traitements de vos données.
            </li>
          </ul>
          <br />
          Pour exercer l'un de ces droits, contactez-nous directement par e-mail à <a href={`mailto:${SITE.email}`} className="text-primary underline">{SITE.email}</a>. Nous traiterons votre demande dans un délai maximal de 72 heures.
        </div>
      ),
    },
    {
      id: "cookies",
      number: "07",
      icon: ServerCog,
      title: "Cookies et technologies de suivi",
      content: (
        <div>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">
                Cookies strictement nécessaires :
              </span>{" "}
              Utilisés uniquement afin d'assurer le bon fonctionnement technique du site,              notamment la navigation, la mémorisation de session et l'affichage des
              préférences utilisateur.
            </li>

            <li>
              <span className="font-bold">
                Mesure d'audience interne :
              </span>{" "}
              Les statistiques relatives aux redirections effectuées via{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">
                go.stafprint.com
              </code>{" "}
              ainsi que le comptage des vues, clics et fermetures de nos annonces sont
              réalisés exclusivement à des fins statistiques internes, d'amélioration de
              nos services et de sécurité.
            </li>

            <li>
              <span className="font-bold">
                Absence de traçage tiers :
              </span>{" "}
              Aucun cookie publicitaire, outil de profilage ou dispositif de suivi comportemental tiers n'est utilisé à votre insu à des fins commerciales.
              Vous pouvez à tout moment configurer votre navigateur afin de bloquer, limiter ou supprimer les cookies enregistrés.
            </li>
          </ul>
        </div>
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