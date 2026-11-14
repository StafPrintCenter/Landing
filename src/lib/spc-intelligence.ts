import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

type PageContext = readonly [pattern: RegExp, title: string, text: string];

const PAGE_CONTEXTS: PageContext[] = [
  [/^\/services\/[^/]+(?:\/|$)/, "Détail d'un service", "Découvrez les prestations, les options et les modalités de réalisation de ce service."],
  [/^\/services(?:\/|$)/, "Services", "Découvrez nos services de design, d'impression et de création numérique."],
  [/^\/trainings\/[^/]+(?:\/|$)/, "Détail d'une formation", "Consultez le programme, les objectifs et les modalités de cette formation."],
  [/^\/trainings(?:\/|$)/, "Formations", "Découvrez nos formations en design, web, impression et vidéo."],
  [/^\/articles\/[^/]+(?:\/|$)/, "Article", "Consultez nos conseils et actualités autour du design, de l'impression et du numérique."],
  [/^\/articles(?:\/|$)/, "Blog", "Parcourez les conseils, tutoriels et actualités de STAF PRINT CENTER."],
  [/^\/faqs(?:\/|$)/, "Questions fréquentes", "Trouvez des réponses à vos questions sur nos services et nos formations."],
  [/^\/projects(?:\/|$)/, "Réalisations", "Découvrez nos projets de design, d'impression et de création numérique."],
  [/^\/tools\/ressources\/[^/]+(?:\/|$)/, "Détail d'une ressource", "Consultez les informations, le contenu et les modalités d'accès à cette ressource."],
  [/^\/tools\/ressources(?:\/|$)/, "Ressources", "Explorez nos gabarits, guides et outils pour préparer vos projets."],
  [/^\/tools\/ecosystem(?:\/|$)/, "Écosystème", "Découvrez les outils et plateformes de l'écosystème STAF PRINT CENTER."],
  [/^\/tools\/appointment(?:\/|$)/, "Prendre rendez-vous", "Choisissez un créneau pour échanger avec STAF PRINT CENTER."],
  [/^\/tools\/newsletter\/preferences(?:\/|$)/, "Préférences de la newsletter", "Gérez les sujets et la fréquence des communications que vous recevez."],
  [/^\/tools\/newsletter\/unsubscribe(?:\/|$)/, "Désinscription à la newsletter", "Gérez votre désinscription de la newsletter STAF PRINT CENTER."],
  [/^\/tools\/newsletter(?:\/|$)/, "Newsletter", "Inscrivez-vous pour recevoir nos conseils, actualités et nouveautés."],
  [/^\/tools\/lookup(?:\/|$)/, "Recherche de lien court", "Retrouvez la destination d'un lien court STAF PRINT CENTER."],
  [/^\/tools(?:\/|$)/, "Outils", "Accédez aux outils et ressources proposés par STAF PRINT CENTER."],
  [/^\/tests\/devis(?:\/|$)/, "Demande de devis", "Préparez une demande de devis pour votre projet."],
  [/^\/tests\/calendar(?:\/|$)/, "Calendrier", "Consultez les dates et disponibilités de nos activités."],
  [/^\/tests\/affiliation(?:\/|$)/, "Affiliation", "Découvrez le programme d'affiliation STAF PRINT CENTER."],
  [/^\/tests(?:\/|$)/, "Espace de tests", "Découvrez les fonctionnalités en cours de test sur notre site."],
  [/^\/careers\/offers\/[^/]+\/apply(?:\/|$)/, "Candidature", "Envoyez votre candidature à une offre de STAF PRINT CENTER."],
  [/^\/careers\/offers\/[^/]+(?:\/|$)/, "Détail d'une offre", "Consultez les missions et les conditions de cette offre."],
  [/^\/careers\/offers(?:\/|$)/, "Offres d'emploi", "Consultez les offres d'emploi et opportunités chez STAF PRINT CENTER."],
  [/^\/careers\/internship\/check(?:\/|$)/, "Suivi de candidature de stage", "Vérifiez le statut de votre candidature de stage."],
  [/^\/careers\/internship(?:\/|$)/, "Stage", "Découvrez les possibilités de stage chez STAF PRINT CENTER."],
  [/^\/careers\/check-offer(?:\/|$)/, "Vérification d'une offre", "Vérifiez les informations relatives à une offre d'emploi."],
  [/^\/legal\/cgv(?:\/|$)/, "Conditions générales de vente", "Consultez les conditions générales de vente de STAF PRINT CENTER."],
  [/^\/legal\/privacy(?:\/|$)/, "Confidentialité", "Consultez notre politique de confidentialité et la gestion de vos données."],
  [/^\/legal\/mentions(?:\/|$)/, "Mentions légales", "Consultez les informations légales de STAF PRINT CENTER."],
  [/^\/legal(?:\/|$)/, "Informations légales", "Consultez les informations légales de STAF PRINT CENTER."],
  [/^\/verify-certificate\/[^/]+(?:\/|$)/, "Vérification de certificat", "Vérifiez l'authenticité d'un certificat de formation."],
  [/^\/verify-certificate(?:\/|$)/, "Vérification de certificat", "Vérifiez l'authenticité d'un certificat de formation."],
  [/^\/reviews\/[^/]+(?:\/|$)/, "Avis client", "Consultez ou partagez un avis sur votre expérience avec STAF PRINT CENTER."],
  [/^\/search(?:\/|$)/, "Recherche", "Recherchez des services, projets, formations, articles et réponses."],
  [/^\/about(?:\/|$)/, "À propos", "Découvrez STAF PRINT CENTER, notre équipe et notre approche."],
  [/^\/$/, "Accueil", "Découvrez les services, réalisations, formations et actualités de STAF PRINT CENTER."],
];

function getPageContext(pathname: string) {
  const context = PAGE_CONTEXTS.find(([pattern]) => pattern.test(pathname));
  return context
    ? { title: context[1], text: context[2] }
    : {
        title: "STAF PRINT CENTER",
        text: "Explorez nos services, réalisations, formations et ressources.",
      };
}

export function useSpcPageContext() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const context = getPageContext(pathname);
    const apply = () => window.SPCIntelligence?.setContext(() => context);
    apply();
    const timeout = window.setTimeout(apply, 1500);
    return () => window.clearTimeout(timeout);
  }, [pathname]);
}

export function askSpc(prompt: string) {
  window.SPCIntelligence?.open(prompt);
}
