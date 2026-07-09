import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, FileSignature, Banknote, Printer, Truck, GraduationCap, Copyright, Scale, } from "lucide-react";
import { LegalLayout, type LegalSection } from "@/components/pages/legal";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/legal/cgv")({
  head: () => ({
    meta: [
      { title: `Conditions Générales de Vente | ${SITE.name}` },
      { name: "description", content: `Conditions Générales de Vente de ${SITE.name} : devis, paiement, impression, livraison et formations.` },
    ],
  }),
  component: CgvPage,
});

function getSections(): LegalSection[] {
  return [
    {
      id: "objet",
      number: "01",
      icon: ScrollText,
      title: "Objet et champ d'application",
      content: (
        <p>
          Les présentes Conditions Générales de Vente (« CGV ») régissent l'ensemble des relations contractuelles entre {SITE.name}, studio créatif basé à Porto-Novo, République du Bénin, et toute personne physique ou morale (« le Client »), professionnelle (B2B) ou particulière (B2C). Elles s'appliquent indistinctement aux trois pôles d'activité du Prestataire : Digital (design, sites internet, montage vidéo), Impression (bâches, kakémonos, cartes de visite, badges, sérigraphie) et Formation. Toute commande, quel que soit le canal utilisé (écrit, email, WhatsApp), implique
          l'adhésion sans réserve du Client aux présentes CGV.
        </p>
      ),
    },
    {
      id: "commande",
      number: "02",
      icon: FileSignature,
      title: "Processus de commande et de devis",
      content: (
        <p>
          Tout projet débute par l'émission d'un devis détaillé, valable trente (30) jours calendaires. Aucune production, conception ou réservation de créneau de formation ne débute avant validation expresse du devis par le Client, matérialisée par une signature « Bon pour accord » ou une confirmation électronique écrite. Toute modification substantielle du brief après validation du devis initial pourra faire l'objet d'un avenant tarifaire et/ou d'un ajustement des délais.
        </p>
      ),
    },
    {
      id: "paiement",
      number: "03",
      icon: Banknote,
      title: "Conditions tarifaires et modalités de paiement",
      content: (
        <div className="space-y-3">
          <p>
            Tous les prix sont exprimés en Francs CFA (FCFA), toutes taxes comprises sauf mention contraire sur le devis. Sauf accord particulier, toute commande est soumise à un acompte de 50% à la validation, le solde étant exigible à la livraison ou au retrait du produit fini.
          </p>
          <p>
            Pour les formations dont le montant excède 100 000 FCFA, un paiement échelonné en deux ou trois tranches peut être accordé sur demande, avec échéancier formalisé par écrit avant le démarrage de la session.
          </p>
          <p>
            Moyens de paiement acceptés : espèces, chèques, Mobile Money (MTN Mobile Money, Moov Money ou Celtiis Cash). Tout retard de paiement non justifié peut entraîner la suspension de la prestation en cours.
          </p>
        </div>
      ),
    },
    {
      id: "impression",
      number: "04",
      icon: Printer,
      title: "Spécificités du pôle Impression",
      content: (
        <div className="space-y-3">
          <p>
            Le Client est seul responsable de la qualité et de la conformité technique (résolution, mode CMJN, fonds perdus, vectorisation) des fichiers fournis pour impression. Le Prestataire ne saurait être tenu responsable d'un rendu dégradé résultant d'un fichier non conforme.
          </p>
          <p>
            Aucune impression en série ne sera lancée sans validation préalable d'un Bon À Tirer (BAT), numérique ou physique. Toute erreur non signalée à ce stade engage la responsabilité du Client.
          </p>
          <p>
            Le Client reconnaît et accepte que de légères variations de teintes peuvent survenir entre l'aperçu écran (RVB) et le rendu imprimé (CMJN). Ces variations, dans les tolérances usuelles, ne constituent pas un défaut de conformité.
          </p>
        </div>
      ),
    },
    {
      id: "livraison",
      number: "05",
      icon: Truck,
      title: "Délais et conditions de livraison / retrait",
      content: (
        <p>
          Les délais communiqués, digitaux ou physiques, sont indicatifs et calculés à compter de la réception des éléments nécessaires et de l'acompte requis. Les produits du pôle Impression sont disponibles au retrait dans les locaux du Prestataire à Porto-Novo ; une livraison peut être organisée sur demande, aux frais du Client. Les livrables digitaux sont transmis par voie électronique après validation finale et encaissement intégral du solde.
        </p>
      ),
    },
    {
      id: "formation",
      number: "06",
      icon: GraduationCap,
      title: "Spécificités du pôle Formation",
      content: (
        <div className="space-y-3">
          <p>
            La délivrance de l'attestation de fin de formation est conditionnée à une présence effective d'au moins 80% des heures de la session.
          </p>
          <p>
            Toute absence, justifiée ou non, ne donne droit à aucun remboursement. Les supports de cours correspondants sont néanmoins transmis au stagiaire.
          </p>
          <p>
            Le Prestataire se réserve le droit de reporter ou d'annuler une session en cas d'effectif insuffisant ; le Client se voit alors proposer un report ou un remboursement intégral.
          </p>
        </div>
      ),
    },
    {
      id: "propriete",
      number: "07",
      icon: Copyright,
      title: "Propriété intellectuelle",
      content: (
        <p>
          Les droits de propriété intellectuelle sur les créations réalisées (logos, chartes, maquettes, sites, vidéos) ne sont transférés au Client qu'après paiement intégral du solde. Sauf clause de confidentialité formalisée par écrit, le Prestataire conserve le droit de présenter ces réalisations dans son portfolio et ses supports de communication.
        </p>
      ),
    },
    {
      id: "litiges",
      number: "08",
      icon: Scale,
      title: "Force majeure et règlement des litiges",
      content: (
        <p>
          Aucune partie ne pourra être tenue responsable d'un retard résultant d'un cas de force majeure. En cas de différend, les parties s'efforceront de trouver une solution amiable préalablement à toute action contentieuse. À défaut, le litige sera porté devant les tribunaux compétents de Porto-Novo, République du Bénin.
        </p>
      ),
    },
  ];
}

function CgvPage() {
  return (
    <LegalLayout
      icon={ScrollText}
      badge="Document contractuel"
      title="Conditions Générales de Vente"
      description={`Les modalités de commande, paiement, production et livraison applicables à toute prestation ${SITE.name}.`}
      lastUpdated="30 juin 2026"
      sections={getSections()}
      contactQuestion="Une question sur ces conditions générales de vente ?"
    />
  );
}