export const ETHIQUE_FRAMEWORK = [
  {
    title: "Loi n° 2011-20 du 12 octobre 2011",
    text: "Loi béninoise portant lutte contre la corruption et autres infractions connexes, incluant la protection des témoins, experts, dénonciateurs et victimes."
  },
  {
    title:
      "Autorité nationale de lutte contre la corruption",
    text: "Les faits graves peuvent aussi être portés devant les autorités compétentes, notamment le Parquet spécial près la CRIET."
  },
  {
    title: "ISO 37001",
    text: "Nous nous inspirons des principes du système de management anti-corruption : tolérance zéro, diligence fournisseurs, contrôle des cadeaux et avantages."
  },
  {
    title: "ISO 37002",
    text: "Notre canal suit les lignes directrices des systèmes de lanceurs d'alerte : confiance, impartialité et protection."
  },
];

export const ETHIQUE_PILLARS = [
  {
    title: "Anonymat au choix",
    text: "Vous pouvez signaler sans donner votre nom. Aucun compte ni cookie n'est requis."
  },
  {
    title: "Confidentialité stricte"
    , text: "Seul le référent éthique désigné a accès au contenu du signalement."
  },
  {
    title: "Aucune représailles",
    text: "Toute personne de bonne foi est protégée contre sanction, licenciement ou rupture de contrat."
  },
];

export const ETHIQUE_SCOPE = [
  {
    title: "Corruption & pots-de-vin",
    text: "Commissions occultes, arrangements sur devis, appels d'offres ou marchés."
  },
  {
    title: "Fraude & surfacturation",
    text: "Faux documents, fausses factures, détournement de matériel ou de consommables."
  },
  {
    title: "Conflit d'intérêts",
    text: "Lien non déclaré avec un fournisseur, un client ou un sous-traitant."
  },
  {
    title: "Harcèlement & abus",
    text: "Abus d'autorité, harcèlement, discrimination, atteinte grave à la sécurité."
  },
];

export const ETHIQUE_CATEGORIES = [
  "Corruption active ou passive",
  "Fraude ou surfacturation",
  "Conflit d'intérêts",
  "Détournement de biens",
  "Harcèlement ou abus d'autorité",
  "Autre manquement éthique",
] as const;

export const ETHIQUE_PROCESS = [
  {
    delay: "Immédiat",
    title: "Code de suivi",
    text: "Un code unique vous est remis à l'envoi."
  },
  {
    delay: "48 h",
    title: "Accusé de réception",
    text: "Le référent confirme la prise en charge."
  },
  {
    delay: "7 jours ouvrés",
    title: "Recevabilité",
    text: "Vérification que les faits entrent dans le périmètre."
  },
  {
    delay: "30 jours max",
    title: "Enquête",
    text: "Instruction impartiale et confidentielle."
  },
  {
    delay: "Clôture",
    title: "Mesures & retour",
    text: "Mesures correctives et information du déclarant."
  },
];

export const ETHIQUE_FAQ = [
  {
    q: "Puis-je vraiment rester anonyme ?",
    a: "Oui. Ne remplissez pas les champs de contact et n'incluez aucun élément identifiant dans votre description."
  },
  {
    q: "Que se passe-t-il si je me trompe ?",
    a: "Un signalement de bonne foi, même inexact, ne peut jamais être sanctionné. Seule la dénonciation volontairement mensongère est sanctionnable."
  },
  {
    q: "Une réclamation client passe-t-elle par ici ?",
    a: "Non. Retards, réimpressions ou litiges commerciaux relèvent du service client via WhatsApp ou le formulaire de contact."
  },
];

export const ETHIQUE_POSTAL = "Pli « STRICTEMENT PERSONNEL ET CONFIDENTIEL - RÉFÉRENT ÉTHIQUE », STAF PRINT CENTER, Porto-Novo, Bénin";

export function generateTrackingCode(rand: () => number = Math.random): string {
  const n = Math.floor(rand() * 9000) + 1000;
  return `SPC-SEC-${n}`;
}
