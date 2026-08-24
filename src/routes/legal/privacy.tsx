import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Database, Target, Lock, UserCheck, ServerCog, Clock } from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/pages/legal";
import { SITE, SITE_LINK } from "@/data/site";

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
    { title: "Identifiant visiteur (spc_visitor_id)", desc: "Reconnaissance anonyme des visites récurrentes", duration: "Jusqu'au nettoyage" },
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

          <div className="mt-6">
            <h3 className="font-semibold">b. Données collectées automatiquement (Redirections & Interactions)</h3>
            <p className="mt-1">
              Lors de l'interaction avec nos liens courts{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">{SITE_LINK.shortUrl}</code>{" "} ou avec nos bannières et annonces d'information, nous collectons automatiquement certaines données techniques anonymisées ou pseudonymisées.
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

          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>
              <span className="font-bold">La gestion de vos commandes :</span>{" "} Établissement des devis, facturation, suivi de production et livraison des travaux d'impression ou digitaux (exécution contractuelle).
            </li>
            <li>
              <span className="font-bold">Le suivi pédagogique :</span>{" "} Inscription, communication et accompagnement des apprenants aux formations (exécution contractuelle).
            </li>
            <li>
              <span className="font-bold">Le support & la relation client :</span>{" "} Réponse à vos questions, assistance technique et suivi après-vente (intérêt légitime).
            </li>
            <li>
              <span className="font-bold">Le recrutement :</span>{" "} Évaluation des candidatures pour des offres d'emploi ou de stage (mesures précontractuelles).
            </li>
            <li>
              <span className="font-bold">La mesure d'audience et d'engagement :</span>{" "} Analyse des performances de nos bannières ainsi que mesure du trafic via notre service de redirection{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">{SITE_LINK.shortUrl}</code>{" "} et Google Analytics (consentement).
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: "conservation",
      number: "03",
      icon: Clock,
      title: "Durée de conservation des données",
      content: (
        <div>
          <p>Afin de respecter le principe de minimisation, vos données sont conservées pour des durées limitées :</p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Données prospects / formulaires :</span>{" "}
              Conservées pendant une durée maximale de 3 ans à compter du dernier contact.
            </li>
            <li>
              <span className="font-bold">Données clients & facturation :</span>{" "} Conservées pendant 10 ans conformément aux obligations légales et comptables.
            </li>
            <li>
              <span className="font-bold">Fichiers créatifs de projet :</span>{" "} Conservés pendant la durée de réalisation du projet, puis archivés de manière sécurisée pendant 2 ans avant suppression complète.
            </li>
            <li>
              <span className="font-bold">Données de candidatures :</span>{" "} Conservées pendant 2 ans maximum après le dernier échange.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "non-transmission",
      number: "04",
      icon: ShieldCheck,
      title: "Engagement de confidentialité et sous-traitants",
      content: (
        <div>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Aucune revente :</span>{" "} {SITE.name} s'engage formellement à ne jamais vendre, louer, échanger ou céder vos données personnelles ou vos fichiers de projet à des tiers à des fins commerciales.
            </li>
            <li>
              <span className="font-bold">Accès restreint :</span>{" "} Seuls les membres habilités de notre équipe (graphistes, imprimeurs, développeurs, formateurs) ont accès aux données strictement nécessaires à la réalisation de leur mission.
            </li>
            <li>
              <span className="font-bold">Sous-traitants techniques :</span>{" "} Vos données peuvent être hébergées ou traitées par nos prestataires de confiance : LWS (infrastructure cloud sécurisée) et Google Ireland Ltd. (Google Analytics pour la mesure d'audience anonymisée).
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "securite-donnees",
      number: "05",
      icon: Lock,
      title: "Sécurité de vos données et fichiers créatifs",
      content: (
        <div>
          <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles renforcées :</p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
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
      number: "06",
      icon: ServerCog,
      title: "Cookies, stockage local et technologies de suivi",
      content: (
        <div className="space-y-6">
          <p>
            Afin d'améliorer l'expérience utilisateur, d'assurer le bon fonctionnement technique du site et d'effectuer certaines mesures d'audience, nous utilisons les fonctionnalités de stockage de votre navigateur (<code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">localStorage</code>, <code className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[13px]">sessionStorage</code>) ainsi que des cookies lorsque cela est nécessaire.
          </p>

          <div>
            <h3 className="font-semibold">a. Stockage local de confort (localStorage)</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Ces informations sont enregistrées uniquement sur votre appareil afin de mémoriser certaines préférences et faciliter votre navigation. Elles ne sont jamais transmises à des tiers.
            </p>

            {/* VUE MOBILE */}
            <div className="mt-4 space-y-2.5 sm:hidden">
              {localStorageItems.map((item, idx) => (
                <div key={idx} className="space-y-1 rounded-xl border border-border bg-card p-3.5 shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-foreground">{item.title}</span>
                    <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* VUE DESKTOP */}
            <div className="mt-4 hidden w-full overflow-hidden rounded-xl border border-border bg-card shadow-xs sm:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Donnée / Fonction</th>
                    <th className="px-4 py-3">Finalité</th>
                    <th className="px-4 py-3">Durée</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border text-foreground">
                  {localStorageItems.map((item, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{item.title}</td>
                      <td className="px-4 py-3">{item.desc}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 rounded-xl border border-amber-300/80 bg-amber-50/80 p-3.5 text-xs leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 sm:text-sm">
              <strong>Note importante :</strong> Les fichiers joints ainsi que les cases de consentement légal ne sont jamais enregistrés dans les brouillons automatiques.
            </div>
          </div>

          <div>
            <h3 className="font-semibold">b. Stockage temporaire de session (sessionStorage)</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong>Annonces & notifications :</strong> Mémorisation des bannières et notifications fermées pendant votre session.
              </li>
              <li>
                <strong>Navigation :</strong> Restauration automatique de la position de défilement lors du retour sur une page précédente.
              </li>
              <li>
                <strong>Session de visite :</strong> Prévention des affichages multiples du module de newsletter durant une même session.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">c. Cookies tiers et mesure d'audience</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong>Google Analytics (gtag.js) :</strong> Utilisé uniquement si vous acceptez les cookies d'analyse via le bandeau. L'anonymisation de l'adresse IP est activée par défaut.
              </li>
              <li>
                <strong>Mesure d'audience interne :</strong> Les statistiques d'interaction sur <code className="rounded bg-muted px-1.5 py-0.5 text-[13px]">{SITE_LINK.shortUrl}</code> sont traitées en interne à des fins statistiques et de sécurité.
              </li>
              <li>
                <strong>Absence de traçage publicitaire :</strong> Aucun cookie de ciblage publicitaire ou de profilage commercial tiers n'est déposé sur votre appareil.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "droits",
      number: "07",
      icon: UserCheck,
      title: "Vos droits sur vos données",
      content: (
        <div>
          <p>
            Conformément au Code du numérique en République du Bénin (Loi n° 2017-20), vous disposez des droits d'accès, de rectification, de suppression ("droit à l'oubli") et d'opposition sur vos données personnelles.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Droit d’accès et de rectification :</span> Consulter ou corriger vos informations personnelles.
            </li>
            <li>
              <span className="font-bold">Droit à l’effacement :</span> Demander la suppression de vos données personnelles et fichiers de nos serveurs (hors obligations légales de conservation).
            </li>
            <li>
              <span className="font-bold">Droit d’opposition :</span> Refuser ou restreindre certains traitements de vos données.
            </li>
          </ul>

          <p className="mt-4">
            Pour exercer l'un de ces droits, contactez-nous directement par e-mail à{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary underline font-medium">
              {SITE.email}
            </a>
            . Nous traiterons votre demande dans un délai maximal de 72 heures. Vous pouvez également adresser une réclamation auprès de l'Autorité de Protection des Données Personnelles (APDP) du Bénin.
          </p>
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
      lastUpdated="21 août 2026"
      sections={getSections()}
      contactQuestion="Une question sur la gestion de vos données personnelles ?"
    />
  );
}